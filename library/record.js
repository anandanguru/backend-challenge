'use strict';

var Promise = require("bluebird");
var moment = require("moment");
var fs = require('fs');

var DBrecord = require('../data/record');

var validate = require('validate');

var ex = module.exports;

ex.park = function (params) {
    return new Promise(function (resolve, reject) {
        var rules = validate({
            carOwner: {
                type: 'string',
                required: false
            },
            registrationNo: {
                type: 'string',
                required: true,
                message: 'Car Registration number is required'
            },
            carColour: {
                type: 'string',
                required: false
            },
            carType: {
                type: 'string',
                required: true,
                message: 'Car Type is required'
            },
            carModel: {
                type: 'string',
                required: false
            },
            carName:{
                type: 'string',
                required: false
            },
            checkInDateTime:{
                type:'string',
                required:false
            },
            //ticketNumber:{
            //    type:'string',
            //    required:true,
            //    message: 'Ticket  Id is required'
            //},
            slotNumber:{
                type:'number',
                required:true,
                message:'Slot number is mandatory'
            },
            addedBy:{
                type:'string',
                required:true,
                message:'Person who authorize is mandatory'
            }
        });

        var errors = rules.validate(params);
        if(errors && errors.length){
            var newErrors = [];
            for(var i = 0; i < errors.length; i++){
                newErrors.push({
                    path: errors[i].path,
                    message: errors[i].message
                })
            }

            return (reject({
                code: 400,
                status: 'ERROR',
                message: 'Mandatory fields are empty',
                error: newErrors
            }));
        }

        if(!params.checkInDateTime){
            params.checkInDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        }

        params.addedDate =  moment().format('YYYY-MM-DD HH:mm:ss');

        DBrecord.park(params)
            .then(function (ticket) {
                var data = {
                    ticketNumber:ticket.ticketNumber
                };
                return resolve(data)
            })
            .catch(function (error) {
                return reject(error);
            });
    });
};

ex.unPark = function (params) {
    return new Promise(function (resolve, reject) {
        var rules = validate({
            ticketNumber: {
                type: 'string',
                required: true,
                message: 'Ticket Number is required'
            },
            checkOutDateTime:{
                type:'string', //format shoud be in 'YYYY-MM-DD HH:mm:ss' if not I will pick up the current Date Time
                required:false
            },
            modifiedBy:{
                type:'string',
                required:true,
                message:'The person who Checkouted the car is Missing'
            }
        });

        var errors = rules.validate(params);
        if(errors && errors.length){
            var newErrors = [];
            for(var i = 0; i < errors.length; i++){
                newErrors.push({
                    path: errors[i].path,
                    message: errors[i].message
                })
            }

            return (reject({
                code: 400,
                status: 'ERROR',
                message: 'Mandatory fields are empty',
                error: newErrors
            }));
        }

        if(!params.checkOutDateTime){
            params.checkOutDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        }

        params.modifiedDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        DBrecord.unPark(params)
            .then(function () {
                return resolve()
            })
            .catch(function (error) {
                return reject(error);
            });


    });
}

ex.getVehicleByNumber = function (params) {
    return new Promise(function (resolve, reject) {
        var rules = validate({
            registrationNo: {
                type: 'string',
                required: true,
                message: 'Registration Number is required'
            }
        });

        var errors = rules.validate(params);
        if(errors && errors.length){
            var newErrors = [];
            for(var i = 0; i < errors.length; i++){
                newErrors.push({
                    path: errors[i].path,
                    message: errors[i].message
                })
            }

            return (reject({
                code: 400,
                status: 'ERROR',
                message: 'Mandatory fields are empty',
                error: newErrors
            }));
        }

        DBrecord.getVehicleRecord(params)
            .then(function (data) {
                return resolve(data)
            })
            .catch(function (error) {
                return reject(error);
            });


    });
}

ex.getVehicleByColor = function (params) {
    return new Promise(function (resolve, reject) {
        var rules = validate({
            carColour: {
                type: 'string',
                required: true,
                message: 'Car colour is required'
            }
        });

        var errors = rules.validate(params);
        if(errors && errors.length){
            var newErrors = [];
            for(var i = 0; i < errors.length; i++){
                newErrors.push({
                    path: errors[i].path,
                    message: errors[i].message
                })
            }

            return (reject({
                code: 400,
                status: 'ERROR',
                message: 'Mandatory fields are empty',
                error: newErrors
            }));
        }

        DBrecord.getVehicleRecord(params)
            .then(function (data) {
                return resolve(data)
            })
            .catch(function (error) {
                return reject(error);
            });


    });
}


ex.getVehicleBySize = function (params) {
    return new Promise(function (resolve, reject) {
        var rules = validate({
            carType: {
                type: 'string',
                required: true,
                message: 'car Type is required...Accepted Params are S,M,L'
            }
        });

        var errors = rules.validate(params);
        if(errors && errors.length){
            var newErrors = [];
            for(var i = 0; i < errors.length; i++){
                newErrors.push({
                    path: errors[i].path,
                    message: errors[i].message
                })
            }

            return (reject({
                code: 400,
                status: 'ERROR',
                message: 'Mandatory fields are empty',
                error: newErrors
            }));
        }

        DBrecord.getVehicleRecord(params)
            .then(function (data) {
                return resolve(data)
            })
            .catch(function (error) {
                return reject(error);
            });


    });
}


ex.getVehicleByCheckinDuration = function (params) {
    return new Promise(function (resolve, reject) {
        var rules = validate({
            fromDate: {
                type: 'string',
                required: true,
                message: 'From Date is required'
            },
            toDate:{
                type:'string',
                required:false
            }
        });

        var errors = rules.validate(params);
        if(errors && errors.length){
            var newErrors = [];
            for(var i = 0; i < errors.length; i++){
                newErrors.push({
                    path: errors[i].path,
                    message: errors[i].message
                })
            }

            return (reject({
                code: 400,
                status: 'ERROR',
                message: 'Mandatory fields are empty',
                error: newErrors
            }));
        }

        if(!params.toDate){
            params.toDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }

        DBrecord.getVehicleByCheckinDuration(params)
            .then(function (data) {
                return resolve(data)
            })
            .catch(function (error) {
                return reject(error);
            });


    });
}