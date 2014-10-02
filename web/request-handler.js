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

archive.isUrlInList('www.google.com', function(found) {
  if (found) {
    console.log('GOOGLE.com FOUND');
  } else {
    console.log('GOOGLE.COM NOT FOUND');
  }
});
// console.log('Google.com archived??', archive.isURLArchived('www.google.com'));
// console.log('yahoo.com archived??', archive.isURLArchived('www.yahoo.com'));

var router = {
  'GET': function(req, res) {
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', function(err, data){
        res.writeHead(200);
        res.end(data.toString());
      })
    } else {
      var archiveSite = req.url.slice(1);
      if (archive.isURLArchived(archiveSite)) {
        res.writeHead(200);
        res.end(archive.returnArchivedURL(archiveSite));
      } else {
        res.writeHead(404);
        res.end();
      }
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
      archive.isUrlInList(archiveSite, function(found){
        console.log('callback');
        if (!found) {
          console.log("adding");
          archive.addUrlToList(archiveSite);
        }
        res.writeHead(302);
        res.end();
      });
    });



  }

}
