var express = require('express')
var path = require('path');
var archive = require('../helpers/archive-helpers');

var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (router[req.method]) {
    router[req.method](req, res);
  } else {
    res.writeHead(404);
    res.end();
  }
};


var router = {
  'GET': function(req, res) {
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data){
        res.writeHead(200);
        res.end(data.toString());
      })
    } else {
      fs.readFile(archive.paths.list, 'utf8', function(err, data){
        var sites = data.toString().split('\n');
        var archiveSite = req.url.slice(1);

        var siteFound = false;
        for(var i = 0; i < sites.length; i ++){
          if(archiveSite === sites[i]) {
            siteFound = true;
            res.writeHead(200);
            fs.readFile(archive.paths.archivedSites + '/' + archiveSite, 'utf8', function(err, data) {
              res.end(data.toString());
            });
          }
        }
        if (!siteFound) {
            res.writeHead(404);
            res.end();
        }
      })
    }
  },

  'POST': function(req, res){
    var body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      console.log('POSTed: ' + body);
      archiveSite = body.slice(4);
      console.log('URL:' + archiveSite);
      fs.readFile(archive.paths.list, 'utf8', function(err, data) {
        var siteFound = false;
        var sites = data.toString().split('\n');
          for(var i = 0; i < sites.length; i ++){
            if(archiveSite === sites[i]) {
              siteFound = true;
              res.writeHead(302);
              res.end();
            }
          }
          if (!siteFound) {
            res.writeHead(302);
            fs.writeFile(archive.paths.list, data.toString() + archiveSite + '\n', function(err){
              if (err)
                console.log("can't write url to data")
              res.end();
            })
          }
      })
    });



  }

}
