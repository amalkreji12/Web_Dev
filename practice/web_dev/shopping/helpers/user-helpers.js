var db = require('../config/connection');
var collections = require('../config/collections');
const bcrypt = require('bcrypt');


module.exports = {
    doSignUP(userData) {
        return new Promise(async function(resolve, reject){
            userData.password = await bcrypt.hash(userData.password, 10);
            db.getDb().collection(collections.USER_COLLECTION).insertOne(userData).then((data)=>{
                //console.log(userData);   
                resolve(userData);
            })
        });
    },

    doLogin(userData){
        return new Promise(async(resolve, reject) =>{
            let loginStatus = false;
            let response = {};
            let user = await db.getDb().collection(collections.USER_COLLECTION).findOne({email:userData.email});
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('Login Success');
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    }else{
                        console.log('Login Failed / Incorrect password');
                        resolve({status:false});
                    }
                })
            }else{
                console.log('Login Failed');
                resolve({status:false});
            }
        })
    }
};


