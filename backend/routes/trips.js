var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment')

const Trip= require('../models/trips');

/* GET home page. */
router.get('/displayAllTrips', function(req, res, next) {
  Trip.find({})
  .then(data => {
    res.json({trips : data})
  })
});

router.get('/findTrips', function(req, res, next) {
    const departure = req.body.departure
    const arrival = req.body.arrival
    const date = moment(req.body.date,'DD-MM-YYYY').format('L')
    console.log(date)
    Trip.find({departure: departure, arrival: arrival})
    .then(data => {
        let result = []
        for (let trip of data){
            if (moment(trip.date).format('L') == date)
            result.push(trip)
        }
      res.json({trips : result})
    })
  });

module.exports = router;