module.exports = {
  //HOST: 'localhost',
  HOST: '50.87.196.173',
 // USER: 'root',
  USER: 'raisiql4_user',
//PASSWORD: 'S1mamis@2022',
PASSWORD: 'G3V}aeJWcH+6',

 // DB: 'dummy', //simamisadbccl
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
 
