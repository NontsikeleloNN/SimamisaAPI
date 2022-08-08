const {createPool} = require("mysql2")

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "S1mamis@2022",
    connectionLimit: 10
})



pool.query(`select * from dummy.orphanage`, (err,res) =>{
    return console.log(res)
})