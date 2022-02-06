const mysql = require('mysql');
const fs = require('fs');
var path = require("path");
//const mysqlssh = require('mysql-ssh');

//independent script that sets interval for every minute to 
//clean the exp DB from unfinished expirements and to balance configuration table
// * only works when running on the same server with DB
runCleanDBInterval();

async function runCleanDBInterval() {
    let conProm = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'mkmHAD20/',
            database: 'expKobi'
        }
    );

    //local
    // let conProm = mysql.createConnection(
    //     {
    //         host: '127.0.0.1',
    //         port: '3307',
    //         user: 'root',
    //         password:'password' , // 'expirementMSQL119',
    //         database: 'expKobedev',
    //     }
    // );

    //remote-prod
//    let conProm = mysqlssh.connect(
//     {
//         host: '3.8.178.219',
//         user: 'ubuntu',
//         privateKey: fs.readFileSync('LightsailDefaultKey-eu-west-2.pem')
//     },
//     {
//         host: '127.0.0.1',
//         user: 'root',
//         password: 'mkmHAD20/',
//         database: 'expKobi'
//     }
//   );


    conProm.connect(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("connected");

            setInterval(() => {
                conProm.query(`SELECT * FROM ELECTIONS_INPUT_FORMATS`, (error, data) => {
                    if (data) {
                        let queries = [];
                        data.forEach(async (row) => {
                            if (row.STARTED > 0) {
                                let expired = 0;
                                let timeArr = row.TIMES?  row.TIMES.split('#') : [];

                                timeArr.forEach((ts) => {
                                    if (ts.length > 0) {
                                        let userDate = new Date(parseInt(ts));
                                        let currentDate = (new Date()).getTime();
                                        let minutesPassed = Math.floor(((currentDate - userDate) / 1000) / 60);
                                        if (minutesPassed > 30) {
                                            expired++;
                                        }
                                    }
                                })
                                timeArr = timeArr.slice(expired + 1);
                                let updatedTimes = '';
                                timeArr.forEach((ts) => {
                                    updatedTimes = updatedTimes + "#" + ts;
                                })

                                let started = Math.max(row.STARTED - expired, row.FINISHED);
                                let query = `UPDATE ELECTIONS_INPUT_FORMATS SET STARTED = '${started}', TIMES = '${updatedTimes}' WHERE INPUT_FORMAT = '${row.INPUT_FORMAT}' AND ELECTION = '${row.ELECTION}'`
                                queries.push(query);
                            }
                        });

                        // execute queries
                        for (let index = 0; index < queries.length; index++) {
                            conProm.query(queries[index], function (error) {
                                if (error) {
                                    fs.createWriteStream(path.join("./", 'error.log'), { flags: 'a' });
                                    fs.appendFileSync("./error.log", new Date(parseInt(new Date().getTime())).toString() + ' - SQL ERROR: ' + error.sqlMessage + '\n');
                                    console.log(error.sqlMessage);
                                }
                            });
                        }
                    }
                })
            }, 60 * 1000 * 2);
        }
    });
}