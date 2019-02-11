'use strict'

var mongoclient = require('./mongoclient');
var Promise = require('bluebird');
var ex = module.exports;

ex.park = async function (params) {
    params._id = params.ticketNumber = await mongoclient.getNextSequenceValue('parkingInformation','ticketNumber');
    console.log(params);
    return mongoclient.insert('parkingInformation',params)
};

ex.unPark = function(params){
    let filter = params.ticketNumber
  console.log(params);
    return mongoclient.update('parkingInformation',filter,{checkOutDateTime:params.checkOutDateTime,modifiedBy:params.modifiedBy,modifiedDateTime:params.modifiedDateTime})
};


ex.getVehicleRecord = function (params) {
    console.log(params)
    return mongoclient.query('parkingInformation',params)
};

ex.getVehicleByCheckinDuration = function (params) {
    var query = {
        checkInDateTime: {
            $gte: params.fromDate,
            $lt:  params.toDate
        }
    }

    console.log(query);
    return mongoclient.query('parkingInformation',query)
};

