
var GroceryItemList = require('./components/GroceryItemList.jsx');
var React = require('react');
var ReactDOM = require('react-dom');
var groceryItemStore = require('./stores/GroceryItemStore.jsx')

var initial = groceryItemStore.getItem();
function render(){
	ReactDOM.render(<GroceryItemList items={initial}/>, app)
};
groceryItemStore.onChange(function(item){
	initial = item;
	render();
})
render();
