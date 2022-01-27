//production
module.exports = {
    host: 'localhost',
    user: 'root',
    password: 'mkmHAD20/',
    database: 'expKobi'
};

//local
// module.exports = {
//     host: '127.0.0.1',
//     port: '3307',
//     user: 'root',
//     password: 'password',
//     database: 'expKobedev',
// };

//local-to-pruduction use mysql ssh
//const mysqlssh = require('mysql-ssh');
// mysqlssh.connect(
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