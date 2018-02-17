'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NotFoundPage = React.createClass({
  render:function(){
    return(
      <div className='jumbotron'>
        <h1>Page Not Found</h1>
        <p>Whoops! Sorry, there is nothing to see here.</p>
        <p><Link to='app' >Back to Home</Link></p>
      </div>
    );
  }
});

module.exports = NotFoundPage;
