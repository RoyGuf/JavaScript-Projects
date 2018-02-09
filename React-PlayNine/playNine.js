
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};
const Stars = (props) => {

  let stars = [];
  for(let i =0;i<props.numberOfStars;i++){
    stars.push(<i key={i} className='fa fa-star fa-2x'></i>)
  }
  return (
    <div className='col-md-2'>
      {stars}
    </div>
  );
};
const Button = (props) => {
  let button;
  switch(props.answerIsCorrect){
    case true:
      button =
      <button className='btn btn-success' onClick={props.acceptAnswer}>
        <i className='fa fa-check'></i>
      </button>
      break;
    case false:
    button =
    <button className='btn btn-danger' >
      <i className='fa fa-times'></i>
    </button>
      break;
    default:
      button =
      <button className='btn b'
              onClick={props.checkAnswer}
              disabled={props.selectedNum.length === 0}>
      =
      </button>
      break;
  }
  return (
    <div className='col-md-6 col-md-offset-1 text-center'>
      {button}
      <br /><br />
      <button className='btn-warning ref' onClick={props.redraw}
              disabled={props.redraws === 0}>
        <i className='fa fa-refresh'></i><i>{props.redraws}</i><br/><i>Redraw</i>
      </button>
    </div>
  );
};
const Answer = (props) => {
  return (
    <div className='col-md-2'>
		  {props.selectedNum.map((number, i)=>
        <span id='n' key={i} onClick={()=>props.unselectNumber(number)}>
        {number}
        </span>
      )}
    </div>
  );
};

const Numbers = (props) =>{


  const numClassName = (number) =>{
    if(props.usedNumber.indexOf(number) >= 0){
      return 'used';
    }
    if(props.selectedNum.indexOf(number) >= 0){
      return 'selected';
  }
 };
  return(
      <div className='card-block text-center col-sm-12'>

        <div >
          {Numbers.list.map((number, i)=>
            <span key={i} className={numClassName(number)} id='n'
            onClick={()=>props.selectNumber(number)}>
            {number}
            </span>
          )}
        </div>
        <span className='card text-center ' id='clk'>00 :{props.sec}</span>
      </div>
  );
};
Numbers.list = [1,2,3,4,5,6,7,8,9];

const DoneFrame = (props) =>{
  return (
    <div className='text-center'>
      <h2>{props.doneStatus}</h2>
      <button className='btn btn-secondary' onClick={props.resetGame}>
        Play Again
      </button>
    </div>
  );
};
class Game extends React.Component{
  static initialState =()=> ({
    selectedNum: [],
    randomNum: 1+Math.floor(Math.random()*9),
    usedNumber: [],
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null,
    sec: 60,
    time: false
  });
  state = Game.initialState();
  resetGame = () =>{
    this.setState(Game.initialState())
  };
  timer = () =>{
  	var inte, sec=this.state.sec;
  	if(parseInt(this.state.sec) !== 0){
    	inte=setInterval(()=>{this.setState(preState =>({
      	sec: preState.sec-1}));
        if(this.state.sec === 0){
        	clearInterval(inte);
          this.setState(preState =>({doneStatus: 'Game Over!'}));
        }}, 1000);
    }
    this.setState(preState =>({
      time: true}))
  };
  selectNumber =(clickedNumber)=>{
  	//this.timer();
    if(this.state.selectedNum.indexOf(clickedNumber)>=0){return;}
    if(this.state.usedNumber.indexOf(clickedNumber)>=0){return;}
    this.setState(preState =>({
      answerIsCorrect: null,
      selectedNum: preState.selectedNum.concat(clickedNumber)
    }));
    if(this.state.time==false){
    	this.timer();
    }
    //this.timer();
  };
  unselectNumber = (clickedNumber)=>{
    this.setState(preState =>({
      answerIsCorrect: null,
      selectedNum: preState.selectedNum
                              .filter(number => number!==clickedNumber)
    }));
  };
  checkAnswer = () => {
    this.setState(preState=>({
      answerIsCorrect: preState.randomNum ===
      preState.selectedNum.reduce((acc, n) => acc+n, 0)
    }));
  };
  acceptAnswer = () =>{
    this.setState(preState =>({
      usedNumber: preState.usedNumber.concat(preState.selectedNum),
      selectedNum: [],
      answerIsCorrect: null,
      randomNum: 1+Math.floor(Math.random()*9)
  }), this.updateDoneStatus);
  };
  redraw = () =>{
    if(this.state.redraws === 0){return;}
    this.setState(preState => ({
      answerIsCorrect: null,
      randomNum: 1+Math.floor(Math.random()*9),
      selectedNum: [],
      redraws: preState.redraws -1,
    }), this.updateDoneStatus);
  };
  possibleSolutions =({randomNum, usedNumber})=>{
    const possibleNum = _.range(1,10).filter(number =>
      usedNumber.indexOf(number) === -1
    );
    return possibleCombinationSum(possibleNum, randomNum);
  };
  updateDoneStatus =()=>{
    this.setState(preState=>{
      if(preState.usedNumber.length === 9){
        return {doneStatus: 'Done, Nice!'};
      }
      if(preState.redraws === 0 && !this.possibleSolutions(preState)){
        return {doneStatus: 'Game Over!'};
      }
    });
  };
  render(){
    return (
      <div className='container'>
        <h3>Play Nine</h3>
        <hr />
        <div className='row'>
          <Stars numberOfStars={this.state.randomNum}/>
          <Button selectedNum={this.state.selectedNum}
                  redraws={this.state.redraws}
                  checkAnswer={this.checkAnswer}
                  answerIsCorrect={this.state.answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}/>
          <Answer selectedNum={this.state.selectedNum}
                  unselectNumber= {this.unselectNumber}/>
        </div>
        <br />
        <hr />
        {this.state.doneStatus ?
            <DoneFrame doneStatus={this.state.doneStatus}
                        resetGame={this.resetGame}/> :
            <Numbers selectedNum={this.state.selectedNum}
                      selectNumber={this.selectNumber}
                      usedNumber={this.state.usedNumber}
                      timer={this.timer}
                      sec={this.state.sec}/>
        }
      </div>
    );
  };
};



class App extends React.Component{
  render(){
    return (
      <div>
        <Game />
       </div>
    );
  };
};


ReactDOM.render(<App /> , document.body);
