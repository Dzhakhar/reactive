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
		var oldValue = this.state[key]["value"];

		this.state[key]["value"] = value;

		var newValue = this.state[key]["value"];
		var listeners = this.state[key]["listeners"];

		for(var i = 0; i < listeners.length; i++){
			listeners[i](newValue, oldValue);
		}
	}
}

var test = new Reactive();
var foo = function(val){console.log("Hello " + val)};

test.newValue("name", "Vasya");
test.addListener("name", foo);
test.changeValue("name", "Petya");
test.changeValue("name", "Alesha");
test.changeValue("name", "Fedya");
