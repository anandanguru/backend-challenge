'use strict';

var MongoPool = require("./mongopool");
var ex = module.exports;


ex.query = function (table, query) {
    return new Promise(function(resolve, reject){
        MongoPool.getInstance()
            .then(function (db){
                db.collection(table).find(query).toArray(function (err,result){
                    if(!err)
                        return resolve(result);
                    else
                        return reject(err);
                });
            })
            .catch(function (err){
                return reject(err);
            })
    })
}


ex.insert = function (table, records, update) {
    return new Promise(function (resolve, reject){
        MongoPool.getInstance()
            .then(function (db){
                if(update){
                    if(Array.isArray(records)){
                        let tempQuery=[];
                        for(let l in records){
                            tempQuery.push({updateOne:{filter:{"id":records[l].id},update:{$set:records[l]},upsert:true}});
                        }
                        return db.collection(table).bulkWrite(tempQuery,null,function(err,result){
                            if(!err)
                                return resolve('Inserted');
                            else
                                return reject(err);
                        });
                    } else {
                        return db.collection(table).updateOne({filter:{"id":records.id}},{$set:records},{upsert:true},function(err,result){
                            if(!err)
                                return resolve('Inserted');
                            else
                                return reject(err);
                        });
                    }
                }else{
                    if (Array.isArray(records)) {
                        return db.collection(table).insertMany(records,null,function(err,result){
                            if(!err)
                                return resolve('Inserted');
                            else
                                return reject(err);
                        });
                    } else {
                        return db.collection(table).insertOne(records,null,function(err,result){
                            if(!err)
                                return resolve(result.ops[0]);
                            else
                                return reject(err);
                        });
                    }
                }
            })
            .catch(function (err){
                return reject(err);
            })
    });
}
ex.get = function (table, key) {
    return new Promise(function (resolve ,reject){
        MongoPool.getInstance()
            .then(function (db){
                db.collection(table).findOne({'id':key},function(err,result){
                    if(!err)
                        return resolve(result);
                    else
                        return reject(err);
                })
            })
            .catch(function (err){
                return reject(err);
            })
    });
}
ex.getAll = function (table) {
    return new Promise(function(resolve, reject){
        MongoPool.getInstance()
            .then(function (db){
                db.collection(table).find().toArray(function (err,result){
                    if(!err)
                        return resolve(result);
                    else
                        return reject(err);
                });
            })
            .catch(function (err){
                return reject(err);
            })
    })
}

ex.remove = function (table, key) {
    return new Promise(function (resolve ,reject){
        MongoPool.getInstance()
            .then(function (db){
                db.collection(table).deleteOne({'id':key},null,function(err,result){
                    if(!err)
                        return resolve('Deleted');
                    else
                        return reject(err);
                });
            })
            .catch(function (err){
                return reject(err);
            })
    })
}

ex.update = function (table, key, update){
    return new Promise(function (resolve ,reject){
        MongoPool.getInstance()
            .then(function (db){
                return db.collection(table).findOneAndUpdate({_id:key},{$set:update},{upsert:true},function(err,result){
                    if(!err)
                        return resolve(result);
                    else
                        return reject(err);
                });
            })
            .catch(function (err){
                return reject(err);
            })
    })
};

ex.getNextSequenceValue = function(table){
    return new Promise(function (resolve ,reject) {
        MongoPool.getInstance()
            .then(function (db) {
                db.collection(table).find().toArray(function (err,result) {
                    if (!err)
                        return resolve(result.length + 1);
                    else
                        return reject(err);
                })
            })
            .catch(function (err) {
                return reject(err);
            })
    });
}

