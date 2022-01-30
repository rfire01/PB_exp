const mysql = require('mysql');
const dbConfig = require("./db.config.js");
const fs = require('fs');
var path = require("path");

var connection;

function handleDisconnect(remoteClose) {
    connection = mysql.createConnection(dbConfig); 
    // Recreate/create the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {               
        if (err) {    //The server is either down or restarting (takes a while sometimes).
            console.log('error when connecting to db : ' + (new Date().toLocaleString()));
            fs.createWriteStream(path.join("./", 'error.log'), {flags: 'a'});
            fs.appendFileSync("./error.log",new Date(parseInt(new Date().getTime())).toString()+ ' - SQL ERROR: ' + err.message + '\n');        
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log("Successfully connected to the Database.");
        }
    });
    // We introduce a delay before attempting to reconnect, 
    // to avoid a hot loop, and to allow our node script to
    // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.


    connection.on('error', function (err) {
        console.log('DB Timed Out - Handled');
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(true);
        } else {
            throw err;
        }
    });

    // Connection to the MySQL server is usually
    // lost due to either server restart, or a
    // connnection idle timeout (the wait_timeout
    // server variable configures this)
}

handleDisconnect();

exports.executeTrustedQuery = async function (query) {
    return new Promise(async (resolve, reject) => {
        connection.query(query, function (error, result) {
            if (error) {
                fs.createWriteStream(path.join("./", 'error.log'), { flags: 'a' });
                fs.appendFileSync("./error.log", new Date(parseInt(new Date().getTime())).toString() + ' - SQL ERROR: ' + error.sqlMessage + '\n');
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