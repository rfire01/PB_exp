require("dotenv").config();
var express = require("express");
var path = require("path");
var logger = require("morgan");
const session = require("client-sessions");
const cors = require("cors");
var fs = require('fs');

const db =  require("./db.js");

var app = express();

var corsOptions = {
  origin: true,
  credentials: true
}

app.use(cors(corsOptions));

let logStream = fs.createWriteStream(path.join("./", 'logger.log'), {flags: 'a'});

app.use(logger('combined', { stream: logStream }));
// app.use(logger("dev")); //logger

app.use(express.json()); // parse application/json

app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: 'secret', // the encryption key
    duration: 20 * 60 * 1000, // expired after 20 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
  }
));

app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

var port = process.env.PORT || "3000";


app.get("/userExists/participant_ID/:participant_ID", async (req, res, next) => {
  try {
    const { participant_ID } = req.params;

    let queryRes = await db.executeProtectedQuery('SELECT * FROM PARTICIPANTS WHERE PARTICIPANT_ID = ?', [participant_ID]).catch(e => {
      throw e;
    });

    if(queryRes.length>0){
      res.status(200).send({exists:true});
    }
    else{ 
      res.status(200).send({exists:false});
    }
  } catch (error) {
    next(error);
  }
});

app.get("/isBlacklisted/participant_ID/:participant_ID", async (req, res, next) => {
  try {
    const { participant_ID } = req.params;
    let queryRes = await db.executeProtectedQuery(`select * from BLACKLIST WHERE PARTICIPANT_ID = ?`, [participant_ID]).catch(e => {
      throw e;
    });

    if(queryRes.length>0){
      res.status(200).send({blacklisted:true});
    }
    else{ 
      res.status(200).send({blacklisted:false});
    }

  } catch (error) {
    next(error);
  }
});

app.post("/insertToBlacklist", async (req, res, next) => {
  try {
    const participant_ID=req.body.participant_ID;
    const voting_method=req.body.voting_method;
    const election_num=req.body.election_num;

    console.log("insertToBlacklist - part_id: " + participant_ID);

    await db.executeProtectedQuery(`INSERT INTO BLACKLIST VALUE (?)`, [participant_ID]).catch(e => {
      throw e;
    });

    // remove from counting
    let data=await db.executeProtectedQuery(`SELECT * FROM ELECTIONS_INPUT_FORMATS WHERE INPUT_FORMAT = ? AND ELECTION = ?`, [voting_method, election_num]).catch(e => {
      throw e;
    });
    let timeArr=data[0].TIMES.split('#');
    let updatedTimes='';
    for(let i=2;i<timeArr.length;i++){
      if(timeArr[i].length>0)
        updatedTimes=updatedTimes+"#"+timeArr[i];
    }
    let started=data[0].STARTED-1;
    await db.executeProtectedQuery(`UPDATE ELECTIONS_INPUT_FORMATS SET STARTED = '${started}',TIMES = '${updatedTimes}' 
                                WHERE INPUT_FORMAT = ? AND ELECTION = ?;`,  [voting_method, election_num]).catch(e => {
      throw e;
    });

    res.status(201).send({ message: "user blacklisted"});
  } catch (error) {
    next(error);
  }
});

