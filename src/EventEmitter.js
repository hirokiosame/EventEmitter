module.exports = (function(){

	'use strict';

	function EventEmitter(){
		this._events = {};
	}

	EventEmitter.prototype.on = function(eName, fn){

		// Must be an object
		if( !(this._events instanceof Object) ){ this._events = {}; }

		// Must be an array
		if( !(this._events[eName] instanceof Array) ){ this._events[eName] = []; }

		// Add function
		this._events[eName].push(fn);

		return this;
	};

	EventEmitter.prototype.off = function(eName, fn){

		// Must be an object
		if( !(this._events instanceof Object) ){ this._events = {}; }

		// Must be an array
		if( !(this._events[eName] instanceof Array) ){ return false; }

		// Remove function
		var arr = this._events[eName];

		arr.splice(arr.indexOf(fn), 1);

		return this;
	};

	EventEmitter.prototype.emit = function(eName){

		// Must be an object
		if( !(this._events instanceof Object) ){ this._events = {}; }

		// Must be an array
		if( !(this._events[eName] instanceof Array) ){ return false; }

		var args = [].slice.apply(arguments, [1]);
		
		// Trigger each
		this._events[eName].forEach(function(cb){
			cb instanceof Function && cb.apply(null, args);
		});
	};

	return EventEmitter;

})();