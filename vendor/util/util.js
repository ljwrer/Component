define([], function() {
	function create(obj) {
		if (typeof Object.create == "function") {
			return Object.create(obj);
		} else {
			function F() {}
			F.prototype = obj;
			return new F();
		}
	}
	function inheritPrototype(subType, superType) {
		var prototype = this.create(superType.prototype);
		prototype.constructor = subType;
		subType.prototype = prototype;
	}
	return {
		create: create,
		inheritPrototype: inheritPrototype
	}
})