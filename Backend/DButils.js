const mysqlssh = require('mysql-ssh');
const mysql = require('mysql');
const fs = require('fs');
var path = require("path");

exports.executeProtectedQuery = async function(databaseQuery, values) {
  return new Promise(async (resolve, reject)  => {

  //production
  let conProm = await getProductionDbConnectionConnectedPromise().catch( error => {
    fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
    fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + error.sqlMessage + '\n');
    reject(e.sqlMessage);
  });
  
  conProm.query(databaseQuery, values, function (error, result) {
    //conProm.end();
    if(error){
      fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
      fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + error.sqlMessage + '\n');
      reject(error.sqlMessage);
    }
    resolve(result);
  });
});
}

exports.executeTrustedQuery = async function(databaseQuery) {
    return new Promise(async (resolve, reject)  => {

    //production
    let conProm = await getProductionDbConnectionConnectedPromise().catch( error => {
      fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
      fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + error.sqlMessage + '\n');
      reject(error.sqlMessage);
    });
    
    conProm.query(databaseQuery, function (error, result) {
      if(error){
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
