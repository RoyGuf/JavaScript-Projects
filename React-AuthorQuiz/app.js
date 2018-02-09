

(function(){
  'use strict';
  var Quiz = React.createClass({
    propTypes: {
      data: React.PropTypes.array.isRequired
    },
    getInitialState(){
      return _.extend({
        bgClass: 'neutral',
        showContinue: false
      },this.props.data.selectGame());
    },
    handleBookSelected: function(title){

      var isCorrect = this.state.checkAnswer(title);
      this.setState(preState=>({
        bgClass: isCorrect ? 'pass' : 'fail',
        showContinue: isCorrect
      }));
    },
    handleContinue(){
      this.setState(this.getInitialState());
    },
    handleAddGame(){
      routie('add');
    },
    render(){
      return(<div>
          <div className='row'>
            <div className='col-md-4 img'>
              <img src={this.state.author.image} className='authorimage' title={this.state.author.name}/>
            </div>
            <div className='col-md-7'>
              {this.state.books.map(function(b){
                return <Book onBookSelected={this.handleBookSelected} title={b} />;
              },this)}
            </div>
            <div className={"col-md-1 " + this.state.bgClass} />
          </div>
            {this.state.showContinue ? (
              <div className='row'>
                <div className='col-md-12'>
                  <input onClick={()=>this.handleContinue()} type='button' value='Continue' className='btn btn-success'/>
                </div>
              </div>
            ): <span/>}
          <div className='row'>
            <div className='col-md-12'>
              <input onClick={this.handleAddGame} id='addGameBtn' type='button' value='Add Game' className='btn-primary' />
            </div>
          </div>
          </div>
      );}

  });
  var Book = React.createClass({
    propTypes: {
      title: React.PropTypes.string.isRequired
    },
    handleClick(){
      this.props.onBookSelected(this.props.title);
    },
    render(){
      return(<div onClick={()=>this.handleClick()} className='ans'>
                <h4>{this.props.title}</h4>
             </div>);
    }
  });

  var AddGameForm = React.createClass({
    propTypes: {
      onGameSub: React.PropTypes.func.isRequired
    },
    handleSubmit(){
      var data = getRefs(this);
      this.props.onGameSub(getRefs(this));
      console.log(data);
      return false;
    },
    render(){
      return(
      <div class='row'>
        <div class='col-md-12'>
          <h1>Add Game</h1>
          <form role='form' onSubmit={this.handleSubmit}>
            <div className='col-md-12'>
              <input ref='imageUrl' text='text' placeholder='imageUrl'/>
            </div>
            <div className='col-md-12'>
              <input ref='answer1' text='text' placeholder='answer1'/>
            </div>
            <div className='col-md-12'>
              <input ref='answer2' text='text' placeholder='answer2'/>
            </div>
            <div className='col-md-12'>
              <input ref='answer3' text='text' placeholder='answer3'/>
            </div>
            <div className='col-md-12'>
              <input ref='answer4' text='text' placeholder='answer4'/>
            </div>
            <button type='submit' className='btn btn-default'>Submit</button>
          </form>
        </div>
      </div>);
    }

  });

  var data = [
    {
      name: 'Mark Twain',
      image: 'images/authors/mark.jpg',
      books: ['The Innocents Aboard', 'Roughing It']
    },
    {
      name: 'Joseph Conrad',
      image: 'images/authors/joseph.png',
      books: ['lord Jim', 'Nostromo', 'The Secret Agent']
    },
    {
      name: 'J.K. Rowling',
      image: 'images/authors/jk.jpg',
      books: ['Harry Potter and the Deathly hallows']
    },
    {
      name: 'Stephen King',
      image: 'images/authors/stephen.jpg',
      books: ['It', 'The Shining', 'Misery']
    },
    {
      name: 'Charles Dickens',
      image: 'images/authors/charles.jpg',
      books: ['A Christmas Carol', 'Oliver TWist', 'Bleak House']
    },
    {
      name: 'William Shakespeare',
      image: 'images/authors/shake.jpg',
      books: ['Hamlet', 'King Lear', 'The Tempest']
    }
  ];
  var selectGame = function(){
    var books = _.shuffle(this.reduce(function(p, c, i){
      return p.concat(c.books);
    },[])).slice(0,4);

    var answer = books[_.random(books.length-1)];

    return {
      books: books,
      author: _.find(this, function(author){
        return author.books.some(function(title){
          return title === answer;
        });
      }),

      checkAnswer: function(title){
        return this.author.books.some(function(t){
          return t === title;
        });
      }
    };
  };
  data.selectGame = selectGame;

  routie({
    '': function(){
      ReactDOM.render(<Quiz data={data}/>, document.getElementById('app'));
    },
    'add': function(){
      ReactDOM.render(<AddGameForm onGameSub={handleAddForm}/>, document.getElementById('app'));
    }
  });

function handleAddForm (data){
  var quizData = [{
    image: data.imageUrl,
    books: [data.answer1, data.answer2, data.answer3, data.answer4]
  }];
  quizData.selectGame = selectGame;
  ReactDOM.render(<Quiz data={quizData}/>, document.getElementById('app'));
}

function getRefs(component){
  var result = {};
  Object.keys(component.refs).forEach(function(refName){
    result[refName]= component.refs[refName].getDOMNode().value;
  });
  return result;
}


})();
