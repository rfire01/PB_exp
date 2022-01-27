const mysql = require('mysql');
const dbConfig = require("./db.config.js");

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// open the MySQL connection
connection.connect(error => {
    if (error) throw ('connection to db failed with configuration : ' + error);
    console.log("Successfully connected to the database.");
});

exports.executeTrustedQuery = async function (query) {
    return new Promise(async (resolve, reject)  => {
        connection.query(query, function (error, result) {
          if(error){
            fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
            fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + error.sqlMessage + '\n');
            reject(error.sqlMessage);
          }
          resolve(result);
        });
      });
};

exports.executeProtectedQuery = async function (query, values) {
    return new Promise(async (resolve, reject) => {
        connection.query(query, values, function (error, result) {
            if (error) {
                fs.createWriteStream(path.join("./", 'error.log'), { flags: 'a' });
                fs.appendFileSync("./error.log", new Date(parseInt(new Date().getTime())).toString() + ' - SQL ERROR: ' + error.sqlMessage + '\n');
                reject(error.sqlMessage);
            }
            resolve(result);
        });
    });
}