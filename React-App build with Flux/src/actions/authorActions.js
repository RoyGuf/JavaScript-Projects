'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/AuthorApi');
var ActionType = require('../constants/actionType');

var AuthorActions = {
  createAuthor: function(author){
      var newAuthor = AuthorApi.saveAuthor(author);

      //tell all the stores that an author was created
      Dispatcher.dispatch({
        actionType: ActionType.CREATE_AUTHOR,
        author: newAuthor
      });
  },
  deleteAuthor: function(id){
    
      AuthorApi.deleteAuthor(id);

      //tell all the stores that an author was created
      Dispatcher.dispatch({
        actionType: ActionType.DELETE_AUTHOR,
        id: id
      });
  },
  updateAuthor: function(author){
      var updatedAuthor = AuthorApi.saveAuthor(author);

      //tell all the stores that an author was created
      Dispatcher.dispatch({
        actionType: ActionType.UPDATE_AUTHOR,
        author: updatedAuthor
      });
  }
};


module.exports = AuthorActions;
