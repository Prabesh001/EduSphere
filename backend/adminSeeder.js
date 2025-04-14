const bcrypt = require("bcrypt")

const seedAdmin =  async (users)=>{
   await users.findOrCreate({
    where : {
        email : 'admin@gmail.com'
    },
    defaults : {
        email : "admin@gmail.com",
        password : bcrypt.hashSync("password",10),
        role : 'admin',
        firstName : 'admin',
        lastName : 'admin'
    }})
    console.log("Admin seeded successfully")
}

module.exports = seedAdmin