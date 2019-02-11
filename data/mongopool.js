var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var mongoConfig = JSON.parse(fs.readFileSync('config/mongo.json', 'utf-8'));
var Promise = require('bluebird');
var ex = module.exports;

var p_db = null;
var url = 'mongodb://'+mongoConfig.host+':'+mongoConfig.port+'/'+mongoConfig.database;
ex.initPool = function (){
    return new Promise(function (resolve,reject){
        MongoClient.connect(url, mongoConfig.option, function(err, db) {
            if(err){
                return reject(err);
            }else{
                console.log('db');
                p_db = db;
                db.on('close', function() {
                    console.log('closing');
                    p_db = null;
                });
                return resolve(p_db);
            }
        });
    });
}

ex.getInstance = function(){
    return new Promise(function(resolve, reject){
        if(p_db){
            return resolve(p_db);
        }else{
            ex.initPool().then(function (db){
                return resolve(db);
            }).catch(function (err){
                return reject(err);
            })
        }
    });
}

process.on('beforeExit', (code) => {
    console.log('About to exit with code:', code);
    if (p_db)
        p_db.close();
});
