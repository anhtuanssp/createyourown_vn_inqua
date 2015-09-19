Array.remove = function(array, from, to) {
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
};

MYLIB = (function () {

	var setCookie = function (cookieName, cookieValue, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString() + ";path=/");
	}

	var getCookie = function (cookieName) {
		if (document.cookie.length > 0) {
			cookieStart = document.cookie.indexOf(cookieName + "=");
			if (cookieStart != -1) {
				cookieStart = cookieStart + cookieName.length + 1;
				cookieEnd = document.cookie.indexOf(";", cookieStart);
				if (cookieEnd == -1) cookieEnd = document.cookie.length;
				return unescape(document.cookie.substring(cookieStart, cookieEnd));
			}
		}
		return "";
	}

	var getUtcOffset = function () {
		return (new Date()).getTimezoneOffset();
	}

	var checkCookie = function () {
		var timeOffset = getCookie("TimeZoneOffset");
		var reload = false;
		if (timeOffset == null || timeOffset == "") {
			setCookie("TimeZoneOffset", getUtcOffset(), 30);
			reload = true;
		}
	}

	checkCookie();

	var getClassInfo = function (className) {
		var parts = className.split('.');
		var metadata = {};
		metadata.className = className;
		var namespaceString = '';
		if (parts.length > 1) {
			metadata.className = parts.pop();
			namespaceString = parts.join('.');
			metadata.namespace = ns(namespaceString);
		} else {
			metadata.namespace = window;
		}
		return metadata;
	};

	var createBaseClass = function () {
		return function () {
			if (this.parent && this.parent.initialize) {
				this.parent.initialize.apply(this, arguments);
			}
			if (this.initialize) {
				this.initialize.apply(this, arguments);
			}
		};
	};

	var ns = function (nsString) {
		var parts = nsString.split('.'),
			parent = window,
			currentPart = '';

		for (var i = 0, length = parts.length; i < length; i++) {
			currentPart = parts[i];
			parent[currentPart] = parent[currentPart] || {};
			parent = parent[currentPart];
		}

		return parent;
	};

	var mixin = function (object, config) {
		var prop = 0;
		if (object && config) {
			if (typeof config === 'object') {
				for (prop in config) {
					object.prototype[prop] = config[prop];
				}
			} else if (typeof config === 'function') {

				for (prop in config.prototype) {
					object.prototype[prop] = config.prototype[prop];
				}
				for (prop in config) {
					object[prop] = config[prop];
				}
			}
		}
		return object;
	};
	var extend = function (subClass, superClass) {
		var parentInstance = new superClass();
		var oldProperties = subClass.prototype;
		subClass.prototype = parentInstance;
		subClass.prototype.constructor = subClass;
		subClass.prototype.parent = [];
		subClass.prototype.parent.constructor = superClass;
		subClass.prototype.parent.instance = parentInstance;
		subClass.prototype.parent.proto = superClass.prototype;

		for (var prop in oldProperties) {
			subClass.prototype[prop] = oldProperties[prop];
		}
	};
	var createFuncFromLiteral = function (literal) {
		var F = function () {};
		mixin(F, literal);
		return F;
	};
	var createMixin = function (func, mixinOptions) {
		var mixinClassMetaData,
			mixinClass,
			funcMixin;
			
		if (typeof mixinOptions == 'array') {

			for (var i = 0; i < mixinOptions.length; i++) {
				mixinClassMetaData = getClassInfo(mixinOptions[i]);
				mixinClass = mixinClassMetaData.namespace[mixinClassMetaData.className];
				funcMixin = new mixinClass();
				mixin(func, funcMixin);
			}
			
		} else if (typeof mixinOptions == 'string') {

			mixinClassMetaData = getClassInfo(mixinOptions);
			mixinClass = mixinClassMetaData.namespace[mixinClassMetaData.className];
			funcMixin = new mixinClass();
			mixin(func, funcMixin);
			
		}
	};
	return {
		namespace: ns,
		mixin: mixin,
		extend: extend,
		def: function (options, funcObj) {
			var extendClassMetaData,
				extendClass,
				metadata = getClassInfo(options.type),
				F = null,
				func = funcObj;

			if (typeof func == 'object') {
				func = createFuncFromLiteral(func);
			}
			if (options.extend) {
				if (func) {
					F = function () {
						func.call(this);
						if (this.initialize) {
							this.initialize.apply(this, arguments);
						}
					};
				}
				else {
					F = function () {
						if (this.parent && this.parent.instance.initialize) {
							this.parent.instance.initialize.apply(this, arguments);
						}
					};
				}
				extendClassMetaData = getClassInfo(options.extend);
				extendClass = extendClassMetaData.namespace[extendClassMetaData.className];
				extend(F, extendClass);
			} else {
				F = createBaseClass();
				if (func) {
					extend(F, func);
				}
			}
			if (options.mixin) {

				createMixin(F, options.mixin);
			}

			metadata.namespace[metadata.className] = F;
			return metadata.namespace[metadata.className];
		}
	};

})();

MYLIB.templateManager = null;

MYLIB.eventManager = null;

MYLIB.namespace('MYLIB.Event');

MYLIB.Event.ObserverMixin = function() {};

