var express = require('express');
var router = express.Router();
var request = require('request');
var config = require("../config.json");
var key = config.key;

/* GET home page. */
router.get('/test', function(req, res, next) {
  getData('https://us.api.battle.net/wow/character/tichondrius/julmulleok?locale=en_US&apikey=' + key, function(err,results){
    if(err){
      res.json(err);
    }else{
      res.status(200).json(results);
    }
  });
});

router.post("/", function(req, res){
  console.log(req.body);
  var url1 = "https://us.api.battle.net/wow/character/" + req.body.serverName + "/" + req.body.charName + "?locale=en_US&apikey=" + key;
  getData(url1, function(err,results){
    if(err){
      res.json(err);
    }else{
      console.log(results);
      res.status(200).json(results);
    }
  });
});

getData.cache = {
    // key: url, value: body of the response
};

function getData(url, callback) {
  if (getData.cache[url]) {
    callback(null, getData.cache[url]);
  } else {
    request({
      url: url
    }, function(err, res, body) {
      if (err) callback(err, null);
      else {
        getData.cache[url] = JSON.parse(body);
        callback(null, getData.cache[url]);
      }
    });
  }
}

module.exports = router;
