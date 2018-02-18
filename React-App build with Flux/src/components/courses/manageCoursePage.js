'use strict';

var React = require('react');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var Router = require('react-router');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
  mixins: [
    Router.Navigation
  ],
  statics:{
    willTransitionFrom : function(transition, component){
      if (component.state.dirty && !confirm('Leave without saving?')){
        transition.abort();
      }
    }
  },
  getInitialState: function(){
    return{
      authors: AuthorStore.getAllAuthors(),
      course: {id: '', title: '', author: {id: '', name: '',firstName:'', lastName:''}, category: '', length: ''},
      errors: {},
      dirty: false,
      selectValue: ''
    };
  },
  updateValue: function (event, newV) {
    var value = event.target.value;
    var field = event.target.name;
    var value = event.target.value;
    this.state.selectValue = this.state.authors[value];
    this.state.course.author = this.state.authors[value];
    return this.setState({dirty: true, selectValue: this.state.authors[value], author: this.state.authors[value]});

	},
  componentWillMount: function(){
    var courseId = this.props.params.id;//from the path course/:id\
    if(courseId){
      this.setState({course: CourseStore.getCourseById(courseId)});
    }
  },
  setCourseState: function(event){
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.course[field] = value;
    return this.setState({course: this.state.course})
  },
  courseFormIsValid: function(){
    var formIsValid = true;
    this.state.errors = {};

    if(this.state.course.title.length < 3){
      this.state.errors.title = 'Title must be at least 3 characters.'
      formIsValid = false;
    }
    /*if(this.state.course.author.length < 3){
      this.state.errors.author = 'Author must be at least 3 characters.'
      formIsValid = false;
    }*/
    if(this.state.course.category.length < 3){
      this.state.errors.category = 'Category must be at least 3 characters.'
      formIsValid = false;
    }
    if(this.state.course.length.indexOf(':') < 0){
      this.state.errors.length = 'Length must be according to the format.'
      formIsValid = false;
    }else{
      var len = this.state.course.length.split(':');
      if(len[0]%1 !== 0 || len[1]%1 !== 0){
        this.state.errors.length = 'Length must be according to the format.'
        formIsValid = false;
      }
    }

    this.setState({
      errors: this.state.errors
    });
    return formIsValid;
  },
  saveCourse: function(event){
    event.preventDefault();

    if(!this.courseFormIsValid()){
      return;
    }
    if(this.state.course.id){
      CourseActions.updateCourse(this.state.course);
    }else{
      CourseActions.createCourse(this.state.course);
    }

    this.setState({dirty: false});
    toastr.success('Course Saved');
    this.transitionTo('courses');
  },
  render: function(){
    return(
      <CourseForm course={this.state.course}
                  onChange={this.setCourseState}
                  onSave={this.saveCourse}
                  errors={this.state.errors}
                  authors={this.state.authors}
                  updateValue={this.updateValue}
                  selectValue={this.state.selectValue}/>
    );
  }
});

module.exports = ManageCoursePage;
