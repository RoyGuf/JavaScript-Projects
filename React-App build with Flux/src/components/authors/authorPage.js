'use strict';

var React = require('react');
var AuthoActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList.js');
var Link = require('react-router').Link;

var Authors = React.createClass({
  getInitialState: function(){
    return {
      authors: AuthorStore.getAllAuthors()
    };
  },
  componentWillMount: function(){
    AuthorStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    AuthorStore.removeChangeListener(this._onChange);
  },
  _onChange : function(){
    this.setState({authors: AuthorStore.getAllAuthors()});
  },
  render: function(){
    return(
      <div>
        <h1>Authors</h1>
        <Link to='addAuthor' className='btn btn-success'>Add Author</Link>
        <AuthorList authors={this.state.authors}/>
      </div>
    );
  }
});


module.exports = Authors;
