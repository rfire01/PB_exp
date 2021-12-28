const { format } = require("mysql2");
const DButils = require("./DButils");

//sets interval for every hour to clean the exp DB from unfinished expirements and to balance configuration table
setInterval(run, 60 * 1000);

async function run(){
    let data=await DButils.executeTrustedQuery(`SELECT * FROM ELECTIONS_INPUT_FORMATS;`);
    if(data){
        data.forEach(async (row)=>{
            if(row.STARTED>0){
                let expired=0;
                let timeArr=row.TIMES.split('#');
    
                timeArr.forEach((ts)=>{
                    if(ts.length>0){
                        let userDate=new Date(parseInt(ts));
                        let currentDate=new Date();
                        let minutesPassed=Math.floor(((currentDate-userDate)/1000)/60);
                        if(minutesPassed>30) expired++;
                    }
                })
                timeArr=timeArr.slice(expired+1);
                let updatedTimes='';
                timeArr.forEach((ts)=>{
                    updatedTimes=updatedTimes+"#"+ts;
                })
    
                let started=Math.max(row.STARTED-expired,row.FINISHED);
    
                let query=`UPDATE ELECTIONS_INPUT_FORMATS SET STARTED = '${started}', TIMES = '${updatedTimes}' WHERE INPUT_FORMAT = '${row.INPUT_FORMAT}' AND ELECTION = '${row.ELECTION}';`
    
                await DButils.executeTrustedQuery(query).catch( e => {
                    console.log('script error : ' + e);
                });
            }
        });
    }
}