app.post("/addExperiment", async (req, res, next) => {
  try {
    const participant_ID=req.body.participant_ID;
    const time=req.body.time;
    const tutorial_time=req.body.tutorial_time;
    const quiz_time=req.body.quiz_time;
    const response_time=req.body.response_time;
    const consistant=0;
    const items=req.body.items;
    const participant_info=req.body.participant_info;
    const input_format=req.body.input_format;
    const election_num=req.body.election_num;
    const homePos=req.body.homePos;

    console.log("addExperiment - part_id: " + participant_ID);
    console.log("items length: " + (items? items.length: 0));

    let participantQuery = `INSERT INTO PARTICIPANTS (PARTICIPANT_ID,AGE,EDUCATION,GENDER) VALUE (?,?,?,?)`;
    let participantQueryValues = [participant_ID,participant_info.age,participant_info.education,participant_info.gender];

    let expQuery  = `INSERT INTO EXPERIMMENTS 
                        (PARTICIPANT_ID,CURTIME,TUTORIAL_TIME,QUIZ_TIME,RESPONSE_TIME,ISCONSISTENT,INPUT_FORMAT,ELECTION_NUM,LOCATION_MAP) VALUE (?,?,?,?,?,?,?,?,?)`;
    let expQueryValues = [participant_ID, time, tutorial_time,quiz_time, response_time, consistant, input_format, election_num, homePos];

    // Adds participant
    await db.executeProtectedQuery(participantQuery, participantQueryValues).then(async () => {

      //Adds participant's Experiment
      await db.executeProtectedQuery(expQuery, expQueryValues).then(() => {

      }).catch(e => {
        throw {status: 401, message: 'duplicate attempt to participate the experiment - status 401'};
      });
    }).catch(e => {
      throw {status: 401 , message: 'duplicate attempt to participate the experiment - status 401'};
    });

    //Adds expirement final items
    let exp_id = await db.executeProtectedQuery(`SELECT (EXP_ID) as matched FROM EXPERIMMENTS where PARTICIPANT_ID = ?`, [participant_ID] ).catch(e => {
      throw e;
    });

    exp_id[0]["matched"]=parseInt(exp_id[0]["matched"]);

    let itemsQuery="INSERT INTO EXP_ITEMS (EXP_ID,ITEM_ID,VALUE) VALUES ";
    let itemsQueryValues = []

    for (let index = 0; index < items.length; index++) {
      let item=items[index];
      if(index>0) itemsQuery+=",";
      itemsQuery+="(?,?,?)";
      itemsQueryValues.push(exp_id[0]["matched"] , item.item_id , item.item_value);
    }

    await db.executeProtectedQuery(itemsQuery, itemsQueryValues).catch(e => {
      try {
        let errorStream = fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
        fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' expId: ' +  exp_id[0]["matched"] + ' - items-error: ' + e.sqlMessage + '\n');
      } catch {
        console.log(new Date(parseInt(new Date().getTime())).toString()+ ' expId: ' +  exp_id[0]["matched"] + ' - items-error: ' + e.sqlMessage)
      }
      throw e;
    });

    res.status(201).send({ experiment_id: exp_id[0]["matched"]});
  } catch (error) {
    next(error);
  }
});

app.post("/addConsistency", async (req, res, next) => {
  try {
    const experiment_id=req.body.experiment_id;
    const consistant=req.body.consistant;
    const consistency_time=req.body.consistency_time;

    console.log("addConsistency - exp_id: " +  experiment_id);

    if(!experiment_id){
      throw {status: 401};
    } else {
      let CurrentConsistency = 
        await db.executeProtectedQuery(`SELECT ISCONSISTENT FROM EXPERIMMENTS WHERE EXP_ID = ?;`, [experiment_id]).catch(e => {
          throw e;
        });
      if(CurrentConsistency[0].ISCONSISTENT !== '0' ){
        res.status(200).send({ message: "consistency cannot be filled twice. please finish the expirement." ,
        isConsistent : CurrentConsistency[0].ISCONSISTENT});
        return;
      }
      await db.executeProtectedQuery(`UPDATE EXPERIMMENTS SET ISCONSISTENT = ?, CONSISTENCY_TIME= ? WHERE EXP_ID = ?;`,
       [consistant, consistency_time, experiment_id] ).catch(e => {
        throw e;
      });
    }

    res.status(201).send({ message: "consistency added"});
  } catch (error) {
    next(error);
  }
});

