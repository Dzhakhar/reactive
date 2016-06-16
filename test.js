var Reactive = function(){
	this.state = {};
	this.newValue = function(key, value){
		this.state[key] = {};
		this.state[key]["value"] = value;
		this.state[key]["listeners"] = [];
	}

	this.addListener = function(key, func, callback){
		this.state[key]["listeners"].push(func);
		if(callback){
			callback();
		}
	}

	this.changeValue = function(key, value){
		var oldState = this.state;

		this.state[key]["value"] = value;

		var newState = this.state;
		var listeners = this.state[key]["listeners"];

		for(var i = 0; i < listeners.length; i++){
			listeners[i](newState, oldState);
		}
	}
}

var test = new Reactive();
var foo = function(state){console.log("Hello, my name is " + state.name.value + "! I'm  " + state.age.value + " years old")};
test.newValue("name", "Vasya");
test.newValue("age", "35");
test.addListener("name", foo);
test.addListener("age", foo);

test.changeValue("age", "38");