MYLIB.Event.ObserverMixin.prototype.addListener = function(eventName, listenerObj, functionName) {
	var listener = {};
	if(typeof this.eventListeners == 'undefined') {
		this.eventListeners = new Array();
	}
	if (typeof this.eventListeners[eventName] == 'undefined') {
		this.eventListeners[eventName] = [];
	}
	listener.obj = listenerObj;
	listener.functionName = functionName;
	this.eventListeners[eventName].push(listener);
};

MYLIB.Event.ObserverMixin.prototype.removeListener = function(eventName, listenerObj) {
	var arrayLength = this.eventListeners[eventName].length;
	var i, foundIndex;
	if(typeof this.eventListeners == 'undefined') {
		this.eventListeners = new Array();
	}
	if (arrayLength == 0) {
		return;
	}
	foundIndex = -1;
	for (i = 0; i < arrayLength; i++) {
		if (this.eventListeners[eventName][i].obj === listenerObj) {
			foundIndex = i;
			break;
		}
	}
	if (foundIndex >= 0) {
		this.eventListeners[eventName] = Array.remove(
				this.eventListeners[eventName], foundIndex);
	}
};

MYLIB.Event.ObserverMixin.prototype.removeAllListeners = function(event) {
	this.eventListeners[event] = [];
};

MYLIB.Event.ObserverMixin.prototype.fireEvent = function(eventName, eventDataObj) {
	var eventData = {};
	if(typeof this.eventListeners == 'undefined') {
		this.eventListeners = new Array();		
	}
	if(typeof this.eventListeners[eventName]=='undefined') {
		return;	
	}
	eventData.sender = this;
	eventData.name = eventName;
	eventData.data = eventDataObj;	
	for (var listenerIterator in this.eventListeners[eventName]) {
		var listenerObj = this.eventListeners[eventName][listenerIterator];

		if (listenerObj && listenerObj.obj) {
			listenerObj.obj[listenerObj.functionName].apply(
					listenerObj.obj, [eventData]);
		}
	}
};

MYLIB.Event.EventManager = function() {
	this.eventListeners = new Array();
};

MYLIB.Event.EventManager.prototype.unsubscribe = function(event, listenerObj) {
	var arrayLength = this.eventListeners[event].length;
	var i, foundIndex;
	if (arrayLength == 0)
		return;
	foundIndex = -1;
	for (i = 0; i < arrayLength; i++) {
		if (this.eventListeners[event][i].obj === listenerObj) {
			foundIndex = i;
			break;
		}
	}
	if (foundIndex >= 0) {
		this.eventListeners[eventName] = Array.remove(
				this.eventListeners[eventName], foundIndex);
	}
};

MYLIB.Event.EventManager.prototype.removeAllListeners = function(event) {
	this.eventListeners[event] = [];
};

MYLIB.Event.EventManager.prototype.fireEvent = function (sender, event, data) {	
	var eventData = {};
	eventData.sender = this;
	eventData.name = event;
	eventData.data = data;

	if (this.eventListeners == undefined) {
		this.eventListeners = new Array();
	}

	if (this.eventListeners[event] == undefined) {
		return;
	}    
	
	for (var listenerIterator in this.eventListeners[event]) {
		var listenerObj = this.eventListeners[event][listenerIterator];
		if (listenerObj && listenerObj.obj) {            
			listenerObj.obj[listenerObj.functionName].apply(
					listenerObj.obj, [eventData]);
		}
	}
};

MYLIB.Event.EventManager.prototype.subscribe = function (listenerObj, event, functionName) {
	var listener = {};
	if (typeof this.eventListeners[event] == 'undefined') {
		this.eventListeners[event] = [];
	}

	listener.obj = listenerObj;
	listener.functionName = functionName;
	this.eventListeners[event].push(listener);
};


MYLIB.eventManager = new MYLIB.Event.EventManager();

MYLIB.namespace('MYLIB.Template');

MYLIB.Template.TemplateManager = function() {

	this.renderTemplate = function(templateId, data) {
		var str = document.getElementById(templateId).innerHTML;
		var fn =
		new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};"
						+
						"with(obj){p.push('"
						+

						// Convert the template into pure JavaScript
						str.replace(/[\r\t\n]/g, " ").split("<#")
								.join("\t")
								.replace(/\/\/.*\n/g,"")
								.replace(/((^|#>)[^\t]*)'/g, "$1\r")
								.replace(/\t=(.*?)#>/g, "',$1,'")
								.split("\t").join("');")
								.split("#>").join("p.push('")
								.split("\r").join("\\'")
						+ "');}return p.join('');");

		return data ? fn(data) : fn;
	};

};

MYLIB.templateManager = new MYLIB.Template.TemplateManager();

MYLIB.namespace('MYLIB.Util');

MYLIB.Util.createDelegate = function(object, method)
{
	 var delegateMehod =  function()
	 {                  
		return method.apply(object, arguments);
	 };
	 return delegateMehod;
};

MYLIB.namespace('MYLIB.Data');

MYLIB.Data.JSONParser = function() {
	this.parseData = function(jsonString) {
		if (typeof jsonString !== 'string') {
			return jsonString;
		}
		var jsonObject = JSON.parse(jsonString);
	
		return jsonObject;
	};
};

MYLIB.Data.XmlParser = function() {
	this.parseData = function(xmlString) {
		var xmlDoc = $.parseXML(xmlString);
		return $( xmlDoc );
	};
};
