module.exports = {
  //HOST: 'simamisadb2.mysql.database.azure.com',
  HOST: 'localhost',
  // USER: 'nontsikelelo@simamisadb2',
  USER: 'root',
//PASSWORD: 'Simamisa123',
PASSWORD: 'S1mamis@2022',
  // DB: 'Simamisadb', //simamisadbccl
   DB: 'dummy',
    dialect: 'mysql',
    sslmode: 'require',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}