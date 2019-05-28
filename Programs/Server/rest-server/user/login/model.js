const mongoose = require('mongoose');
const User = require('../../database/models/user/model');
const randtoken = require('rand-token');
const bcryp = require('bcrypt');

// Connect to database
require('../../database/config');


function generateToken() {
    let uid = randtoken.uid;
    let token = uid(4);
    //return token;
    return "TOKEN";
}

function getToken(username, password) {
    return new Promise(function(resolve, reject) {
        User.findOne({username: username}, function(err, user) {
            if(err) {
                reject({error: "Invalid username or password"});
            } else {
                const res = user !== null ? bcryp.compareSync(password, user.password) : false;
                if(res && user.username == username) {
                    const token = generateToken();
                    user.token = token;
                    user.save(); 
                    resolve({ username: username, token: user.token });
                } else reject({error: "Invalid username or password"});
            }
        });
    });
}

module.exports = { getToken };