module.exports = (function(){

	'use strict';

	function EventEmitter(){
		this._events = {};
	}

	EventEmitter.prototype.on = function on(eName, fn){

		// Must be an object
		if( !(this._events instanceof Object) ){ this._events = {}; }

		// Must be an array
		if( !(this._events[eName] instanceof Array) ){ this._events[eName] = []; }

		// Add function
		this._events[eName].push(fn);

		return this;
	};

	EventEmitter.prototype.off = function off(eName, fn){

		// Must be an object
		if( !(this._events instanceof Object) ){ this._events = {}; }

		// Must be an array
		if( !(this._events[eName] instanceof Array) ){ return false; }

		// Remove function
		var arr = this._events[eName];

		arr.splice(arr.indexOf(fn), 1);

		return this;
	};

	EventEmitter.prototype.emit = function emit(eName){

		// Must be an object
		if( !(this._events instanceof Object) ){ this._events = {}; }

		// Must be an array
		if( !(this._events[eName] instanceof Array) ){ return false; }

		// Slice out the arguments for emit
		var args = [].slice.apply(arguments, [1]);

		// Trigger each
		var self = this,
			evnts = this._events[eName],
			cb;

		for( var i = 0, len = evnts.length; i < len; i++ ){
			if( !((cb = evnts[i]) instanceof Function) ){ continue; }

			// Trigger asynchronously
			setTimeout((function(self, cb, args){
				return function(){ cb.apply(self, args); };
			})(self, cb, args), 0);
		}
	};

	return EventEmitter;

})();