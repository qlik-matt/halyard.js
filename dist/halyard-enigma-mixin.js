(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["halyard-enigma-mixin"] = factory();
	else
		root["halyard-enigma-mixin"] = factory();
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
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CONNECTION_ERROR = 'Connection Error';
	var LOADING_ERROR = 'Loading Error';
	var SYNTAX_ERROR = 'Syntax Error';
	
	function createErrorMessage(errorType, qixError, item) {
	  return {
	    type: errorType,
	    message: qixError.message || qixError.qErrorString,
	    item: item,
	    qixError: qixError
	  };
	}
	
	var halyardMixin = {
	  types: 'Global',
	  init: function init(args) {
	    if (args.config) {
	      args.api.Promise = args.config.Promise;
	    } else {
	      args.api.Promise = args.Promise;
	    }
	  },
	
	  extend: {
	    createSessionAppUsingHalyard: function createSessionAppUsingHalyard(halyard) {
	      var that = this;
	      return that.createSessionApp().then(function (app) {
	        return that.setScriptAndReloadWithHalyard(app, halyard, false);
	      });
	    },
	    createAppUsingHalyard: function createAppUsingHalyard(appName, halyard) {
	      var that = this;
	      return that.createApp(appName).then(function (app) {
	        var appId = app.qAppId;
	        return that.openDoc(appId).then(function (result) {
	          return that.setScriptAndReloadWithHalyard(result, halyard, true);
	        });
	      });
	    },
	    reloadAppUsingHalyard: function reloadAppUsingHalyard(existingAppName, halyard, createIfMissing) {
	      var that = this;
	      return that.openDoc(existingAppName).catch(function (error) {
	        var COULD_NOT_FIND_APP = 1003;
	
	        if (createIfMissing && error.code === COULD_NOT_FIND_APP) {
	          return that.createApp(existingAppName).then(function (app) {
	            return that.openDoc(app.qAppId);
	          });
	        }
	        return that.Promise.reject(error);
	      }).then(function (result) {
	        return that.setScriptAndReloadWithHalyard(result, halyard, true);
	      });
	    },
	    appendToScriptAndReloadWithHalyard: function appendToScriptAndReloadWithHalyard(app, halyard, doSaveAfterReload) {
	      var that = this;
	      var deferredConnections = [];
	
	      halyard.getConnections().forEach(function (connection) {
	        var qixConnectionObject = connection.getQixConnectionObject();
	        if (qixConnectionObject) {
	          var connectionPromise = app.createConnection(qixConnectionObject).then(function (result) {
	            return result;
	          }, function (err) {
	            var LOCERR_CONNECTION_ALREADY_EXISTS = 2000;
	
	            // Will not throw error if connection already exists.
	            // The connections guid makes the connections unique and we assumes that it
	            // is the same that was previously created
	            if (!(err.code && err.code === LOCERR_CONNECTION_ALREADY_EXISTS)) {
	              throw createErrorMessage(CONNECTION_ERROR, err, connection);
	            }
	          });
	
	          deferredConnections.push(connectionPromise);
	        }
	      });
	
	      return app.getScript().then(function (currentScript) {
	        var newScript = halyard.getScript();
	        return that.Promise.all(deferredConnections).then(function () {
	          return app.getLocaleInfo().then(function (localeInfoResult) {
	            halyard.setDefaultSetStatements((0, _utils2.default)(localeInfoResult), true);
	            return app.globalApi.configureReload(true, true, false).then(function () {
	              return app.setScript(currentScript.replace("///$tab SSE", "\n" + newScript + "\n///$tab SSE")).then(function () {
	                return app.doReload().then(function () {
	                  return app.globalApi.getProgress(0).then(function (progressResult) {
	                    if (progressResult.qErrorData.length !== 0) {
	                      return app.checkScriptSyntax().then(function (syntaxCheckData) {
	                        if (syntaxCheckData.length === 0) {
	                          throw createErrorMessage(LOADING_ERROR, progressResult.qErrorData[0]);
	                        } else {
	                          var item = halyard.getItemThatGeneratedScriptAt(syntaxCheckData[0].qTextPos);
	                          throw createErrorMessage(SYNTAX_ERROR, progressResult.qErrorData[0], item);
	                        }
	                      });
	                    }
	
	                    if (doSaveAfterReload) {
	                      return app.doSave().then(function () {
	                        return app;
	                      });
	                    }
	
	                    return app;
	                  });
	                });
	              });
	            });
	          });
	        });
	      });
	    },
	    setScriptAndReloadWithHalyard: function setScriptAndReloadWithHalyard(app, halyard, doSaveAfterReload) {
	      var that = this;
	      var deferredConnections = [];
	
	      halyard.getConnections().forEach(function (connection) {
	        var qixConnectionObject = connection.getQixConnectionObject();
	        if (qixConnectionObject) {
	          var connectionPromise = app.createConnection(qixConnectionObject).then(function (result) {
	            return result;
	          }, function (err) {
	            var LOCERR_CONNECTION_ALREADY_EXISTS = 2000;
	
	            // Will not throw error if connection already exists.
	            // The connections guid makes the connections unique and we assumes that it
	            // is the same that was previously created
	            if (!(err.code && err.code === LOCERR_CONNECTION_ALREADY_EXISTS)) {
	              throw createErrorMessage(CONNECTION_ERROR, err, connection);
	            }
	          });
	
	          deferredConnections.push(connectionPromise);
	        }
	      });
	
	      return that.Promise.all(deferredConnections).then(function () {
	        return app.getLocaleInfo().then(function (localeInfoResult) {
	          halyard.setDefaultSetStatements((0, _utils2.default)(localeInfoResult), true);
	          return app.globalApi.configureReload(true, true, false).then(function () {
	            return app.setScript(halyard.getScript()).then(function () {
	              return app.doReload().then(function () {
	                return app.globalApi.getProgress(0).then(function (progressResult) {
	                  if (progressResult.qErrorData.length !== 0) {
	                    return app.checkScriptSyntax().then(function (syntaxCheckData) {
	                      if (syntaxCheckData.length === 0) {
	                        throw createErrorMessage(LOADING_ERROR, progressResult.qErrorData[0]);
	                      } else {
	                        var item = halyard.getItemThatGeneratedScriptAt(syntaxCheckData[0].qTextPos);
	                        throw createErrorMessage(SYNTAX_ERROR, progressResult.qErrorData[0], item);
	                      }
	                    });
	                  }
	
	                  if (doSaveAfterReload) {
	                    return app.doSave().then(function () {
	                      return app;
	                    });
	                  }
	
	                  return app;
	                });
	              });
	            });
	          });
	        });
	      });
	    }
	  }
	};
	
	var exposeGlobalApi = {
	  types: 'Doc',
	  init: function init(args) {
	    var getObjectArgs = {
	      handle: -1,
	      id: 'Global',
	      type: 'Global'
	    };
	    if (args.config) {
	      getObjectArgs.genericType = 'Global';
	    } else {
	      getObjectArgs.customType = 'Global';
	      getObjectArgs.delta = true;
	    }
	    args.api.globalApi = args.api.session.getObjectApi(getObjectArgs);
	  }
	};
	
	module.exports = [halyardMixin, exposeGlobalApi];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = convertQixGetLocalInfo;
	function convertQixGetLocalInfo(localInfoData) {
	  return {
	    ThousandSep: localInfoData.qThousandSep,
	    DecimalSep: localInfoData.qDecimalSep,
	    MoneyThousandSep: localInfoData.qMoneyThousandSep,
	    MoneyDecimalSep: localInfoData.qMoneyDecimalSep,
	    MoneyFormat: localInfoData.qMoneyFmt,
	    TimeFormat: localInfoData.qTimeFmt,
	    DateFormat: localInfoData.qDateFmt,
	    TimestampFormat: localInfoData.qTimestampFmt,
	    FirstWeekDay: localInfoData.qFirstWeekDay,
	    ReferenceDay: localInfoData.qReferenceDay,
	    FirstMonthOfYear: localInfoData.qFirstMonthOfYear,
	    CollationLocale: localInfoData.qCollation,
	    MonthNames: localInfoData.qCalendarStrings.qMonthNames,
	    LongMonthNames: localInfoData.qCalendarStrings.qLongMonthNames,
	    DayNames: localInfoData.qCalendarStrings.qDayNames,
	    LongDayNames: localInfoData.qCalendarStrings.qLongDayNames
	  };
	}

/***/ })
/******/ ])
});
;
//# sourceMappingURL=halyard-enigma-mixin.js.map