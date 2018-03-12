var dispatcher = require('./../dispatcher.js');
var React = require('react');
var createReactClass = require('create-react-class');

module.exports = {
  add: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:add'
    })
  },
  delete: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:delete'
    })
  },
  buy: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:buy'
    })
  },
  unbuy: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:unbuy'
    })
  }
}
