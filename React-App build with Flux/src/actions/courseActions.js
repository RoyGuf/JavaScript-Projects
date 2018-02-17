'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var ActionType = require('../constants/actionType');

var CourseActions = {
  createCourse: function(course){
      var newCourse = CourseApi.saveCourse(course);

      //tell all the stores that an author was created
      Dispatcher.dispatch({
        actionType: ActionType.CREATE_COURSE,
        course: newCourse
      });
  },
  deleteCourse: function(id){

      CourseApi.deleteCourse(id);

      //tell all the stores that an author was created
      Dispatcher.dispatch({
        actionType: ActionType.DELETE_COURSE,
        id: id
      });
  },
  updateCourse: function(course){
      var updatedCourse = CourseApi.saveCourse(course);

      //tell all the stores that an author was created
      Dispatcher.dispatch({
        actionType: ActionType.UPDATE_COURSE,
        course: updatedCourse
      });
  }
};


module.exports = CourseActions;
