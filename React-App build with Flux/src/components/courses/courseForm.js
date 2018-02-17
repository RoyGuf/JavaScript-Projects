'use strict';

var React = require('react');
var Input = require('../common/textInput');

var CourseForm = React.createClass({

  propTypes: {
    course: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },
  render: function(){

    return(
      <form>
        <h1>Manage Course</h1>
        <Input
               name='title'
               label='Title'
               onChange={this.props.onChange}
               value={this.props.course.title}
               error={this.props.errors.title} />
        <br />

        <div className='form-group'>
          <label htmlFor='author'>Author</label>
          <div className='field'>
          <select className='form-control' name='author'
                  //value={this.props.course.author.name}
                  onChange={this.props.updateValue}>
                  <option value='' key='0'>---</option>
          {this.props.authors.map(function(X, index) {
                return (<option  key={index} value={index} >{X.name}</option>);
            })}
        </select>
        </div>
      </div>

      <br />

        <Input
               name='category'
               label='Category'
               onChange={this.props.onChange}
               value={this.props.course.category}
               error={this.props.errors.category} />
        <br />

        <Input
               name='length'
               label='Length, format: MM:SS'
               onChange={this.props.onChange}
               value={this.props.course.length}
               error={this.props.errors.length} />
        <br />

        <input type='submit' value='Save' className='btn btn-default' onClick={this.props.onSave}/>
      </form>
    );
  }
});

module.exports = CourseForm;
