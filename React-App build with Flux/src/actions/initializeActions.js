'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/AuthorApi');
var CourseApi = require('../api/CourseApi');
var ActionType = require('../constants/actionType');

var initializeActions = {
  initApp: function(){
    Dispatcher.dispatch({
      actionType: ActionType.INITIALIZE,
      initialData:{
        authors: AuthorApi.getAllAuthors(),
        courses: CourseApi.getAllCourses()
      }
    });
  }
};

module.exports = initializeActions;
