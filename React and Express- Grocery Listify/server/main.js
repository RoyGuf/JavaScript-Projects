var express = require('express');
var parser = require('body-parser');
require('babel-register')({
  ignore: /node_modules\/(?!react-components)/
});
require('./database.js');

var React = require('react');
var createFactory = require('create-react-factory');
var GroceryItem = require('./models/GroceryItems.js');

var app = new express();

app.get('/', function(req,res){
  res.render('./../app/index.ejs', {reactOut: 'Loading...'});
  /*var application =
   createFactory(require('./../app/components/GroceryItemList.jsx'));

   GroceryItem.find(function(error,doc){
     var generated = React.renderToString(application({
       items: doc
     }));
     res.render('./../app/index.ejs', {});
   })*/
})
.use(express.static(__dirname + '/../.tmp'))
.use(express.static(__dirname + '/../bower_components'))
.listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

require('./routes/items.js')(app);
