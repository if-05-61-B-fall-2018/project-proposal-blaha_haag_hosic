const mongoose = require('mongoose');
const User = require('../../database/models/user/model');
const randtoken = require('rand-token');
const bcryp = require('bcrypt');

// Connect to database
require('../../database/config');


function generateToken() {
    let uid = randtoken.uid;
    let token = uid(256);
    return token;
}

function getToken(username, password) {
    return new Promise(function(resolve, reject) {
        User.findOne({username: username}, function(err, user) {
            if(err) {
                reject({error: "Invalid userid or password"});
            } else {
                const res = bcryp.compareSync(password, user.password);
                if(res && user.username == username) {
                    const token = generateToken();
                    user.token = token;
                    user.save(); 
                    resolve({ username: username, token: user.token });
                } else reject({error: "Invalid userid or password"});
            }
        });
    });
}

module.exports = { getToken };