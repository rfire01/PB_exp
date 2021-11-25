const mysqlssh = require('mysql-ssh');
const mysql = require('mysql');
const fs = require('fs');
var path = require("path");
const { exception } = require('console');

exports.executeQuery = async function(query){
  return dbQuery(query);
};
exports.executeQueries = async function(queries){
  let result= await mul_dbQuery(queries);
  
  return result;
};

async function dbQuery(databaseQuery) {
  return new Promise(async (resolve, reject)  => {

  //local
  // let conProm = getLocalDbConnection();
  // await conProm.connect(function(err) {
  //   if (err) reject(e);
  //   else console.log("local Db");
  // });

  //production
  let conProm = await getProductionDbConnectionConnectedPromise().catch( error => {
    fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
    fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + error.sqlMessage + '\n');
    reject(e.sqlMessage);
  });
  
  conProm.query(databaseQuery, function (error, result) {
    if(error){
      conProm.end();
      fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
      fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + error.sqlMessage + '\n');
      reject(error.sqlMessage);
    }
    resolve(result);
  });

});

}

function getLocalDbConnection(){
      return mysql.createConnection(
        {
          host: '127.0.0.1',
          port: '3307',
          user: 'root',
          password: 'password',
          database: 'expKobedev',
        }
      );

}


function getProductionDbConnectionConnectedPromise(){
      return mysqlssh.connect(
      {
          host: '3.8.178.219',
          user: 'ubuntu',
          privateKey: fs.readFileSync('LightsailDefaultKey-eu-west-2.pem')
      },
      {
          host: '127.0.0.1',
          user: 'root',
          password: 'mkmHAD20/',
          database: 'expKobi'
      }
    );
}

//Bad Query Design
async function mul_dbQuery(queries) {

  let conProm=null;
  try {
    conProm= await mysqlssh.connect(
      {
          host: '3.8.178.219',
          user: 'ubuntu',
          privateKey: fs.readFileSync('LightsailDefaultKey-eu-west-2.pem')
      },
      {
          host: '127.0.0.1',
          user: 'root',
          password: 'mkmHAD20/',
          database: 'expKobi'
      }
    );

       // local db - dev
      //  conProm= await mysql.createConnection(
      //   {
      //     host: '127.0.0.1',
      //     port: '3307',
      //     user: 'root',
      //     password:'password' , // 'expirementMSQL119',
      //     database: 'expKobedev',
      //   }
      // );

      // conProm.connect(function(err) {
      //   if (err)  console.log(err);
      //   else console.log("Connected!");
      // });

  } 
  catch (e) {
    console.log("Error", e.stack);
    console.log("Error", e.name);
    console.log("Error", e.message);
  }
  
  let promises=[];

  for (let index = 0; index < queries.length; index++) {
    prom=new Promise(data => {
      // console.log(queries[index]);
      conProm.query(queries[index], function (error, result) {
            if (error) {
                fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
                fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + error.sqlMessage + '\n');
                throw exception(error);
            }
            try {                
                data(result);
  
            } catch (error) {
                data({});
                fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
                fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + error.sqlMessage + '\n');
                throw exception(error);
            }
  
        });
    });
    let result=await Promise.resolve(prom);
    promises.push(result);
  }

  return promises;
}


