(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["halyard"] = factory();
	else
		root["halyard"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _table = __webpack_require__(1);
	
	var _table2 = _interopRequireDefault(_table);
	
	var _hyperCube = __webpack_require__(12);
	
	var _hyperCube2 = _interopRequireDefault(_hyperCube);
	
	var _connections = __webpack_require__(3);
	
	var _connections2 = _interopRequireDefault(_connections);
	
	var _setStatement = __webpack_require__(15);
	
	var _setStatement2 = _interopRequireDefault(_setStatement);
	
	var _utils = __webpack_require__(6);
	
	var Utils = _interopRequireWildcard(_utils);
	
	var _calendarDerivedFields = __webpack_require__(16);
	
	var _calendarDerivedFields2 = _interopRequireDefault(_calendarDerivedFields);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SCRIPT_BLOCK_SPACING = '\n\n';
	
	var Halyard = function () {
	  function Halyard() {
	    var _this = this;
	
	    _classCallCheck(this, Halyard);
	
	    this.defaultSetStatements = {};
	    this.items = [];
	    this.addItem(new _setStatement2.default(this.defaultSetStatements));
	    this.lastItems = [(0, _calendarDerivedFields2.default)(function (x) {
	      return _this.getFields(x);
	    })];
	  }
	
	  _createClass(Halyard, [{
	    key: 'getConnections',
	    value: function getConnections() {
	      return this.items.filter(function (item) {
	        return item.getConnection;
	      }).map(function (item) {
	        return item.getConnection();
	      });
	    }
	  }, {
	    key: 'getQixConnections',
	    value: function getQixConnections() {
	      return this.getConnections().map(function (connection) {
	        return connection.getQixConnectionObject();
	      }).filter(function (connection) {
	        return connection;
	      });
	    }
	  }, {
	    key: 'getFields',
	    value: function getFields(matcherFn) {
	      matcherFn = matcherFn || function () {
	        return true;
	      };
	
	      var fields = [];
	
	      this.items.forEach(function (item) {
	        if (item.getFields && item.getFields()) {
	          fields.push.apply(fields, _toConsumableArray(item.getFields().filter(matcherFn)));
	        }
	      });
	
	      return fields;
	    }
	  }, {
	    key: 'setDefaultSetStatements',
	    value: function setDefaultSetStatements(defaultSetStatements, preservePreviouslyEnteredValues) {
	      var that = this;
	
	      Object.keys(defaultSetStatements).forEach(function (key) {
	        if (!(preservePreviouslyEnteredValues && that.defaultSetStatements[key])) {
	          that.defaultSetStatements[key] = defaultSetStatements[key];
	        }
	      });
	    }
	  }, {
	    key: 'getItemScript',
	    value: function getItemScript(item) {
	      var itemScript = item.getScript();
	
	      if (item.getName && item.getName()) {
	        if (item.section) {
	          itemScript = '///$tab ' + Utils.escapeText(item.section) + '\n"' + Utils.escapeText(item.getName()) + '":\n' + itemScript;
	        } else {
	          itemScript = '"' + Utils.escapeText(item.getName()) + '":\n' + itemScript;
	        }
	      }
	
	      return itemScript;
	    }
	  }, {
	    key: 'getAllScriptBlocks',
	    value: function getAllScriptBlocks() {
	      return this.items.concat(this.lastItems).filter(function (item) {
	        return item.getScript();
	      });
	    }
	  }, {
	    key: 'getScript',
	    value: function getScript() {
	      var _this2 = this;
	
	      return this.getAllScriptBlocks().map(function (item) {
	        return _this2.getItemScript(item);
	      }).join(SCRIPT_BLOCK_SPACING);
	    }
	
	    // Support to add hyper cube explicit or implicitly
	
	  }, {
	    key: 'addHyperCube',
	    value: function addHyperCube(arg1, options) {
	      var newHyperCube = void 0;
	
	      if (arg1 instanceof _hyperCube2.default) {
	        newHyperCube = arg1;
	      } else {
	        newHyperCube = new _hyperCube2.default(arg1, options);
	      }
	
	      for (var i = 0; i < newHyperCube.items.length; i += 1) {
	        this.checkIfItemNameExists(newHyperCube.items[i]);
	      }
	
	      for (var _i = 0; _i < newHyperCube.items.length; _i += 1) {
	        this.addItem(newHyperCube.items[_i]);
	      }
	
	      return newHyperCube;
	    }
	
	    // Support to add table explicit or implicitly
	
	  }, {
	    key: 'addTable',
	    value: function addTable(arg1, options) {
	      var newTable = void 0;
	
	      if (arg1 instanceof _table2.default) {
	        newTable = arg1;
	      } else {
	        newTable = new _table2.default(arg1, options);
	      }
	
	      return this.addItem(newTable);
	    }
	  }, {
	    key: 'checkIfItemNameExists',
	    value: function checkIfItemNameExists(newItem) {
	      if (newItem.getName && newItem.getName()) {
	        if (this.items.filter(function (item) {
	          return item.getName() === newItem.getName();
	        }).length > 0) {
	          throw new Error('Cannot add another table with the same name.');
	        }
	      }
	    }
	  }, {
	    key: 'addItem',
	    value: function addItem(newItem) {
	      this.checkIfItemNameExists(newItem);
	
	      this.items.push(newItem);
	
	      return newItem;
	    }
	  }, {
	    key: 'getItemThatGeneratedScriptAt',
	    value: function getItemThatGeneratedScriptAt(charPosition) {
	      var allScriptBlocks = this.getAllScriptBlocks();
	      var scriptBlockStartPosition = 0;
	
	      for (var i = 0; i < allScriptBlocks.length; i += 1) {
	        var itemScript = this.getItemScript(allScriptBlocks[i]);
	        var scriptBlockEndPosition = scriptBlockStartPosition + ('' + itemScript + SCRIPT_BLOCK_SPACING).length;
	
	        if (scriptBlockStartPosition <= charPosition && charPosition <= scriptBlockEndPosition) {
	          return allScriptBlocks[i];
	        }
	
	        scriptBlockStartPosition = scriptBlockEndPosition;
	      }
	
	      return undefined;
	    }
	  }]);
	
	  return Halyard;
	}();
	
	Halyard.Table = _table2.default;
	
	Halyard.HyperCube = _hyperCube2.default;
	
	Halyard.Connections = _connections2.default;
	
	exports.default = Halyard;
	
	
	module.exports = Halyard;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _defaultConnectionMatcher = __webpack_require__(2);
	
	var _defaultConnectionMatcher2 = _interopRequireDefault(_defaultConnectionMatcher);
	
	var _formatSpecification = __webpack_require__(11);
	
	var _formatSpecification2 = _interopRequireDefault(_formatSpecification);
	
	var _utils = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Table = function () {
	  function Table(connection, options) {
	    _classCallCheck(this, Table);
	
	    this.connection = _defaultConnectionMatcher2.default.findMatch(connection);
	
	    options = options || {};
	
	    if (typeof options === 'string') {
	      this.name = options;
	      options = {};
	    } else {
	      this.name = options.name;
	      this.fields = options.fields;
	      this.prefix = options.prefix;
	      if (options.section) {
	        this.section = options.section;
	      }
	    }
	
	    this.options = options;
	  }
	
	  _createClass(Table, [{
	    key: 'getFields',
	    value: function getFields() {
	      return this.fields;
	    }
	  }, {
	    key: 'getFieldList',
	    value: function getFieldList() {
	      if (this.fields) {
	        return this.fields.map(function (field) {
	          var formattedInput = '"' + (0, _utils.escapeText)(field.src || '') + '"';
	
	          if ((0, _utils.validFieldType)(field.type)) {
	            var format = field.type.toUpperCase();
	
	            if (field.inputFormat) {
	              formattedInput = format + '#(' + formattedInput + ', \'' + field.inputFormat + '\')';
	            }
	
	            if (field.displayFormat) {
	              formattedInput = format + '(' + formattedInput + ', \'' + field.displayFormat + '\')';
	            } else {
	              formattedInput = format + '(' + formattedInput + ')';
	            }
	          }
	
	          if (field.expr) {
	            formattedInput = field.expr;
	          }
	
	          if (!(field.name || field.src)) {
	            throw new Error('A name or src needs to specified on the field: ' + JSON.stringify(field));
	          }
	
	          return (0, _utils.indentation)() + formattedInput + ' AS "' + (0, _utils.escapeText)(field.name || field.src) + '"';
	        }).join(',\n');
	      }
	
	      return '*';
	    }
	  }, {
	    key: 'isProceedingLoad',
	    value: function isProceedingLoad() {
	      return this.connection instanceof Table;
	    }
	  }, {
	    key: 'getPrefix',
	    value: function getPrefix() {
	      if (this.prefix) {
	        return this.prefix + '\n';
	      }
	      return '';
	    }
	  }, {
	    key: 'getScript',
	    value: function getScript() {
	      // In the future this could be moved into a connectionMatcher
	      // but for sake of clarity it is kept inline.
	      if (this.isProceedingLoad()) {
	        return this.getPrefix() + 'LOAD\n' + this.getFieldList() + ';\n' + this.connection.getScript();
	      }
	
	      // Hack!
	      if (this.connection.getFileExtension) {
	        this.options.fileExtension = this.connection.getFileExtension();
	      }
	
	      return this.getPrefix() + 'LOAD\n' + this.getFieldList() + '\n' + this.connection.getScript() + (0, _formatSpecification2.default)(this.options) + ';';
	    }
	  }, {
	    key: 'getName',
	    value: function getName() {
	      return this.name || '';
	    }
	  }, {
	    key: 'getSection',
	    value: function getSection() {
	      return this.section;
	    }
	  }, {
	    key: 'getConnection',
	    value: function getConnection() {
	      return this.connection;
	    }
	  }]);
	
	  return Table;
	}();
	
	exports.default = Table;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _connections = __webpack_require__(3);
	
	var _connections2 = _interopRequireDefault(_connections);
	
	var _jsonToCsv = __webpack_require__(9);
	
	var JsonToCsv = _interopRequireWildcard(_jsonToCsv);
	
	var _connectionMatcher = __webpack_require__(10);
	
	var _connectionMatcher2 = _interopRequireDefault(_connectionMatcher);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var connectionMatcher = new _connectionMatcher2.default();
	
	// url to a table file
	connectionMatcher.addConnection(function (data) {
	    return typeof data === 'string' && data.match(/^https?:\/\/(.*)$/g);
	}, function (data) {
	    return new _connections2.default.Web(data);
	});
	
	// Path to a table file
	connectionMatcher.addConnection(function (data) {
	    return typeof data === 'string' && data.match(/^.*\.(.*)$/g);
	}, function (data) {
	    return new _connections2.default.File(data);
	});
	
	// Inline JSON table to csv
	connectionMatcher.addConnection(function (data) {
	    return data instanceof Array && JsonToCsv.isJson(data);
	}, function (data) {
	    return new _connections2.default.Inline(JsonToCsv.convert(data));
	});
	
	// Inline csv table
	connectionMatcher.addConnection(function (data) {
	    return typeof data === 'string';
	}, function (data) {
	    return new _connections2.default.Inline(data);
	});
	
	exports.default = connectionMatcher;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _file = __webpack_require__(4);
	
	var _file2 = _interopRequireDefault(_file);
	
	var _webFile = __webpack_require__(7);
	
	var _webFile2 = _interopRequireDefault(_webFile);
	
	var _inlineData = __webpack_require__(8);
	
	var _inlineData2 = _interopRequireDefault(_inlineData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  File: _file2.default,
	  Web: _webFile2.default,
	  Inline: _inlineData2.default
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _connectionBase = __webpack_require__(5);
	
	var _connectionBase2 = _interopRequireDefault(_connectionBase);
	
	var _utils = __webpack_require__(6);
	
	var Utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FileConnection = function (_ConnectionBase) {
	  _inherits(FileConnection, _ConnectionBase);
	
	  function FileConnection(path) {
	    _classCallCheck(this, FileConnection);
	
	    var _this = _possibleConstructorReturn(this, (FileConnection.__proto__ || Object.getPrototypeOf(FileConnection)).call(this, Utils.folderPath(path), 'folder'));
	
	    _this.fileName = Utils.fileName(path);
	
	    _this.fileExtension = Utils.fileExtension(path) || 'txt';
	    return _this;
	  }
	
	  _createClass(FileConnection, [{
	    key: 'getLibStatement',
	    value: function getLibStatement() {
	      return _get(FileConnection.prototype.__proto__ || Object.getPrototypeOf(FileConnection.prototype), 'getLibStatement', this).call(this) + '/' + this.fileName;
	    }
	  }]);
	
	  return FileConnection;
	}(_connectionBase2.default);
	
	exports.default = FileConnection;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConnectionBase = function () {
	  function ConnectionBase(path, connectionType) {
	    _classCallCheck(this, ConnectionBase);
	
	    this.path = path;
	    this.connectionType = connectionType;
	    this.fileExtension = '';
	  }
	
	  _createClass(ConnectionBase, [{
	    key: 'getFileExtension',
	    value: function getFileExtension() {
	      return this.fileExtension;
	    }
	  }, {
	    key: 'getConnectionType',
	    value: function getConnectionType() {
	      return this.connectionType;
	    }
	  }, {
	    key: 'getQixConnectionObject',
	    value: function getQixConnectionObject() {
	      return {
	        qName: this.getName(),
	        qConnectionString: this.path,
	        qType: this.getConnectionType()
	      };
	    }
	  }, {
	    key: 'getName',
	    value: function getName() {
	      if (!this.name) {
	        this.name = (0, _utils.uniqueName)();
	      }
	
	      return this.name;
	    }
	  }, {
	    key: 'getLibStatement',
	    value: function getLibStatement() {
	      return 'lib://' + this.getName();
	    }
	  }, {
	    key: 'getScript',
	    value: function getScript() {
	      return 'FROM [' + this.getLibStatement() + ']';
	    }
	  }]);
	
	  return ConnectionBase;
	}();
	
	exports.default = ConnectionBase;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.folderPath = folderPath;
	exports.fileName = fileName;
	exports.fileExtension = fileExtension;
	exports.escapeText = escapeText;
	exports.uniqueName = uniqueName;
	exports.validFieldType = validFieldType;
	exports.indentation = indentation;
	exports.getFieldName = getFieldName;
	function folderPath(path) {
	  var folderPathMatch = path.match(/^(.*)(\\.*\..*$|\\.*)$/);
	
	  if (folderPathMatch) {
	    return folderPathMatch[1];
	  }
	
	  // Unix file path check
	  folderPathMatch = path.match(/^(.*)(\/.*\..*$|\/.*)$/);
	
	  return folderPathMatch && folderPathMatch[1];
	}
	
	function fileName(path) {
	  var fileNameMatch = path.match(/^.*\\(.*\..*|.*)$/);
	
	  if (fileNameMatch) {
	    return fileNameMatch[1];
	  }
	
	  fileNameMatch = path.match(/^.*\/(.*\..*|.*)$/);
	
	  return fileNameMatch && fileNameMatch[1];
	}
	
	function fileExtension(path) {
	  var fileExtensionMatch = path.match(/^.*\.(.*)$/);
	
	  return fileExtensionMatch && fileExtensionMatch[1];
	}
	
	function escapeText(text) {
	  return text.replace(/"/g, '""');
	}
	
	function uniqueName() {
	  /* eslint no-bitwise: ["off"] */
	  /* eslint no-mixed-operators: ["off"] */
	
	  return 'xxxxx-8xxxx-yxxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	    var r = Math.random() * 16 | 0;
	    var v = c === 'x' ? r : r & 0x3 | 0x8;
	    return v.toString(16);
	  });
	}
	
	function validFieldType(type) {
	  var validFieldTypes = ['time', 'timestamp', 'date', 'interval'];
	
	  type = type || '';
	
	  return validFieldTypes.indexOf(type.toLowerCase()) > -1;
	}
	
	function indentation() {
	  return '  ';
	}
	
	function getFieldName(field) {
	  return field.name || field.src;
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _connectionBase = __webpack_require__(5);
	
	var _connectionBase2 = _interopRequireDefault(_connectionBase);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WebFileConnection = function (_ConnectionBase) {
	  _inherits(WebFileConnection, _ConnectionBase);
	
	  function WebFileConnection(url, fileExtension) {
	    _classCallCheck(this, WebFileConnection);
	
	    var _this = _possibleConstructorReturn(this, (WebFileConnection.__proto__ || Object.getPrototypeOf(WebFileConnection)).call(this, url, 'internet'));
	
	    var fileExtensionMatch = url.match(/^https?:\/\/.*\/.*\.(\w*)\?.*$/) || url.match(/^https?:\/\/.*\/.*\.(\w*)$/);
	
	    _this.fileExtension = fileExtension || fileExtensionMatch && fileExtensionMatch[1] || 'html';
	    return _this;
	  }
	
	  return WebFileConnection;
	}(_connectionBase2.default);
	
	exports.default = WebFileConnection;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _connectionBase = __webpack_require__(5);
	
	var _connectionBase2 = _interopRequireDefault(_connectionBase);
	
	var _utils = __webpack_require__(6);
	
	var Utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InlineData = function (_ConnectionBase) {
	  _inherits(InlineData, _ConnectionBase);
	
	  function InlineData(data) {
	    _classCallCheck(this, InlineData);
	
	    var _this = _possibleConstructorReturn(this, (InlineData.__proto__ || Object.getPrototypeOf(InlineData)).call(this));
	
	    _this.data = data;
	
	    _this.fileExtension = 'txt';
	    return _this;
	  }
	
	  _createClass(InlineData, [{
	    key: 'getScript',
	    value: function getScript() {
	      return 'INLINE "\n' + Utils.escapeText(this.data) + '\n"';
	    }
	  }, {
	    key: 'getLibStatement',
	    value: function getLibStatement() {}
	  }, {
	    key: 'getQixConnectionObject',
	    value: function getQixConnectionObject() {}
	  }]);
	
	  return InlineData;
	}(_connectionBase2.default);
	
	exports.default = InlineData;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.convert = convert;
	exports.isJson = isJson;
	function escapeValueContainingDelimiter(data, delimiter) {
	  if (data && typeof data === 'string' && (data.indexOf(delimiter) > -1 || data.indexOf('\n') > -1)) {
	    return '"' + data.replace(/"/g, '""').replace(/\n/g, ' ') + '"';
	  }
	
	  return data;
	}
	
	function convert(data) {
	  if (data instanceof Array === false) {
	    data = [data];
	  }
	
	  var csv = '';
	  var delimiter = ',';
	
	  var headers = Object.keys(data[0]);
	
	  csv = csv + headers.map(function (header) {
	    return escapeValueContainingDelimiter(header, delimiter);
	  }).join(delimiter) + '\n';
	
	  var fields = [];
	
	  for (var i = 0; i < data.length; i += 1) {
	    fields = [];
	
	    for (var j = 0; j < headers.length; j += 1) {
	      fields.push(escapeValueContainingDelimiter(data[i][headers[j]], delimiter));
	    }
	
	    csv = csv + fields.join(delimiter) + '\n';
	  }
	
	  csv = csv.slice(0, -'\n'.length);
	
	  return csv;
	}
	
	function isJson(data) {
	  if (data instanceof Array) {
	    if (data[0] && _typeof(data[0]) === 'object') {
	      return true;
	    }
	  }
	
	  return false;
	}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ConnectionLookup = function () {
	  function ConnectionLookup() {
	    _classCallCheck(this, ConnectionLookup);
	
	    this.connectionsRegistry = [];
	  }
	
	  _createClass(ConnectionLookup, [{
	    key: "addConnection",
	    value: function addConnection(matchingFn, connection) {
	      this.connectionsRegistry.push({
	        matchingFn: matchingFn,
	        connection: connection
	      });
	    }
	  }, {
	    key: "findMatch",
	    value: function findMatch(data) {
	      for (var i = 0; i < this.connectionsRegistry.length; i += 1) {
	        if (this.connectionsRegistry[i].matchingFn(data)) {
	          return this.connectionsRegistry[i].connection(data);
	        }
	      }
	
	      return data;
	    }
	  }]);
	
	  return ConnectionLookup;
	}();
	
	exports.default = ConnectionLookup;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = formatSpecification;
	
	var _utils = __webpack_require__(6);
	
	function supportedCharacterSet(characterSet) {
	  var validCharacterSets = ['utf8', 'unicode', 'ansi', 'oem', 'mac'];
	
	  return validCharacterSets.indexOf(characterSet) > -1 && characterSet || Number(characterSet).toString() !== 'NaN' && 'codepage is ' + characterSet;
	}
	
	function formatSpecification(options) {
	  if (!options) {
	    options = {};
	  }
	
	  var formatSpecificationArr = [];
	
	  if (options.fileExtension) {
	    var fileFormat = options.fileExtension;
	
	    if (fileFormat === 'xlsx') {
	      fileFormat = 'ooxml';
	    }
	
	    if (fileFormat === 'csv') {
	      fileFormat = 'txt';
	    }
	
	    if (fileFormat === 'htm') {
	      fileFormat = 'html';
	    }
	
	    formatSpecificationArr.push(fileFormat);
	  }
	
	  if (options.headerRowNr || options.headerRowNr === 0) {
	    formatSpecificationArr.push('header is ' + options.headerRowNr + ' lines');
	    // Should be included if header row is specified!
	    formatSpecificationArr.push('embedded labels');
	  }
	
	  if (options.delimiter) {
	    formatSpecificationArr.push('delimiter is \'' + options.delimiter + '\'');
	  }
	
	  if (options.characterSet && supportedCharacterSet(options.characterSet)) {
	    formatSpecificationArr.push(supportedCharacterSet(options.characterSet));
	  }
	
	  if (options.srcTable) {
	    formatSpecificationArr.push('table is "' + (0, _utils.escapeText)(options.srcTable) + '"');
	  }
	
	  if (options.noLabels) {
	    formatSpecificationArr.push('no labels');
	  }
	
	  var formatSpecificationString = '';
	
	  if (formatSpecificationArr.length > 0) {
	    formatSpecificationString = '\n(' + formatSpecificationArr.join(', ') + ')';
	  }
	
	  return formatSpecificationString;
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _table = __webpack_require__(1);
	
	var _table2 = _interopRequireDefault(_table);
	
	var _utils = __webpack_require__(6);
	
	var _hyperCubeUtils = __webpack_require__(13);
	
	var HyperCubeUtils = _interopRequireWildcard(_hyperCubeUtils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HyperCube = function () {
	  function HyperCube(hyperCubeLayout, options) {
	    _classCallCheck(this, HyperCube);
	
	    this.items = [];
	    this.fields = [];
	    this.hyperCubeLayout = this.validateHyperCubeLayout(hyperCubeLayout);
	
	    options = options || {};
	
	    if (typeof options === 'string') {
	      this.name = options;
	      options = {};
	    } else {
	      this.name = options.name;
	      if (options.section) {
	        this.section = options.section;
	      }
	    }
	
	    this.parseHyperCubeLayout(options);
	
	    this.options = options;
	  }
	
	  _createClass(HyperCube, [{
	    key: 'validateHyperCubeLayout',
	    value: function validateHyperCubeLayout(hyperCubeLayout) {
	      if (!hyperCubeLayout) {
	        throw new Error('Hyper cube layout is undefined');
	      }
	      if (!hyperCubeLayout.qDimensionInfo) {
	        throw new Error('qDimensionInfo is undefined');
	      }
	      if (!hyperCubeLayout.qMeasureInfo) {
	        throw new Error('qMeasureInfo is undefined');
	      }
	      if (hyperCubeLayout.qMode === 'P') {
	        throw new Error('Cannot add hyper cube in pivot mode, qMode:P(DATA_MODE_PIVOT) is not supported');
	      }
	      if (hyperCubeLayout.qMode === 'K') {
	        throw new Error('Cannot add hyper cube in stacked mode, qMode:K(DATA_MODE_PIVOT_STACK) is not supported');
	      }
	      if (hyperCubeLayout.qMode === 'S') {
	        this.validateDataPages(hyperCubeLayout.qDataPages);
	        this.validateDataPagesCoverage(hyperCubeLayout.qDataPages, hyperCubeLayout);
	        return hyperCubeLayout;
	      }
	      throw new Error('HyperCubeLayout is not valid');
	    }
	  }, {
	    key: 'validateDataPages',
	    value: function validateDataPages(dataPages) {
	      if (!dataPages) {
	        throw new Error('qDataPages are undefined');
	      }
	
	      if (dataPages[0].qArea && dataPages[0].qArea.qTop > 0) {
	        throw new Error('qDataPages first page should start at qTop: 0.');
	      }
	    }
	  }, {
	    key: 'validateDataPagesCoverage',
	    value: function validateDataPagesCoverage(dataPages, hyperCubeLayout) {
	      var _this = this;
	
	      var qHeight = 0;
	
	      dataPages.forEach(function (dataPage) {
	        _this.validateQMatrix(dataPage);
	        _this.validateQArea(dataPage, hyperCubeLayout, qHeight);
	        qHeight += dataPage.qArea.qHeight;
	      }, this);
	
	      if (hyperCubeLayout.qSize.qcy !== qHeight) {
	        throw new Error('qDataPages are missing pages.');
	      }
	    }
	  }, {
	    key: 'validateQMatrix',
	    value: function validateQMatrix(dataPage) {
	      if (!dataPage.qMatrix) {
	        throw new Error('qMatrix of qDataPages are undefined');
	      }
	      if (dataPage.qMatrix.length === 0) {
	        throw new Error('qDataPages are empty');
	      }
	    }
	  }, {
	    key: 'validateQArea',
	    value: function validateQArea(dataPage, hyperCubeLayout, qHeight) {
	      if (!dataPage.qArea) {
	        throw new Error('qArea of qDataPages are undefined');
	      }
	      if (dataPage.qArea.qLeft > 0) {
	        throw new Error('qDataPages have data pages that\'s not of full qWidth.');
	      }
	      if (dataPage.qArea.qWidth < hyperCubeLayout.qSize.qcx) {
	        throw new Error('qDataPages have data pages that\'s not of full qWidth.');
	      }
	      if (dataPage.qArea.qTop < qHeight) {
	        throw new Error('qDataPages have overlapping data pages.');
	      }
	      if (dataPage.qArea.qTop > qHeight) {
	        throw new Error('qDataPages are missing pages.');
	      }
	    }
	  }, {
	    key: 'parseHyperCubeLayout',
	    value: function parseHyperCubeLayout() {
	      var that = this;
	      that.fields = that.getFieldsFromHyperCubeLayout();
	      that.data = that.getDataFromHyperCubeLayout();
	      var inlineData = that.fields.map(function (field) {
	        return field.name;
	      }).join(',') + '\n' + this.data;
	      var hasDual = false;
	      that.fields.forEach(function (field) {
	        if (field.isDual) {
	          hasDual = true;
	          that.items.push(that.getMapTableForDualField(field));
	        }
	      });
	      var options = {
	        name: that.name,
	        fields: that.getFieldsDefinition(that.fields)
	      };
	      if (that.section && !hasDual) {
	        options.section = that.section;
	      }
	      that.items.push(new _table2.default(inlineData, options));
	    }
	  }, {
	    key: 'getFieldsDefinition',
	    value: function getFieldsDefinition(fields) {
	      return fields.map(function (field) {
	        var mappedField = { name: field.name };
	        if ((0, _utils.validFieldType)(field.dimensionType)) {
	          mappedField.type = field.dimensionType;
	          mappedField.displayFormat = field.displayFormat;
	        }
	        if (field.isDual) {
	          mappedField.expr = 'Dual(ApplyMap(\'MapDual__' + field.name + '\', ' + field.name + '), ' + field.name + ')';
	        } else {
	          mappedField.src = field.name;
	        }
	        return mappedField;
	      });
	    }
	  }, {
	    key: 'mapDualFieldQMatrix',
	    value: function mapDualFieldQMatrix(qMatrix, field) {
	      function uniqueFilter(value, index, self) {
	        return self.indexOf(value) === index;
	      }
	      return qMatrix.map(function (row) {
	        return HyperCubeUtils.getDualDataRow(row[field.index]);
	      }).filter(uniqueFilter);
	    }
	  }, {
	    key: 'getMapTableForDualField',
	    value: function getMapTableForDualField(field) {
	      var that = this;
	      var concatQMatrix = that.hyperCubeLayout.qDataPages.reduce(function (prev, curr) {
	        return [].concat(_toConsumableArray(prev), _toConsumableArray(curr.qMatrix));
	      }, []);
	      var data = that.mapDualFieldQMatrix(concatQMatrix, field);
	      var headers = HyperCubeUtils.getDualHeadersForField(field);
	      var inlineData = headers + '\n' + data.join('\n');
	      var name = 'MapDual__' + field.name;
	      var options = { name: name, prefix: 'Mapping' };
	      if (this.section && this.items.length === 0) {
	        options.section = this.section;
	      }
	      return new _table2.default(inlineData, options);
	    }
	  }, {
	    key: 'getDataFromHyperCubeLayout',
	    value: function getDataFromHyperCubeLayout() {
	      var that = this;
	      var data = that.hyperCubeLayout.qDataPages.map(function (dataPage) {
	        return dataPage.qMatrix.map(function (row) {
	          return row.map(function (cell, index) {
	            var field = that.fields[index];
	            if (!field.isDual && HyperCubeUtils.isCellDual(cell, field)) {
	              field.isDual = true;
	            }
	            return HyperCubeUtils.getCellValue(cell, field);
	          }).join(',');
	        }).join('\n');
	      }).join('\n');
	      return data;
	    }
	  }, {
	    key: 'getFieldsFromHyperCubeLayout',
	    value: function getFieldsFromHyperCubeLayout() {
	      var that = this;
	      var fields = [];
	      for (var i = 0; i < that.hyperCubeLayout.qDimensionInfo.length; i += 1) {
	        fields.push({
	          type: 'dimension',
	          dimensionType: HyperCubeUtils.getDimensionType(that.hyperCubeLayout.qDimensionInfo[i]),
	          name: that.hyperCubeLayout.qDimensionInfo[i].qFallbackTitle,
	          displayFormat: that.hyperCubeLayout.qDimensionInfo[i].qNumFormat.qFmt,
	          index: i
	        });
	      }
	      for (var j = 0; j < that.hyperCubeLayout.qMeasureInfo.length; j += 1) {
	        fields.push({
	          type: 'measure',
	          name: that.hyperCubeLayout.qMeasureInfo[j].qFallbackTitle,
	          index: that.hyperCubeLayout.qDimensionInfo.length + j
	        });
	      }
	      return fields;
	    }
	  }, {
	    key: 'getItems',
	    value: function getItems() {
	      return this.items;
	    }
	  }]);
	
	  return HyperCube;
	}();
	
	exports.default = HyperCube;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getDimensionType = getDimensionType;
	exports.checkIfFieldIsDual = checkIfFieldIsDual;
	exports.isCellDual = isCellDual;
	exports.getCellValue = getCellValue;
	exports.getDualDataRow = getDualDataRow;
	exports.getDualHeadersForField = getDualHeadersForField;
	
	var _hyperCubeSpecification = __webpack_require__(14);
	
	var _hyperCubeSpecification2 = _interopRequireDefault(_hyperCubeSpecification);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DEFAULT_DELIMITER = ',';
	
	function isDimensionTypeMixed(dimension) {
	  return dimension.qDimensionType === _hyperCubeSpecification2.default.qDimensionType.numeric && dimension.qTags.length === 0;
	}
	
	function isDimensionTypeText(dimension) {
	  return dimension.qDimensionType === _hyperCubeSpecification2.default.qDimensionType.text;
	}
	
	function isDimensionTypeTimestamp(dimension) {
	  if (dimension.qDimensionType === _hyperCubeSpecification2.default.qDimensionType.timestamp) {
	    return true;
	  }
	  if (dimension.qDimensionType === _hyperCubeSpecification2.default.qDimensionType.numeric && dimension.qNumFormat.qType === _hyperCubeSpecification2.default.qTypes.timestamp) {
	    return true;
	  }
	  return false;
	}
	
	function isDimensionTypeDate(dimension) {
	  if (dimension.qDimensionType === _hyperCubeSpecification2.default.qDimensionType.numeric && dimension.qNumFormat.qType === _hyperCubeSpecification2.default.qTypes.date) {
	    return true;
	  }
	  return false;
	}
	
	function isDimensionTypeTime(dimension) {
	  if (dimension.qDimensionType === _hyperCubeSpecification2.default.qDimensionType.numeric && dimension.qNumFormat.qType === _hyperCubeSpecification2.default.qTypes.time) {
	    return true;
	  }
	  return false;
	}
	
	function isDimensionTypeInterval(dimension) {
	  if (dimension.qDimensionType === _hyperCubeSpecification2.default.qDimensionType.numeric && dimension.qNumFormat.qType === _hyperCubeSpecification2.default.qTypes.interval) {
	    return true;
	  }
	  return false;
	}
	
	function getDimensionType(dimension) {
	  if (isDimensionTypeText(dimension)) {
	    return 'text';
	  }
	  if (isDimensionTypeMixed(dimension)) {
	    return 'mixed';
	  }
	  if (isDimensionTypeTimestamp(dimension)) {
	    return 'timestamp';
	  }
	  if (isDimensionTypeTime(dimension)) {
	    return 'time';
	  }
	  if (isDimensionTypeDate(dimension)) {
	    return 'date';
	  }
	  if (isDimensionTypeInterval(dimension)) {
	    return 'interval';
	  }
	  return 'num';
	}
	function isNumericDimensionType(dimensionType) {
	  var numericDimensionTypes = ['timestamp', 'interval', 'time', 'date', 'num'];
	  dimensionType = dimensionType || '';
	  return numericDimensionTypes.indexOf(dimensionType.toLowerCase()) > -1;
	}
	function storeNumeric(field) {
	  if (field.type === 'measure') {
	    return true;
	  }
	  if (field.type === 'dimension' && isNumericDimensionType(field.dimensionType)) {
	    return true;
	  }
	  return false;
	}
	
	function checkIfFieldIsDual(field) {
	  return field.type === 'dimension' && field.dimensionType === 'num';
	}
	
	function isCellDual(cell, field) {
	  return checkIfFieldIsDual(field) && cell.qText !== Number(cell.qNum).toString();
	}
	
	function escapeStringContainingDelimiter(string, delimiter) {
	  if (string.indexOf(delimiter) > -1 || string.indexOf('\n') > -1) {
	    return '\'' + string.replace(/'/g, "''").replace(/\n/g, ' ') + '\'';
	  }
	  return string;
	}
	
	function getNumericCellValue(cell) {
	  return cell.qNum;
	}
	
	function getTextCellValue(cell) {
	  return escapeStringContainingDelimiter(cell.qText, DEFAULT_DELIMITER);
	}
	
	function getCellValue(cell, field) {
	  if (storeNumeric(field)) {
	    return getNumericCellValue(cell);
	  }
	  return getTextCellValue(cell);
	}
	
	function getDualDataRow(cell) {
	  return '' + cell.qNum + DEFAULT_DELIMITER + escapeStringContainingDelimiter(cell.qText, DEFAULT_DELIMITER);
	}
	
	function getDualHeadersForField(field) {
	  return '' + field.name + DEFAULT_DELIMITER + field.name + '_qText}';
	}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var qTypes = {
	  timestamp: 'TS',
	  date: 'D',
	  time: 'T',
	  interval: 'IV'
	};
	
	var qDimensionType = {
	  timestamp: 'T',
	  text: 'D',
	  numeric: 'N'
	};
	
	exports.default = {
	  qTypes: qTypes,
	  qDimensionType: qDimensionType
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SetStatement = function () {
	  function SetStatement(defaultSetStatements) {
	    _classCallCheck(this, SetStatement);
	
	    this.defaultSetStatements = defaultSetStatements;
	  }
	
	  _createClass(SetStatement, [{
	    key: 'getScript',
	    value: function getScript() {
	      var _this = this;
	
	      return Object.keys(this.defaultSetStatements).map(function (key) {
	        return 'SET ' + key + '=\'' + (Array.isArray(_this.defaultSetStatements[key]) ? _this.defaultSetStatements[key].join(';') : _this.defaultSetStatements[key]) + '\';';
	      }).join('\n');
	    }
	  }, {
	    key: 'getName',
	    value: function getName() {
	      return '';
	    }
	  }]);
	
	  return SetStatement;
	}();
	
	exports.default = SetStatement;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _derivedFieldsTemplate = __webpack_require__(17);
	
	var _derivedFieldsTemplate2 = _interopRequireDefault(_derivedFieldsTemplate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var derivedFieldsDefinition = 'Dual(Year($1), YearStart($1)) AS [Year] Tagged (\'$axis\', \'$year\'),\n  Dual(\'Q\'&Num(Ceil(Num(Month($1))/3)),Num(Ceil(NUM(Month($1))/3),00)) AS [Quarter] Tagged (\'$quarter\', \'$cyclic\'),\n  Dual(Year($1)&\'-Q\'&Num(Ceil(Num(Month($1))/3)),QuarterStart($1)) AS [YearQuarter] Tagged (\'$yearquarter\', \'$qualified\'),\n  Dual(\'Q\'&Num(Ceil(Num(Month($1))/3)),QuarterStart($1)) AS [_YearQuarter] Tagged (\'$yearquarter\', \'$hidden\', \'$simplified\'),\n  Month($1) AS [Month] Tagged (\'$month\', \'$cyclic\'),\n  Dual(Year($1)&\'-\'&Month($1), monthstart($1)) AS [YearMonth] Tagged (\'$axis\', \'$yearmonth\', \'$qualified\'),\n  Dual(Month($1), monthstart($1)) AS [_YearMonth] Tagged (\'$axis\', \'$yearmonth\', \'$simplified\', \'$hidden\'),\n  Dual(\'W\'&Num(Week($1),00), Num(Week($1),00)) AS [Week] Tagged (\'$weeknumber\', \'$cyclic\'),\n  Date(Floor($1)) AS [Date] Tagged (\'$axis\', \'$date\', \'$qualified\'),\n  Date(Floor($1), \'D\') AS [_Date] Tagged (\'$axis\', \'$date\', \'$hidden\', \'$simplified\'),\n  If (DayNumberOfYear($1) <= DayNumberOfYear(Today()), 1, 0) AS [InYTD] ,\nYear(Today())-Year($1) AS [YearsAgo] ,\n  If (DayNumberOfQuarter($1) <= DayNumberOfQuarter(Today()),1,0) AS [InQTD] ,\n4*Year(Today())+Ceil(Month(Today())/3)-4*Year($1)-Ceil(Month($1)/3) AS [QuartersAgo] ,\nCeil(Month(Today())/3)-Ceil(Month($1)/3) AS [QuarterRelNo] ,\n  If(Day($1)<=Day(Today()),1,0) AS [InMTD] ,\n12*Year(Today())+Month(Today())-12*Year($1)-Month($1) AS [MonthsAgo] ,\nMonth(Today())-Month($1) AS [MonthRelNo] ,\n  If(WeekDay($1)<=WeekDay(Today()),1,0) AS [InWTD] ,\n(WeekStart(Today())-WeekStart($1))/7 AS [WeeksAgo] ,\nWeek(Today())-Week($1) AS [WeekRelNo];';
	
	function getCalenderDerivedFieldDefinition(fn) {
	  return new _derivedFieldsTemplate2.default({
	    name: 'autoCalendar',
	    fieldTag: 'date',
	    derivedFieldDefinition: derivedFieldsDefinition,
	    fieldMatchFunction: function fieldMatchFunction() {
	      return fn(function (f) {
	        return f.calendarTemplate;
	      });
	    }
	  });
	}
	
	exports.default = getCalenderDerivedFieldDefinition;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DerivedFieldsTemplate = function () {
	  function DerivedFieldsTemplate(options) {
	    _classCallCheck(this, DerivedFieldsTemplate);
	
	    this.getFieldFn = options.fieldMatchFunction;
	    this.name = options.name;
	    this.fieldTag = options.fieldTag;
	    this.derivedFieldDefinition = options.derivedFieldDefinition;
	  }
	
	  _createClass(DerivedFieldsTemplate, [{
	    key: 'getScript',
	    value: function getScript() {
	      var fields = this.getFieldFn() || [];
	
	      if (fields.length > 0) {
	        return this.getDefinition(fields.map(_utils.getFieldName));
	      }
	
	      return undefined;
	    }
	  }, {
	    key: 'getDefinition',
	    value: function getDefinition(fieldNames) {
	      return '"' + (0, _utils.escapeText)(this.name) + '":\nDECLARE FIELD DEFINITION Tagged (\'$' + this.fieldTag + '\')\nFIELDS\n' + this.derivedFieldDefinition + '\nDERIVE FIELDS FROM FIELDS [' + fieldNames.join(', ') + '] USING "' + (0, _utils.escapeText)(this.name) + '";';
	    }
	  }]);
	
	  return DerivedFieldsTemplate;
	}();
	
	exports.default = DerivedFieldsTemplate;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=halyard.js.map