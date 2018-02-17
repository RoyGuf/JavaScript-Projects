'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
  render:function(){
    return(
      <nav className='navbar navbar-light'>
        <div className='container-fluid'>
            <Link to='app'><div className='bg-blend'></div></Link>
            <div className='navi nav navbar-nav'>
              <div className='s'><Link to='app' className="nav-link">Home</Link></div>
              <div className='s'><Link to='about' className="nav-link">About</Link></div>
              <div className='s'><Link to='authors' className="nav-link">Authors</Link></div>
              <div className='s'><Link to='courses' className="nav-link">Courses</Link></div>
            </div>



        </div>
      </nav>

    );
  }
});

module.exports = Header;
