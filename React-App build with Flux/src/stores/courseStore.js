'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var ActionType = require('../constants/actionType');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var _course = [];

var CourseStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback){
    this.on('change', callback);
  },
  removeChangeListener: function(callback){
    this.removeListener('change', callback);
  },
  emitChange: function(callback){
    this.emit('change');
  },
  getAllCourses: function(){
    return _course;
  },
  getCourseById: function(id){
    return _.find(_course, {id:id});
  }
});

Dispatcher.register(function(action){
  switch(action.actionType){
    case ActionType.INITIALIZE:
        _course = action.initialData.courses;
        CourseStore.emitChange();
        break;
    case ActionType.CREATE_COURSE:
        _course.push(action.course);
        CourseStore.emitChange();
        break;
    case ActionType.UPDATE_COURSE:
        var existingCourse = _.find(_course, {id: action.course.id});
        var existingCourseIndex = _.indexOf(_course, existingCourse);
        _course.splice(existingCourse, 1, action.course);
        CourseStore.emitChange();
        break;
    case ActionType.DELETE_COURSE:
        _.remove(_course, function(course){
          return action.id === course.id;
        });
        CourseStore.emitChange();
        break;
    default:
        //no op
  }
});

module.exports = CourseStore;
