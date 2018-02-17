'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/AuthorApi');
var ActionType = require('../constants/actionType');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var _author = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback){
    this.on('change', callback);
  },
  removeChangeListener: function(callback){
    this.removeListener('change', callback);
  },
  emitChange: function(callback){
    this.emit('change');
  },
  getAllAuthors: function(){
    return _author;
  },
  getAuthorById: function(id){
    return _.find(_author, {id:id});
  }
});

Dispatcher.register(function(action){
  switch(action.actionType){
    case ActionType.INITIALIZE:
        _author = action.initialData.authors;
        AuthorStore.emitChange();
        break;
    case ActionType.CREATE_AUTHOR:
        _author.push(action.author);
        AuthorStore.emitChange();
        break;
    case ActionType.UPDATE_AUTHOR:
        var existingAuthor = _.find(_author, {id: action.author.id});
        var existingAuthorIndex = _.indexOf(_author, existingAuthor);
        _author.splice(existingAuthor, 1, action.author);
        AuthorStore.emitChange();
        break;
    case ActionType.DELETE_AUTHOR:
        _.remove(_author, function(author){
          return action.id === author.id;
        });
        AuthorStore.emitChange();
        break;
    default:
        //no op
  }
});

module.exports = AuthorStore;
