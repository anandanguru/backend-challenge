'use strict';

var express = require('express');
var router = express.Router();
var LBrecord = require('../library/record');
var fs = require('fs');

/*
Route:http://localhost:5001/api/park
Author:anandan4271067@yahoo.com
Inparams:{
 "carOwner":" ", //Non-Mandatory
 "registrationNo": "", //Mandatory
 "carColour": "", //Non-Mandatory
 "carType": "", //Mandatory to assign slot
 "carModel": "", //Non-Mandatory
 "checkInDateTime":"", //Non-Mandatory id null picks the current date
 "slotNumber":0, //integer Mandatory
 "addedBy": "" //Mandatory who allots the parking
 }
 Outparams:{
  status:"SUCCESS",
  data:{"ticketNumber":1}
 }
 */

router.post('/park', function (req,res){
    if(req.body){
        LBrecord.park(req.body)
            .then (function (data){
                res.status(200).json({status:"SUCCESS",data:data});
            })
            .catch (function (error){
                console.log(error);
                res.status(500).json({status:"ERROR", message:'Unable to park Slot for a Car',error:error});
            });
    }else{
        res.status(500).json({status:"ERROR", message:'Invalid Parameters!!!'});
    }

});

/*
 Route:http://localhost:5001/api/unPark
 Author:anandan4271067@yahoo.com
 Inparams:{
 "ticketNumber":" ", //Mandatory
 "modifiedDateTime":"" //YYYY-MM-DD HH:mm:ss NOn-Mandatory if not picks the current Date
 "modifiedBy": "" //Mandatory who opens  the slot
 }
 Outparams:{
 status:"SUCCESS",
 }
 */

router.post('/unPark', function (req,res){
    if(req.body){
        LBrecord.unPark(req.body)
            .then (function (data){
                res.status(200).json({status:"SUCCESS"});
            })
            .catch (function (error){
                console.log(error);
                res.status(500).json({status:"ERROR", message:'Unable to unpark Slot for a Car',error:error});
            });
    }else{
        res.status(500).json({status:"ERROR", message:'Invalid Parameters!!!'});
    }

});

/*
 Route:http://localhost:5001/api/getVehicleByNumber
 Author:anandan4271067@yahoo.com
 Inparams:{
 "registrationNo":" ", //Mandatory
 }
 Outparams:{
 status:"SUCCESS",
 data:[]//array of records
 }
 */

router.post('/getVehicleByNumber', function (req,res){
    if(req.body){
        LBrecord.getVehicleByNumber(req.body)
            .then (function (data){
                res.status(200).json({status:"SUCCESS",data:data});
            })
            .catch (function (error){
                console.log(error);
                res.status(500).json({status:"ERROR", message:'Unable to Get Vehicle By Registration Number',error:error});
            });
    }else{
        res.status(500).json({status:"ERROR", message:'Invalid Parameters!!!'});
    }

});

/*
 Route:http://localhost:5001/api/getVehicleByColor
 Author:anandan4271067@yahoo.com
 Inparams:{
 "carColour":" ", //Mandatory
 }
 Outparams:{
 status:"SUCCESS",
 data:[]//array of records
 }
 */


router.post('/getVehicleByColor', function (req,res){
    if(req.body){
        LBrecord.getVehicleByColor(req.body)
            .then (function (data){
                res.status(200).json({status:"SUCCESS",data:data});
            })
            .catch (function (error){
                console.log(error);
                res.status(500).json({status:"ERROR", message:'Unable to Get Vehicle By Colour',error:error});
            });
    }else{
        res.status(500).json({status:"ERROR", message:'Invalid Parameters!!!'});
    }

});
/*
 Route:http://localhost:5001/api/getVehicleBySize
 Author:anandan4271067@yahoo.com
 Inparams:{
 "carType":" ", //Mandatory, Accepted Params are S,M,L
 }
 Outparams:{
 status:"SUCCESS",
 data:[]//array of records
 }
 */

router.post('/getVehicleBySize', function (req,res){
    if(req.body){
        LBrecord.getVehicleBySize(req.body)
            .then (function (data){
                res.status(200).json({status:"SUCCESS",data:data});
            })
            .catch (function (error){
                console.log(error);
                res.status(500).json({status:"ERROR", message:'Unable to Get Vehicle By size',error:error});
            });
    }else{
        res.status(500).json({status:"ERROR", message:'Invalid Parameters!!!'});
    }

});

/*
 Route:http://localhost:5001/api/getVehicleByCheckinDuration
 Author:anandan4271067@yahoo.com
 Inparams:{
 "fromDate":"YYYY-MM-DD HH:mm:ss", //Mandatory
 "toDate":"YYYY-MM-DD HH:mm:ss" //Non-mandatory picks the current Date if null
 }
 Outparams:{
 status:"SUCCESS",
 data:[]//array of records
 }
 */

router.post('/getVehicleByCheckinDuration', function (req,res){
    if(req.body){
        LBrecord.getVehicleByCheckinDuration(req.body)
            .then (function (data){
                res.status(200).json({status:"SUCCESS",data:data});
            })
            .catch (function (error){
                console.log(error);
                res.status(500).json({status:"ERROR", message:'Unable to Get Vehicle for given duration',error:error});
            });
    }else{
        res.status(500).json({status:"ERROR", message:'Invalid Parameters!!!'});
    }

});

module.exports = router;