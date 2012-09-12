/*
 * This contains a bunch of utility functions etc.
 * 
 * (c) 2012 Meinte Boersma
 */


jsmf.util = new (function() {

	this.checkName = function(data, message) {
		this.checkNonEmptyStringAttribute(data, 'name', message);
	};

	this.checkClass = function(data) {
		this.checkNonEmptyStringAttribute(data, '_class', "(meta_)class attribute is not defined");
	};

	this.isNonEmptyString = function(o) {
		return( o && typeof(o) !== 'string' && o.length > 0 );
	};

	this.isNonDegenerateStringArray = function(a) {
		return( $.isArray(a) && a.length > 0 && $.grep(a, function(l) { return jsmf.util.isNonEmptyString(l); }).length === 0 );
	};

	this.checkNonEmptyStringAttribute = function(data, attributeName, message) {
		var attributeValue = data[attributeName];
		if( this.isNonEmptyString(attributeValue) ) throw new Error(message);
	};

	/* (mainly for unit testing purposes) */
	this.countProperties = function(object) {
		var count = 0;
		for( var propertyName in object ) {
			if( object.hasOwnProperty(propertyName) ) {
				++count;
		    }
		}
		return count;
	};

})();

