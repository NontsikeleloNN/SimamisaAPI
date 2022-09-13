module.exports = {
  //HOST: 'simamisadb2.mysql.database.azure.com',
  HOST: '50.87.196.173',
  // USER: 'nontsikelelo@simamisadb2',
  USER: 'raisiql4_user',
//PASSWORD: 'Simamisa123',
PASSWORD: 'G3V}aeJWcH+6',

  // DB: 'Simamisadb', //simamisadbccl
   DB: 'raisiql4_simamisa',
    dialect: 'mysql',
    sslmode: 'require',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
 
