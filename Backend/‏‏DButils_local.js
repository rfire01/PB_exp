var mysql = require('mysql2/promise');

exports.executeQuery = async function(query){
  let result= await dbQuery(query);
  
  return result;
};

async function dbQuery(databaseQuery) {

  let connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mkmHAD20/',
    database : 'expKobi'
  });
  
  try {
    connection.connect();
  } 
  catch (e) {
    console.log("Error", e.stack);
    console.log("Error", e.name);
    console.log("Error", e.message);
  }
  let [rows, fields] = await connection.execute(databaseQuery);
  return rows;
  
}