// load datasw to cvs file
async function getDatabase2(){
  const Json2csvParser = require('json2csv').Parser;
  const fastcsv = require("fast-csv");
  const fs = require("fs");
  const excel = require('exceljs');

  let ids=[];
  let null_items=[];


  let experiments= await dbQuery('select * from EXPERIMMENTS WHERE TOKEN IS NOT NULL');
  // let experiments= await dbQuery('select * from EXPERIMMENTS');
  let arranged_items= await dbQuery('select * from ARRANGED_ITEMS');
  let blacklist= await dbQuery('select * from BLACKLIST');
  let exp_items= await dbQuery('select * from EXP_ITEMS');
  let items= await dbQuery('select * from ITEMS');
  let participants= await dbQuery('select * from PARTICIPANTS');
  const experiments_json = JSON.parse(JSON.stringify(experiments));
  const arranged_items_json = JSON.parse(JSON.stringify(arranged_items));
  const blacklist_json = JSON.parse(JSON.stringify(blacklist));
  const exp_items_json = JSON.parse(JSON.stringify(exp_items));
  const items_json = JSON.parse(JSON.stringify(items));
  const participants_json = JSON.parse(JSON.stringify(participants));

  experiments_json.forEach(exp => {
    exp.CURTIME=new Date(parseInt(exp.CURTIME)).toString();
    exp.TUTORIAL_TIME=exp.TUTORIAL_TIME/1000;
    exp.QUIZ_TIME=exp.QUIZ_TIME/1000;
    exp.RESPONSE_TIME=exp.RESPONSE_TIME/1000;
    exp.TOTAL_TIME=exp.TOTAL_TIME/1000;
    exp.CONSISTENCY_TIME=exp.CONSISTENCY_TIME/1000;

    ids.push(exp.EXP_ID);
  });
  exp_items_json.forEach((exp,i) => {
    if(exp.VALUE.includes("->")){
      let x=exp.VALUE.split("->");
      exp.RANK_BEFORE=exp.VALUE.split("->")[0];
      exp.RANK_AFTER=exp.VALUE.split("->")[1];
    }
  });

  for (var i = 0; i < exp_items_json.length; i++)
    if(!(ids.includes(exp_items_json[i].EXP_ID))) null_items.push(i);
  for (var i = null_items.length -1; i >= 0; i--)
    exp_items_json.splice(null_items[i],1);

  let workbook = new excel.Workbook({
    pageSetup: {
      horizontalCentered: true,
      verticalCentered: true
    }
  });
  //add workbook
  let experiments_worksheet = workbook.addWorksheet('Experiments', {
    views: [
      {state: 'frozen', ySplit: 1}
    ]
  });
  // experiments spreadsheet
  experiments_worksheet.columns = [
    { header: 'EXP_ID', key: 'EXP_ID', width: 8 },
    { header: 'PARTICIPANT_ID', key: 'PARTICIPANT_ID', width: 16 },
    { header: 'CURTIME', key: 'CURTIME', width: 32 },
    { header: 'TUTORIAL_TIME', key: 'TUTORIAL_TIME', width: 16},
    { header: 'QUIZ_TIME', key: 'QUIZ_TIME', width: 12},
    { header: 'RESPONSE_TIME', key: 'RESPONSE_TIME', width: 20},
    { header: 'ISCONSISTENT', key: 'ISCONSISTENT', width: 20},
    { header: 'FEEDBACK_EASE', key: 'FEEDBACK_EASE', width: 20},
    { header: 'FEEDBACK_INTERFACE', key: 'FEEDBACK_INTERFACE', width: 20},
    { header: 'FEEDBACK_CAPTURE', key: 'FEEDBACK_CAPTURE', width: 20},
    { header: 'FEEDBACK_MAP', key: 'FEEDBACK_MAP', width: 20},
    { header: 'FEEDBACK_CATEGORIES', key: 'FEEDBACK_CATEGORIES', width: 20},
    { header: 'FEEDBACK_MAP_ACCESS', key: 'FEEDBACK_MAP_ACCESS', width: 20},
    { header: 'INPUT_FORMAT', key: 'INPUT_FORMAT', width: 20},
    { header: 'ELECTION_NUM', key: 'ELECTION_NUM', width: 15},
    { header: 'CONSISTENCY_TIME', key: 'CONSISTENCY_TIME', width: 18},
    { header: 'TOTAL_TIME', key: 'TOTAL_TIME', width: 12},
    { header: 'TOKEN', key: 'TOKEN', width: 12},
    { header: 'LOCATION_MAP', key: 'LOCATION_MAP', width: 18},
  ];
  experiments_worksheet.addRows(experiments_json);

  // participants spreadsheet
  let participants_worksheet = workbook.addWorksheet('Participants', {
    views: [
      {state: 'frozen', ySplit: 1}
    ]
  });
  participants_worksheet.columns = [
    { header: 'PARTICIPANT_ID', key: 'PARTICIPANT_ID', width: 19 },
    { header: 'AGE', key: 'AGE', width: 9 },
    { header: 'EDUCATION', key: 'EDUCATION', width: 23 },
    { header: 'GENDER', key: 'GENDER', width: 14},
  ];
  participants_worksheet.addRows(participants_json);

  // experiment items spreadsheet
  let experiment_items_worksheet = workbook.addWorksheet('Experiment items', {
    views: [
      {state: 'frozen', ySplit: 1}
    ]
  });
  experiment_items_worksheet.columns = [
    { header: 'EXP_ID', key: 'EXP_ID', width: 9 },
    { header: 'ITEM_ID', key: 'ITEM_ID', width: 9 },
    { header: 'VALUE', key: 'VALUE', width: 9 },
    { header: 'RANK_BEFORE', key: 'RANK_BEFORE', width: 17 },
    { header: 'RANK_AFTER', key: 'RANK_AFTER', width: 17 },
  ];
  experiment_items_worksheet.addRows(exp_items_json);

  // items spreadsheet
  let items_worksheet = workbook.addWorksheet('Items', {
    views: [
      {state: 'frozen', ySplit: 1}
    ]
  });
  items_worksheet.columns = [
    { header: 'ITEM_ID', key: 'ITEM_ID', width: 11 },
    { header: 'ITEM_NAME', key: 'ITEM_NAME', width: 42 },
    { header: 'VALUE', key: 'VALUE', width: 9 },
    { header: 'DESCRIPTION', key: 'DESCRIPTION', width: 30 },
    { header: 'GROUP_NAME', key: 'GROUP_NAME', width: 35 },
    { header: 'SINGULAR', key: 'SINGULAR', width: 12 },
  ];
  items_worksheet.addRows(items_json);

  // elections spreadsheet
  let elections_worksheet = workbook.addWorksheet('Elections', {
    views: [
      {state: 'frozen', ySplit: 1}
    ]
  });
  elections_worksheet.columns = [
    { header: 'Election', key: 'SENARIO', width: 10 },
    { header: 'ITEM_ID', key: 'ITEM_ID', width: 10 },
    { header: 'COORDS', key: 'COORDS', width: 23 },
  ];
  elections_worksheet.addRows(arranged_items_json);

   // blacklist spreadsheet
  let blacklist_worksheet = workbook.addWorksheet('Blacklist', {
  views: [
    {state: 'frozen', ySplit: 1}
  ]
  });
  blacklist_worksheet.columns = [
    { header: 'PARTICIPANT_ID', key: 'PARTICIPANT_ID', width: 40 },
  ];
  blacklist_worksheet.addRows(blacklist_json);






  // fix the cell design for spreadsheets

  experiments_worksheet.getRow(1).font = {bold:true};
  for(let i=1;i<=experiments_worksheet.rowCount;i++){
    experiments_worksheet.getRow(i).alignment  = {wrapText:true,horizontal: 'center',vertical: 'middle'};
  }
  participants_worksheet.getRow(1).font = {bold:true};
  for(let i=1;i<=participants_worksheet.rowCount;i++){
    participants_worksheet.getRow(i).alignment  = {wrapText:true,horizontal: 'center',vertical: 'middle'};
  }
  experiment_items_worksheet.getRow(1).font = {bold:true};
  for(let i=1;i<=experiment_items_worksheet.rowCount;i++){
    experiment_items_worksheet.getRow(i).alignment  = {wrapText:true,horizontal: 'center',vertical: 'middle'};
  }
  items_worksheet.getRow(1).font = {bold:true};
  for(let i=1;i<=items_worksheet.rowCount;i++){
    items_worksheet.getRow(i).alignment  = {wrapText:true,horizontal: 'center',vertical: 'middle'};
  }
  elections_worksheet.getRow(1).font = {bold:true};
  for(let i=1;i<=elections_worksheet.rowCount;i++){
    elections_worksheet.getRow(i).alignment  = {wrapText:true,horizontal: 'center',vertical: 'middle'};
  }
  blacklist_worksheet.getRow(1).font = {bold:true};
  for(let i=1;i<=blacklist_worksheet.rowCount;i++){
    blacklist_worksheet.getRow(i).alignment  = {wrapText:true,horizontal: 'center',vertical: 'middle'};
  }

  workbook.xlsx.writeFile("EXP.xlsx")
		.then(function() {
			console.log("file saved!");
		});

}
