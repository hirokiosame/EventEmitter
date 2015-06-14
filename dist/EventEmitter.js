(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EventEmitter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])(1)
});