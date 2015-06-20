module.exports = (function(){

	'use strict';

	function EventEmitter(async){
		this._events = {};
		this.async = !!async;
	}

	EventEmitter.prototype.on = function on(eName, fn){

		// Must be an object
		if( !(this._events instanceof Object) ){ this._events = {}; }

		var arr;

		// Must be an array
		if( !((arr = this._events[eName]) instanceof Array) ){ this._events[eName] = []; }

		// Add function
		arr.push(fn);

		return this;
	};

	EventEmitter.prototype.off = function off(eName, fn){

		// If events not initialized or
		// If no event name, remove all events
		if(
			!(this._events instanceof Object) ||
			eName === undefined
		){ this._events = {}; }


		var arr, idx;

		// If no events to remove
		if( !((arr = this._events[eName]) instanceof Array) ){
			return false;
		}

		// Remove all
		if( fn === undefined ){
			arr.splice(0);
		}

		// Remove function
		else if( (idx = arr.indexOf(fn)) !== -1 ){
			arr.splice(idx, 1);
		}


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
		var evnts = this._events[eName],
			cb;

		for( var i = 0, len = evnts.length; i < len; i++ ){

			// Validate function
			if( !((cb = evnts[i]) instanceof Function) ){ continue; }

			// Trigger asynchronously
			if( this.async === true ){
				setTimeout((function(self, cb, args){
					return function(){ cb.apply(self, args); };
				})(this, cb, args), 0);
			}else{
				cb.apply(this, args);
			}
		}
	};

	return EventEmitter;

})();