app.post("/addFeedback", async (req, res, next) => {
  try {
    const experiment_id=req.body.experiment_id;
    const q_ease=req.body.q_ease;
    const q_interface=req.body.q_interface;
    const q_capture=req.body.q_capture;
    const q_map=req.body.q_map;
    const q_cat=req.body.q_cat;
    const q_map_access=req.body.q_map_access;
    const total_time=req.body.total_time;
    const input_format=req.body.input_format;
    const election=req.body.election;

    console.log("addFeedback - exp_id: " + experiment_id);

    const token=Math.floor(100000 + Math.random() * 900000);

    //update the Experiments table with the feedback
    const feedbackQuery = `UPDATE EXPERIMMENTS
                SET FEEDBACK_EASE = ?, FEEDBACK_INTERFACE =?, FEEDBACK_CAPTURE = ?,FEEDBACK_MAP = ?,
                FEEDBACK_CATEGORIES = ?, FEEDBACK_MAP_ACCESS = ?, TOTAL_TIME = ?, TOKEN = ?
                WHERE EXP_ID = ?;` 
    const feedbackQueryValues = [q_ease, q_interface, q_capture, q_map, q_cat, q_map_access, total_time, token, experiment_id]

    await db.executeProtectedQuery(feedbackQuery, feedbackQueryValues).catch(e => {
        throw e;
    });
    
    let finishedByNow=await db.executeProtectedQuery(`SELECT FINISHED FROM ELECTIONS_INPUT_FORMATS
        WHERE INPUT_FORMAT = ? AND ELECTION = ?;`, [input_format, election]).catch(e => {
          throw e;
        });

    //mark that the user complited the experiment
    await db.executeProtectedQuery(`UPDATE ELECTIONS_INPUT_FORMATS SET FINISHED = '${finishedByNow[0].FINISHED+1}'
        WHERE INPUT_FORMAT = ? AND ELECTION = ?;`, [input_format, election]).catch(e => {
          throw e;
        });

    res.status(201).send({ token: token});
  } catch (error) {
    next({message : 'invalid details Error.' + error, status: 400});
  }
});

app.get("/config", async (req, res, next) => {
  try {

    // round robin - the user will get the senario with the minimum amout of
    // people finished and started at a ratio of 1.25/1 (finished / started)
    let roundRobinQuery = `SELECT * 
    FROM ELECTIONS_INPUT_FORMATS 
    ORDER BY (FINISHED * 1.25 + (STARTED-FINISHED)) ASC
    LIMIT 1;`

    let minCombination = await db.executeTrustedQuery(roundRobinQuery).catch(e => {
      throw e;
    });

    let chosen_method=minCombination[0].INPUT_FORMAT;
    let chosen_election=minCombination[0].ELECTION;
    let new_time=minCombination[0].TIMES+"#"+new Date().getTime();

    await db.executeTrustedQuery(`UPDATE ELECTIONS_INPUT_FORMATS SET STARTED = '${minCombination[0].STARTED + 1}', TIMES = '${new_time}'
                                  WHERE INPUT_FORMAT = '${chosen_method}' AND ELECTION = '${chosen_election}';`).catch(e => {
                                    throw e;
                                  });

    //get the items of the election in randomized order
    let items = await db.executeTrustedQuery(`SELECT ITEMS.ITEM_ID,ITEM_NAME,GROUP_NAME,
                                      VALUE,URL,COORDS,DESCRIPTION from ARRANGED_ITEMS 
                                      JOIN ITEMS ON ITEMS.ITEM_ID=ARRANGED_ITEMS.ITEM_ID 
                                      where SENARIO='${chosen_election}' ORDER BY RAND ( ) `).catch(e => {
      throw e;
    });
    let return_items=[];
    items.forEach(row => {
      return_items.push({'item_id':row.ITEM_ID,'item_name':row.ITEM_NAME,'item_value':row.VALUE,
      'item_group':row.GROUP_NAME,'item_desc':row.DESCRIPTION,'url':row.URL,'coords':row.COORDS});
    });

    //get random position as the user's home 
    let homeArr=[{x:10,y:20},{x:60,y:50},{x:40,y:30},{x:20,y:80}];
    let homePos=homeArr[Math.floor(Math.random() * homeArr.length)];

    res.status(200).send({'items_from_groups':return_items,'voting_method':chosen_method,
                          'election_num':chosen_election,'finished':false,'homePos':homePos});
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => res.send("welcome"));

app.use(function (err, req, res, next) {
  let errorStream = fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
  fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - ERROR: ' + err.message + '\n');
  res.status(err.status || 500).send({ message: err.message, success: false });
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});



process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
