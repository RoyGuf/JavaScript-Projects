'use strict';
var React = require('react');
var routes = require('./routes.js')
var Router = require('react-router');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes,  function(Handler){
  React.render(<Handler/>, document.getElementById('app'));
});

//Router.HistoryLocation
