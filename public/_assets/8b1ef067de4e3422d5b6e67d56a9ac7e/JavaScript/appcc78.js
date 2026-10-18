/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 376);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js

;(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                __webpack_require__(249)("./" + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(202)(module)))

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.5.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( _i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.5
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2020-03-14
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
					dataPriv.get( this, "events" ) || Object.create( null )
				)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px";
				tr.style.height = "1px";
				trChild.style.height = "9px";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = parseInt( trStyle.height ) > 3;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = (
					dataPriv.get( cur, "events" ) || Object.create( null )
				)[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return fu×Ž5óÏ[Ê×¬¢h­µçfF—W2“°  —&WGW&â†&WGvVVäævÆW2bbv—F†–å&F—W2“° —Ð —&WGW&âfÇ6S° —ÒÀ  –vWD6VçFW%ö–çC¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws° —f"†ÆdævÆRÒ‡fÒç7F'DævÆR²fÒæVæDævÆR’ò#° —f"†Æe&F—W2Ò‡fÒæ–ææW%&F—W2²fÒæ÷WFW%&F—W2’ò#° —&WGW&â° —ƒ¢fÒç‚²ÖF‚æ6÷2††ÆdævÆR’¢†Æe&F—W2À —“¢fÒç’²ÖF‚ç6–â††ÆdævÆR’¢†Æe&F—W0 —Ó° —ÒÀ  –vWD&V¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws° —&WGW&âÖF‚å’¢‚‡fÒæVæDævÆRÒfÒç7F'DævÆR’òƒ"¢ÖF‚å’’’¢„ÖF‚ç÷r‡fÒæ÷WFW%&F—W2Â"’ÒÖF‚ç÷r‡fÒæ–ææW%&F—W2Â"’“° —ÒÀ  —FööÇF—÷6—F–öã¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws° —f"6VçG&TævÆRÒfÒç7F'DævÆR²‚‡fÒæVæDævÆRÒfÒç7F'DævÆR’ò"“° —f"&ævTg&öÔ6VçG&RÒ‡fÒæ÷WFW%&F—W2ÒfÒæ–ææW%&F—W2’ò"²fÒæ–ææW%&F—W3°  —&WGW&â° —ƒ¢fÒç‚²„ÖF‚æ6÷2†6VçG&TævÆR’¢&ævTg&öÔ6VçG&R’À —“¢fÒç’²„ÖF‚ç6–â†6VçG&TævÆR’¢&ævTg&öÔ6VçG&R —Ó° —ÒÀ  –G&s¢gVæ7F–öâ‚’° —f"7G‚ÒF†—2åö6†'Bæ7Gƒ° —f"fÒÒF†—2å÷f–Ws° —f"—†VÄÖ&v–âÒ‡fÒæ&÷&FW$Æ–vâÓÓÒv–ææW"r’òã32¢° —f"&2Ò° —ƒ¢fÒç‚À —“¢fÒç’À ––ææW%&F—W3¢fÒæ–ææW%&F—W2À –÷WFW%&F—W3¢ÖF‚æÖ‚‡fÒæ÷WFW%&F—W2Ò—†VÄÖ&v–âÂ’À ——†VÄÖ&v–ã¢—†VÄÖ&v–âÀ —7F'DævÆS¢fÒç7F'DævÆRÀ –VæDævÆS¢fÒæVæDævÆRÀ –gVÆÄ6—&6ÆW3¢ÖF‚æfÆö÷"‡fÒæ6—&7VÖfW&Væ6RòDR —Ó° —f"“°  –7G‚ç6fR‚“°  –7G‚æf–ÆÅ7G–ÆRÒfÒæ&6¶w&÷VæD6öÆ÷#° –7G‚ç7G&ö¶U7G–ÆRÒfÒæ&÷&FW$6öÆ÷#°  ––b†&2ægVÆÄ6—&6ÆW2’° –&2æVæDævÆRÒ&2ç7F'DævÆR²DS° –7G‚æ&Vv–åF‚‚“° –7G‚æ&2†&2ç‚Â&2ç’Â&2æ÷WFW%&F—W2Â&2ç7F'DævÆRÂ&2æVæDævÆR“° –7G‚æ&2†&2ç‚Â&2ç’Â&2æ–ææW%&F—W2Â&2æVæDævÆRÂ&2ç7F'DævÆRÂG'VR“° –7G‚æ6Æ÷6UF‚‚“° –f÷"†’Ò²’Â&2ægVÆÄ6—&6ÆW3²²¶’’° –7G‚æf–ÆÂ‚“° —Ð –&2æVæDævÆRÒ&2ç7F'DævÆR²fÒæ6—&7VÖfW&Væ6RRDS° —Ð  –7G‚æ&Vv–åF‚‚“° –7G‚æ&2†&2ç‚Â&2ç’Â&2æ÷WFW%&F—W2Â&2ç7F'DævÆRÂ&2æVæDævÆR“° –7G‚æ&2†&2ç‚Â&2ç’Â&2æ–ææW%&F—W2Â&2æVæDævÆRÂ&2ç7F'DævÆRÂG'VR“° –7G‚æ6Æ÷6UF‚‚“° –7G‚æf–ÆÂ‚“°  ––b‡fÒæ&÷&FW%v–GF‚’° –G&t&÷&FW"†7G‚ÂfÒÂ&2“° —Ð  –7G‚ç&W7F÷&R‚“° —Ð§Ò“° §f"fÇVT÷$FVfVÇBCÒ†VÇW'2CçfÇVT÷$FVfVÇC° §f"FVfVÇD6öÆ÷"Ò6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇD6öÆ÷#° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –VÆVÖVçG3¢° –Æ–æS¢° —FVç6–öã¢ãBÀ –&6¶w&÷VæD6öÆ÷#¢FVfVÇD6öÆ÷"À –&÷&FW%v–GFƒ¢2À –&÷&FW$6öÆ÷#¢FVfVÇD6öÆ÷"À –&÷&FW$67G–ÆS¢v'WGBrÀ –&÷&FW$F6ƒ¢µÒÀ –&÷&FW$F6„öfg6WC¢ãÀ –&÷&FW$¦ö–å7G–ÆS¢vÖ—FW"rÀ –6&W¦–W%ö–çG3¢G'VRÀ –f–ÆÃ¢G'VRÂòòFòvRf–ÆÂ–âF†R&V&WGvVVâF†RÆ–æRæB—G2&6R†—0 —Ð —Ð§Ò“° §f"VÆVÖVçEöÆ–æRÒ6÷&UöVÆVÖVçBæW‡FVæB‡° •÷G—S¢vÆ–æRrÀ  –G&s¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"fÒÒÖRå÷f–Ws° —f"7G‚ÒÖRåö6†'Bæ7Gƒ° —f"7äv2ÒfÒç7äv3° —f"ö–çG2ÒÖRåö6†–ÆG&Vâç6Æ–6R‚“²òò6ÆöæR'& —f"vÆö&ÄFVfVÇG2Ò6÷&UöFVfVÇG2ævÆö&Ã° —f"vÆö&Ä÷F–öäÆ–æTVÆVÖVçG2ÒvÆö&ÄFVfVÇG2æVÆVÖVçG2æÆ–æS° —f"Æ7DG&vä–æFW‚ÒÓ° —f"6Æ÷6UF‚ÒÖRåöÆö÷° —f"–æFW‚Â&Wf–÷W2Â7W'&VçEdÓ°  ––b‚ö–çG2æÆVæwF‚’° —&WGW&ã° —Ð  ––b†ÖRåöÆö÷’° –f÷"†–æFW‚Ò²–æFW‚Âö–çG2æÆVæwFƒ²²¶–æFW‚’° —&Wf–÷W2Ò†VÇW'2Cç&Wf–÷W4—FVÒ‡ö–çG2Â–æFW‚“° ’òò–bF†RÆ–æR†2â÷VâF‚Â6†–gBF†Rö–çB'& ––b‚ö–çG5¶–æFW…Òå÷f–Wrç6¶—bb&Wf–÷W2å÷f–Wrç6¶—’° —ö–çG2Òö–çG2ç6Æ–6R†–æFW‚’æ6öæ6B‡ö–çG2ç6Æ–6RƒÂ–æFW‚’“° –6Æ÷6UF‚Ò7äv3° –'&V³° —Ð —Ð ’òò–bF†RÆ–æR†26Æ÷6RF‚ÂFBF†Rf—'7Bö–çBv–à ––b†6Æ÷6UF‚’° —ö–çG2çW6‚‡ö–çG5³Ò“° —Ð —Ð  –7G‚ç6fR‚“°  ’òò7G&ö¶RÆ–æR÷F–öç0 –7G‚æÆ–æT6ÒfÒæ&÷&FW$67G–ÆRÇÂvÆö&Ä÷F–öäÆ–æTVÆVÖVçG2æ&÷&FW$67G–ÆS°  ’òò”R’æBFòæ÷B7W÷'BÆ–æRF6€ ––b†7G‚ç6WDÆ–æTF6‚’° –7G‚ç6WDÆ–æTF6‚‡fÒæ&÷&FW$F6‚ÇÂvÆö&Ä÷F–öäÆ–æTVÆVÖVçG2æ&÷&FW$F6‚“° —Ð  –7G‚æÆ–æTF6„öfg6WBÒfÇVT÷$FVfVÇBC‡fÒæ&÷&FW$F6„öfg6WBÂvÆö&Ä÷F–öäÆ–æTVÆVÖVçG2æ&÷&FW$F6„öfg6WB“° –7G‚æÆ–æT¦ö–âÒfÒæ&÷&FW$¦ö–å7G–ÆRÇÂvÆö&Ä÷F–öäÆ–æTVÆVÖVçG2æ&÷&FW$¦ö–å7G–ÆS° –7G‚æÆ–æUv–GF‚ÒfÇVT÷$FVfVÇBC‡fÒæ&÷&FW%v–GF‚ÂvÆö&Ä÷F–öäÆ–æTVÆVÖVçG2æ&÷&FW%v–GF‚“° –7G‚ç7G&ö¶U7G–ÆRÒfÒæ&÷&FW$6öÆ÷"ÇÂvÆö&ÄFVfVÇG2æFVfVÇD6öÆ÷#°  ’òò7G&ö¶RÆ–æP –7G‚æ&Vv–åF‚‚“°  ’òòf—'7Bö–çBÖ÷fW2Fò—Bw27F'F–ær÷6—F–öâæòÖGFW"v†@ –7W'&VçEdÒÒö–çG5³Òå÷f–Ws° ––b‚7W'&VçEdÒç6¶—’° –7G‚æÖ÷fUFò†7W'&VçEdÒç‚Â7W'&VçEdÒç’“° –Æ7DG&vä–æFW‚Ò° —Ð  –f÷"†–æFW‚Ò²–æFW‚Âö–çG2æÆVæwFƒ²²¶–æFW‚’° –7W'&VçEdÒÒö–çG5¶–æFW…Òå÷f–Ws° —&Wf–÷W2ÒÆ7DG&vä–æFW‚ÓÓÒÓò†VÇW'2Cç&Wf–÷W4—FVÒ‡ö–çG2Â–æFW‚’¢ö–çG5¶Æ7DG&vä–æFW…Ó°  ––b‚7W'&VçEdÒç6¶—’° ––b‚†Æ7DG&vä–æFW‚ÓÒ†–æFW‚Ò’bb7äv2’ÇÂÆ7DG&vä–æFW‚ÓÓÒÓ’° ’òòF†W&Rv2væBF†—2—2F†Rf—'7Bö–çBgFW"F†Rv  –7G‚æÖ÷fUFò†7W'&VçEdÒç‚Â7W'&VçEdÒç’“° —ÒVÇ6R° ’òòÆ–æRFòæW‡Bö–ç@ –†VÇW'2Cæ6çf2æÆ–æUFò†7G‚Â&Wf–÷W2å÷f–WrÂ7W'&VçEdÒ“° —Ð –Æ7DG&vä–æFW‚Ò–æFWƒ° —Ð —Ð  ––b†6Æ÷6UF‚’° –7G‚æ6Æ÷6UF‚‚“° —Ð  –7G‚ç7G&ö¶R‚“° –7G‚ç&W7F÷&R‚“° —Ð§Ò“° §f"fÇVT÷$FVfVÇBC"Ò†VÇW'2CçfÇVT÷$FVfVÇC° §f"FVfVÇD6öÆ÷"CÒ6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇD6öÆ÷#° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –VÆVÖVçG3¢° —ö–çC¢° —&F—W3¢2À —ö–çE7G–ÆS¢v6—&6ÆRrÀ –&6¶w&÷VæD6öÆ÷#¢FVfVÇD6öÆ÷"CÀ –&÷&FW$6öÆ÷#¢FVfVÇD6öÆ÷"CÀ –&÷&FW%v–GFƒ¢À ’òò†÷fW  –†—E&F—W3¢À –†÷fW%&F—W3¢BÀ –†÷fW$&÷&FW%v–GFƒ¢ —Ð —Ð§Ò“° ¦gVæ7F–öâ…&ævR†Ö÷W6U‚’° —f"fÒÒF†—2å÷f–Ws° —&WGW&âfÒò„ÖF‚æ'2†Ö÷W6U‚ÒfÒç‚’ÂfÒç&F—W2²fÒæ†—E&F—W2’¢fÇ6S°§Ð ¦gVæ7F–öâ•&ævR†Ö÷W6U’’° —f"fÒÒF†—2å÷f–Ws° —&WGW&âfÒò„ÖF‚æ'2†Ö÷W6U’ÒfÒç’’ÂfÒç&F—W2²fÒæ†—E&F—W2’¢fÇ6S°§Ð §f"VÆVÖVçE÷ö–çBÒ6÷&UöVÆVÖVçBæW‡FVæB‡° •÷G—S¢wö–çBrÀ  ––å&ævS¢gVæ7F–öâ†Ö÷W6U‚ÂÖ÷W6U’’° —f"fÒÒF†—2å÷f–Ws° —&WGW&âfÒò‚„ÖF‚ç÷r†Ö÷W6U‚ÒfÒç‚Â"’²ÖF‚ç÷r†Ö÷W6U’ÒfÒç’Â"’’ÂÖF‚ç÷r‡fÒæ†—E&F—W2²fÒç&F—W2Â"’’¢fÇ6S° —ÒÀ  ––äÆ&VÅ&ævS¢…&ævRÀ ––å…&ævS¢…&ævRÀ ––å•&ævS¢•&ævRÀ  –vWD6VçFW%ö–çC¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws° —&WGW&â° —ƒ¢fÒç‚À —“¢fÒç —Ó° —ÒÀ  –vWD&V¢gVæ7F–öâ‚’° —&WGW&âÖF‚å’¢ÖF‚ç÷r‡F†—2å÷f–Wrç&F—W2Â"“° —ÒÀ  —FööÇF—÷6—F–öã¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws° —&WGW&â° —ƒ¢fÒç‚À —“¢fÒç’À —FF–æs¢fÒç&F—W2²fÒæ&÷&FW%v–GF€ —Ó° —ÒÀ  –G&s¢gVæ7F–öâ†6†'D&V’° —f"fÒÒF†—2å÷f–Ws° —f"7G‚ÒF†—2åö6†'Bæ7Gƒ° —f"ö–çE7G–ÆRÒfÒçö–çE7G–ÆS° —f"&÷FF–öâÒfÒç&÷FF–öã° —f"&F—W2ÒfÒç&F—W3° —f"‚ÒfÒçƒ° —f"’ÒfÒç“° —f"vÆö&ÄFVfVÇG2Ò6÷&UöFVfVÇG2ævÆö&Ã° —f"FVfVÇD6öÆ÷"ÒvÆö&ÄFVfVÇG2æFVfVÇD6öÆ÷#²òòW6Æ–çBÖF—6&ÆRÖÆ–æRæò×6†F÷p  ––b‡fÒç6¶—’° —&WGW&ã° —Ð  ’òò6Æ—–ærf÷"ö–çG2à ––b†6†'D&VÓÓÒVæFVf–æVBÇÂ†VÇW'2Cæ6çf2åö—5ö–çD–ä&V‡fÒÂ6†'D&V’’° –7G‚ç7G&ö¶U7G–ÆRÒfÒæ&÷&FW$6öÆ÷"ÇÂFVfVÇD6öÆ÷#° –7G‚æÆ–æUv–GF‚ÒfÇVT÷$FVfVÇBC"‡fÒæ&÷&FW%v–GF‚ÂvÆö&ÄFVfVÇG2æVÆVÖVçG2çö–çBæ&÷&FW%v–GF‚“° –7G‚æf–ÆÅ7G–ÆRÒfÒæ&6¶w&÷VæD6öÆ÷"ÇÂFVfVÇD6öÆ÷#° –†VÇW'2Cæ6çf2æG&uö–çB†7G‚Âö–çE7G–ÆRÂ&F—W2Â‚Â’Â&÷FF–öâ“° —Ð —Ð§Ò“° §f"FVfVÇD6öÆ÷"C"Ò6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇD6öÆ÷#° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –VÆVÖVçG3¢° —&V7FævÆS¢° –&6¶w&÷VæD6öÆ÷#¢FVfVÇD6öÆ÷"C"À –&÷&FW$6öÆ÷#¢FVfVÇD6öÆ÷"C"À –&÷&FW%6¶—VC¢v&÷GFöÒrÀ –&÷&FW%v–GFƒ¢  —Ð —Ð§Ò“° ¦gVæ7F–öâ—5fW'F–6Â‡fÒ’° —&WGW&âfÒbbfÒçv–GF‚ÓÒVæFVf–æVC°§Ð ¢ò¢ ¢¢†VÇW"gVæ7F–öâFòvWBF†R&÷VæG2öbF†R&"&Vv&FÆW72öbF†R÷&–VçFF–öà¢¢&Ò&"´6†'BäVÆVÖVçBå&V7FævÆWÒF†R& ¢¢&WGW&â´&÷VæG7Ò&÷VæG2öbF†R& ¢¢&—fFP¢¢ð¦gVæ7F–öâvWD&$&÷VæG2‡fÒ’° —f"ƒÂƒ"Â“Â“"Â†Æc°  ––b†—5fW'F–6Â‡fÒ’’° –†ÆbÒfÒçv–GF‚ò#° —ƒÒfÒç‚Ò†Æc° —ƒ"ÒfÒç‚²†Æc° —“ÒÖF‚æÖ–â‡fÒç’ÂfÒæ&6R“° —“"ÒÖF‚æÖ‚‡fÒç’ÂfÒæ&6R“° —ÒVÇ6R° –†ÆbÒfÒæ†V–v‡Bò#° —ƒÒÖF‚æÖ–â‡fÒç‚ÂfÒæ&6R“° —ƒ"ÒÖF‚æÖ‚‡fÒç‚ÂfÒæ&6R“° —“ÒfÒç’Ò†Æc° —“"ÒfÒç’²†Æc° —Ð  —&WGW&â° –ÆVgC¢ƒÀ —F÷¢“À —&–v‡C¢ƒ"À –&÷GFöÓ¢“  —Ó°§Ð ¦gVæ7F–öâ7v†÷&–rÂcÂc"’° —&WGW&â÷&–rÓÓÒcòc"¢÷&–rÓÓÒc"òc¢÷&–s°§Ð ¦gVæ7F–öâ'6T&÷&FW%6¶—VB‡fÒ’° —f"VFvRÒfÒæ&÷&FW%6¶—VC° —f"&W2Ò·Ó°  ––b‚VFvR’° —&WGW&â&W3° —Ð  ––b‡fÒæ†÷&—¦öçFÂ’° ––b‡fÒæ&6RâfÒç‚’° –VFvRÒ7v†VFvRÂvÆVgBrÂw&–v‡Br“° —Ð —ÒVÇ6R–b‡fÒæ&6RÂfÒç’’° –VFvRÒ7v†VFvRÂv&÷GFöÒrÂwF÷r“° —Ð  —&W5¶VFvUÒÒG'VS° —&WGW&â&W3°§Ð ¦gVæ7F–öâ'6T&÷&FW%v–GF‚‡fÒÂÖ…rÂÖ„‚’° —f"fÇVRÒfÒæ&÷&FW%v–GFƒ° —f"6¶—Ò'6T&÷&FW%6¶—VB‡fÒ“° —f"BÂ"Â"ÂÃ°  ––b††VÇW'2Cæ—4ö&¦V7B‡fÇVR’’° —BÒ·fÇVRçF÷ÇÂ° —"Ò·fÇVRç&–v‡BÇÂ° –"Ò·fÇVRæ&÷GFöÒÇÂ° –ÂÒ·fÇVRæÆVgBÇÂ° —ÒVÇ6R° —BÒ"Ò"ÒÂÒ·fÇVRÇÂ° —Ð  —&WGW&â° —C¢6¶—çF÷ÇÂ‡BÂ’ò¢BâÖ„‚òÖ„‚¢BÀ —#¢6¶—ç&–v‡BÇÂ‡"Â’ò¢"âÖ…ròÖ…r¢"À –#¢6¶—æ&÷GFöÒÇÂ†"Â’ò¢"âÖ„‚òÖ„‚¢"À –Ã¢6¶—æÆVgBÇÂ†ÂÂ’ò¢ÂâÖ…ròÖ…r¢À —Ó°§Ð ¦gVæ7F–öâ&÷VæF–æu&V7G2‡fÒ’° —f"&÷VæG2ÒvWD&$&÷VæG2‡fÒ“° —f"v–GF‚Ò&÷VæG2ç&–v‡BÒ&÷VæG2æÆVgC° —f"†V–v‡BÒ&÷VæG2æ&÷GFöÒÒ&÷VæG2çF÷° —f"&÷&FW"Ò'6T&÷&FW%v–GF‚‡fÒÂv–GF‚ò"Â†V–v‡Bò"“°  —&WGW&â° –÷WFW#¢° —ƒ¢&÷VæG2æÆVgBÀ —“¢&÷VæG2çF÷À —s¢v–GF‚À –ƒ¢†V–v‡@ —ÒÀ ––ææW#¢° —ƒ¢&÷VæG2æÆVgB²&÷&FW"æÂÀ —“¢&÷VæG2çF÷²&÷&FW"çBÀ —s¢v–GF‚Ò&÷&FW"æÂÒ&÷&FW"ç"À –ƒ¢†V–v‡BÒ&÷&FW"çBÒ&÷&FW"æ  —Ð —Ó°§Ð ¦gVæ7F–öâ–å&ævR‡fÒÂ‚Â’’° —f"6¶—‚Ò‚ÓÓÒçVÆÃ° —f"6¶—’Ò’ÓÓÒçVÆÃ° —f"&÷VæG2ÒfÒÇÂ‡6¶—‚bb6¶—’’òfÇ6R¢vWD&$&÷VæG2‡fÒ“°  —&WGW&â&÷VæG0 ’bb‡6¶—‚ÇÂ‚ãÒ&÷VæG2æÆVgBbb‚ÃÒ&÷VæG2ç&–v‡B ’bb‡6¶—’ÇÂ’ãÒ&÷VæG2çF÷bb’ÃÒ&÷VæG2æ&÷GFöÒ“°§Ð §f"VÆVÖVçE÷&V7FævÆRÒ6÷&UöVÆVÖVçBæW‡FVæB‡° •÷G—S¢w&V7FævÆRrÀ  –G&s¢gVæ7F–öâ‚’° —f"7G‚ÒF†—2åö6†'Bæ7Gƒ° —f"fÒÒF†—2å÷f–Ws° —f"&V7G2Ò&÷VæF–æu&V7G2‡fÒ“° —f"÷WFW"Ò&V7G2æ÷WFW#° —f"–ææW"Ò&V7G2æ–ææW#°  –7G‚æf–ÆÅ7G–ÆRÒfÒæ&6¶w&÷VæD6öÆ÷#° –7G‚æf–ÆÅ&V7B†÷WFW"ç‚Â÷WFW"ç’Â÷WFW"çrÂ÷WFW"æ‚“°  ––b†÷WFW"çrÓÓÒ–ææW"çrbb÷WFW"æ‚ÓÓÒ–ææW"æ‚’° —&WGW&ã° —Ð  –7G‚ç6fR‚“° –7G‚æ&Vv–åF‚‚“° –7G‚ç&V7B†÷WFW"ç‚Â÷WFW"ç’Â÷WFW"çrÂ÷WFW"æ‚“° –7G‚æ6Æ—‚“° –7G‚æf–ÆÅ7G–ÆRÒfÒæ&÷&FW$6öÆ÷#° –7G‚ç&V7B†–ææW"ç‚Â–ææW"ç’Â–ææW"çrÂ–ææW"æ‚“° –7G‚æf–ÆÂ‚vWfVæöFBr“° –7G‚ç&W7F÷&R‚“° —ÒÀ  –†V–v‡C¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws° —&WGW&âfÒæ&6RÒfÒç“° —ÒÀ  ––å&ævS¢gVæ7F–öâ†Ö÷W6U‚ÂÖ÷W6U’’° —&WGW&â–å&ævR‡F†—2å÷f–WrÂÖ÷W6U‚ÂÖ÷W6U’“° —ÒÀ  ––äÆ&VÅ&ævS¢gVæ7F–öâ†Ö÷W6U‚ÂÖ÷W6U’’° —f"fÒÒF†—2å÷f–Ws° —&WGW&â—5fW'F–6Â‡fÒ “ò–å&ævR‡fÒÂÖ÷W6U‚ÂçVÆÂ “¢–å&ævR‡fÒÂçVÆÂÂÖ÷W6U’“° —ÒÀ  ––å…&ævS¢gVæ7F–öâ†Ö÷W6U‚’° —&WGW&â–å&ævR‡F†—2å÷f–WrÂÖ÷W6U‚ÂçVÆÂ“° —ÒÀ  ––å•&ævS¢gVæ7F–öâ†Ö÷W6U’’° —&WGW&â–å&ævR‡F†—2å÷f–WrÂçVÆÂÂÖ÷W6U’“° —ÒÀ  –vWD6VçFW%ö–çC¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws° —f"‚Â“° ––b†—5fW'F–6Â‡fÒ’’° —‚ÒfÒçƒ° —’Ò‡fÒç’²fÒæ&6R’ò#° —ÒVÇ6R° —‚Ò‡fÒç‚²fÒæ&6R’ò#° —’ÒfÒç“° —Ð  —&WGW&â·ƒ¢‚Â“¢—Ó° —ÒÀ  –vWD&V¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws°  —&WGW&â—5fW'F–6Â‡fÒ “òfÒçv–GF‚¢ÖF‚æ'2‡fÒç’ÒfÒæ&6R “¢fÒæ†V–v‡B¢ÖF‚æ'2‡fÒç‚ÒfÒæ&6R“° —ÒÀ  —FööÇF—÷6—F–öã¢gVæ7F–öâ‚’° —f"fÒÒF†—2å÷f–Ws° —&WGW&â° —ƒ¢fÒç‚À —“¢fÒç —Ó° —Ð§Ò“° §f"VÆVÖVçG2Ò·Ó°§f"&2ÒVÆVÖVçEö&3°§f"Æ–æRÒVÆVÖVçEöÆ–æS°§f"ö–çBÒVÆVÖVçE÷ö–çC°§f"&V7FævÆRÒVÆVÖVçE÷&V7FævÆS°¦VÆVÖVçG2ä&2Ò&3°¦VÆVÖVçG2äÆ–æRÒÆ–æS°¦VÆVÖVçG2åö–çBÒö–çC°¦VÆVÖVçG2å&V7FævÆRÒ&V7FævÆS° §f"FW&V6FVBÒ†VÇW'2CåöFW&V6FVC°§f"fÇVT÷$FVfVÇBC2Ò†VÇW'2CçfÇVT÷$FVfVÇC° ¦6÷&UöFVfVÇG2å÷6WB‚v&"rÂ° –†÷fW#¢° –ÖöFS¢vÆ&VÂp —ÒÀ  —66ÆW3¢° —„†W3¢·° —G—S¢v6FVv÷'’rÀ –öfg6WC¢G'VRÀ –w&–DÆ–æW3¢° –öfg6WDw&–DÆ–æW3¢G'VP —Ð —ÕÒÀ  —”†W3¢·° —G—S¢vÆ–æV"p —ÕÐ —Ð§Ò“° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –FF6WG3¢° –&#¢° –6FVv÷'•W&6VçFvS¢ã‚À –&%W&6VçFvS¢ã —Ð —Ð§Ò“° ¢ò¢ ¢¢6ö×WFW2F†R&÷F–ÖÂ"6×ÆR6—¦RFòÖ–çF–â&'2WVÆÇ’6—¦VBv†–ÆR&WfVçF–ær÷fW&Æà¢¢&—fFP¢¢ð¦gVæ7F–öâ6ö×WFTÖ–å6×ÆU6—¦R‡66ÆRÂ—†VÇ2’° —f"Ö–âÒ66ÆRåöÆVæwFƒ° —f"&WbÂ7W'"Â’Â–ÆVã°  –f÷"†’ÒÂ–ÆVâÒ—†VÇ2æÆVæwFƒ²’Â–ÆVã²²¶’’° –Ö–âÒÖF‚æÖ–â†Ö–âÂÖF‚æ'2‡—†VÇ5¶•ÒÒ—†VÇ5¶’ÒÒ’“° —Ð  –f÷"†’ÒÂ–ÆVâÒ66ÆRævWEF–6·2‚’æÆVæwFƒ²’Â–ÆVã²²¶’’° –7W'"Ò66ÆRævWE—†VÄf÷%F–6²†’“° –Ö–âÒ’âòÖF‚æÖ–â†Ö–âÂÖF‚æ'2†7W'"Ò&Wb’’¢Ö–ã° —&WbÒ7W'#° —Ð  —&WGW&âÖ–ã°§Ð ¢ò¢ ¢¢6ö×WFW2â&–FVÂ"6FVv÷'’&6VBöâF†R'6öÇWFR&"F†–6¶æW72÷"Â–bVæFVf–æVB÷"çVÆÂÀ¢¢W6W2F†R6ÖÆÆW7B–çFW'fÂ‡6VR6ö×WFTÖ–å6×ÆU6—¦R’F†B&WfVçG2&"÷fW&Æ–ærâF†—0¢¢ÖöFR7W'&VçFÇ’Çv—2vVæW&FW2&'2WVÆÇ’6—¦VB‡VçF–ÂvR–çG&öGV6R67&—F&ÆR÷F–öç3ò’à¢¢&—fFP¢¢ð¦gVæ7F–öâ6ö×WFTf—D6FVv÷'•G&—G2†–æFW‚Â'VÆW"Â÷F–öç2’° —f"F†–6¶æW72Ò÷F–öç2æ&%F†–6¶æW73° —f"6÷VçBÒ'VÆW"ç7F6´6÷VçC° —f"7W'"Ò'VÆW"ç—†VÇ5¶–æFW…Ó° —f"Ö–âÒ†VÇW'2Cæ—4çVÆÄ÷%VæFVb‡F†–6¶æW72 “ò6ö×WFTÖ–å6×ÆU6—¦R‡'VÆW"ç66ÆRÂ'VÆW"ç—†VÇ2 “¢Ó° —f"6—¦RÂ&F–ó°  ––b††VÇW'2Cæ—4çVÆÄ÷%VæFVb‡F†–6¶æW72’’° —6—¦RÒÖ–â¢÷F–öç2æ6FVv÷'•W&6VçFvS° —&F–òÒ÷F–öç2æ&%W&6VçFvS° —ÒVÇ6R° ’òòv†Vâ&"F†–6¶æW72—2Væf÷&6VBÂ6FVv÷'’æB&"W&6VçFvW2&R–væ÷&VBà ’òòæ÷FR…4"“¢vR6÷VÆBFB7W÷'Bf÷"&VÆF—fR&"F†–6¶æW72†Rærâ&%F†–6¶æW73¢sSRr ’òòæBFW&V6FR&%W&6VçFvR6–æ6RF†—2fÇVR—2–væ÷&VBv†VâF†–6¶æW72—2'6öÇWFRà —6—¦RÒF†–6¶æW72¢6÷VçC° —&F–òÒ° —Ð  —&WGW&â° –6‡Væ³¢6—¦Rò6÷VçBÀ —&F–ó¢&F–òÀ —7F'C¢7W'"Ò‡6—¦Rò" —Ó°§Ð ¢ò¢ ¢¢6ö×WFW2â&÷F–ÖÂ"6FVv÷'’F†BvÆö&ÆÇ’'&ævW2&'26–FR'’6–FR†æòvv†Và¢¢W&6VçFvR÷F–öç2&R’Â&6VBöâF†R&Wf–÷W2æBföÆÆ÷v–ær6FVv÷&–W2âF†—2ÖöFP¢¢vVæW&FW2&'2v—F‚F–ffW&VçBv–GF‡2v†VâFF&Ræ÷BWfVæÇ’76VBà¢¢&—fFP¢¢ð¦gVæ7F–öâ6ö×WFTfÆW„6FVv÷'•G&—G2†–æFW‚Â'VÆW"Â÷F–öç2’° —f"—†VÇ2Ò'VÆW"ç—†VÇ3° —f"7W'"Ò—†VÇ5¶–æFW…Ó° —f"&WbÒ–æFW‚âò—†VÇ5¶–æFW‚ÒÒ¢çVÆÃ° —f"æW‡BÒ–æFW‚Â—†VÇ2æÆVæwF‚Òò—†VÇ5¶–æFW‚²Ò¢çVÆÃ° —f"W&6VçBÒ÷F–öç2æ6FVv÷'•W&6VçFvS° —f"7F'BÂ6—¦S°  ––b‡&WbÓÓÒçVÆÂ’° ’òòf—'7BFF¢—G26—¦R—2F÷V&ÆR&6VBöâF†RæW‡Bö–çB÷"À ’òò–b—Bw2Ç6òF†RÆ7BFFÂvRW6RF†R66ÆR6—¦Rà —&WbÒ7W'"Ò†æW‡BÓÓÒçVÆÂò'VÆW"æVæBÒ'VÆW"ç7F'B¢æW‡BÒ7W'"“° —Ð  ––b†æW‡BÓÓÒçVÆÂ’° ’òòÆ7BFF¢—G26—¦R—2Ç6òF÷V&ÆR&6VBöâF†R&Wf–÷W2ö–çBà –æW‡BÒ7W'"²7W'"Ò&Wc° —Ð  —7F'BÒ7W'"Ò†7W'"ÒÖF‚æÖ–â‡&WbÂæW‡B’’ò"¢W&6VçC° —6—¦RÒÖF‚æ'2†æW‡BÒ&Wb’ò"¢W&6VçC°  —&WGW&â° –6‡Væ³¢6—¦Rò'VÆW"ç7F6´6÷VçBÀ —&F–ó¢÷F–öç2æ&%W&6VçFvRÀ —7F'C¢7F'@ —Ó°§Ð §f"6öçG&öÆÆW%ö&"Ò6÷&UöFF6WD6öçG&öÆÆW"æW‡FVæB‡°  –FFVÆVÖVçEG—S¢VÆVÖVçG2å&V7FævÆRÀ  ’ò¢  ’¢&—fFP ’¢ð •öFFVÆVÖVçD÷F–öç3¢° ’v&6¶w&÷VæD6öÆ÷"rÀ ’v&÷&FW$6öÆ÷"rÀ ’v&÷&FW%6¶—VBrÀ ’v&÷&FW%v–GF‚rÀ ’v&%W&6VçFvRrÀ ’v&%F†–6¶æW72rÀ ’v6FVv÷'•W&6VçFvRrÀ ’vÖ„&%F†–6¶æW72rÀ ’vÖ–ä&$ÆVæwF‚p •ÒÀ  ––æ—F–Æ—¦S¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"ÖWFÂ66ÆT÷G3°  –6÷&UöFF6WD6öçG&öÆÆW"ç&÷F÷G—Ræ–æ—F–Æ—¦RæÇ’†ÖRÂ&wVÖVçG2“°  –ÖWFÒÖRævWDÖWF‚“° –ÖWFç7F6²ÒÖRævWDFF6WB‚’ç7F6³° –ÖWFæ&"ÒG'VS°  —66ÆT÷G2ÒÖRåövWD–æFW…66ÆR‚’æ÷F–öç3° –FW&V6FVB‚v&"6†'BrÂ66ÆT÷G2æ&%W&6VçFvRÂw66ÆW2å·‚÷•Ô†W2æ&%W&6VçFvRrÂvFF6WBæ&%W&6VçFvRr“° –FW&V6FVB‚v&"6†'BrÂ66ÆT÷G2æ&%F†–6¶æW72Âw66ÆW2å·‚÷•Ô†W2æ&%F†–6¶æW72rÂvFF6WBæ&%F†–6¶æW72r“° –FW&V6FVB‚v&"6†'BrÂ66ÆT÷G2æ6FVv÷'•W&6VçFvRÂw66ÆW2å·‚÷•Ô†W2æ6FVv÷'•W&6VçFvRrÂvFF6WBæ6FVv÷'•W&6VçFvRr“° –FW&V6FVB‚v&"6†'BrÂÖRåövWEfÇVU66ÆR‚’æ÷F–öç2æÖ–ä&$ÆVæwF‚Âw66ÆW2å·‚÷•Ô†W2æÖ–ä&$ÆVæwF‚rÂvFF6WBæÖ–ä&$ÆVæwF‚r“° –FW&V6FVB‚v&"6†'BrÂ66ÆT÷G2æÖ„&%F†–6¶æW72Âw66ÆW2å·‚÷•Ô†W2æÖ„&%F†–6¶æW72rÂvFF6WBæÖ„&%F†–6¶æW72r“° —ÒÀ  —WFFS¢gVæ7F–öâ‡&W6WB’° —f"ÖRÒF†—3° —f"&V7G2ÒÖRævWDÖWF‚’æFF° —f"’Â–ÆVã°  –ÖRå÷'VÆW"ÒÖRævWE'VÆW"‚“°  –f÷"†’ÒÂ–ÆVâÒ&V7G2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖRçWFFTVÆVÖVçB‡&V7G5¶•ÒÂ’Â&W6WB“° —Ð —ÒÀ  —WFFTVÆVÖVçC¢gVæ7F–öâ‡&V7FævÆRÂ–æFW‚Â&W6WB’° —f"ÖRÒF†—3° —f"ÖWFÒÖRævWDÖWF‚“° —f"FF6WBÒÖRævWDFF6WB‚“° —f"÷F–öç2ÒÖRå÷&W6öÇfTFFVÆVÖVçD÷F–öç2‡&V7FævÆRÂ–æFW‚“°  —&V7FævÆRå÷…66ÆRÒÖRævWE66ÆTf÷$–B†ÖWFç„†—4”B“° —&V7FævÆRå÷•66ÆRÒÖRævWE66ÆTf÷$–B†ÖWFç”†—4”B“° —&V7FævÆRåöFF6WD–æFW‚ÒÖRæ–æFWƒ° —&V7FævÆRåö–æFW‚Ò–æFWƒ° —&V7FævÆRåöÖöFVÂÒ° –&6¶w&÷VæD6öÆ÷#¢÷F–öç2æ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢÷F–öç2æ&÷&FW$6öÆ÷"À –&÷&FW%6¶—VC¢÷F–öç2æ&÷&FW%6¶—VBÀ –&÷&FW%v–GFƒ¢÷F–öç2æ&÷&FW%v–GF‚À –FF6WDÆ&VÃ¢FF6WBæÆ&VÂÀ –Æ&VÃ¢ÖRæ6†'BæFFæÆ&VÇ5¶–æFW…Ð —Ó°  ––b††VÇW'2Cæ—4'&’†FF6WBæFF¶–æFW…Ò’’° —&V7FævÆRåöÖöFVÂæ&÷&FW%6¶—VBÒçVÆÃ° —Ð  –ÖRå÷WFFTVÆVÖVçDvVöÖWG'’‡&V7FævÆRÂ–æFW‚Â&W6WBÂ÷F–öç2“°  —&V7FævÆRç—f÷B‚“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •÷WFFTVÆVÖVçDvVöÖWG'“¢gVæ7F–öâ‡&V7FævÆRÂ–æFW‚Â&W6WBÂ÷F–öç2’° —f"ÖRÒF†—3° —f"ÖöFVÂÒ&V7FævÆRåöÖöFVÃ° —f"g66ÆRÒÖRåövWEfÇVU66ÆR‚“° —f"&6RÒg66ÆRævWD&6U—†VÂ‚“° —f"†÷&—¦öçFÂÒg66ÆRæ—4†÷&—¦öçFÂ‚“° —f"'VÆW"ÒÖRå÷'VÆW"ÇÂÖRævWE'VÆW"‚“° —f"g—†VÇ2ÒÖRæ6Æ7VÆFT&%fÇVU—†VÇ2†ÖRæ–æFW‚Â–æFW‚Â÷F–öç2“° —f"——†VÇ2ÒÖRæ6Æ7VÆFT&$–æFW…—†VÇ2†ÖRæ–æFW‚Â–æFW‚Â'VÆW"Â÷F–öç2“°  –ÖöFVÂæ†÷&—¦öçFÂÒ†÷&—¦öçFÃ° –ÖöFVÂæ&6RÒ&W6WBò&6R¢g—†VÇ2æ&6S° –ÖöFVÂç‚Ò†÷&—¦öçFÂò&W6WBò&6R¢g—†VÇ2æ†VB¢——†VÇ2æ6VçFW#° –ÖöFVÂç’Ò†÷&—¦öçFÂò——†VÇ2æ6VçFW"¢&W6WBò&6R¢g—†VÇ2æ†VC° –ÖöFVÂæ†V–v‡BÒ†÷&—¦öçFÂò——†VÇ2ç6—¦R¢VæFVf–æVC° –ÖöFVÂçv–GF‚Ò†÷&—¦öçFÂòVæFVf–æVB¢——†VÇ2ç6—¦S° —ÒÀ  ’ò¢  ’¢&WGW&ç2F†R7F6·2&6VBöâw&÷W2æB&"f—6–&–Æ—G’à ’¢&Ò¶çVÖ&W'Ò¶Æ7EÒÒF†RFF6WB–æFW€ ’¢&WGW&ç2·7G&–æuµ×ÒF†RÆ—7Böb7F6²”G0 ’¢&—fFP ’¢ð •övWE7F6·3¢gVæ7F–öâ†Æ7B’° —f"ÖRÒF†—3° —f"66ÆRÒÖRåövWD–æFW…66ÆR‚“° —f"ÖWF6WG2Ò66ÆRåövWDÖF6†–æuf—6–&ÆTÖWF2†ÖRå÷G—R“° —f"7F6¶VBÒ66ÆRæ÷F–öç2ç7F6¶VC° —f"–ÆVâÒÖWF6WG2æÆVæwFƒ° —f"7F6·2ÒµÓ° —f"’ÂÖWF°  –f÷"†’Ò²’Â–ÆVã²²¶’’° –ÖWFÒÖWF6WG5¶•Ó° ’òò7F6¶VBÂÖWFç7F6° ’òòÂf÷VæBÂæ÷Bf÷VæBÂVæFVf–æV@ ’òòfÇ6RÂ‚Â‚Â€ ’òòG'VRÂÂ‚À ’òòVæFVf–æVBÂÂ‚Â€ ––b‡7F6¶VBÓÓÒfÇ6RÇÂ7F6·2æ–æFW„öb†ÖWFç7F6²’ÓÓÒÓÇÀ ’‡7F6¶VBÓÓÒVæFVf–æVBbbÖWFç7F6²ÓÓÒVæFVf–æVB’’° —7F6·2çW6‚†ÖWFç7F6²“° —Ð ––b†ÖWFæ–æFW‚ÓÓÒÆ7B’° –'&V³° —Ð —Ð  —&WGW&â7F6·3° —ÒÀ  ’ò¢  ’¢&WGW&ç2F†RVffV7F—fRçVÖ&W"öb7F6·2&6VBöâw&÷W2æB&"f—6–&–Æ—G’à ’¢&—fFP ’¢ð –vWE7F6´6÷VçC¢gVæ7F–öâ‚’° —&WGW&âF†—2åövWE7F6·2‚’æÆVæwFƒ° —ÒÀ  ’ò¢  ’¢&WGW&ç2F†R7F6²–æFW‚f÷"F†Rv—fVâFF6WB&6VBöâw&÷W2æB&"f—6–&–Æ—G’à ’¢&Ò¶çVÖ&W'Ò¶FF6WD–æFW…ÒÒF†RFF6WB–æFW€ ’¢&Ò·7G&–æwÒ¶æÖUÒÒF†R7F6²æÖRFòf–æ@ ’¢&WGW&ç2¶çVÖ&W'ÒF†R7F6²–æFW€ ’¢&—fFP ’¢ð –vWE7F6´–æFWƒ¢gVæ7F–öâ†FF6WD–æFW‚ÂæÖR’° —f"7F6·2ÒF†—2åövWE7F6·2†FF6WD–æFW‚“° —f"–æFW‚Ò†æÖRÓÒVæFVf–æVB “ò7F6·2æ–æFW„öb†æÖR “¢Ó²òò–æFW„öb&WGW&ç2Ó–bVÆVÖVçB—2æ÷B&W6Vç@  —&WGW&â†–æFW‚ÓÓÒÓ “ò7F6·2æÆVæwF‚Ò “¢–æFWƒ° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð –vWE'VÆW#¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"66ÆRÒÖRåövWD–æFW…66ÆR‚“° —f"—†VÇ2ÒµÓ° —f"’Â–ÆVã°  –f÷"†’ÒÂ–ÆVâÒÖRævWDÖWF‚’æFFæÆVæwFƒ²’Â–ÆVã²²¶’’° ——†VÇ2çW6‚‡66ÆRævWE—†VÄf÷%fÇVR†çVÆÂÂ’ÂÖRæ–æFW‚’“° —Ð  —&WGW&â° ——†VÇ3¢—†VÇ2À —7F'C¢66ÆRå÷7F'E—†VÂÀ –VæC¢66ÆRåöVæE—†VÂÀ —7F6´6÷VçC¢ÖRævWE7F6´6÷VçB‚’À —66ÆS¢66ÆP —Ó° —ÒÀ  ’ò¢  ’¢æ÷FS¢—†VÂfÇVW2&Ræ÷B6Æ×VBFòF†R66ÆR&Và ’¢&—fFP ’¢ð –6Æ7VÆFT&%fÇVU—†VÇ3¢gVæ7F–öâ†FF6WD–æFW‚Â–æFW‚Â÷F–öç2’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"66ÆRÒÖRåövWEfÇVU66ÆR‚“° —f"—4†÷&—¦öçFÂÒ66ÆRæ—4†÷&—¦öçFÂ‚“° —f"FF6WG2Ò6†'BæFFæFF6WG3° —f"ÖWF6WG2Ò66ÆRåövWDÖF6†–æuf—6–&ÆTÖWF2†ÖRå÷G—R“° —f"fÇVRÒ66ÆRå÷'6UfÇVR†FF6WG5¶FF6WD–æFW…ÒæFF¶–æFW…Ò“° —f"Ö–ä&$ÆVæwF‚Ò÷F–öç2æÖ–ä&$ÆVæwFƒ° —f"7F6¶VBÒ66ÆRæ÷F–öç2ç7F6¶VC° —f"7F6²ÒÖRævWDÖWF‚’ç7F6³° —f"7F'BÒfÇVRç7F'BÓÓÒVæFVf–æVBò¢fÇVRæÖ‚ãÒbbfÇVRæÖ–âãÒòfÇVRæÖ–â¢fÇVRæÖƒ° —f"ÆVæwF‚ÒfÇVRç7F'BÓÓÒVæFVf–æVBòfÇVRæVæB¢fÇVRæÖ‚ãÒbbfÇVRæÖ–âãÒòfÇVRæÖ‚ÒfÇVRæÖ–â¢fÇVRæÖ–âÒfÇVRæÖƒ° —f"–ÆVâÒÖWF6WG2æÆVæwFƒ° —f"’Â–ÖWFÂ—fÇVRÂ&6RÂ†VBÂ6—¦RÂ7F6´ÆVæwFƒ°  ––b‡7F6¶VBÇÂ‡7F6¶VBÓÓÒVæFVf–æVBbb7F6²ÓÒVæFVf–æVB’’° –f÷"†’Ò²’Â–ÆVã²²¶’’° ––ÖWFÒÖWF6WG5¶•Ó°  ––b†–ÖWFæ–æFW‚ÓÓÒFF6WD–æFW‚’° –'&V³° —Ð  ––b†–ÖWFç7F6²ÓÓÒ7F6²’° —7F6´ÆVæwF‚Ò66ÆRå÷'6UfÇVR†FF6WG5¶–ÖWFæ–æFW…ÒæFF¶–æFW…Ò“° –—fÇVRÒ7F6´ÆVæwF‚ç7F'BÓÓÒVæFVf–æVBò7F6´ÆVæwF‚æVæB¢7F6´ÆVæwF‚æÖ–âãÒbb7F6´ÆVæwF‚æÖ‚ãÒò7F6´ÆVæwF‚æÖ‚¢7F6´ÆVæwF‚æÖ–ã°  ––b‚‡fÇVRæÖ–âÂbb—fÇVRÂ’ÇÂ‡fÇVRæÖ‚ãÒbb—fÇVRâ’’° —7F'B³Ò—fÇVS° —Ð —Ð —Ð —Ð  –&6RÒ66ÆRævWE—†VÄf÷%fÇVR‡7F'B“° –†VBÒ66ÆRævWE—†VÄf÷%fÇVR‡7F'B²ÆVæwF‚“° —6—¦RÒ†VBÒ&6S°  ––b†Ö–ä&$ÆVæwF‚ÓÒVæFVf–æVBbbÖF‚æ'2‡6—¦R’ÂÖ–ä&$ÆVæwF‚’° —6—¦RÒÖ–ä&$ÆVæwFƒ° ––b†ÆVæwF‚ãÒbb—4†÷&—¦öçFÂÇÂÆVæwF‚Âbb—4†÷&—¦öçFÂ’° –†VBÒ&6RÒÖ–ä&$ÆVæwFƒ° —ÒVÇ6R° –†VBÒ&6R²Ö–ä&$ÆVæwFƒ° —Ð —Ð  —&WGW&â° —6—¦S¢6—¦RÀ –&6S¢&6RÀ –†VC¢†VBÀ –6VçFW#¢†VB²6—¦Rò  —Ó° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð –6Æ7VÆFT&$–æFW…—†VÇ3¢gVæ7F–öâ†FF6WD–æFW‚Â–æFW‚Â'VÆW"Â÷F–öç2’° —f"ÖRÒF†—3° —f"&ævRÒ÷F–öç2æ&%F†–6¶æW72ÓÓÒvfÆW‚p “ò6ö×WFTfÆW„6FVv÷'•G&—G2†–æFW‚Â'VÆW"Â÷F–öç2 “¢6ö×WFTf—D6FVv÷'•G&—G2†–æFW‚Â'VÆW"Â÷F–öç2“°  —f"7F6´–æFW‚ÒÖRævWE7F6´–æFW‚†FF6WD–æFW‚ÂÖRævWDÖWF‚’ç7F6²“° —f"6VçFW"Ò&ævRç7F'B²‡&ævRæ6‡Væ²¢7F6´–æFW‚’²‡&ævRæ6‡Væ²ò"“° —f"6—¦RÒÖF‚æÖ–â€ —fÇVT÷$FVfVÇBC2†÷F–öç2æÖ„&%F†–6¶æW72Â–æf–æ—G’’À —&ævRæ6‡Væ²¢&ævRç&F–ò“°  —&WGW&â° –&6S¢6VçFW"Ò6—¦Rò"À –†VC¢6VçFW"²6—¦Rò"À –6VçFW#¢6VçFW"À —6—¦S¢6—¦P —Ó° —ÒÀ  –G&s¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"66ÆRÒÖRåövWEfÇVU66ÆR‚“° —f"&V7G2ÒÖRævWDÖWF‚’æFF° —f"FF6WBÒÖRævWDFF6WB‚“° —f"–ÆVâÒ&V7G2æÆVæwFƒ° —f"’Ò°  –†VÇW'2Cæ6çf2æ6Æ—&V†6†'Bæ7G‚Â6†'Bæ6†'D&V“°  –f÷"ƒ²’Â–ÆVã²²¶’’° —f"fÂÒ66ÆRå÷'6UfÇVR†FF6WBæFF¶•Ò“° ––b‚—4æâ‡fÂæÖ–â’bb—4æâ‡fÂæÖ‚’’° —&V7G5¶•ÒæG&r‚“° —Ð —Ð  –†VÇW'2Cæ6çf2çVæ6Æ—&V†6†'Bæ7G‚“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •÷&W6öÇfTFFVÆVÖVçD÷F–öç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"fÇVW2Ò†VÇW'2CæW‡FVæB‡·ÒÂ6÷&UöFF6WD6öçG&öÆÆW"ç&÷F÷G—Rå÷&W6öÇfTFFVÆVÖVçD÷F–öç2æÇ’†ÖRÂ&wVÖVçG2’“° —f"–æFW„÷G2ÒÖRåövWD–æFW…66ÆR‚’æ÷F–öç3° —f"fÇVT÷G2ÒÖRåövWEfÇVU66ÆR‚’æ÷F–öç3°  —fÇVW2æ&%W&6VçFvRÒfÇVT÷$FVfVÇBC2†–æFW„÷G2æ&%W&6VçFvRÂfÇVW2æ&%W&6VçFvR“° —fÇVW2æ&%F†–6¶æW72ÒfÇVT÷$FVfVÇBC2†–æFW„÷G2æ&%F†–6¶æW72ÂfÇVW2æ&%F†–6¶æW72“° —fÇVW2æ6FVv÷'•W&6VçFvRÒfÇVT÷$FVfVÇBC2†–æFW„÷G2æ6FVv÷'•W&6VçFvRÂfÇVW2æ6FVv÷'•W&6VçFvR“° —fÇVW2æÖ„&%F†–6¶æW72ÒfÇVT÷$FVfVÇBC2†–æFW„÷G2æÖ„&%F†–6¶æW72ÂfÇVW2æÖ„&%F†–6¶æW72“° —fÇVW2æÖ–ä&$ÆVæwF‚ÒfÇVT÷$FVfVÇBC2‡fÇVT÷G2æÖ–ä&$ÆVæwF‚ÂfÇVW2æÖ–ä&$ÆVæwF‚“°  —&WGW&âfÇVW3° —Ð §Ò“° §f"fÇVT÷$FVfVÇBCBÒ†VÇW'2CçfÇVT÷$FVfVÇC°§f"&W6öÇfRCÒ†VÇW'2Cæ÷F–öç2ç&W6öÇfS° ¦6÷&UöFVfVÇG2å÷6WB‚v'V&&ÆRrÂ° –†÷fW#¢° –ÖöFS¢w6–ævÆRp —ÒÀ  —66ÆW3¢° —„†W3¢·° —G—S¢vÆ–æV"rÂòò'V&&ÆR6†÷VÆB&ö&&Ç’W6RÆ–æV"66ÆR'’FVfVÇ@ —÷6—F–öã¢v&÷GFöÒrÀ ––C¢w‚Ö†—2ÓròòæVVBâ”B6òFF6WG26â&VfW&Væ6RF†R66ÆP —ÕÒÀ —”†W3¢·° —G—S¢vÆ–æV"rÀ —÷6—F–öã¢vÆVgBrÀ ––C¢w’Ö†—2Óp —ÕÐ —ÒÀ  —FööÇF—3¢° –6ÆÆ&6·3¢° —F—FÆS¢gVæ7F–öâ‚’° ’òòF—FÆRFöW6âwBÖ¶R6Vç6Rf÷"66GFW"6–æ6RvRf÷&ÖBF†RFF2ö–ç@ —&WGW&ârs° —ÒÀ –Æ&VÃ¢gVæ7F–öâ†—FVÒÂFF’° —f"FF6WDÆ&VÂÒFFæFF6WG5¶—FVÒæFF6WD–æFW…ÒæÆ&VÂÇÂrs° —f"FFö–çBÒFFæFF6WG5¶—FVÒæFF6WD–æFW…ÒæFF¶—FVÒæ–æFW…Ó° —&WGW&âFF6WDÆ&VÂ²s¢‚r²—FVÒç„Æ&VÂ²rÂr²—FVÒç”Æ&VÂ²rÂr²FFö–çBç"²r’s° —Ð —Ð —Ð§Ò“° §f"6öçG&öÆÆW%ö'V&&ÆRÒ6÷&UöFF6WD6öçG&öÆÆW"æW‡FVæB‡° ’ò¢  ’¢&÷FV7FV@ ’¢ð –FFVÆVÖVçEG—S¢VÆVÖVçG2åö–çBÀ  ’ò¢  ’¢&—fFP ’¢ð •öFFVÆVÖVçD÷F–öç3¢° ’v&6¶w&÷VæD6öÆ÷"rÀ ’v&÷&FW$6öÆ÷"rÀ ’v&÷&FW%v–GF‚rÀ ’v†÷fW$&6¶w&÷VæD6öÆ÷"rÀ ’v†÷fW$&÷&FW$6öÆ÷"rÀ ’v†÷fW$&÷&FW%v–GF‚rÀ ’v†÷fW%&F—W2rÀ ’v†—E&F—W2rÀ ’wö–çE7G–ÆRrÀ ’w&÷FF–öâp •ÒÀ  ’ò¢  ’¢&÷FV7FV@ ’¢ð —WFFS¢gVæ7F–öâ‡&W6WB’° —f"ÖRÒF†—3° —f"ÖWFÒÖRævWDÖWF‚“° —f"ö–çG2ÒÖWFæFF°  ’òòWFFRö–çG0 –†VÇW'2CæV6‚‡ö–çG2ÂgVæ7F–öâ‡ö–çBÂ–æFW‚’° –ÖRçWFFTVÆVÖVçB‡ö–çBÂ–æFW‚Â&W6WB“° —Ò“° —ÒÀ  ’ò¢  ’¢&÷FV7FV@ ’¢ð —WFFTVÆVÖVçC¢gVæ7F–öâ‡ö–çBÂ–æFW‚Â&W6WB’° —f"ÖRÒF†—3° —f"ÖWFÒÖRævWDÖWF‚“° —f"7W7FöÒÒö–çBæ7W7FöÒÇÂ·Ó° —f"…66ÆRÒÖRævWE66ÆTf÷$–B†ÖWFç„†—4”B“° —f"•66ÆRÒÖRævWE66ÆTf÷$–B†ÖWFç”†—4”B“° —f"÷F–öç2ÒÖRå÷&W6öÇfTFFVÆVÖVçD÷F–öç2‡ö–çBÂ–æFW‚“° —f"FFÒÖRævWDFF6WB‚’æFF¶–æFW…Ó° —f"G4–æFW‚ÒÖRæ–æFWƒ°  —f"‚Ò&W6WBò…66ÆRævWE—†VÄf÷$FV6–ÖÂƒãR’¢…66ÆRævWE—†VÄf÷%fÇVR‡G—VöbFFÓÓÒvö&¦V7BròFF¢æâÂ–æFW‚ÂG4–æFW‚“° —f"’Ò&W6WBò•66ÆRævWD&6U—†VÂ‚’¢•66ÆRævWE—†VÄf÷%fÇVR†FFÂ–æFW‚ÂG4–æFW‚“°  —ö–çBå÷…66ÆRÒ…66ÆS° —ö–çBå÷•66ÆRÒ•66ÆS° —ö–çBåö÷F–öç2Ò÷F–öç3° —ö–çBåöFF6WD–æFW‚ÒG4–æFWƒ° —ö–çBåö–æFW‚Ò–æFWƒ° —ö–çBåöÖöFVÂÒ° –&6¶w&÷VæD6öÆ÷#¢÷F–öç2æ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢÷F–öç2æ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢÷F–öç2æ&÷&FW%v–GF‚À –†—E&F—W3¢÷F–öç2æ†—E&F—W2À —ö–çE7G–ÆS¢÷F–öç2çö–çE7G–ÆRÀ —&÷FF–öã¢÷F–öç2ç&÷FF–öâÀ —&F—W3¢&W6WBò¢÷F–öç2ç&F—W2À —6¶—¢7W7FöÒç6¶—ÇÂ—4æâ‡‚’ÇÂ—4æâ‡’’À —ƒ¢‚À —“¢’À —Ó°  —ö–çBç—f÷B‚“° —ÒÀ  ’ò¢  ’¢&÷FV7FV@ ’¢ð —6WD†÷fW%7G–ÆS¢gVæ7F–öâ‡ö–çB’° —f"ÖöFVÂÒö–çBåöÖöFVÃ° —f"÷F–öç2Òö–çBåö÷F–öç3° —f"vWD†÷fW$6öÆ÷"Ò†VÇW'2CævWD†÷fW$6öÆ÷#°  —ö–çBâG&Wf–÷W57G–ÆRÒ° –&6¶w&÷VæD6öÆ÷#¢ÖöFVÂæ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢ÖöFVÂæ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢ÖöFVÂæ&÷&FW%v–GF‚À —&F—W3¢ÖöFVÂç&F—W0 —Ó°  –ÖöFVÂæ&6¶w&÷VæD6öÆ÷"ÒfÇVT÷$FVfVÇBCB†÷F–öç2æ†÷fW$&6¶w&÷VæD6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&6¶w&÷VæD6öÆ÷"’“° –ÖöFVÂæ&÷&FW$6öÆ÷"ÒfÇVT÷$FVfVÇBCB†÷F–öç2æ†÷fW$&÷&FW$6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&÷&FW$6öÆ÷"’“° –ÖöFVÂæ&÷&FW%v–GF‚ÒfÇVT÷$FVfVÇBCB†÷F–öç2æ†÷fW$&÷&FW%v–GF‚Â÷F–öç2æ&÷&FW%v–GF‚“° –ÖöFVÂç&F—W2Ò÷F–öç2ç&F—W2²÷F–öç2æ†÷fW%&F—W3° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •÷&W6öÇfTFFVÆVÖVçD÷F–öç3¢gVæ7F–öâ‡ö–çBÂ–æFW‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"FF6WBÒÖRævWDFF6WB‚“° —f"7W7FöÒÒö–çBæ7W7FöÒÇÂ·Ó° —f"FFÒFF6WBæFF¶–æFW…ÒÇÂ·Ó° —f"fÇVW2Ò6÷&UöFF6WD6öçG&öÆÆW"ç&÷F÷G—Rå÷&W6öÇfTFFVÆVÖVçD÷F–öç2æÇ’†ÖRÂ&wVÖVçG2“°  ’òò67&—F&ÆR÷F–öç0 —f"6öçFW‡BÒ° –6†'C¢6†'BÀ –FF–æFWƒ¢–æFW‚À –FF6WC¢FF6WBÀ –FF6WD–æFWƒ¢ÖRæ–æFW€ —Ó°  ’òò–â66RfÇVW2vW&R66†VB†æBF‡W2g&÷¦Vâ’ÂvRæVVBFò6ÆöæRF†RfÇVW0 ––b†ÖRåö66†VDFF÷G2ÓÓÒfÇVW2’° —fÇVW2Ò†VÇW'2CæW‡FVæB‡·ÒÂfÇVW2“° —Ð  ’òò7W7FöÒ&F—W2&W6öÇWF–öà —fÇVW2ç&F—W2Ò&W6öÇfRC…° –7W7FöÒç&F—W2À –FFç"À –ÖRåö6öæf–rç&F—W2À –6†'Bæ÷F–öç2æVÆVÖVçG2çö–çBç&F—W0 •ÒÂ6öçFW‡BÂ–æFW‚“°  —&WGW&âfÇVW3° —Ð§Ò“° §f"fÇVT÷$FVfVÇBCRÒ†VÇW'2CçfÇVT÷$FVfVÇC° §f"’CÒÖF‚å“°§f"DõT$ÄUõ’CÒ’C¢#°§f"„Äeõ’CÒ’Cò#° ¦6÷&UöFVfVÇG2å÷6WB‚vF÷Vv†çWBrÂ° –æ–ÖF–öã¢° ’òò&ööÆVâÒv†WF†W"vRæ–ÖFRF†R&÷FF–öâöbF†RF÷Vv†çW@ –æ–ÖFU&÷FFS¢G'VRÀ ’òò&ööÆVâÒv†WF†W"vRæ–ÖFR66Æ–ærF†RF÷Vv†çWBg&öÒF†R6VçG&P –æ–ÖFU66ÆS¢fÇ6P —ÒÀ –†÷fW#¢° –ÖöFS¢w6–ævÆRp —ÒÀ –ÆVvVæD6ÆÆ&6³¢gVæ7F–öâ†6†'B’° —f"Æ—7BÒFö7VÖVçBæ7&VFTVÆVÖVçB‚wVÂr“° —f"FFÒ6†'BæFF° —f"FF6WG2ÒFFæFF6WG3° —f"Æ&VÇ2ÒFFæÆ&VÇ3° —f"’Â–ÆVâÂÆ—7D—FVÒÂÆ—7D—FVÕ7ã°  –Æ—7Bç6WDGG&–'WFR‚v6Æ72rÂ6†'Bæ–B²rÖÆVvVæBr“° ––b†FF6WG2æÆVæwF‚’° –f÷"†’ÒÂ–ÆVâÒFF6WG5³ÒæFFæÆVæwFƒ²’Â–ÆVã²²¶’’° –Æ—7D—FVÒÒÆ—7BæVæD6†–ÆB†Fö7VÖVçBæ7&VFTVÆVÖVçB‚vÆ’r’“° –Æ—7D—FVÕ7âÒÆ—7D—FVÒæVæD6†–ÆB†Fö7VÖVçBæ7&VFTVÆVÖVçB‚w7âr’“° –Æ—7D—FVÕ7âç7G–ÆRæ&6¶w&÷VæD6öÆ÷"ÒFF6WG5³Òæ&6¶w&÷VæD6öÆ÷%¶•Ó° ––b†Æ&VÇ5¶•Ò’° –Æ—7D—FVÒæVæD6†–ÆB†Fö7VÖVçBæ7&VFUFW‡DæöFR†Æ&VÇ5¶•Ò’“° —Ð —Ð —Ð  —&WGW&âÆ—7Bæ÷WFW$…DÔÃ° —ÒÀ –ÆVvVæC¢° –Æ&VÇ3¢° –vVæW&FTÆ&VÇ3¢gVæ7F–öâ†6†'B’° —f"FFÒ6†'BæFF° ––b†FFæÆ&VÇ2æÆVæwF‚bbFFæFF6WG2æÆVæwF‚’° —&WGW&âFFæÆ&VÇ2æÖ†gVæ7F–öâ†Æ&VÂÂ’’° —f"ÖWFÒ6†'BævWDFF6WDÖWFƒ“° —f"7G–ÆRÒÖWFæ6öçG&öÆÆW"ævWE7G–ÆR†’“°  —&WGW&â° —FW‡C¢Æ&VÂÀ –f–ÆÅ7G–ÆS¢7G–ÆRæ&6¶w&÷VæD6öÆ÷"À —7G&ö¶U7G–ÆS¢7G–ÆRæ&÷&FW$6öÆ÷"À –Æ–æUv–GFƒ¢7G–ÆRæ&÷&FW%v–GF‚À –†–FFVã¢—4æâ†FFæFF6WG5³ÒæFF¶•Ò’ÇÂÖWFæFF¶•Òæ†–FFVâÀ  ’òòW‡G&FFW6VBf÷"FövvÆ–ærF†R6÷'&V7B—FVÐ ––æFWƒ¢ —Ó° —Ò“° —Ð —&WGW&âµÓ° —Ð —ÒÀ  –öä6Æ–6³¢gVæ7F–öâ†RÂÆVvVæD—FVÒ’° —f"–æFW‚ÒÆVvVæD—FVÒæ–æFWƒ° —f"6†'BÒF†—2æ6†'C° —f"’Â–ÆVâÂÖWF°  –f÷"†’ÒÂ–ÆVâÒ†6†'BæFFæFF6WG2ÇÂµÒ’æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖWFÒ6†'BævWDFF6WDÖWF†’“° ’òòFövvÆRf—6–&–Æ—G’öb–æFW‚–bW†—7G0 ––b†ÖWFæFF¶–æFW…Ò’° –ÖWFæFF¶–æFW…Òæ†–FFVâÒÖWFæFF¶–æFW…Òæ†–FFVã° —Ð —Ð  –6†'BçWFFR‚“° —Ð —ÒÀ  ’òòF†RW&6VçFvRöbF†R6†'BF†BvR7WB÷WBöbF†RÖ–FFÆRà –7WF÷WEW&6VçFvS¢SÀ  ’òòF†R&÷FF–öâöbF†R6†'BÂv†W&RF†Rf—'7BFF&2&Vv–ç2à —&÷FF–öã¢Ô„Äeõ’CÀ  ’òòF†RF÷FÂ6—&7VÖfW&Væ6RöbF†R6†'Bà –6—&7VÖfW&Væ6S¢DõT$ÄUõ’CÀ  ’òòæVVBFò÷fW'&–FRF†W6RFòv—fRæ–6RFVfVÇ@ —FööÇF—3¢° –6ÆÆ&6·3¢° —F—FÆS¢gVæ7F–öâ‚’° —&WGW&ârs° —ÒÀ –Æ&VÃ¢gVæ7F–öâ‡FööÇF——FVÒÂFF’° —f"FFÆ&VÂÒFFæÆ&VÇ5·FööÇF——FVÒæ–æFW…Ó° —f"fÇVRÒs¢r²FFæFF6WG5·FööÇF——FVÒæFF6WD–æFW…ÒæFF·FööÇF——FVÒæ–æFW…Ó°  ––b††VÇW'2Cæ—4'&’†FFÆ&VÂ’’° ’òò6†÷rfÇVRöâf—'7BÆ–æRöb×VÇF–Æ–æRÆ&VÀ ’òòæVVBFò6ÆöæR&V6W6RvR&R6†æv–ærF†RfÇVP –FFÆ&VÂÒFFÆ&VÂç6Æ–6R‚“° –FFÆ&VÅ³Ò³ÒfÇVS° —ÒVÇ6R° –FFÆ&VÂ³ÒfÇVS° —Ð  —&WGW&âFFÆ&VÃ° —Ð —Ð —Ð§Ò“° §f"6öçG&öÆÆW%öF÷Vv†çWBÒ6÷&UöFF6WD6öçG&öÆÆW"æW‡FVæB‡°  –FFVÆVÖVçEG—S¢VÆVÖVçG2ä&2À  –Æ–æµ66ÆW3¢†VÇW'2Cææö÷À  ’ò¢  ’¢&—fFP ’¢ð •öFFVÆVÖVçD÷F–öç3¢° ’v&6¶w&÷VæD6öÆ÷"rÀ ’v&÷&FW$6öÆ÷"rÀ ’v&÷&FW%v–GF‚rÀ ’v&÷&FW$Æ–vârÀ ’v†÷fW$&6¶w&÷VæD6öÆ÷"rÀ ’v†÷fW$&÷&FW$6öÆ÷"rÀ ’v†÷fW$&÷&FW%v–GF‚rÀ •ÒÀ  ’òòvWB–æFW‚öbF†RFF6WB–â&VÆF–öâFòF†Rf—6–&ÆRFF6WG2âF†—2ÆÆ÷w2FWFW&Ö–æ–ærF†R–ææW"æB÷WFW"&F—W26÷'&V7FÇ –vWE&–æt–æFWƒ¢gVæ7F–öâ†FF6WD–æFW‚’° —f"&–æt–æFW‚Ò°  –f÷"‡f"¢Ò²¢ÂFF6WD–æFWƒ²²¶¢’° ––b‡F†—2æ6†'Bæ—4FF6WEf—6–&ÆR†¢’’° ’²·&–æt–æFWƒ° —Ð —Ð  —&WGW&â&–æt–æFWƒ° —ÒÀ  —WFFS¢gVæ7F–öâ‡&W6WB’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"6†'D&VÒ6†'Bæ6†'D&V° —f"÷G2Ò6†'Bæ÷F–öç3° —f"&F–õ‚Ò° —f"&F–õ’Ò° —f"öfg6WE‚Ò° —f"öfg6WE’Ò° —f"ÖWFÒÖRævWDÖWF‚“° —f"&72ÒÖWFæFF° —f"7WF÷WBÒ÷G2æ7WF÷WEW&6VçFvRòÇÂ° —f"6—&7VÖfW&Væ6RÒ÷G2æ6—&7VÖfW&Væ6S° —f"6†'EvV–v‡BÒÖRåövWE&–æuvV–v‡B†ÖRæ–æFW‚“° —f"Ö…v–GF‚ÂÖ„†V–v‡BÂ’Â–ÆVã°  ’òò–bF†R6†'Bw26—&7VÖfW&Væ6R—6âwBgVÆÂ6—&6ÆRÂ6Æ7VÆFR6—¦R2&F–òöbF†Rv–GF‚ö†V–v‡BöbF†R&0 ––b†6—&7VÖfW&Væ6RÂDõT$ÄUõ’C’° —f"7F'DævÆRÒ÷G2ç&÷FF–öâRDõT$ÄUõ’C° —7F'DævÆR³Ò7F'DævÆRãÒ’CòÔDõT$ÄUõ’C¢7F'DævÆRÂÕ’CòDõT$ÄUõ’C¢° —f"VæDævÆRÒ7F'DævÆR²6—&7VÖfW&Væ6S° —f"7F'E‚ÒÖF‚æ6÷2‡7F'DævÆR“° —f"7F'E’ÒÖF‚ç6–â‡7F'DævÆR“° —f"VæE‚ÒÖF‚æ6÷2†VæDævÆR“° —f"VæE’ÒÖF‚ç6–â†VæDævÆR“° —f"6öçF–ç3Ò‡7F'DævÆRÃÒbbVæDævÆRãÒ’ÇÂVæDævÆRãÒDõT$ÄUõ’C° —f"6öçF–ç3“Ò‡7F'DævÆRÃÒ„Äeõ’CbbVæDævÆRãÒ„Äeõ’C’ÇÂVæDævÆRãÒDõT$ÄUõ’C²„Äeõ’C° —f"6öçF–ç3ƒÒ7F'DævÆRÓÓÒÕ’CÇÂVæDævÆRãÒ’C° —f"6öçF–ç3#sÒ‡7F'DævÆRÃÒÔ„Äeõ’CbbVæDævÆRãÒÔ„Äeõ’C’ÇÂVæDævÆRãÒ’C²„Äeõ’C° —f"Ö–å‚Ò6öçF–ç3ƒòÓ¢ÖF‚æÖ–â‡7F'E‚Â7F'E‚¢7WF÷WBÂVæE‚ÂVæE‚¢7WF÷WB“° —f"Ö–å’Ò6öçF–ç3#sòÓ¢ÖF‚æÖ–â‡7F'E’Â7F'E’¢7WF÷WBÂVæE’ÂVæE’¢7WF÷WB“° —f"Ö…‚Ò6öçF–ç3ò¢ÖF‚æÖ‚‡7F'E‚Â7F'E‚¢7WF÷WBÂVæE‚ÂVæE‚¢7WF÷WB“° —f"Ö…’Ò6öçF–ç3“ò¢ÖF‚æÖ‚‡7F'E’Â7F'E’¢7WF÷WBÂVæE’ÂVæE’¢7WF÷WB“° —&F–õ‚Ò†Ö…‚ÒÖ–å‚’ò#° —&F–õ’Ò†Ö…’ÒÖ–å’’ò#° –öfg6WE‚ÒÒ†Ö…‚²Ö–å‚’ò#° –öfg6WE’ÒÒ†Ö…’²Ö–å’’ò#° —Ð  –f÷"†’ÒÂ–ÆVâÒ&72æÆVæwFƒ²’Â–ÆVã²²¶’’° –&75¶•Òåö÷F–öç2ÒÖRå÷&W6öÇfTFFVÆVÖVçD÷F–öç2†&75¶•ÒÂ’“° —Ð  –6†'Bæ&÷&FW%v–GF‚ÒÖRævWDÖ„&÷&FW%v–GF‚‚“° –Ö…v–GF‚Ò†6†'D&Vç&–v‡BÒ6†'D&VæÆVgBÒ6†'Bæ&÷&FW%v–GF‚’ò&F–õƒ° –Ö„†V–v‡BÒ†6†'D&Væ&÷GFöÒÒ6†'D&VçF÷Ò6†'Bæ&÷&FW%v–GF‚’ò&F–õ“° –6†'Bæ÷WFW%&F—W2ÒÖF‚æÖ‚„ÖF‚æÖ–â†Ö…v–GF‚ÂÖ„†V–v‡B’ò"Â“° –6†'Bæ–ææW%&F—W2ÒÖF‚æÖ‚†6†'Bæ÷WFW%&F—W2¢7WF÷WBÂ“° –6†'Bç&F—W4ÆVæwF‚Ò†6†'Bæ÷WFW%&F—W2Ò6†'Bæ–ææW%&F—W2’ò†ÖRåövWEf—6–&ÆTFF6WEvV–v‡EF÷FÂ‚’ÇÂ“° –6†'Bæöfg6WE‚Òöfg6WE‚¢6†'Bæ÷WFW%&F—W3° –6†'Bæöfg6WE’Òöfg6WE’¢6†'Bæ÷WFW%&F—W3°  –ÖWFçF÷FÂÒÖRæ6Æ7VÆFUF÷FÂ‚“°  –ÖRæ÷WFW%&F—W2Ò6†'Bæ÷WFW%&F—W2Ò6†'Bç&F—W4ÆVæwF‚¢ÖRåövWE&–æuvV–v‡Döfg6WB†ÖRæ–æFW‚“° –ÖRæ–ææW%&F—W2ÒÖF‚æÖ‚†ÖRæ÷WFW%&F—W2Ò6†'Bç&F—W4ÆVæwF‚¢6†'EvV–v‡BÂ“°  –f÷"†’ÒÂ–ÆVâÒ&72æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖRçWFFTVÆVÖVçB†&75¶•ÒÂ’Â&W6WB“° —Ð —ÒÀ  —WFFTVÆVÖVçC¢gVæ7F–öâ†&2Â–æFW‚Â&W6WB’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"6†'D&VÒ6†'Bæ6†'D&V° —f"÷G2Ò6†'Bæ÷F–öç3° —f"æ–ÖF–öä÷G2Ò÷G2ææ–ÖF–öã° —f"6VçFW%‚Ò†6†'D&VæÆVgB²6†'D&Vç&–v‡B’ò#° —f"6VçFW%’Ò†6†'D&VçF÷²6†'D&Væ&÷GFöÒ’ò#° —f"7F'DævÆRÒ÷G2ç&÷FF–öã²òòæöâ&W6WB66R†æFÆVBÆFW  —f"VæDævÆRÒ÷G2ç&÷FF–öã²òòæöâ&W6WB66R†æFÆVBÆFW  —f"FF6WBÒÖRævWDFF6WB‚“° —f"6—&7VÖfW&Væ6RÒ&W6WBbbæ–ÖF–öä÷G2ææ–ÖFU&÷FFRò¢&2æ†–FFVâò¢ÖRæ6Æ7VÆFT6—&7VÖfW&Væ6R†FF6WBæFF¶–æFW…Ò’¢†÷G2æ6—&7VÖfW&Væ6RòDõT$ÄUõ’C“° —f"–ææW%&F—W2Ò&W6WBbbæ–ÖF–öä÷G2ææ–ÖFU66ÆRò¢ÖRæ–ææW%&F—W3° —f"÷WFW%&F—W2Ò&W6WBbbæ–ÖF–öä÷G2ææ–ÖFU66ÆRò¢ÖRæ÷WFW%&F—W3° —f"÷F–öç2Ò&2åö÷F–öç2ÇÂ·Ó°  –†VÇW'2CæW‡FVæB†&2Â° ’òòWF–Æ—G •öFF6WD–æFWƒ¢ÖRæ–æFW‚À •ö–æFWƒ¢–æFW‚À  ’òòFW6—&VBf–Wr&÷W'F–W0 •öÖöFVÃ¢° –&6¶w&÷VæD6öÆ÷#¢÷F–öç2æ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢÷F–öç2æ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢÷F–öç2æ&÷&FW%v–GF‚À –&÷&FW$Æ–vã¢÷F–öç2æ&÷&FW$Æ–vâÀ —ƒ¢6VçFW%‚²6†'Bæöfg6WE‚À —“¢6VçFW%’²6†'Bæöfg6WE’À —7F'DævÆS¢7F'DævÆRÀ –VæDævÆS¢VæDævÆRÀ –6—&7VÖfW&Væ6S¢6—&7VÖfW&Væ6RÀ –÷WFW%&F—W3¢÷WFW%&F—W2À ––ææW%&F—W3¢–ææW%&F—W2À –Æ&VÃ¢†VÇW'2CçfÇVTD–æFW„÷$FVfVÇB†FF6WBæÆ&VÂÂ–æFW‚Â6†'BæFFæÆ&VÇ5¶–æFW…Ò —Ð —Ò“°  —f"ÖöFVÂÒ&2åöÖöFVÃ°  ’òò6WB6÷'&V7BævÆW2–bæ÷B&W6WGF–æp ––b‚&W6WBÇÂæ–ÖF–öä÷G2ææ–ÖFU&÷FFR’° ––b†–æFW‚ÓÓÒ’° –ÖöFVÂç7F'DævÆRÒ÷G2ç&÷FF–öã° —ÒVÇ6R° –ÖöFVÂç7F'DævÆRÒÖRævWDÖWF‚’æFF¶–æFW‚ÒÒåöÖöFVÂæVæDævÆS° —Ð  –ÖöFVÂæVæDævÆRÒÖöFVÂç7F'DævÆR²ÖöFVÂæ6—&7VÖfW&Væ6S° —Ð  –&2ç—f÷B‚“° —ÒÀ  –6Æ7VÆFUF÷FÃ¢gVæ7F–öâ‚’° —f"FF6WBÒF†—2ævWDFF6WB‚“° —f"ÖWFÒF†—2ævWDÖWF‚“° —f"F÷FÂÒ° —f"fÇVS°  –†VÇW'2CæV6‚†ÖWFæFFÂgVæ7F–öâ†VÆVÖVçBÂ–æFW‚’° —fÇVRÒFF6WBæFF¶–æFW…Ó° ––b‚—4æâ‡fÇVR’bbVÆVÖVçBæ†–FFVâ’° —F÷FÂ³ÒÖF‚æ'2‡fÇVR“° —Ð —Ò“°  ’ò¢–b‡F÷FÂÓÓÒ’° —F÷FÂÒæã° —Ò¢ð  —&WGW&âF÷FÃ° —ÒÀ  –6Æ7VÆFT6—&7VÖfW&Væ6S¢gVæ7F–öâ‡fÇVR’° —f"F÷FÂÒF†—2ævWDÖWF‚’çF÷FÃ° ––b‡F÷FÂâbb—4æâ‡fÇVR’’° —&WGW&âDõT$ÄUõ’C¢„ÖF‚æ'2‡fÇVR’òF÷FÂ“° —Ð —&WGW&â° —ÒÀ  ’òòvWG2F†RÖ‚&÷&FW"÷"†÷fW"v–GF‚Fò&÷W&Ç’66ÆR–R6†'G0 –vWDÖ„&÷&FW%v–GFƒ¢gVæ7F–öâ†&72’° —f"ÖRÒF†—3° —f"Ö‚Ò° —f"6†'BÒÖRæ6†'C° —f"’Â–ÆVâÂÖWFÂ&2Â6öçG&öÆÆW"Â÷F–öç2Â&÷&FW%v–GF‚Â†÷fW%v–GFƒ°  ––b‚&72’° ’òòf–æBF†R÷WFÖ÷7Bf—6–&ÆRFF6W@ –f÷"†’ÒÂ–ÆVâÒ6†'BæFFæFF6WG2æÆVæwFƒ²’Â–ÆVã²²¶’’° ––b†6†'Bæ—4FF6WEf—6–&ÆR†’’’° –ÖWFÒ6†'BævWDFF6WDÖWF†’“° –&72ÒÖWFæFF° ––b†’ÓÒÖRæ–æFW‚’° –6öçG&öÆÆW"ÒÖWFæ6öçG&öÆÆW#° —Ð –'&V³° —Ð —Ð —Ð  ––b‚&72’° —&WGW&â° —Ð  –f÷"†’ÒÂ–ÆVâÒ&72æÆVæwFƒ²’Â–ÆVã²²¶’’° –&2Ò&75¶•Ó° ––b†6öçG&öÆÆW"’° –6öçG&öÆÆW"åö6öæf–wW&R‚“° –÷F–öç2Ò6öçG&öÆÆW"å÷&W6öÇfTFFVÆVÖVçD÷F–öç2†&2Â’“° —ÒVÇ6R° –÷F–öç2Ò&2åö÷F–öç3° —Ð ––b†÷F–öç2æ&÷&FW$Æ–vâÓÒv–ææW"r’° –&÷&FW%v–GF‚Ò÷F–öç2æ&÷&FW%v–GFƒ° –†÷fW%v–GF‚Ò÷F–öç2æ†÷fW$&÷&FW%v–GFƒ°  –Ö‚Ò&÷&FW%v–GF‚âÖ‚ò&÷&FW%v–GF‚¢Öƒ° –Ö‚Ò†÷fW%v–GF‚âÖ‚ò†÷fW%v–GF‚¢Öƒ° —Ð —Ð —&WGW&âÖƒ° —ÒÀ  ’ò¢  ’¢&÷FV7FV@ ’¢ð —6WD†÷fW%7G–ÆS¢gVæ7F–öâ†&2’° —f"ÖöFVÂÒ&2åöÖöFVÃ° —f"÷F–öç2Ò&2åö÷F–öç3° —f"vWD†÷fW$6öÆ÷"Ò†VÇW'2CævWD†÷fW$6öÆ÷#°  –&2âG&Wf–÷W57G–ÆRÒ° –&6¶w&÷VæD6öÆ÷#¢ÖöFVÂæ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢ÖöFVÂæ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢ÖöFVÂæ&÷&FW%v–GF‚À —Ó°  –ÖöFVÂæ&6¶w&÷VæD6öÆ÷"ÒfÇVT÷$FVfVÇBCR†÷F–öç2æ†÷fW$&6¶w&÷VæD6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&6¶w&÷VæD6öÆ÷"’“° –ÖöFVÂæ&÷&FW$6öÆ÷"ÒfÇVT÷$FVfVÇBCR†÷F–öç2æ†÷fW$&÷&FW$6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&÷&FW$6öÆ÷"’“° –ÖöFVÂæ&÷&FW%v–GF‚ÒfÇVT÷$FVfVÇBCR†÷F–öç2æ†÷fW$&÷&FW%v–GF‚Â÷F–öç2æ&÷&FW%v–GF‚“° —ÒÀ  ’ò¢  ’¢vWB&F—W2ÆVæwF‚öfg6WBöbF†RFF6WB–â&VÆF–öâFòF†Rf—6–&ÆRFF6WG2vV–v‡G2âF†—2ÆÆ÷w2FWFW&Ö–æ–ærF†R–ææW"æB÷WFW"&F—W26÷'&V7FÇ ’¢&—fFP ’¢ð •övWE&–æuvV–v‡Döfg6WC¢gVæ7F–öâ†FF6WD–æFW‚’° —f"&–æuvV–v‡Döfg6WBÒ°  –f÷"‡f"’Ò²’ÂFF6WD–æFWƒ²²¶’’° ––b‡F†—2æ6†'Bæ—4FF6WEf—6–&ÆR†’’’° —&–æuvV–v‡Döfg6WB³ÒF†—2åövWE&–æuvV–v‡B†’“° —Ð —Ð  —&WGW&â&–æuvV–v‡Döfg6WC° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWE&–æuvV–v‡C¢gVæ7F–öâ†FF6WD–æFW‚’° —&WGW&âÖF‚æÖ‚‡fÇVT÷$FVfVÇBCR‡F†—2æ6†'BæFFæFF6WG5¶FF6WD–æFW…ÒçvV–v‡BÂ’Â“° —ÒÀ  ’ò¢  ’¢&WGW&ç2F†R7VÒöbÆÂf—6–&–ÆRFF6WBvV–v‡G2âF†—2fÇVR6â&Rà ’¢&—fFP ’¢ð •övWEf—6–&ÆTFF6WEvV–v‡EF÷FÃ¢gVæ7F–öâ‚’° —&WGW&âF†—2åövWE&–æuvV–v‡Döfg6WB‡F†—2æ6†'BæFFæFF6WG2æÆVæwF‚“° —Ð§Ò“° ¦6÷&UöFVfVÇG2å÷6WB‚v†÷&—¦öçFÄ&"rÂ° –†÷fW#¢° –ÖöFS¢v–æFW‚rÀ –†—3¢w’p —ÒÀ  —66ÆW3¢° —„†W3¢·° —G—S¢vÆ–æV"rÀ —÷6—F–öã¢v&÷GFöÒp —ÕÒÀ  —”†W3¢·° —G—S¢v6FVv÷'’rÀ —÷6—F–öã¢vÆVgBrÀ –öfg6WC¢G'VRÀ –w&–DÆ–æW3¢° –öfg6WDw&–DÆ–æW3¢G'VP —Ð —ÕÐ —ÒÀ  –VÆVÖVçG3¢° —&V7FævÆS¢° –&÷&FW%6¶—VC¢vÆVgBp —Ð —ÒÀ  —FööÇF—3¢° –ÖöFS¢v–æFW‚rÀ –†—3¢w’p —Ð§Ò“° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –FF6WG3¢° –†÷&—¦öçFÄ&#¢° –6FVv÷'•W&6VçFvS¢ã‚À –&%W&6VçFvS¢ã —Ð —Ð§Ò“° §f"6öçG&öÆÆW%ö†÷&—¦öçFÄ&"Ò6öçG&öÆÆW%ö&"æW‡FVæB‡° ’ò¢  ’¢&—fFP ’¢ð •övWEfÇVU66ÆT–C¢gVæ7F–öâ‚’° —&WGW&âF†—2ævWDÖWF‚’ç„†—4”C° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWD–æFW…66ÆT–C¢gVæ7F–öâ‚’° —&WGW&âF†—2ævWDÖWF‚’ç”†—4”C° —Ð§Ò“° §f"fÇVT÷$FVfVÇBCbÒ†VÇW'2CçfÇVT÷$FVfVÇC°§f"&W6öÇfRC"Ò†VÇW'2Cæ÷F–öç2ç&W6öÇfS°§f"—5ö–çD–ä&VÒ†VÇW'2Cæ6çf2åö—5ö–çD–ä&V° ¦6÷&UöFVfVÇG2å÷6WB‚vÆ–æRrÂ° —6†÷tÆ–æW3¢G'VRÀ —7äv3¢fÇ6RÀ  –†÷fW#¢° –ÖöFS¢vÆ&VÂp —ÒÀ  —66ÆW3¢° —„†W3¢·° —G—S¢v6FVv÷'’rÀ ––C¢w‚Ö†—2Óp —ÕÒÀ —”†W3¢·° —G—S¢vÆ–æV"rÀ ––C¢w’Ö†—2Óp —ÕÐ —Ð§Ò“° ¦gVæ7F–öâ66ÆT6Æ—‡66ÆRÂ†Æd&÷&FW%v–GF‚’° —f"F–6´÷G2Ò66ÆRbb66ÆRæ÷F–öç2çF–6·2ÇÂ·Ó° —f"&WfW'6RÒF–6´÷G2ç&WfW'6S° —f"Ö–âÒF–6´÷G2æÖ–âÓÓÒVæFVf–æVBò†Æd&÷&FW%v–GF‚¢° —f"Ö‚ÒF–6´÷G2æÖ‚ÓÓÒVæFVf–æVBò†Æd&÷&FW%v–GF‚¢° —&WGW&â° —7F'C¢&WfW'6RòÖ‚¢Ö–âÀ –VæC¢&WfW'6RòÖ–â¢Ö€ —Ó°§Ð ¦gVæ7F–öâFVfVÇD6Æ—‡…66ÆRÂ•66ÆRÂ&÷&FW%v–GF‚’° —f"†Æd&÷&FW%v–GF‚Ò&÷&FW%v–GF‚ò#° —f"‚Ò66ÆT6Æ—‡…66ÆRÂ†Æd&÷&FW%v–GF‚“° —f"’Ò66ÆT6Æ—‡•66ÆRÂ†Æd&÷&FW%v–GF‚“°  —&WGW&â° —F÷¢’æVæBÀ —&–v‡C¢‚æVæBÀ –&÷GFöÓ¢’ç7F'BÀ –ÆVgC¢‚ç7F'@ —Ó°§Ð ¦gVæ7F–öâFô6Æ—‡fÇVR’° —f"BÂ"Â"ÂÃ°  ––b††VÇW'2Cæ—4ö&¦V7B‡fÇVR’’° —BÒfÇVRçF÷° —"ÒfÇVRç&–v‡C° –"ÒfÇVRæ&÷GFöÓ° –ÂÒfÇVRæÆVgC° —ÒVÇ6R° —BÒ"Ò"ÒÂÒfÇVS° —Ð  —&WGW&â° —F÷¢BÀ —&–v‡C¢"À –&÷GFöÓ¢"À –ÆVgC¢À —Ó°§Ð  §f"6öçG&öÆÆW%öÆ–æRÒ6÷&UöFF6WD6öçG&öÆÆW"æW‡FVæB‡°  –FF6WDVÆVÖVçEG—S¢VÆVÖVçG2äÆ–æRÀ  –FFVÆVÖVçEG—S¢VÆVÖVçG2åö–çBÀ  ’ò¢  ’¢&—fFP ’¢ð •öFF6WDVÆVÖVçD÷F–öç3¢° ’v&6¶w&÷VæD6öÆ÷"rÀ ’v&÷&FW$67G–ÆRrÀ ’v&÷&FW$6öÆ÷"rÀ ’v&÷&FW$F6‚rÀ ’v&÷&FW$F6„öfg6WBrÀ ’v&÷&FW$¦ö–å7G–ÆRrÀ ’v&÷&FW%v–GF‚rÀ ’v7V&–4–çFW'öÆF–öäÖöFRrÀ ’vf–ÆÂp •ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öFFVÆVÖVçD÷F–öç3¢° –&6¶w&÷VæD6öÆ÷#¢wö–çD&6¶w&÷VæD6öÆ÷"rÀ –&÷&FW$6öÆ÷#¢wö–çD&÷&FW$6öÆ÷"rÀ –&÷&FW%v–GFƒ¢wö–çD&÷&FW%v–GF‚rÀ –†—E&F—W3¢wö–çD†—E&F—W2rÀ –†÷fW$&6¶w&÷VæD6öÆ÷#¢wö–çD†÷fW$&6¶w&÷VæD6öÆ÷"rÀ –†÷fW$&÷&FW$6öÆ÷#¢wö–çD†÷fW$&÷&FW$6öÆ÷"rÀ –†÷fW$&÷&FW%v–GFƒ¢wö–çD†÷fW$&÷&FW%v–GF‚rÀ –†÷fW%&F—W3¢wö–çD†÷fW%&F—W2rÀ —ö–çE7G–ÆS¢wö–çE7G–ÆRrÀ —&F—W3¢wö–çE&F—W2rÀ —&÷FF–öã¢wö–çE&÷FF–öâp —ÒÀ  —WFFS¢gVæ7F–öâ‡&W6WB’° —f"ÖRÒF†—3° —f"ÖWFÒÖRævWDÖWF‚“° —f"Æ–æRÒÖWFæFF6WC° —f"ö–çG2ÒÖWFæFFÇÂµÓ° —f"÷F–öç2ÒÖRæ6†'Bæ÷F–öç3° —f"6öæf–rÒÖRåö6öæf–s° —f"6†÷tÆ–æRÒÖRå÷6†÷tÆ–æRÒfÇVT÷$FVfVÇBCb†6öæf–rç6†÷tÆ–æRÂ÷F–öç2ç6†÷tÆ–æW2“° —f"’Â–ÆVã°  –ÖRå÷…66ÆRÒÖRævWE66ÆTf÷$–B†ÖWFç„†—4”B“° –ÖRå÷•66ÆRÒÖRævWE66ÆTf÷$–B†ÖWFç”†—4”B“°  ’òòWFFRÆ–æP ––b‡6†÷tÆ–æR’° ’òò6ö×F–&–Æ—G“¢–bF†R&÷W'F–W2&RFVf–æVBv—F‚öæÇ’F†RöÆBæÖRÂW6RF†÷6RfÇVW0 ––b†6öæf–rçFVç6–öâÓÒVæFVf–æVBbb6öæf–ræÆ–æUFVç6–öâÓÓÒVæFVf–æVB’° –6öæf–ræÆ–æUFVç6–öâÒ6öæf–rçFVç6–öã° —Ð  ’òòWF–Æ—G –Æ–æRå÷66ÆRÒÖRå÷•66ÆS° –Æ–æRåöFF6WD–æFW‚ÒÖRæ–æFWƒ° ’òòFF –Æ–æRåö6†–ÆG&VâÒö–çG3° ’òòÖöFVÀ –Æ–æRåöÖöFVÂÒÖRå÷&W6öÇfTFF6WDVÆVÖVçD÷F–öç2†Æ–æR“°  –Æ–æRç—f÷B‚“° —Ð  ’òòWFFRö–çG0 –f÷"†’ÒÂ–ÆVâÒö–çG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖRçWFFTVÆVÖVçB‡ö–çG5¶•ÒÂ’Â&W6WB“° —Ð  ––b‡6†÷tÆ–æRbbÆ–æRåöÖöFVÂçFVç6–öâÓÒ’° –ÖRçWFFT&W¦–W$6öçG&öÅö–çG2‚“° —Ð  ’òòæ÷r—f÷BF†Rö–çBf÷"æ–ÖF–öà –f÷"†’ÒÂ–ÆVâÒö–çG2æÆVæwFƒ²’Â–ÆVã²²¶’’° —ö–çG5¶•Òç—f÷B‚“° —Ð —ÒÀ  —WFFTVÆVÖVçC¢gVæ7F–öâ‡ö–çBÂ–æFW‚Â&W6WB’° —f"ÖRÒF†—3° —f"ÖWFÒÖRævWDÖWF‚“° —f"7W7FöÒÒö–çBæ7W7FöÒÇÂ·Ó° —f"FF6WBÒÖRævWDFF6WB‚“° —f"FF6WD–æFW‚ÒÖRæ–æFWƒ° —f"fÇVRÒFF6WBæFF¶–æFW…Ó° —f"…66ÆRÒÖRå÷…66ÆS° —f"•66ÆRÒÖRå÷•66ÆS° —f"Æ–æTÖöFVÂÒÖWFæFF6WBåöÖöFVÃ° —f"‚Â“°  —f"÷F–öç2ÒÖRå÷&W6öÇfTFFVÆVÖVçD÷F–öç2‡ö–çBÂ–æFW‚“°  —‚Ò…66ÆRævWE—†VÄf÷%fÇVR‡G—VöbfÇVRÓÓÒvö&¦V7BròfÇVR¢æâÂ–æFW‚ÂFF6WD–æFW‚“° —’Ò&W6WBò•66ÆRævWD&6U—†VÂ‚’¢ÖRæ6Æ7VÆFUö–çE’‡fÇVRÂ–æFW‚ÂFF6WD–æFW‚“°  ’òòWF–Æ—G —ö–çBå÷…66ÆRÒ…66ÆS° —ö–çBå÷•66ÆRÒ•66ÆS° —ö–çBåö÷F–öç2Ò÷F–öç3° —ö–çBåöFF6WD–æFW‚ÒFF6WD–æFWƒ° —ö–çBåö–æFW‚Ò–æFWƒ°  ’òòFW6—&VBf–Wr&÷W'F–W0 —ö–çBåöÖöFVÂÒ° —ƒ¢‚À —“¢’À —6¶—¢7W7FöÒç6¶—ÇÂ—4æâ‡‚’ÇÂ—4æâ‡’’À ’òòV&æ6P —&F—W3¢÷F–öç2ç&F—W2À —ö–çE7G–ÆS¢÷F–öç2çö–çE7G–ÆRÀ —&÷FF–öã¢÷F–öç2ç&÷FF–öâÀ –&6¶w&÷VæD6öÆ÷#¢÷F–öç2æ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢÷F–öç2æ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢÷F–öç2æ&÷&FW%v–GF‚À —FVç6–öã¢fÇVT÷$FVfVÇBCb†7W7FöÒçFVç6–öâÂÆ–æTÖöFVÂòÆ–æTÖöFVÂçFVç6–öâ¢’À —7FWVDÆ–æS¢Æ–æTÖöFVÂòÆ–æTÖöFVÂç7FWVDÆ–æR¢fÇ6RÀ ’òòFööÇF—  –†—E&F—W3¢÷F–öç2æ†—E&F—W0 —Ó° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •÷&W6öÇfTFF6WDVÆVÖVçD÷F–öç3¢gVæ7F–öâ†VÆVÖVçB’° —f"ÖRÒF†—3° —f"6öæf–rÒÖRåö6öæf–s° —f"7W7FöÒÒVÆVÖVçBæ7W7FöÒÇÂ·Ó° —f"÷F–öç2ÒÖRæ6†'Bæ÷F–öç3° —f"Æ–æT÷F–öç2Ò÷F–öç2æVÆVÖVçG2æÆ–æS° —f"fÇVW2Ò6÷&UöFF6WD6öçG&öÆÆW"ç&÷F÷G—Rå÷&W6öÇfTFF6WDVÆVÖVçD÷F–öç2æÇ’†ÖRÂ&wVÖVçG2“°  ’òòF†RFVfVÇB&V†f–÷"öbÆ–æW2—2Fò'&V²BçVÆÂfÇVW2Â66÷&F–æp ’òòFò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2ó#C3R6—77VV6öÖÖVçBÓ#csƒS€ ’òòF†—2÷F–öâv—fW2Æ–æW2F†R&–Æ—G’Fò7âv0 —fÇVW2ç7äv2ÒfÇVT÷$FVfVÇBCb†6öæf–rç7äv2Â÷F–öç2ç7äv2“° —fÇVW2çFVç6–öâÒfÇVT÷$FVfVÇBCb†6öæf–ræÆ–æUFVç6–öâÂÆ–æT÷F–öç2çFVç6–öâ“° —fÇVW2ç7FWVDÆ–æRÒ&W6öÇfRC"…¶7W7FöÒç7FWVDÆ–æRÂ6öæf–rç7FWVDÆ–æRÂÆ–æT÷F–öç2ç7FWVEÒ“° —fÇVW2æ6Æ—ÒFô6Æ—‡fÇVT÷$FVfVÇBCb†6öæf–ræ6Æ—ÂFVfVÇD6Æ—†ÖRå÷…66ÆRÂÖRå÷•66ÆRÂfÇVW2æ&÷&FW%v–GF‚’’“°  —&WGW&âfÇVW3° —ÒÀ  –6Æ7VÆFUö–çE“¢gVæ7F–öâ‡fÇVRÂ–æFW‚ÂFF6WD–æFW‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"•66ÆRÒÖRå÷•66ÆS° —f"7VÕ÷2Ò° —f"7VÔæVrÒ° —f"’ÂG2ÂG4ÖWFÂ7F6¶VE&–v‡EfÇVRÂ&–v‡EfÇVRÂÖWF6WG2Â–ÆVã°  ––b‡•66ÆRæ÷F–öç2ç7F6¶VB’° —&–v‡EfÇVRÒ·•66ÆRævWE&–v‡EfÇVR‡fÇVR“° –ÖWF6WG2Ò6†'BåövWE6÷'FVEf—6–&ÆTFF6WDÖWF2‚“° ––ÆVâÒÖWF6WG2æÆVæwFƒ°  –f÷"†’Ò²’Â–ÆVã²²¶’’° –G4ÖWFÒÖWF6WG5¶•Ó° ––b†G4ÖWFæ–æFW‚ÓÓÒFF6WD–æFW‚’° –'&V³° —Ð  –G2Ò6†'BæFFæFF6WG5¶G4ÖWFæ–æFW…Ó° ––b†G4ÖWFçG—RÓÓÒvÆ–æRrbbG4ÖWFç”†—4”BÓÓÒ•66ÆRæ–B’° —7F6¶VE&–v‡EfÇVRÒ·•66ÆRævWE&–v‡EfÇVR†G2æFF¶–æFW…Ò“° ––b‡7F6¶VE&–v‡EfÇVRÂ’° —7VÔæVr³Ò7F6¶VE&–v‡EfÇVRÇÂ° —ÒVÇ6R° —7VÕ÷2³Ò7F6¶VE&–v‡EfÇVRÇÂ° —Ð —Ð —Ð  ––b‡&–v‡EfÇVRÂ’° —&WGW&â•66ÆRævWE—†VÄf÷%fÇVR‡7VÔæVr²&–v‡EfÇVR“° —Ð —&WGW&â•66ÆRævWE—†VÄf÷%fÇVR‡7VÕ÷2²&–v‡EfÇVR“° —Ð —&WGW&â•66ÆRævWE—†VÄf÷%fÇVR‡fÇVR“° —ÒÀ  —WFFT&W¦–W$6öçG&öÅö–çG3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"ÖWFÒÖRævWDÖWF‚“° —f"Æ–æTÖöFVÂÒÖWFæFF6WBåöÖöFVÃ° —f"&VÒ6†'Bæ6†'D&V° —f"ö–çG2ÒÖWFæFFÇÂµÓ° —f"’Â–ÆVâÂÖöFVÂÂ6öçG&öÅö–çG3°  ’òòöæÇ’6öç6–FW"ö–çG2F†B&RG&vâ–â66RF†R7äv2÷F–öâ—2W6V@ ––b†Æ–æTÖöFVÂç7äv2’° —ö–çG2Òö–çG2æf–ÇFW"†gVæ7F–öâ‡B’° —&WGW&âBåöÖöFVÂç6¶—° —Ò“° —Ð  –gVæ7F–öâ66öçG&öÅö–çB‡BÂÖ–âÂÖ‚’° —&WGW&âÖF‚æÖ‚„ÖF‚æÖ–â‡BÂÖ‚’ÂÖ–â“° —Ð  ––b†Æ–æTÖöFVÂæ7V&–4–çFW'öÆF–öäÖöFRÓÓÒvÖöæ÷FöæRr’° –†VÇW'2Cç7Æ–æT7W'fTÖöæ÷FöæR‡ö–çG2“° —ÒVÇ6R° –f÷"†’ÒÂ–ÆVâÒö–çG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖöFVÂÒö–çG5¶•ÒåöÖöFVÃ° –6öçG&öÅö–çG2Ò†VÇW'2Cç7Æ–æT7W'fR€ –†VÇW'2Cç&Wf–÷W4—FVÒ‡ö–çG2Â’’åöÖöFVÂÀ –ÖöFVÂÀ –†VÇW'2CææW‡D—FVÒ‡ö–çG2Â’’åöÖöFVÂÀ –Æ–æTÖöFVÂçFVç6–öà ’“° –ÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5‚Ò6öçG&öÅö–çG2ç&Wf–÷W2çƒ° –ÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5’Ò6öçG&öÅö–çG2ç&Wf–÷W2ç“° –ÖöFVÂæ6öçG&öÅö–çDæW‡E‚Ò6öçG&öÅö–çG2ææW‡Bçƒ° –ÖöFVÂæ6öçG&öÅö–çDæW‡E’Ò6öçG&öÅö–çG2ææW‡Bç“° —Ð —Ð  ––b†6†'Bæ÷F–öç2æVÆVÖVçG2æÆ–æRæ6&W¦–W%ö–çG2’° –f÷"†’ÒÂ–ÆVâÒö–çG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖöFVÂÒö–çG5¶•ÒåöÖöFVÃ° ––b†—5ö–çD–ä&V†ÖöFVÂÂ&V’’° ––b†’âbb—5ö–çD–ä&V‡ö–çG5¶’ÒÒåöÖöFVÂÂ&V’’° –ÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5‚Ò66öçG&öÅö–çB†ÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5‚Â&VæÆVgBÂ&Vç&–v‡B“° –ÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5’Ò66öçG&öÅö–çB†ÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5’Â&VçF÷Â&Væ&÷GFöÒ“° —Ð ––b†’Âö–çG2æÆVæwF‚Òbb—5ö–çD–ä&V‡ö–çG5¶’²ÒåöÖöFVÂÂ&V’’° –ÖöFVÂæ6öçG&öÅö–çDæW‡E‚Ò66öçG&öÅö–çB†ÖöFVÂæ6öçG&öÅö–çDæW‡E‚Â&VæÆVgBÂ&Vç&–v‡B“° –ÖöFVÂæ6öçG&öÅö–çDæW‡E’Ò66öçG&öÅö–çB†ÖöFVÂæ6öçG&öÅö–çDæW‡E’Â&VçF÷Â&Væ&÷GFöÒ“° —Ð —Ð —Ð —Ð —ÒÀ  –G&s¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"ÖWFÒÖRævWDÖWF‚“° —f"ö–çG2ÒÖWFæFFÇÂµÓ° —f"&VÒ6†'Bæ6†'D&V° —f"6çf2Ò6†'Bæ6çf3° —f"’Ò° —f"–ÆVâÒö–çG2æÆVæwFƒ° —f"6Æ—°  ––b†ÖRå÷6†÷tÆ–æR’° –6Æ—ÒÖWFæFF6WBåöÖöFVÂæ6Æ—°  –†VÇW'2Cæ6çf2æ6Æ—&V†6†'Bæ7G‚Â° –ÆVgC¢6Æ—æÆVgBÓÓÒfÇ6Rò¢&VæÆVgBÒ6Æ—æÆVgBÀ —&–v‡C¢6Æ—ç&–v‡BÓÓÒfÇ6Rò6çf2çv–GF‚¢&Vç&–v‡B²6Æ—ç&–v‡BÀ —F÷¢6Æ—çF÷ÓÓÒfÇ6Rò¢&VçF÷Ò6Æ—çF÷À –&÷GFöÓ¢6Æ—æ&÷GFöÒÓÓÒfÇ6Rò6çf2æ†V–v‡B¢&Væ&÷GFöÒ²6Æ—æ&÷GFöÐ —Ò“°  –ÖWFæFF6WBæG&r‚“°  –†VÇW'2Cæ6çf2çVæ6Æ—&V†6†'Bæ7G‚“° —Ð  ’òòG&rF†Rö–çG0 –f÷"ƒ²’Â–ÆVã²²¶’’° —ö–çG5¶•ÒæG&r†&V“° —Ð —ÒÀ  ’ò¢  ’¢&÷FV7FV@ ’¢ð —6WD†÷fW%7G–ÆS¢gVæ7F–öâ‡ö–çB’° —f"ÖöFVÂÒö–çBåöÖöFVÃ° —f"÷F–öç2Òö–çBåö÷F–öç3° —f"vWD†÷fW$6öÆ÷"Ò†VÇW'2CævWD†÷fW$6öÆ÷#°  —ö–çBâG&Wf–÷W57G–ÆRÒ° –&6¶w&÷VæD6öÆ÷#¢ÖöFVÂæ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢ÖöFVÂæ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢ÖöFVÂæ&÷&FW%v–GF‚À —&F—W3¢ÖöFVÂç&F—W0 —Ó°  –ÖöFVÂæ&6¶w&÷VæD6öÆ÷"ÒfÇVT÷$FVfVÇBCb†÷F–öç2æ†÷fW$&6¶w&÷VæD6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&6¶w&÷VæD6öÆ÷"’“° –ÖöFVÂæ&÷&FW$6öÆ÷"ÒfÇVT÷$FVfVÇBCb†÷F–öç2æ†÷fW$&÷&FW$6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&÷&FW$6öÆ÷"’“° –ÖöFVÂæ&÷&FW%v–GF‚ÒfÇVT÷$FVfVÇBCb†÷F–öç2æ†÷fW$&÷&FW%v–GF‚Â÷F–öç2æ&÷&FW%v–GF‚“° –ÖöFVÂç&F—W2ÒfÇVT÷$FVfVÇBCb†÷F–öç2æ†÷fW%&F—W2Â÷F–öç2ç&F—W2“° —ÒÀ§Ò“° §f"&W6öÇfRC2Ò†VÇW'2Cæ÷F–öç2ç&W6öÇfS° ¦6÷&UöFVfVÇG2å÷6WB‚wöÆ$&VrÂ° —66ÆS¢° —G—S¢w&F–ÄÆ–æV"rÀ –ævÆTÆ–æW3¢° –F—7Æ“¢fÇ6P —ÒÀ –w&–DÆ–æW3¢° –6—&7VÆ#¢G'VP —ÒÀ —ö–çDÆ&VÇ3¢° –F—7Æ“¢fÇ6P —ÒÀ —F–6·3¢° –&Vv–äE¦W&ó¢G'VP —Ð —ÒÀ  ’òò&ööÆVâÒv†WF†W"Fòæ–ÖFRF†R&÷FF–öâöbF†R6†'@ –æ–ÖF–öã¢° –æ–ÖFU&÷FFS¢G'VRÀ –æ–ÖFU66ÆS¢G'VP —ÒÀ  —7F'DævÆS¢ÓãR¢ÖF‚å’À –ÆVvVæD6ÆÆ&6³¢gVæ7F–öâ†6†'B’° —f"Æ—7BÒFö7VÖVçBæ7&VFTVÆVÖVçB‚wVÂr“° —f"FFÒ6†'BæFF° —f"FF6WG2ÒFFæFF6WG3° —f"Æ&VÇ2ÒFFæÆ&VÇ3° —f"’Â–ÆVâÂÆ—7D—FVÒÂÆ—7D—FVÕ7ã°  –Æ—7Bç6WDGG&–'WFR‚v6Æ72rÂ6†'Bæ–B²rÖÆVvVæBr“° ––b†FF6WG2æÆVæwF‚’° –f÷"†’ÒÂ–ÆVâÒFF6WG5³ÒæFFæÆVæwFƒ²’Â–ÆVã²²¶’’° –Æ—7D—FVÒÒÆ—7BæVæD6†–ÆB†Fö7VÖVçBæ7&VFTVÆVÖVçB‚vÆ’r’“° –Æ—7D—FVÕ7âÒÆ—7D—FVÒæVæD6†–ÆB†Fö7VÖVçBæ7&VFTVÆVÖVçB‚w7âr’“° –Æ—7D—FVÕ7âç7G–ÆRæ&6¶w&÷VæD6öÆ÷"ÒFF6WG5³Òæ&6¶w&÷VæD6öÆ÷%¶•Ó° ––b†Æ&VÇ5¶•Ò’° –Æ—7D—FVÒæVæD6†–ÆB†Fö7VÖVçBæ7&VFUFW‡DæöFR†Æ&VÇ5¶•Ò’“° —Ð —Ð —Ð  —&WGW&âÆ—7Bæ÷WFW$…DÔÃ° —ÒÀ –ÆVvVæC¢° –Æ&VÇ3¢° –vVæW&FTÆ&VÇ3¢gVæ7F–öâ†6†'B’° —f"FFÒ6†'BæFF° ––b†FFæÆ&VÇ2æÆVæwF‚bbFFæFF6WG2æÆVæwF‚’° —&WGW&âFFæÆ&VÇ2æÖ†gVæ7F–öâ†Æ&VÂÂ’’° —f"ÖWFÒ6†'BævWDFF6WDÖWFƒ“° —f"7G–ÆRÒÖWFæ6öçG&öÆÆW"ævWE7G–ÆR†’“°  —&WGW&â° —FW‡C¢Æ&VÂÀ –f–ÆÅ7G–ÆS¢7G–ÆRæ&6¶w&÷VæD6öÆ÷"À —7G&ö¶U7G–ÆS¢7G–ÆRæ&÷&FW$6öÆ÷"À –Æ–æUv–GFƒ¢7G–ÆRæ&÷&FW%v–GF‚À –†–FFVã¢—4æâ†FFæFF6WG5³ÒæFF¶•Ò’ÇÂÖWFæFF¶•Òæ†–FFVâÀ  ’òòW‡G&FFW6VBf÷"FövvÆ–ærF†R6÷'&V7B—FVÐ ––æFWƒ¢ —Ó° —Ò“° —Ð —&WGW&âµÓ° —Ð —ÒÀ  –öä6Æ–6³¢gVæ7F–öâ†RÂÆVvVæD—FVÒ’° —f"–æFW‚ÒÆVvVæD—FVÒæ–æFWƒ° —f"6†'BÒF†—2æ6†'C° —f"’Â–ÆVâÂÖWF°  –f÷"†’ÒÂ–ÆVâÒ†6†'BæFFæFF6WG2ÇÂµÒ’æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖWFÒ6†'BævWDFF6WDÖWF†’“° –ÖWFæFF¶–æFW…Òæ†–FFVâÒÖWFæFF¶–æFW…Òæ†–FFVã° —Ð  –6†'BçWFFR‚“° —Ð —ÒÀ  ’òòæVVBFò÷fW'&–FRF†W6RFòv—fRæ–6RFVfVÇ@ —FööÇF—3¢° –6ÆÆ&6·3¢° —F—FÆS¢gVæ7F–öâ‚’° —&WGW&ârs° —ÒÀ –Æ&VÃ¢gVæ7F–öâ†—FVÒÂFF’° —&WGW&âFFæÆ&VÇ5¶—FVÒæ–æFW…Ò²s¢r²—FVÒç”Æ&VÃ° —Ð —Ð —Ð§Ò“° §f"6öçG&öÆÆW%÷öÆ$&VÒ6÷&UöFF6WD6öçG&öÆÆW"æW‡FVæB‡°  –FFVÆVÖVçEG—S¢VÆVÖVçG2ä&2À  –Æ–æµ66ÆW3¢†VÇW'2Cææö÷À  ’ò¢  ’¢&—fFP ’¢ð •öFFVÆVÖVçD÷F–öç3¢° ’v&6¶w&÷VæD6öÆ÷"rÀ ’v&÷&FW$6öÆ÷"rÀ ’v&÷&FW%v–GF‚rÀ ’v&÷&FW$Æ–vârÀ ’v†÷fW$&6¶w&÷VæD6öÆ÷"rÀ ’v†÷fW$&÷&FW$6öÆ÷"rÀ ’v†÷fW$&÷&FW%v–GF‚rÀ •ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWD–æFW…66ÆT–C¢gVæ7F–öâ‚’° —&WGW&âF†—2æ6†'Bç66ÆRæ–C° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWEfÇVU66ÆT–C¢gVæ7F–öâ‚’° —&WGW&âF†—2æ6†'Bç66ÆRæ–C° —ÒÀ  —WFFS¢gVæ7F–öâ‡&W6WB’° —f"ÖRÒF†—3° —f"FF6WBÒÖRævWDFF6WB‚“° —f"ÖWFÒÖRævWDÖWF‚“° —f"7F'BÒÖRæ6†'Bæ÷F–öç2ç7F'DævÆRÇÂ° —f"7F'G2ÒÖRå÷7F'G2ÒµÓ° —f"ævÆW2ÒÖRåöævÆW2ÒµÓ° —f"&72ÒÖWFæFF° —f"’Â–ÆVâÂævÆS°  –ÖRå÷WFFU&F—W2‚“°  –ÖWFæ6÷VçBÒÖRæ6÷VçEf—6–&ÆTVÆVÖVçG2‚“°  –f÷"†’ÒÂ–ÆVâÒFF6WBæFFæÆVæwFƒ²’Â–ÆVã²’²²’° —7F'G5¶•ÒÒ7F'C° –ævÆRÒÖRåö6ö×WFTævÆR†’“° –ævÆW5¶•ÒÒævÆS° —7F'B³ÒævÆS° —Ð  –f÷"†’ÒÂ–ÆVâÒ&72æÆVæwFƒ²’Â–ÆVã²²¶’’° –&75¶•Òåö÷F–öç2ÒÖRå÷&W6öÇfTFFVÆVÖVçD÷F–öç2†&75¶•ÒÂ’“° –ÖRçWFFTVÆVÖVçB†&75¶•ÒÂ’Â&W6WB“° —Ð —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •÷WFFU&F—W3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"6†'D&VÒ6†'Bæ6†'D&V° —f"÷G2Ò6†'Bæ÷F–öç3° —f"Ö–å6—¦RÒÖF‚æÖ–â†6†'D&Vç&–v‡BÒ6†'D&VæÆVgBÂ6†'D&Væ&÷GFöÒÒ6†'D&VçF÷“°  –6†'Bæ÷WFW%&F—W2ÒÖF‚æÖ‚†Ö–å6—¦Rò"Â“° –6†'Bæ–ææW%&F—W2ÒÖF‚æÖ‚†÷G2æ7WF÷WEW&6VçFvRò†6†'Bæ÷WFW%&F—W2ò’¢†÷G2æ7WF÷WEW&6VçFvR’¢Â“° –6†'Bç&F—W4ÆVæwF‚Ò†6†'Bæ÷WFW%&F—W2Ò6†'Bæ–ææW%&F—W2’ò6†'BævWEf—6–&ÆTFF6WD6÷VçB‚“°  –ÖRæ÷WFW%&F—W2Ò6†'Bæ÷WFW%&F—W2Ò†6†'Bç&F—W4ÆVæwF‚¢ÖRæ–æFW‚“° –ÖRæ–ææW%&F—W2ÒÖRæ÷WFW%&F—W2Ò6†'Bç&F—W4ÆVæwFƒ° —ÒÀ  —WFFTVÆVÖVçC¢gVæ7F–öâ†&2Â–æFW‚Â&W6WB’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"FF6WBÒÖRævWDFF6WB‚“° —f"÷G2Ò6†'Bæ÷F–öç3° —f"æ–ÖF–öä÷G2Ò÷G2ææ–ÖF–öã° —f"66ÆRÒ6†'Bç66ÆS° —f"Æ&VÇ2Ò6†'BæFFæÆ&VÇ3°  —f"6VçFW%‚Ò66ÆRç„6VçFW#° —f"6VçFW%’Ò66ÆRç”6VçFW#°  ’òòf"æVt†Æe’ÒÓãR¢ÖF‚å“° —f"FF6WE7F'DævÆRÒ÷G2ç7F'DævÆS° —f"F—7Fæ6RÒ&2æ†–FFVâò¢66ÆRævWDF—7Fæ6Tg&öÔ6VçFW$f÷%fÇVR†FF6WBæFF¶–æFW…Ò“° —f"7F'DævÆRÒÖRå÷7F'G5¶–æFW…Ó° —f"VæDævÆRÒ7F'DævÆR²†&2æ†–FFVâò¢ÖRåöævÆW5¶–æFW…Ò“°  —f"&W6WE&F—W2Òæ–ÖF–öä÷G2ææ–ÖFU66ÆRò¢66ÆRævWDF—7Fæ6Tg&öÔ6VçFW$f÷%fÇVR†FF6WBæFF¶–æFW…Ò“° —f"÷F–öç2Ò&2åö÷F–öç2ÇÂ·Ó°  –†VÇW'2CæW‡FVæB†&2Â° ’òòWF–Æ—G •öFF6WD–æFWƒ¢ÖRæ–æFW‚À •ö–æFWƒ¢–æFW‚À •÷66ÆS¢66ÆRÀ  ’òòFW6—&VBf–Wr&÷W'F–W0 •öÖöFVÃ¢° –&6¶w&÷VæD6öÆ÷#¢÷F–öç2æ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢÷F–öç2æ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢÷F–öç2æ&÷&FW%v–GF‚À –&÷&FW$Æ–vã¢÷F–öç2æ&÷&FW$Æ–vâÀ —ƒ¢6VçFW%‚À —“¢6VçFW%’À ––ææW%&F—W3¢À –÷WFW%&F—W3¢&W6WBò&W6WE&F—W2¢F—7Fæ6RÀ —7F'DævÆS¢&W6WBbbæ–ÖF–öä÷G2ææ–ÖFU&÷FFRòFF6WE7F'DævÆR¢7F'DævÆRÀ –VæDævÆS¢&W6WBbbæ–ÖF–öä÷G2ææ–ÖFU&÷FFRòFF6WE7F'DævÆR¢VæDævÆRÀ –Æ&VÃ¢†VÇW'2CçfÇVTD–æFW„÷$FVfVÇB†Æ&VÇ2Â–æFW‚ÂÆ&VÇ5¶–æFW…Ò —Ð —Ò“°  –&2ç—f÷B‚“° —ÒÀ  –6÷VçEf—6–&ÆTVÆVÖVçG3¢gVæ7F–öâ‚’° —f"FF6WBÒF†—2ævWDFF6WB‚“° —f"ÖWFÒF†—2ævWDÖWF‚“° —f"6÷VçBÒ°  –†VÇW'2CæV6‚†ÖWFæFFÂgVæ7F–öâ†VÆVÖVçBÂ–æFW‚’° ––b‚—4æâ†FF6WBæFF¶–æFW…Ò’bbVÆVÖVçBæ†–FFVâ’° –6÷VçB²³° —Ð —Ò“°  —&WGW&â6÷VçC° —ÒÀ  ’ò¢  ’¢&÷FV7FV@ ’¢ð —6WD†÷fW%7G–ÆS¢gVæ7F–öâ†&2’° —f"ÖöFVÂÒ&2åöÖöFVÃ° —f"÷F–öç2Ò&2åö÷F–öç3° —f"vWD†÷fW$6öÆ÷"Ò†VÇW'2CævWD†÷fW$6öÆ÷#° —f"fÇVT÷$FVfVÇBÒ†VÇW'2CçfÇVT÷$FVfVÇC°  –&2âG&Wf–÷W57G–ÆRÒ° –&6¶w&÷VæD6öÆ÷#¢ÖöFVÂæ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢ÖöFVÂæ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢ÖöFVÂæ&÷&FW%v–GF‚À —Ó°  –ÖöFVÂæ&6¶w&÷VæD6öÆ÷"ÒfÇVT÷$FVfVÇB†÷F–öç2æ†÷fW$&6¶w&÷VæD6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&6¶w&÷VæD6öÆ÷"’“° –ÖöFVÂæ&÷&FW$6öÆ÷"ÒfÇVT÷$FVfVÇB†÷F–öç2æ†÷fW$&÷&FW$6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&÷&FW$6öÆ÷"’“° –ÖöFVÂæ&÷&FW%v–GF‚ÒfÇVT÷$FVfVÇB†÷F–öç2æ†÷fW$&÷&FW%v–GF‚Â÷F–öç2æ&÷&FW%v–GF‚“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •ö6ö×WFTævÆS¢gVæ7F–öâ†–æFW‚’° —f"ÖRÒF†—3° —f"6÷VçBÒF†—2ævWDÖWF‚’æ6÷VçC° —f"FF6WBÒÖRævWDFF6WB‚“° —f"ÖWFÒÖRævWDÖWF‚“°  ––b†—4æâ†FF6WBæFF¶–æFW…Ò’ÇÂÖWFæFF¶–æFW…Òæ†–FFVâ’° —&WGW&â° —Ð  ’òò67&—F&ÆR÷F–öç0 —f"6öçFW‡BÒ° –6†'C¢ÖRæ6†'BÀ –FF–æFWƒ¢–æFW‚À –FF6WC¢FF6WBÀ –FF6WD–æFWƒ¢ÖRæ–æFW€ —Ó°  —&WGW&â&W6öÇfRC2…° –ÖRæ6†'Bæ÷F–öç2æVÆVÖVçG2æ&2æævÆRÀ ’ƒ"¢ÖF‚å’’ò6÷Vç@ •ÒÂ6öçFW‡BÂ–æFW‚“° —Ð§Ò“° ¦6÷&UöFVfVÇG2å÷6WB‚w–RrÂ†VÇW'2Cæ6ÆöæR†6÷&UöFVfVÇG2æF÷Vv†çWB’“°¦6÷&UöFVfVÇG2å÷6WB‚w–RrÂ° –7WF÷WEW&6VçFvS¢ §Ò“° ¢òò–R6†'G2&RF÷Vv†çWB6†'Bv—F‚F–ffW&VçBFVfVÇG0§f"6öçG&öÆÆW%÷–RÒ6öçG&öÆÆW%öF÷Vv†çWC° §f"fÇVT÷$FVfVÇBCrÒ†VÇW'2CçfÇVT÷$FVfVÇC° ¦6÷&UöFVfVÇG2å÷6WB‚w&F"rÂ° —7äv3¢fÇ6RÀ —66ÆS¢° —G—S¢w&F–ÄÆ–æV"p —ÒÀ –VÆVÖVçG3¢° –Æ–æS¢° –f–ÆÃ¢w7F'BrÀ —FVç6–öã¢òòæò&W¦–W"–â&F  —Ð —Ð§Ò“° §f"6öçG&öÆÆW%÷&F"Ò6÷&UöFF6WD6öçG&öÆÆW"æW‡FVæB‡° –FF6WDVÆVÖVçEG—S¢VÆVÖVçG2äÆ–æRÀ  –FFVÆVÖVçEG—S¢VÆVÖVçG2åö–çBÀ  –Æ–æµ66ÆW3¢†VÇW'2Cææö÷À  ’ò¢  ’¢&—fFP ’¢ð •öFF6WDVÆVÖVçD÷F–öç3¢° ’v&6¶w&÷VæD6öÆ÷"rÀ ’v&÷&FW%v–GF‚rÀ ’v&÷&FW$6öÆ÷"rÀ ’v&÷&FW$67G–ÆRrÀ ’v&÷&FW$F6‚rÀ ’v&÷&FW$F6„öfg6WBrÀ ’v&÷&FW$¦ö–å7G–ÆRrÀ ’vf–ÆÂp •ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öFFVÆVÖVçD÷F–öç3¢° –&6¶w&÷VæD6öÆ÷#¢wö–çD&6¶w&÷VæD6öÆ÷"rÀ –&÷&FW$6öÆ÷#¢wö–çD&÷&FW$6öÆ÷"rÀ –&÷&FW%v–GFƒ¢wö–çD&÷&FW%v–GF‚rÀ –†—E&F—W3¢wö–çD†—E&F—W2rÀ –†÷fW$&6¶w&÷VæD6öÆ÷#¢wö–çD†÷fW$&6¶w&÷VæD6öÆ÷"rÀ –†÷fW$&÷&FW$6öÆ÷#¢wö–çD†÷fW$&÷&FW$6öÆ÷"rÀ –†÷fW$&÷&FW%v–GFƒ¢wö–çD†÷fW$&÷&FW%v–GF‚rÀ –†÷fW%&F—W3¢wö–çD†÷fW%&F—W2rÀ —ö–çE7G–ÆS¢wö–çE7G–ÆRrÀ —&F—W3¢wö–çE&F—W2rÀ —&÷FF–öã¢wö–çE&÷FF–öâp —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWD–æFW…66ÆT–C¢gVæ7F–öâ‚’° —&WGW&âF†—2æ6†'Bç66ÆRæ–C° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWEfÇVU66ÆT–C¢gVæ7F–öâ‚’° —&WGW&âF†—2æ6†'Bç66ÆRæ–C° —ÒÀ  —WFFS¢gVæ7F–öâ‡&W6WB’° —f"ÖRÒF†—3° —f"ÖWFÒÖRævWDÖWF‚“° —f"Æ–æRÒÖWFæFF6WC° —f"ö–çG2ÒÖWFæFFÇÂµÓ° —f"66ÆRÒÖRæ6†'Bç66ÆS° —f"6öæf–rÒÖRåö6öæf–s° —f"’Â–ÆVã°  ’òò6ö×F–&–Æ—G“¢–bF†R&÷W'F–W2&RFVf–æVBv—F‚öæÇ’F†RöÆBæÖRÂW6RF†÷6RfÇVW0 ––b†6öæf–rçFVç6–öâÓÒVæFVf–æVBbb6öæf–ræÆ–æUFVç6–öâÓÓÒVæFVf–æVB’° –6öæf–ræÆ–æUFVç6–öâÒ6öæf–rçFVç6–öã° —Ð  ’òòWF–Æ—G –Æ–æRå÷66ÆRÒ66ÆS° –Æ–æRåöFF6WD–æFW‚ÒÖRæ–æFWƒ° ’òòFF –Æ–æRåö6†–ÆG&VâÒö–çG3° –Æ–æRåöÆö÷ÒG'VS° ’òòÖöFVÀ –Æ–æRåöÖöFVÂÒÖRå÷&W6öÇfTFF6WDVÆVÖVçD÷F–öç2†Æ–æR“°  –Æ–æRç—f÷B‚“°  ’òòWFFRö–çG0 –f÷"†’ÒÂ–ÆVâÒö–çG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖRçWFFTVÆVÖVçB‡ö–çG5¶•ÒÂ’Â&W6WB“° —Ð  ’òòWFFR&W¦–W"6öçG&öÂö–çG0 –ÖRçWFFT&W¦–W$6öçG&öÅö–çG2‚“°  ’òòæ÷r—f÷BF†Rö–çBf÷"æ–ÖF–öà –f÷"†’ÒÂ–ÆVâÒö–çG2æÆVæwFƒ²’Â–ÆVã²²¶’’° —ö–çG5¶•Òç—f÷B‚“° —Ð —ÒÀ  —WFFTVÆVÖVçC¢gVæ7F–öâ‡ö–çBÂ–æFW‚Â&W6WB’° —f"ÖRÒF†—3° —f"7W7FöÒÒö–çBæ7W7FöÒÇÂ·Ó° —f"FF6WBÒÖRævWDFF6WB‚“° —f"66ÆRÒÖRæ6†'Bç66ÆS° —f"ö–çE÷6—F–öâÒ66ÆRævWEö–çE÷6—F–öäf÷%fÇVR†–æFW‚ÂFF6WBæFF¶–æFW…Ò“° —f"÷F–öç2ÒÖRå÷&W6öÇfTFFVÆVÖVçD÷F–öç2‡ö–çBÂ–æFW‚“° —f"Æ–æTÖöFVÂÒÖRævWDÖWF‚’æFF6WBåöÖöFVÃ° —f"‚Ò&W6WBò66ÆRç„6VçFW"¢ö–çE÷6—F–öâçƒ° —f"’Ò&W6WBò66ÆRç”6VçFW"¢ö–çE÷6—F–öâç“°  ’òòWF–Æ—G —ö–çBå÷66ÆRÒ66ÆS° —ö–çBåö÷F–öç2Ò÷F–öç3° —ö–çBåöFF6WD–æFW‚ÒÖRæ–æFWƒ° —ö–çBåö–æFW‚Ò–æFWƒ°  ’òòFW6—&VBf–Wr&÷W'F–W0 —ö–çBåöÖöFVÂÒ° —ƒ¢‚ÂòòfÇVRæ÷BW6VB–âFF6WB66ÆRÂ'WBvRvçB6öç6—7FVçB’&WGvVVâ66ÆW0 —“¢’À —6¶—¢7W7FöÒç6¶—ÇÂ—4æâ‡‚’ÇÂ—4æâ‡’’À ’òòV&æ6P —&F—W3¢÷F–öç2ç&F—W2À —ö–çE7G–ÆS¢÷F–öç2çö–çE7G–ÆRÀ —&÷FF–öã¢÷F–öç2ç&÷FF–öâÀ –&6¶w&÷VæD6öÆ÷#¢÷F–öç2æ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢÷F–öç2æ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢÷F–öç2æ&÷&FW%v–GF‚À —FVç6–öã¢fÇVT÷$FVfVÇBCr†7W7FöÒçFVç6–öâÂÆ–æTÖöFVÂòÆ–æTÖöFVÂçFVç6–öâ¢’À  ’òòFööÇF—  –†—E&F—W3¢÷F–öç2æ†—E&F—W0 —Ó° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •÷&W6öÇfTFF6WDVÆVÖVçD÷F–öç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6öæf–rÒÖRåö6öæf–s° —f"÷F–öç2ÒÖRæ6†'Bæ÷F–öç3° —f"fÇVW2Ò6÷&UöFF6WD6öçG&öÆÆW"ç&÷F÷G—Rå÷&W6öÇfTFF6WDVÆVÖVçD÷F–öç2æÇ’†ÖRÂ&wVÖVçG2“°  —fÇVW2ç7äv2ÒfÇVT÷$FVfVÇBCr†6öæf–rç7äv2Â÷F–öç2ç7äv2“° —fÇVW2çFVç6–öâÒfÇVT÷$FVfVÇBCr†6öæf–ræÆ–æUFVç6–öâÂ÷F–öç2æVÆVÖVçG2æÆ–æRçFVç6–öâ“°  —&WGW&âfÇVW3° —ÒÀ  —WFFT&W¦–W$6öçG&öÅö–çG3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"ÖWFÒÖRævWDÖWF‚“° —f"&VÒÖRæ6†'Bæ6†'D&V° —f"ö–çG2ÒÖWFæFFÇÂµÓ° —f"’Â–ÆVâÂÖöFVÂÂ6öçG&öÅö–çG3°  ’òòöæÇ’6öç6–FW"ö–çG2F†B&RG&vâ–â66RF†R7äv2÷F–öâ—2W6V@ ––b†ÖWFæFF6WBåöÖöFVÂç7äv2’° —ö–çG2Òö–çG2æf–ÇFW"†gVæ7F–öâ‡B’° —&WGW&âBåöÖöFVÂç6¶—° —Ò“° —Ð  –gVæ7F–öâ66öçG&öÅö–çB‡BÂÖ–âÂÖ‚’° —&WGW&âÖF‚æÖ‚„ÖF‚æÖ–â‡BÂÖ‚’ÂÖ–â“° —Ð  –f÷"†’ÒÂ–ÆVâÒö–çG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖöFVÂÒö–çG5¶•ÒåöÖöFVÃ° –6öçG&öÅö–çG2Ò†VÇW'2Cç7Æ–æT7W'fR€ –†VÇW'2Cç&Wf–÷W4—FVÒ‡ö–çG2Â’ÂG'VR’åöÖöFVÂÀ –ÖöFVÂÀ –†VÇW'2CææW‡D—FVÒ‡ö–çG2Â’ÂG'VR’åöÖöFVÂÀ –ÖöFVÂçFVç6–öà ’“°  ’òò&WfVçBF†R&W¦–W"vö–ær÷WG6–FRöbF†R&÷VæG2öbF†Rw&€ –ÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5‚Ò66öçG&öÅö–çB†6öçG&öÅö–çG2ç&Wf–÷W2ç‚Â&VæÆVgBÂ&Vç&–v‡B“° –ÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5’Ò66öçG&öÅö–çB†6öçG&öÅö–çG2ç&Wf–÷W2ç’Â&VçF÷Â&Væ&÷GFöÒ“° –ÖöFVÂæ6öçG&öÅö–çDæW‡E‚Ò66öçG&öÅö–çB†6öçG&öÅö–çG2ææW‡Bç‚Â&VæÆVgBÂ&Vç&–v‡B“° –ÖöFVÂæ6öçG&öÅö–çDæW‡E’Ò66öçG&öÅö–çB†6öçG&öÅö–çG2ææW‡Bç’Â&VçF÷Â&Væ&÷GFöÒ“° —Ð —ÒÀ  —6WD†÷fW%7G–ÆS¢gVæ7F–öâ‡ö–çB’° —f"ÖöFVÂÒö–çBåöÖöFVÃ° —f"÷F–öç2Òö–çBåö÷F–öç3° —f"vWD†÷fW$6öÆ÷"Ò†VÇW'2CævWD†÷fW$6öÆ÷#°  —ö–çBâG&Wf–÷W57G–ÆRÒ° –&6¶w&÷VæD6öÆ÷#¢ÖöFVÂæ&6¶w&÷VæD6öÆ÷"À –&÷&FW$6öÆ÷#¢ÖöFVÂæ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢ÖöFVÂæ&÷&FW%v–GF‚À —&F—W3¢ÖöFVÂç&F—W0 —Ó°  –ÖöFVÂæ&6¶w&÷VæD6öÆ÷"ÒfÇVT÷$FVfVÇBCr†÷F–öç2æ†÷fW$&6¶w&÷VæD6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&6¶w&÷VæD6öÆ÷"’“° –ÖöFVÂæ&÷&FW$6öÆ÷"ÒfÇVT÷$FVfVÇBCr†÷F–öç2æ†÷fW$&÷&FW$6öÆ÷"ÂvWD†÷fW$6öÆ÷"†÷F–öç2æ&÷&FW$6öÆ÷"’“° –ÖöFVÂæ&÷&FW%v–GF‚ÒfÇVT÷$FVfVÇBCr†÷F–öç2æ†÷fW$&÷&FW%v–GF‚Â÷F–öç2æ&÷&FW%v–GF‚“° –ÖöFVÂç&F—W2ÒfÇVT÷$FVfVÇBCr†÷F–öç2æ†÷fW%&F—W2Â÷F–öç2ç&F—W2“° —Ð§Ò“° ¦6÷&UöFVfVÇG2å÷6WB‚w66GFW"rÂ° –†÷fW#¢° –ÖöFS¢w6–ævÆRp —ÒÀ  —66ÆW3¢° —„†W3¢·° ––C¢w‚Ö†—2ÓrÂòòæVVBâ”B6òFF6WG26â&VfW&Væ6RF†R66ÆP —G—S¢vÆ–æV"rÂòò66GFW"6†÷VÆBæ÷BW6R6FVv÷'’†—0 —÷6—F–öã¢v&÷GFöÒp —ÕÒÀ —”†W3¢·° ––C¢w’Ö†—2ÓrÀ —G—S¢vÆ–æV"rÀ —÷6—F–öã¢vÆVgBp —ÕÐ —ÒÀ  —FööÇF—3¢° –6ÆÆ&6·3¢° —F—FÆS¢gVæ7F–öâ‚’° —&WGW&ârs²òòFöW6âwBÖ¶R6Vç6Rf÷"66GFW"6–æ6RFF&Rf÷&ÖGFVB2ö–ç@ —ÒÀ –Æ&VÃ¢gVæ7F–öâ†—FVÒ’° —&WGW&âr‚r²—FVÒç„Æ&VÂ²rÂr²—FVÒç”Æ&VÂ²r’s° —Ð —Ð —Ð§Ò“° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –FF6WG3¢° —66GFW#¢° —6†÷tÆ–æS¢fÇ6P —Ð —Ð§Ò“° ¢òò66GFW"6†'G2W6RÆ–æR6öçG&öÆÆW'0§f"6öçG&öÆÆW%÷66GFW"Ò6öçG&öÆÆW%öÆ–æS° ¢òòäõDRW‡÷'BÖ–âv†–6‚F†R¶W’&W&W6VçG2F†R6öçG&öÆÆW"G—RÂæ÷@¢òòF†R6Æ72ÂæB6ò×W7B&R6ÖVÄ66R–â÷&FW"Fò&R6÷'&V7FÇ’&WG&–WfV@¢òò'’F†R6öçG&öÆÆW"–â6÷&Ræ6öçG&öÆÆW"æ§2†6öçG&öÆÆW'5¶ÖWFçG—UÖ’à §f"6öçG&öÆÆW'2Ò° –&#¢6öçG&öÆÆW%ö&"À –'V&&ÆS¢6öçG&öÆÆW%ö'V&&ÆRÀ –F÷Vv†çWC¢6öçG&öÆÆW%öF÷Vv†çWBÀ –†÷&—¦öçFÄ&#¢6öçG&öÆÆW%ö†÷&—¦öçFÄ&"À –Æ–æS¢6öçG&öÆÆW%öÆ–æRÀ —öÆ$&V¢6öçG&öÆÆW%÷öÆ$&VÀ —–S¢6öçG&öÆÆW%÷–RÀ —&F#¢6öçG&öÆÆW%÷&F"À —66GFW#¢6öçG&öÆÆW%÷66GFW §Ó° ¢ò¢ ¢¢†VÇW"gVæ7F–öâFòvWB&VÆF—fR÷6—F–öâf÷"âWfVç@¢¢&Ò´WfVçGÄ”WfVçGÒWfVçBÒF†RWfVçBFòvWBF†R÷6—F–öâf÷ ¢¢&Ò´6†'GÒ6†'BÒF†R6†'@¢¢&WGW&ç2¶ö&¦V7GÒF†RWfVçB÷6—F–öà¢¢ð¦gVæ7F–öâvWE&VÆF—fU÷6—F–öâ†RÂ6†'B’° ––b†RææF—fR’° —&WGW&â° —ƒ¢Rç‚À —“¢Rç —Ó° —Ð  —&WGW&â†VÇW'2CævWE&VÆF—fU÷6—F–öâ†RÂ6†'B“°§Ð ¢ò¢ ¢¢†VÇW"gVæ7F–öâFòG&fW'6RÆÂöbF†Rf—6–&ÆRVÆVÖVçG2–âF†R6†'@¢¢&Ò´6†'GÒ6†'BÒF†R6†'@¢¢&Ò¶gVæ7F–öçÒ†æFÆW"ÒF†R6ÆÆ&6²FòW†V7WFRf÷"V6‚f—6–&ÆR—FVÐ¢¢ð¦gVæ7F–öâ'6Uf—6–&ÆT—FV×2†6†'BÂ†æFÆW"’° —f"ÖWF6WG2Ò6†'BåövWE6÷'FVEf—6–&ÆTFF6WDÖWF2‚“° —f"ÖWFFFÂ’Â¢Â–ÆVâÂ¦ÆVâÂVÆVÖVçC°  –f÷"†’ÒÂ–ÆVâÒÖWF6WG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖWFFFÒÖWF6WG5¶•ÒæFF° –f÷"†¢ÒÂ¦ÆVâÒÖWFFFæÆVæwFƒ²¢Â¦ÆVã²²¶¢’° –VÆVÖVçBÒÖWFFF¶¥Ó° ––b‚VÆVÖVçBå÷f–Wrç6¶—’° –†æFÆW"†VÆVÖVçB“° —Ð —Ð —Ð§Ð ¢ò¢ ¢¢†VÇW"gVæ7F–öâFòvWBF†R—FV×2F†B–çFW'6V7BF†RWfVçB÷6—F–öà¢¢&Ò´6†'DVÆVÖVçEµ×Ò—FV×2ÒVÆVÖVçG2Fòf–ÇFW ¢¢&Ò¶ö&¦V7GÒ÷6—F–öâÒF†Rö–çBFò&RæV&W7BFð¢¢&WGW&â´6†'DVÆVÖVçEµ×ÒF†RæV&W7B—FV×0¢¢ð¦gVæ7F–öâvWD–çFW'6V7D—FV×2†6†'BÂ÷6—F–öâ’° —f"VÆVÖVçG2ÒµÓ°  —'6Uf—6–&ÆT—FV×2†6†'BÂgVæ7F–öâ†VÆVÖVçB’° ––b†VÆVÖVçBæ–å&ævR‡÷6—F–öâç‚Â÷6—F–öâç’’’° –VÆVÖVçG2çW6‚†VÆVÖVçB“° —Ð —Ò“°  —&WGW&âVÆVÖVçG3°§Ð ¢ò¢ ¢¢†VÇW"gVæ7F–öâFòvWBF†R—FV×2æV&W7BFòF†RWfVçB÷6—F–öâ6öç6–FW&–ærÆÂf—6–&ÆR—FV×2–âFV‚6†'@¢¢&Ò´6†'GÒ6†'BÒF†R6†'BFòÆöö²BVÆVÖVçG2g&öÐ¢¢&Ò¶ö&¦V7GÒ÷6—F–öâÒF†Rö–çBFò&RæV&W7BFð¢¢&Ò¶&ööÆVçÒ–çFW'6V7BÒ–bG'VRÂöæÇ’6öç6–FW"—FV×2F†B–çFW'6V7BF†R÷6—F–öà¢¢&Ò¶gVæ7F–öçÒF—7Fæ6TÖWG&–2ÒgVæ7F–öâFò&÷f–FRF†RF—7Fæ6R&WGvVVâö–çG0¢¢&WGW&â´6†'DVÆVÖVçEµ×ÒF†RæV&W7B—FV×0¢¢ð¦gVæ7F–öâvWDæV&W7D—FV×2†6†'BÂ÷6—F–öâÂ–çFW'6V7BÂF—7Fæ6TÖWG&–2’° —f"Ö–äF—7Fæ6RÒçVÖ&W"åõ4•D•dUô”äd”ä•E“° —f"æV&W7D—FV×2ÒµÓ°  —'6Uf—6–&ÆT—FV×2†6†'BÂgVæ7F–öâ†VÆVÖVçB’° ––b†–çFW'6V7BbbVÆVÖVçBæ–å&ævR‡÷6—F–öâç‚Â÷6—F–öâç’’’° —&WGW&ã° —Ð  —f"6VçFW"ÒVÆVÖVçBævWD6VçFW%ö–çB‚“° —f"F—7Fæ6RÒF—7Fæ6TÖWG&–2‡÷6—F–öâÂ6VçFW"“° ––b†F—7Fæ6RÂÖ–äF—7Fæ6R’° –æV&W7D—FV×2Ò¶VÆVÖVçEÓ° –Ö–äF—7Fæ6RÒF—7Fæ6S° —ÒVÇ6R–b†F—7Fæ6RÓÓÒÖ–äF—7Fæ6R’° ’òò6â†fR×VÇF—ÆR—FV×2BF†R6ÖRF—7Fæ6R–âv†–6‚66RvR6÷'B'’6—¦P –æV&W7D—FV×2çW6‚†VÆVÖVçB“° —Ð —Ò“°  —&WGW&âæV&W7D—FV×3°§Ð ¢ò¢ ¢¢vWBF—7Fæ6RÖWG&–2gVæ7F–öâf÷"Gvòö–çG2&6VBöâF†P¢¢†—2ÖöFR6WGF–æp¢¢&Ò·7G&–æwÒ†—2ÒF†R†—2ÖöFRâ‡Ç—Ç‡¢¢ð¦gVæ7F–öâvWDF—7Fæ6TÖWG&–4f÷$†—2††—2’° —f"W6U‚Ò†—2æ–æFW„öb‚w‚r’ÓÒÓ° —f"W6U’Ò†—2æ–æFW„öb‚w’r’ÓÒÓ°  —&WGW&âgVæ7F–öâ‡CÂC"’° —f"FVÇF‚ÒW6U‚òÖF‚æ'2‡Cç‚ÒC"ç‚’¢° —f"FVÇF’ÒW6U’òÖF‚æ'2‡Cç’ÒC"ç’’¢° —&WGW&âÖF‚ç7'B„ÖF‚ç÷r†FVÇF‚Â"’²ÖF‚ç÷r†FVÇF’Â"’“° —Ó°§Ð ¦gVæ7F–öâ–æFW„ÖöFR†6†'BÂRÂ÷F–öç2’° —f"÷6—F–öâÒvWE&VÆF—fU÷6—F–öâ†RÂ6†'B“° ’òòFVfVÇB†—2f÷"–æFW‚ÖöFR—2w‚rFòÖF6‚öÆB&V†f–÷W  –÷F–öç2æ†—2Ò÷F–öç2æ†—2ÇÂw‚s° —f"F—7Fæ6TÖWG&–2ÒvWDF—7Fæ6TÖWG&–4f÷$†—2†÷F–öç2æ†—2“° —f"—FV×2Ò÷F–öç2æ–çFW'6V7BòvWD–çFW'6V7D—FV×2†6†'BÂ÷6—F–öâ’¢vWDæV&W7D—FV×2†6†'BÂ÷6—F–öâÂfÇ6RÂF—7Fæ6TÖWG&–2“° —f"VÆVÖVçG2ÒµÓ°  ––b‚—FV×2æÆVæwF‚’° —&WGW&âµÓ° —Ð  –6†'BåövWE6÷'FVEf—6–&ÆTFF6WDÖWF2‚’æf÷$V6‚†gVæ7F–öâ†ÖWF’° —f"VÆVÖVçBÒÖWFæFF¶—FV×5³Òåö–æFW…Ó°  ’òòFöâwB6÷VçB—FV×2F†B&R6¶—VB†çVÆÂFF ––b†VÆVÖVçBbbVÆVÖVçBå÷f–Wrç6¶—’° –VÆVÖVçG2çW6‚†VÆVÖVçB“° —Ð —Ò“°  —&WGW&âVÆVÖVçG3°§Ð ¢ò¢ ¢¢–çFW&f6R”–çFW&7F–öä÷F–öç0¢¢ð¢ò¢ ¢¢–bG'VRÂöæÇ’6öç6–FW"—FV×2F†B–çFW'6V7BF†Rö–ç@¢¢æÖR”–çFW&f6T÷F–öç26&ööÆVà¢¢G—R&ööÆVà¢¢ð ¢ò¢ ¢¢6öçF–ç2–çFW&7F–öâ&VÆFVBgVæ7F–öç0¢¢æÖW76R6†'Bä–çFW&7F–öà¢¢ð§f"6÷&Uö–çFW&7F–öâÒ° ’òò†VÇW"gVæ7F–öâf÷"F–ffW&VçBÖöFW0 –ÖöFW3¢° —6–ævÆS¢gVæ7F–öâ†6†'BÂR’° —f"÷6—F–öâÒvWE&VÆF—fU÷6—F–öâ†RÂ6†'B“° —f"VÆVÖVçG2ÒµÓ°  —'6Uf—6–&ÆT—FV×2†6†'BÂgVæ7F–öâ†VÆVÖVçB’° ––b†VÆVÖVçBæ–å&ævR‡÷6—F–öâç‚Â÷6—F–öâç’’’° –VÆVÖVçG2çW6‚†VÆVÖVçB“° —&WGW&âVÆVÖVçG3° —Ð —Ò“°  —&WGW&âVÆVÖVçG2ç6Æ–6RƒÂ“° —ÒÀ  ’ò¢  ’¢gVæ7F–öâ6†'Bä–çFW&7F–öâæÖöFW2æÆ&VÀ ’¢FW&V6FVB6–æ6RfW'6–öâ"ãBã  ’¢FöFò&VÖ÷fRBfW'6–öâ0 ’¢&—fFP ’¢ð –Æ&VÃ¢–æFW„ÖöFRÀ  ’ò¢  ’¢&WGW&ç2—FV×2BF†R6ÖR–æFW‚â–bF†R÷F–öç2æ–çFW'6V7B&ÖWFW"—2G'VRÂvRöæÇ’&WGW&â—FV×2–bvR–çFW'6V7B6öÖWF†–æp ’¢–bF†R÷F–öç2æ–çFW'6V7BÖöFR—2fÇ6RÂvRf–æBF†RæV&W7B—FVÒæB&WGW&âF†R—FV×2BF†R6ÖR–æFW‚2F†B—FVÐ ’¢gVæ7F–öâ6†'Bä–çFW&7F–öâæÖöFW2æ–æFW€ ’¢6–æ6Rc"ãBã  ’¢&Ò´6†'GÒ6†'BÒF†R6†'BvR&R&WGW&æ–ær—FV×2g&öÐ ’¢&Ò´WfVçGÒRÒF†RWfVçBvR&Rf–æBF†–æw2@ ’¢&Ò´”–çFW&7F–öä÷F–öç7Ò÷F–öç2Ò÷F–öç2FòW6RGW&–ær–çFW&7F–öà ’¢&WGW&â´6†'BäVÆVÖVçEµ×Ò'&’öbVÆVÖVçG2F†B&RVæFW"F†Rö–çBâ–bæöæR&Rf÷VæBÂâV×G’'&’—2&WGW&æV@ ’¢ð ––æFWƒ¢–æFW„ÖöFRÀ  ’ò¢  ’¢&WGW&ç2—FV×2–âF†R6ÖRFF6WBâ–bF†R÷F–öç2æ–çFW'6V7B&ÖWFW"—2G'VRÂvRöæÇ’&WGW&â—FV×2–bvR–çFW'6V7B6öÖWF†–æp ’¢–bF†R÷F–öç2æ–çFW'6V7B—2fÇ6RÂvRf–æBF†RæV&W7B—FVÒæB&WGW&âF†R—FV×2–âF†BFF6W@ ’¢gVæ7F–öâ6†'Bä–çFW&7F–öâæÖöFW2æFF6W@ ’¢&Ò´6†'GÒ6†'BÒF†R6†'BvR&R&WGW&æ–ær—FV×2g&öÐ ’¢&Ò´WfVçGÒRÒF†RWfVçBvR&Rf–æBF†–æw2@ ’¢&Ò´”–çFW&7F–öä÷F–öç7Ò÷F–öç2Ò÷F–öç2FòW6RGW&–ær–çFW&7F–öà ’¢&WGW&â´6†'BäVÆVÖVçEµ×Ò'&’öbVÆVÖVçG2F†B&RVæFW"F†Rö–çBâ–bæöæR&Rf÷VæBÂâV×G’'&’—2&WGW&æV@ ’¢ð –FF6WC¢gVæ7F–öâ†6†'BÂRÂ÷F–öç2’° —f"÷6—F–öâÒvWE&VÆF—fU÷6—F–öâ†RÂ6†'B“° –÷F–öç2æ†—2Ò÷F–öç2æ†—2ÇÂw‡’s° —f"F—7Fæ6TÖWG&–2ÒvWDF—7Fæ6TÖWG&–4f÷$†—2†÷F–öç2æ†—2“° —f"—FV×2Ò÷F–öç2æ–çFW'6V7BòvWD–çFW'6V7D—FV×2†6†'BÂ÷6—F–öâ’¢vWDæV&W7D—FV×2†6†'BÂ÷6—F–öâÂfÇ6RÂF—7Fæ6TÖWG&–2“°  ––b†—FV×2æÆVæwF‚â’° –—FV×2Ò6†'BævWDFF6WDÖWF†—FV×5³ÒåöFF6WD–æFW‚’æFF° —Ð  —&WGW&â—FV×3° —ÒÀ  ’ò¢  ’¢gVæ7F–öâ6†'Bä–çFW&7F–öâæÖöFW2ç‚Ö†—0 ’¢FW&V6FVB6–æ6RfW'6–öâ"ãBãâW6R–æFW‚ÖöFRæB–çFW'6V7BÓÒG'VP ’¢FöFò&VÖ÷fRBfW'6–öâ0 ’¢&—fFP ’¢ð ’w‚Ö†—2s¢gVæ7F–öâ†6†'BÂR’° —&WGW&â–æFW„ÖöFR†6†'BÂRÂ¶–çFW'6V7C¢fÇ6WÒ“° —ÒÀ  ’ò¢  ’¢ö–çBÖöFR&WGW&ç2ÆÂVÆVÖVçG2F†B†—BFW7B&6VBöâF†RWfVçB÷6—F–öà ’¢öbF†RWfVç@ ’¢gVæ7F–öâ6†'Bä–çFW&7F–öâæÖöFW2æ–çFW'6V7@ ’¢&Ò´6†'GÒ6†'BÒF†R6†'BvR&R&WGW&æ–ær—FV×2g&öÐ ’¢&Ò´WfVçGÒRÒF†RWfVçBvR&Rf–æBF†–æw2@ ’¢&WGW&â´6†'BäVÆVÖVçEµ×Ò'&’öbVÆVÖVçG2F†B&RVæFW"F†Rö–çBâ–bæöæR&Rf÷VæBÂâV×G’'&’—2&WGW&æV@ ’¢ð —ö–çC¢gVæ7F–öâ†6†'BÂR’° —f"÷6—F–öâÒvWE&VÆF—fU÷6—F–öâ†RÂ6†'B“° —&WGW&âvWD–çFW'6V7D—FV×2†6†'BÂ÷6—F–öâ“° —ÒÀ  ’ò¢  ’¢æV&W7BÖöFR&WGW&ç2F†RVÆVÖVçB6Æ÷6W7BFòF†Rö–ç@ ’¢gVæ7F–öâ6†'Bä–çFW&7F–öâæÖöFW2æ–çFW'6V7@ ’¢&Ò´6†'GÒ6†'BÒF†R6†'BvR&R&WGW&æ–ær—FV×2g&öÐ ’¢&Ò´WfVçGÒRÒF†RWfVçBvR&Rf–æBF†–æw2@ ’¢&Ò´”–çFW&7F–öä÷F–öç7Ò÷F–öç2Ò÷F–öç2FòW6P ’¢&WGW&â´6†'BäVÆVÖVçEµ×Ò'&’öbVÆVÖVçG2F†B&RVæFW"F†Rö–çBâ–bæöæR&Rf÷VæBÂâV×G’'&’—2&WGW&æV@ ’¢ð –æV&W7C¢gVæ7F–öâ†6†'BÂRÂ÷F–öç2’° —f"÷6—F–öâÒvWE&VÆF—fU÷6—F–öâ†RÂ6†'B“° –÷F–öç2æ†—2Ò÷F–öç2æ†—2ÇÂw‡’s° —f"F—7Fæ6TÖWG&–2ÒvWDF—7Fæ6TÖWG&–4f÷$†—2†÷F–öç2æ†—2“° —&WGW&âvWDæV&W7D—FV×2†6†'BÂ÷6—F–öâÂ÷F–öç2æ–çFW'6V7BÂF—7Fæ6TÖWG&–2“° —ÒÀ  ’ò¢  ’¢‚ÖöFR&WGW&ç2F†RVÆVÖVçG2F†B†—B×FW7BBF†R7W'&VçB‚6ö÷&F–æFP ’¢gVæ7F–öâ6†'Bä–çFW&7F–öâæÖöFW2ç€ ’¢&Ò´6†'GÒ6†'BÒF†R6†'BvR&R&WGW&æ–ær—FV×2g&öÐ ’¢&Ò´WfVçGÒRÒF†RWfVçBvR&Rf–æBF†–æw2@ ’¢&Ò´”–çFW&7F–öä÷F–öç7Ò÷F–öç2Ò÷F–öç2FòW6P ’¢&WGW&â´6†'BäVÆVÖVçEµ×Ò'&’öbVÆVÖVçG2F†B&RVæFW"F†Rö–çBâ–bæöæR&Rf÷VæBÂâV×G’'&’—2&WGW&æV@ ’¢ð —ƒ¢gVæ7F–öâ†6†'BÂRÂ÷F–öç2’° —f"÷6—F–öâÒvWE&VÆF—fU÷6—F–öâ†RÂ6†'B“° —f"—FV×2ÒµÓ° —f"–çFW'6V7G4—FVÒÒfÇ6S°  —'6Uf—6–&ÆT—FV×2†6†'BÂgVæ7F–öâ†VÆVÖVçB’° ––b†VÆVÖVçBæ–å…&ævR‡÷6—F–öâç‚’’° –—FV×2çW6‚†VÆVÖVçB“° —Ð  ––b†VÆVÖVçBæ–å&ævR‡÷6—F–öâç‚Â÷6—F–öâç’’’° ––çFW'6V7G4—FVÒÒG'VS° —Ð —Ò“°  ’òò–bvRvçBFòG&–vvW"öââ–çFW'6V7BæBvRFöâwB†fRç’—FV×0 ’òòF†B–çFW'6V7BF†R÷6—F–öâÂ&WGW&âæ÷F†–æp ––b†÷F–öç2æ–çFW'6V7Bbb–çFW'6V7G4—FVÒ’° –—FV×2ÒµÓ° —Ð —&WGW&â—FV×3° —ÒÀ  ’ò¢  ’¢’ÖöFR&WGW&ç2F†RVÆVÖVçG2F†B†—B×FW7BBF†R7W'&VçB’6ö÷&F–æFP ’¢gVæ7F–öâ6†'Bä–çFW&7F–öâæÖöFW2ç ’¢&Ò´6†'GÒ6†'BÒF†R6†'BvR&R&WGW&æ–ær—FV×2g&öÐ ’¢&Ò´WfVçGÒRÒF†RWfVçBvR&Rf–æBF†–æw2@ ’¢&Ò´”–çFW&7F–öä÷F–öç7Ò÷F–öç2Ò÷F–öç2FòW6P ’¢&WGW&â´6†'BäVÆVÖVçEµ×Ò'&’öbVÆVÖVçG2F†B&RVæFW"F†Rö–çBâ–bæöæR&Rf÷VæBÂâV×G’'&’—2&WGW&æV@ ’¢ð —“¢gVæ7F–öâ†6†'BÂRÂ÷F–öç2’° —f"÷6—F–öâÒvWE&VÆF—fU÷6—F–öâ†RÂ6†'B“° —f"—FV×2ÒµÓ° —f"–çFW'6V7G4—FVÒÒfÇ6S°  —'6Uf—6–&ÆT—FV×2†6†'BÂgVæ7F–öâ†VÆVÖVçB’° ––b†VÆVÖVçBæ–å•&ævR‡÷6—F–öâç’’’° –—FV×2çW6‚†VÆVÖVçB“° —Ð  ––b†VÆVÖVçBæ–å&ævR‡÷6—F–öâç‚Â÷6—F–öâç’’’° ––çFW'6V7G4—FVÒÒG'VS° —Ð —Ò“°  ’òò–bvRvçBFòG&–vvW"öââ–çFW'6V7BæBvRFöâwB†fRç’—FV×0 ’òòF†B–çFW'6V7BF†R÷6—F–öâÂ&WGW&âæ÷F†–æp ––b†÷F–öç2æ–çFW'6V7Bbb–çFW'6V7G4—FVÒ’° –—FV×2ÒµÓ° —Ð —&WGW&â—FV×3° —Ð —Ð§Ó° §f"W‡FVæBÒ†VÇW'2CæW‡FVæC° ¦gVæ7F–öâf–ÇFW$'•÷6—F–öâ†'&’Â÷6—F–öâ’° —&WGW&â†VÇW'2Cçv†W&R†'&’ÂgVæ7F–öâ‡b’° —&WGW&âbç÷2ÓÓÒ÷6—F–öã° —Ò“°§Ð ¦gVæ7F–öâ6÷'D'•vV–v‡B†'&’Â&WfW'6R’° —&WGW&â'&’ç6÷'B†gVæ7F–öâ†Â"’° —f"cÒ&WfW'6Rò"¢° —f"cÒ&WfW'6Rò¢#° —&WGW&âcçvV–v‡BÓÓÒcçvV–v‡Bð —cæ–æFW‚Òcæ–æFW‚  —cçvV–v‡BÒcçvV–v‡C° —Ò“°§Ð ¦gVæ7F–öâw&&÷†W2†&÷†W2’° —f"Æ–÷WD&÷†W2ÒµÓ° —f"’Â–ÆVâÂ&÷ƒ°  –f÷"†’ÒÂ–ÆVâÒ†&÷†W2ÇÂµÒ’æÆVæwFƒ²’Â–ÆVã²²¶’’° –&÷‚Ò&÷†W5¶•Ó° –Æ–÷WD&÷†W2çW6‚‡° ––æFWƒ¢’À –&÷ƒ¢&÷‚À —÷3¢&÷‚ç÷6—F–öâÀ –†÷&—¦öçFÃ¢&÷‚æ—4†÷&—¦öçFÂ‚’À —vV–v‡C¢&÷‚çvV–v‡@ —Ò“° —Ð —&WGW&âÆ–÷WD&÷†W3°§Ð ¦gVæ7F–öâ6WDÆ–÷WDF–×2†Æ–÷WG2Â&×2’° —f"’Â–ÆVâÂÆ–÷WC° –f÷"†’ÒÂ–ÆVâÒÆ–÷WG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –Æ–÷WBÒÆ–÷WG5¶•Ó° ’òò7F÷&Rv–GF‚W6VB–ç7FVBöb6†'D&Vçr–âf—D&÷†W0 –Æ–÷WBçv–GF‚ÒÆ–÷WBæ†÷&—¦öçFÀ “òÆ–÷WBæ&÷‚ægVÆÅv–GF‚bb&×2æf–Æ&ÆUv–GF€ “¢&×2çd&÷„Ö…v–GFƒ° ’òò7F÷&R†V–v‡BW6VB–ç7FVBöb6†'D&Væ‚–âf—D&÷†W0 –Æ–÷WBæ†V–v‡BÒÆ–÷WBæ†÷&—¦öçFÂbb&×2æ„&÷„Ö„†V–v‡C° —Ð§Ð ¦gVæ7F–öâ'V–ÆDÆ–÷WD&÷†W2†&÷†W2’° —f"Æ–÷WD&÷†W2Òw&&÷†W2†&÷†W2“° —f"ÆVgBÒ6÷'D'•vV–v‡B†f–ÇFW$'•÷6—F–öâ†Æ–÷WD&÷†W2ÂvÆVgBr’ÂG'VR“° —f"&–v‡BÒ6÷'D'•vV–v‡B†f–ÇFW$'•÷6—F–öâ†Æ–÷WD&÷†W2Âw&–v‡Br’“° —f"F÷Ò6÷'D'•vV–v‡B†f–ÇFW$'•÷6—F–öâ†Æ–÷WD&÷†W2ÂwF÷r’ÂG'VR“° —f"&÷GFöÒÒ6÷'D'•vV–v‡B†f–ÇFW$'•÷6—F–öâ†Æ–÷WD&÷†W2Âv&÷GFöÒr’“°  —&WGW&â° –ÆVgDæEF÷¢ÆVgBæ6öæ6B‡F÷’À —&–v‡DæD&÷GFöÓ¢&–v‡Bæ6öæ6B†&÷GFöÒ’À –6†'D&V¢f–ÇFW$'•÷6—F–öâ†Æ–÷WD&÷†W2Âv6†'D&Vr’À —fW'F–6Ã¢ÆVgBæ6öæ6B‡&–v‡B’À –†÷&—¦öçFÃ¢F÷æ6öæ6B†&÷GFöÒ —Ó°§Ð ¦gVæ7F–öâvWD6öÖ&–æVDÖ‚†Ö…FF–ærÂ6†'D&VÂÂ"’° —&WGW&âÖF‚æÖ‚†Ö…FF–æu¶ÒÂ6†'D&V¶Ò’²ÖF‚æÖ‚†Ö…FF–æu¶%ÒÂ6†'D&V¶%Ò“°§Ð ¦gVæ7F–öâWFFTF–×2†6†'D&VÂ&×2ÂÆ–÷WB’° —f"&÷‚ÒÆ–÷WBæ&÷ƒ° —f"Ö…FF–ærÒ6†'D&VæÖ…FF–æs° —f"æWuv–GF‚ÂæWt†V–v‡C°  ––b†Æ–÷WBç6—¦R’° ’òòF†—2Æ–÷WBv2Ç&VG’6÷VçFVBf÷"ÂÆWG2f—'7B&VGV6RöÆB6—¦P –6†'D&V¶Æ–÷WBç÷5ÒÓÒÆ–÷WBç6—¦S° —Ð –Æ–÷WBç6—¦RÒÆ–÷WBæ†÷&—¦öçFÂò&÷‚æ†V–v‡B¢&÷‚çv–GFƒ° –6†'D&V¶Æ–÷WBç÷5Ò³ÒÆ–÷WBç6—¦S°  ––b†&÷‚ævWEFF–ær’° —f"&÷…FF–ærÒ&÷‚ævWEFF–ær‚“° –Ö…FF–ærçF÷ÒÖF‚æÖ‚†Ö…FF–ærçF÷Â&÷…FF–ærçF÷“° –Ö…FF–æræÆVgBÒÖF‚æÖ‚†Ö…FF–æræÆVgBÂ&÷…FF–æræÆVgB“° –Ö…FF–æræ&÷GFöÒÒÖF‚æÖ‚†Ö…FF–æræ&÷GFöÒÂ&÷…FF–æræ&÷GFöÒ“° –Ö…FF–ærç&–v‡BÒÖF‚æÖ‚†Ö…FF–ærç&–v‡BÂ&÷…FF–ærç&–v‡B“° —Ð  –æWuv–GF‚Ò&×2æ÷WFW%v–GF‚ÒvWD6öÖ&–æVDÖ‚†Ö…FF–ærÂ6†'D&VÂvÆVgBrÂw&–v‡Br“° –æWt†V–v‡BÒ&×2æ÷WFW$†V–v‡BÒvWD6öÖ&–æVDÖ‚†Ö…FF–ærÂ6†'D&VÂwF÷rÂv&÷GFöÒr“°  ––b†æWuv–GF‚ÓÒ6†'D&VçrÇÂæWt†V–v‡BÓÒ6†'D&Væ‚’° –6†'D&VçrÒæWuv–GFƒ° –6†'D&Væ‚ÒæWt†V–v‡C°  ’òò&WGW&âG'VR–b6†'B&V6†ævVB–âÆ–÷WBw2F—&V7F–öà —&WGW&âÆ–÷WBæ†÷&—¦öçFÂòæWuv–GF‚ÓÒ6†'D&Vçr¢æWt†V–v‡BÓÒ6†'D&Væƒ° —Ð§Ð ¦gVæ7F–öâ†æFÆTÖ…FF–ær†6†'D&V’° —f"Ö…FF–ærÒ6†'D&VæÖ…FF–æs°  –gVæ7F–öâWFFU÷2‡÷2’° —f"6†ævRÒÖF‚æÖ‚†Ö…FF–æu·÷5ÒÒ6†'D&V·÷5ÒÂ“° –6†'D&V·÷5Ò³Ò6†ævS° —&WGW&â6†ævS° —Ð –6†'D&Vç’³ÒWFFU÷2‚wF÷r“° –6†'D&Vç‚³ÒWFFU÷2‚vÆVgBr“° —WFFU÷2‚w&–v‡Br“° —WFFU÷2‚v&÷GFöÒr“°§Ð ¦gVæ7F–öâvWDÖ&v–ç2††÷&—¦öçFÂÂ6†'D&V’° —f"Ö…FF–ærÒ6†'D&VæÖ…FF–æs°  –gVæ7F–öâÖ&v–äf÷%÷6—F–öç2‡÷6—F–öç2’° —f"Ö&v–âÒ¶ÆVgC¢ÂF÷¢Â&–v‡C¢Â&÷GFöÓ¢Ó° —÷6—F–öç2æf÷$V6‚†gVæ7F–öâ‡÷2’° –Ö&v–å·÷5ÒÒÖF‚æÖ‚†6†'D&V·÷5ÒÂÖ…FF–æu·÷5Ò“° —Ò“° —&WGW&âÖ&v–ã° —Ð  —&WGW&â†÷&—¦öçFÀ “òÖ&v–äf÷%÷6—F–öç2…²vÆVgBrÂw&–v‡BuÒ “¢Ö&v–äf÷%÷6—F–öç2…²wF÷rÂv&÷GFöÒuÒ“°§Ð ¦gVæ7F–öâf—D&÷†W2†&÷†W2Â6†'D&VÂ&×2’° —f"&Vf—D&÷†W2ÒµÓ° —f"’Â–ÆVâÂÆ–÷WBÂ&÷‚Â&Vf—BÂ6†ævVC°  –f÷"†’ÒÂ–ÆVâÒ&÷†W2æÆVæwFƒ²’Â–ÆVã²²¶’’° –Æ–÷WBÒ&÷†W5¶•Ó° –&÷‚ÒÆ–÷WBæ&÷ƒ°  –&÷‚çWFFR€ –Æ–÷WBçv–GF‚ÇÂ6†'D&VçrÀ –Æ–÷WBæ†V–v‡BÇÂ6†'D&Væ‚À –vWDÖ&v–ç2†Æ–÷WBæ†÷&—¦öçFÂÂ6†'D&V ’“° ––b‡WFFTF–×2†6†'D&VÂ&×2ÂÆ–÷WB’’° –6†ævVBÒG'VS° ––b‡&Vf—D&÷†W2æÆVæwF‚’° ’òòF–ÖVç6–öç26†ævVBæBF†W&RvW&RæöâgVÆÂv–GF‚&÷†W2&Vf÷&RF†—0 ’òòÓâvR†fRFò&Vf—BF†÷6P —&Vf—BÒG'VS° —Ð —Ð ––b‚&÷‚ægVÆÅv–GF‚’²òògVÆÅv–GF‚&÷†W2FöâwBæVVBFò&R&RÖf—GFVB–âç’66P —&Vf—D&÷†W2çW6‚†Æ–÷WB“° —Ð —Ð  —&WGW&â&Vf—Bòf—D&÷†W2‡&Vf—D&÷†W2Â6†'D&VÂ&×2’ÇÂ6†ævVB¢6†ævVC°§Ð ¦gVæ7F–öâÆ6T&÷†W2†&÷†W2Â6†'D&VÂ&×2’° —f"W6W%FF–ærÒ&×2çFF–æs° —f"‚Ò6†'D&Vçƒ° —f"’Ò6†'D&Vç“° —f"’Â–ÆVâÂÆ–÷WBÂ&÷ƒ°  –f÷"†’ÒÂ–ÆVâÒ&÷†W2æÆVæwFƒ²’Â–ÆVã²²¶’’° –Æ–÷WBÒ&÷†W5¶•Ó° –&÷‚ÒÆ–÷WBæ&÷ƒ° ––b†Æ–÷WBæ†÷&—¦öçFÂ’° –&÷‚æÆVgBÒ&÷‚ægVÆÅv–GF‚òW6W%FF–æræÆVgB¢6†'D&VæÆVgC° –&÷‚ç&–v‡BÒ&÷‚ægVÆÅv–GF‚ò&×2æ÷WFW%v–GF‚ÒW6W%FF–ærç&–v‡B¢6†'D&VæÆVgB²6†'D&Vçs° –&÷‚çF÷Ò“° –&÷‚æ&÷GFöÒÒ’²&÷‚æ†V–v‡C° –&÷‚çv–GF‚Ò&÷‚ç&–v‡BÒ&÷‚æÆVgC° —’Ò&÷‚æ&÷GFöÓ° —ÒVÇ6R° –&÷‚æÆVgBÒƒ° –&÷‚ç&–v‡BÒ‚²&÷‚çv–GFƒ° –&÷‚çF÷Ò6†'D&VçF÷° –&÷‚æ&÷GFöÒÒ6†'D&VçF÷²6†'D&Væƒ° –&÷‚æ†V–v‡BÒ&÷‚æ&÷GFöÒÒ&÷‚çF÷° —‚Ò&÷‚ç&–v‡C° —Ð —Ð  –6†'D&Vç‚Òƒ° –6†'D&Vç’Ò“°§Ð ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –Æ–÷WC¢° —FF–æs¢° —F÷¢À —&–v‡C¢À –&÷GFöÓ¢À –ÆVgC¢  —Ð —Ð§Ò“° ¢ò¢ ¢¢–çFW&f6R”Æ–÷WD—FVÐ¢¢&÷·7G&–æwÒ÷6—F–öâÒF†R÷6—F–öâöbF†R—FVÒ–âF†R6†'BÆ–÷WBâ÷76–&ÆRfÇVW2&P¢¢vÆVgBrÂwF÷rÂw&–v‡BrÂv&÷GFöÒrÂæBv6†'D&Vp¢¢&÷¶çVÖ&W'ÒvV–v‡BÒF†RvV–v‡BW6VBFò6÷'BF†R—FVÒâ†–v†W"vV–v‡G2&RgW'F†W"v’g&öÒF†R6†'B&V¢¢&÷¶&ööÆVçÒgVÆÅv–GF‚Ò–bG'VRÂæBF†R—FVÒ—2†÷&—¦öçFÂÂF†VâW6‚fW'F–6Â&÷†W2F÷và¢¢&÷¶gVæ7F–öçÒ—4†÷&—¦öçFÂÒ&WGW&ç2G'VR–bF†RÆ–÷WB—FVÒ—2†÷&—¦öçFÂ†–RâF÷÷"&÷GFöÒ¢¢&÷¶gVæ7F–öçÒWFFRÒF¶W2Gvò&ÖWFW'3¢v–GF‚æB†V–v‡Bâ&WGW&ç26—¦Röb—FVÐ¢¢&÷¶gVæ7F–öçÒvWEFF–ærÒ&WGW&ç2âö&¦V7Bv—F‚FF–æröâF†RVFvW0¢¢&÷¶çVÖ&W'Òv–GF‚Òv–GF‚öb—FVÒâ×W7B&RfÆ–BgFW"WFFR‚¢¢&÷¶çVÖ&W'Ò†V–v‡BÒ†V–v‡Böb—FVÒâ×W7B&RfÆ–BgFW"WFFR‚¢¢&÷¶çVÖ&W'ÒÆVgBÒÆVgBVFvRöbF†R—FVÒâ6WB'’Æ–÷WB7—7FVÒæB6ææ÷B&RW6VB–âWFFP¢¢&÷¶çVÖ&W'ÒF÷ÒF÷VFvRöbF†R—FVÒâ6WB'’Æ–÷WB7—7FVÒæB6ææ÷B&RW6VB–âWFFP¢¢&÷¶çVÖ&W'Ò&–v‡BÒ&–v‡BVFvRöbF†R—FVÒâ6WB'’Æ–÷WB7—7FVÒæB6ææ÷B&RW6VB–âWFFP¢¢&÷¶çVÖ&W'Ò&÷GFöÒÒ&÷GFöÒVFvRöbF†R—FVÒâ6WB'’Æ–÷WB7—7FVÒæB6ææ÷B&RW6VB–âWFFP¢¢ð ¢òòF†RÆ–÷WB6W'f–6R—2fW'’6VÆbW‡ÆæF÷'’â—Bw2&W7öç6–&ÆRf÷"F†RÆ–÷WBv—F†–â6†'Bà¢òò66ÆW2ÂÆVvVæG2æBÇVv–ç2ÆÂ&VÇ’öâF†RÆ–÷WB6W'f–6RæB6âV6–Ç’&Vv—7FW"Fò&RÆ6VBç—v†W&RF†W’æVV@¢òò—B—2F†—26W'f–6Rw2&W7öç6–&–Æ—G’öb6''––ær÷WBF†BÆ–÷WBà§f"6÷&UöÆ–÷WG2Ò° –FVfVÇG3¢·ÒÀ  ’ò¢  ’¢&Vv—7FW"&÷‚Fò6†'Bà ’¢&÷‚—26–×Ç’&VfW&Væ6RFòâö&¦V7BF†B&WV—&W2Æ–÷WBâVrâ66ÆW2ÂÆVvVæBÂF—FÆRà ’¢&Ò´6†'GÒ6†'BÒF†R6†'BFòW6P ’¢&Ò´”Æ–÷WD—FV×Ò—FVÒÒF†R—FVÒFòFBFò&RÆ–VB÷W@ ’¢ð –FD&÷ƒ¢gVæ7F–öâ†6†'BÂ—FVÒ’° ––b‚6†'Bæ&÷†W2’° –6†'Bæ&÷†W2ÒµÓ° —Ð  ’òò–æ—F–Æ—¦R—FVÒv—F‚FVfVÇBfÇVW0 –—FVÒægVÆÅv–GF‚Ò—FVÒægVÆÅv–GF‚ÇÂfÇ6S° –—FVÒç÷6—F–öâÒ—FVÒç÷6—F–öâÇÂwF÷s° –—FVÒçvV–v‡BÒ—FVÒçvV–v‡BÇÂ° –—FVÒåöÆ–W'2Ò—FVÒåöÆ–W'2ÇÂgVæ7F–öâ‚’° —&WGW&â·° —£¢À –G&s¢gVæ7F–öâ‚’° –—FVÒæG&ræÇ’†—FVÒÂ&wVÖVçG2“° —Ð —ÕÓ° —Ó°  –6†'Bæ&÷†W2çW6‚†—FVÒ“° —ÒÀ  ’ò¢  ’¢&VÖ÷fRÆ–÷WD—FVÒg&öÒ6†'@ ’¢&Ò´6†'GÒ6†'BÒF†R6†'BFò&VÖ÷fRF†R&÷‚g&öÐ ’¢&Ò´”Æ–÷WD—FV×ÒÆ–÷WD—FVÒÒF†R—FVÒFò&VÖ÷fRg&öÒF†RÆ–÷W@ ’¢ð —&VÖ÷fT&÷ƒ¢gVæ7F–öâ†6†'BÂÆ–÷WD—FVÒ’° —f"–æFW‚Ò6†'Bæ&÷†W2ò6†'Bæ&÷†W2æ–æFW„öb†Æ–÷WD—FVÒ’¢Ó° ––b†–æFW‚ÓÒÓ’° –6†'Bæ&÷†W2ç7Æ–6R†–æFW‚Â“° —Ð —ÒÀ  ’ò¢  ’¢6WG2†÷"WFFW2’÷F–öç2öâF†Rv—fVâ—FVÖà ’¢&Ò´6†'GÒ6†'BÒF†R6†'B–âv†–6‚F†R—FVÒÆ—fW2†÷"v–ÆÂ&RFFVBFò ’¢&Ò´”Æ–÷WD—FV×Ò—FVÒÒF†R—FVÒFò6öæf–wW&Rv—F‚F†Rv—fVâ÷F–öç0 ’¢&Ò¶ö&¦V7GÒ÷F–öç2ÒF†RæWr—FVÒ÷F–öç2à ’¢ð –6öæf–wW&S¢gVæ7F–öâ†6†'BÂ—FVÒÂ÷F–öç2’° —f"&÷2Ò²vgVÆÅv–GF‚rÂw÷6—F–öârÂwvV–v‡BuÓ° —f"–ÆVâÒ&÷2æÆVæwFƒ° —f"’Ò° —f"&÷°  –f÷"ƒ²’Â–ÆVã²²¶’’° —&÷Ò&÷5¶•Ó° ––b†÷F–öç2æ†4÷vå&÷W'G’‡&÷’’° –—FVÕ·&÷ÒÒ÷F–öç5·&÷Ó° —Ð —Ð —ÒÀ  ’ò¢  ’¢f—G2&÷†W2öbF†Rv—fVâ6†'B–çFòF†Rv—fVâ6—¦R'’†f–ærV6‚&÷‚ÖV7W&R—G6VÆ` ’¢F†Vâ'Vææ–ærf—GF–ærÆv÷&—F†Ð ’¢&Ò´6†'GÒ6†'BÒF†R6†'@ ’¢&Ò¶çVÖ&W'Òv–GF‚ÒF†Rv–GF‚Fòf—B–çFð ’¢&Ò¶çVÖ&W'Ò†V–v‡BÒF†R†V–v‡BFòf—B–çFð ’¢ð —WFFS¢gVæ7F–öâ†6†'BÂv–GF‚Â†V–v‡B’° ––b‚6†'B’° —&WGW&ã° —Ð  —f"Æ–÷WD÷F–öç2Ò6†'Bæ÷F–öç2æÆ–÷WBÇÂ·Ó° —f"FF–ærÒ†VÇW'2Cæ÷F–öç2çFõFF–ær†Æ–÷WD÷F–öç2çFF–ær“°  —f"f–Æ&ÆUv–GF‚Òv–GF‚ÒFF–ærçv–GFƒ° —f"f–Æ&ÆT†V–v‡BÒ†V–v‡BÒFF–æræ†V–v‡C° —f"&÷†W2Ò'V–ÆDÆ–÷WD&÷†W2†6†'Bæ&÷†W2“° —f"fW'F–6Ä&÷†W2Ò&÷†W2çfW'F–6Ã° —f"†÷&—¦öçFÄ&÷†W2Ò&÷†W2æ†÷&—¦öçFÃ°  ’òòW76VçF–ÆÇ’vRæ÷r†fRç’çVÖ&W"öb&÷†W2öâV6‚öbF†RB6–FW2à ’òò÷W"6çf2Æöö·2Æ–¶RF†RföÆÆ÷v–ærà ’òòF†R&V2ÃæBÃ"&RF†RÆVgB†W2â#—2F†R&–v‡B†—2ÂC—2F†RF÷†—2æ@ ’òò#—2F†R&÷GFöÒ†—0 ’òòF†W&R&RÇ6òBVG&çBÖÆ–¶RÆö6F–öç2†ÆVgBFò&–v‡B–ç7FVBöb6Æö6·v—6R’&W6W'fVBf÷"6†'B÷fW&Æ—0 ’òòF†W6RÆö6F–öç2&R6–ævÆRÖ&÷‚Æö6F–öç2öæÇ’Âv†VâG'––ærFò&Vv—7FW"6†'D&VÆö6F–öâF†B—2Ç&VG’F¶VâÀ ’òòâW'&÷"v–ÆÂ&RF‡&÷vâà ’òð ’òòÂÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒ×À ’òòÂC„gVÆÂv–GF‚’À ’òòÂÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒ×À ’òòÂÂÂC"ÂÀ ’òòÂÂÒÒÒ×ÂÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒ×ÂÒÒÒ×À ’òòÂÂÂ3ÂÂ3"ÂÀ ’òòÂÂÂÒÒÒ×ÂÂÒÒÒ×ÂÀ ’òòÂÂÂÂÀ ’òòÂÃÂÃ"Â6†'D&V„3’Â#À ’òòÂÂÂÂÀ ’òòÂÂÂÒÒÒ×ÂÂÒÒÒ×ÂÀ ’òòÂÂÂ32ÂÂ3BÂÀ ’òòÂÂÒÒÒ×ÂÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒ×ÂÒÒÒ×À ’òòÂÂÂ#ÂÀ ’òòÂÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒ×À ’òòÂ#"„gVÆÂv–GF‚’À ’òòÂÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒÒ×À ’òð  —f"&×2Òö&¦V7Bæg&VW¦R‡° –÷WFW%v–GFƒ¢v–GF‚À –÷WFW$†V–v‡C¢†V–v‡BÀ —FF–æs¢FF–ærÀ –f–Æ&ÆUv–GFƒ¢f–Æ&ÆUv–GF‚À —d&÷„Ö…v–GFƒ¢f–Æ&ÆUv–GF‚ò"òfW'F–6Ä&÷†W2æÆVæwF‚À –„&÷„Ö„†V–v‡C¢f–Æ&ÆT†V–v‡Bò  —Ò“° —f"6†'D&VÒW‡FVæB‡° –Ö…FF–æs¢W‡FVæB‡·ÒÂFF–ær’À —s¢f–Æ&ÆUv–GF‚À –ƒ¢f–Æ&ÆT†V–v‡BÀ —ƒ¢FF–æræÆVgBÀ —“¢FF–ærçF÷  —ÒÂFF–ær“°  —6WDÆ–÷WDF–×2‡fW'F–6Ä&÷†W2æ6öæ6B††÷&—¦öçFÄ&÷†W2’Â&×2“°  ’òòf—'7Bf—BfW'F–6Â&÷†W0 –f—D&÷†W2‡fW'F–6Ä&÷†W2Â6†'D&VÂ&×2“°  ’òòF†Vâf—B†÷&—¦öçFÂ&÷†W0 ––b†f—D&÷†W2††÷&—¦öçFÄ&÷†W2Â6†'D&VÂ&×2’’° ’òò–bF†R&V6†ævVBÂ&RÖf—BfW'F–6Â&÷†W0 –f—D&÷†W2‡fW'F–6Ä&÷†W2Â6†'D&VÂ&×2“° —Ð  –†æFÆTÖ…FF–ær†6†'D&V“°  ’òòf–æÆÇ’Æ6RF†R&÷†W2Fò6÷'&V7B6ö÷&F–æFW0 —Æ6T&÷†W2†&÷†W2æÆVgDæEF÷Â6†'D&VÂ&×2“°  ’òòÖ÷fRFò÷÷6—FR6–FRöb6†'@ –6†'D&Vç‚³Ò6†'D&Vçs° –6†'D&Vç’³Ò6†'D&Væƒ°  —Æ6T&÷†W2†&÷†W2ç&–v‡DæD&÷GFöÒÂ6†'D&VÂ&×2“°  –6†'Bæ6†'D&VÒ° –ÆVgC¢6†'D&VæÆVgBÀ —F÷¢6†'D&VçF÷À —&–v‡C¢6†'D&VæÆVgB²6†'D&VçrÀ –&÷GFöÓ¢6†'D&VçF÷²6†'D&Væ€ —Ó°  ’òòf–æÆÇ’WFFR&÷†W2–â6†'D&V‡&F–Â66ÆRf÷"W†×ÆR –†VÇW'2CæV6‚†&÷†W2æ6†'D&VÂgVæ7F–öâ†Æ–÷WB’° —f"&÷‚ÒÆ–÷WBæ&÷ƒ° –W‡FVæB†&÷‚Â6†'Bæ6†'D&V“° –&÷‚çWFFR†6†'D&VçrÂ6†'D&Væ‚“° —Ò“° —Ð§Ó° ¢ò¢ ¢¢ÆFf÷&ÒfÆÆ&6²–×ÆVÖVçFF–öâ†Ö–æ–ÖÂ’à¢¢6VR‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2÷VÆÂóCS“6—77VV6öÖÖVçBÓ3“SsS“3¢¢ð §f"ÆFf÷&Õö&6–2Ò° –7V—&T6öçFW‡C¢gVæ7F–öâ†—FVÒ’° ––b†—FVÒbb—FVÒæ6çf2’° ’òò7W÷'Bf÷"ç’ö&¦V7B76ö6–FVBFò6çf2†–æ6ÇVF–ær6öçFW‡C&B –—FVÒÒ—FVÒæ6çf3° —Ð  —&WGW&â—FVÒbb—FVÒævWD6öçFW‡B‚s&Br’ÇÂçVÆÃ° —Ð§Ó° §f"ÆFf÷&ÕöFöÒÒ"ò¥Æâ¢DôÒVÆVÖVçB&VæFW&–ærFWFV7F–öåÆâ¢‡GG3¢òöFf–GvÇ6‚ææÖRöFWFV7BÖæöFRÖ–ç6W'F–öåÆâ¢õÆä¶W–g&ÖW26†'F§2×&VæFW"Öæ–ÖF–öâµÆåÇFg&öÒ²÷6—G“¢ã““²ÕÆåÇGFò²÷6—G“¢²ÕÆçÕÆåÆâæ6†'F§2×&VæFW"ÖÖöæ—F÷"µÆåÇFæ–ÖF–öã¢6†'F§2×&VæFW"Öæ–ÖF–öâã3µÆçÕÆåÆâò¥Æâ¢DôÒVÆVÖVçB&W6—¦–ærFWFV7F–öåÆâ¢‡GG3¢òöv—F‡V"æ6öÒöÖ&6¢ö772ÖVÆVÖVçB×VW&–W5Æâ¢õÆâæ6†'F§2×6—¦RÖÖöæ—F÷"ÅÆâæ6†'F§2×6—¦RÖÖöæ—F÷"ÖW‡æBÅÆâæ6†'F§2×6—¦RÖÖöæ—F÷"×6‡&–æ²µÆåÇG÷6—F–öã¢'6öÇWFSµÆåÇFF—&V7F–öã¢ÇG#µÆåÇFÆVgC¢µÆåÇGF÷¢µÆåÇG&–v‡C¢µÆåÇF&÷GFöÓ¢µÆåÇF÷fW&fÆ÷s¢†–FFVãµÆåÇGö–çFW"ÖWfVçG3¢æöæSµÆåÇGf—6–&–Æ—G“¢†–FFVãµÆåÇG¢Ö–æFWƒ¢ÓµÆçÕÆåÆâæ6†'F§2×6—¦RÖÖöæ—F÷"ÖW‡æBâF—bµÆåÇG÷6—F–öã¢'6öÇWFSµÆåÇGv–GFƒ¢ƒµÆåÇF†V–v‡C¢ƒµÆåÇFÆVgC¢µÆåÇGF÷¢µÆçÕÆåÆâæ6†'F§2×6—¦RÖÖöæ—F÷"×6‡&–æ²âF—bµÆåÇG÷6—F–öã¢'6öÇWFSµÆåÇGv–GFƒ¢#SµÆåÇF†V–v‡C¢#SµÆåÇFÆVgC¢µÆåÇGF÷¢µÆçÕÆâ#° §f"ÆFf÷&ÕöFöÒCÒò¢5õõU$Uõò¢ôö&¦V7Bæg&VW¦R‡°¥õ÷&÷Fõõó¢çVÆÂÀ¢vFVfVÇBs¢ÆFf÷&ÕöFöÐ§Ò“° §f"7G–ÆW6†VWBÒvWD6§4W‡÷'Dg&öÔæÖW76R‡ÆFf÷&ÕöFöÒC“° §f"U…äDõô´U’ÒrF6†'F§2s°§f"555õ$Td•‚Òv6†'F§2Òs°§f"555õ4•¤UôÔôä•Dõ"Ò555õ$Td•‚²w6—¦RÖÖöæ—F÷"s°§f"555õ$TäDU%ôÔôä•Dõ"Ò555õ$Td•‚²w&VæFW"ÖÖöæ—F÷"s°§f"555õ$TäDU%ôä”ÔD”ôâÒ555õ$Td•‚²w&VæFW"Öæ–ÖF–öâs°§f"ä”ÔD”ôåõ5D%EôUdTåE2Ò²væ–ÖF–öç7F'BrÂwvV&¶—Dæ–ÖF–öå7F'BuÓ° ¢ò¢ ¢¢DôÒWfVçBG—W2Óâ6†'Bæ§2WfVçBG—W2à¢¢æ÷FS¢öæÇ’WfVçG2v—F‚F–ffW&VçBG—W2&RÖVBà¢¢6VR‡GG3¢òöFWfVÆ÷W"æÖ÷¦–ÆÆæ÷&röVâÕU2öFö72õvV"ôWfVçG0¢¢ð§f"UdTåEõE•U2Ò° —F÷V6‡7F'C¢vÖ÷W6VF÷vârÀ —F÷V6†Ö÷fS¢vÖ÷W6VÖ÷fRrÀ —F÷V6†VæC¢vÖ÷W6WWrÀ —ö–çFW&VçFW#¢vÖ÷W6VVçFW"rÀ —ö–çFW&F÷vã¢vÖ÷W6VF÷vârÀ —ö–çFW&Ö÷fS¢vÖ÷W6VÖ÷fRrÀ —ö–çFW'W¢vÖ÷W6WWrÀ —ö–çFW&ÆVfS¢vÖ÷W6V÷WBrÀ —ö–çFW&÷WC¢vÖ÷W6V÷WBp§Ó° ¢ò¢ ¢¢F†R'W6VB"6—¦R—2F†Rf–æÂfÇVRöbF–ÖVç6–öâ&÷W'G’gFW"ÆÂ6Æ7VÆF–öç2†fP¢¢&VVâW&f÷&ÖVBâF†—2ÖWF†öBW6W2F†R6ö×WFVB7G–ÆRöbVÆVÖVçF'WB&WGW&ç2VæFVf–æV@¢¢–bF†R6ö×WFVB7G–ÆR—2æ÷BW‡&W76VB–â—†VÇ2âF†B6â†Vâ–â6öÖR66W2v†W&P¢¢VÆVÖVçF†26—¦R&VÆF—fRFò—G2&VçBæBF†—2Æ7BöæR—2æ÷B–WBF—7Æ–VBÀ¢¢f÷"W†×ÆR&V6W6RöbF—7Æ“¢æöæVöâ&VçBæöFRà¢¢6VR‡GG3¢òöFWfVÆ÷W"æÖ÷¦–ÆÆæ÷&röVâÕU2öFö72õvV"ô552÷W6VE÷fÇVP¢¢&WGW&ç2¶çVÖ&W'Ò6—¦R–â—†VÇ2÷"VæFVf–æVB–bVæ¶æ÷vâà¢¢ð¦gVæ7F–öâ&VEW6VE6—¦R†VÆVÖVçBÂ&÷W'G’’° —f"fÇVRÒ†VÇW'2CævWE7G–ÆR†VÆVÖVçBÂ&÷W'G’“° —f"ÖF6†W2ÒfÇVRbbfÇVRæÖF6‚‚õâ…ÆB²’…ÂåÆB²“÷‚Bò“° —&WGW&âÖF6†W2òçVÖ&W"†ÖF6†W5³Ò’¢VæFVf–æVC°§Ð ¢ò¢ ¢¢–æ—F–Æ—¦W2F†R6çf27G–ÆRæB&VæFW"6—¦Rv—F†÷WBÖöF–g––ærF†R6çf2F—7Æ’6—¦RÀ¢¢6–æ6R&W7öç6—fVæW72—2†æFÆVB'’F†R6öçG&öÆÆW"ç&W6—¦R‚’ÖWF†öBâF†R6öæf–r—2W6V@¢¢FòFWFW&Ö–æRF†R7V7B&F–òFòÇ’–â66RæòW‡Æ–6—B†V–v‡B†2&VVâ7V6–f–VBà¢¢ð¦gVæ7F–öâ–æ—D6çf2†6çf2Â6öæf–r’° —f"7G–ÆRÒ6çf2ç7G–ÆS°  ’òòäõDR…4"’6çf2ævWDGG&–'WFR‚wv–GF‚r’ÓÒ6çf2çv–GFƒ¢–âF†Rf—'7B66R—@ ’òò&WGW&ç2çVÆÂ÷"rr–bæòW‡Æ–6—BfÇVR†2&VVâ6WBFòF†R6çf2GG&–'WFRà —f"&VæFW$†V–v‡BÒ6çf2ævWDGG&–'WFR‚v†V–v‡Br“° —f"&VæFW%v–GF‚Ò6çf2ævWDGG&–'WFR‚wv–GF‚r“°  ’òò6†'Bæ§2ÖöF–f–W26öÖR6çf2fÇVW2F†BvRvçBFò&W7F÷&RöâFW7G&÷ –6çf5´U…äDõô´U•ÒÒ° ––æ—F–Ã¢° –†V–v‡C¢&VæFW$†V–v‡BÀ —v–GFƒ¢&VæFW%v–GF‚À —7G–ÆS¢° –F—7Æ“¢7G–ÆRæF—7Æ’À –†V–v‡C¢7G–ÆRæ†V–v‡BÀ —v–GFƒ¢7G–ÆRçv–GF€ —Ð —Ð —Ó°  ’òòf÷&6R6çf2FòF—7Æ’2&Æö6²Fòfö–BW‡G&76R6W6VB'’–æÆ–æP ’òòVÆVÖVçG2Âv†–6‚v÷VÆB–çFW&fW&Rv—F‚F†R&W7öç6—fR&W6—¦R&ö6W72à ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2ó#S3€ —7G–ÆRæF—7Æ’Ò7G–ÆRæF—7Æ’ÇÂv&Æö6²s°  ––b‡&VæFW%v–GF‚ÓÓÒçVÆÂÇÂ&VæFW%v–GF‚ÓÓÒrr’° —f"F—7Æ•v–GF‚Ò&VEW6VE6—¦R†6çf2Âwv–GF‚r“° ––b†F—7Æ•v–GF‚ÓÒVæFVf–æVB’° –6çf2çv–GF‚ÒF—7Æ•v–GFƒ° —Ð —Ð  ––b‡&VæFW$†V–v‡BÓÓÒçVÆÂÇÂ&VæFW$†V–v‡BÓÓÒrr’° ––b†6çf2ç7G–ÆRæ†V–v‡BÓÓÒrr’° ’òò–bæòW‡Æ–6—B&VæFW"†V–v‡BæB7G–ÆR†V–v‡BÂÆWBw2Ç’F†R7V7B&F–òÀ ’òòv†–6‚öæR6â&R7V6–f–VB'’F†RW6W"'WBÇ6ò'’6†'G22FVfVÇB÷F–öà ’òò†’æRâ÷F–öç2æ7V7E&F–ò’â–bæ÷B7V6–f–VBÂW6R6çf27V7B&F–òöb"à –6çf2æ†V–v‡BÒ6çf2çv–GF‚ò†6öæf–ræ÷F–öç2æ7V7E&F–òÇÂ"“° —ÒVÇ6R° —f"F—7Æ”†V–v‡BÒ&VEW6VE6—¦R†6çf2Âv†V–v‡Br“° ––b†F—7Æ•v–GF‚ÓÒVæFVf–æVB’° –6çf2æ†V–v‡BÒF—7Æ”†V–v‡C° —Ð —Ð —Ð  —&WGW&â6çf3°§Ð ¢ò¢ ¢¢FWFV7G27W÷'Bf÷"÷F–öç2ö&¦V7B&wVÖVçB–âFDWfVçDÆ—7FVæW"à¢¢‡GG3¢òöFWfVÆ÷W"æÖ÷¦–ÆÆæ÷&röVâÕU2öFö72õvV"ô’ôWfVçEF&vWBöFDWfVçDÆ—7FVæW"56fVÇ•öFWFV7F–æuö÷F–öå÷7W÷'@¢¢&—fFP¢¢ð§f"7W÷'G4WfVçDÆ—7FVæW$÷F–öç2Ò†gVæ7F–öâ‚’° —f"7W÷'G2ÒfÇ6S° —G'’° —f"÷F–öç2Òö&¦V7BæFVf–æU&÷W'G’‡·ÒÂw76—fRrÂ° ’òòW6Æ–çBÖF—6&ÆRÖæW‡BÖÆ–æRvWGFW"×&WGW&à –vWC¢gVæ7F–öâ‚’° —7W÷'G2ÒG'VS° —Ð —Ò“° —v–æF÷ræFDWfVçDÆ—7FVæW"‚vRrÂçVÆÂÂ÷F–öç2“° —Ò6F6‚†R’° ’òò6öçF–çVR&Vv&FÆW72öbW'&÷  —Ð —&WGW&â7W÷'G3°§Ò‚’“° ¢òòFVfVÇB76—fRFòG'VR2W‡V7FVB'’6‡&öÖRf÷"wF÷V6‡7F'BræBwF÷V6†VæBrWfVçG2à¢òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óC#ƒp§f"WfVçDÆ—7FVæW$÷F–öç2Ò7W÷'G4WfVçDÆ—7FVæW$÷F–öç2ò·76—fS¢G'VWÒ¢fÇ6S° ¦gVæ7F–öâFDÆ—7FVæW"†æöFRÂG—RÂÆ—7FVæW"’° –æöFRæFDWfVçDÆ—7FVæW"‡G—RÂÆ—7FVæW"ÂWfVçDÆ—7FVæW$÷F–öç2“°§Ð ¦gVæ7F–öâ&VÖ÷fTÆ—7FVæW"†æöFRÂG—RÂÆ—7FVæW"’° –æöFRç&VÖ÷fTWfVçDÆ—7FVæW"‡G—RÂÆ—7FVæW"ÂWfVçDÆ—7FVæW$÷F–öç2“°§Ð ¦gVæ7F–öâ7&VFTWfVçB‡G—RÂ6†'BÂ‚Â’ÂæF—fTWfVçB’° —&WGW&â° —G—S¢G—RÀ –6†'C¢6†'BÀ –æF—fS¢æF—fTWfVçBÇÂçVÆÂÀ —ƒ¢‚ÓÒVæFVf–æVBò‚¢çVÆÂÀ —“¢’ÓÒVæFVf–æVBò’¢çVÆÂÀ —Ó°§Ð ¦gVæ7F–öâg&öÔæF—fTWfVçB†WfVçBÂ6†'B’° —f"G—RÒUdTåEõE•U5¶WfVçBçG—UÒÇÂWfVçBçG—S° —f"÷2Ò†VÇW'2CævWE&VÆF—fU÷6—F–öâ†WfVçBÂ6†'B“° —&WGW&â7&VFTWfVçB‡G—RÂ6†'BÂ÷2ç‚Â÷2ç’ÂWfVçB“°§Ð ¦gVæ7F–öâF‡&÷GFÆVB†fâÂF†—4&r’° —f"F–6¶–ærÒfÇ6S° —f"&w2ÒµÓ°  —&WGW&âgVæ7F–öâ‚’° –&w2Ò'&’ç&÷F÷G—Rç6Æ–6Ræ6ÆÂ†&wVÖVçG2“° —F†—4&rÒF†—4&rÇÂF†—3°  ––b‚F–6¶–ær’° —F–6¶–ærÒG'VS° –†VÇW'2Cç&WVW7Dæ–Ôg&ÖRæ6ÆÂ‡v–æF÷rÂgVæ7F–öâ‚’° —F–6¶–ærÒfÇ6S° –fâæÇ’‡F†—4&rÂ&w2“° —Ò“° —Ð —Ó°§Ð ¦gVæ7F–öâ7&VFTF—b†6Ç2’° —f"VÂÒFö7VÖVçBæ7&VFTVÆVÖVçB‚vF—br“° –VÂæ6Æ74æÖRÒ6Ç2ÇÂrs° —&WGW&âVÃ°§Ð ¢òò–×ÆVÖVçFF–öâ&6VBöâ‡GG3¢òöv—F‡V"æ6öÒöÖ&6¢ö772ÖVÆVÖVçB×VW&–W0¦gVæ7F–öâ7&VFU&W6—¦W"††æFÆW"’° —f"Ö…6—¦RÒ°  ’òòäõDR…4"’FöâwBW6R–ææW$…DÔÂ&V6W6R—B6÷VÆB&R6öç6–FW&VBVç6fRà ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óS“  —f"&W6—¦W"Ò7&VFTF—b„555õ4•¤UôÔôä•Dõ"“° —f"W‡æBÒ7&VFTF—b„555õ4•¤UôÔôä•Dõ"²rÖW‡æBr“° —f"6‡&–æ²Ò7&VFTF—b„555õ4•¤UôÔôä•Dõ"²r×6‡&–æ²r“°  –W‡æBæVæD6†–ÆB†7&VFTF—b‚’“° —6‡&–æ²æVæD6†–ÆB†7&VFTF—b‚’“°  —&W6—¦W"æVæD6†–ÆB†W‡æB“° —&W6—¦W"æVæD6†–ÆB‡6‡&–æ²“° —&W6—¦W"å÷&W6WBÒgVæ7F–öâ‚’° –W‡æBç67&öÆÄÆVgBÒÖ…6—¦S° –W‡æBç67&öÆÅF÷ÒÖ…6—¦S° —6‡&–æ²ç67&öÆÄÆVgBÒÖ…6—¦S° —6‡&–æ²ç67&öÆÅF÷ÒÖ…6—¦S° —Ó°  —f"öå67&öÆÂÒgVæ7F–öâ‚’° —&W6—¦W"å÷&W6WB‚“° –†æFÆW"‚“° —Ó°  –FDÆ—7FVæW"†W‡æBÂw67&öÆÂrÂöå67&öÆÂæ&–æB†W‡æBÂvW‡æBr’“° –FDÆ—7FVæW"‡6‡&–æ²Âw67&öÆÂrÂöå67&öÆÂæ&–æB‡6‡&–æ²Âw6‡&–æ²r’“°  —&WGW&â&W6—¦W#°§Ð ¢òò‡GG3¢òöFf–GvÇ6‚ææÖRöFWFV7BÖæöFRÖ–ç6W'F–öà¦gVæ7F–öâvF6„f÷%&VæFW"†æöFRÂ†æFÆW"’° —f"W‡æFòÒæöFU´U…äDõô´U•ÒÇÂ†æöFU´U…äDõô´U•ÒÒ·Ò“° —f"&÷‡’ÒW‡æFòç&VæFW%&÷‡’ÒgVæ7F–öâ†R’° ––b†Rææ–ÖF–öäæÖRÓÓÒ555õ$TäDU%ôä”ÔD”ôâ’° –†æFÆW"‚“° —Ð —Ó°  –†VÇW'2CæV6‚„ä”ÔD”ôåõ5D%EôUdTåE2ÂgVæ7F–öâ‡G—R’° –FDÆ—7FVæW"†æöFRÂG—RÂ&÷‡’“° —Ò“°  ’òò3Cs3s¢6‡&öÖRÖ–v‡B6¶—F†R552æ–ÖF–öâv†VâF†R555õ$TäDU%ôÔôä•Dõ"6Æ70 ’òò—2&VÖ÷fVBF†VâFFVB&6²–ÖÖVF–FVÇ’‡6ÖRæ–ÖF–öâg&ÖSò’â66W76–ærF†P ’òòöfg6WE&VçF&÷W'G’v–ÆÂf÷&6R&VfÆ÷ræB&RÖWfÇVFRF†R552æ–ÖF–öâà ’òò‡GG3¢òöv—7Bæv—F‡V"æ6öÒ÷VÆ—&—6‚óVCS&f#ƒ#3Ss3ƒS66&÷‚ÖÖWG&–70 ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óCs3p –W‡æFòç&VfÆ÷rÒæöFRæöfg6WE&VçC°  –æöFRæ6Æ74Æ—7BæFB„555õ$TäDU%ôÔôä•Dõ"“°§Ð ¦gVæ7F–öâVçvF6„f÷%&VæFW"†æöFR’° —f"W‡æFòÒæöFU´U…äDõô´U•ÒÇÂ·Ó° —f"&÷‡’ÒW‡æFòç&VæFW%&÷‡“°  ––b‡&÷‡’’° –†VÇW'2CæV6‚„ä”ÔD”ôåõ5D%EôUdTåE2ÂgVæ7F–öâ‡G—R’° —&VÖ÷fTÆ—7FVæW"†æöFRÂG—RÂ&÷‡’“° —Ò“°  –FVÆWFRW‡æFòç&VæFW%&÷‡“° —Ð  –æöFRæ6Æ74Æ—7Bç&VÖ÷fR„555õ$TäDU%ôÔôä•Dõ"“°§Ð ¦gVæ7F–öâFE&W6—¦TÆ—7FVæW"†æöFRÂÆ—7FVæW"Â6†'B’° —f"W‡æFòÒæöFU´U…äDõô´U•ÒÇÂ†æöFU´U…äDõô´U•ÒÒ·Ò“°  ’òòÆWBw2¶VWG&6²öbF†—2FFVB&W6—¦W"æBF‡W2fö–BDôÒVW'’v†Vâ&VÖ÷f–ær—Bà —f"&W6—¦W"ÒW‡æFòç&W6—¦W"Ò7&VFU&W6—¦W"‡F‡&÷GFÆVB†gVæ7F–öâ‚’° ––b†W‡æFòç&W6—¦W"’° —f"6öçF–æW"Ò6†'Bæ÷F–öç2æÖ–çF–ä7V7E&F–òbbæöFRç&VçDæöFS° —f"rÒ6öçF–æW"ò6öçF–æW"æ6Æ–VçEv–GF‚¢° –Æ—7FVæW"†7&VFTWfVçB‚w&W6—¦RrÂ6†'B’“° ––b†6öçF–æW"bb6öçF–æW"æ6Æ–VçEv–GF‚Ârbb6†'Bæ6çf2’° ’òò–bF†R6öçF–æW"6—¦R6‡&æ²GW&–ær6†'B&W6—¦RÂÆWBw277VÖP ’òò67&öÆÆ&"V&VBâ6òvR&W6—¦Rv–âv—F‚F†R67&öÆÆ&"f—6–&ÆRÐ ’òòVffV7F—fVÇ’Ö¶–ær6†'B6ÖÆÆW"æBF†R67&öÆÆ&"†–FFVâv–âà ’òò&V6W6RvR&R–ç6–FRF‡&÷GFÆVFÂæB7W'&VçFÇ’F–6¶–ævÂ67&öÆÀ ’òòWfVçG2&R–væ÷&VBGW&–ærF†—2v†öÆR"&W6—¦R&ö6W72à ’òò–bvR77VÖVBw&öæræB6öÖWF†–ærVÇ6R†VæVBÂvR&R&W6—¦–æp ’òòGv–6R–âg&ÖR‡÷FVçF–ÂW&f÷&Öæ6R—77VR –Æ—7FVæW"†7&VFTWfVçB‚w&W6—¦RrÂ6†'B’“° —Ð —Ð —Ò’“°  ’òòF†R&W6—¦W"æVVG2Fò&RGF6†VBFòF†RæöFR&VçBÂ6òvRf—'7BæVVBFò&P ’òò7W&RF†BæöFV—2GF6†VBFòF†RDôÒ&Vf÷&R–æ¦V7F–ærF†R&W6—¦W"VÆVÖVçBà —vF6„f÷%&VæFW"†æöFRÂgVæ7F–öâ‚’° ––b†W‡æFòç&W6—¦W"’° —f"6öçF–æW"ÒæöFRç&VçDæöFS° ––b†6öçF–æW"bb6öçF–æW"ÓÒ&W6—¦W"ç&VçDæöFR’° –6öçF–æW"æ–ç6W'D&Vf÷&R‡&W6—¦W"Â6öçF–æW"æf—'7D6†–ÆB“° —Ð  ’òòF†R6öçF–æW"6—¦RÖ–v‡B†fR6†ævVBÂÆWBw2&W6WBF†R&W6—¦W"7FFRà —&W6—¦W"å÷&W6WB‚“° —Ð —Ò“°§Ð ¦gVæ7F–öâ&VÖ÷fU&W6—¦TÆ—7FVæW"†æöFR’° —f"W‡æFòÒæöFU´U…äDõô´U•ÒÇÂ·Ó° —f"&W6—¦W"ÒW‡æFòç&W6—¦W#°  –FVÆWFRW‡æFòç&W6—¦W#° —VçvF6„f÷%&VæFW"†æöFR“°  ––b‡&W6—¦W"bb&W6—¦W"ç&VçDæöFR’° —&W6—¦W"ç&VçDæöFRç&VÖ÷fT6†–ÆB‡&W6—¦W"“° —Ð§Ð ¢ò¢ ¢¢–æ¦V7G25527G–ÆW2–æÆ–æR–bF†R7G–ÆW2&Ræ÷BÇ&VG’&W6VçBà¢¢&Ò´…DÔÄFö7VÖVçGÅ6†F÷u&ö÷GÒ&ö÷DæöFRÒF†RæöFRFò6öçF–âF†RÇ7G–ÆSâà¢¢&Ò·7G&–æwÒ772ÒF†R552Fò&R–æ¦V7FVBà¢¢ð¦gVæ7F–öâ–æ¦V7D552‡&ö÷DæöFRÂ772’° ’òò‡GG3¢ò÷7F6¶÷fW&fÆ÷ræ6öÒ÷ó3“##3 —f"W‡æFòÒ&ö÷DæöFU´U…äDõô´U•ÒÇÂ‡&ö÷DæöFU´U…äDõô´U•ÒÒ·Ò“° ––b‚W‡æFòæ6öçF–ç57G–ÆW2’° –W‡æFòæ6öçF–ç57G–ÆW2ÒG'VS° –772Òrò¢6†'Bæ§2¢õÆâr²773° —f"7G–ÆRÒFö7VÖVçBæ7&VFTVÆVÖVçB‚w7G–ÆRr“° —7G–ÆRç6WDGG&–'WFR‚wG—RrÂwFW‡Bö772r“° —7G–ÆRæVæD6†–ÆB†Fö7VÖVçBæ7&VFUFW‡DæöFR†772’“° —&ö÷DæöFRæVæD6†–ÆB‡7G–ÆR“° —Ð§Ð §f"ÆFf÷&ÕöFöÒC"Ò° ’ò¢  ’¢v†VâG'VVÂ&WfVçG2F†RWFöÖF–2–æ¦V7F–öâöbF†R7G–ÆW6†VWB&WV—&VBFð ’¢6÷'&V7FÇ’FWFV7Bv†VâF†R6†'B—2FFVBFòF†RDôÒæBF†Vâ&W6—¦VBâF†—0 ’¢7v—F6‚†2&VVâFFVBFòÆÆ÷rW‡FW&æÂ7G–ÆW6†VWB†F—7Bô6†'B‚æÖ–â“òæ§6 ’¢Fò&RÖçVÆÇ’–×÷'FVBFòÖ¶RF†—2Æ–'&'’6ö×F–&ÆRv—F‚ç’55à ’¢6VR‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óS#€ ’¢ð –F—6&ÆT554–æ¦V7F–öã¢fÇ6RÀ  ’ò¢  ’¢F†—2&÷W'G’†öÆG2v†WF†W"F†—2ÆFf÷&Ò—2Væ&ÆVBf÷"F†R7W'&VçBVçf—&öæÖVçBà ’¢7W'&VçFÇ’W6VB'’ÆFf÷&Òæ§2Fò6VÆV7BF†R&÷W"–×ÆVÖVçFF–öâà ’¢&—fFP ’¢ð •öVæ&ÆVC¢G—Vöbv–æF÷rÓÒwVæFVf–æVBrbbG—VöbFö7VÖVçBÓÒwVæFVf–æVBrÀ  ’ò¢  ’¢–æ—F–Æ—¦W2&W6÷W&6W2F†BFWVæBöâÆFf÷&Ò÷F–öç2à ’¢&Ò´…DÔÄ6çf4VÆVÖVçGÒ6çf2ÒF†R6çf2VÆVÖVçBà ’¢&—fFP ’¢ð •öVç7W&TÆöFVC¢gVæ7F–öâ†6çf2’° ––b‚F†—2æF—6&ÆT554–æ¦V7F–öâ’° ’òò–bF†R6çf2—2–â6†F÷rDôÒÂF†VâF†R7G–ÆW2×W7BÇ6ò&R–ç6W'FV@ ’òò–çFòF†R6ÖR6†F÷rDôÒà ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óSsc0 —f"&ö÷BÒ6çf2ævWE&ö÷DæöFRò6çf2ævWE&ö÷DæöFR‚’¢Fö7VÖVçC° —f"F&vWDæöFRÒ&ö÷Bæ†÷7Bò&ö÷B¢Fö7VÖVçBæ†VC° ––æ¦V7D552‡F&vWDæöFRÂ7G–ÆW6†VWB“° —Ð —ÒÀ  –7V—&T6öçFW‡C¢gVæ7F–öâ†—FVÒÂ6öæf–r’° ––b‡G—Vöb—FVÒÓÓÒw7G&–ærr’° –—FVÒÒFö7VÖVçBævWDVÆVÖVçD'”–B†—FVÒ“° —ÒVÇ6R–b†—FVÒæÆVæwF‚’° ’òò7W÷'Bf÷"'&’&6VBVW&–W2‡7V6‚2¥VW'’ –—FVÒÒ—FVÕ³Ó° —Ð  ––b†—FVÒbb—FVÒæ6çf2’° ’òò7W÷'Bf÷"ç’ö&¦V7B76ö6–FVBFò6çf2†–æ6ÇVF–ær6öçFW‡C&B –—FVÒÒ—FVÒæ6çf3° —Ð  ’òòFò&WfVçB6çf2f–ævW'&–çF–ærÂ6öÖRFBÖöç2VæFVf–æRF†RvWD6öçFW‡@ ’òòÖWF†öBÂf÷"W†×ÆS¢‡GG3¢òöv—F‡V"æ6öÒö¶¶6æW"ô6çf4&Æö6¶W  ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2ó#ƒp —f"6öçFW‡BÒ—FVÒbb—FVÒævWD6öçFW‡Bbb—FVÒævWD6öçFW‡B‚s&Br“°  ’òò–ç7Fæ6Vöb…DÔÄ6çf4VÆVÖVçBô6çf5&VæFW&–æt6öçFW‡C$Ff–Ç2v†VâF†R—FVÒ—0 ’òò–ç6–FRâ–g&ÖR÷"v†Vâ'Vææ–ær–â&÷FV7FVBVçf—&öæÖVçBâvR6÷VÆBwVW72F†P ’òòG—W2g&öÒF†V—"Fõ7G&–ær‚’fÇVR'WBÆWBw2¶VWF†–æw2fÆW†–&ÆRæB77VÖR—Bw0 ’òò7Vff–6–VçB6öæF—F–öâ–bF†R—FVÒ†26öçFW‡C$Bv†–6‚†2—FVÒ26çf6à ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2ó3ƒƒp ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óC  ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óCS  ––b†6öçFW‡Bbb6öçFW‡Bæ6çf2ÓÓÒ—FVÒ’° ’òòÆöBÆFf÷&Ò&W6÷W&6W2öâf—'7B6†'B7&VF–öâÂFòÖ¶R—B÷76–&ÆRFð ’òò–×÷'BF†RÆ–'&'’&Vf÷&R6WGF–ærÆFf÷&Ò÷F–öç2à —F†—2åöVç7W&TÆöFVB†—FVÒ“° ––æ—D6çf2†—FVÒÂ6öæf–r“° —&WGW&â6öçFW‡C° —Ð  —&WGW&âçVÆÃ° —ÒÀ  —&VÆV6T6öçFW‡C¢gVæ7F–öâ†6öçFW‡B’° —f"6çf2Ò6öçFW‡Bæ6çf3° ––b‚6çf5´U…äDõô´U•Ò’° —&WGW&ã° —Ð  —f"–æ—F–ÂÒ6çf5´U…äDõô´U•Òæ–æ—F–Ã° •²v†V–v‡BrÂwv–GF‚uÒæf÷$V6‚†gVæ7F–öâ‡&÷’° —f"fÇVRÒ–æ—F–Å·&÷Ó° ––b††VÇW'2Cæ—4çVÆÄ÷%VæFVb‡fÇVR’’° –6çf2ç&VÖ÷fTGG&–'WFR‡&÷“° —ÒVÇ6R° –6çf2ç6WDGG&–'WFR‡&÷ÂfÇVR“° —Ð —Ò“°  –†VÇW'2CæV6‚†–æ—F–Âç7G–ÆRÇÂ·ÒÂgVæ7F–öâ‡fÇVRÂ¶W’’° –6çf2ç7G–ÆU¶¶W•ÒÒfÇVS° —Ò“°  ’òòF†R6çf2&VæFW"6—¦RÖ–v‡B†fR&VVâ6†ævVB†æBF‡W2F†R7FFR7F6²F—66&FVB’À ’òòvR6âwBW6R6fR‚’æB&W7F÷&R‚’Fò&W7F÷&RF†R–æ—F–Â7FFRâ6òÖ¶R7W&RF†B@ ’òòÆV7BF†R6çf26öçFW‡B—2&W6WBFòF†RFVfVÇB7FFR'’6WGF–ærF†R6çf2v–GF‚à ’òò‡GG3¢ò÷wwrçs2æ÷&rõE"ó#õtBÖ‡FÖÃRÓ#S#R÷F†RÖ6çf2ÖVÆVÖVçBæ‡FÖÀ ’òòW6Æ–çBÖF—6&ÆRÖæW‡BÖÆ–æRæò×6VÆbÖ76–và –6çf2çv–GF‚Ò6çf2çv–GFƒ°  –FVÆWFR6çf5´U…äDõô´U•Ó° —ÒÀ  –FDWfVçDÆ—7FVæW#¢gVæ7F–öâ†6†'BÂG—RÂÆ—7FVæW"’° —f"6çf2Ò6†'Bæ6çf3° ––b‡G—RÓÓÒw&W6—¦Rr’° ’òòæ÷FS¢F†R&W6—¦RWfVçB—2æ÷B7W÷'FVBöâÆÂ'&÷w6W'2à –FE&W6—¦TÆ—7FVæW"†6çf2ÂÆ—7FVæW"Â6†'B“° —&WGW&ã° —Ð  —f"W‡æFòÒÆ—7FVæW%´U…äDõô´U•ÒÇÂ†Æ—7FVæW%´U…äDõô´U•ÒÒ·Ò“° —f"&÷†–W2ÒW‡æFòç&÷†–W2ÇÂ†W‡æFòç&÷†–W2Ò·Ò“° —f"&÷‡’Ò&÷†–W5¶6†'Bæ–B²uòr²G—UÒÒgVæ7F–öâ†WfVçB’° –Æ—7FVæW"†g&öÔæF—fTWfVçB†WfVçBÂ6†'B’“° —Ó°  –FDÆ—7FVæW"†6çf2ÂG—RÂ&÷‡’“° —ÒÀ  —&VÖ÷fTWfVçDÆ—7FVæW#¢gVæ7F–öâ†6†'BÂG—RÂÆ—7FVæW"’° —f"6çf2Ò6†'Bæ6çf3° ––b‡G—RÓÓÒw&W6—¦Rr’° ’òòæ÷FS¢F†R&W6—¦RWfVçB—2æ÷B7W÷'FVBöâÆÂ'&÷w6W'2à —&VÖ÷fU&W6—¦TÆ—7FVæW"†6çf2“° —&WGW&ã° —Ð  —f"W‡æFòÒÆ—7FVæW%´U…äDõô´U•ÒÇÂ·Ó° —f"&÷†–W2ÒW‡æFòç&÷†–W2ÇÂ·Ó° —f"&÷‡’Ò&÷†–W5¶6†'Bæ–B²uòr²G—UÓ° ––b‚&÷‡’’° —&WGW&ã° —Ð  —&VÖ÷fTÆ—7FVæW"†6çf2ÂG—RÂ&÷‡’“° —Ð§Ó° ¢òòDU$T4D”ôå0 ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’ÂW6RWfVçEF&vWBæFDWfVçDÆ—7FVæW"–ç7FVBà¢¢WfVçEF&vWBæFDWfVçDÆ—7FVæW"6ö×F–&–Æ—G“¢6‡&öÖRÂ÷W&rÂ6f&’ÂdcãR²Â”S’°¢¢6VR‡GG3¢òöFWfVÆ÷W"æÖ÷¦–ÆÆæ÷&röVâÕU2öFö72õvV"ô’ôWfVçEF&vWBöFDWfVçDÆ—7FVæW ¢¢gVæ7F–öâ6†'Bæ†VÇW'2æFDWfVç@¢¢FW&V6FVB6–æ6RfW'6–öâ"ãrã ¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦†VÇW'2CæFDWfVçBÒFDÆ—7FVæW#° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’ÂW6RWfVçEF&vWBç&VÖ÷fTWfVçDÆ—7FVæW"–ç7FVBà¢¢WfVçEF&vWBç&VÖ÷fTWfVçDÆ—7FVæW"6ö×F–&–Æ—G“¢6‡&öÖRÂ÷W&rÂ6f&’ÂdcãR²Â”S’°¢¢6VR‡GG3¢òöFWfVÆ÷W"æÖ÷¦–ÆÆæ÷&röVâÕU2öFö72õvV"ô’ôWfVçEF&vWB÷&VÖ÷fTWfVçDÆ—7FVæW ¢¢gVæ7F–öâ6†'Bæ†VÇW'2ç&VÖ÷fTWfVç@¢¢FW&V6FVB6–æ6RfW'6–öâ"ãrã ¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦†VÇW'2Cç&VÖ÷fTWfVçBÒ&VÖ÷fTÆ—7FVæW#° ¢òòDôDòÖ¶R÷76–&ÆRFò6VÆV7Bæ÷F†W"ÆFf÷&ÒB'V–ÆBF–ÖRà§f"–×ÆVÖVçFF–öâÒÆFf÷&ÕöFöÒC"åöVæ&ÆVBòÆFf÷&ÕöFöÒC"¢ÆFf÷&Õö&6–3° ¢ò¢ ¢¢æÖW76R6†'BçÆFf÷&Ð¢¢6VR‡GG3¢òö6†'F§2æv—F&öö·2æ–ò÷&÷÷6Ç2ö6öçFVçBõÆFf÷&Òæ‡FÖÀ¢¢6–æ6R"ãBã ¢¢ð§f"ÆFf÷&ÒÒ†VÇW'2CæW‡FVæB‡° ’ò¢  ’¢6–æ6R"ãrã  ’¢ð ––æ—F–Æ—¦S¢gVæ7F–öâ‚’·ÒÀ  ’ò¢  ’¢6ÆÆVBB6†'B6öç7G'V7F–öâF–ÖRÂ&WGW&ç26öçFW‡C&B–ç7Fæ6R–×ÆVÖVçF–æp ’¢F†Rµs426çf2$B6öçFW‡B’7FæF&E×´Æ–æ²‡GG3¢ò÷wwrçs2æ÷&rõE"ó&F6öçFW‡B÷Òà ’¢&Ò²§Ò—FVÒÒF†RæF—fR—FVÒg&öÒv†–6‚Fò7V—&R6öçFW‡B‡ÆFf÷&Ò7V6–f–2 ’¢&Ò¶ö&¦V7GÒ÷F–öç2ÒF†R6†'B÷F–öç0 ’¢&WGW&ç2´6çf5&VæFW&–æt6öçFW‡C$GÒ6öçFW‡C&B–ç7Fæ6P ’¢ð –7V—&T6öçFW‡C¢gVæ7F–öâ‚’·ÒÀ  ’ò¢  ’¢6ÆÆVBB6†'BFW7G'V7F–öâF–ÖRÂ&VÆV6W2ç’&W6÷W&6W276ö6–FVBFòF†R6öçFW‡@ ’¢&Wf–÷W6Ç’&WGW&æVB'’F†R7V—&T6öçFW‡B‚’ÖWF†öBà ’¢&Ò´6çf5&VæFW&–æt6öçFW‡C$GÒ6öçFW‡BÒF†R6öçFW‡C&B–ç7Fæ6P ’¢&WGW&ç2¶&ööÆVçÒG'VR–bF†RÖWF†öB7V66VVFVBÂVÇ6RfÇ6P ’¢ð —&VÆV6T6öçFW‡C¢gVæ7F–öâ‚’·ÒÀ  ’ò¢  ’¢&Vv—7FW'2F†R7V6–f–VBÆ—7FVæW"öâF†Rv—fVâ6†'Bà ’¢&Ò´6†'GÒ6†'BÒ6†'Bg&öÒv†–6‚FòÆ—7FVâf÷"WfVç@ ’¢&Ò·7G&–æwÒG—RÒF†R‡´Æ–æ²”WfVçGÒ’G—RFòÆ—7FVâf÷  ’¢&Ò¶gVæ7F–öçÒÆ—7FVæW"Ò&V6V—fW2æ÷F–f–6F–öâ†âö&¦V7BF†B–×ÆVÖVçG0 ’¢F†R´Æ–æ²”WfVçGÒ–çFW&f6R’v†VââWfVçBöbF†R7V6–f–VBG—Rö67W'2à ’¢ð –FDWfVçDÆ—7FVæW#¢gVæ7F–öâ‚’·ÒÀ  ’ò¢  ’¢&VÖ÷fW2F†R7V6–f–VBÆ—7FVæW"&Wf–÷W6Ç’&Vv—7FW&VBv—F‚FDWfVçDÆ—7FVæW"à ’¢&Ò´6†'GÒ6†'BÒ6†'Bg&öÒv†–6‚Fò&VÖ÷fRF†RÆ—7FVæW  ’¢&Ò·7G&–æwÒG—RÒF†R‡´Æ–æ²”WfVçGÒ’G—RFò&VÖ÷fP ’¢&Ò¶gVæ7F–öçÒÆ—7FVæW"ÒF†RÆ—7FVæW"gVæ7F–öâFò&VÖ÷fRg&öÒF†RWfVçBF&vWBà ’¢ð —&VÖ÷fTWfVçDÆ—7FVæW#¢gVæ7F–öâ‚’·Ð §ÒÂ–×ÆVÖVçFF–öâ“° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° —ÇVv–ç3¢·Ð§Ò“° ¢ò¢ ¢¢F†RÇVv–â6W'f–6R6–ævÆWFöà¢¢æÖW76R6†'BçÇVv–ç0¢¢6–æ6R"ãã ¢¢ð§f"6÷&U÷ÇVv–ç2Ò° ’ò¢  ’¢vÆö&ÆÇ’&Vv—7FW&VBÇVv–ç2à ’¢&—fFP ’¢ð •÷ÇVv–ç3¢µÒÀ  ’ò¢  ’¢F†—2–FVçF–f–W"—2W6VBFò–çfÆ–FFRF†RFW67&—F÷'266†RGF6†VBFòV6‚6†'@ ’¢v†VâvÆö&ÂÇVv–â—2&Vv—7FW&VB÷"Vç&Vv—7FW&VBâ–âF†—266RÂF†R66†R”B—0 ’¢–æ7&VÖVçFVBæBFW67&—F÷'2&R&VvVæW&FVBGW&–ærföÆÆ÷v–ær’6ÆÇ2à ’¢&—fFP ’¢ð •ö66†T–C¢À  ’ò¢  ’¢&Vv—7FW'2F†Rv—fVâÇVv–â‡2’–bæ÷BÇ&VG’&Vv—7FW&VBà ’¢&Ò´•ÇVv–åµ×Ä•ÇVv–çÒÇVv–ç2ÇVv–â–ç7Fæ6R‡2’à ’¢ð —&Vv—7FW#¢gVæ7F–öâ‡ÇVv–ç2’° —f"ÒF†—2å÷ÇVv–ç3° ’…µÒ’æ6öæ6B‡ÇVv–ç2’æf÷$V6‚†gVæ7F–öâ‡ÇVv–â’° ––b‡æ–æFW„öb‡ÇVv–â’ÓÓÒÓ’° —çW6‚‡ÇVv–â“° —Ð —Ò“°  —F†—2åö66†T–B²³° —ÒÀ  ’ò¢  ’¢Vç&Vv—7FW'2F†Rv—fVâÇVv–â‡2’öæÇ’–b&Vv—7FW&VBà ’¢&Ò´•ÇVv–åµ×Ä•ÇVv–çÒÇVv–ç2ÇVv–â–ç7Fæ6R‡2’à ’¢ð —Vç&Vv—7FW#¢gVæ7F–öâ‡ÇVv–ç2’° —f"ÒF†—2å÷ÇVv–ç3° ’…µÒ’æ6öæ6B‡ÇVv–ç2’æf÷$V6‚†gVæ7F–öâ‡ÇVv–â’° —f"–G‚Òæ–æFW„öb‡ÇVv–â“° ––b†–G‚ÓÒÓ’° —ç7Æ–6R†–G‚Â“° —Ð —Ò“°  —F†—2åö66†T–B²³° —ÒÀ  ’ò¢  ’¢&VÖ÷fRÆÂ&Vv—7FW&VBÇVv–ç2à ’¢6–æ6R"ããP ’¢ð –6ÆV#¢gVæ7F–öâ‚’° —F†—2å÷ÇVv–ç2ÒµÓ° —F†—2åö66†T–B²³° —ÒÀ  ’ò¢  ’¢&WGW&ç2F†RçVÖ&W"öb&Vv—7FW&VBÇVv–ç3ð ’¢&WGW&ç2¶çVÖ&W'Ð ’¢6–æ6R"ããP ’¢ð –6÷VçC¢gVæ7F–öâ‚’° —&WGW&âF†—2å÷ÇVv–ç2æÆVæwFƒ° —ÒÀ  ’ò¢  ’¢&WGW&ç2ÆÂ&Vv—7FW&VBÇVv–â–ç7Fæ6W2à ’¢&WGW&ç2´•ÇVv–åµ×Ò'&’öbÇVv–âö&¦V7G2à ’¢6–æ6R"ããP ’¢ð –vWDÆÃ¢gVæ7F–öâ‚’° —&WGW&âF†—2å÷ÇVv–ç3° —ÒÀ  ’ò¢  ’¢6ÆÇ2Væ&ÆVBÇVv–ç2f÷"6†'FöâF†R7V6–f–VB†öö²æBv—F‚F†Rv—fVâ&w2à ’¢F†—2ÖWF†öB–ÖÖVF–FVÇ’&WGW&ç226ööâ2ÇVv–âW‡Æ–6—FÇ’&WGW&ç2fÇ6RâF†P ’¢&WGW&æVBfÇVR6â&RW6VBÂf÷"–ç7Fæ6RÂFò–çFW''WBF†R7W'&VçB7F–öâà ’¢&Ò´6†'GÒ6†'BÒF†R6†'B–ç7Fæ6Rf÷"v†–6‚ÇVv–ç26†÷VÆB&R6ÆÆVBà ’¢&Ò·7G&–æwÒ†öö²ÒF†RæÖRöbF†RÇVv–âÖWF†öBFò6ÆÂ†Rærâv&Vf÷&UWFFRr’à ’¢&Ò´'&—Ò¶&w5ÒÒW‡G&&wVÖVçG2FòÇ’FòF†R†öö²6ÆÂà ’¢&WGW&ç2¶&ööÆVçÒfÇ6R–bç’öbF†RÇVv–ç2&WGW&âfÇ6RÂVÇ6R&WGW&ç2G'VRà ’¢ð –æ÷F–g“¢gVæ7F–öâ†6†'BÂ†öö²Â&w2’° —f"FW67&—F÷'2ÒF†—2æFW67&—F÷'2†6†'B“° —f"–ÆVâÒFW67&—F÷'2æÆVæwFƒ° —f"’ÂFW67&—F÷"ÂÇVv–âÂ&×2ÂÖWF†öC°  –f÷"†’Ò²’Â–ÆVã²²¶’’° –FW67&—F÷"ÒFW67&—F÷'5¶•Ó° —ÇVv–âÒFW67&—F÷"çÇVv–ã° –ÖWF†öBÒÇVv–å¶†ööµÓ° ––b‡G—VöbÖWF†öBÓÓÒvgVæ7F–öâr’° —&×2Ò¶6†'EÒæ6öæ6B†&w2ÇÂµÒ“° —&×2çW6‚†FW67&—F÷"æ÷F–öç2“° ––b†ÖWF†öBæÇ’‡ÇVv–âÂ&×2’ÓÓÒfÇ6R’° —&WGW&âfÇ6S° —Ð —Ð —Ð  —&WGW&âG'VS° —ÒÀ  ’ò¢  ’¢&WGW&ç2FW67&—F÷'2öbVæ&ÆVBÇVv–ç2f÷"F†Rv—fVâ6†'Bà ’¢&WGW&ç2¶ö&¦V7Eµ×Ò·²ÇVv–âÂ÷F–öç2ÕÐ ’¢&—fFP ’¢ð –FW67&—F÷'3¢gVæ7F–öâ†6†'B’° —f"66†RÒ6†'BâGÇVv–ç2ÇÂ†6†'BâGÇVv–ç2Ò·Ò“° ––b†66†Ræ–BÓÓÒF†—2åö66†T–B’° —&WGW&â66†RæFW67&—F÷'3° —Ð  —f"ÇVv–ç2ÒµÓ° —f"FW67&—F÷'2ÒµÓ° —f"6öæf–rÒ†6†'Bbb6†'Bæ6öæf–r’ÇÂ·Ó° —f"÷F–öç2Ò†6öæf–ræ÷F–öç2bb6öæf–ræ÷F–öç2çÇVv–ç2’ÇÂ·Ó°  —F†—2å÷ÇVv–ç2æ6öæ6B†6öæf–rçÇVv–ç2ÇÂµÒ’æf÷$V6‚†gVæ7F–öâ‡ÇVv–â’° —f"–G‚ÒÇVv–ç2æ–æFW„öb‡ÇVv–â“° ––b†–G‚ÓÒÓ’° —&WGW&ã° —Ð  —f"–BÒÇVv–âæ–C° —f"÷G2Ò÷F–öç5¶–EÓ° ––b†÷G2ÓÓÒfÇ6R’° —&WGW&ã° —Ð  ––b†÷G2ÓÓÒG'VR’° –÷G2Ò†VÇW'2Cæ6ÆöæR†6÷&UöFVfVÇG2ævÆö&ÂçÇVv–ç5¶–EÒ“° —Ð  —ÇVv–ç2çW6‚‡ÇVv–â“° –FW67&—F÷'2çW6‚‡° —ÇVv–ã¢ÇVv–âÀ –÷F–öç3¢÷G2ÇÂ·Ð —Ò“° —Ò“°  –66†RæFW67&—F÷'2ÒFW67&—F÷'3° –66†Ræ–BÒF†—2åö66†T–C° —&WGW&âFW67&—F÷'3° —ÒÀ  ’ò¢  ’¢–çfÆ–FFW266†Rf÷"F†Rv—fVâ6†'C¢FW67&—F÷'2†öÆB&VfW&Væ6RöâÇVv–â÷F–öâÀ ’¢'WB–â6öÖR66W2ÂF†—2&VfW&Væ6R6â&R6†ævVB'’F†RW6W"v†VâWFF–ær÷F–öç2à ’¢‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óS6—77VV6öÖÖVçBÓ3SS“3Ccp ’¢&—fFP ’¢ð •ö–çfÆ–FFS¢gVæ7F–öâ†6†'B’° –FVÆWFR6†'BâGÇVv–ç3° —Ð§Ó° §f"6÷&U÷66ÆU6W'f–6RÒ° ’òò66ÆR&Vv—7G&F–öâö&¦V7BâW‡FVç6–öç26â&Vv—7FW"æWr66ÆRG—W2‡7V6‚2Æör÷"D"66ÆW2’æBF†Và ’òòW6RF†RæWr6†'B÷F–öç2Fòw&"F†R6÷'&V7B66ÆP –6öç7G'V7F÷'3¢·ÒÀ ’òòW6R&Vv—7G&F–öâgVæ7F–öâ6òF†BvR6âÖ÷fRFòâU3bÖv†VâvRæòÆöævW"æVVBFò7W÷'@ ’òòöÆB'&÷w6W'0  ’òò66ÆR6öæf–rFVfVÇG0 –FVfVÇG3¢·ÒÀ —&Vv—7FW%66ÆUG—S¢gVæ7F–öâ‡G—RÂ66ÆT6öç7G'V7F÷"Â66ÆTFVfVÇG2’° —F†—2æ6öç7G'V7F÷'5·G—UÒÒ66ÆT6öç7G'V7F÷#° —F†—2æFVfVÇG5·G—UÒÒ†VÇW'2Cæ6ÆöæR‡66ÆTFVfVÇG2“° —ÒÀ –vWE66ÆT6öç7G'V7F÷#¢gVæ7F–öâ‡G—R’° —&WGW&âF†—2æ6öç7G'V7F÷'2æ†4÷vå&÷W'G’‡G—R’òF†—2æ6öç7G'V7F÷'5·G—UÒ¢VæFVf–æVC° —ÒÀ –vWE66ÆTFVfVÇG3¢gVæ7F–öâ‡G—R’° ’òò&WGW&âF†R66ÆRFVfVÇG2ÖW&vVBv—F‚F†RvÆö&Â6WGF–æw26òF†BvRÇv—2W6RF†RÆFW7BöæW0 —&WGW&âF†—2æFVfVÇG2æ†4÷vå&÷W'G’‡G—R’ò†VÇW'2CæÖW&vR‡·ÒÂ¶6÷&UöFVfVÇG2ç66ÆRÂF†—2æFVfVÇG5·G—UÕÒ’¢·Ó° —ÒÀ —WFFU66ÆTFVfVÇG3¢gVæ7F–öâ‡G—RÂFF—F–öç2’° —f"ÖRÒF†—3° ––b†ÖRæFVfVÇG2æ†4÷vå&÷W'G’‡G—R’’° –ÖRæFVfVÇG5·G—UÒÒ†VÇW'2CæW‡FVæB†ÖRæFVfVÇG5·G—UÒÂFF—F–öç2“° —Ð —ÒÀ –FE66ÆW5FôÆ–÷WC¢gVæ7F–öâ†6†'B’° ’òòFG2V6‚66ÆRFòF†R6†'Bæ&÷†W2'&’Fò&R6—¦VB66÷&F–ævÇ –†VÇW'2CæV6‚†6†'Bç66ÆW2ÂgVæ7F–öâ‡66ÆR’° ’òò6WB”Æ–÷WD—FVÒ&ÖWFW'2f÷"&6·v&G26ö×F–&–Æ—G —66ÆRægVÆÅv–GF‚Ò66ÆRæ÷F–öç2ægVÆÅv–GFƒ° —66ÆRç÷6—F–öâÒ66ÆRæ÷F–öç2ç÷6—F–öã° —66ÆRçvV–v‡BÒ66ÆRæ÷F–öç2çvV–v‡C° –6÷&UöÆ–÷WG2æFD&÷‚†6†'BÂ66ÆR“° —Ò“° —Ð§Ó° §f"fÇVT÷$FVfVÇBC‚Ò†VÇW'2CçfÇVT÷$FVfVÇC°§f"vWE'FÄ†VÇW"Ò†VÇW'2Cç'FÂævWE'FÄFFW#° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° —FööÇF—3¢° –Væ&ÆVC¢G'VRÀ –7W7FöÓ¢çVÆÂÀ –ÖöFS¢væV&W7BrÀ —÷6—F–öã¢vfW&vRrÀ ––çFW'6V7C¢G'VRÀ –&6¶w&÷VæD6öÆ÷#¢w&v&ƒÃÃÃã‚’rÀ —F—FÆTföçE7G–ÆS¢v&öÆBrÀ —F—FÆU76–æs¢"À —F—FÆTÖ&v–ä&÷GFöÓ¢bÀ —F—FÆTföçD6öÆ÷#¢r6ffbrÀ —F—FÆTÆ–vã¢vÆVgBrÀ –&öG•76–æs¢"À –&öG”föçD6öÆ÷#¢r6ffbrÀ –&öG”Æ–vã¢vÆVgBrÀ –fö÷FW$föçE7G–ÆS¢v&öÆBrÀ –fö÷FW%76–æs¢"À –fö÷FW$Ö&v–åF÷¢bÀ –fö÷FW$föçD6öÆ÷#¢r6ffbrÀ –fö÷FW$Æ–vã¢vÆVgBrÀ —•FF–æs¢bÀ —…FF–æs¢bÀ –6&WEFF–æs¢"À –6&WE6—¦S¢RÀ –6÷&æW%&F—W3¢bÀ –×VÇF”¶W”&6¶w&÷VæC¢r6ffbrÀ –F—7Æ”6öÆ÷'3¢G'VRÀ –&÷&FW$6öÆ÷#¢w&v&ƒÃÃÃ’rÀ –&÷&FW%v–GFƒ¢À –6ÆÆ&6·3¢° ’òò&w2&S¢‡FööÇF——FV×2ÂFF –&Vf÷&UF—FÆS¢†VÇW'2Cææö÷À —F—FÆS¢gVæ7F–öâ‡FööÇF——FV×2ÂFF’° —f"F—FÆRÒrs° —f"Æ&VÇ2ÒFFæÆ&VÇ3° —f"Æ&VÄ6÷VçBÒÆ&VÇ2òÆ&VÇ2æÆVæwF‚¢°  ––b‡FööÇF——FV×2æÆVæwF‚â’° —f"—FVÒÒFööÇF——FV×5³Ó° ––b†—FVÒæÆ&VÂ’° —F—FÆRÒ—FVÒæÆ&VÃ° —ÒVÇ6R–b†—FVÒç„Æ&VÂ’° —F—FÆRÒ—FVÒç„Æ&VÃ° —ÒVÇ6R–b†Æ&VÄ6÷VçBâbb—FVÒæ–æFW‚ÂÆ&VÄ6÷VçB’° —F—FÆRÒÆ&VÇ5¶—FVÒæ–æFW…Ó° —Ð —Ð  —&WGW&âF—FÆS° —ÒÀ –gFW%F—FÆS¢†VÇW'2Cææö÷À  ’òò&w2&S¢‡FööÇF——FV×2ÂFF –&Vf÷&T&öG“¢†VÇW'2Cææö÷À  ’òò&w2&S¢‡FööÇF——FVÒÂFF –&Vf÷&TÆ&VÃ¢†VÇW'2Cææö÷À –Æ&VÃ¢gVæ7F–öâ‡FööÇF——FVÒÂFF’° —f"Æ&VÂÒFFæFF6WG5·FööÇF——FVÒæFF6WD–æFW…ÒæÆ&VÂÇÂrs°  ––b†Æ&VÂ’° –Æ&VÂ³Òs¢s° —Ð ––b‚†VÇW'2Cæ—4çVÆÄ÷%VæFVb‡FööÇF——FVÒçfÇVR’’° –Æ&VÂ³ÒFööÇF——FVÒçfÇVS° —ÒVÇ6R° –Æ&VÂ³ÒFööÇF——FVÒç”Æ&VÃ° —Ð —&WGW&âÆ&VÃ° —ÒÀ –Æ&VÄ6öÆ÷#¢gVæ7F–öâ‡FööÇF——FVÒÂ6†'B’° —f"ÖWFÒ6†'BævWDFF6WDÖWF‡FööÇF——FVÒæFF6WD–æFW‚“° —f"7F—fTVÆVÖVçBÒÖWFæFF·FööÇF——FVÒæ–æFW…Ó° —f"f–WrÒ7F—fTVÆVÖVçBå÷f–Ws° —&WGW&â° –&÷&FW$6öÆ÷#¢f–Wræ&÷&FW$6öÆ÷"À –&6¶w&÷VæD6öÆ÷#¢f–Wræ&6¶w&÷VæD6öÆ÷  —Ó° —ÒÀ –Æ&VÅFW‡D6öÆ÷#¢gVæ7F–öâ‚’° —&WGW&âF†—2åö÷F–öç2æ&öG”föçD6öÆ÷#° —ÒÀ –gFW$Æ&VÃ¢†VÇW'2Cææö÷À  ’òò&w2&S¢‡FööÇF——FV×2ÂFF –gFW$&öG“¢†VÇW'2Cææö÷À  ’òò&w2&S¢‡FööÇF——FV×2ÂFF –&Vf÷&Tfö÷FW#¢†VÇW'2Cææö÷À –fö÷FW#¢†VÇW'2Cææö÷À –gFW$fö÷FW#¢†VÇW'2Cææö÷  —Ð —Ð§Ò“° §f"÷6—F–öæW'2Ò° ’ò¢  ’¢fW&vRÖöFRÆ6W2F†RFööÇF—BF†RfW&vR÷6—F–öâöbF†RVÆVÖVçG26†÷và ’¢gVæ7F–öâ6†'BåFööÇF—ç÷6—F–öæW'2æfW&vP ’¢&ÒVÆVÖVçG2´6†'DVÆVÖVçEµ×ÒF†RVÆVÖVçG2&V–ærF—7Æ–VB–âF†RFööÇF—  ’¢&WGW&ç2¶ö&¦V7GÒFööÇF—÷6—F–öà ’¢ð –fW&vS¢gVæ7F–öâ†VÆVÖVçG2’° ––b‚VÆVÖVçG2æÆVæwF‚’° —&WGW&âfÇ6S° —Ð  —f"’ÂÆVã° —f"‚Ò° —f"’Ò° —f"6÷VçBÒ°  –f÷"†’ÒÂÆVâÒVÆVÖVçG2æÆVæwFƒ²’ÂÆVã²²¶’’° —f"VÂÒVÆVÖVçG5¶•Ó° ––b†VÂbbVÂæ†5fÇVR‚’’° —f"÷2ÒVÂçFööÇF—÷6—F–öâ‚“° —‚³Ò÷2çƒ° —’³Ò÷2ç“° ’²¶6÷VçC° —Ð —Ð  —&WGW&â° —ƒ¢‚ò6÷VçBÀ —“¢’ò6÷Vç@ —Ó° —ÒÀ  ’ò¢  ’¢vWG2F†RFööÇF—÷6—F–öâæV&W7BöbF†R—FVÒæV&W7BFòF†RWfVçB÷6—F–öà ’¢gVæ7F–öâ6†'BåFööÇF—ç÷6—F–öæW'2ææV&W7@ ’¢&ÒVÆVÖVçG2´6†'BäVÆVÖVçEµ×ÒF†RFööÇF—VÆVÖVçG0 ’¢&ÒWfVçE÷6—F–öâ¶ö&¦V7GÒF†R÷6—F–öâöbF†RWfVçB–â6çf26ö÷&F–æFW0 ’¢&WGW&ç2¶ö&¦V7GÒF†RFööÇF—÷6—F–öà ’¢ð –æV&W7C¢gVæ7F–öâ†VÆVÖVçG2ÂWfVçE÷6—F–öâ’° —f"‚ÒWfVçE÷6—F–öâçƒ° —f"’ÒWfVçE÷6—F–öâç“° —f"Ö–äF—7Fæ6RÒçVÖ&W"åõ4•D•dUô”äd”ä•E“° —f"’ÂÆVâÂæV&W7DVÆVÖVçC°  –f÷"†’ÒÂÆVâÒVÆVÖVçG2æÆVæwFƒ²’ÂÆVã²²¶’’° —f"VÂÒVÆVÖVçG5¶•Ó° ––b†VÂbbVÂæ†5fÇVR‚’’° —f"6VçFW"ÒVÂævWD6VçFW%ö–çB‚“° —f"BÒ†VÇW'2CæF—7Fæ6T&WGvVVåö–çG2†WfVçE÷6—F–öâÂ6VçFW"“°  ––b†BÂÖ–äF—7Fæ6R’° –Ö–äF—7Fæ6RÒC° –æV&W7DVÆVÖVçBÒVÃ° —Ð —Ð —Ð  ––b†æV&W7DVÆVÖVçB’° —f"GÒæV&W7DVÆVÖVçBçFööÇF—÷6—F–öâ‚“° —‚ÒGçƒ° —’ÒGç“° —Ð  —&WGW&â° —ƒ¢‚À —“¢ —Ó° —Ð§Ó° ¢òò†VÇW"FòW6‚÷"6öæ6B&6VBöâ–bF†R&æB&ÖWFW"—2â'&’÷"æ÷@¦gVæ7F–öâW6„÷$6öæ6B†&6RÂFõW6‚’° ––b‡FõW6‚’° ––b††VÇW'2Cæ—4'&’‡FõW6‚’’° ’òò&6RÒ&6Ræ6öæ6B‡FõW6‚“° ”'&’ç&÷F÷G—RçW6‚æÇ’†&6RÂFõW6‚“° —ÒVÇ6R° –&6RçW6‚‡FõW6‚“° —Ð —Ð  —&WGW&â&6S°§Ð ¢ò¢ ¢¢&WGW&ç2'&’öb7G&–æw27Æ—B'’æWvÆ–æP¢¢&Ò·7G&–æwÒfÇVRÒF†RfÇVRFò7Æ—B'’æWvÆ–æRà¢¢&WGW&ç2·7G&–æuµ×ÒfÇVR–bæWvÆ–æR&W6VçBÒ&WGW&æVBg&öÒ7G&–ær7Æ—B‚’ÖWF†ö@¢¢gVæ7F–öà¢¢ð¦gVæ7F–öâ7Æ—DæWvÆ–æW2‡7G"’° ––b‚‡G—Vöb7G"ÓÓÒw7G&–ærrÇÂ7G"–ç7Fæ6Vöb7G&–ær’bb7G"æ–æFW„öb‚uÆâr’âÓ’° —&WGW&â7G"ç7Æ—B‚uÆâr“° —Ð —&WGW&â7G#°§Ð  ¢ò¢ ¢¢&—fFR†VÇW"Fò7&VFRFööÇF——FVÒÖöFVÀ¢¢&ÒVÆVÖVçBÒF†R6†'BVÆVÖVçB‡ö–çBÂ&2Â&"’Fò7&VFRF†RFööÇF——FVÒf÷ ¢¢&WGW&âæWrFööÇF——FVÐ¢¢ð¦gVæ7F–öâ7&VFUFööÇF——FVÒ†VÆVÖVçB’° —f"…66ÆRÒVÆVÖVçBå÷…66ÆS° —f"•66ÆRÒVÆVÖVçBå÷•66ÆRÇÂVÆVÖVçBå÷66ÆS²òò†æFÆR&F"ÇÂöÆ$&V6†'G0 —f"–æFW‚ÒVÆVÖVçBåö–æFWƒ° —f"FF6WD–æFW‚ÒVÆVÖVçBåöFF6WD–æFWƒ° —f"6öçG&öÆÆW"ÒVÆVÖVçBåö6†'BævWDFF6WDÖWF†FF6WD–æFW‚’æ6öçG&öÆÆW#° —f"–æFW…66ÆRÒ6öçG&öÆÆW"åövWD–æFW…66ÆR‚“° —f"fÇVU66ÆRÒ6öçG&öÆÆW"åövWEfÇVU66ÆR‚“°  —&WGW&â° —„Æ&VÃ¢…66ÆRò…66ÆRævWDÆ&VÄf÷$–æFW‚†–æFW‚ÂFF6WD–æFW‚’¢rrÀ —”Æ&VÃ¢•66ÆRò•66ÆRævWDÆ&VÄf÷$–æFW‚†–æFW‚ÂFF6WD–æFW‚’¢rrÀ –Æ&VÃ¢–æFW…66ÆRòrr²–æFW…66ÆRævWDÆ&VÄf÷$–æFW‚†–æFW‚ÂFF6WD–æFW‚’¢rrÀ —fÇVS¢fÇVU66ÆRòrr²fÇVU66ÆRævWDÆ&VÄf÷$–æFW‚†–æFW‚ÂFF6WD–æFW‚’¢rrÀ ––æFWƒ¢–æFW‚À –FF6WD–æFWƒ¢FF6WD–æFW‚À —ƒ¢VÆVÖVçBåöÖöFVÂç‚À —“¢VÆVÖVçBåöÖöFVÂç —Ó°§Ð ¢ò¢ ¢¢†VÇW"FòvWBF†R&W6WBÖöFVÂf÷"F†RFööÇF— ¢¢&ÒFööÇF—÷G2¶ö&¦V7GÒF†RFööÇF—÷F–öç0¢¢ð¦gVæ7F–öâvWD&6TÖöFVÂ‡FööÇF—÷G2’° —f"vÆö&ÄFVfVÇG2Ò6÷&UöFVfVÇG2ævÆö&Ã°  —&WGW&â° ’òò÷6—F–öæ–æp —…FF–æs¢FööÇF—÷G2ç…FF–ærÀ —•FF–æs¢FööÇF—÷G2ç•FF–ærÀ —„Æ–vã¢FööÇF—÷G2ç„Æ–vâÀ —”Æ–vã¢FööÇF—÷G2ç”Æ–vâÀ  ’òòG&v–ærF—&V7F–öâæBFW‡BF—&V7F–öà —'FÃ¢FööÇF—÷G2ç'FÂÀ —FW‡DF—&V7F–öã¢FööÇF—÷G2çFW‡DF—&V7F–öâÀ  ’òò&öG –&öG”föçD6öÆ÷#¢FööÇF—÷G2æ&öG”föçD6öÆ÷"À •ö&öG”föçDfÖ–Ç“¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2æ&öG”föçDfÖ–Ç’ÂvÆö&ÄFVfVÇG2æFVfVÇDföçDfÖ–Ç’’À •ö&öG”föçE7G–ÆS¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2æ&öG”föçE7G–ÆRÂvÆö&ÄFVfVÇG2æFVfVÇDföçE7G–ÆR’À •ö&öG”Æ–vã¢FööÇF—÷G2æ&öG”Æ–vâÀ –&öG”föçE6—¦S¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2æ&öG”föçE6—¦RÂvÆö&ÄFVfVÇG2æFVfVÇDföçE6—¦R’À –&öG•76–æs¢FööÇF—÷G2æ&öG•76–ærÀ  ’òòF—FÆP —F—FÆTföçD6öÆ÷#¢FööÇF—÷G2çF—FÆTföçD6öÆ÷"À •÷F—FÆTföçDfÖ–Ç“¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2çF—FÆTföçDfÖ–Ç’ÂvÆö&ÄFVfVÇG2æFVfVÇDföçDfÖ–Ç’’À •÷F—FÆTföçE7G–ÆS¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2çF—FÆTföçE7G–ÆRÂvÆö&ÄFVfVÇG2æFVfVÇDföçE7G–ÆR’À —F—FÆTföçE6—¦S¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2çF—FÆTföçE6—¦RÂvÆö&ÄFVfVÇG2æFVfVÇDföçE6—¦R’À •÷F—FÆTÆ–vã¢FööÇF—÷G2çF—FÆTÆ–vâÀ —F—FÆU76–æs¢FööÇF—÷G2çF—FÆU76–ærÀ —F—FÆTÖ&v–ä&÷GFöÓ¢FööÇF—÷G2çF—FÆTÖ&v–ä&÷GFöÒÀ  ’òòfö÷FW  –fö÷FW$föçD6öÆ÷#¢FööÇF—÷G2æfö÷FW$föçD6öÆ÷"À •öfö÷FW$föçDfÖ–Ç“¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2æfö÷FW$föçDfÖ–Ç’ÂvÆö&ÄFVfVÇG2æFVfVÇDföçDfÖ–Ç’’À •öfö÷FW$föçE7G–ÆS¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2æfö÷FW$föçE7G–ÆRÂvÆö&ÄFVfVÇG2æFVfVÇDföçE7G–ÆR’À –fö÷FW$föçE6—¦S¢fÇVT÷$FVfVÇBC‚‡FööÇF—÷G2æfö÷FW$föçE6—¦RÂvÆö&ÄFVfVÇG2æFVfVÇDföçE6—¦R’À •öfö÷FW$Æ–vã¢FööÇF—÷G2æfö÷FW$Æ–vâÀ –fö÷FW%76–æs¢FööÇF—÷G2æfö÷FW%76–ærÀ –fö÷FW$Ö&v–åF÷¢FööÇF—÷G2æfö÷FW$Ö&v–åF÷À  ’òòV&æ6P –6&WE6—¦S¢FööÇF—÷G2æ6&WE6—¦RÀ –6÷&æW%&F—W3¢FööÇF—÷G2æ6÷&æW%&F—W2À –&6¶w&÷VæD6öÆ÷#¢FööÇF—÷G2æ&6¶w&÷VæD6öÆ÷"À –÷6—G“¢À –ÆVvVæD6öÆ÷$&6¶w&÷VæC¢FööÇF—÷G2æ×VÇF”¶W”&6¶w&÷VæBÀ –F—7Æ”6öÆ÷'3¢FööÇF—÷G2æF—7Æ”6öÆ÷'2À –&÷&FW$6öÆ÷#¢FööÇF—÷G2æ&÷&FW$6öÆ÷"À –&÷&FW%v–GFƒ¢FööÇF—÷G2æ&÷&FW%v–GF€ —Ó°§Ð ¢ò¢ ¢¢vWBF†R6—¦RöbF†RFööÇF— ¢¢ð¦gVæ7F–öâvWEFööÇF—6—¦R‡FööÇF—ÂÖöFVÂ’° —f"7G‚ÒFööÇF—åö6†'Bæ7Gƒ°  —f"†V–v‡BÒÖöFVÂç•FF–ær¢#²òòFööÇF—FF–æp —f"v–GF‚Ò°  ’òò6÷VçBöbÆÂÆ–æW2–âF†R&öG —f"&öG’ÒÖöFVÂæ&öG“° —f"6öÖ&–æVD&öG”ÆVæwF‚Ò&öG’ç&VGV6R†gVæ7F–öâ†6÷VçBÂ&öG”—FVÒ’° —&WGW&â6÷VçB²&öG”—FVÒæ&Vf÷&RæÆVæwF‚²&öG”—FVÒæÆ–æW2æÆVæwF‚²&öG”—FVÒægFW"æÆVæwFƒ° —ÒÂ“° –6öÖ&–æVD&öG”ÆVæwF‚³ÒÖöFVÂæ&Vf÷&T&öG’æÆVæwF‚²ÖöFVÂægFW$&öG’æÆVæwFƒ°  —f"F—FÆTÆ–æT6÷VçBÒÖöFVÂçF—FÆRæÆVæwFƒ° —f"fö÷FW$Æ–æT6÷VçBÒÖöFVÂæfö÷FW"æÆVæwFƒ° —f"F—FÆTföçE6—¦RÒÖöFVÂçF—FÆTföçE6—¦S° —f"&öG”föçE6—¦RÒÖöFVÂæ&öG”föçE6—¦S° —f"fö÷FW$föçE6—¦RÒÖöFVÂæfö÷FW$föçE6—¦S°  –†V–v‡B³ÒF—FÆTÆ–æT6÷VçB¢F—FÆTföçE6—¦S²òòF—FÆRÆ–æW0 –†V–v‡B³ÒF—FÆTÆ–æT6÷VçBò‡F—FÆTÆ–æT6÷VçBÒ’¢ÖöFVÂçF—FÆU76–ær¢²òòF—FÆRÆ–æR76–æp –†V–v‡B³ÒF—FÆTÆ–æT6÷VçBòÖöFVÂçF—FÆTÖ&v–ä&÷GFöÒ¢²òòF—FÆRw2&÷GFöÒÖ&v–à –†V–v‡B³Ò6öÖ&–æVD&öG”ÆVæwF‚¢&öG”föçE6—¦S²òò&öG’Æ–æW0 –†V–v‡B³Ò6öÖ&–æVD&öG”ÆVæwF‚ò†6öÖ&–æVD&öG”ÆVæwF‚Ò’¢ÖöFVÂæ&öG•76–ær¢²òò&öG’Æ–æR76–æp –†V–v‡B³Òfö÷FW$Æ–æT6÷VçBòÖöFVÂæfö÷FW$Ö&v–åF÷¢²òòfö÷FW"Ö&v–à –†V–v‡B³Òfö÷FW$Æ–æT6÷VçB¢†fö÷FW$föçE6—¦R“²òòfö÷FW"Æ–æW0 –†V–v‡B³Òfö÷FW$Æ–æT6÷VçBò†fö÷FW$Æ–æT6÷VçBÒ’¢ÖöFVÂæfö÷FW%76–ær¢²òòfö÷FW"Æ–æR76–æp  ’òòF—FÆRv–GF€ —f"v–GF…FF–ærÒ° —f"Ö„Æ–æUv–GF‚ÒgVæ7F–öâ†Æ–æR’° —v–GF‚ÒÖF‚æÖ‚‡v–GF‚Â7G‚æÖV7W&UFW‡B†Æ–æR’çv–GF‚²v–GF…FF–ær“° —Ó°  –7G‚æföçBÒ†VÇW'2CæföçE7G&–ær‡F—FÆTföçE6—¦RÂÖöFVÂå÷F—FÆTföçE7G–ÆRÂÖöFVÂå÷F—FÆTföçDfÖ–Ç’“° –†VÇW'2CæV6‚†ÖöFVÂçF—FÆRÂÖ„Æ–æUv–GF‚“°  ’òò&öG’v–GF€ –7G‚æföçBÒ†VÇW'2CæföçE7G&–ær†&öG”föçE6—¦RÂÖöFVÂåö&öG”föçE7G–ÆRÂÖöFVÂåö&öG”föçDfÖ–Ç’“° –†VÇW'2CæV6‚†ÖöFVÂæ&Vf÷&T&öG’æ6öæ6B†ÖöFVÂægFW$&öG’’ÂÖ„Æ–æUv–GF‚“°  ’òò&öG’Æ–æW2Ö’–æ6ÇVFR6öÖRW‡G&v–GF‚GVRFòF†R6öÆ÷"&÷€ —v–GF…FF–ærÒÖöFVÂæF—7Æ”6öÆ÷'2ò†&öG”föçE6—¦R²"’¢° –†VÇW'2CæV6‚†&öG’ÂgVæ7F–öâ†&öG”—FVÒ’° –†VÇW'2CæV6‚†&öG”—FVÒæ&Vf÷&RÂÖ„Æ–æUv–GF‚“° –†VÇW'2CæV6‚†&öG”—FVÒæÆ–æW2ÂÖ„Æ–æUv–GF‚“° –†VÇW'2CæV6‚†&öG”—FVÒægFW"ÂÖ„Æ–æUv–GF‚“° —Ò“°  ’òò&W6WB&6²Fò  —v–GF…FF–ærÒ°  ’òòfö÷FW"v–GF€ –7G‚æföçBÒ†VÇW'2CæföçE7G&–ær†fö÷FW$föçE6—¦RÂÖöFVÂåöfö÷FW$föçE7G–ÆRÂÖöFVÂåöfö÷FW$föçDfÖ–Ç’“° –†VÇW'2CæV6‚†ÖöFVÂæfö÷FW"ÂÖ„Æ–æUv–GF‚“°  ’òòFBFF–æp —v–GF‚³Ò"¢ÖöFVÂç…FF–æs°  —&WGW&â° —v–GFƒ¢v–GF‚À –†V–v‡C¢†V–v‡@ —Ó°§Ð ¢ò¢ ¢¢†VÇW"FòvWBF†RÆ–væÖVçBöbFööÇF—v—fVâF†R6—¦P¢¢ð¦gVæ7F–öâFWFW&Ö–æTÆ–væÖVçB‡FööÇF—Â6—¦R’° —f"ÖöFVÂÒFööÇF—åöÖöFVÃ° —f"6†'BÒFööÇF—åö6†'C° —f"6†'D&VÒFööÇF—åö6†'Bæ6†'D&V° —f"„Æ–vâÒv6VçFW"s° —f"”Æ–vâÒv6VçFW"s°  ––b†ÖöFVÂç’Â6—¦Ræ†V–v‡B’° —”Æ–vâÒwF÷s° —ÒVÇ6R–b†ÖöFVÂç’â†6†'Bæ†V–v‡BÒ6—¦Ræ†V–v‡B’’° —”Æ–vâÒv&÷GFöÒs° —Ð  —f"ÆbÂ&c²òògVæ7F–öç2FòFWFW&Ö–æRÆVgBÂ&–v‡BÆ–væÖVç@ —f"öÆbÂ÷&c²òògVæ7F–öç2FòFWFW&Ö–æR–bÆVgB÷&–v‡BÆ–væÖVçB6W6W2FööÇF—Fòvò÷WG6–FR6†'@ —f"–c²òògVæ7F–öâFòvWBF†R’Æ–væÖVçB–bF†RFööÇF—vöW2÷WG6–FRöbF†RÆVgB÷"&–v‡BVFvW0 —f"Ö–E‚Ò†6†'D&VæÆVgB²6†'D&Vç&–v‡B’ò#° —f"Ö–E’Ò†6†'D&VçF÷²6†'D&Væ&÷GFöÒ’ò#°  ––b‡”Æ–vâÓÓÒv6VçFW"r’° –ÆbÒgVæ7F–öâ‡‚’° —&WGW&â‚ÃÒÖ–Eƒ° —Ó° —&bÒgVæ7F–öâ‡‚’° —&WGW&â‚âÖ–Eƒ° —Ó° —ÒVÇ6R° –ÆbÒgVæ7F–öâ‡‚’° —&WGW&â‚ÃÒ‡6—¦Rçv–GF‚ò"“° —Ó° —&bÒgVæ7F–öâ‡‚’° —&WGW&â‚ãÒ†6†'Bçv–GF‚Ò‡6—¦Rçv–GF‚ò"’“° —Ó° —Ð  –öÆbÒgVæ7F–öâ‡‚’° —&WGW&â‚²6—¦Rçv–GF‚²ÖöFVÂæ6&WE6—¦R²ÖöFVÂæ6&WEFF–ærâ6†'Bçv–GFƒ° —Ó° –÷&bÒgVæ7F–öâ‡‚’° —&WGW&â‚Ò6—¦Rçv–GF‚ÒÖöFVÂæ6&WE6—¦RÒÖöFVÂæ6&WEFF–ærÂ° —Ó° —–bÒgVæ7F–öâ‡’’° —&WGW&â’ÃÒÖ–E’òwF÷r¢v&÷GFöÒs° —Ó°  ––b†Æb†ÖöFVÂç‚’’° —„Æ–vâÒvÆVgBs°  ’òò—2FööÇF—Föòv–FRæBvöW2÷fW"F†R&–v‡B6–FRöbF†R6†'Bãð ––b†öÆb†ÖöFVÂç‚’’° —„Æ–vâÒv6VçFW"s° —”Æ–vâÒ–b†ÖöFVÂç’“° —Ð —ÒVÇ6R–b‡&b†ÖöFVÂç‚’’° —„Æ–vâÒw&–v‡Bs°  ’òò—2FööÇF—Föòv–FRæBvöW2÷WG6–FRÆVgBVFvRöb6çf3ð ––b†÷&b†ÖöFVÂç‚’’° —„Æ–vâÒv6VçFW"s° —”Æ–vâÒ–b†ÖöFVÂç’“° —Ð —Ð  —f"÷G2ÒFööÇF—åö÷F–öç3° —&WGW&â° —„Æ–vã¢÷G2ç„Æ–vâò÷G2ç„Æ–vâ¢„Æ–vâÀ —”Æ–vã¢÷G2ç”Æ–vâò÷G2ç”Æ–vâ¢”Æ–và —Ó°§Ð ¢ò¢ ¢¢†VÇW"FòvWBF†RÆö6F–öâFööÇF—æVVG2Fò&RÆ6VBBv—fVâF†R–æ—F–Â÷6—F–öâ‡f–F†RfÒ’æBF†R6—¦RæBÆ–væÖVç@¢¢ð¦gVæ7F–öâvWD&6¶w&÷VæEö–çB‡fÒÂ6—¦RÂÆ–væÖVçBÂ6†'B’° ’òò&6¶w&÷VæB÷6—F–öà —f"‚ÒfÒçƒ° —f"’ÒfÒç“°  —f"6&WE6—¦RÒfÒæ6&WE6—¦S° —f"6&WEFF–ærÒfÒæ6&WEFF–æs° —f"6÷&æW%&F—W2ÒfÒæ6÷&æW%&F—W3° —f"„Æ–vâÒÆ–væÖVçBç„Æ–vã° —f"”Æ–vâÒÆ–væÖVçBç”Æ–vã° —f"FF–ætæE6—¦RÒ6&WE6—¦R²6&WEFF–æs° —f"&F—W4æEFF–ærÒ6÷&æW%&F—W2²6&WEFF–æs°  ––b‡„Æ–vâÓÓÒw&–v‡Br’° —‚ÓÒ6—¦Rçv–GFƒ° —ÒVÇ6R–b‡„Æ–vâÓÓÒv6VçFW"r’° —‚ÓÒ‡6—¦Rçv–GF‚ò"“° ––b‡‚²6—¦Rçv–GF‚â6†'Bçv–GF‚’° —‚Ò6†'Bçv–GF‚Ò6—¦Rçv–GFƒ° —Ð ––b‡‚Â’° —‚Ò° —Ð —Ð  ––b‡”Æ–vâÓÓÒwF÷r’° —’³ÒFF–ætæE6—¦S° —ÒVÇ6R–b‡”Æ–vâÓÓÒv&÷GFöÒr’° —’ÓÒ6—¦Ræ†V–v‡B²FF–ætæE6—¦S° —ÒVÇ6R° —’ÓÒ‡6—¦Ræ†V–v‡Bò"“° —Ð  ––b‡”Æ–vâÓÓÒv6VçFW"r’° ––b‡„Æ–vâÓÓÒvÆVgBr’° —‚³ÒFF–ætæE6—¦S° —ÒVÇ6R–b‡„Æ–vâÓÓÒw&–v‡Br’° —‚ÓÒFF–ætæE6—¦S° —Ð —ÒVÇ6R–b‡„Æ–vâÓÓÒvÆVgBr’° —‚ÓÒ&F—W4æEFF–æs° —ÒVÇ6R–b‡„Æ–vâÓÓÒw&–v‡Br’° —‚³Ò&F—W4æEFF–æs° —Ð  —&WGW&â° —ƒ¢‚À —“¢ —Ó°§Ð ¦gVæ7F–öâvWDÆ–væVE‚‡fÒÂÆ–vâ’° —&WGW&âÆ–vâÓÓÒv6VçFW"p “òfÒç‚²fÒçv–GF‚ò  “¢Æ–vâÓÓÒw&–v‡Bp “òfÒç‚²fÒçv–GF‚ÒfÒç…FF–æp “¢fÒç‚²fÒç…FF–æs°§Ð ¢ò¢ ¢¢†VÇW"Fò'V–ÆB&Vf÷&RæBgFW"&öG’Æ–æW0¢¢ð¦gVæ7F–öâvWD&Vf÷&TgFW$&öG”Æ–æW2†6ÆÆ&6²’° —&WGW&âW6„÷$6öæ6B…µÒÂ7Æ—DæWvÆ–æW2†6ÆÆ&6²’“°§Ð §f"W‡÷'G2CBÒ6÷&UöVÆVÖVçBæW‡FVæB‡° ––æ—F–Æ—¦S¢gVæ7F–öâ‚’° —F†—2åöÖöFVÂÒvWD&6TÖöFVÂ‡F†—2åö÷F–öç2“° —F†—2åöÆ7D7F—fRÒµÓ° —ÒÀ  ’òòvWBF†RF—FÆP ’òò&w2&S¢‡FööÇF——FVÒÂFF –vWEF—FÆS¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRåö÷F–öç3° —f"6ÆÆ&6·2Ò÷G2æ6ÆÆ&6·3°  —f"&Vf÷&UF—FÆRÒ6ÆÆ&6·2æ&Vf÷&UF—FÆRæÇ’†ÖRÂ&wVÖVçG2“° —f"F—FÆRÒ6ÆÆ&6·2çF—FÆRæÇ’†ÖRÂ&wVÖVçG2“° —f"gFW%F—FÆRÒ6ÆÆ&6·2ægFW%F—FÆRæÇ’†ÖRÂ&wVÖVçG2“°  —f"Æ–æW2ÒµÓ° –Æ–æW2ÒW6„÷$6öæ6B†Æ–æW2Â7Æ—DæWvÆ–æW2†&Vf÷&UF—FÆR’“° –Æ–æW2ÒW6„÷$6öæ6B†Æ–æW2Â7Æ—DæWvÆ–æW2‡F—FÆR’“° –Æ–æW2ÒW6„÷$6öæ6B†Æ–æW2Â7Æ—DæWvÆ–æW2†gFW%F—FÆR’“°  —&WGW&âÆ–æW3° —ÒÀ  ’òò&w2&S¢‡FööÇF——FVÒÂFF –vWD&Vf÷&T&öG“¢gVæ7F–öâ‚’° —&WGW&âvWD&Vf÷&TgFW$&öG”Æ–æW2‡F†—2åö÷F–öç2æ6ÆÆ&6·2æ&Vf÷&T&öG’æÇ’‡F†—2Â&wVÖVçG2’“° —ÒÀ  ’òò&w2&S¢‡FööÇF——FVÒÂFF –vWD&öG“¢gVæ7F–öâ‡FööÇF——FV×2ÂFF’° —f"ÖRÒF†—3° —f"6ÆÆ&6·2ÒÖRåö÷F–öç2æ6ÆÆ&6·3° —f"&öG”—FV×2ÒµÓ°  –†VÇW'2CæV6‚‡FööÇF——FV×2ÂgVæ7F–öâ‡FööÇF——FVÒ’° —f"&öG”—FVÒÒ° –&Vf÷&S¢µÒÀ –Æ–æW3¢µÒÀ –gFW#¢µÐ —Ó° —W6„÷$6öæ6B†&öG”—FVÒæ&Vf÷&RÂ7Æ—DæWvÆ–æW2†6ÆÆ&6·2æ&Vf÷&TÆ&VÂæ6ÆÂ†ÖRÂFööÇF——FVÒÂFF’’“° —W6„÷$6öæ6B†&öG”—FVÒæÆ–æW2Â6ÆÆ&6·2æÆ&VÂæ6ÆÂ†ÖRÂFööÇF——FVÒÂFF’“° —W6„÷$6öæ6B†&öG”—FVÒægFW"Â7Æ—DæWvÆ–æW2†6ÆÆ&6·2ægFW$Æ&VÂæ6ÆÂ†ÖRÂFööÇF——FVÒÂFF’’“°  –&öG”—FV×2çW6‚†&öG”—FVÒ“° —Ò“°  —&WGW&â&öG”—FV×3° —ÒÀ  ’òò&w2&S¢‡FööÇF——FVÒÂFF –vWDgFW$&öG“¢gVæ7F–öâ‚’° —&WGW&âvWD&Vf÷&TgFW$&öG”Æ–æW2‡F†—2åö÷F–öç2æ6ÆÆ&6·2ægFW$&öG’æÇ’‡F†—2Â&wVÖVçG2’“° —ÒÀ  ’òòvWBF†Rfö÷FW"æB&Vf÷&Tfö÷FW"æBgFW$fö÷FW"Æ–æW0 ’òò&w2&S¢‡FööÇF——FVÒÂFF –vWDfö÷FW#¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6ÆÆ&6·2ÒÖRåö÷F–öç2æ6ÆÆ&6·3°  —f"&Vf÷&Tfö÷FW"Ò6ÆÆ&6·2æ&Vf÷&Tfö÷FW"æÇ’†ÖRÂ&wVÖVçG2“° —f"fö÷FW"Ò6ÆÆ&6·2æfö÷FW"æÇ’†ÖRÂ&wVÖVçG2“° —f"gFW$fö÷FW"Ò6ÆÆ&6·2ægFW$fö÷FW"æÇ’†ÖRÂ&wVÖVçG2“°  —f"Æ–æW2ÒµÓ° –Æ–æW2ÒW6„÷$6öæ6B†Æ–æW2Â7Æ—DæWvÆ–æW2†&Vf÷&Tfö÷FW"’“° –Æ–æW2ÒW6„÷$6öæ6B†Æ–æW2Â7Æ—DæWvÆ–æW2†fö÷FW"’“° –Æ–æW2ÒW6„÷$6öæ6B†Æ–æW2Â7Æ—DæWvÆ–æW2†gFW$fö÷FW"’“°  —&WGW&âÆ–æW3° —ÒÀ  —WFFS¢gVæ7F–öâ†6†ævVB’° —f"ÖRÒF†—3° —f"÷G2ÒÖRåö÷F–öç3°  ’òòæVVBFò&VvVæW&FRF†RÖöFVÂ&V6W6R—G2f7FW"F†âW6–ærW‡FVæBæB—B—2æV6W76'’GVRFòF†R÷F–Ö—¦F–öâ–â6†'BäVÆVÖVçBçG&ç6—F–öà ’òòF†BFöW2÷f–WrÒöÖöFVÂ–bV6RÓÓÒâF†—26W6W2F†R&æBFööÇF—WFFRFò6WB&÷W'F–W2–â&÷F‚F†Rf–WræBÖöFVÂBF†R6ÖRF–ÖP ’òòv†–6‚'&V·2ç’æ–ÖF–öç2à —f"W†—7F–ætÖöFVÂÒÖRåöÖöFVÃ° —f"ÖöFVÂÒÖRåöÖöFVÂÒvWD&6TÖöFVÂ†÷G2“° —f"7F—fRÒÖRåö7F—fS°  —f"FFÒÖRåöFF°  ’òò–âF†R66Rv†W&R7F—fRæÆVæwF‚ÓÓÒvRæVVBFò¶VWF†W6RBW†—7F–ærfÇVW2f÷"vööBæ–ÖF–öç0 —f"Æ–væÖVçBÒ° —„Æ–vã¢W†—7F–ætÖöFVÂç„Æ–vâÀ —”Æ–vã¢W†—7F–ætÖöFVÂç”Æ–và —Ó° —f"&6¶w&÷VæEö–çBÒ° —ƒ¢W†—7F–ætÖöFVÂç‚À —“¢W†—7F–ætÖöFVÂç —Ó° —f"FööÇF—6—¦RÒ° —v–GFƒ¢W†—7F–ætÖöFVÂçv–GF‚À –†V–v‡C¢W†—7F–ætÖöFVÂæ†V–v‡@ —Ó° —f"FööÇF—÷6—F–öâÒ° —ƒ¢W†—7F–ætÖöFVÂæ6&WE‚À —“¢W†—7F–ætÖöFVÂæ6&WE —Ó°  —f"’ÂÆVã°  ––b†7F—fRæÆVæwF‚’° –ÖöFVÂæ÷6—G’Ò°  —f"Æ&VÄ6öÆ÷'2ÒµÓ° —f"Æ&VÅFW‡D6öÆ÷'2ÒµÓ° —FööÇF—÷6—F–öâÒ÷6—F–öæW'5¶÷G2ç÷6—F–öåÒæ6ÆÂ†ÖRÂ7F—fRÂÖRåöWfVçE÷6—F–öâ“°  —f"FööÇF——FV×2ÒµÓ° –f÷"†’ÒÂÆVâÒ7F—fRæÆVæwFƒ²’ÂÆVã²²¶’’° —FööÇF——FV×2çW6‚†7&VFUFööÇF——FVÒ†7F—fU¶•Ò’“° —Ð  ’òò–bF†RW6W"&÷f–FVBf–ÇFW"gVæ7F–öâÂW6R—BFòÖöF–g’F†RFööÇF——FV×0 ––b†÷G2æf–ÇFW"’° —FööÇF——FV×2ÒFööÇF——FV×2æf–ÇFW"†gVæ7F–öâ†’° —&WGW&â÷G2æf–ÇFW"†ÂFF“° —Ò“° —Ð  ’òò–bF†RW6W"&÷f–FVB6÷'F–ærgVæ7F–öâÂW6R—BFòÖöF–g’F†RFööÇF——FV×0 ––b†÷G2æ—FVÕ6÷'B’° —FööÇF——FV×2ÒFööÇF——FV×2ç6÷'B†gVæ7F–öâ†Â"’° —&WGW&â÷G2æ—FVÕ6÷'B†Â"ÂFF“° —Ò“° —Ð  ’òòFWFW&Ö–æR6öÆ÷'2f÷"&÷†W0 –†VÇW'2CæV6‚‡FööÇF——FV×2ÂgVæ7F–öâ‡FööÇF——FVÒ’° –Æ&VÄ6öÆ÷'2çW6‚†÷G2æ6ÆÆ&6·2æÆ&VÄ6öÆ÷"æ6ÆÂ†ÖRÂFööÇF——FVÒÂÖRåö6†'B’“° –Æ&VÅFW‡D6öÆ÷'2çW6‚†÷G2æ6ÆÆ&6·2æÆ&VÅFW‡D6öÆ÷"æ6ÆÂ†ÖRÂFööÇF——FVÒÂÖRåö6†'B’“° —Ò“°   ’òò'V–ÆBF†RFW‡BÆ–æW0 –ÖöFVÂçF—FÆRÒÖRævWEF—FÆR‡FööÇF——FV×2ÂFF“° –ÖöFVÂæ&Vf÷&T&öG’ÒÖRævWD&Vf÷&T&öG’‡FööÇF——FV×2ÂFF“° –ÖöFVÂæ&öG’ÒÖRævWD&öG’‡FööÇF——FV×2ÂFF“° –ÖöFVÂægFW$&öG’ÒÖRævWDgFW$&öG’‡FööÇF——FV×2ÂFF“° –ÖöFVÂæfö÷FW"ÒÖRævWDfö÷FW"‡FööÇF——FV×2ÂFF“°  ’òò–æ—F–Â÷6—F–öæ–æræB6öÆ÷'0 –ÖöFVÂç‚ÒFööÇF—÷6—F–öâçƒ° –ÖöFVÂç’ÒFööÇF—÷6—F–öâç“° –ÖöFVÂæ6&WEFF–ærÒ÷G2æ6&WEFF–æs° –ÖöFVÂæÆ&VÄ6öÆ÷'2ÒÆ&VÄ6öÆ÷'3° –ÖöFVÂæÆ&VÅFW‡D6öÆ÷'2ÒÆ&VÅFW‡D6öÆ÷'3°  ’òòFFö–çG0 –ÖöFVÂæFFö–çG2ÒFööÇF——FV×3°  ’òòvRæVVBFòFWFW&Ö–æRÆ–væÖVçBöbF†RFööÇF—  —FööÇF—6—¦RÒvWEFööÇF—6—¦R‡F†—2ÂÖöFVÂ“° –Æ–væÖVçBÒFWFW&Ö–æTÆ–væÖVçB‡F†—2ÂFööÇF—6—¦R“° ’òòf–æÂ6—¦RæB÷6—F–öà –&6¶w&÷VæEö–çBÒvWD&6¶w&÷VæEö–çB†ÖöFVÂÂFööÇF—6—¦RÂÆ–væÖVçBÂÖRåö6†'B“° —ÒVÇ6R° –ÖöFVÂæ÷6—G’Ò° —Ð  –ÖöFVÂç„Æ–vâÒÆ–væÖVçBç„Æ–vã° –ÖöFVÂç”Æ–vâÒÆ–væÖVçBç”Æ–vã° –ÖöFVÂç‚Ò&6¶w&÷VæEö–çBçƒ° –ÖöFVÂç’Ò&6¶w&÷VæEö–çBç“° –ÖöFVÂçv–GF‚ÒFööÇF—6—¦Rçv–GFƒ° –ÖöFVÂæ†V–v‡BÒFööÇF—6—¦Ræ†V–v‡C°  ’òòö–çBv†W&RF†R6&WBöâF†RFööÇF—ö–çG2Fð –ÖöFVÂæ6&WE‚ÒFööÇF—÷6—F–öâçƒ° –ÖöFVÂæ6&WE’ÒFööÇF—÷6—F–öâç“°  –ÖRåöÖöFVÂÒÖöFVÃ°  ––b†6†ævVBbb÷G2æ7W7FöÒ’° –÷G2æ7W7FöÒæ6ÆÂ†ÖRÂÖöFVÂ“° —Ð  —&WGW&âÖS° —ÒÀ  –G&t6&WC¢gVæ7F–öâ‡FööÇF—ö–çBÂ6—¦R’° —f"7G‚ÒF†—2åö6†'Bæ7Gƒ° —f"fÒÒF†—2å÷f–Ws° —f"6&WE÷6—F–öâÒF†—2ævWD6&WE÷6—F–öâ‡FööÇF—ö–çBÂ6—¦RÂfÒ“°  –7G‚æÆ–æUFò†6&WE÷6—F–öâçƒÂ6&WE÷6—F–öâç““° –7G‚æÆ–æUFò†6&WE÷6—F–öâçƒ"Â6&WE÷6—F–öâç“"“° –7G‚æÆ–æUFò†6&WE÷6—F–öâçƒ2Â6&WE÷6—F–öâç“2“° —ÒÀ –vWD6&WE÷6—F–öã¢gVæ7F–öâ‡FööÇF—ö–çBÂ6—¦RÂfÒ’° —f"ƒÂƒ"Âƒ2Â“Â“"Â“3° —f"6&WE6—¦RÒfÒæ6&WE6—¦S° —f"6÷&æW%&F—W2ÒfÒæ6÷&æW%&F—W3° —f"„Æ–vâÒfÒç„Æ–vã° —f"”Æ–vâÒfÒç”Æ–vã° —f"E‚ÒFööÇF—ö–çBçƒ° —f"E’ÒFööÇF—ö–çBç“° —f"v–GF‚Ò6—¦Rçv–GFƒ° —f"†V–v‡BÒ6—¦Ræ†V–v‡C°  ––b‡”Æ–vâÓÓÒv6VçFW"r’° —“"ÒE’²††V–v‡Bò"“°  ––b‡„Æ–vâÓÓÒvÆVgBr’° —ƒÒEƒ° —ƒ"ÒƒÒ6&WE6—¦S° —ƒ2Òƒ°  —“Ò“"²6&WE6—¦S° —“2Ò“"Ò6&WE6—¦S° —ÒVÇ6R° —ƒÒE‚²v–GFƒ° —ƒ"Òƒ²6&WE6—¦S° —ƒ2Òƒ°  —“Ò“"Ò6&WE6—¦S° —“2Ò“"²6&WE6—¦S° —Ð —ÒVÇ6R° ––b‡„Æ–vâÓÓÒvÆVgBr’° —ƒ"ÒE‚²6÷&æW%&F—W2²†6&WE6—¦R“° —ƒÒƒ"Ò6&WE6—¦S° —ƒ2Òƒ"²6&WE6—¦S° —ÒVÇ6R–b‡„Æ–vâÓÓÒw&–v‡Br’° —ƒ"ÒE‚²v–GF‚Ò6÷&æW%&F—W2Ò6&WE6—¦S° —ƒÒƒ"Ò6&WE6—¦S° —ƒ2Òƒ"²6&WE6—¦S° —ÒVÇ6R° —ƒ"ÒfÒæ6&WEƒ° —ƒÒƒ"Ò6&WE6—¦S° —ƒ2Òƒ"²6&WE6—¦S° —Ð ––b‡”Æ–vâÓÓÒwF÷r’° —“ÒE“° —“"Ò“Ò6&WE6—¦S° —“2Ò“° —ÒVÇ6R° —“ÒE’²†V–v‡C° —“"Ò“²6&WE6—¦S° —“2Ò“° ’òò–çfW'BG&v–ær÷&FW  —f"F×Òƒ3° —ƒ2Òƒ° —ƒÒF×° —Ð —Ð —&WGW&â·ƒ¢ƒÂƒ#¢ƒ"Âƒ3¢ƒ2Â“¢“Â“#¢“"Â“3¢“7Ó° —ÒÀ  –G&uF—FÆS¢gVæ7F–öâ‡BÂfÒÂ7G‚’° —f"F—FÆRÒfÒçF—FÆS° —f"ÆVæwF‚ÒF—FÆRæÆVæwFƒ° —f"F—FÆTföçE6—¦RÂF—FÆU76–ærÂ“°  ––b†ÆVæwF‚’° —f"'FÄ†VÇW"ÒvWE'FÄ†VÇW"‡fÒç'FÂÂfÒç‚ÂfÒçv–GF‚“°  —Bç‚ÒvWDÆ–væVE‚‡fÒÂfÒå÷F—FÆTÆ–vâ“°  –7G‚çFW‡DÆ–vâÒ'FÄ†VÇW"çFW‡DÆ–vâ‡fÒå÷F—FÆTÆ–vâ“° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs°  —F—FÆTföçE6—¦RÒfÒçF—FÆTföçE6—¦S° —F—FÆU76–ærÒfÒçF—FÆU76–æs°  –7G‚æf–ÆÅ7G–ÆRÒfÒçF—FÆTföçD6öÆ÷#° –7G‚æföçBÒ†VÇW'2CæföçE7G&–ær‡F—FÆTföçE6—¦RÂfÒå÷F—FÆTföçE7G–ÆRÂfÒå÷F—FÆTföçDfÖ–Ç’“°  –f÷"†’Ò²’ÂÆVæwFƒ²²¶’’° –7G‚æf–ÆÅFW‡B‡F—FÆU¶•ÒÂ'FÄ†VÇW"ç‚‡Bç‚’ÂBç’²F—FÆTföçE6—¦Rò"“° —Bç’³ÒF—FÆTföçE6—¦R²F—FÆU76–æs²òòÆ–æR†V–v‡BæB76–æp  ––b†’²ÓÓÒÆVæwF‚’° —Bç’³ÒfÒçF—FÆTÖ&v–ä&÷GFöÒÒF—FÆU76–æs²òò–bÆ7BÂFBÖ&v–âÂ&VÖ÷fR76–æp —Ð —Ð —Ð —ÒÀ  –G&t&öG“¢gVæ7F–öâ‡BÂfÒÂ7G‚’° —f"&öG”föçE6—¦RÒfÒæ&öG”föçE6—¦S° —f"&öG•76–ærÒfÒæ&öG•76–æs° —f"&öG”Æ–vâÒfÒåö&öG”Æ–vã° —f"&öG’ÒfÒæ&öG“° —f"G&t6öÆ÷$&÷†W2ÒfÒæF—7Æ”6öÆ÷'3° —f"„Æ–æUFF–ærÒ° —f"6öÆ÷%‚ÒG&t6öÆ÷$&÷†W2òvWDÆ–væVE‚‡fÒÂvÆVgBr’¢°  —f"'FÄ†VÇW"ÒvWE'FÄ†VÇW"‡fÒç'FÂÂfÒç‚ÂfÒçv–GF‚“°  —f"f–ÆÄÆ–æTöeFW‡BÒgVæ7F–öâ†Æ–æR’° –7G‚æf–ÆÅFW‡B†Æ–æRÂ'FÄ†VÇW"ç‚‡Bç‚²„Æ–æUFF–ær’ÂBç’²&öG”föçE6—¦Rò"“° —Bç’³Ò&öG”föçE6—¦R²&öG•76–æs° —Ó°  —f"&öG”—FVÒÂFW‡D6öÆ÷"ÂÆ&VÄ6öÆ÷'2ÂÆ–æW2Â’Â¢Â–ÆVâÂ¦ÆVã° —f"&öG”Æ–väf÷$6Æ7VÆF–öâÒ'FÄ†VÇW"çFW‡DÆ–vâ†&öG”Æ–vâ“°  –7G‚çFW‡DÆ–vâÒ&öG”Æ–vã° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs° –7G‚æföçBÒ†VÇW'2CæföçE7G&–ær†&öG”föçE6—¦RÂfÒåö&öG”föçE7G–ÆRÂfÒåö&öG”föçDfÖ–Ç’“°  —Bç‚ÒvWDÆ–væVE‚‡fÒÂ&öG”Æ–väf÷$6Æ7VÆF–öâ“°  ’òò&Vf÷&R&öG’Æ–æW0 –7G‚æf–ÆÅ7G–ÆRÒfÒæ&öG”föçD6öÆ÷#° –†VÇW'2CæV6‚‡fÒæ&Vf÷&T&öG’Âf–ÆÄÆ–æTöeFW‡B“°  —„Æ–æUFF–ærÒG&t6öÆ÷$&÷†W2bb&öG”Æ–väf÷$6Æ7VÆF–öâÓÒw&–v‡Bp “ò&öG”Æ–vâÓÓÒv6VçFW"rò†&öG”föçE6—¦Rò"²’¢†&öG”föçE6—¦R²" “¢°  ’òòG&r&öG’Æ–æW2æ÷p –f÷"†’ÒÂ–ÆVâÒ&öG’æÆVæwFƒ²’Â–ÆVã²²¶’’° –&öG”—FVÒÒ&öG•¶•Ó° —FW‡D6öÆ÷"ÒfÒæÆ&VÅFW‡D6öÆ÷'5¶•Ó° –Æ&VÄ6öÆ÷'2ÒfÒæÆ&VÄ6öÆ÷'5¶•Ó°  –7G‚æf–ÆÅ7G–ÆRÒFW‡D6öÆ÷#° –†VÇW'2CæV6‚†&öG”—FVÒæ&Vf÷&RÂf–ÆÄÆ–æTöeFW‡B“°  –Æ–æW2Ò&öG”—FVÒæÆ–æW3° –f÷"†¢ÒÂ¦ÆVâÒÆ–æW2æÆVæwFƒ²¢Â¦ÆVã²²¶¢’° ’òòG&rÆVvVæBÖÆ–¶R&÷†W2–bæVVFV@ ––b†G&t6öÆ÷$&÷†W2’° —f"'FÄ6öÆ÷%‚Ò'FÄ†VÇW"ç‚†6öÆ÷%‚“°  ’òòf–ÆÂv†—FR&V7B6òF†B6öÆ÷W'2ÖW&vRæ–6VÇ’–bF†R÷6—G’—2Â –7G‚æf–ÆÅ7G–ÆRÒfÒæÆVvVæD6öÆ÷$&6¶w&÷VæC° –7G‚æf–ÆÅ&V7B‡'FÄ†VÇW"æÆVgDf÷$ÇG"‡'FÄ6öÆ÷%‚Â&öG”föçE6—¦R’ÂBç’Â&öG”föçE6—¦RÂ&öG”föçE6—¦R“°  ’òò&÷&FW  –7G‚æÆ–æUv–GF‚Ò° –7G‚ç7G&ö¶U7G–ÆRÒÆ&VÄ6öÆ÷'2æ&÷&FW$6öÆ÷#° –7G‚ç7G&ö¶U&V7B‡'FÄ†VÇW"æÆVgDf÷$ÇG"‡'FÄ6öÆ÷%‚Â&öG”föçE6—¦R’ÂBç’Â&öG”föçE6—¦RÂ&öG”föçE6—¦R“°  ’òò–ææW"7V&P –7G‚æf–ÆÅ7G–ÆRÒÆ&VÄ6öÆ÷'2æ&6¶w&÷VæD6öÆ÷#° –7G‚æf–ÆÅ&V7B‡'FÄ†VÇW"æÆVgDf÷$ÇG"‡'FÄ†VÇW"ç…ÇW2‡'FÄ6öÆ÷%‚Â’Â&öG”föçE6—¦RÒ"’ÂBç’²Â&öG”föçE6—¦RÒ"Â&öG”föçE6—¦RÒ"“° –7G‚æf–ÆÅ7G–ÆRÒFW‡D6öÆ÷#° —Ð  –f–ÆÄÆ–æTöeFW‡B†Æ–æW5¶¥Ò“° —Ð  –†VÇW'2CæV6‚†&öG”—FVÒægFW"Âf–ÆÄÆ–æTöeFW‡B“° —Ð  ’òò&W6WB&6²Fòf÷"gFW"&öG —„Æ–æUFF–ærÒ°  ’òògFW"&öG’Æ–æW0 –†VÇW'2CæV6‚‡fÒægFW$&öG’Âf–ÆÄÆ–æTöeFW‡B“° —Bç’ÓÒ&öG•76–æs²òò&VÖ÷fRÆ7B&öG’76–æp —ÒÀ  –G&tfö÷FW#¢gVæ7F–öâ‡BÂfÒÂ7G‚’° —f"fö÷FW"ÒfÒæfö÷FW#° —f"ÆVæwF‚Òfö÷FW"æÆVæwFƒ° —f"fö÷FW$föçE6—¦RÂ“°  ––b†ÆVæwF‚’° —f"'FÄ†VÇW"ÒvWE'FÄ†VÇW"‡fÒç'FÂÂfÒç‚ÂfÒçv–GF‚“°  —Bç‚ÒvWDÆ–væVE‚‡fÒÂfÒåöfö÷FW$Æ–vâ“° —Bç’³ÒfÒæfö÷FW$Ö&v–åF÷°  –7G‚çFW‡DÆ–vâÒ'FÄ†VÇW"çFW‡DÆ–vâ‡fÒåöfö÷FW$Æ–vâ“° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs°  –fö÷FW$föçE6—¦RÒfÒæfö÷FW$föçE6—¦S°  –7G‚æf–ÆÅ7G–ÆRÒfÒæfö÷FW$föçD6öÆ÷#° –7G‚æföçBÒ†VÇW'2CæföçE7G&–ær†fö÷FW$föçE6—¦RÂfÒåöfö÷FW$föçE7G–ÆRÂfÒåöfö÷FW$föçDfÖ–Ç’“°  –f÷"†’Ò²’ÂÆVæwFƒ²²¶’’° –7G‚æf–ÆÅFW‡B†fö÷FW%¶•ÒÂ'FÄ†VÇW"ç‚‡Bç‚’ÂBç’²fö÷FW$föçE6—¦Rò"“° —Bç’³Òfö÷FW$föçE6—¦R²fÒæfö÷FW%76–æs° —Ð —Ð —ÒÀ  –G&t&6¶w&÷VæC¢gVæ7F–öâ‡BÂfÒÂ7G‚ÂFööÇF—6—¦R’° –7G‚æf–ÆÅ7G–ÆRÒfÒæ&6¶w&÷VæD6öÆ÷#° –7G‚ç7G&ö¶U7G–ÆRÒfÒæ&÷&FW$6öÆ÷#° –7G‚æÆ–æUv–GF‚ÒfÒæ&÷&FW%v–GFƒ° —f"„Æ–vâÒfÒç„Æ–vã° —f"”Æ–vâÒfÒç”Æ–vã° —f"‚ÒBçƒ° —f"’ÒBç“° —f"v–GF‚ÒFööÇF—6—¦Rçv–GFƒ° —f"†V–v‡BÒFööÇF—6—¦Ræ†V–v‡C° —f"&F—W2ÒfÒæ6÷&æW%&F—W3°  –7G‚æ&Vv–åF‚‚“° –7G‚æÖ÷fUFò‡‚²&F—W2Â’“° ––b‡”Æ–vâÓÓÒwF÷r’° —F†—2æG&t6&WB‡BÂFööÇF—6—¦R“° —Ð –7G‚æÆ–æUFò‡‚²v–GF‚Ò&F—W2Â’“° –7G‚çVG&F–47W'fUFò‡‚²v–GF‚Â’Â‚²v–GF‚Â’²&F—W2“° ––b‡”Æ–vâÓÓÒv6VçFW"rbb„Æ–vâÓÓÒw&–v‡Br’° —F†—2æG&t6&WB‡BÂFööÇF—6—¦R“° —Ð –7G‚æÆ–æUFò‡‚²v–GF‚Â’²†V–v‡BÒ&F—W2“° –7G‚çVG&F–47W'fUFò‡‚²v–GF‚Â’²†V–v‡BÂ‚²v–GF‚Ò&F—W2Â’²†V–v‡B“° ––b‡”Æ–vâÓÓÒv&÷GFöÒr’° —F†—2æG&t6&WB‡BÂFööÇF—6—¦R“° —Ð –7G‚æÆ–æUFò‡‚²&F—W2Â’²†V–v‡B“° –7G‚çVG&F–47W'fUFò‡‚Â’²†V–v‡BÂ‚Â’²†V–v‡BÒ&F—W2“° ––b‡”Æ–vâÓÓÒv6VçFW"rbb„Æ–vâÓÓÒvÆVgBr’° —F†—2æG&t6&WB‡BÂFööÇF—6—¦R“° —Ð –7G‚æÆ–æUFò‡‚Â’²&F—W2“° –7G‚çVG&F–47W'fUFò‡‚Â’Â‚²&F—W2Â’“° –7G‚æ6Æ÷6UF‚‚“°  –7G‚æf–ÆÂ‚“°  ––b‡fÒæ&÷&FW%v–GF‚â’° –7G‚ç7G&ö¶R‚“° —Ð —ÒÀ  –G&s¢gVæ7F–öâ‚’° —f"7G‚ÒF†—2åö6†'Bæ7Gƒ° —f"fÒÒF†—2å÷f–Ws°  ––b‡fÒæ÷6—G’ÓÓÒ’° —&WGW&ã° —Ð  —f"FööÇF—6—¦RÒ° —v–GFƒ¢fÒçv–GF‚À –†V–v‡C¢fÒæ†V–v‡@ —Ó° —f"BÒ° —ƒ¢fÒç‚À —“¢fÒç —Ó°  ’òò”SôVFvRFöW2æ÷BÆ–¶RfW'’6ÖÆÂ÷6—F–W2Â6ò6æFò  —f"÷6—G’ÒÖF‚æ'2‡fÒæ÷6—G’ÂRÓ2’ò¢fÒæ÷6—G“°  ’òòG'WF‡’öfÇ6W’fÇVRf÷"V×G’FööÇF—  —f"†5FööÇF—6öçFVçBÒfÒçF—FÆRæÆVæwF‚ÇÂfÒæ&Vf÷&T&öG’æÆVæwF‚ÇÂfÒæ&öG’æÆVæwF‚ÇÂfÒægFW$&öG’æÆVæwF‚ÇÂfÒæfö÷FW"æÆVæwFƒ°  ––b‡F†—2åö÷F–öç2æVæ&ÆVBbb†5FööÇF—6öçFVçB’° –7G‚ç6fR‚“° –7G‚ævÆö&ÄÇ†Ò÷6—G“°  ’òòG&r&6¶w&÷Væ@ —F†—2æG&t&6¶w&÷VæB‡BÂfÒÂ7G‚ÂFööÇF—6—¦R“°  ’òòG&rF—FÆRÂ&öG’ÂæBfö÷FW  —Bç’³ÒfÒç•FF–æs°  –†VÇW'2Cç'FÂæ÷fW'&–FUFW‡DF—&V7F–öâ†7G‚ÂfÒçFW‡DF—&V7F–öâ“°  ’òòF—FÆW0 —F†—2æG&uF—FÆR‡BÂfÒÂ7G‚“°  ’òò&öG —F†—2æG&t&öG’‡BÂfÒÂ7G‚“°  ’òòfö÷FW  —F†—2æG&tfö÷FW"‡BÂfÒÂ7G‚“°  –†VÇW'2Cç'FÂç&W7F÷&UFW‡DF—&V7F–öâ†7G‚ÂfÒçFW‡DF—&V7F–öâ“°  –7G‚ç&W7F÷&R‚“° —Ð —ÒÀ  ’ò¢  ’¢†æFÆRâWfVç@ ’¢&—fFP ’¢&Ò´”WfVçGÒWfVçBÒF†RWfVçBFò†æFÆP ’¢&WGW&ç2¶&ööÆVçÒG'VR–bF†RFööÇF—6†ævV@ ’¢ð –†æFÆTWfVçC¢gVæ7F–öâ†R’° —f"ÖRÒF†—3° —f"÷F–öç2ÒÖRåö÷F–öç3° —f"6†ævVBÒfÇ6S°  –ÖRåöÆ7D7F—fRÒÖRåöÆ7D7F—fRÇÂµÓ°  ’òòf–æB7F—fRVÆVÖVçG2f÷"FööÇF—0 ––b†RçG—RÓÓÒvÖ÷W6V÷WBr’° –ÖRåö7F—fRÒµÓ° —ÒVÇ6R° –ÖRåö7F—fRÒÖRåö6†'BævWDVÆVÖVçG4DWfVçDf÷$ÖöFR†RÂ÷F–öç2æÖöFRÂ÷F–öç2“° ––b†÷F–öç2ç&WfW'6R’° –ÖRåö7F—fRç&WfW'6R‚“° —Ð —Ð  ’òò&VÖVÖ&W"Æ7B7F—fW0 –6†ævVBÒ†VÇW'2Cæ'&”WVÇ2†ÖRåö7F—fRÂÖRåöÆ7D7F—fR“°  ’òòöæÇ’†æFÆRF&vWBWfVçBöâFööÇF—6†ævP ––b†6†ævVB’° –ÖRåöÆ7D7F—fRÒÖRåö7F—fS°  ––b†÷F–öç2æVæ&ÆVBÇÂ÷F–öç2æ7W7FöÒ’° –ÖRåöWfVçE÷6—F–öâÒ° —ƒ¢Rç‚À —“¢Rç —Ó°  –ÖRçWFFR‡G'VR“° –ÖRç—f÷B‚“° —Ð —Ð  —&WGW&â6†ævVC° —Ð§Ò“° ¢ò¢ ¢¢æÖW76R6†'BåFööÇF—ç÷6—F–öæW'0¢¢ð§f"÷6—F–öæW'5óÒ÷6—F–öæW'3° §f"6÷&U÷FööÇF—ÒW‡÷'G2CC°¦6÷&U÷FööÇF—ç÷6—F–öæW'2Ò÷6—F–öæW'5ó° §f"fÇVT÷$FVfVÇBC’Ò†VÇW'2CçfÇVT÷$FVfVÇC° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –VÆVÖVçG3¢·ÒÀ –WfVçG3¢° ’vÖ÷W6VÖ÷fRrÀ ’vÖ÷W6V÷WBrÀ ’v6Æ–6²rÀ ’wF÷V6‡7F'BrÀ ’wF÷V6†Ö÷fRp •ÒÀ –†÷fW#¢° –öä†÷fW#¢çVÆÂÀ –ÖöFS¢væV&W7BrÀ ––çFW'6V7C¢G'VRÀ –æ–ÖF–öäGW&F–öã¢C  —ÒÀ –öä6Æ–6³¢çVÆÂÀ –Ö–çF–ä7V7E&F–ó¢G'VRÀ —&W7öç6—fS¢G'VRÀ —&W7öç6—fTæ–ÖF–öäGW&F–öã¢ §Ò“° ¢ò¢ ¢¢&V7W'6—fVÇ’ÖW&vRF†Rv—fVâ6öæf–rö&¦V7G2&W&W6VçF–ærF†R66ÆW6÷F–öà¢¢'’–æ6÷'÷&F–ær66ÆRFVfVÇG2–â„†W6æB”†W6'&’—FV×2ÂF†Và¢¢&WGW&ç2FVW6÷’öbF†R&W7VÇBÂF‡W2FöW6âwBÇFW"–çWG2à¢¢ð¦gVæ7F–öâÖW&vU66ÆT6öæf–r‚ò¢6öæf–rö&¦V7G2âââ¢ò’° —&WGW&â†VÇW'2CæÖW&vR‡·ÒÂµÒç6Æ–6Ræ6ÆÂ†&wVÖVçG2’Â° –ÖW&vW#¢gVæ7F–öâ†¶W’ÂF&vWBÂ6÷W&6RÂ÷F–öç2’° ––b†¶W’ÓÓÒw„†W2rÇÂ¶W’ÓÓÒw”†W2r’° —f"6ÆVâÒ6÷W&6U¶¶W•ÒæÆVæwFƒ° —f"’ÂG—RÂ66ÆS°  ––b‚F&vWE¶¶W•Ò’° —F&vWE¶¶W•ÒÒµÓ° —Ð  –f÷"†’Ò²’Â6ÆVã²²¶’’° —66ÆRÒ6÷W&6U¶¶W•Õ¶•Ó° —G—RÒfÇVT÷$FVfVÇBC’‡66ÆRçG—RÂ¶W’ÓÓÒw„†W2ròv6FVv÷'’r¢vÆ–æV"r“°  ––b†’ãÒF&vWE¶¶W•ÒæÆVæwF‚’° —F&vWE¶¶W•ÒçW6‚‡·Ò“° —Ð  ––b‚F&vWE¶¶W•Õ¶•ÒçG—RÇÂ‡66ÆRçG—Rbb66ÆRçG—RÓÒF&vWE¶¶W•Õ¶•ÒçG—R’’° ’òòæWr÷VçG—VB66ÆR÷"G—R6†ævVC¢ÆWBw2Ç’F†RæWrFVfVÇG0 ’òòF†VâÖW&vR6÷W&6R66ÆRFò6÷'&V7FÇ’÷fW'w&—FRF†RFVfVÇG2à –†VÇW'2CæÖW&vR‡F&vWE¶¶W•Õ¶•ÒÂ¶6÷&U÷66ÆU6W'f–6RævWE66ÆTFVfVÇG2‡G—R’Â66ÆUÒ“° —ÒVÇ6R° ’òò66ÆW2G—R&RF†R6ÖP –†VÇW'2CæÖW&vR‡F&vWE¶¶W•Õ¶•ÒÂ66ÆR“° —Ð —Ð —ÒVÇ6R° –†VÇW'2CåöÖW&vW"†¶W’ÂF&vWBÂ6÷W&6RÂ÷F–öç2“° —Ð —Ð —Ò“°§Ð ¢ò¢ ¢¢&V7W'6—fVÇ’ÖW&vRF†Rv—fVâ6öæf–rö&¦V7G22F†R&ö÷B÷F–öç2'’†æFÆ–æp¢¢FVfVÇB66ÆR÷F–öç2f÷"F†R66ÆW6æB66ÆV&÷W'F–W2ÂF†Vâ&WGW&ç0¢¢FVW6÷’öbF†R&W7VÇBÂF‡W2FöW6âwBÇFW"–çWG2à¢¢ð¦gVæ7F–öâÖW&vT6öæf–r‚ò¢6öæf–rö&¦V7G2âââ¢ò’° —&WGW&â†VÇW'2CæÖW&vR‡·ÒÂµÒç6Æ–6Ræ6ÆÂ†&wVÖVçG2’Â° –ÖW&vW#¢gVæ7F–öâ†¶W’ÂF&vWBÂ6÷W&6RÂ÷F–öç2’° —f"GfÂÒF&vWE¶¶W•ÒÇÂ·Ó° —f"7fÂÒ6÷W&6U¶¶W•Ó°  ––b†¶W’ÓÓÒw66ÆW2r’° ’òò66ÆR6öæf–rÖW&v–ær—26ö×ÆW‚âFB÷W"÷vâgVæ7F–öâ†W&Rf÷"F†@ —F&vWE¶¶W•ÒÒÖW&vU66ÆT6öæf–r‡GfÂÂ7fÂ“° —ÒVÇ6R–b†¶W’ÓÓÒw66ÆRr’° ’òòW6VB–âöÆ"&Vb&F"6†'G26–æ6RF†W&R—2öæÇ’öæR66ÆP —F&vWE¶¶W•ÒÒ†VÇW'2CæÖW&vR‡GfÂÂ¶6÷&U÷66ÆU6W'f–6RævWE66ÆTFVfVÇG2‡7fÂçG—R’Â7fÅÒ“° —ÒVÇ6R° –†VÇW'2CåöÖW&vW"†¶W’ÂF&vWBÂ6÷W&6RÂ÷F–öç2“° —Ð —Ð —Ò“°§Ð ¦gVæ7F–öâ–æ—D6öæf–r†6öæf–r’° –6öæf–rÒ6öæf–rÇÂ·Ó°  ’òòFòäõBW6RÖW&vT6öæf–rf÷"F†RFFö&¦V7B&V6W6RF†—2ÖWF†öBÖW&vW2'&—0 ’òòæB6òv÷VÆB6†ævR&VfW&Væ6W2FòÆ&VÇ2æBFF6WG2Â&WfVçF–ærFFWFFW2à —f"FFÒ6öæf–ræFFÒ6öæf–ræFFÇÂ·Ó° –FFæFF6WG2ÒFFæFF6WG2ÇÂµÓ° –FFæÆ&VÇ2ÒFFæÆ&VÇ2ÇÂµÓ°  –6öæf–ræ÷F–öç2ÒÖW&vT6öæf–r€ –6÷&UöFVfVÇG2ævÆö&ÂÀ –6÷&UöFVfVÇG5¶6öæf–rçG—UÒÀ –6öæf–ræ÷F–öç2ÇÂ·Ò“°  —&WGW&â6öæf–s°§Ð ¦gVæ7F–öâWFFT6öæf–r†6†'B’° —f"æWt÷F–öç2Ò6†'Bæ÷F–öç3°  –†VÇW'2CæV6‚†6†'Bç66ÆW2ÂgVæ7F–öâ‡66ÆR’° –6÷&UöÆ–÷WG2ç&VÖ÷fT&÷‚†6†'BÂ66ÆR“° —Ò“°  –æWt÷F–öç2ÒÖW&vT6öæf–r€ –6÷&UöFVfVÇG2ævÆö&ÂÀ –6÷&UöFVfVÇG5¶6†'Bæ6öæf–rçG—UÒÀ –æWt÷F–öç2“°  –6†'Bæ÷F–öç2Ò6†'Bæ6öæf–ræ÷F–öç2ÒæWt÷F–öç3° –6†'BæVç7W&U66ÆW4†fT”G2‚“° –6†'Bæ'V–ÆD÷%WFFU66ÆW2‚“°  ’òòFööÇF—  –6†'BçFööÇF—åö÷F–öç2ÒæWt÷F–öç2çFööÇF—3° –6†'BçFööÇF—æ–æ—F–Æ—¦R‚“°§Ð ¦gVæ7F–öâæW‡Df–Æ&ÆU66ÆT–B††W4÷G2Â&Vf—‚Â–æFW‚’° —f"–C° —f"†4–BÒgVæ7F–öâ†ö&¢’° —&WGW&âö&¢æ–BÓÓÒ–C° —Ó°  –Fò° ––BÒ&Vf—‚²–æFW‚²³° —Òv†–ÆR††VÇW'2Cæf–æD–æFW‚††W4÷G2Â†4–B’ãÒ“°  —&WGW&â–C°§Ð ¦gVæ7F–öâ÷6—F–öä—4†÷&—¦öçFÂ‡÷6—F–öâ’° —&WGW&â÷6—F–öâÓÓÒwF÷rÇÂ÷6—F–öâÓÓÒv&÷GFöÒs°§Ð ¦gVæ7F–öâ6ö×&S$ÆWfVÂ†ÃÂÃ"’° —&WGW&âgVæ7F–öâ†Â"’° —&WGW&â¶ÃÒÓÓÒ%¶ÃÐ “ò¶Ã%ÒÒ%¶Ã%Ð “¢¶ÃÒÒ%¶ÃÓ° —Ó°§Ð §f"6†'BÒgVæ7F–öâ†—FVÒÂ6öæf–r’° —F†—2æ6öç7G'V7B†—FVÒÂ6öæf–r“° —&WGW&âF†—3°§Ó° ¦†VÇW'2CæW‡FVæB„6†'Bç&÷F÷G—RÂò¢¢ÆVæG26†'B¢ò° ’ò¢  ’¢&—fFP ’¢ð –6öç7G'V7C¢gVæ7F–öâ†—FVÒÂ6öæf–r’° —f"ÖRÒF†—3°  –6öæf–rÒ–æ—D6öæf–r†6öæf–r“°  —f"6öçFW‡BÒÆFf÷&Òæ7V—&T6öçFW‡B†—FVÒÂ6öæf–r“° —f"6çf2Ò6öçFW‡Bbb6öçFW‡Bæ6çf3° —f"†V–v‡BÒ6çf2bb6çf2æ†V–v‡C° —f"v–GF‚Ò6çf2bb6çf2çv–GFƒ°  –ÖRæ–BÒ†VÇW'2CçV–B‚“° –ÖRæ7G‚Ò6öçFW‡C° –ÖRæ6çf2Ò6çf3° –ÖRæ6öæf–rÒ6öæf–s° –ÖRçv–GF‚Òv–GFƒ° –ÖRæ†V–v‡BÒ†V–v‡C° –ÖRæ7V7E&F–òÒ†V–v‡Bòv–GF‚ò†V–v‡B¢çVÆÃ° –ÖRæ÷F–öç2Ò6öæf–ræ÷F–öç3° –ÖRåö'VffW&VE&VæFW"ÒfÇ6S° –ÖRåöÆ–W'2ÒµÓ°  ’ò¢  ’¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Â6†'BæB6†'Bä6öçG&öÆÆW"†fR&VVâÖW&vVBÀ ’¢F†R&–ç7Fæ6R"7F–ÆÂæVVBFò&RFVf–æVB6–æ6R—BÖ–v‡B&R6ÆÆVBg&öÒÇVv–ç2à ’¢&÷6†'B66†'@ ’¢FW&V6FVB6–æ6RfW'6–öâ"ãbã  ’¢FöFò&VÖ÷fRBfW'6–öâ0 ’¢&—fFP ’¢ð –ÖRæ6†'BÒÖS° –ÖRæ6öçG&öÆÆW"ÒÖS²òò6†'Bæ6†'Bæ6öçG&öÆÆW"6–æ6WF–öà  ’òòFBF†R6†'B–ç7Fæ6RFòF†RvÆö&ÂæÖW76P ”6†'Bæ–ç7Fæ6W5¶ÖRæ–EÒÒÖS°  ’òòFVf–æRÆ–2FòF†R6öæf–rFF¢6†'BæFFÓÓÒ6†'Bæ6öæf–ræFF  ”ö&¦V7BæFVf–æU&÷W'G’†ÖRÂvFFrÂ° –vWC¢gVæ7F–öâ‚’° —&WGW&âÖRæ6öæf–ræFF° —ÒÀ —6WC¢gVæ7F–öâ‡fÇVR’° –ÖRæ6öæf–ræFFÒfÇVS° —Ð —Ò“°  ––b‚6öçFW‡BÇÂ6çf2’° ’òòF†Rv—fVâ—FVÒ—2æ÷B6ö×F–&ÆR6öçFW‡C&BVÆVÖVçBÂÆWBw2&WGW&â&Vf÷&Rf–æÆ—¦–æp ’òòF†R6†'B–æ—F–Æ—¦F–öâ'WBgFW"6WGF–ær&6–26†'Bò6öçG&öÆÆW"&÷W'F–W2F†@ ’òò6â†VÇFòf–wW&R÷WBF†BF†R6†'B—2æ÷BfÆ–B†Rær6†'Bæ6çf2ÓÒçVÆÂ“° ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2ó#ƒp –6öç6öÆRæW'&÷"‚$f–ÆVBFò7&VFR6†'C¢6âwB7V—&R6öçFW‡Bg&öÒF†Rv—fVâ—FVÒ"“° —&WGW&ã° —Ð  –ÖRæ–æ—F–Æ—¦R‚“° –ÖRçWFFR‚“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð ––æ—F–Æ—¦S¢gVæ7F–öâ‚’° —f"ÖRÒF†—3°  ’òò&Vf÷&R–æ—BÇVv–âæ÷F–f–6F–öà –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&T–æ—Br“°  –†VÇW'2Cç&WF–æ66ÆR†ÖRÂÖRæ÷F–öç2æFWf–6U—†VÅ&F–ò“°  –ÖRæ&–æDWfVçG2‚“°  ––b†ÖRæ÷F–öç2ç&W7öç6—fR’° ’òò–æ—F–Â&W6—¦R&Vf÷&R6†'BG&w2†×W7B&R6–ÆVçBFò&W6W'fR–æ—F–Âæ–ÖF–öç2’à –ÖRç&W6—¦R‡G'VR“° —Ð  –ÖRæ–æ—EFööÅF—‚“°  ’òògFW"–æ—BÇVv–âæ÷F–f–6F–öà –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW$–æ—Br“°  —&WGW&âÖS° —ÒÀ  –6ÆV#¢gVæ7F–öâ‚’° –†VÇW'2Cæ6çf2æ6ÆV"‡F†—2“° —&WGW&âF†—3° —ÒÀ  —7F÷¢gVæ7F–öâ‚’° ’òò7F÷2ç’7W'&VçBæ–ÖF–öâÆö÷ö67W'&–æp –6÷&Uöæ–ÖF–öç2æ6æ6VÄæ–ÖF–öâ‡F†—2“° —&WGW&âF†—3° —ÒÀ  —&W6—¦S¢gVæ7F–öâ‡6–ÆVçB’° —f"ÖRÒF†—3° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"6çf2ÒÖRæ6çf3° —f"7V7E&F–òÒ†÷F–öç2æÖ–çF–ä7V7E&F–òbbÖRæ7V7E&F–ò’ÇÂçVÆÃ°  ’òòF†R6çf2&VæFW"v–GF‚æB†V–v‡Bv–ÆÂ&R67FVBFò–çFVvW'26òÖ¶R7W&RF†@ ’òòF†R6çf2F—7Æ’7G–ÆRW6W2F†R6ÖR–çFVvW"fÇVW2Fòfö–B&ÇW'&–ærVffV7Bà  ’òò6WBFò–ç7FVBöb6çf2ç6—¦R&V6W6RF†R6—¦RFVfVÇG2Fò3ƒS–bF†RVÆVÖVçB—26öÆÆ6V@ —f"æWuv–GF‚ÒÖF‚æÖ‚ƒÂÖF‚æfÆö÷"††VÇW'2CævWDÖ†–×VÕv–GF‚†6çf2’’“° —f"æWt†V–v‡BÒÖF‚æÖ‚ƒÂÖF‚æfÆö÷"†7V7E&F–òòæWuv–GF‚ò7V7E&F–ò¢†VÇW'2CævWDÖ†–×VÔ†V–v‡B†6çf2’’“°  ––b†ÖRçv–GF‚ÓÓÒæWuv–GF‚bbÖRæ†V–v‡BÓÓÒæWt†V–v‡B’° —&WGW&ã° —Ð  –6çf2çv–GF‚ÒÖRçv–GF‚ÒæWuv–GFƒ° –6çf2æ†V–v‡BÒÖRæ†V–v‡BÒæWt†V–v‡C° –6çf2ç7G–ÆRçv–GF‚ÒæWuv–GF‚²w‚s° –6çf2ç7G–ÆRæ†V–v‡BÒæWt†V–v‡B²w‚s°  –†VÇW'2Cç&WF–æ66ÆR†ÖRÂ÷F–öç2æFWf–6U—†VÅ&F–ò“°  ––b‚6–ÆVçB’° ’òòæ÷F–g’ç’ÇVv–ç2&÷WBF†R&W6—¦P —f"æWu6—¦RÒ·v–GFƒ¢æWuv–GF‚Â†V–v‡C¢æWt†V–v‡GÓ° –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂw&W6—¦RrÂ¶æWu6—¦UÒ“°  ’òòæ÷F–g’öb&W6—¦P ––b†÷F–öç2æöå&W6—¦R’° –÷F–öç2æöå&W6—¦R†ÖRÂæWu6—¦R“° —Ð  –ÖRç7F÷‚“° –ÖRçWFFR‡° –GW&F–öã¢÷F–öç2ç&W7öç6—fTæ–ÖF–öäGW&F–öà —Ò“° —Ð —ÒÀ  –Vç7W&U66ÆW4†fT”G3¢gVæ7F–öâ‚’° —f"÷F–öç2ÒF†—2æ÷F–öç3° —f"66ÆW4÷F–öç2Ò÷F–öç2ç66ÆW2ÇÂ·Ó° —f"66ÆT÷F–öç2Ò÷F–öç2ç66ÆS°  –†VÇW'2CæV6‚‡66ÆW4÷F–öç2ç„†W2ÂgVæ7F–öâ‡„†—4÷F–öç2Â–æFW‚’° ––b‚„†—4÷F–öç2æ–B’° —„†—4÷F–öç2æ–BÒæW‡Df–Æ&ÆU66ÆT–B‡66ÆW4÷F–öç2ç„†W2Âw‚Ö†—2ÒrÂ–æFW‚“° —Ð —Ò“°  –†VÇW'2CæV6‚‡66ÆW4÷F–öç2ç”†W2ÂgVæ7F–öâ‡”†—4÷F–öç2Â–æFW‚’° ––b‚”†—4÷F–öç2æ–B’° —”†—4÷F–öç2æ–BÒæW‡Df–Æ&ÆU66ÆT–B‡66ÆW4÷F–öç2ç”†W2Âw’Ö†—2ÒrÂ–æFW‚“° —Ð —Ò“°  ––b‡66ÆT÷F–öç2’° —66ÆT÷F–öç2æ–BÒ66ÆT÷F–öç2æ–BÇÂw66ÆRs° —Ð —ÒÀ  ’ò¢  ’¢'V–ÆG2Ööb66ÆR”BFò66ÆRö&¦V7Bf÷"gWGW&RÆöö·Wà ’¢ð –'V–ÆD÷%WFFU66ÆW3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"66ÆW2ÒÖRç66ÆW2ÇÂ·Ó° —f"—FV×2ÒµÓ° —f"WFFVBÒö&¦V7Bæ¶W—2‡66ÆW2’ç&VGV6R†gVæ7F–öâ†ö&¢Â–B’° –ö&¥¶–EÒÒfÇ6S° —&WGW&âö&£° —ÒÂ·Ò“°  ––b†÷F–öç2ç66ÆW2’° –—FV×2Ò—FV×2æ6öæ6B€ ’†÷F–öç2ç66ÆW2ç„†W2ÇÂµÒ’æÖ†gVæ7F–öâ‡„†—4÷F–öç2’° —&WGW&â¶÷F–öç3¢„†—4÷F–öç2ÂGG—S¢v6FVv÷'’rÂG÷6—F–öã¢v&÷GFöÒwÓ° —Ò’À ’†÷F–öç2ç66ÆW2ç”†W2ÇÂµÒ’æÖ†gVæ7F–öâ‡”†—4÷F–öç2’° —&WGW&â¶÷F–öç3¢”†—4÷F–öç2ÂGG—S¢vÆ–æV"rÂG÷6—F–öã¢vÆVgBwÓ° —Ò ’“° —Ð  ––b†÷F–öç2ç66ÆR’° –—FV×2çW6‚‡° –÷F–öç3¢÷F–öç2ç66ÆRÀ –GG—S¢w&F–ÄÆ–æV"rÀ –—4FVfVÇC¢G'VRÀ –G÷6—F–öã¢v6†'D&Vp —Ò“° —Ð  –†VÇW'2CæV6‚†—FV×2ÂgVæ7F–öâ†—FVÒ’° —f"66ÆT÷F–öç2Ò—FVÒæ÷F–öç3° —f"–BÒ66ÆT÷F–öç2æ–C° —f"66ÆUG—RÒfÇVT÷$FVfVÇBC’‡66ÆT÷F–öç2çG—RÂ—FVÒæGG—R“°  ––b‡÷6—F–öä—4†÷&—¦öçFÂ‡66ÆT÷F–öç2ç÷6—F–öâ’ÓÒ÷6—F–öä—4†÷&—¦öçFÂ†—FVÒæG÷6—F–öâ’’° —66ÆT÷F–öç2ç÷6—F–öâÒ—FVÒæG÷6—F–öã° —Ð  —WFFVE¶–EÒÒG'VS° —f"66ÆRÒçVÆÃ° ––b†–B–â66ÆW2bb66ÆW5¶–EÒçG—RÓÓÒ66ÆUG—R’° —66ÆRÒ66ÆW5¶–EÓ° —66ÆRæ÷F–öç2Ò66ÆT÷F–öç3° —66ÆRæ7G‚ÒÖRæ7Gƒ° —66ÆRæ6†'BÒÖS° —ÒVÇ6R° —f"66ÆT6Æ72Ò6÷&U÷66ÆU6W'f–6RævWE66ÆT6öç7G'V7F÷"‡66ÆUG—R“° ––b‚66ÆT6Æ72’° —&WGW&ã° —Ð —66ÆRÒæWr66ÆT6Æ72‡° ––C¢–BÀ —G—S¢66ÆUG—RÀ –÷F–öç3¢66ÆT÷F–öç2À –7Gƒ¢ÖRæ7G‚À –6†'C¢ÖP —Ò“° —66ÆW5·66ÆRæ–EÒÒ66ÆS° —Ð  —66ÆRæÖW&vUF–6·4÷F–öç2‚“°  ’òòDôDò…4"“¢’F†–æ²vR6†÷VÆB&R&ÆRFò&VÖ÷fRF†—27W7FöÒ66R†÷F–öç2ç66ÆR ’òòæB6öç6–FW"—B2&VwVÆ"66ÆR'BöbF†R'66ÆW2""ÖöæÇ’F†—2v÷VÆ@ ’òòÖ¶RF†RÆöv–2V6–W"æB&VÖ÷fR6öÖRW6VÆW73ò7W7FöÒ6öFRà ––b†—FVÒæ—4FVfVÇB’° –ÖRç66ÆRÒ66ÆS° —Ð —Ò“° ’òò6ÆV"WF—66&FVB66ÆW0 –†VÇW'2CæV6‚‡WFFVBÂgVæ7F–öâ††5WFFVBÂ–B’° ––b‚†5WFFVB’° –FVÆWFR66ÆW5¶–EÓ° —Ð —Ò“°  –ÖRç66ÆW2Ò66ÆW3°  –6÷&U÷66ÆU6W'f–6RæFE66ÆW5FôÆ–÷WB‡F†—2“° —ÒÀ  –'V–ÆD÷%WFFT6öçG&öÆÆW'3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"æWt6öçG&öÆÆW'2ÒµÓ° —f"FF6WG2ÒÖRæFFæFF6WG3° —f"’Â–ÆVã°  –f÷"†’ÒÂ–ÆVâÒFF6WG2æÆVæwFƒ²’Â–ÆVã²’²²’° —f"FF6WBÒFF6WG5¶•Ó° —f"ÖWFÒÖRævWDFF6WDÖWF†’“° —f"G—RÒFF6WBçG—RÇÂÖRæ6öæf–rçG—S°  ––b†ÖWFçG—RbbÖWFçG—RÓÒG—R’° –ÖRæFW7G&÷”FF6WDÖWF†’“° –ÖWFÒÖRævWDFF6WDÖWF†’“° —Ð –ÖWFçG—RÒG—S° –ÖWFæ÷&FW"ÒFF6WBæ÷&FW"ÇÂ° –ÖWFæ–æFW‚Ò“°  ––b†ÖWFæ6öçG&öÆÆW"’° –ÖWFæ6öçG&öÆÆW"çWFFT–æFW‚†’“° –ÖWFæ6öçG&öÆÆW"æÆ–æµ66ÆW2‚“° —ÒVÇ6R° —f"6öçG&öÆÆW$6Æ72Ò6öçG&öÆÆW'5¶ÖWFçG—UÓ° ––b„6öçG&öÆÆW$6Æ72ÓÓÒVæFVf–æVB’° —F‡&÷ræWrW'&÷"‚r"r²ÖWFçG—R²r"—2æ÷B6†'BG—Râr“° —Ð  –ÖWFæ6öçG&öÆÆW"ÒæWr6öçG&öÆÆW$6Æ72†ÖRÂ’“° –æWt6öçG&öÆÆW'2çW6‚†ÖWFæ6öçG&öÆÆW"“° —Ð —Ð  —&WGW&âæWt6öçG&öÆÆW'3° —ÒÀ  ’ò¢  ’¢&W6WBF†RVÆVÖVçG2öbÆÂFF6WG0 ’¢&—fFP ’¢ð —&W6WDVÆVÖVçG3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° –†VÇW'2CæV6‚†ÖRæFFæFF6WG2ÂgVæ7F–öâ†FF6WBÂFF6WD–æFW‚’° –ÖRævWDFF6WDÖWF†FF6WD–æFW‚’æ6öçG&öÆÆW"ç&W6WB‚“° —ÒÂÖR“° —ÒÀ  ’ò¢  ’¢&W6WG2F†R6†'B&6²Fò—Bw27FFR&Vf÷&RF†R–æ—F–Âæ–ÖF–öà ’¢ð —&W6WC¢gVæ7F–öâ‚’° —F†—2ç&W6WDVÆVÖVçG2‚“° —F†—2çFööÇF—æ–æ—F–Æ—¦R‚“° —ÒÀ  —WFFS¢gVæ7F–öâ†6öæf–r’° —f"ÖRÒF†—3° —f"’Â–ÆVã°  ––b‚6öæf–rÇÂG—Vöb6öæf–rÓÒvö&¦V7Br’° ’òò&6·v&G26ö×F–&–Æ—G –6öæf–rÒ° –GW&F–öã¢6öæf–rÀ –Æ§“¢&wVÖVçG5³Ð —Ó° —Ð  —WFFT6öæf–r†ÖR“°  ’òòÇVv–ç2÷F–öç2&VfW&Væ6W2Ö–v‡B†fR6†ævRÂÆWBw2–çfÆ–FFRF†R66†P ’òò‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2óS6—77VV6öÖÖVçBÓ3SS“3Ccp –6÷&U÷ÇVv–ç2åö–çfÆ–FFR†ÖR“°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&UWFFRr’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  ’òò–â66RF†RVçF—&RFFö&¦V7B6†ævV@ –ÖRçFööÇF—åöFFÒÖRæFF°  ’òòÖ¶R7W&RFF6WB6öçG&öÆÆW'2&RWFFVBæBæWr6öçG&öÆÆW'2&R&W6W@ —f"æWt6öçG&öÆÆW'2ÒÖRæ'V–ÆD÷%WFFT6öçG&öÆÆW'2‚“°  ’òòÖ¶R7W&RÆÂFF6WB6öçG&öÆÆW'2†fR6÷'&V7BÖWFFF6÷VçG0 –f÷"†’ÒÂ–ÆVâÒÖRæFFæFF6WG2æÆVæwFƒ²’Â–ÆVã²’²²’° –ÖRævWDFF6WDÖWF†’’æ6öçG&öÆÆW"æ'V–ÆD÷%WFFTVÆVÖVçG2‚“° —Ð  –ÖRçWFFTÆ–÷WB‚“°  ’òò6âöæÇ’&W6WBF†RæWr6öçG&öÆÆW'2gFW"F†R66ÆW2†fR&VVâWFFV@ ––b†ÖRæ÷F–öç2ææ–ÖF–öâbbÖRæ÷F–öç2ææ–ÖF–öâæGW&F–öâ’° –†VÇW'2CæV6‚†æWt6öçG&öÆÆW'2ÂgVæ7F–öâ†6öçG&öÆÆW"’° –6öçG&öÆÆW"ç&W6WB‚“° —Ò“° —Ð  –ÖRçWFFTFF6WG2‚“°  ’òòæVVBFò&W6WBFööÇF—–â66R—B—2F—7Æ–VBv—F‚VÆVÖVçG2F†B&R&VÖ÷fV@ ’òògFW"WFFRà –ÖRçFööÇF—æ–æ—F–Æ—¦R‚“°  ’òòÆ7B7F—fR6öçF–ç2—FV×2F†BvW&R&Wf–÷W6Ç’–âF†RFööÇF—à ’òòv†VâvR&W6WBF†RFööÇF—ÂvRæVVBFò6ÆV"—@ –ÖRæÆ7D7F—fRÒµÓ°  ’òòFòF†—2&Vf÷&R&VæFW"6òF†Bç’ÇVv–ç2F†BæVVBf–æÂ66ÆRWFFW26âW6R—@ –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW%WFFRr“°  –ÖRåöÆ–W'2ç6÷'B†6ö×&S$ÆWfVÂ‚w¢rÂuö–G‚r’“°  ––b†ÖRåö'VffW&VE&VæFW"’° –ÖRåö'VffW&VE&WVW7BÒ° –GW&F–öã¢6öæf–ræGW&F–öâÀ –V6–æs¢6öæf–ræV6–ærÀ –Æ§“¢6öæf–ræÆ§ —Ó° —ÒVÇ6R° –ÖRç&VæFW"†6öæf–r“° —Ð —ÒÀ  ’ò¢  ’¢WFFW2F†R6†'BÆ–÷WBVæÆW72ÇVv–â&WGW&ç2fÇ6VFòF†R&Vf÷&TÆ–÷WF  ’¢†öö²Â–âv†–6‚66RÂÇVv–ç2v–ÆÂæ÷B&R6ÆÆVBöâgFW$Æ–÷WFà ’¢&—fFP ’¢ð —WFFTÆ–÷WC¢gVæ7F–öâ‚’° —f"ÖRÒF†—3°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&TÆ–÷WBr’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  –6÷&UöÆ–÷WG2çWFFR‡F†—2ÂF†—2çv–GF‚ÂF†—2æ†V–v‡B“°  –ÖRåöÆ–W'2ÒµÓ° –†VÇW'2CæV6‚†ÖRæ&÷†W2ÂgVæ7F–öâ†&÷‚’° ’òòö6öæf–wW&R—26ÆÆVBGv–6RÂöæ6R–â6÷&Rç66ÆRçWFFRæBöæ6R†W&Rà ’òò†W&RF†R&÷†W2&RgVÆÇ’WFFVBæBBF†V—"f–æÂ÷6—F–öç2à ––b†&÷‚åö6öæf–wW&R’° –&÷‚åö6öæf–wW&R‚“° —Ð –ÖRåöÆ–W'2çW6‚æÇ’†ÖRåöÆ–W'2Â&÷‚åöÆ–W'2‚’“° —ÒÂÖR“°  –ÖRåöÆ–W'2æf÷$V6‚†gVæ7F–öâ†—FVÒÂ–æFW‚’° –—FVÒåö–G‚Ò–æFWƒ° —Ò“°  ’ò¢  ’¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’ÂW6RgFW$Æ–÷WF–ç7FVBà ’¢ÖWF†öB•ÇVv–â6gFW%66ÆUWFFP ’¢FW&V6FVB6–æ6RfW'6–öâ"ãRã  ’¢FöFò&VÖ÷fRBfW'6–öâ0 ’¢&—fFP ’¢ð –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW%66ÆUWFFRr“° –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW$Æ–÷WBr“° —ÒÀ  ’ò¢  ’¢WFFW2ÆÂFF6WG2VæÆW72ÇVv–â&WGW&ç2fÇ6VFòF†R&Vf÷&TFF6WG5WFFV  ’¢†öö²Â–âv†–6‚66RÂÇVv–ç2v–ÆÂæ÷B&R6ÆÆVBöâgFW$FF6WG5WFFVà ’¢&—fFP ’¢ð —WFFTFF6WG3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&TFF6WG5WFFRr’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  –f÷"‡f"’ÒÂ–ÆVâÒÖRæFFæFF6WG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖRçWFFTFF6WB†’“° —Ð  –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW$FF6WG5WFFRr“° —ÒÀ  ’ò¢  ’¢WFFW2FF6WBB–æFW‚VæÆW72ÇVv–â&WGW&ç2fÇ6VFòF†R&Vf÷&TFF6WEWFFV  ’¢†öö²Â–âv†–6‚66RÂÇVv–ç2v–ÆÂæ÷B&R6ÆÆVBöâgFW$FF6WEWFFVà ’¢&—fFP ’¢ð —WFFTFF6WC¢gVæ7F–öâ†–æFW‚’° —f"ÖRÒF†—3° —f"ÖWFÒÖRævWDFF6WDÖWF†–æFW‚“° —f"&w2Ò° –ÖWF¢ÖWFÀ ––æFWƒ¢–æFW€ —Ó°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&TFF6WEWFFRrÂ¶&w5Ò’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  –ÖWFæ6öçG&öÆÆW"å÷WFFR‚“°  –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW$FF6WEWFFRrÂ¶&w5Ò“° —ÒÀ  —&VæFW#¢gVæ7F–öâ†6öæf–r’° —f"ÖRÒF†—3°  ––b‚6öæf–rÇÂG—Vöb6öæf–rÓÒvö&¦V7Br’° ’òò&6·v&G26ö×F–&–Æ—G –6öæf–rÒ° –GW&F–öã¢6öæf–rÀ –Æ§“¢&wVÖVçG5³Ð —Ó° —Ð  —f"æ–ÖF–öä÷F–öç2ÒÖRæ÷F–öç2ææ–ÖF–öã° —f"GW&F–öâÒfÇVT÷$FVfVÇBC’†6öæf–ræGW&F–öâÂæ–ÖF–öä÷F–öç2bbæ–ÖF–öä÷F–öç2æGW&F–öâ“° —f"Æ§’Ò6öæf–ræÆ§“°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&U&VæFW"r’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  —f"öä6ö×ÆWFRÒgVæ7F–öâ†æ–ÖF–öâ’° –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW%&VæFW"r“° –†VÇW'2Cæ6ÆÆ&6²†æ–ÖF–öä÷F–öç2bbæ–ÖF–öä÷F–öç2æöä6ö×ÆWFRÂ¶æ–ÖF–öåÒÂÖR“° —Ó°  ––b†æ–ÖF–öä÷F–öç2bbGW&F–öâ’° —f"æ–ÖF–öâÒæWr6÷&Uöæ–ÖF–öâ‡° –çVÕ7FW3¢GW&F–öâòbãcbÂòòcg0 –V6–æs¢6öæf–ræV6–ærÇÂæ–ÖF–öä÷F–öç2æV6–ærÀ  —&VæFW#¢gVæ7F–öâ†6†'BÂæ–ÖF–öäö&¦V7B’° —f"V6–ætgVæ7F–öâÒ†VÇW'2CæV6–æræVffV7G5¶æ–ÖF–öäö&¦V7BæV6–æuÓ° —f"7W'&VçE7FWÒæ–ÖF–öäö&¦V7Bæ7W'&VçE7FW° —f"7FWFV6–ÖÂÒ7W'&VçE7FWòæ–ÖF–öäö&¦V7BæçVÕ7FW3°  –6†'BæG&r†V6–ætgVæ7F–öâ‡7FWFV6–ÖÂ’Â7FWFV6–ÖÂÂ7W'&VçE7FW“° —ÒÀ  –öäæ–ÖF–öå&öw&W73¢æ–ÖF–öä÷F–öç2æöå&öw&W72À –öäæ–ÖF–öä6ö×ÆWFS¢öä6ö×ÆWFP —Ò“°  –6÷&Uöæ–ÖF–öç2æFDæ–ÖF–öâ†ÖRÂæ–ÖF–öâÂGW&F–öâÂÆ§’“° —ÒVÇ6R° –ÖRæG&r‚“°  ’òò6VR‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2ó3sƒ –öä6ö×ÆWFR†æWr6÷&Uöæ–ÖF–öâ‡¶çVÕ7FW3¢Â6†'C¢ÖWÒ’“° —Ð  —&WGW&âÖS° —ÒÀ  –G&s¢gVæ7F–öâ†V6–æufÇVR’° —f"ÖRÒF†—3° —f"’ÂÆ–W'3°  –ÖRæ6ÆV"‚“°  ––b††VÇW'2Cæ—4çVÆÄ÷%VæFVb†V6–æufÇVR’’° –V6–æufÇVRÒ° —Ð  –ÖRçG&ç6—F–öâ†V6–æufÇVR“°  ––b†ÖRçv–GF‚ÃÒÇÂÖRæ†V–v‡BÃÒ’° —&WGW&ã° —Ð  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&TG&rrÂ¶V6–æufÇVUÒ’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  ’òò&V6W6RöbÇVv–â†öö·2†&Vf÷&RögFW$FF6WG4G&r’ÂFF6WG26âw@ ’òò7W'&VçFÇ’&R'BöbÆ–W'2â–ç7FVBÂvRG&p ’òòÆ–W'2ÃÒ&Vf÷&R†FVfVÇBÂ&6·v&B6ö×B’ÂæBF†R&W7BgFW  –Æ–W'2ÒÖRåöÆ–W'3° –f÷"†’Ò²’ÂÆ–W'2æÆVæwF‚bbÆ–W'5¶•Òç¢ÃÒ²²¶’’° –Æ–W'5¶•ÒæG&r†ÖRæ6†'D&V“° —Ð  –ÖRæG&tFF6WG2†V6–æufÇVR“°  ’òò&W7BöbÆ–W'0 –f÷"ƒ²’ÂÆ–W'2æÆVæwFƒ²²¶’’° –Æ–W'5¶•ÒæG&r†ÖRæ6†'D&V“° —Ð  –ÖRåöG&uFööÇF—†V6–æufÇVR“°  –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW$G&rrÂ¶V6–æufÇVUÒ“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð —G&ç6—F–öã¢gVæ7F–öâ†V6–æufÇVR’° —f"ÖRÒF†—3°  –f÷"‡f"’ÒÂ–ÆVâÒ†ÖRæFFæFF6WG2ÇÂµÒ’æÆVæwFƒ²’Â–ÆVã²²¶’’° ––b†ÖRæ—4FF6WEf—6–&ÆR†’’’° –ÖRævWDFF6WDÖWF†’’æ6öçG&öÆÆW"çG&ç6—F–öâ†V6–æufÇVR“° —Ð —Ð  –ÖRçFööÇF—çG&ç6—F–öâ†V6–æufÇVR“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWE6÷'FVDFF6WDÖWF3¢gVæ7F–öâ†f–ÇFW%f—6–&ÆR’° —f"ÖRÒF†—3° —f"FF6WG2ÒÖRæFFæFF6WG2ÇÂµÓ° —f"&W7VÇBÒµÓ° —f"’Â–ÆVã°  –f÷"†’ÒÂ–ÆVâÒFF6WG2æÆVæwFƒ²’Â–ÆVã²²¶’’° ––b‚f–ÇFW%f—6–&ÆRÇÂÖRæ—4FF6WEf—6–&ÆR†’’’° —&W7VÇBçW6‚†ÖRævWDFF6WDÖWF†’’“° —Ð —Ð  —&W7VÇBç6÷'B†6ö×&S$ÆWfVÂ‚v÷&FW"rÂv–æFW‚r’“°  —&WGW&â&W7VÇC° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWE6÷'FVEf—6–&ÆTFF6WDÖWF3¢gVæ7F–öâ‚’° —&WGW&âF†—2åövWE6÷'FVDFF6WDÖWF2‡G'VR“° —ÒÀ  ’ò¢  ’¢G&w2ÆÂFF6WG2VæÆW72ÇVv–â&WGW&ç2fÇ6VFòF†R&Vf÷&TFF6WG4G&v  ’¢†öö²Â–âv†–6‚66RÂÇVv–ç2v–ÆÂæ÷B&R6ÆÆVBöâgFW$FF6WG4G&và ’¢&—fFP ’¢ð –G&tFF6WG3¢gVæ7F–öâ†V6–æufÇVR’° —f"ÖRÒF†—3° —f"ÖWF6WG2Â“°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&TFF6WG4G&rrÂ¶V6–æufÇVUÒ’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  –ÖWF6WG2ÒÖRåövWE6÷'FVEf—6–&ÆTFF6WDÖWF2‚“° –f÷"†’ÒÖWF6WG2æÆVæwF‚Ò²’ãÒ²ÒÖ’’° –ÖRæG&tFF6WB†ÖWF6WG5¶•ÒÂV6–æufÇVR“° —Ð  –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW$FF6WG4G&rrÂ¶V6–æufÇVUÒ“° —ÒÀ  ’ò¢  ’¢G&w2FF6WBB–æFW‚VæÆW72ÇVv–â&WGW&ç2fÇ6VFòF†R&Vf÷&TFF6WDG&v  ’¢†öö²Â–âv†–6‚66RÂÇVv–ç2v–ÆÂæ÷B&R6ÆÆVBöâgFW$FF6WDG&và ’¢&—fFP ’¢ð –G&tFF6WC¢gVæ7F–öâ†ÖWFÂV6–æufÇVR’° —f"ÖRÒF†—3° —f"&w2Ò° –ÖWF¢ÖWFÀ ––æFWƒ¢ÖWFæ–æFW‚À –V6–æufÇVS¢V6–æufÇVP —Ó°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&TFF6WDG&rrÂ¶&w5Ò’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  –ÖWFæ6öçG&öÆÆW"æG&r†V6–æufÇVR“°  –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW$FF6WDG&rrÂ¶&w5Ò“° —ÒÀ  ’ò¢  ’¢G&w2FööÇF—VæÆW72ÇVv–â&WGW&ç2fÇ6VFòF†R&Vf÷&UFööÇF—G&v  ’¢†öö²Â–âv†–6‚66RÂÇVv–ç2v–ÆÂæ÷B&R6ÆÆVBöâgFW%FööÇF—G&và ’¢&—fFP ’¢ð •öG&uFööÇF—¢gVæ7F–öâ†V6–æufÇVR’° —f"ÖRÒF†—3° —f"FööÇF—ÒÖRçFööÇF—° —f"&w2Ò° —FööÇF—¢FööÇF—À –V6–æufÇVS¢V6–æufÇVP —Ó°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&UFööÇF—G&rrÂ¶&w5Ò’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  —FööÇF—æG&r‚“°  –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW%FööÇF—G&rrÂ¶&w5Ò“° —ÒÀ  ’ò¢  ’¢vWBF†R6–ævÆRVÆVÖVçBF†Bv26Æ–6¶VBöà ’¢&WGW&ââö&¦V7B6öçF–æ–ærF†RFF6WB–æFW‚æBVÆVÖVçB–æFW‚öbF†RÖF6†–ærVÆVÖVçBâÇ6ò6öçF–ç2F†R&V7FævÆRF†Bv2G&p ’¢ð –vWDVÆVÖVçDDWfVçC¢gVæ7F–öâ†R’° —&WGW&â6÷&Uö–çFW&7F–öâæÖöFW2ç6–ævÆR‡F†—2ÂR“° —ÒÀ  –vWDVÆVÖVçG4DWfVçC¢gVæ7F–öâ†R’° —&WGW&â6÷&Uö–çFW&7F–öâæÖöFW2æÆ&VÂ‡F†—2ÂRÂ¶–çFW'6V7C¢G'VWÒ“° —ÒÀ  –vWDVÆVÖVçG4E„†—3¢gVæ7F–öâ†R’° —&WGW&â6÷&Uö–çFW&7F–öâæÖöFW5²w‚Ö†—2uÒ‡F†—2ÂRÂ¶–çFW'6V7C¢G'VWÒ“° —ÒÀ  –vWDVÆVÖVçG4DWfVçDf÷$ÖöFS¢gVæ7F–öâ†RÂÖöFRÂ÷F–öç2’° —f"ÖWF†öBÒ6÷&Uö–çFW&7F–öâæÖöFW5¶ÖöFUÓ° ––b‡G—VöbÖWF†öBÓÓÒvgVæ7F–öâr’° —&WGW&âÖWF†öB‡F†—2ÂRÂ÷F–öç2“° —Ð  —&WGW&âµÓ° —ÒÀ  –vWDFF6WDDWfVçC¢gVæ7F–öâ†R’° —&WGW&â6÷&Uö–çFW&7F–öâæÖöFW2æFF6WB‡F†—2ÂRÂ¶–çFW'6V7C¢G'VWÒ“° —ÒÀ  –vWDFF6WDÖWF¢gVæ7F–öâ†FF6WD–æFW‚’° —f"ÖRÒF†—3° —f"FF6WBÒÖRæFFæFF6WG5¶FF6WD–æFW…Ó° ––b‚FF6WBåöÖWF’° –FF6WBåöÖWFÒ·Ó° —Ð  —f"ÖWFÒFF6WBåöÖWF¶ÖRæ–EÓ° ––b‚ÖWF’° –ÖWFÒFF6WBåöÖWF¶ÖRæ–EÒÒ° —G—S¢çVÆÂÀ –FF¢µÒÀ –FF6WC¢çVÆÂÀ –6öçG&öÆÆW#¢çVÆÂÀ –†–FFVã¢çVÆÂÀ’òò6VR—4FF6WEf—6–&ÆR‚’6öÖÖVç@ —„†—4”C¢çVÆÂÀ —”†—4”C¢çVÆÂÀ –÷&FW#¢FF6WBæ÷&FW"ÇÂÀ ––æFWƒ¢FF6WD–æFW€ —Ó° —Ð  —&WGW&âÖWF° —ÒÀ  –vWEf—6–&ÆTFF6WD6÷VçC¢gVæ7F–öâ‚’° —f"6÷VçBÒ° –f÷"‡f"’ÒÂ–ÆVâÒF†—2æFFæFF6WG2æÆVæwFƒ²’Â–ÆVã²²¶’’° ––b‡F†—2æ—4FF6WEf—6–&ÆR†’’’° –6÷VçB²³° —Ð —Ð —&WGW&â6÷VçC° —ÒÀ  –—4FF6WEf—6–&ÆS¢gVæ7F–öâ†FF6WD–æFW‚’° —f"ÖWFÒF†—2ævWDFF6WDÖWF†FF6WD–æFW‚“°  ’òòÖWFæ†–FFVâ—2W"6†'BFF6WB†–FFVâfÆr÷fW'&–FRv—F‚27FFW3¢–bG'VR÷"fÇ6RÀ ’òòF†RFF6WBæ†–FFVâfÇVR—2–væ÷&VBÂVÇ6R–bçVÆÂÂF†RFF6WB†–FFVâ7FFR—2&WGW&æVBà —&WGW&âG—VöbÖWFæ†–FFVâÓÓÒv&ööÆVâròÖWFæ†–FFVâ¢F†—2æFFæFF6WG5¶FF6WD–æFW…Òæ†–FFVã° —ÒÀ  –vVæW&FTÆVvVæC¢gVæ7F–öâ‚’° —&WGW&âF†—2æ÷F–öç2æÆVvVæD6ÆÆ&6²‡F†—2“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð –FW7G&÷”FF6WDÖWF¢gVæ7F–öâ†FF6WD–æFW‚’° —f"–BÒF†—2æ–C° —f"FF6WBÒF†—2æFFæFF6WG5¶FF6WD–æFW…Ó° —f"ÖWFÒFF6WBåöÖWFbbFF6WBåöÖWF¶–EÓ°  ––b†ÖWF’° –ÖWFæ6öçG&öÆÆW"æFW7G&÷’‚“° –FVÆWFRFF6WBåöÖWF¶–EÓ° —Ð —ÒÀ  –FW7G&÷“¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6çf2ÒÖRæ6çf3° —f"’Â–ÆVã°  –ÖRç7F÷‚“°  ’òòFF6WB6öçG&öÆÆW'2æVVBFò6ÆVçW76ö6–FVBFF –f÷"†’ÒÂ–ÆVâÒÖRæFFæFF6WG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –ÖRæFW7G&÷”FF6WDÖWF†’“° —Ð  ––b†6çf2’° –ÖRçVæ&–æDWfVçG2‚“° –†VÇW'2Cæ6çf2æ6ÆV"†ÖR“° —ÆFf÷&Òç&VÆV6T6öçFW‡B†ÖRæ7G‚“° –ÖRæ6çf2ÒçVÆÃ° –ÖRæ7G‚ÒçVÆÃ° —Ð  –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvFW7G&÷’r“°  –FVÆWFR6†'Bæ–ç7Fæ6W5¶ÖRæ–EÓ° —ÒÀ  —Fô&6ScD–ÖvS¢gVæ7F–öâ‚’° —&WGW&âF†—2æ6çf2çFôFFU$ÂæÇ’‡F†—2æ6çf2Â&wVÖVçG2“° —ÒÀ  ––æ—EFööÅF—¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° –ÖRçFööÇF—ÒæWr6÷&U÷FööÇF—‡° •ö6†'C¢ÖRÀ •ö6†'D–ç7Fæ6S¢ÖRÂòòFW&V6FVBÂ&6·v&B6ö×F–&–Æ—G •öFF¢ÖRæFFÀ •ö÷F–öç3¢ÖRæ÷F–öç2çFööÇF—0 —ÒÂÖR“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð –&–æDWfVçG3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"Æ—7FVæW'2ÒÖRåöÆ—7FVæW'2Ò·Ó° —f"Æ—7FVæW"ÒgVæ7F–öâ‚’° –ÖRæWfVçD†æFÆW"æÇ’†ÖRÂ&wVÖVçG2“° —Ó°  –†VÇW'2CæV6‚†ÖRæ÷F–öç2æWfVçG2ÂgVæ7F–öâ‡G—R’° —ÆFf÷&ÒæFDWfVçDÆ—7FVæW"†ÖRÂG—RÂÆ—7FVæW"“° –Æ—7FVæW'5·G—UÒÒÆ—7FVæW#° —Ò“°  ’òòVÆVÖVçG2W6VBFòFWFV7B6—¦R6†ævR6†÷VÆBæ÷B&R–æ¦V7FVBf÷"æöâ&W7öç6—fR6†'G2à ’òò6VR‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2ó##  ––b†ÖRæ÷F–öç2ç&W7öç6—fR’° –Æ—7FVæW"ÒgVæ7F–öâ‚’° –ÖRç&W6—¦R‚“° —Ó°  —ÆFf÷&ÒæFDWfVçDÆ—7FVæW"†ÖRÂw&W6—¦RrÂÆ—7FVæW"“° –Æ—7FVæW'2ç&W6—¦RÒÆ—7FVæW#° —Ð —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð —Væ&–æDWfVçG3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"Æ—7FVæW'2ÒÖRåöÆ—7FVæW'3° ––b‚Æ—7FVæW'2’° —&WGW&ã° —Ð  –FVÆWFRÖRåöÆ—7FVæW'3° –†VÇW'2CæV6‚†Æ—7FVæW'2ÂgVæ7F–öâ†Æ—7FVæW"ÂG—R’° —ÆFf÷&Òç&VÖ÷fTWfVçDÆ—7FVæW"†ÖRÂG—RÂÆ—7FVæW"“° —Ò“° —ÒÀ  —WFFT†÷fW%7G–ÆS¢gVæ7F–öâ†VÆVÖVçG2ÂÖöFRÂVæ&ÆVB’° —f"&Vf—‚ÒVæ&ÆVBòw6WBr¢w&VÖ÷fRs° —f"VÆVÖVçBÂ’Â–ÆVã°  –f÷"†’ÒÂ–ÆVâÒVÆVÖVçG2æÆVæwFƒ²’Â–ÆVã²²¶’’° –VÆVÖVçBÒVÆVÖVçG5¶•Ó° ––b†VÆVÖVçB’° —F†—2ævWDFF6WDÖWF†VÆVÖVçBåöFF6WD–æFW‚’æ6öçG&öÆÆW%·&Vf—‚²t†÷fW%7G–ÆRuÒ†VÆVÖVçB“° —Ð —Ð  ––b†ÖöFRÓÓÒvFF6WBr’° —F†—2ævWDFF6WDÖWF†VÆVÖVçG5³ÒåöFF6WD–æFW‚’æ6öçG&öÆÆW%²uòr²&Vf—‚²tFF6WD†÷fW%7G–ÆRuÒ‚“° —Ð —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð –WfVçD†æFÆW#¢gVæ7F–öâ†R’° —f"ÖRÒF†—3° —f"FööÇF—ÒÖRçFööÇF—°  ––b†6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂv&Vf÷&TWfVçBrÂ¶UÒ’ÓÓÒfÇ6R’° —&WGW&ã° —Ð  ’òò'VffW"ç’WFFR6ÆÇ26òF†B&VæFW'2Fòæ÷Bö67W  –ÖRåö'VffW&VE&VæFW"ÒG'VS° –ÖRåö'VffW&VE&WVW7BÒçVÆÃ°  —f"6†ævVBÒÖRæ†æFÆTWfVçB†R“° ’òòf÷"6Öö÷F‚FööÇF—æ–ÖF–öç2—77VR3C“ƒ ’òòF†RFööÇF—6†÷VÆB&RF†R6÷W&6Röb6†ævP ’òòæ–ÖF–öâ6†V6²v÷&¶&÷VæC  ’òòFööÇF—å÷7F'Bv–ÆÂ&RçVÆÂv†VâFööÇF——6âwBæ–ÖF–æp ––b‡FööÇF—’° –6†ævVBÒFööÇF—å÷7F'@ “òFööÇF—æ†æFÆTWfVçB†R “¢6†ævVBÂFööÇF—æ†æFÆTWfVçB†R“° —Ð  –6÷&U÷ÇVv–ç2ææ÷F–g’†ÖRÂvgFW$WfVçBrÂ¶UÒ“°  —f"'VffW&VE&WVW7BÒÖRåö'VffW&VE&WVW7C° ––b†'VffW&VE&WVW7B’° ’òò–bvR†fRâWFFRF†Bv2G&–vvW&VBÂvRæVVBFòFòæ÷&ÖÂ&VæFW  –ÖRç&VæFW"†'VffW&VE&WVW7B“° —ÒVÇ6R–b†6†ævVBbbÖRææ–ÖF–ær’° ’òò–bVçFW&–ærÂÆVf–ærÂ÷"6†æv–ærVÆVÖVçG2Âæ–ÖFRF†R6†ævRf–—f÷@ –ÖRç7F÷‚“°  ’òòvRöæÇ’æVVBFò&VæFW"BF†—2ö–çBâWFF–ærv–ÆÂ6W6R66ÆW2Fò&P ’òò&V6ö×WFVBvVæW&F–ærfÆ–6¶W"bW6–ærÖ÷&RÖVÖ÷'’F†âæV6W76'’à –ÖRç&VæFW"‡° –GW&F–öã¢ÖRæ÷F–öç2æ†÷fW"ææ–ÖF–öäGW&F–öâÀ –Æ§“¢G'VP —Ò“° —Ð  –ÖRåö'VffW&VE&VæFW"ÒfÇ6S° –ÖRåö'VffW&VE&WVW7BÒçVÆÃ°  —&WGW&âÖS° —ÒÀ  ’ò¢  ’¢†æFÆRâWfVç@ ’¢&—fFP ’¢&Ò´”WfVçGÒWfVçBF†RWfVçBFò†æFÆP ’¢&WGW&â¶&ööÆVçÒG'VR–bF†R6†'BæVVG2Fò&R×&VæFW  ’¢ð –†æFÆTWfVçC¢gVæ7F–öâ†R’° —f"ÖRÒF†—3° —f"÷F–öç2ÒÖRæ÷F–öç2ÇÂ·Ó° —f"†÷fW$÷F–öç2Ò÷F–öç2æ†÷fW#° —f"6†ævVBÒfÇ6S°  –ÖRæÆ7D7F—fRÒÖRæÆ7D7F—fRÇÂµÓ°  ’òòf–æB7F—fRVÆVÖVçG2f÷"†÷fW"æBFööÇF—0 ––b†RçG—RÓÓÒvÖ÷W6V÷WBr’° –ÖRæ7F—fRÒµÓ° —ÒVÇ6R° –ÖRæ7F—fRÒÖRævWDVÆVÖVçG4DWfVçDf÷$ÖöFR†RÂ†÷fW$÷F–öç2æÖöFRÂ†÷fW$÷F–öç2“° —Ð  ’òò–çfö¶Röä†÷fW"†öö° ’òòæVVBFò6ÆÂv—F‚æF—fRWfVçB†W&RFòæ÷B'&V²&6·v&G26ö×F–&–Æ—G –†VÇW'2Cæ6ÆÆ&6²†÷F–öç2æöä†÷fW"ÇÂ÷F–öç2æ†÷fW"æöä†÷fW"Â¶RææF—fRÂÖRæ7F—fUÒÂÖR“°  ––b†RçG—RÓÓÒvÖ÷W6WWrÇÂRçG—RÓÓÒv6Æ–6²r’° ––b†÷F–öç2æöä6Æ–6²’° ’òòW6RRææF—fR†W&Rf÷"&6·v&G26ö×F–&–Æ—G –÷F–öç2æöä6Æ–6²æ6ÆÂ†ÖRÂRææF—fRÂÖRæ7F—fR“° —Ð —Ð  ’òò&VÖ÷fR7G–Æ–ærf÷"Æ7B7F—fR†WfVâ–b—BÖ’7F–ÆÂ&R7F—fR ––b†ÖRæÆ7D7F—fRæÆVæwF‚’° –ÖRçWFFT†÷fW%7G–ÆR†ÖRæÆ7D7F—fRÂ†÷fW$÷F–öç2æÖöFRÂfÇ6R“° —Ð  ’òò'V–ÇB–â†÷fW"7G–Æ–æp ––b†ÖRæ7F—fRæÆVæwF‚bb†÷fW$÷F–öç2æÖöFR’° –ÖRçWFFT†÷fW%7G–ÆR†ÖRæ7F—fRÂ†÷fW$÷F–öç2æÖöFRÂG'VR“° —Ð  –6†ævVBÒ†VÇW'2Cæ'&”WVÇ2†ÖRæ7F—fRÂÖRæÆ7D7F—fR“°  ’òò&VÖVÖ&W"Æ7B7F—fW0 –ÖRæÆ7D7F—fRÒÖRæ7F—fS°  —&WGW&â6†ævVC° —Ð§Ò“° ¢ò¢ ¢¢äõDR…4"’vR7GVÆÇ’FöâwBW6RF†—26öçF–æW"ç–Ö÷&R'WBvRæVVBFò¶VW—@¢¢f÷"&6·v&B6ö×F–&–Æ—G’âF†÷Vv‚Â—B6â7F–ÆÂ&RW6VgVÂf÷"ÇVv–ç2F†@¢¢v÷VÆBæVVBFòv÷&²öâ×VÇF—ÆR6†'G3ò¢¢ð¤6†'Bæ–ç7Fæ6W2Ò·Ó° §f"6÷&Uö6öçG&öÆÆW"Ò6†'C° ¢òòDU$T4D”ôå0 ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’ÂW6R6†'B–ç7FVBà¢¢6Æ726†'Bä6öçG&öÆÆW ¢¢FW&V6FVB6–æ6RfW'6–öâ"ã`¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¤6†'Bä6öçG&öÆÆW"Ò6†'C° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&Rà¢¢æÖW76R6†'@¢¢FW&V6FVB6–æ6RfW'6–öâ"ã€¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¤6†'BçG—W2Ò·Ó° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&Rà¢¢æÖW76R6†'Bæ†VÇW'2æ6öæf–tÖW&vP¢¢FW&V6FVB6–æ6RfW'6–öâ"ã‚ã ¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦†VÇW'2Cæ6öæf–tÖW&vRÒÖW&vT6öæf–s° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&Rà¢¢æÖW76R6†'Bæ†VÇW'2ç66ÆTÖW&vP¢¢FW&V6FVB6–æ6RfW'6–öâ"ã‚ã ¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦†VÇW'2Cç66ÆTÖW&vRÒÖW&vU66ÆT6öæf–s° §f"6÷&Uö†VÇW'2ÒgVæ7F–öâ‚’°  ’òòÒÒ&6–2§2WF–Æ—G’ÖWF†öG0  –†VÇW'2Cçv†W&RÒgVæ7F–öâ†6öÆÆV7F–öâÂf–ÇFW$6ÆÆ&6²’° ––b††VÇW'2Cæ—4'&’†6öÆÆV7F–öâ’bb'&’ç&÷F÷G—Ræf–ÇFW"’° —&WGW&â6öÆÆV7F–öâæf–ÇFW"†f–ÇFW$6ÆÆ&6²“° —Ð —f"f–ÇFW&VBÒµÓ°  –†VÇW'2CæV6‚†6öÆÆV7F–öâÂgVæ7F–öâ†—FVÒ’° ––b†f–ÇFW$6ÆÆ&6²†—FVÒ’’° –f–ÇFW&VBçW6‚†—FVÒ“° —Ð —Ò“°  —&WGW&âf–ÇFW&VC° —Ó° –†VÇW'2Cæf–æD–æFW‚Ò'&’ç&÷F÷G—Ræf–æD–æFW‚ð –gVæ7F–öâ†'&’Â6ÆÆ&6²Â66÷R’° —&WGW&â'&’æf–æD–æFW‚†6ÆÆ&6²Â66÷R“° —Ò  –gVæ7F–öâ†'&’Â6ÆÆ&6²Â66÷R’° —66÷RÒ66÷RÓÓÒVæFVf–æVBò'&’¢66÷S° –f÷"‡f"’ÒÂ–ÆVâÒ'&’æÆVæwFƒ²’Â–ÆVã²²¶’’° ––b†6ÆÆ&6²æ6ÆÂ‡66÷RÂ'&•¶•ÒÂ’Â'&’’’° —&WGW&â“° —Ð —Ð —&WGW&âÓ° —Ó° –†VÇW'2Cæf–æDæW‡Ev†W&RÒgVæ7F–öâ†'&•Fõ6V&6‚Âf–ÇFW$6ÆÆ&6²Â7F'D–æFW‚’° ’òòFVfVÇBFò7F'BöbF†R'& ––b††VÇW'2Cæ—4çVÆÄ÷%VæFVb‡7F'D–æFW‚’’° —7F'D–æFW‚ÒÓ° —Ð –f÷"‡f"’Ò7F'D–æFW‚²²’Â'&•Fõ6V&6‚æÆVæwFƒ²’²²’° —f"7W'&VçD—FVÒÒ'&•Fõ6V&6…¶•Ó° ––b†f–ÇFW$6ÆÆ&6²†7W'&VçD—FVÒ’’° —&WGW&â7W'&VçD—FVÓ° —Ð —Ð —Ó° –†VÇW'2Cæf–æE&Wf–÷W5v†W&RÒgVæ7F–öâ†'&•Fõ6V&6‚Âf–ÇFW$6ÆÆ&6²Â7F'D–æFW‚’° ’òòFVfVÇBFòVæBöbF†R'& ––b††VÇW'2Cæ—4çVÆÄ÷%VæFVb‡7F'D–æFW‚’’° —7F'D–æFW‚Ò'&•Fõ6V&6‚æÆVæwFƒ° —Ð –f÷"‡f"’Ò7F'D–æFW‚Ò²’ãÒ²’ÒÒ’° —f"7W'&VçD—FVÒÒ'&•Fõ6V&6…¶•Ó° ––b†f–ÇFW$6ÆÆ&6²†7W'&VçD—FVÒ’’° —&WGW&â7W'&VçD—FVÓ° —Ð —Ð —Ó°  ’òòÒÒÖF‚ÖWF†öG0 –†VÇW'2Cæ—4çVÖ&W"ÒgVæ7F–öâ†â’° —&WGW&â—4æâ‡'6TfÆöB†â’’bb—4f–æ—FR†â“° —Ó° –†VÇW'2CæÆÖ÷7DWVÇ2ÒgVæ7F–öâ‡‚Â’ÂW6–Æöâ’° —&WGW&âÖF‚æ'2‡‚Ò’’ÂW6–Æöã° —Ó° –†VÇW'2CæÆÖ÷7Ev†öÆRÒgVæ7F–öâ‡‚ÂW6–Æöâ’° —f"&÷VæFVBÒÖF‚ç&÷VæB‡‚“° —&WGW&â‚‡&÷VæFVBÒW6–Æöâ’ÃÒ‚’bb‚‡&÷VæFVB²W6–Æöâ’ãÒ‚“° —Ó° –†VÇW'2CæÖ‚ÒgVæ7F–öâ†'&’’° —&WGW&â'&’ç&VGV6R†gVæ7F–öâ†Ö‚ÂfÇVR’° ––b‚—4æâ‡fÇVR’’° —&WGW&âÖF‚æÖ‚†Ö‚ÂfÇVR“° —Ð —&WGW&âÖƒ° —ÒÂçVÖ&W"ääTtD•dUô”äd”ä•E’“° —Ó° –†VÇW'2CæÖ–âÒgVæ7F–öâ†'&’’° —&WGW&â'&’ç&VGV6R†gVæ7F–öâ†Ö–âÂfÇVR’° ––b‚—4æâ‡fÇVR’’° —&WGW&âÖF‚æÖ–â†Ö–âÂfÇVR“° —Ð —&WGW&âÖ–ã° —ÒÂçVÖ&W"åõ4•D•dUô”äd”ä•E’“° —Ó° –†VÇW'2Cç6–vâÒÖF‚ç6–vâð –gVæ7F–öâ‡‚’° —&WGW&âÖF‚ç6–vâ‡‚“° —Ò  –gVæ7F–öâ‡‚’° —‚Ò·ƒ²òò6öçfW'BFòçVÖ&W  ––b‡‚ÓÓÒÇÂ—4æâ‡‚’’° —&WGW&âƒ° —Ð —&WGW&â‚âò¢Ó° —Ó° –†VÇW'2CçFõ&F–ç2ÒgVæ7F–öâ†FVw&VW2’° —&WGW&âFVw&VW2¢„ÖF‚å’òƒ“° —Ó° –†VÇW'2CçFôFVw&VW2ÒgVæ7F–öâ‡&F–ç2’° —&WGW&â&F–ç2¢ƒƒòÖF‚å’“° —Ó°  ’ò¢  ’¢&WGW&ç2F†RçVÖ&W"öbFV6–ÖÂÆ6W0 ’¢’æRâF†RçVÖ&W"öbF–v—G2gFW"F†RFV6–ÖÂö–çBÂöbF†RfÇVRöbF†—2çVÖ&W"à ’¢&Ò¶çVÖ&W'Ò‚ÒçVÖ&W"à ’¢&WGW&ç2¶çVÖ&W'ÒF†RçVÖ&W"öbFV6–ÖÂÆ6W2à ’¢&—fFP ’¢ð –†VÇW'2CåöFV6–ÖÅÆ6W2ÒgVæ7F–öâ‡‚’° ––b‚†VÇW'2Cæ—4f–æ—FR‡‚’’° —&WGW&ã° —Ð —f"RÒ° —f"Ò° —v†–ÆR„ÖF‚ç&÷VæB‡‚¢R’òRÓÒ‚’° –R£Ò° —²³° —Ð —&WGW&â° —Ó°  ’òòvWG2F†RævÆRg&öÒfW'F–6ÂW&–v‡BFòF†Rö–çB&÷WB6VçG&Rà –†VÇW'2CævWDævÆTg&öÕö–çBÒgVæ7F–öâ†6VçG&Uö–çBÂævÆUö–çB’° —f"F—7Fæ6Tg&öÕ„6VçFW"ÒævÆUö–çBç‚Ò6VçG&Uö–çBçƒ° —f"F—7Fæ6Tg&öÕ”6VçFW"ÒævÆUö–çBç’Ò6VçG&Uö–çBç“° —f"&F–ÄF—7Fæ6Tg&öÔ6VçFW"ÒÖF‚ç7'B†F—7Fæ6Tg&öÕ„6VçFW"¢F—7Fæ6Tg&öÕ„6VçFW"²F—7Fæ6Tg&öÕ”6VçFW"¢F—7Fæ6Tg&öÕ”6VçFW"“°  —f"ævÆRÒÖF‚æFã"†F—7Fæ6Tg&öÕ”6VçFW"ÂF—7Fæ6Tg&öÕ„6VçFW"“°  ––b†ævÆRÂ‚ÓãR¢ÖF‚å’’’° –ævÆR³Ò"ã¢ÖF‚å“²òòÖ¶R7W&RF†R&WGW&æVBævÆR—2–âF†R&ævRöb‚Õ’ó"Â5’ó%Ð —Ð  —&WGW&â° –ævÆS¢ævÆRÀ –F—7Fæ6S¢&F–ÄF—7Fæ6Tg&öÔ6VçFW  —Ó° —Ó° –†VÇW'2CæF—7Fæ6T&WGvVVåö–çG2ÒgVæ7F–öâ‡CÂC"’° —&WGW&âÖF‚ç7'B„ÖF‚ç÷r‡C"ç‚ÒCç‚Â"’²ÖF‚ç÷r‡C"ç’ÒCç’Â"’“° —Ó°  ’ò¢  ’¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&P ’¢gVæ7F–öâ6†'Bæ†VÇW'2æÆ–5—†VÀ ’¢FW&V6FVB6–æ6RfW'6–öâ"ã‚ã  ’¢FöFò&VÖ÷fRBfW'6–öâ0 ’¢ð –†VÇW'2CæÆ–5—†VÂÒgVæ7F–öâ‡—†VÅv–GF‚’° —&WGW&â‡—†VÅv–GF‚R"ÓÓÒ’ò¢ãS° —Ó°  ’ò¢  ’¢&WGW&ç2F†RÆ–væVB—†VÂfÇVRFòfö–BçF’ÖÆ–6–ær&ÇW  ’¢&Ò´6†'GÒ6†'BÒF†R6†'B–ç7Fæ6Rà ’¢&Ò¶çVÖ&W'Ò—†VÂÒ—†VÂfÇVRà ’¢&Ò¶çVÖ&W'Òv–GF‚ÒF†Rv–GF‚öbF†RVÆVÖVçBà ’¢&WGW&ç2¶çVÖ&W'ÒF†RÆ–væVB—†VÂfÇVRà ’¢&—fFP ’¢ð –†VÇW'2CåöÆ–vå—†VÂÒgVæ7F–öâ†6†'BÂ—†VÂÂv–GF‚’° —f"FWf–6U—†VÅ&F–òÒ6†'Bæ7W'&VçDFWf–6U—†VÅ&F–ó° —f"†Æev–GF‚Òv–GF‚ò#° —&WGW&âÖF‚ç&÷VæB‚‡—†VÂÒ†Æev–GF‚’¢FWf–6U—†VÅ&F–ò’òFWf–6U—†VÅ&F–ò²†Æev–GFƒ° —Ó°  –†VÇW'2Cç7Æ–æT7W'fRÒgVæ7F–öâ†f—'7Eö–çBÂÖ–FFÆUö–çBÂgFW%ö–çBÂB’° ’òò&÷2Fò&ö"7Væ6W"B66ÆVB–ææ÷fF–öâf÷"†—2÷7Böâ7Æ–æ–ær&WGvVVâö–çG0 ’òò‡GG¢ò÷66ÆVF–ææ÷fF–öâæ6öÒöæÇ—F–72÷7Æ–æW2ö&÷WE7Æ–æW2æ‡FÖÀ  ’òòF†—2gVæ7F–öâ×W7BÇ6ò&W7V7B'6¶—VB"ö–çG0  —f"&Wf–÷W2Òf—'7Eö–çBç6¶—òÖ–FFÆUö–çB¢f—'7Eö–çC° —f"7W'&VçBÒÖ–FFÆUö–çC° —f"æW‡BÒgFW%ö–çBç6¶—òÖ–FFÆUö–çB¢gFW%ö–çC°  —f"CÒÖF‚ç7'B„ÖF‚ç÷r†7W'&VçBç‚Ò&Wf–÷W2ç‚Â"’²ÖF‚ç÷r†7W'&VçBç’Ò&Wf–÷W2ç’Â"’“° —f"C"ÒÖF‚ç7'B„ÖF‚ç÷r†æW‡Bç‚Ò7W'&VçBç‚Â"’²ÖF‚ç÷r†æW‡Bç’Ò7W'&VçBç’Â"’“°  —f"3ÒCò†C²C"“° —f"3"ÒC"ò†C²C"“°  ’òò–bÆÂö–çG2&RF†R6ÖRÂ3b3"v–ÆÂ&R–æ` —3Ò—4æâ‡3’ò¢3° —3"Ò—4æâ‡3"’ò¢3#°  —f"fÒB¢3²òò66Æ–ærf7F÷"f÷"G&–ævÆRF —f"f"ÒB¢3#°  —&WGW&â° —&Wf–÷W3¢° —ƒ¢7W'&VçBç‚Òf¢†æW‡Bç‚Ò&Wf–÷W2ç‚’À —“¢7W'&VçBç’Òf¢†æW‡Bç’Ò&Wf–÷W2ç’ —ÒÀ –æW‡C¢° —ƒ¢7W'&VçBç‚²f"¢†æW‡Bç‚Ò&Wf–÷W2ç‚’À —“¢7W'&VçBç’²f"¢†æW‡Bç’Ò&Wf–÷W2ç’ —Ð —Ó° —Ó° –†VÇW'2CäU4”ÄôâÒçVÖ&W"äU4”ÄôâÇÂRÓC° –†VÇW'2Cç7Æ–æT7W'fTÖöæ÷FöæRÒgVæ7F–öâ‡ö–çG2’° ’òòF†—2gVæ7F–öâ6Æ7VÆFW2,:—¦–W"6öçG&öÂö–çG2–â6–Ö–Æ"v’F†âÇ7Æ–æT7W'fWÂÀ ’òò'WB&W6W'fW2Ööæ÷Föæ–6—G’öbF†R&÷f–FVBFFæBVç7W&W2æòÆö6ÂW‡G&V×V×2&RFFV@ ’òò&WGvVVâF†RFF6WBF—67&WFRö–çG2GVRFòF†R–çFW'öÆF–öâà ’òò6VR¢‡GG3¢òöVâçv–¶—VF–æ÷&r÷v–¶’ôÖöæ÷FöæUö7V&–5ö–çFW'öÆF–öà  —f"ö–çG5v—F…FævVçG2Ò‡ö–çG2ÇÂµÒ’æÖ†gVæ7F–öâ‡ö–çB’° —&WGW&â° –ÖöFVÃ¢ö–çBåöÖöFVÂÀ –FVÇF³¢À –Ô³¢  —Ó° —Ò“°  ’òò6Æ7VÆFR6Æ÷W2†FVÇF²’æB–æ—F–Æ—¦RFævVçG2†Ô² —f"ö–çG4ÆVâÒö–çG5v—F…FævVçG2æÆVæwFƒ° —f"’Âö–çD&Vf÷&RÂö–çD7W'&VçBÂö–çDgFW#° –f÷"†’Ò²’Âö–çG4ÆVã²²¶’’° —ö–çD7W'&VçBÒö–çG5v—F…FævVçG5¶•Ó° ––b‡ö–çD7W'&VçBæÖöFVÂç6¶—’° –6öçF–çVS° —Ð  —ö–çD&Vf÷&RÒ’âòö–çG5v—F…FævVçG5¶’ÒÒ¢çVÆÃ° —ö–çDgFW"Ò’Âö–çG4ÆVâÒòö–çG5v—F…FævVçG5¶’²Ò¢çVÆÃ° ––b‡ö–çDgFW"bbö–çDgFW"æÖöFVÂç6¶—’° —f"6Æ÷TFVÇF‚Ò‡ö–çDgFW"æÖöFVÂç‚Òö–çD7W'&VçBæÖöFVÂç‚“°  ’òò–âF†R66RöbGvòö–çG2F†BV"BF†R6ÖR‚—†VÂÂ6Æ÷TFVÇF‚—2  —ö–çD7W'&VçBæFVÇF²Ò6Æ÷TFVÇF‚ÓÒò‡ö–çDgFW"æÖöFVÂç’Òö–çD7W'&VçBæÖöFVÂç’’ò6Æ÷TFVÇF‚¢° —Ð  ––b‚ö–çD&Vf÷&RÇÂö–çD&Vf÷&RæÖöFVÂç6¶—’° —ö–çD7W'&VçBæÔ²Òö–çD7W'&VçBæFVÇF³° —ÒVÇ6R–b‚ö–çDgFW"ÇÂö–çDgFW"æÖöFVÂç6¶—’° —ö–çD7W'&VçBæÔ²Òö–çD&Vf÷&RæFVÇF³° —ÒVÇ6R–b‡F†—2ç6–vâ‡ö–çD&Vf÷&RæFVÇF²’ÓÒF†—2ç6–vâ‡ö–çD7W'&VçBæFVÇF²’’° —ö–çD7W'&VçBæÔ²Ò° —ÒVÇ6R° —ö–çD7W'&VçBæÔ²Ò‡ö–çD&Vf÷&RæFVÇF²²ö–çD7W'&VçBæFVÇF²’ò#° —Ð —Ð  ’òòF§W7BFævVçG2FòVç7W&RÖöæ÷Föæ–2&÷W'F–W0 —f"Ç†²Â&WF²ÂFT²Â7V&VDÖvæ—GVFS° –f÷"†’Ò²’Âö–çG4ÆVâÒ²²¶’’° —ö–çD7W'&VçBÒö–çG5v—F…FævVçG5¶•Ó° —ö–çDgFW"Òö–çG5v—F…FævVçG5¶’²Ó° ––b‡ö–çD7W'&VçBæÖöFVÂç6¶—ÇÂö–çDgFW"æÖöFVÂç6¶—’° –6öçF–çVS° —Ð  ––b††VÇW'2CæÆÖ÷7DWVÇ2‡ö–çD7W'&VçBæFVÇF²ÂÂF†—2äU4”Äôâ’’° —ö–çD7W'&VçBæÔ²Òö–çDgFW"æÔ²Ò° –6öçF–çVS° —Ð  –Ç†²Òö–çD7W'&VçBæÔ²òö–çD7W'&VçBæFVÇF³° –&WF²Òö–çDgFW"æÔ²òö–çD7W'&VçBæFVÇF³° —7V&VDÖvæ—GVFRÒÖF‚ç÷r†Ç†²Â"’²ÖF‚ç÷r†&WF²Â"“° ––b‡7V&VDÖvæ—GVFRÃÒ’’° –6öçF–çVS° —Ð  —FT²Ò2òÖF‚ç7'B‡7V&VDÖvæ—GVFR“° —ö–çD7W'&VçBæÔ²ÒÇ†²¢FT²¢ö–çD7W'&VçBæFVÇF³° —ö–çDgFW"æÔ²Ò&WF²¢FT²¢ö–çD7W'&VçBæFVÇF³° —Ð  ’òò6ö×WFR6öçG&öÂö–çG0 —f"FVÇFƒ° –f÷"†’Ò²’Âö–çG4ÆVã²²¶’’° —ö–çD7W'&VçBÒö–çG5v—F…FævVçG5¶•Ó° ––b‡ö–çD7W'&VçBæÖöFVÂç6¶—’° –6öçF–çVS° —Ð  —ö–çD&Vf÷&RÒ’âòö–çG5v—F…FævVçG5¶’ÒÒ¢çVÆÃ° —ö–çDgFW"Ò’Âö–çG4ÆVâÒòö–çG5v—F…FævVçG5¶’²Ò¢çVÆÃ° ––b‡ö–çD&Vf÷&Rbbö–çD&Vf÷&RæÖöFVÂç6¶—’° –FVÇF‚Ò‡ö–çD7W'&VçBæÖöFVÂç‚Òö–çD&Vf÷&RæÖöFVÂç‚’ò3° —ö–çD7W'&VçBæÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5‚Òö–çD7W'&VçBæÖöFVÂç‚ÒFVÇFƒ° —ö–çD7W'&VçBæÖöFVÂæ6öçG&öÅö–çE&Wf–÷W5’Òö–çD7W'&VçBæÖöFVÂç’ÒFVÇF‚¢ö–çD7W'&VçBæÔ³° —Ð ––b‡ö–çDgFW"bbö–çDgFW"æÖöFVÂç6¶—’° –FVÇF‚Ò‡ö–çDgFW"æÖöFVÂç‚Òö–çD7W'&VçBæÖöFVÂç‚’ò3° —ö–çD7W'&VçBæÖöFVÂæ6öçG&öÅö–çDæW‡E‚Òö–çD7W'&VçBæÖöFVÂç‚²FVÇFƒ° —ö–çD7W'&VçBæÖöFVÂæ6öçG&öÅö–çDæW‡E’Òö–çD7W'&VçBæÖöFVÂç’²FVÇF‚¢ö–çD7W'&VçBæÔ³° —Ð —Ð —Ó° –†VÇW'2CææW‡D—FVÒÒgVæ7F–öâ†6öÆÆV7F–öâÂ–æFW‚ÂÆö÷’° ––b†Æö÷’° —&WGW&â–æFW‚ãÒ6öÆÆV7F–öâæÆVæwF‚Òò6öÆÆV7F–öå³Ò¢6öÆÆV7F–öå¶–æFW‚²Ó° —Ð —&WGW&â–æFW‚ãÒ6öÆÆV7F–öâæÆVæwF‚Òò6öÆÆV7F–öå¶6öÆÆV7F–öâæÆVæwF‚ÒÒ¢6öÆÆV7F–öå¶–æFW‚²Ó° —Ó° –†VÇW'2Cç&Wf–÷W4—FVÒÒgVæ7F–öâ†6öÆÆV7F–öâÂ–æFW‚ÂÆö÷’° ––b†Æö÷’° —&WGW&â–æFW‚ÃÒò6öÆÆV7F–öå¶6öÆÆV7F–öâæÆVæwF‚ÒÒ¢6öÆÆV7F–öå¶–æFW‚ÒÓ° —Ð —&WGW&â–æFW‚ÃÒò6öÆÆV7F–öå³Ò¢6öÆÆV7F–öå¶–æFW‚ÒÓ° —Ó° ’òò–×ÆVÖVçFF–öâöbF†Ræ–6RçVÖ&W"Æv÷&—F†ÒW6VB–âFWFW&Ö–æ–ærv†W&R†—2Æ&VÇ2v–ÆÂvð –†VÇW'2Cææ–6TçVÒÒgVæ7F–öâ‡&ævRÂ&÷VæB’° —f"W‡öæVçBÒÖF‚æfÆö÷"††VÇW'2CæÆös‡&ævR’“° —f"g&7F–öâÒ&ævRòÖF‚ç÷rƒÂW‡öæVçB“° —f"æ–6Tg&7F–öã°  ––b‡&÷VæB’° ––b†g&7F–öâÂãR’° –æ–6Tg&7F–öâÒ° —ÒVÇ6R–b†g&7F–öâÂ2’° –æ–6Tg&7F–öâÒ#° —ÒVÇ6R–b†g&7F–öâÂr’° –æ–6Tg&7F–öâÒS° —ÒVÇ6R° –æ–6Tg&7F–öâÒ° —Ð —ÒVÇ6R–b†g&7F–öâÃÒã’° –æ–6Tg&7F–öâÒ° —ÒVÇ6R–b†g&7F–öâÃÒ"’° –æ–6Tg&7F–öâÒ#° —ÒVÇ6R–b†g&7F–öâÃÒR’° –æ–6Tg&7F–öâÒS° —ÒVÇ6R° –æ–6Tg&7F–öâÒ° —Ð  —&WGW&âæ–6Tg&7F–öâ¢ÖF‚ç÷rƒÂW‡öæVçB“° —Ó° ’òò&WVW7Bæ–ÖF–öâöÇ–f–ÆÂÒ‡GG3¢ò÷wwrçVÆ—&—6‚æ6öÒó#÷&WVW7Fæ–ÖF–öæg&ÖRÖf÷"×6Ö'BÖæ–ÖF–ærð –†VÇW'2Cç&WVW7Dæ–Ôg&ÖRÒ†gVæ7F–öâ‚’° ––b‡G—Vöbv–æF÷rÓÓÒwVæFVf–æVBr’° —&WGW&âgVæ7F–öâ†6ÆÆ&6²’° –6ÆÆ&6²‚“° —Ó° —Ð —&WGW&âv–æF÷rç&WVW7Dæ–ÖF–öäg&ÖRÇÀ —v–æF÷rçvV&¶—E&WVW7Dæ–ÖF–öäg&ÖRÇÀ —v–æF÷ræÖ÷¥&WVW7Dæ–ÖF–öäg&ÖRÇÀ —v–æF÷ræõ&WVW7Dæ–ÖF–öäg&ÖRÇÀ —v–æF÷ræ×5&WVW7Dæ–ÖF–öäg&ÖRÇÀ –gVæ7F–öâ†6ÆÆ&6²’° —&WGW&âv–æF÷rç6WEF–ÖV÷WB†6ÆÆ&6²Âòc“° —Ó° —Ò‚’“° ’òòÒÒDôÒÖWF†öG0 –†VÇW'2CævWE&VÆF—fU÷6—F–öâÒgVæ7F–öâ†WgBÂ6†'B’° —f"Ö÷W6U‚ÂÖ÷W6U“° —f"RÒWgBæ÷&–v–æÄWfVçBÇÂWgC° —f"6çf2ÒWgBçF&vWBÇÂWgBç7&4VÆVÖVçC° —f"&÷VæF–æu&V7BÒ6çf2ævWD&÷VæF–æt6Æ–VçE&V7B‚“°  —f"F÷V6†W2ÒRçF÷V6†W3° ––b‡F÷V6†W2bbF÷V6†W2æÆVæwF‚â’° –Ö÷W6U‚ÒF÷V6†W5³Òæ6Æ–VçEƒ° –Ö÷W6U’ÒF÷V6†W5³Òæ6Æ–VçE“°  —ÒVÇ6R° –Ö÷W6U‚ÒRæ6Æ–VçEƒ° –Ö÷W6U’ÒRæ6Æ–VçE“° —Ð  ’òò66ÆRÖ÷W6R6ö÷&F–æFW2–çFò6çf26ö÷&F–æFW0 ’òò'’föÆÆ÷v–ærF†RGFW&âÆ–B÷WB'’v¦W''–¢r–âF†R6öÖÖVçG2ö` ’òò‡GG3¢ò÷wwræ‡FÖÃV6çf7GWF÷&–Ç2æ6öÒöGfæ6VBö‡FÖÃRÖ6çf2ÖÖ÷W6RÖ6ö÷&F–æFW2ð —f"FF–ætÆVgBÒ'6TfÆöB††VÇW'2CævWE7G–ÆR†6çf2ÂwFF–ærÖÆVgBr’“° —f"FF–æuF÷Ò'6TfÆöB††VÇW'2CævWE7G–ÆR†6çf2ÂwFF–ær×F÷r’“° —f"FF–æu&–v‡BÒ'6TfÆöB††VÇW'2CævWE7G–ÆR†6çf2ÂwFF–ær×&–v‡Br’“° —f"FF–æt&÷GFöÒÒ'6TfÆöB††VÇW'2CævWE7G–ÆR†6çf2ÂwFF–ærÖ&÷GFöÒr’“° —f"v–GF‚Ò&÷VæF–æu&V7Bç&–v‡BÒ&÷VæF–æu&V7BæÆVgBÒFF–ætÆVgBÒFF–æu&–v‡C° —f"†V–v‡BÒ&÷VæF–æu&V7Bæ&÷GFöÒÒ&÷VæF–æu&V7BçF÷ÒFF–æuF÷ÒFF–æt&÷GFöÓ°  ’òòvRF—f–FR'’F†R7W'&VçBFWf–6R—†VÂ&F–òÂ&V6W6RF†R6çf2—266ÆVBW'’F†BÖ÷VçB–âV6‚F—&V7F–öââ†÷vWfW  ’òòF†R&6¶VæBÖöFVÂ—2–âVç66ÆVB6ö÷&F–æFW2â6–æ6RvR&Rvö–ærFòFVÂv—F‚÷W"ÖöFVÂ6ö÷&F–æFW2ÂvRvò&6²†W&P –Ö÷W6U‚ÒÖF‚ç&÷VæB‚†Ö÷W6U‚Ò&÷VæF–æu&V7BæÆVgBÒFF–ætÆVgB’ò‡v–GF‚’¢6çf2çv–GF‚ò6†'Bæ7W'&VçDFWf–6U—†VÅ&F–ò“° –Ö÷W6U’ÒÖF‚ç&÷VæB‚†Ö÷W6U’Ò&÷VæF–æu&V7BçF÷ÒFF–æuF÷’ò††V–v‡B’¢6çf2æ†V–v‡Bò6†'Bæ7W'&VçDFWf–6U—†VÅ&F–ò“°  —&WGW&â° —ƒ¢Ö÷W6U‚À —“¢Ö÷W6U —Ó°  —Ó°  ’òò&—fFR†VÇW"gVæ7F–öâFò6öçfW'BÖ‚×v–GF‚öÖ‚Ö†V–v‡BfÇVW2F†BÖ’&RW&6VçFvW2–çFòçVÖ&W  –gVæ7F–öâ'6TÖ…7G–ÆR‡7G–ÆUfÇVRÂæöFRÂ&VçE&÷W'G’’° —f"fÇVT–å—†VÇ3° ––b‡G—Vöb7G–ÆUfÇVRÓÓÒw7G&–ærr’° —fÇVT–å—†VÇ2Ò'6T–çB‡7G–ÆUfÇVRÂ“°  ––b‡7G–ÆUfÇVRæ–æFW„öb‚rRr’ÓÒÓ’° ’òòW&6VçFvR¢6—¦R–âF–ÖVç6–öà —fÇVT–å—†VÇ2ÒfÇVT–å—†VÇ2ò¢æöFRç&VçDæöFU·&VçE&÷W'G•Ó° —Ð —ÒVÇ6R° —fÇVT–å—†VÇ2Ò7G–ÆUfÇVS° —Ð  —&WGW&âfÇVT–å—†VÇ3° —Ð  ’ò¢  ’¢&WGW&ç2–bF†Rv—fVâfÇVR6öçF–ç2âVffV7F—fR6öç7G&–çBà ’¢&—fFP ’¢ð –gVæ7F–öâ—46öç7G&–æVEfÇVR‡fÇVR’° —&WGW&âfÇVRÓÒVæFVf–æVBbbfÇVRÓÒçVÆÂbbfÇVRÓÒvæöæRs° —Ð  ’ò¢  ’¢&WGW&ç2F†RÖ‚v–GF‚÷"†V–v‡BöbF†Rv—fVâDôÒæöFR–â7&÷72Ö'&÷w6W"6ö×F–&ÆRf6†–öà ’¢&Ò´…DÔÄVÆVÖVçGÒFöÔæöFRÒF†RæöFRFò6†V6²F†R6öç7G&–çBöà ’¢&Ò·7G&–æwÒÖ…7G–ÆRÒF†R7G–ÆRF†BFVf–æW2F†RÖ†–×VÒf÷"F†RF—&V7F–öâvR&RW6–ær‚vÖ‚×v–GF‚ròvÖ‚Ö†V–v‡Br ’¢&Ò·7G&–æwÒW&6VçFvU&÷W'G’Ò&÷W'G’öb&VçBFòW6Rv†Vâ6Æ7VÆF–ærv–GF‚2W&6VçFvP ’¢6VR´Æ–æ²‡GG3¢ò÷wwrææF†æVÆ¦öæW2æ6öÒö&Æöró#2÷&VF–ærÖÖ‚×v–GF‚Ö7&÷72Ö'&÷w6W'Ð ’¢ð –gVæ7F–öâvWD6öç7G&–çDF–ÖVç6–öâ†FöÔæöFRÂÖ…7G–ÆRÂW&6VçFvU&÷W'G’’° —f"f–WrÒFö7VÖVçBæFVfVÇEf–Ws° —f"&VçDæöFRÒ†VÇW'2CåövWE&VçDæöFR†FöÔæöFR“° —f"6öç7G&–æVDæöFRÒf–WrævWD6ö×WFVE7G–ÆR†FöÔæöFR•¶Ö…7G–ÆUÓ° —f"6öç7G&–æVD6öçF–æW"Òf–WrævWD6ö×WFVE7G–ÆR‡&VçDæöFR•¶Ö…7G–ÆUÓ° —f"†44æöFRÒ—46öç7G&–æVEfÇVR†6öç7G&–æVDæöFR“° —f"†446öçF–æW"Ò—46öç7G&–æVEfÇVR†6öç7G&–æVD6öçF–æW"“° —f"–æf–æ—G’ÒçVÖ&W"åõ4•D•dUô”äd”ä•E“°  ––b††44æöFRÇÂ†446öçF–æW"’° —&WGW&âÖF‚æÖ–â€ –†44æöFRò'6TÖ…7G–ÆR†6öç7G&–æVDæöFRÂFöÔæöFRÂW&6VçFvU&÷W'G’’¢–æf–æ—G’À –†446öçF–æW"ò'6TÖ…7G–ÆR†6öç7G&–æVD6öçF–æW"Â&VçDæöFRÂW&6VçFvU&÷W'G’’¢–æf–æ—G’“° —Ð  —&WGW&âvæöæRs° —Ð ’òò&WGW&ç2çVÖ&W"÷"VæFVf–æVB–bæò6öç7G&–ç@ –†VÇW'2CævWD6öç7G&–çEv–GF‚ÒgVæ7F–öâ†FöÔæöFR’° —&WGW&âvWD6öç7G&–çDF–ÖVç6–öâ†FöÔæöFRÂvÖ‚×v–GF‚rÂv6Æ–VçEv–GF‚r“° —Ó° ’òò&WGW&ç2çVÖ&W"÷"VæFVf–æVB–bæò6öç7G&–ç@ –†VÇW'2CævWD6öç7G&–çD†V–v‡BÒgVæ7F–öâ†FöÔæöFR’° —&WGW&âvWD6öç7G&–çDF–ÖVç6–öâ†FöÔæöFRÂvÖ‚Ö†V–v‡BrÂv6Æ–VçD†V–v‡Br“° —Ó° ’ò¢  ’¢&—fFP¢ ’¢ð –†VÇW'2Cåö6Æ7VÆFUFF–ærÒgVæ7F–öâ†6öçF–æW"ÂFF–ærÂ&VçDF–ÖVç6–öâ’° —FF–ærÒ†VÇW'2CævWE7G–ÆR†6öçF–æW"ÂFF–ær“°  —&WGW&âFF–æræ–æFW„öb‚rRr’âÓò&VçDF–ÖVç6–öâ¢'6T–çB‡FF–ærÂ’ò¢'6T–çB‡FF–ærÂ“° —Ó° ’ò¢  ’¢&—fFP ’¢ð –†VÇW'2CåövWE&VçDæöFRÒgVæ7F–öâ†FöÔæöFR’° —f"&VçBÒFöÔæöFRç&VçDæöFS° ––b‡&VçBbb&VçBçFõ7G&–ær‚’ÓÓÒu¶ö&¦V7B6†F÷u&ö÷EÒr’° —&VçBÒ&VçBæ†÷7C° —Ð —&WGW&â&VçC° —Ó° –†VÇW'2CævWDÖ†–×VÕv–GF‚ÒgVæ7F–öâ†FöÔæöFR’° —f"6öçF–æW"Ò†VÇW'2CåövWE&VçDæöFR†FöÔæöFR“° ––b‚6öçF–æW"’° —&WGW&âFöÔæöFRæ6Æ–VçEv–GFƒ° —Ð  —f"6Æ–VçEv–GF‚Ò6öçF–æW"æ6Æ–VçEv–GFƒ° —f"FF–ætÆVgBÒ†VÇW'2Cåö6Æ7VÆFUFF–ær†6öçF–æW"ÂwFF–ærÖÆVgBrÂ6Æ–VçEv–GF‚“° —f"FF–æu&–v‡BÒ†VÇW'2Cåö6Æ7VÆFUFF–ær†6öçF–æW"ÂwFF–ær×&–v‡BrÂ6Æ–VçEv–GF‚“°  —f"rÒ6Æ–VçEv–GF‚ÒFF–ætÆVgBÒFF–æu&–v‡C° —f"7rÒ†VÇW'2CævWD6öç7G&–çEv–GF‚†FöÔæöFR“° —&WGW&â—4æâ†7r’òr¢ÖF‚æÖ–â‡rÂ7r“° —Ó° –†VÇW'2CævWDÖ†–×VÔ†V–v‡BÒgVæ7F–öâ†FöÔæöFR’° —f"6öçF–æW"Ò†VÇW'2CåövWE&VçDæöFR†FöÔæöFR“° ––b‚6öçF–æW"’° —&WGW&âFöÔæöFRæ6Æ–VçD†V–v‡C° —Ð  —f"6Æ–VçD†V–v‡BÒ6öçF–æW"æ6Æ–VçD†V–v‡C° —f"FF–æuF÷Ò†VÇW'2Cåö6Æ7VÆFUFF–ær†6öçF–æW"ÂwFF–ær×F÷rÂ6Æ–VçD†V–v‡B“° —f"FF–æt&÷GFöÒÒ†VÇW'2Cåö6Æ7VÆFUFF–ær†6öçF–æW"ÂwFF–ærÖ&÷GFöÒrÂ6Æ–VçD†V–v‡B“°  —f"‚Ò6Æ–VçD†V–v‡BÒFF–æuF÷ÒFF–æt&÷GFöÓ° —f"6‚Ò†VÇW'2CævWD6öç7G&–çD†V–v‡B†FöÔæöFR“° —&WGW&â—4æâ†6‚’ò‚¢ÖF‚æÖ–â†‚Â6‚“° —Ó° –†VÇW'2CævWE7G–ÆRÒgVæ7F–öâ†VÂÂ&÷W'G’’° —&WGW&âVÂæ7W'&VçE7G–ÆRð –VÂæ7W'&VçE7G–ÆU·&÷W'G•Ò  –Fö7VÖVçBæFVfVÇEf–WrævWD6ö×WFVE7G–ÆR†VÂÂçVÆÂ’ævWE&÷W'G•fÇVR‡&÷W'G’“° —Ó° –†VÇW'2Cç&WF–æ66ÆRÒgVæ7F–öâ†6†'BÂf÷&6U&F–ò’° —f"—†VÅ&F–òÒ6†'Bæ7W'&VçDFWf–6U—†VÅ&F–òÒf÷&6U&F–òÇÂ‡G—Vöbv–æF÷rÓÒwVæFVf–æVBrbbv–æF÷ræFWf–6U—†VÅ&F–ò’ÇÂ° ––b‡—†VÅ&F–òÓÓÒ’° —&WGW&ã° —Ð  —f"6çf2Ò6†'Bæ6çf3° —f"†V–v‡BÒ6†'Bæ†V–v‡C° —f"v–GF‚Ò6†'Bçv–GFƒ°  –6çf2æ†V–v‡BÒ†V–v‡B¢—†VÅ&F–ó° –6çf2çv–GF‚Òv–GF‚¢—†VÅ&F–ó° –6†'Bæ7G‚ç66ÆR‡—†VÅ&F–òÂ—†VÅ&F–ò“°  ’òò–bæò7G–ÆR†2&VVâ6WBöâF†R6çf2ÂF†R&VæFW"6—¦R—2W6VB2F—7Æ’6—¦RÀ ’òòÖ¶–ærF†R6†'Bf—7VÆÇ’&–vvW"Â6òÆWBw2Væf÷&6R—BFòF†R&6÷'&V7B"fÇVW2à ’òò6VR‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2ö—77VW2ó3SsP ––b‚6çf2ç7G–ÆRæ†V–v‡Bbb6çf2ç7G–ÆRçv–GF‚’° –6çf2ç7G–ÆRæ†V–v‡BÒ†V–v‡B²w‚s° –6çf2ç7G–ÆRçv–GF‚Òv–GF‚²w‚s° —Ð —Ó° ’òòÒÒ6çf2ÖWF†öG0 –†VÇW'2CæföçE7G&–ærÒgVæ7F–öâ‡—†VÅ6—¦RÂföçE7G–ÆRÂföçDfÖ–Ç’’° —&WGW&âföçE7G–ÆR²rr²—†VÅ6—¦R²w‚r²föçDfÖ–Ç“° —Ó° –†VÇW'2CæÆöævW7EFW‡BÒgVæ7F–öâ†7G‚ÂföçBÂ'&”öeF†–æw2Â66†R’° –66†RÒ66†RÇÂ·Ó° —f"FFÒ66†RæFFÒ66†RæFFÇÂ·Ó° —f"v2Ò66†Ræv&&vT6öÆÆV7BÒ66†Ræv&&vT6öÆÆV7BÇÂµÓ°  ––b†66†RæföçBÓÒföçB’° –FFÒ66†RæFFÒ·Ó° –v2Ò66†Ræv&&vT6öÆÆV7BÒµÓ° –66†RæföçBÒföçC° —Ð  –7G‚æföçBÒföçC° —f"ÆöævW7BÒ° —f"–ÆVâÒ'&”öeF†–æw2æÆVæwFƒ° —f"’Â¢Â¦ÆVâÂF†–ærÂæW7FVEF†–æs° –f÷"†’Ò²’Â–ÆVã²’²²’° —F†–ærÒ'&”öeF†–æw5¶•Ó°  ’òòVæFVf–æVB7G&–æw2æB'&—26†÷VÆBæ÷B&RÖV7W&V@ ––b‡F†–ærÓÒVæFVf–æVBbbF†–ærÓÒçVÆÂbb†VÇW'2Cæ—4'&’‡F†–ær’ÓÒG'VR’° –ÆöævW7BÒ†VÇW'2CæÖV7W&UFW‡B†7G‚ÂFFÂv2ÂÆöævW7BÂF†–ær“° —ÒVÇ6R–b††VÇW'2Cæ—4'&’‡F†–ær’’° ’òò–b—B—2â'&’ÆWG2ÖV7W&RV6‚VÆVÖVç@ ’òòFòFòÖ–&R6–×Æ–g’F†—2gVæ7F–öâ&—B6òvR6âFòF†—2Ö÷&R&V7W'6—fVÇ“ð –f÷"†¢ÒÂ¦ÆVâÒF†–æræÆVæwFƒ²¢Â¦ÆVã²¢²²’° –æW7FVEF†–ærÒF†–æu¶¥Ó° ’òòVæFVf–æVB7G&–æw2æB'&—26†÷VÆBæ÷B&RÖV7W&V@ ––b†æW7FVEF†–ærÓÒVæFVf–æVBbbæW7FVEF†–ærÓÒçVÆÂbb†VÇW'2Cæ—4'&’†æW7FVEF†–ær’’° –ÆöævW7BÒ†VÇW'2CæÖV7W&UFW‡B†7G‚ÂFFÂv2ÂÆöævW7BÂæW7FVEF†–ær“° —Ð —Ð —Ð —Ð  —f"v4ÆVâÒv2æÆVæwF‚ò#° ––b†v4ÆVââ'&”öeF†–æw2æÆVæwF‚’° –f÷"†’Ò²’Âv4ÆVã²’²²’° –FVÆWFRFF¶v5¶•ÕÓ° —Ð –v2ç7Æ–6RƒÂv4ÆVâ“° —Ð —&WGW&âÆöævW7C° —Ó° –†VÇW'2CæÖV7W&UFW‡BÒgVæ7F–öâ†7G‚ÂFFÂv2ÂÆöævW7BÂ7G&–ær’° —f"FW‡Ev–GF‚ÒFF·7G&–æuÓ° ––b‚FW‡Ev–GF‚’° —FW‡Ev–GF‚ÒFF·7G&–æuÒÒ7G‚æÖV7W&UFW‡B‡7G&–ær’çv–GFƒ° –v2çW6‚‡7G&–ær“° —Ð ––b‡FW‡Ev–GF‚âÆöævW7B’° –ÆöævW7BÒFW‡Ev–GFƒ° —Ð —&WGW&âÆöævW7C° —Ó°  ’ò¢  ’¢FW&V6FV@ ’¢ð –†VÇW'2CæçVÖ&W$ödÆ&VÄÆ–æW2ÒgVæ7F–öâ†'&”öeF†–æw2’° —f"çVÖ&W$ödÆ–æW2Ò° –†VÇW'2CæV6‚†'&”öeF†–æw2ÂgVæ7F–öâ‡F†–ær’° ––b††VÇW'2Cæ—4'&’‡F†–ær’’° ––b‡F†–æræÆVæwF‚âçVÖ&W$ödÆ–æW2’° –çVÖ&W$ödÆ–æW2ÒF†–æræÆVæwFƒ° —Ð —Ð —Ò“° —&WGW&âçVÖ&W$ödÆ–æW3° —Ó°  –†VÇW'2Cæ6öÆ÷"Ò6†'F§46öÆ÷"ð –gVæ7F–öâ‡fÇVR’° –6öç6öÆRæW'&÷"‚t6öÆ÷"æ§2æ÷Bf÷VæBr“° —&WGW&âfÇVS° —Ò  –gVæ7F–öâ‡fÇVR’° ’ò¢vÆö&Â6çf4w&F–VçB¢ð ––b‡fÇVR–ç7Fæ6Vöb6çf4w&F–VçB’° —fÇVRÒ6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇD6öÆ÷#° —Ð  —&WGW&â6†'F§46öÆ÷"‡fÇVR“° —Ó°  –†VÇW'2CævWD†÷fW$6öÆ÷"ÒgVæ7F–öâ†6öÆ÷%fÇVR’° ’ò¢vÆö&Â6çf5GFW&â¢ð —&WGW&â†6öÆ÷%fÇVR–ç7Fæ6Vöb6çf5GFW&âÇÂ6öÆ÷%fÇVR–ç7Fæ6Vöb6çf4w&F–VçB’ð –6öÆ÷%fÇVR  –†VÇW'2Cæ6öÆ÷"†6öÆ÷%fÇVR’ç6GW&FRƒãR’æF&¶Vâƒã’ç&v%7G&–ær‚“° —Ó°§Ó° ¦gVæ7F–öâ'7G&7B‚’° —F‡&÷ræWrW'&÷"€ ’uF†—2ÖWF†öB—2æ÷B–×ÆVÖVçFVC¢V—F†W"æòFFW"6âr° ’v&Rf÷VæB÷"â–æ6ö×ÆWFR–çFVw&F–öâv2&÷f–FVBâp ’“°§Ð ¢ò¢ ¢¢FFRFFW"†7W'&VçBW6VB'’F†RF–ÖR66ÆR¢¢æÖW76R6†'BåöFFW'2åöFFP¢¢ÖVÖ&W&öb6†'BåöFFW'0¢¢&—fFP¢¢ð ¢ò¢ ¢¢7W'&VçFÇ’7W÷'FVBVæ—B7G&–ærfÇVW2à¢¢G—VFVb²‚vÖ–ÆÆ—6V6öæBwÂw6V6öæBwÂvÖ–çWFRwÂv†÷W"wÂvF’wÂwvVV²wÂvÖöçF‚wÂwV'FW"wÂw–V"r—Ð¢¢ÖVÖ&W&öb6†'BåöFFW'2åöFFP¢¢æÖRVæ—@¢¢ð ¢ò¢ ¢¢6Æ70¢¢ð¦gVæ7F–öâFFTFFW"†÷F–öç2’° —F†—2æ÷F–öç2Ò÷F–öç2ÇÂ·Ó°§Ð ¦†VÇW'2CæW‡FVæB„FFTFFW"ç&÷F÷G—RÂò¢¢ÆVæG2FFTFFW"¢ò° ’ò¢  ’¢&WGW&ç2ÖöbF–ÖRf÷&ÖG2f÷"F†R7W÷'FVBf÷&ÖGF–ærVæ—G2FVf–æV@ ’¢–âVæ—B2vVÆÂ2vFFWF–ÖRr&W&W6VçF–ærFWF–ÆVBFFR÷F–ÖR7G&–ærà ’¢&WGW&ç2··7G&–æs¢7G&–æw×Ð ’¢ð –f÷&ÖG3¢'7G&7BÀ  ’ò¢  ’¢'6W2F†Rv—fVâfÇVVæB&WGW&âF†R76ö6–FVBF–ÖW7F×à ’¢&Ò¶ç—ÒfÇVRÒF†RfÇVRFò'6R‡W7VÆÇ’6öÖW2g&öÒF†RFF ’¢&Ò·7G&–æwÒ¶f÷&ÖEÒÒF†RW‡V7FVBFFf÷&Ö@ ’¢&WGW&ç2²†çVÖ&W'ÆçVÆÂ—Ð ’¢gVæ7F–öà ’¢ð —'6S¢'7G&7BÀ  ’ò¢  ’¢&WGW&ç2F†Rf÷&ÖGFVBFFR–âF†R7V6–f–VBf÷&ÖFf÷"v—fVâF–ÖW7F×à ’¢&Ò¶çVÖ&W'ÒF–ÖW7F×ÒF†RF–ÖW7F×Fòf÷&Ö@ ’¢&Ò·7G&–æwÒf÷&ÖBÒF†RFFR÷F–ÖRFö¶Và ’¢&WGW&â·7G&–æwÐ ’¢gVæ7F–öà ’¢ð –f÷&ÖC¢'7G&7BÀ  ’ò¢  ’¢FG2F†R7V6–f–VBÖ÷VçFöbVæ—FFòF†Rv—fVâF–ÖW7F×à ’¢&Ò¶çVÖ&W'ÒF–ÖW7F×ÒF†R–çWBF–ÖW7F×  ’¢&Ò¶çVÖ&W'ÒÖ÷VçBÒF†RÖ÷VçBFòF@ ’¢&ÒµVæ—GÒVæ—BÒF†RVæ—B27G&–æp ’¢&WGW&â¶çVÖ&W'Ð ’¢gVæ7F–öà ’¢ð –FC¢'7G&7BÀ  ’ò¢  ’¢&WGW&ç2F†RçVÖ&W"öbVæ—F&WGvVVâF†Rv—fVâF–ÖW7F×2à ’¢&Ò¶çVÖ&W'ÒÖ‚ÒF†R–çWBF–ÖW7F×‡&VfW&Væ6R ’¢&Ò¶çVÖ&W'ÒÖ–âÒF†RF–ÖW7F×Fò7V'7G&7@ ’¢&ÒµVæ—GÒVæ—BÒF†RVæ—B27G&–æp ’¢&WGW&â¶çVÖ&W'Ð ’¢gVæ7F–öà ’¢ð –F–fc¢'7G&7BÀ  ’ò¢  ’¢&WGW&ç27F'BöbVæ—Ff÷"F†Rv—fVâF–ÖW7F×à ’¢&Ò¶çVÖ&W'ÒF–ÖW7F×ÒF†R–çWBF–ÖW7F×  ’¢&ÒµVæ—GÒVæ—BÒF†RVæ—B27G&–æp ’¢&Ò¶çVÖ&W'Ò·vVV¶F•ÒÒF†R•4òF’öbF†RvVV²v—F‚&V–ærÖöæF ’¢æBr&V–ær7VæF’†öæÇ’æVVFVB–b&Ò§Væ—B¢—2—6õvVV¶’à ’¢gVæ7F–öà ’¢ð —7F'Döc¢'7G&7BÀ  ’ò¢  ’¢&WGW&ç2VæBöbVæ—Ff÷"F†Rv—fVâF–ÖW7F×à ’¢&Ò¶çVÖ&W'ÒF–ÖW7F×ÒF†R–çWBF–ÖW7F×  ’¢&ÒµVæ—GÒVæ—BÒF†RVæ—B27G&–æp ’¢gVæ7F–öà ’¢ð –VæDöc¢'7G&7BÀ  ’òòDU$T4D”ôå0  ’ò¢  ’¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’f÷"66ÆRævWEfÇVTf÷%—†VÂ‚’À ’¢F†—2ÖWF†öB6†÷VÆB&R÷fW'&–FFVâöæÇ’'’F†RÖöÖVçBFFW"à ’¢FW&V6FVB6–æ6RfW'6–öâ"ã‚ã  ’¢FöFò&VÖ÷fRBfW'6–öâ0 ’¢&—fFP ’¢ð •ö7&VFS¢gVæ7F–öâ‡fÇVR’° —&WGW&âfÇVS° —Ð§Ò“° ¤FFTFFW"æ÷fW'&–FRÒgVæ7F–öâ†ÖVÖ&W'2’° –†VÇW'2CæW‡FVæB„FFTFFW"ç&÷F÷G—RÂÖVÖ&W'2“°§Ó° §f"öFFRÒFFTFFW#° §f"6÷&UöFFW'2Ò° •öFFS¢öFFP§Ó° ¢ò¢ ¢¢æÖW76RFò†öÆB7FF–2F–6²vVæW&F–öâgVæ7F–öç0¢¢æÖW76R6†'BåF–6·0¢¢ð§f"6÷&U÷F–6·2Ò° ’ò¢  ’¢æÖW76RFò†öÆBf÷&ÖGFW'2f÷"F–ffW&VçBG—W2öbF–6·0 ’¢æÖW76R6†'BåF–6·2æf÷&ÖGFW'0 ’¢ð –f÷&ÖGFW'3¢° ’ò¢  ’¢f÷&ÖGFW"f÷"fÇVRÆ&VÇ0 ’¢ÖWF†öB6†'BåF–6·2æf÷&ÖGFW'2çfÇVW0 ’¢&ÒfÇVRF†RfÇVRFòF—7Æ ’¢&WGW&â·7G&–æwÇ7G&–æuµ×ÒF†RÆ&VÂFòF—7Æ ’¢ð —fÇVW3¢gVæ7F–öâ‡fÇVR’° —&WGW&â†VÇW'2Cæ—4'&’‡fÇVR’òfÇVR¢rr²fÇVS° —ÒÀ  ’ò¢  ’¢f÷&ÖGFW"f÷"Æ–æV"çVÖW&–2F–6·0 ’¢ÖWF†öB6†'BåF–6·2æf÷&ÖGFW'2æÆ–æV  ’¢&ÒF–6µfÇVR¶çVÖ&W'ÒF†RfÇVRFò&Rf÷&ÖGFV@ ’¢&Ò–æFW‚¶çVÖ&W'ÒF†R÷6—F–öâöbF†RF–6µfÇVR&ÖWFW"–âF†RF–6·2'& ’¢&ÒF–6·2¶çVÖ&W%µ×ÒF†RÆ—7BöbF–6·2&V–ær6öçfW'FV@ ’¢&WGW&â·7G&–æwÒ7G&–ær&W&W6VçFF–öâöbF†RF–6µfÇVR&ÖWFW  ’¢ð –Æ–æV#¢gVæ7F–öâ‡F–6µfÇVRÂ–æFW‚ÂF–6·2’° ’òò–bvR†fRÆ÷G2öbF–6·2ÂFöâwBW6RF†RöæW0 —f"FVÇFÒF–6·2æÆVæwF‚â2òF–6·5³%ÒÒF–6·5³Ò¢F–6·5³ÒÒF–6·5³Ó°  ’òò–bvR†fRçVÖ&W"Æ–¶R"ãR2F†RFVÇFÂf–wW&R÷WB†÷rÖç’FV6–ÖÂÆ6W2vRæVV@ ––b„ÖF‚æ'2†FVÇF’â’° ––b‡F–6µfÇVRÓÒÖF‚æfÆö÷"‡F–6µfÇVR’’° ’òòæ÷Bâ–çFVvW  –FVÇFÒF–6µfÇVRÒÖF‚æfÆö÷"‡F–6µfÇVR“° —Ð —Ð  —f"ÆötFVÇFÒ†VÇW'2CæÆös„ÖF‚æ'2†FVÇF’“° —f"F–6µ7G&–ærÒrs°  ––b‡F–6µfÇVRÓÒ’° —f"Ö…F–6²ÒÖF‚æÖ‚„ÖF‚æ'2‡F–6·5³Ò’ÂÖF‚æ'2‡F–6·5·F–6·2æÆVæwF‚ÒÒ’“° ––b†Ö…F–6²ÂRÓB’²òòÆÂF–6·2&R6ÖÆÂçVÖ&W'3²W6R66–VçF–f–2æ÷FF–öà —f"ÆöuF–6²Ò†VÇW'2CæÆös„ÖF‚æ'2‡F–6µfÇVR’“° —f"çVÔW‡öæVçF–ÂÒÖF‚æfÆö÷"†ÆöuF–6²’ÒÖF‚æfÆö÷"†ÆötFVÇF“° –çVÔW‡öæVçF–ÂÒÖF‚æÖ‚„ÖF‚æÖ–â†çVÔW‡öæVçF–ÂÂ#’Â“° —F–6µ7G&–ærÒF–6µfÇVRçFôW‡öæVçF–Â†çVÔW‡öæVçF–Â“° —ÒVÇ6R° —f"çVÔFV6–ÖÂÒÓ¢ÖF‚æfÆö÷"†ÆötFVÇF“° –çVÔFV6–ÖÂÒÖF‚æÖ‚„ÖF‚æÖ–â†çVÔFV6–ÖÂÂ#’Â“²òòFôf—†VB†2Ö‚öb#FV6–ÖÂÆ6W0 —F–6µ7G&–ærÒF–6µfÇVRçFôf—†VB†çVÔFV6–ÖÂ“° —Ð —ÒVÇ6R° —F–6µ7G&–ærÒss²òòæWfW"6†÷rFV6–ÖÂÆ6W2f÷"  —Ð  —&WGW&âF–6µ7G&–æs° —ÒÀ  –Æöv&—F†Ö–3¢gVæ7F–öâ‡F–6µfÇVRÂ–æFW‚ÂF–6·2’° —f"&VÖ–âÒF–6µfÇVRò„ÖF‚ç÷rƒÂÖF‚æfÆö÷"††VÇW'2CæÆös‡F–6µfÇVR’’’“°  ––b‡F–6µfÇVRÓÓÒ’° —&WGW&âss° —ÒVÇ6R–b‡&VÖ–âÓÓÒÇÂ&VÖ–âÓÓÒ"ÇÂ&VÖ–âÓÓÒRÇÂ–æFW‚ÓÓÒÇÂ–æFW‚ÓÓÒF–6·2æÆVæwF‚Ò’° —&WGW&âF–6µfÇVRçFôW‡öæVçF–Â‚“° —Ð —&WGW&ârs° —Ð —Ð§Ó° §f"—4'&’Ò†VÇW'2Cæ—4'&“°§f"—4çVÆÄ÷%VæFVbÒ†VÇW'2Cæ—4çVÆÄ÷%VæFVc°§f"fÇVT÷$FVfVÇBFÒ†VÇW'2CçfÇVT÷$FVfVÇC°§f"fÇVTD–æFW„÷$FVfVÇBÒ†VÇW'2CçfÇVTD–æFW„÷$FVfVÇC° ¦6÷&UöFVfVÇG2å÷6WB‚w66ÆRrÂ° –F—7Æ“¢G'VRÀ —÷6—F–öã¢vÆVgBrÀ –öfg6WC¢fÇ6RÀ  ’òòw&–BÆ–æR6WGF–æw0 –w&–DÆ–æW3¢° –F—7Æ“¢G'VRÀ –6öÆ÷#¢w&v&ƒÃÃÃã’rÀ –Æ–æUv–GFƒ¢À –G&t&÷&FW#¢G'VRÀ –G&töä6†'D&V¢G'VRÀ –G&uF–6·3¢G'VRÀ —F–6´Ö&´ÆVæwFƒ¢À —¦W&ôÆ–æUv–GFƒ¢À —¦W&ôÆ–æT6öÆ÷#¢w&v&ƒÃÃÃã#R’rÀ —¦W&ôÆ–æT&÷&FW$F6ƒ¢µÒÀ —¦W&ôÆ–æT&÷&FW$F6„öfg6WC¢ãÀ –öfg6WDw&–DÆ–æW3¢fÇ6RÀ –&÷&FW$F6ƒ¢µÒÀ –&÷&FW$F6„öfg6WC¢ã  —ÒÀ  ’òò66ÆRÆ&VÀ —66ÆTÆ&VÃ¢° ’òòF—7Æ’&÷W'G –F—7Æ“¢fÇ6RÀ  ’òò7GVÂÆ&VÀ –Æ&VÅ7G&–æs¢rrÀ  ’òòF÷ö&÷GFöÒFF–æp —FF–æs¢° —F÷¢BÀ –&÷GFöÓ¢@ —Ð —ÒÀ  ’òòÆ&VÂ6WGF–æw0 —F–6·3¢° –&Vv–äE¦W&ó¢fÇ6RÀ –Ö–å&÷FF–öã¢À –Ö…&÷FF–öã¢SÀ –Ö—'&÷#¢fÇ6RÀ —FF–æs¢À —&WfW'6S¢fÇ6RÀ –F—7Æ“¢G'VRÀ –WFõ6¶—¢G'VRÀ –WFõ6¶—FF–æs¢À –Æ&VÄöfg6WC¢À ’òòvR72F‡&÷Vv‚'&—2Fò&R&VæFW&VB2×VÇF–Æ–æRÆ&VÇ2ÂvR6öçfW'B÷F†W'2Fò7G&–æw2†W&Rà –6ÆÆ&6³¢6÷&U÷F–6·2æf÷&ÖGFW'2çfÇVW2À –Ö–æ÷#¢·ÒÀ –Ö¦÷#¢·Ð —Ð§Ò“° ¢ò¢¢&WGW&ç2æWr'&’6öçF–æ–ærçVÔ—FV×2g&öÒ'"¢ð¦gVæ7F–öâ6×ÆR†'"ÂçVÔ—FV×2’° —f"&W7VÇBÒµÓ° —f"–æ7&VÖVçBÒ'"æÆVæwF‚òçVÔ—FV×3° —f"’Ò° —f"ÆVâÒ'"æÆVæwFƒ°  –f÷"ƒ²’ÂÆVã²’³Ò–æ7&VÖVçB’° —&W7VÇBçW6‚†'%´ÖF‚æfÆö÷"†’•Ò“° —Ð —&WGW&â&W7VÇC°§Ð ¦gVæ7F–öâvWE—†VÄf÷$w&–DÆ–æR‡66ÆRÂ–æFW‚Âöfg6WDw&–DÆ–æW2’° —f"ÆVæwF‚Ò66ÆRævWEF–6·2‚’æÆVæwFƒ° —f"fÆ–D–æFW‚ÒÖF‚æÖ–â†–æFW‚ÂÆVæwF‚Ò“° —f"Æ–æUfÇVRÒ66ÆRævWE—†VÄf÷%F–6²‡fÆ–D–æFW‚“° —f"7F'BÒ66ÆRå÷7F'E—†VÃ° —f"VæBÒ66ÆRåöVæE—†VÃ° —f"W6–ÆöâÒRÓc²òòRÓb—2Ö&v–â–â—†VÇ2f÷"67V×VÆFVBW'&÷"à —f"öfg6WC°  ––b†öfg6WDw&–DÆ–æW2’° ––b†ÆVæwF‚ÓÓÒ’° –öfg6WBÒÖF‚æÖ‚†Æ–æUfÇVRÒ7F'BÂVæBÒÆ–æUfÇVR“° —ÒVÇ6R–b†–æFW‚ÓÓÒ’° –öfg6WBÒ‡66ÆRævWE—†VÄf÷%F–6²ƒ’ÒÆ–æUfÇVR’ò#° —ÒVÇ6R° –öfg6WBÒ†Æ–æUfÇVRÒ66ÆRævWE—†VÄf÷%F–6²‡fÆ–D–æFW‚Ò’’ò#° —Ð –Æ–æUfÇVR³ÒfÆ–D–æFW‚Â–æFW‚òöfg6WB¢Ööfg6WC°  ’òò&WGW&âVæFVf–æVB–bF†R—†VÂ—2÷WBöbF†R&ævP ––b†Æ–æUfÇVRÂ7F'BÒW6–ÆöâÇÂÆ–æUfÇVRâVæB²W6–Æöâ’° —&WGW&ã° —Ð —Ð —&WGW&âÆ–æUfÇVS°§Ð ¦gVæ7F–öâv&&vT6öÆÆV7B†66†W2ÂÆVæwF‚’° –†VÇW'2CæV6‚†66†W2ÂgVæ7F–öâ†66†R’° —f"v2Ò66†Ræv3° —f"v4ÆVâÒv2æÆVæwF‚ò#° —f"“° ––b†v4ÆVââÆVæwF‚’° –f÷"†’Ò²’Âv4ÆVã²²¶’’° –FVÆWFR66†RæFF¶v5¶•ÕÓ° —Ð –v2ç7Æ–6RƒÂv4ÆVâ“° —Ð —Ò“°§Ð ¢ò¢ ¢¢&WGW&ç2·v–GF‚Â†V–v‡BÂöfg6WGÒö&¦V7G2f÷"F†Rf—'7BÂÆ7BÂv–FW7BÂ†–v†W7BF–6°¢¢Æ&VÇ2v†W&Röfg6WB–æF–6FW2F†Ræ6†÷"ö–çBöfg6WBg&öÒF†RF÷–â—†VÇ2à¢¢ð¦gVæ7F–öâ6ö×WFTÆ&VÅ6—¦W2†7G‚ÂF–6´föçG2ÂF–6·2Â66†W2’° —f"ÆVæwF‚ÒF–6·2æÆVæwFƒ° —f"v–GF‡2ÒµÓ° —f"†V–v‡G2ÒµÓ° —f"öfg6WG2ÒµÓ° —f"’Â¢Â¦ÆVâÂÆ&VÂÂF–6´föçBÂföçE7G&–ærÂ66†RÂÆ–æT†V–v‡BÂv–GF‚Â†V–v‡BÂæW7FVDÆ&VÂÂv–FW7BÂ†–v†W7C°  –f÷"†’Ò²’ÂÆVæwFƒ²²¶’’° –Æ&VÂÒF–6·5¶•ÒæÆ&VÃ° —F–6´föçBÒF–6·5¶•ÒæÖ¦÷"òF–6´föçG2æÖ¦÷"¢F–6´föçG2æÖ–æ÷#° –7G‚æföçBÒföçE7G&–ærÒF–6´föçBç7G&–æs° –66†RÒ66†W5¶föçE7G&–æuÒÒ66†W5¶föçE7G&–æuÒÇÂ¶FF¢·ÒÂv3¢µ×Ó° –Æ–æT†V–v‡BÒF–6´föçBæÆ–æT†V–v‡C° —v–GF‚Ò†V–v‡BÒ° ’òòVæFVf–æVBÆ&VÇ2æB'&—26†÷VÆBæ÷B&RÖV7W&V@ ––b‚—4çVÆÄ÷%VæFVb†Æ&VÂ’bb—4'&’†Æ&VÂ’’° —v–GF‚Ò†VÇW'2CæÖV7W&UFW‡B†7G‚Â66†RæFFÂ66†Ræv2Âv–GF‚ÂÆ&VÂ“° –†V–v‡BÒÆ–æT†V–v‡C° —ÒVÇ6R–b†—4'&’†Æ&VÂ’’° ’òò–b—B—2â'&’ÆWBw2ÖV7W&RV6‚VÆVÖVç@ –f÷"†¢ÒÂ¦ÆVâÒÆ&VÂæÆVæwFƒ²¢Â¦ÆVã²²¶¢’° –æW7FVDÆ&VÂÒÆ&VÅ¶¥Ó° ’òòVæFVf–æVBÆ&VÇ2æB'&—26†÷VÆBæ÷B&RÖV7W&V@ ––b‚—4çVÆÄ÷%VæFVb†æW7FVDÆ&VÂ’bb—4'&’†æW7FVDÆ&VÂ’’° —v–GF‚Ò†VÇW'2CæÖV7W&UFW‡B†7G‚Â66†RæFFÂ66†Ræv2Âv–GF‚ÂæW7FVDÆ&VÂ“° –†V–v‡B³ÒÆ–æT†V–v‡C° —Ð —Ð —Ð —v–GF‡2çW6‚‡v–GF‚“° –†V–v‡G2çW6‚††V–v‡B“° –öfg6WG2çW6‚†Æ–æT†V–v‡Bò"“° —Ð –v&&vT6öÆÆV7B†66†W2ÂÆVæwF‚“°  —v–FW7BÒv–GF‡2æ–æFW„öb„ÖF‚æÖ‚æÇ’†çVÆÂÂv–GF‡2’“° –†–v†W7BÒ†V–v‡G2æ–æFW„öb„ÖF‚æÖ‚æÇ’†çVÆÂÂ†V–v‡G2’“°  –gVæ7F–öâfÇVTB†–G‚’° —&WGW&â° —v–GFƒ¢v–GF‡5¶–G…ÒÇÂÀ –†V–v‡C¢†V–v‡G5¶–G…ÒÇÂÀ –öfg6WC¢öfg6WG5¶–G…ÒÇÂ  —Ó° —Ð  —&WGW&â° –f—'7C¢fÇVTBƒ’À –Æ7C¢fÇVTB†ÆVæwF‚Ò’À —v–FW7C¢fÇVTB‡v–FW7B’À –†–v†W7C¢fÇVTB††–v†W7B —Ó°§Ð ¦gVæ7F–öâvWEF–6´Ö&´ÆVæwF‚†÷F–öç2’° —&WGW&â÷F–öç2æG&uF–6·2ò÷F–öç2çF–6´Ö&´ÆVæwF‚¢°§Ð ¦gVæ7F–öâvWE66ÆTÆ&VÄ†V–v‡B†÷F–öç2’° —f"föçBÂFF–æs°  ––b‚÷F–öç2æF—7Æ’’° —&WGW&â° —Ð  –föçBÒ†VÇW'2Cæ÷F–öç2å÷'6TföçB†÷F–öç2“° —FF–ærÒ†VÇW'2Cæ÷F–öç2çFõFF–ær†÷F–öç2çFF–ær“°  —&WGW&âföçBæÆ–æT†V–v‡B²FF–æræ†V–v‡C°§Ð ¦gVæ7F–öâ'6TföçD÷F–öç2†÷F–öç2ÂæW7FVD÷G2’° —&WGW&â†VÇW'2CæW‡FVæB††VÇW'2Cæ÷F–öç2å÷'6TföçB‡° –föçDfÖ–Ç“¢fÇVT÷$FVfVÇBF†æW7FVD÷G2æföçDfÖ–Ç’Â÷F–öç2æföçDfÖ–Ç’’À –föçE6—¦S¢fÇVT÷$FVfVÇBF†æW7FVD÷G2æföçE6—¦RÂ÷F–öç2æföçE6—¦R’À –föçE7G–ÆS¢fÇVT÷$FVfVÇBF†æW7FVD÷G2æföçE7G–ÆRÂ÷F–öç2æföçE7G–ÆR’À –Æ–æT†V–v‡C¢fÇVT÷$FVfVÇBF†æW7FVD÷G2æÆ–æT†V–v‡BÂ÷F–öç2æÆ–æT†V–v‡B —Ò’Â° –6öÆ÷#¢†VÇW'2Cæ÷F–öç2ç&W6öÇfR…¶æW7FVD÷G2æföçD6öÆ÷"Â÷F–öç2æföçD6öÆ÷"Â6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇDföçD6öÆ÷%Ò —Ò“°§Ð ¦gVæ7F–öâ'6UF–6´föçD÷F–öç2†÷F–öç2’° —f"Ö–æ÷"Ò'6TföçD÷F–öç2†÷F–öç2Â÷F–öç2æÖ–æ÷"“° —f"Ö¦÷"Ò÷F–öç2æÖ¦÷"æVæ&ÆVBò'6TföçD÷F–öç2†÷F–öç2Â÷F–öç2æÖ¦÷"’¢Ö–æ÷#°  —&WGW&â¶Ö–æ÷#¢Ö–æ÷"ÂÖ¦÷#¢Ö¦÷'Ó°§Ð ¦gVæ7F–öâæöå6¶—VB‡F–6·5Fôf–ÇFW"’° —f"f–ÇFW&VBÒµÓ° —f"—FVÒÂ–æFW‚ÂÆVã° –f÷"†–æFW‚ÒÂÆVâÒF–6·5Fôf–ÇFW"æÆVæwFƒ²–æFW‚ÂÆVã²²¶–æFW‚’° –—FVÒÒF–6·5Fôf–ÇFW%¶–æFW…Ó° ––b‡G—Vöb—FVÒåö–æFW‚ÓÒwVæFVf–æVBr’° –f–ÇFW&VBçW6‚†—FVÒ“° —Ð —Ð —&WGW&âf–ÇFW&VC°§Ð ¦gVæ7F–öâvWDWfVå76–ær†'"’° —f"ÆVâÒ'"æÆVæwFƒ° —f"’ÂF–fc°  ––b†ÆVâÂ"’° —&WGW&âfÇ6S° —Ð  –f÷"†F–fbÒ'%³ÒÂ’Ò²’ÂÆVã²²¶’’° ––b†'%¶•ÒÒ'%¶’ÒÒÓÒF–fb’° —&WGW&âfÇ6S° —Ð —Ð —&WGW&âF–fc°§Ð ¦gVæ7F–öâ6Æ7VÆFU76–ær†Ö¦÷$–æF–6W2ÂF–6·2Â†—4ÆVæwF‚ÂF–6·4Æ–Ö—B’° —f"WfVäÖ¦÷%76–ærÒvWDWfVå76–ær†Ö¦÷$–æF–6W2“° —f"76–ærÒ‡F–6·2æÆVæwF‚Ò’òF–6·4Æ–Ö—C° —f"f7F÷'2Âf7F÷"Â’Â–ÆVã°  ’òò–bF†RÖ¦÷"F–6·2&RWfVæÇ’76VB'BÂÆ6RF†RÖ–æ÷"F–6·0 ’òò6òF†BF†W’F—f–FRF†RÖ¦÷"F–6·2–çFòWfVâ6‡Væ·0 ––b‚WfVäÖ¦÷%76–ær’° —&WGW&âÖF‚æÖ‚‡76–ærÂ“° —Ð  –f7F÷'2Ò†VÇW'2CæÖF‚åöf7F÷&—¦R†WfVäÖ¦÷%76–ær“° –f÷"†’ÒÂ–ÆVâÒf7F÷'2æÆVæwF‚Ò²’Â–ÆVã²’²²’° –f7F÷"Òf7F÷'5¶•Ó° ––b†f7F÷"â76–ær’° —&WGW&âf7F÷#° —Ð —Ð —&WGW&âÖF‚æÖ‚‡76–ærÂ“°§Ð ¦gVæ7F–öâvWDÖ¦÷$–æF–6W2‡F–6·2’° —f"&W7VÇBÒµÓ° —f"’Â–ÆVã° –f÷"†’ÒÂ–ÆVâÒF–6·2æÆVæwFƒ²’Â–ÆVã²’²²’° ––b‡F–6·5¶•ÒæÖ¦÷"’° —&W7VÇBçW6‚†’“° —Ð —Ð —&WGW&â&W7VÇC°§Ð ¦gVæ7F–öâ6¶—Ö¦÷'2‡F–6·2ÂÖ¦÷$–æF–6W2Â76–ær’° —f"6÷VçBÒ° —f"æW‡BÒÖ¦÷$–æF–6W5³Ó° —f"’ÂF–6³°  —76–ærÒÖF‚æ6V–Â‡76–ær“° –f÷"†’Ò²’ÂF–6·2æÆVæwFƒ²’²²’° —F–6²ÒF–6·5¶•Ó° ––b†’ÓÓÒæW‡B’° —F–6²åö–æFW‚Ò“° –6÷VçB²³° –æW‡BÒÖ¦÷$–æF–6W5¶6÷VçB¢76–æuÓ° —ÒVÇ6R° –FVÆWFRF–6²æÆ&VÃ° —Ð —Ð§Ð ¦gVæ7F–öâ6¶—‡F–6·2Â76–ærÂÖ¦÷%7F'BÂÖ¦÷$VæB’° —f"7F'BÒfÇVT÷$FVfVÇBF†Ö¦÷%7F'BÂ“° —f"VæBÒÖF‚æÖ–â‡fÇVT÷$FVfVÇBF†Ö¦÷$VæBÂF–6·2æÆVæwF‚’ÂF–6·2æÆVæwF‚“° —f"6÷VçBÒ° —f"ÆVæwF‚Â’ÂF–6²ÂæW‡C°  —76–ærÒÖF‚æ6V–Â‡76–ær“° ––b†Ö¦÷$VæB’° –ÆVæwF‚ÒÖ¦÷$VæBÒÖ¦÷%7F'C° —76–ærÒÆVæwF‚òÖF‚æfÆö÷"†ÆVæwF‚ò76–ær“° —Ð  –æW‡BÒ7F'C°  —v†–ÆR†æW‡BÂ’° –6÷VçB²³° –æW‡BÒÖF‚ç&÷VæB‡7F'B²6÷VçB¢76–ær“° —Ð  –f÷"†’ÒÖF‚æÖ‚‡7F'BÂ“²’ÂVæC²’²²’° —F–6²ÒF–6·5¶•Ó° ––b†’ÓÓÒæW‡B’° —F–6²åö–æFW‚Ò“° –6÷VçB²³° –æW‡BÒÖF‚ç&÷VæB‡7F'B²6÷VçB¢76–ær“° —ÒVÇ6R° –FVÆWFRF–6²æÆ&VÃ° —Ð —Ð§Ð §f"66ÆRÒ6÷&UöVÆVÖVçBæW‡FVæB‡°  —¦W&ôÆ–æT–æFWƒ¢À  ’ò¢  ’¢vWBF†RFF–æræVVFVBf÷"F†R66ÆP ’¢ÖWF†öBvWEFF–æp ’¢&—fFP ’¢&WGW&ç2µFF–æwÒF†RæV6W76'’FF–æp ’¢ð –vWEFF–æs¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —&WGW&â° –ÆVgC¢ÖRçFF–ætÆVgBÇÂÀ —F÷¢ÖRçFF–æuF÷ÇÂÀ —&–v‡C¢ÖRçFF–æu&–v‡BÇÂÀ –&÷GFöÓ¢ÖRçFF–æt&÷GFöÒÇÂ  —Ó° —ÒÀ  ’ò¢  ’¢&WGW&ç2F†R66ÆRF–6²ö&¦V7G2‡¶Æ&VÂÂÖ¦÷'Ò ’¢6–æ6R"ãp ’¢ð –vWEF–6·3¢gVæ7F–öâ‚’° —&WGW&âF†—2å÷F–6·3° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWDÆ&VÇ3¢gVæ7F–öâ‚’° —f"FFÒF†—2æ6†'BæFF° —&WGW&âF†—2æ÷F–öç2æÆ&VÇ2ÇÂ‡F†—2æ—4†÷&—¦öçFÂ‚’òFFç„Æ&VÇ2¢FFç”Æ&VÇ2’ÇÂFFæÆ&VÇ2ÇÂµÓ° —ÒÀ  ’òòF†W6RÖWF†öG2&R÷&FW&VB'’Æ–fV7–ÆRâWF–Æ—F–W2F†VâföÆÆ÷rà ’òòç’gVæ7F–öâFVf–æVB†W&R—2–æ†W&—FVB'’ÆÂ66ÆRG—W2à ’òòç’gVæ7F–öâ6â&RW‡FVæFVB'’F†R66ÆRG—P  ’ò¢  ’¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&P ’¢gVæ7F–öâ6†'Bå66ÆRæÖW&vUF–6·4÷F–öç0 ’¢FW&V6FVB6–æ6RfW'6–öâ"ã‚ã  ’¢FöFò&VÖ÷fRBfW'6–öâ0 ’¢ð –ÖW&vUF–6·4÷F–öç3¢gVæ7F–öâ‚’° ’òòæö÷  —ÒÀ  –&Vf÷&UWFFS¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2æ&Vf÷&UWFFRÂ·F†—5Ò“° —ÒÀ  ’ò¢  ’¢&Ò¶çVÖ&W'ÒÖ…v–GF‚ÒF†RÖ‚v–GF‚–â—†VÇ0 ’¢&Ò¶çVÖ&W'ÒÖ„†V–v‡BÒF†RÖ‚†V–v‡B–â—†VÇ0 ’¢&Ò¶ö&¦V7GÒÖ&v–ç2ÒF†R76R&WGvVVâF†RVFvRöbF†R÷F†W"66ÆW2æBVFvRöbF†R6†'@ ’¢F†—276R6öÖW2g&öÒGvò6÷W&6W3  ’¢ÒFF–ærÒ76RF†Bw2&WV—&VBFò6†÷rF†RÆ&VÇ2BF†RVFvW2öbF†R66ÆP ’¢ÒF†–6¶æW72öb66ÆW2÷"ÆVvVæG2–âæ÷F†W"÷&–VçFF–öà ’¢ð —WFFS¢gVæ7F–öâ†Ö…v–GF‚ÂÖ„†V–v‡BÂÖ&v–ç2’° —f"ÖRÒF†—3° —f"F–6´÷G2ÒÖRæ÷F–öç2çF–6·3° —f"6×ÆU6—¦RÒF–6´÷G2ç6×ÆU6—¦S° —f"’Â–ÆVâÂÆ&VÇ2ÂF–6·2Â6×Æ–ætVæ&ÆVC°  ’òòWFFRÆ–fV7–6ÆRÒ&ö&&Ç’FöâwBvçBFòWfW"W‡FVæB÷"÷fW'w&—FRF†—2gVæ7F–öâ² –ÖRæ&Vf÷&UWFFR‚“°  ’òò'6÷&"F†RÖ7FW"ÖV7W&VÖVçG0 –ÖRæÖ…v–GF‚ÒÖ…v–GFƒ° –ÖRæÖ„†V–v‡BÒÖ„†V–v‡C° –ÖRæÖ&v–ç2Ò†VÇW'2CæW‡FVæB‡° –ÆVgC¢À —&–v‡C¢À —F÷¢À –&÷GFöÓ¢  —ÒÂÖ&v–ç2“°  –ÖRå÷F–6·2ÒçVÆÃ° –ÖRçF–6·2ÒçVÆÃ° –ÖRåöÆ&VÅ6—¦W2ÒçVÆÃ° –ÖRåöÖ„Æ&VÄÆ–æW2Ò° –ÖRæÆöævW7DÆ&VÅv–GF‚Ò° –ÖRæÆöævW7EFW‡D66†RÒÖRæÆöævW7EFW‡D66†RÇÂ·Ó° –ÖRåöw&–DÆ–æT—FV×2ÒçVÆÃ° –ÖRåöÆ&VÄ—FV×2ÒçVÆÃ°  ’òòF–ÖVç6–öç0 –ÖRæ&Vf÷&U6WDF–ÖVç6–öç2‚“° –ÖRç6WDF–ÖVç6–öç2‚“° –ÖRægFW%6WDF–ÖVç6–öç2‚“°  ’òòFFÖ–âöÖ€ –ÖRæ&Vf÷&TFFÆ–Ö—G2‚“° –ÖRæFWFW&Ö–æTFFÆ–Ö—G2‚“° –ÖRægFW$FFÆ–Ö—G2‚“°  ’òòF–6·2ÒF†—2çF–6·6—2æ÷rDU$T4DTB ’òò–çFW&æÂF–6·2&Ræ÷r7F÷&VB2ö&¦V7G2–âF†R$•dDRF†—2å÷F–6·6ÖVÖ&W  ’òòæB×W7Bæ÷B&R66W76VBF—&V7FÇ’g&öÒ÷WG6–FRF†—26Æ72âF†—2çF–6·6&V–æp ’òò&÷VæBf÷"ÆöærF–ÖRæBæ÷BÖ&¶VB2&—fFRÂvR6âwB6†ævR—G27G'V7GW&P ’òòv—F†÷WBVæW‡V7FVB'&V¶–ær6†ævW2â–b–÷RæVVBFò66W72F†R66ÆRF–6·2À ’òòW6R66ÆRævWEF–6·2‚’–ç7FVBà  –ÖRæ&Vf÷&T'V–ÆEF–6·2‚“°  ’òòæWr–×ÆVÖVçFF–öç26†÷VÆB&WGW&ââ'&’öbö&¦V7G2'WBf÷"$4µt$B4ôÕBÀ ’òòvR7F–ÆÂ7W÷'Bæò&WGW&â†F†—2çF–6·6–çFW&æÆÇ’6WB'’6ÆÆ–ærF†—2ÖWF†öB’à —F–6·2ÒÖRæ'V–ÆEF–6·2‚’ÇÂµÓ°  ’òòÆÆ÷rÖöF–f–6F–öâöbF–6·2–â6ÆÆ&6²à —F–6·2ÒÖRægFW$'V–ÆEF–6·2‡F–6·2’ÇÂF–6·3°  ’òòVç7W&RF–6·26öçF–ç2F–6·2–âæWrF–6²f÷&Ö@ ––b‚‚F–6·2ÇÂF–6·2æÆVæwF‚’bbÖRçF–6·2’° —F–6·2ÒµÓ° –f÷"†’ÒÂ–ÆVâÒÖRçF–6·2æÆVæwFƒ²’Â–ÆVã²²¶’’° —F–6·2çW6‚‡° —fÇVS¢ÖRçF–6·5¶•ÒÀ –Ö¦÷#¢fÇ6P —Ò“° —Ð —Ð  –ÖRå÷F–6·2ÒF–6·3°  ’òò6ö×WFRF–6²&÷FF–öâæBf—BW6–ær6×ÆVB7V'6WBöbÆ&VÇ0 ’òòvRvVæW&ÆÇ’FöâwBæVVBFò6ö×WFRF†R6—¦RöbWfW'’6–ævÆRÆ&VÂf÷"FWFW&Ö–æ–ær66ÆR6—¦P —6×Æ–ætVæ&ÆVBÒ6×ÆU6—¦RÂF–6·2æÆVæwFƒ° –Æ&VÇ2ÒÖRåö6öçfW'EF–6·5FôÆ&VÇ2‡6×Æ–ætVæ&ÆVBò6×ÆR‡F–6·2Â6×ÆU6—¦R’¢F–6·2“°  ’òòö6öæf–wW&R—26ÆÆVBGv–6RÂöæ6R†W&RÂöæ6Rg&öÒ6÷&Ræ6öçG&öÆÆW"çWFFTÆ–÷WBà ’òò†W&RvR†fVâwB&VVâ÷6—F–öæVB–WBÂ'WBF–ÖVç6–öç2&R6÷'&V7Bà ’òòf&–&ÆW26WB–âö6öæf–wW&R&RæVVFVBf÷"6Æ7VÆFUF–6µ&÷FF–öâÂæ@ ’òò—Bw2ö²F†B6ö÷&F–æFW2&Ræ÷B6÷'&V7BF†W&RÂöæÇ’F–ÖVç6–öç2ÖGFW"à –ÖRåö6öæf–wW&R‚“°  ’òòF–6²&÷FF–öà –ÖRæ&Vf÷&T6Æ7VÆFUF–6µ&÷FF–öâ‚“° –ÖRæ6Æ7VÆFUF–6µ&÷FF–öâ‚“° –ÖRægFW$6Æ7VÆFUF–6µ&÷FF–öâ‚“°  –ÖRæ&Vf÷&Tf—B‚“° –ÖRæf—B‚“° –ÖRægFW$f—B‚“°  ’òòWFò×6¶—  –ÖRå÷F–6·5FôG&rÒF–6´÷G2æF—7Æ’bb‡F–6´÷G2æWFõ6¶—ÇÂF–6´÷G2ç6÷W&6RÓÓÒvWFòr’òÖRåöWFõ6¶—‡F–6·2’¢F–6·3°  ––b‡6×Æ–ætVæ&ÆVB’° ’òòvVæW&FRÆ&VÇ2W6–ærÆÂæöâ×6¶—VBF–6·0 –Æ&VÇ2ÒÖRåö6öçfW'EF–6·5FôÆ&VÇ2†ÖRå÷F–6·5FôG&r“° —Ð  –ÖRçF–6·2ÒÆ&VÇ3²òò$4µt$B4ôÕD”$”Ä•E  ’òò”Õõ%DåC¢gFW"F†—2ö–çBÂvR6öç6–FW"F†BF†—2çF–6·6v–ÆÂäUdU"6†ævR  –ÖRægFW%WFFR‚“°  ’òòDôDò‡c2“¢&VÖ÷fRÖ–å6—¦R2V&Æ–2&÷W'G’æB&WGW&âfÇVRg&öÒÆÂÆ–÷WB&÷†W2â—B—2VçW6V@ ’òòÖ¶RÖ…v–GF‚æBÖ„†V–v‡B&—fFP —&WGW&âÖRæÖ–å6—¦S° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •ö6öæf–wW&S¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"&WfW'6U—†VÇ2ÒÖRæ÷F–öç2çF–6·2ç&WfW'6S° —f"7F'E—†VÂÂVæE—†VÃ°  ––b†ÖRæ—4†÷&—¦öçFÂ‚’’° —7F'E—†VÂÒÖRæÆVgC° –VæE—†VÂÒÖRç&–v‡C° —ÒVÇ6R° —7F'E—†VÂÒÖRçF÷° –VæE—†VÂÒÖRæ&÷GFöÓ° ’òò'’FVfVÇBfW'F–6Â66ÆW2&Rg&öÒ&÷GFöÒFòF÷Â6ò—†VÇ2&R&WfW'6V@ —&WfW'6U—†VÇ2Ò&WfW'6U—†VÇ3° —Ð –ÖRå÷7F'E—†VÂÒ7F'E—†VÃ° –ÖRåöVæE—†VÂÒVæE—†VÃ° –ÖRå÷&WfW'6U—†VÇ2Ò&WfW'6U—†VÇ3° –ÖRåöÆVæwF‚ÒVæE—†VÂÒ7F'E—†VÃ° —ÒÀ  –gFW%WFFS¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2ægFW%WFFRÂ·F†—5Ò“° —ÒÀ  ’òð  –&Vf÷&U6WDF–ÖVç6–öç3¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2æ&Vf÷&U6WDF–ÖVç6–öç2Â·F†—5Ò“° —ÒÀ —6WDF–ÖVç6–öç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° ’òò6WBF†RVæ6öç7G&–æVBF–ÖVç6–öâ&Vf÷&RÆ&VÂ&÷FF–öà ––b†ÖRæ—4†÷&—¦öçFÂ‚’’° ’òò&W6WB÷6—F–öâ&Vf÷&R6Æ7VÆF–ær&÷FF–öà –ÖRçv–GF‚ÒÖRæÖ…v–GFƒ° –ÖRæÆVgBÒ° –ÖRç&–v‡BÒÖRçv–GFƒ° —ÒVÇ6R° –ÖRæ†V–v‡BÒÖRæÖ„†V–v‡C°  ’òò&W6WB÷6—F–öâ&Vf÷&R6Æ7VÆF–ær&÷FF–öà –ÖRçF÷Ò° –ÖRæ&÷GFöÒÒÖRæ†V–v‡C° —Ð  ’òò&W6WBFF–æp –ÖRçFF–ætÆVgBÒ° –ÖRçFF–æuF÷Ò° –ÖRçFF–æu&–v‡BÒ° –ÖRçFF–æt&÷GFöÒÒ° —ÒÀ –gFW%6WDF–ÖVç6–öç3¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2ægFW%6WDF–ÖVç6–öç2Â·F†—5Ò“° —ÒÀ  ’òòFFÆ–Ö—G0 –&Vf÷&TFFÆ–Ö—G3¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2æ&Vf÷&TFFÆ–Ö—G2Â·F†—5Ò“° —ÒÀ –FWFW&Ö–æTFFÆ–Ö—G3¢†VÇW'2Cææö÷À –gFW$FFÆ–Ö—G3¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2ægFW$FFÆ–Ö—G2Â·F†—5Ò“° —ÒÀ  ’òð –&Vf÷&T'V–ÆEF–6·3¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2æ&Vf÷&T'V–ÆEF–6·2Â·F†—5Ò“° —ÒÀ –'V–ÆEF–6·3¢†VÇW'2Cææö÷À –gFW$'V–ÆEF–6·3¢gVæ7F–öâ‡F–6·2’° —f"ÖRÒF†—3° ’òòF–6·2—2V×G’f÷"öÆB†—2–×ÆVÖVçFF–öç2†W&P ––b†—4'&’‡F–6·2’bbF–6·2æÆVæwF‚’° —&WGW&â†VÇW'2Cæ6ÆÆ&6²†ÖRæ÷F–öç2ægFW$'V–ÆEF–6·2Â¶ÖRÂF–6·5Ò“° —Ð ’òò7W÷'BöÆB–×ÆVÖVçFF–öç2‡F†BÖöF–f–VBF†—2çF–6·6F—&V7FÇ’–â'V–ÆEF–6·2 –ÖRçF–6·2Ò†VÇW'2Cæ6ÆÆ&6²†ÖRæ÷F–öç2ægFW$'V–ÆEF–6·2Â¶ÖRÂÖRçF–6·5Ò’ÇÂÖRçF–6·3° —&WGW&âF–6·3° —ÒÀ  –&Vf÷&UF–6µFôÆ&VÄ6öçfW'6–öã¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2æ&Vf÷&UF–6µFôÆ&VÄ6öçfW'6–öâÂ·F†—5Ò“° —ÒÀ –6öçfW'EF–6·5FôÆ&VÇ3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° ’òò6öçfW'BF–6·2Fò7G&–æw0 —f"F–6´÷G2ÒÖRæ÷F–öç2çF–6·3° –ÖRçF–6·2ÒÖRçF–6·2æÖ‡F–6´÷G2çW6W$6ÆÆ&6²ÇÂF–6´÷G2æ6ÆÆ&6²ÂF†—2“° —ÒÀ –gFW%F–6µFôÆ&VÄ6öçfW'6–öã¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2ægFW%F–6µFôÆ&VÄ6öçfW'6–öâÂ·F†—5Ò“° —ÒÀ  ’òð  –&Vf÷&T6Æ7VÆFUF–6µ&÷FF–öã¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2æ&Vf÷&T6Æ7VÆFUF–6µ&÷FF–öâÂ·F†—5Ò“° —ÒÀ –6Æ7VÆFUF–6µ&÷FF–öã¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"F–6´÷G2Ò÷F–öç2çF–6·3° —f"çVÕF–6·2ÒÖRævWEF–6·2‚’æÆVæwFƒ° —f"Ö–å&÷FF–öâÒF–6´÷G2æÖ–å&÷FF–öâÇÂ° —f"Ö…&÷FF–öâÒF–6´÷G2æÖ…&÷FF–öã° —f"Æ&VÅ&÷FF–öâÒÖ–å&÷FF–öã° —f"Æ&VÅ6—¦W2ÂÖ„Æ&VÅv–GF‚ÂÖ„Æ&VÄ†V–v‡BÂÖ…v–GF‚ÂF–6µv–GF‚ÂÖ„†V–v‡BÂÖ„Æ&VÄF–vöæÃ°  ––b‚ÖRåö—5f—6–&ÆR‚’ÇÂF–6´÷G2æF—7Æ’ÇÂÖ–å&÷FF–öâãÒÖ…&÷FF–öâÇÂçVÕF–6·2ÃÒÇÂÖRæ—4†÷&—¦öçFÂ‚’’° –ÖRæÆ&VÅ&÷FF–öâÒÖ–å&÷FF–öã° —&WGW&ã° —Ð  –Æ&VÅ6—¦W2ÒÖRåövWDÆ&VÅ6—¦W2‚“° –Ö„Æ&VÅv–GF‚ÒÆ&VÅ6—¦W2çv–FW7Bçv–GFƒ° –Ö„Æ&VÄ†V–v‡BÒÆ&VÅ6—¦W2æ†–v†W7Bæ†V–v‡BÒÆ&VÅ6—¦W2æ†–v†W7Bæöfg6WC°  ’òòW7F–ÖFRF†Rv–GF‚öbV6‚w&–B&6VBöâF†R6çf2v–GF‚ÂF†RÖ†–×VÐ ’òòÆ&VÂv–GF‚æBF†RçVÖ&W"öbF–6²–çFW'fÇ0 –Ö…v–GF‚ÒÖF‚æÖ–â†ÖRæÖ…v–GF‚ÂÖRæ6†'Bçv–GF‚ÒÖ„Æ&VÅv–GF‚“° —F–6µv–GF‚Ò÷F–öç2æöfg6WBòÖRæÖ…v–GF‚òçVÕF–6·2¢Ö…v–GF‚ò†çVÕF–6·2Ò“°  ’òòÆÆ÷r2—†VÇ2ƒ"FF–ærV—F†W"6–FRf÷"Æ&VÂ&VF&–Æ—G ––b†Ö„Æ&VÅv–GF‚²bâF–6µv–GF‚’° —F–6µv–GF‚ÒÖ…v–GF‚ò†çVÕF–6·2Ò†÷F–öç2æöfg6WBòãR¢’“° –Ö„†V–v‡BÒÖRæÖ„†V–v‡BÒvWEF–6´Ö&´ÆVæwF‚†÷F–öç2æw&–DÆ–æW2 ’ÒF–6´÷G2çFF–ærÒvWE66ÆTÆ&VÄ†V–v‡B†÷F–öç2ç66ÆTÆ&VÂ“° –Ö„Æ&VÄF–vöæÂÒÖF‚ç7'B†Ö„Æ&VÅv–GF‚¢Ö„Æ&VÅv–GF‚²Ö„Æ&VÄ†V–v‡B¢Ö„Æ&VÄ†V–v‡B“° –Æ&VÅ&÷FF–öâÒ†VÇW'2CçFôFVw&VW2„ÖF‚æÖ–â€ ”ÖF‚æ6–â„ÖF‚æÖ–â‚†Æ&VÅ6—¦W2æ†–v†W7Bæ†V–v‡B²b’òF–6µv–GF‚Â’’À ”ÖF‚æ6–â„ÖF‚æÖ–â†Ö„†V–v‡BòÖ„Æ&VÄF–vöæÂÂ’’ÒÖF‚æ6–â†Ö„Æ&VÄ†V–v‡BòÖ„Æ&VÄF–vöæÂ ’’“° –Æ&VÅ&÷FF–öâÒÖF‚æÖ‚†Ö–å&÷FF–öâÂÖF‚æÖ–â†Ö…&÷FF–öâÂÆ&VÅ&÷FF–öâ’“° —Ð  –ÖRæÆ&VÅ&÷FF–öâÒÆ&VÅ&÷FF–öã° —ÒÀ –gFW$6Æ7VÆFUF–6µ&÷FF–öã¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2ægFW$6Æ7VÆFUF–6µ&÷FF–öâÂ·F†—5Ò“° —ÒÀ  ’òð  –&Vf÷&Tf—C¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2æ&Vf÷&Tf—BÂ·F†—5Ò“° —ÒÀ –f—C¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° ’òò&W6W@ —f"Ö–å6—¦RÒÖRæÖ–å6—¦RÒ° —v–GFƒ¢À –†V–v‡C¢  —Ó°  —f"6†'BÒÖRæ6†'C° —f"÷G2ÒÖRæ÷F–öç3° —f"F–6´÷G2Ò÷G2çF–6·3° —f"66ÆTÆ&VÄ÷G2Ò÷G2ç66ÆTÆ&VÃ° —f"w&–DÆ–æT÷G2Ò÷G2æw&–DÆ–æW3° —f"F—7Æ’ÒÖRåö—5f—6–&ÆR‚“° —f"—4&÷GFöÒÒ÷G2ç÷6—F–öâÓÓÒv&÷GFöÒs° —f"—4†÷&—¦öçFÂÒÖRæ—4†÷&—¦öçFÂ‚“°  ’òòv–GF€ ––b†—4†÷&—¦öçFÂ’° –Ö–å6—¦Rçv–GF‚ÒÖRæÖ…v–GFƒ° —ÒVÇ6R–b†F—7Æ’’° –Ö–å6—¦Rçv–GF‚ÒvWEF–6´Ö&´ÆVæwF‚†w&–DÆ–æT÷G2’²vWE66ÆTÆ&VÄ†V–v‡B‡66ÆTÆ&VÄ÷G2“° —Ð  ’òò†V–v‡@ ––b‚—4†÷&—¦öçFÂ’° –Ö–å6—¦Ræ†V–v‡BÒÖRæÖ„†V–v‡C²òòf–ÆÂÆÂF†R†V–v‡@ —ÒVÇ6R–b†F—7Æ’’° –Ö–å6—¦Ræ†V–v‡BÒvWEF–6´Ö&´ÆVæwF‚†w&–DÆ–æT÷G2’²vWE66ÆTÆ&VÄ†V–v‡B‡66ÆTÆ&VÄ÷G2“° —Ð  ’òòFöâwB&÷F†W"f—GF–ærF†RF–6·2–bvR&Ræ÷B6†÷v–ærF†RÆ&VÇ0 ––b‡F–6´÷G2æF—7Æ’bbF—7Æ’’° —f"F–6´föçG2Ò'6UF–6´föçD÷F–öç2‡F–6´÷G2“° —f"Æ&VÅ6—¦W2ÒÖRåövWDÆ&VÅ6—¦W2‚“° —f"f—'7DÆ&VÅ6—¦RÒÆ&VÅ6—¦W2æf—'7C° —f"Æ7DÆ&VÅ6—¦RÒÆ&VÅ6—¦W2æÆ7C° —f"v–FW7DÆ&VÅ6—¦RÒÆ&VÅ6—¦W2çv–FW7C° —f"†–v†W7DÆ&VÅ6—¦RÒÆ&VÅ6—¦W2æ†–v†W7C° —f"Æ–æU76RÒF–6´föçG2æÖ–æ÷"æÆ–æT†V–v‡B¢ãC° —f"F–6µFF–ærÒF–6´÷G2çFF–æs°  ––b†—4†÷&—¦öçFÂ’° ’òò†÷&—¦öçFÂ†—2—2Ö÷&R6öç7G&–æVB'’F†R†V–v‡Bà —f"—5&÷FFVBÒÖRæÆ&VÅ&÷FF–öâÓÒ° —f"ævÆU&F–ç2Ò†VÇW'2CçFõ&F–ç2†ÖRæÆ&VÅ&÷FF–öâ“° —f"6÷5&÷FF–öâÒÖF‚æ6÷2†ævÆU&F–ç2“° —f"6–å&÷FF–öâÒÖF‚ç6–â†ævÆU&F–ç2“°  —f"Æ&VÄ†V–v‡BÒ6–å&÷FF–öâ¢v–FW7DÆ&VÅ6—¦Rçv–GF€ ’²6÷5&÷FF–öâ¢††–v†W7DÆ&VÅ6—¦Ræ†V–v‡BÒ†—5&÷FFVBò†–v†W7DÆ&VÅ6—¦Ræöfg6WB¢’ ’²†—5&÷FFVBò¢Æ–æU76R“²òòFF–æp  –Ö–å6—¦Ræ†V–v‡BÒÖF‚æÖ–â†ÖRæÖ„†V–v‡BÂÖ–å6—¦Ræ†V–v‡B²Æ&VÄ†V–v‡B²F–6µFF–ær“°  —f"öfg6WDÆVgBÒÖRævWE—†VÄf÷%F–6²ƒ’ÒÖRæÆVgC° —f"öfg6WE&–v‡BÒÖRç&–v‡BÒÖRævWE—†VÄf÷%F–6²†ÖRævWEF–6·2‚’æÆVæwF‚Ò“° —f"FF–ætÆVgBÂFF–æu&–v‡C°  ’òòVç7W&RF†B÷W"F–6·2&RÇv—2–ç6–FRF†R6çf2âv†Vâ&÷FFVBÂF–6·2&R&–v‡BÆ–væV@ ’òòv†–6‚ÖVç2F†BF†R&–v‡BFF–ær—2FöÖ–æFVB'’F†RföçB†V–v‡@ ––b†—5&÷FFVB’° —FF–ætÆVgBÒ—4&÷GFöÒð –6÷5&÷FF–öâ¢f—'7DÆ&VÅ6—¦Rçv–GF‚²6–å&÷FF–öâ¢f—'7DÆ&VÅ6—¦Ræöfg6WB  —6–å&÷FF–öâ¢†f—'7DÆ&VÅ6—¦Ræ†V–v‡BÒf—'7DÆ&VÅ6—¦Ræöfg6WB“° —FF–æu&–v‡BÒ—4&÷GFöÒð —6–å&÷FF–öâ¢†Æ7DÆ&VÅ6—¦Ræ†V–v‡BÒÆ7DÆ&VÅ6—¦Ræöfg6WB’  –6÷5&÷FF–öâ¢Æ7DÆ&VÅ6—¦Rçv–GF‚²6–å&÷FF–öâ¢Æ7DÆ&VÅ6—¦Ræöfg6WC° —ÒVÇ6R° —FF–ætÆVgBÒf—'7DÆ&VÅ6—¦Rçv–GF‚ò#° —FF–æu&–v‡BÒÆ7DÆ&VÅ6—¦Rçv–GF‚ò#° —Ð  ’òòF§W7BFF–ærF¶–ær–çFò66÷VçB6†ævW2–âöfg6WG0 ’òòæBFB2‚FòÖ÷fRv’g&öÒ6çf2VFvW0 –ÖRçFF–ætÆVgBÒÖF‚æÖ‚‚‡FF–ætÆVgBÒöfg6WDÆVgB’¢ÖRçv–GF‚ò†ÖRçv–GF‚Òöfg6WDÆVgB’Â’²3° –ÖRçFF–æu&–v‡BÒÖF‚æÖ‚‚‡FF–æu&–v‡BÒöfg6WE&–v‡B’¢ÖRçv–GF‚ò†ÖRçv–GF‚Òöfg6WE&–v‡B’Â’²3° —ÒVÇ6R° ’òòfW'F–6Â†—2—2Ö÷&R6öç7G&–æVB'’F†Rv–GF‚âÆ&VÇ2&RF†P ’òòFöÖ–æçBf7F÷"†W&RÂ6òvWBF†BÆVæwF‚f—'7BæB66÷VçBf÷"FF–æp —f"Æ&VÅv–GF‚ÒF–6´÷G2æÖ—'&÷"ò  ’òòW6RÆ–æU76Rf÷"6öç6—7FVæ7’v—F‚†÷&—¦öçFÂ†—0 ’òòF–6µFF–ær—2æ÷B–×ÆVÖVçFVBf÷"†÷&—¦öçFÀ —v–FW7DÆ&VÅ6—¦Rçv–GF‚²F–6µFF–ær²Æ–æU76S°  –Ö–å6—¦Rçv–GF‚ÒÖF‚æÖ–â†ÖRæÖ…v–GF‚ÂÖ–å6—¦Rçv–GF‚²Æ&VÅv–GF‚“°  –ÖRçFF–æuF÷Òf—'7DÆ&VÅ6—¦Ræ†V–v‡Bò#° –ÖRçFF–æt&÷GFöÒÒÆ7DÆ&VÅ6—¦Ræ†V–v‡Bò#° —Ð —Ð  –ÖRæ†æFÆTÖ&v–ç2‚“°  ––b†—4†÷&—¦öçFÂ’° –ÖRçv–GF‚ÒÖRåöÆVæwF‚Ò6†'Bçv–GF‚ÒÖRæÖ&v–ç2æÆVgBÒÖRæÖ&v–ç2ç&–v‡C° –ÖRæ†V–v‡BÒÖ–å6—¦Ræ†V–v‡C° —ÒVÇ6R° –ÖRçv–GF‚ÒÖ–å6—¦Rçv–GFƒ° –ÖRæ†V–v‡BÒÖRåöÆVæwF‚Ò6†'Bæ†V–v‡BÒÖRæÖ&v–ç2çF÷ÒÖRæÖ&v–ç2æ&÷GFöÓ° —Ð —ÒÀ  ’ò¢  ’¢†æFÆRÖ&v–ç2æBFF–ær–çFW&7F–öç0 ’¢&—fFP ’¢ð –†æFÆTÖ&v–ç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° ––b†ÖRæÖ&v–ç2’° –ÖRæÖ&v–ç2æÆVgBÒÖF‚æÖ‚†ÖRçFF–ætÆVgBÂÖRæÖ&v–ç2æÆVgB“° –ÖRæÖ&v–ç2çF÷ÒÖF‚æÖ‚†ÖRçFF–æuF÷ÂÖRæÖ&v–ç2çF÷“° –ÖRæÖ&v–ç2ç&–v‡BÒÖF‚æÖ‚†ÖRçFF–æu&–v‡BÂÖRæÖ&v–ç2ç&–v‡B“° –ÖRæÖ&v–ç2æ&÷GFöÒÒÖF‚æÖ‚†ÖRçFF–æt&÷GFöÒÂÖRæÖ&v–ç2æ&÷GFöÒ“° —Ð —ÒÀ  –gFW$f—C¢gVæ7F–öâ‚’° –†VÇW'2Cæ6ÆÆ&6²‡F†—2æ÷F–öç2ægFW$f—BÂ·F†—5Ò“° —ÒÀ  ’òò6†&VBÖWF†öG0 –—4†÷&—¦öçFÃ¢gVæ7F–öâ‚’° —f"÷2ÒF†—2æ÷F–öç2ç÷6—F–öã° —&WGW&â÷2ÓÓÒwF÷rÇÂ÷2ÓÓÒv&÷GFöÒs° —ÒÀ –—4gVÆÅv–GFƒ¢gVæ7F–öâ‚’° —&WGW&âF†—2æ÷F–öç2ægVÆÅv–GFƒ° —ÒÀ  ’òòvWBF†R6÷'&V7BfÇVRâæâ&B–çWG2Â–bF†RfÇVRG—R—2ö&¦V7BvWBF†R‚÷"’&6VBöâv†WF†W"vR&R†÷&—¦öçFÂ÷"æ÷@ –vWE&–v‡EfÇVS¢gVæ7F–öâ‡&ufÇVR’° ’òòçVÆÂæBVæFVf–æVBfÇVW2f—'7@ ––b†—4çVÆÄ÷%VæFVb‡&ufÇVR’’° —&WGW&âæã° —Ð ’òò—4æâ†ö&¦V7B’&WGW&ç2G'VRÂ6òÖ¶R7W&Ræâ—26†V6¶–ærf÷"çVÖ&W#²F—66&B–æf–æ—FRfÇVW0 ––b‚‡G—Vöb&ufÇVRÓÓÒvçVÖ&W"rÇÂ&ufÇVR–ç7Fæ6VöbçVÖ&W"’bb—4f–æ—FR‡&ufÇVR’’° —&WGW&âæã° —Ð  ’òò–b—B—2–âf7Bâö&¦V7BÂF—fR–âöæRÖ÷&RÆWfVÀ ––b‡&ufÇVR’° ––b‡F†—2æ—4†÷&—¦öçFÂ‚’’° ––b‡&ufÇVRç‚ÓÒVæFVf–æVB’° —&WGW&âF†—2ævWE&–v‡EfÇVR‡&ufÇVRç‚“° —Ð —ÒVÇ6R–b‡&ufÇVRç’ÓÒVæFVf–æVB’° —&WGW&âF†—2ævWE&–v‡EfÇVR‡&ufÇVRç’“° —Ð —Ð  ’òòfÇVR—2vööBÂ&WGW&â—@ —&WGW&â&ufÇVS° —ÒÀ  •ö6öçfW'EF–6·5FôÆ&VÇ3¢gVæ7F–öâ‡F–6·2’° —f"ÖRÒF†—3° —f"Æ&VÇ2Â’Â–ÆVã°  –ÖRçF–6·2ÒF–6·2æÖ†gVæ7F–öâ‡F–6²’° —&WGW&âF–6²çfÇVS° —Ò“°  –ÖRæ&Vf÷&UF–6µFôÆ&VÄ6öçfW'6–öâ‚“°  ’òòæWr–×ÆVÖVçFF–öç26†÷VÆB&WGW&âF†Rf÷&ÖGFVBF–6²Æ&VÇ2'WBf÷"$4µt$@ ’òò4ôÕBÂvR7F–ÆÂ7W÷'Bæò&WGW&â†F†—2çF–6·6–çFW&æÆÇ’6†ævVB'’6ÆÆ–æp ’òòF†—2ÖWF†öBæB7W÷6VBFò6öçF–âöæÇ’7G&–ærfÇVW2’à –Æ&VÇ2ÒÖRæ6öçfW'EF–6·5FôÆ&VÇ2‡F–6·2’ÇÂÖRçF–6·3°  –ÖRægFW%F–6µFôÆ&VÄ6öçfW'6–öâ‚“°  ’òò$4µt$B4ôÕC¢7–æ6‡&öæ—¦R÷F–6·6v—F‚Æ&VÇ2‡6ò÷FVçF–ÆÇ’F†—2çF–6·6 –f÷"†’ÒÂ–ÆVâÒF–6·2æÆVæwFƒ²’Â–ÆVã²²¶’’° —F–6·5¶•ÒæÆ&VÂÒÆ&VÇ5¶•Ó° —Ð  —&WGW&âÆ&VÇ3° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWDÆ&VÅ6—¦W3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"Æ&VÅ6—¦W2ÒÖRåöÆ&VÅ6—¦W3°  ––b‚Æ&VÅ6—¦W2’° –ÖRåöÆ&VÅ6—¦W2ÒÆ&VÅ6—¦W2Ò6ö×WFTÆ&VÅ6—¦W2†ÖRæ7G‚Â'6UF–6´föçD÷F–öç2†ÖRæ÷F–öç2çF–6·2’ÂÖRævWEF–6·2‚’ÂÖRæÆöævW7EFW‡D66†R“° –ÖRæÆöævW7DÆ&VÅv–GF‚ÒÆ&VÅ6—¦W2çv–FW7Bçv–GFƒ° —Ð  —&WGW&âÆ&VÅ6—¦W3° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •÷'6UfÇVS¢gVæ7F–öâ‡fÇVR’° —f"7F'BÂVæBÂÖ–âÂÖƒ°  ––b†—4'&’‡fÇVR’’° —7F'BÒ·F†—2ævWE&–v‡EfÇVR‡fÇVU³Ò“° –VæBÒ·F†—2ævWE&–v‡EfÇVR‡fÇVU³Ò“° –Ö–âÒÖF‚æÖ–â‡7F'BÂVæB“° –Ö‚ÒÖF‚æÖ‚‡7F'BÂVæB“° —ÒVÇ6R° —fÇVRÒ·F†—2ævWE&–v‡EfÇVR‡fÇVR“° —7F'BÒVæFVf–æVC° –VæBÒfÇVS° –Ö–âÒfÇVS° –Ö‚ÒfÇVS° —Ð  —&WGW&â° –Ö–ã¢Ö–âÀ –Öƒ¢Ö‚À —7F'C¢7F'BÀ –VæC¢Væ@ —Ó° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWE66ÆTÆ&VÃ¢gVæ7F–öâ‡&ufÇVR’° —f"bÒF†—2å÷'6UfÇVR‡&ufÇVR“° ––b‡bç7F'BÓÒVæFVf–æVB’° —&WGW&âu²r²bç7F'B²rÂr²bæVæB²uÒs° —Ð  —&WGW&â·F†—2ævWE&–v‡EfÇVR‡&ufÇVR“° —ÒÀ  ’ò¢  ’¢W6VBFòvWBF†RfÇVRFòF—7Æ’–âF†RFööÇF—f÷"F†RFFBF†Rv—fVâ–æFW€ ’¢&Ò–æFW€ ’¢&ÒFF6WD–æFW€ ’¢ð –vWDÆ&VÄf÷$–æFWƒ¢†VÇW'2Cææö÷À  ’ò¢  ’¢&WGW&ç2F†RÆö6F–öâöbF†Rv—fVâFFö–çBâfÇVR6âV—F†W"&Râ–æFW‚÷"çVÖW&–6ÂfÇVP ’¢F†R6ö÷&F–æFRƒÂ’—2BF†RWW"ÖÆVgB6÷&æW"öbF†R6çf0 ’¢&ÒfÇVP ’¢&Ò–æFW€ ’¢&ÒFF6WD–æFW€ ’¢ð –vWE—†VÄf÷%fÇVS¢†VÇW'2Cææö÷À  ’ò¢  ’¢W6VBFòvWBF†RFFfÇVRg&öÒv—fVâ—†VÂâF†—2—2F†R–çfW'6RöbvWE—†VÄf÷%fÇVP ’¢F†R6ö÷&F–æFRƒÂ’—2BF†RWW"ÖÆVgB6÷&æW"öbF†R6çf0 ’¢&Ò—†VÀ ’¢ð –vWEfÇVTf÷%—†VÃ¢†VÇW'2Cææö÷À  ’ò¢  ’¢&WGW&ç2F†RÆö6F–öâöbF†RF–6²BF†Rv—fVâ–æFW€ ’¢F†R6ö÷&F–æFRƒÂ’—2BF†RWW"ÖÆVgB6÷&æW"öbF†R6çf0 ’¢ð –vWE—†VÄf÷%F–6³¢gVæ7F–öâ†–æFW‚’° —f"ÖRÒF†—3° —f"öfg6WBÒÖRæ÷F–öç2æöfg6WC° —f"çVÕF–6·2ÒÖRå÷F–6·2æÆVæwFƒ° —f"F–6µv–GF‚ÒòÖF‚æÖ‚†çVÕF–6·2Ò†öfg6WBò¢’Â“°  —&WGW&â–æFW‚ÂÇÂ–æFW‚âçVÕF–6·2Ò “òçVÆÀ “¢ÖRævWE—†VÄf÷$FV6–ÖÂ†–æFW‚¢F–6µv–GF‚²†öfg6WBòF–6µv–GF‚ò"¢’“° —ÒÀ  ’ò¢  ’¢WF–Æ—G’f÷"vWGF–ærF†R—†VÂÆö6F–öâöbW&6VçFvRöb66ÆP ’¢F†R6ö÷&F–æFRƒÂ’—2BF†RWW"ÖÆVgB6÷&æW"öbF†R6çf0 ’¢ð –vWE—†VÄf÷$FV6–ÖÃ¢gVæ7F–öâ†FV6–ÖÂ’° —f"ÖRÒF†—3°  ––b†ÖRå÷&WfW'6U—†VÇ2’° –FV6–ÖÂÒÒFV6–ÖÃ° —Ð  —&WGW&âÖRå÷7F'E—†VÂ²FV6–ÖÂ¢ÖRåöÆVæwFƒ° —ÒÀ  –vWDFV6–ÖÄf÷%—†VÃ¢gVæ7F–öâ‡—†VÂ’° —f"FV6–ÖÂÒ‡—†VÂÒF†—2å÷7F'E—†VÂ’òF†—2åöÆVæwFƒ° —&WGW&âF†—2å÷&WfW'6U—†VÇ2òÒFV6–ÖÂ¢FV6–ÖÃ° —ÒÀ  ’ò¢  ’¢&WGW&ç2F†R—†VÂf÷"F†RÖ–æ–×VÒ6†'BfÇVP ’¢F†R6ö÷&F–æFRƒÂ’—2BF†RWW"ÖÆVgB6÷&æW"öbF†R6çf0 ’¢ð –vWD&6U—†VÃ¢gVæ7F–öâ‚’° —&WGW&âF†—2ævWE—†VÄf÷%fÇVR‡F†—2ævWD&6UfÇVR‚’“° —ÒÀ  –vWD&6UfÇVS¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"Ö–âÒÖRæÖ–ã° —f"Ö‚ÒÖRæÖƒ°  —&WGW&âÖRæ&Vv–äE¦W&òò  –Ö–âÂbbÖ‚ÂòÖ‚  –Ö–ââbbÖ‚âòÖ–â  “° —ÒÀ  ’ò¢  ’¢&WGW&ç27V'6WBöbF–6·2Fò&RÆ÷GFVBFòfö–B÷fW&Æ–ærÆ&VÇ2à ’¢&—fFP ’¢ð •öWFõ6¶—¢gVæ7F–öâ‡F–6·2’° —f"ÖRÒF†—3° —f"F–6´÷G2ÒÖRæ÷F–öç2çF–6·3° —f"†—4ÆVæwF‚ÒÖRåöÆVæwFƒ° —f"F–6·4Æ–Ö—BÒF–6´÷G2æÖ…F–6·4Æ–Ö—BÇÂ†—4ÆVæwF‚òÖRå÷F–6µ6—¦R‚’²° —f"Ö¦÷$–æF–6W2ÒF–6´÷G2æÖ¦÷"æVæ&ÆVBòvWDÖ¦÷$–æF–6W2‡F–6·2’¢µÓ° —f"çVÔÖ¦÷$–æF–6W2ÒÖ¦÷$–æF–6W2æÆVæwFƒ° —f"f—'7BÒÖ¦÷$–æF–6W5³Ó° —f"Æ7BÒÖ¦÷$–æF–6W5¶çVÔÖ¦÷$–æF–6W2ÒÓ° —f"’Â–ÆVâÂ76–ærÂftÖ¦÷%76–æs°  ’òò–bF†W&R&RFöòÖç’Ö¦÷"F–6·2FòF—7Æ’F†VÒÆÀ ––b†çVÔÖ¦÷$–æF–6W2âF–6·4Æ–Ö—B’° —6¶—Ö¦÷'2‡F–6·2ÂÖ¦÷$–æF–6W2ÂçVÔÖ¦÷$–æF–6W2òF–6·4Æ–Ö—B“° —&WGW&âæöå6¶—VB‡F–6·2“° —Ð  —76–ærÒ6Æ7VÆFU76–ær†Ö¦÷$–æF–6W2ÂF–6·2Â†—4ÆVæwF‚ÂF–6·4Æ–Ö—B“°  ––b†çVÔÖ¦÷$–æF–6W2â’° –f÷"†’ÒÂ–ÆVâÒçVÔÖ¦÷$–æF–6W2Ò²’Â–ÆVã²’²²’° —6¶—‡F–6·2Â76–ærÂÖ¦÷$–æF–6W5¶•ÒÂÖ¦÷$–æF–6W5¶’²Ò“° —Ð –ftÖ¦÷%76–ærÒçVÔÖ¦÷$–æF–6W2âò†Æ7BÒf—'7B’ò†çVÔÖ¦÷$–æF–6W2Ò’¢çVÆÃ° —6¶—‡F–6·2Â76–ærÂ†VÇW'2Cæ—4çVÆÄ÷%VæFVb†ftÖ¦÷%76–ær’ò¢f—'7BÒftÖ¦÷%76–ærÂf—'7B“° —6¶—‡F–6·2Â76–ærÂÆ7BÂ†VÇW'2Cæ—4çVÆÄ÷%VæFVb†ftÖ¦÷%76–ær’òF–6·2æÆVæwF‚¢Æ7B²ftÖ¦÷%76–ær“° —&WGW&âæöå6¶—VB‡F–6·2“° —Ð —6¶—‡F–6·2Â76–ær“° —&WGW&âæöå6¶—VB‡F–6·2“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •÷F–6µ6—¦S¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷F–öåF–6·2ÒÖRæ÷F–öç2çF–6·3°  ’òò6Æ7VÆFR76RæVVFVB'’Æ&VÂ–â†—2F—&V7F–öâà —f"&÷BÒ†VÇW'2CçFõ&F–ç2†ÖRæÆ&VÅ&÷FF–öâ“° —f"6÷2ÒÖF‚æ'2„ÖF‚æ6÷2‡&÷B’“° —f"6–âÒÖF‚æ'2„ÖF‚ç6–â‡&÷B’“°  —f"Æ&VÅ6—¦W2ÒÖRåövWDÆ&VÅ6—¦W2‚“° —f"FF–ærÒ÷F–öåF–6·2æWFõ6¶—FF–ærÇÂ° —f"rÒÆ&VÅ6—¦W2òÆ&VÅ6—¦W2çv–FW7Bçv–GF‚²FF–ær¢° —f"‚ÒÆ&VÅ6—¦W2òÆ&VÅ6—¦W2æ†–v†W7Bæ†V–v‡B²FF–ær¢°  ’òò6Æ7VÆFR76RæVVFVBf÷"F–6²–â†—2F—&V7F–öâà —&WGW&âÖRæ—4†÷&—¦öçFÂ‚ “ò‚¢6÷2âr¢6–âòrò6÷2¢‚ò6–à “¢‚¢6–âÂr¢6÷2ò‚ò6÷2¢rò6–ã° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •ö—5f—6–&ÆS¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"F—7Æ’ÒÖRæ÷F–öç2æF—7Æ“° —f"’Â–ÆVâÂÖWF°  ––b†F—7Æ’ÓÒvWFòr’° —&WGW&âF—7Æ“° —Ð  ’òòv†VâvWFòrÂF†R66ÆR—2f—6–&ÆR–bBÆV7BöæR76ö6–FVBFF6WB—2f—6–&ÆRà –f÷"†’ÒÂ–ÆVâÒ6†'BæFFæFF6WG2æÆVæwFƒ²’Â–ÆVã²²¶’’° ––b†6†'Bæ—4FF6WEf—6–&ÆR†’’’° –ÖWFÒ6†'BævWDFF6WDÖWF†’“° ––b†ÖWFç„†—4”BÓÓÒÖRæ–BÇÂÖWFç”†—4”BÓÓÒÖRæ–B’° —&WGW&âG'VS° —Ð —Ð —Ð  —&WGW&âfÇ6S° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •ö6ö×WFTw&–DÆ–æT—FV×3¢gVæ7F–öâ†6†'D&V’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"w&–DÆ–æW2Ò÷F–öç2æw&–DÆ–æW3° —f"÷6—F–öâÒ÷F–öç2ç÷6—F–öã° —f"öfg6WDw&–DÆ–æW2Òw&–DÆ–æW2æöfg6WDw&–DÆ–æW3° —f"—4†÷&—¦öçFÂÒÖRæ—4†÷&—¦öçFÂ‚“° —f"F–6·2ÒÖRå÷F–6·5FôG&s° —f"F–6·4ÆVæwF‚ÒF–6·2æÆVæwF‚²†öfg6WDw&–DÆ–æW2ò¢“°  —f"FÂÒvWEF–6´Ö&´ÆVæwF‚†w&–DÆ–æW2“° —f"—FV×2ÒµÓ° —f"†—5v–GF‚Òw&–DÆ–æW2æG&t&÷&FW"òfÇVTD–æFW„÷$FVfVÇB†w&–DÆ–æW2æÆ–æUv–GF‚ÂÂ’¢° —f"†—4†Æev–GF‚Ò†—5v–GF‚ò#° —f"Æ–vå—†VÂÒ†VÇW'2CåöÆ–vå—†VÃ° —f"Æ–vä&÷&FW%fÇVRÒgVæ7F–öâ‡—†VÂ’° —&WGW&âÆ–vå—†VÂ†6†'BÂ—†VÂÂ†—5v–GF‚“° —Ó° —f"&÷&FW%fÇVRÂ’ÂF–6²ÂÆ–æUfÇVRÂÆ–væVDÆ–æUfÇVS° —f"GƒÂG“ÂGƒ"ÂG“"ÂƒÂ“Âƒ"Â“"ÂÆ–æUv–GF‚ÂÆ–æT6öÆ÷"Â&÷&FW$F6‚Â&÷&FW$F6„öfg6WC°  ––b‡÷6—F–öâÓÓÒwF÷r’° –&÷&FW%fÇVRÒÆ–vä&÷&FW%fÇVR†ÖRæ&÷GFöÒ“° —G“ÒÖRæ&÷GFöÒÒFÃ° —G“"Ò&÷&FW%fÇVRÒ†—4†Æev–GFƒ° —“ÒÆ–vä&÷&FW%fÇVR†6†'D&VçF÷’²†—4†Æev–GFƒ° —“"Ò6†'D&Væ&÷GFöÓ° —ÒVÇ6R–b‡÷6—F–öâÓÓÒv&÷GFöÒr’° –&÷&FW%fÇVRÒÆ–vä&÷&FW%fÇVR†ÖRçF÷“° —“Ò6†'D&VçF÷° —“"ÒÆ–vä&÷&FW%fÇVR†6†'D&Væ&÷GFöÒ’Ò†—4†Æev–GFƒ° —G“Ò&÷&FW%fÇVR²†—4†Æev–GFƒ° —G“"ÒÖRçF÷²FÃ° —ÒVÇ6R–b‡÷6—F–öâÓÓÒvÆVgBr’° –&÷&FW%fÇVRÒÆ–vä&÷&FW%fÇVR†ÖRç&–v‡B“° —GƒÒÖRç&–v‡BÒFÃ° —Gƒ"Ò&÷&FW%fÇVRÒ†—4†Æev–GFƒ° —ƒÒÆ–vä&÷&FW%fÇVR†6†'D&VæÆVgB’²†—4†Æev–GFƒ° —ƒ"Ò6†'D&Vç&–v‡C° —ÒVÇ6R° –&÷&FW%fÇVRÒÆ–vä&÷&FW%fÇVR†ÖRæÆVgB“° —ƒÒ6†'D&VæÆVgC° —ƒ"ÒÆ–vä&÷&FW%fÇVR†6†'D&Vç&–v‡B’Ò†—4†Æev–GFƒ° —GƒÒ&÷&FW%fÇVR²†—4†Æev–GFƒ° —Gƒ"ÒÖRæÆVgB²FÃ° —Ð  –f÷"†’Ò²’ÂF–6·4ÆVæwFƒ²²¶’’° —F–6²ÒF–6·5¶•ÒÇÂ·Ó°  ’òòWF÷6¶—W"6¶—VBF†—2F–6²‚3Cc3R ––b†—4çVÆÄ÷%VæFVb‡F–6²æÆ&VÂ’bb’ÂF–6·2æÆVæwF‚’° –6öçF–çVS° —Ð  ––b†’ÓÓÒÖRç¦W&ôÆ–æT–æFW‚bb÷F–öç2æöfg6WBÓÓÒöfg6WDw&–DÆ–æW2’° ’òòG&rF†Rf—'7B–æFW‚7V6–ÆÇ –Æ–æUv–GF‚Òw&–DÆ–æW2ç¦W&ôÆ–æUv–GFƒ° –Æ–æT6öÆ÷"Òw&–DÆ–æW2ç¦W&ôÆ–æT6öÆ÷#° –&÷&FW$F6‚Òw&–DÆ–æW2ç¦W&ôÆ–æT&÷&FW$F6‚ÇÂµÓ° –&÷&FW$F6„öfg6WBÒw&–DÆ–æW2ç¦W&ôÆ–æT&÷&FW$F6„öfg6WBÇÂã° —ÒVÇ6R° –Æ–æUv–GF‚ÒfÇVTD–æFW„÷$FVfVÇB†w&–DÆ–æW2æÆ–æUv–GF‚Â’Â“° –Æ–æT6öÆ÷"ÒfÇVTD–æFW„÷$FVfVÇB†w&–DÆ–æW2æ6öÆ÷"Â’Âw&v&ƒÃÃÃã’r“° –&÷&FW$F6‚Òw&–DÆ–æW2æ&÷&FW$F6‚ÇÂµÓ° –&÷&FW$F6„öfg6WBÒw&–DÆ–æW2æ&÷&FW$F6„öfg6WBÇÂã° —Ð  –Æ–æUfÇVRÒvWE—†VÄf÷$w&–DÆ–æR†ÖRÂF–6²åö–æFW‚ÇÂ’Âöfg6WDw&–DÆ–æW2“°  ’òò6¶—–bF†R—†VÂ—2÷WBöbF†R&ævP ––b†Æ–æUfÇVRÓÓÒVæFVf–æVB’° –6öçF–çVS° —Ð  –Æ–væVDÆ–æUfÇVRÒÆ–vå—†VÂ†6†'BÂÆ–æUfÇVRÂÆ–æUv–GF‚“°  ––b†—4†÷&—¦öçFÂ’° —GƒÒGƒ"ÒƒÒƒ"ÒÆ–væVDÆ–æUfÇVS° —ÒVÇ6R° —G“ÒG“"Ò“Ò“"ÒÆ–væVDÆ–æUfÇVS° —Ð  –—FV×2çW6‚‡° —Gƒ¢GƒÀ —G“¢G“À —Gƒ#¢Gƒ"À —G“#¢G“"À —ƒ¢ƒÀ —“¢“À —ƒ#¢ƒ"À —“#¢“"À —v–GFƒ¢Æ–æUv–GF‚À –6öÆ÷#¢Æ–æT6öÆ÷"À –&÷&FW$F6ƒ¢&÷&FW$F6‚À –&÷&FW$F6„öfg6WC¢&÷&FW$F6„öfg6WBÀ —Ò“° —Ð  –—FV×2çF–6·4ÆVæwF‚ÒF–6·4ÆVæwFƒ° –—FV×2æ&÷&FW%fÇVRÒ&÷&FW%fÇVS°  —&WGW&â—FV×3° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •ö6ö×WFTÆ&VÄ—FV×3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"÷F–öåF–6·2Ò÷F–öç2çF–6·3° —f"÷6—F–öâÒ÷F–öç2ç÷6—F–öã° —f"—4Ö—'&÷&VBÒ÷F–öåF–6·2æÖ—'&÷#° —f"—4†÷&—¦öçFÂÒÖRæ—4†÷&—¦öçFÂ‚“° —f"F–6·2ÒÖRå÷F–6·5FôG&s° —f"föçG2Ò'6UF–6´föçD÷F–öç2†÷F–öåF–6·2“° —f"F–6µFF–ærÒ÷F–öåF–6·2çFF–æs° —f"FÂÒvWEF–6´Ö&´ÆVæwF‚†÷F–öç2æw&–DÆ–æW2“° —f"&÷FF–öâÒÖ†VÇW'2CçFõ&F–ç2†ÖRæÆ&VÅ&÷FF–öâ“° —f"—FV×2ÒµÓ° —f"’Â–ÆVâÂF–6²ÂÆ&VÂÂ‚Â’ÂFW‡DÆ–vâÂ—†VÂÂföçBÂÆ–æT†V–v‡BÂÆ–æT6÷VçBÂFW‡Döfg6WC°  ––b‡÷6—F–öâÓÓÒwF÷r’° —’ÒÖRæ&÷GFöÒÒFÂÒF–6µFF–æs° —FW‡DÆ–vâÒ&÷FF–öâòv6VçFW"r¢vÆVgBs° —ÒVÇ6R–b‡÷6—F–öâÓÓÒv&÷GFöÒr’° —’ÒÖRçF÷²FÂ²F–6µFF–æs° —FW‡DÆ–vâÒ&÷FF–öâòv6VçFW"r¢w&–v‡Bs° —ÒVÇ6R–b‡÷6—F–öâÓÓÒvÆVgBr’° —‚ÒÖRç&–v‡BÒ†—4Ö—'&÷&VBò¢FÂ’ÒF–6µFF–æs° —FW‡DÆ–vâÒ—4Ö—'&÷&VBòvÆVgBr¢w&–v‡Bs° —ÒVÇ6R° —‚ÒÖRæÆVgB²†—4Ö—'&÷&VBò¢FÂ’²F–6µFF–æs° —FW‡DÆ–vâÒ—4Ö—'&÷&VBòw&–v‡Br¢vÆVgBs° —Ð  –f÷"†’ÒÂ–ÆVâÒF–6·2æÆVæwFƒ²’Â–ÆVã²²¶’’° —F–6²ÒF–6·5¶•Ó° –Æ&VÂÒF–6²æÆ&VÃ°  ’òòWF÷6¶—W"6¶—VBF†—2F–6²‚3Cc3R ––b†—4çVÆÄ÷%VæFVb†Æ&VÂ’’° –6öçF–çVS° —Ð  ——†VÂÒÖRævWE—†VÄf÷%F–6²‡F–6²åö–æFW‚ÇÂ’’²÷F–öåF–6·2æÆ&VÄöfg6WC° –föçBÒF–6²æÖ¦÷"òföçG2æÖ¦÷"¢föçG2æÖ–æ÷#° –Æ–æT†V–v‡BÒföçBæÆ–æT†V–v‡C° –Æ–æT6÷VçBÒ—4'&’†Æ&VÂ’òÆ&VÂæÆVæwF‚¢°  ––b†—4†÷&—¦öçFÂ’° —‚Ò—†VÃ° —FW‡Döfg6WBÒ÷6—F–öâÓÓÒwF÷p “ò‚‚&÷FF–öâòãR¢’ÒÆ–æT6÷VçB’¢Æ–æT†V–v‡@ “¢‚&÷FF–öâòãR¢’¢Æ–æT†V–v‡C° —ÒVÇ6R° —’Ò—†VÃ° —FW‡Döfg6WBÒƒÒÆ–æT6÷VçB’¢Æ–æT†V–v‡Bò#° —Ð  –—FV×2çW6‚‡° —ƒ¢‚À —“¢’À —&÷FF–öã¢&÷FF–öâÀ –Æ&VÃ¢Æ&VÂÀ –föçC¢föçBÀ —FW‡Döfg6WC¢FW‡Döfg6WBÀ —FW‡DÆ–vã¢FW‡DÆ–và —Ò“° —Ð  —&WGW&â—FV×3° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öG&tw&–C¢gVæ7F–öâ†6†'D&V’° —f"ÖRÒF†—3° —f"w&–DÆ–æW2ÒÖRæ÷F–öç2æw&–DÆ–æW3°  ––b‚w&–DÆ–æW2æF—7Æ’’° —&WGW&ã° —Ð  —f"7G‚ÒÖRæ7Gƒ° —f"6†'BÒÖRæ6†'C° —f"Æ–vå—†VÂÒ†VÇW'2CåöÆ–vå—†VÃ° —f"†—5v–GF‚Òw&–DÆ–æW2æG&t&÷&FW"òfÇVTD–æFW„÷$FVfVÇB†w&–DÆ–æW2æÆ–æUv–GF‚ÂÂ’¢° —f"—FV×2ÒÖRåöw&–DÆ–æT—FV×2ÇÂ†ÖRåöw&–DÆ–æT—FV×2ÒÖRåö6ö×WFTw&–DÆ–æT—FV×2†6†'D&V’“° —f"v–GF‚Â6öÆ÷"Â’Â–ÆVâÂ—FVÓ°  –f÷"†’ÒÂ–ÆVâÒ—FV×2æÆVæwFƒ²’Â–ÆVã²²¶’’° –—FVÒÒ—FV×5¶•Ó° —v–GF‚Ò—FVÒçv–GFƒ° –6öÆ÷"Ò—FVÒæ6öÆ÷#°  ––b‡v–GF‚bb6öÆ÷"’° –7G‚ç6fR‚“° –7G‚æÆ–æUv–GF‚Òv–GFƒ° –7G‚ç7G&ö¶U7G–ÆRÒ6öÆ÷#° ––b†7G‚ç6WDÆ–æTF6‚’° –7G‚ç6WDÆ–æTF6‚†—FVÒæ&÷&FW$F6‚“° –7G‚æÆ–æTF6„öfg6WBÒ—FVÒæ&÷&FW$F6„öfg6WC° —Ð  –7G‚æ&Vv–åF‚‚“°  ––b†w&–DÆ–æW2æG&uF–6·2’° –7G‚æÖ÷fUFò†—FVÒçGƒÂ—FVÒçG““° –7G‚æÆ–æUFò†—FVÒçGƒ"Â—FVÒçG“"“° —Ð  ––b†w&–DÆ–æW2æG&töä6†'D&V’° –7G‚æÖ÷fUFò†—FVÒçƒÂ—FVÒç““° –7G‚æÆ–æUFò†—FVÒçƒ"Â—FVÒç“"“° —Ð  –7G‚ç7G&ö¶R‚“° –7G‚ç&W7F÷&R‚“° —Ð —Ð  ––b††—5v–GF‚’° ’òòG&rF†RÆ–æRBF†RVFvRöbF†R†—0 —f"f—'7DÆ–æUv–GF‚Ò†—5v–GFƒ° —f"Æ7DÆ–æUv–GF‚ÒfÇVTD–æFW„÷$FVfVÇB†w&–DÆ–æW2æÆ–æUv–GF‚Â—FV×2çF–6·4ÆVæwF‚ÒÂ“° —f"&÷&FW%fÇVRÒ—FV×2æ&÷&FW%fÇVS° —f"ƒÂƒ"Â“Â“#°  ––b†ÖRæ—4†÷&—¦öçFÂ‚’’° —ƒÒÆ–vå—†VÂ†6†'BÂÖRæÆVgBÂf—'7DÆ–æUv–GF‚’Òf—'7DÆ–æUv–GF‚ò#° —ƒ"ÒÆ–vå—†VÂ†6†'BÂÖRç&–v‡BÂÆ7DÆ–æUv–GF‚’²Æ7DÆ–æUv–GF‚ò#° —“Ò“"Ò&÷&FW%fÇVS° —ÒVÇ6R° —“ÒÆ–vå—†VÂ†6†'BÂÖRçF÷Âf—'7DÆ–æUv–GF‚’Òf—'7DÆ–æUv–GF‚ò#° —“"ÒÆ–vå—†VÂ†6†'BÂÖRæ&÷GFöÒÂÆ7DÆ–æUv–GF‚’²Æ7DÆ–æUv–GF‚ò#° —ƒÒƒ"Ò&÷&FW%fÇVS° —Ð  –7G‚æÆ–æUv–GF‚Ò†—5v–GFƒ° –7G‚ç7G&ö¶U7G–ÆRÒfÇVTD–æFW„÷$FVfVÇB†w&–DÆ–æW2æ6öÆ÷"Â“° –7G‚æ&Vv–åF‚‚“° –7G‚æÖ÷fUFò‡ƒÂ““° –7G‚æÆ–æUFò‡ƒ"Â“"“° –7G‚ç7G&ö¶R‚“° —Ð —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öG&tÆ&VÇ3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷F–öåF–6·2ÒÖRæ÷F–öç2çF–6·3°  ––b‚÷F–öåF–6·2æF—7Æ’’° —&WGW&ã° —Ð  —f"7G‚ÒÖRæ7Gƒ° —f"—FV×2ÒÖRåöÆ&VÄ—FV×2ÇÂ†ÖRåöÆ&VÄ—FV×2ÒÖRåö6ö×WFTÆ&VÄ—FV×2‚’“° —f"’Â¢Â–ÆVâÂ¦ÆVâÂ—FVÒÂF–6´föçBÂÆ&VÂÂ“°  –f÷"†’ÒÂ–ÆVâÒ—FV×2æÆVæwFƒ²’Â–ÆVã²²¶’’° –—FVÒÒ—FV×5¶•Ó° —F–6´föçBÒ—FVÒæföçC°  ’òòÖ¶R7W&RvRG&rFW‡B–âF†R6÷'&V7B6öÆ÷"æBföç@ –7G‚ç6fR‚“° –7G‚çG&ç6ÆFR†—FVÒç‚Â—FVÒç’“° –7G‚ç&÷FFR†—FVÒç&÷FF–öâ“° –7G‚æföçBÒF–6´föçBç7G&–æs° –7G‚æf–ÆÅ7G–ÆRÒF–6´föçBæ6öÆ÷#° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs° –7G‚çFW‡DÆ–vâÒ—FVÒçFW‡DÆ–vã°  –Æ&VÂÒ—FVÒæÆ&VÃ° —’Ò—FVÒçFW‡Döfg6WC° ––b†—4'&’†Æ&VÂ’’° –f÷"†¢ÒÂ¦ÆVâÒÆ&VÂæÆVæwFƒ²¢Â¦ÆVã²²¶¢’° ’òòvR§W7BÖ¶R7W&RF†R×VÇF–Æ–æRVÆVÖVçB—27G&–ær†W&Râà –7G‚æf–ÆÅFW‡B‚rr²Æ&VÅ¶¥ÒÂÂ’“° —’³ÒF–6´föçBæÆ–æT†V–v‡C° —Ð —ÒVÇ6R° –7G‚æf–ÆÅFW‡B†Æ&VÂÂÂ’“° —Ð –7G‚ç&W7F÷&R‚“° —Ð —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öG&uF—FÆS¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"7G‚ÒÖRæ7Gƒ° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"66ÆTÆ&VÂÒ÷F–öç2ç66ÆTÆ&VÃ°  ––b‚66ÆTÆ&VÂæF—7Æ’’° —&WGW&ã° —Ð  —f"66ÆTÆ&VÄföçD6öÆ÷"ÒfÇVT÷$FVfVÇBF‡66ÆTÆ&VÂæföçD6öÆ÷"Â6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇDföçD6öÆ÷"“° —f"66ÆTÆ&VÄföçBÒ†VÇW'2Cæ÷F–öç2å÷'6TföçB‡66ÆTÆ&VÂ“° —f"66ÆTÆ&VÅFF–ærÒ†VÇW'2Cæ÷F–öç2çFõFF–ær‡66ÆTÆ&VÂçFF–ær“° —f"†ÆdÆ–æT†V–v‡BÒ66ÆTÆ&VÄföçBæÆ–æT†V–v‡Bò#° —f"÷6—F–öâÒ÷F–öç2ç÷6—F–öã° —f"&÷FF–öâÒ° —f"66ÆTÆ&VÅ‚Â66ÆTÆ&VÅ“°  ––b†ÖRæ—4†÷&—¦öçFÂ‚’’° —66ÆTÆ&VÅ‚ÒÖRæÆVgB²ÖRçv–GF‚ò#²òòÖ–Gö–çBöbF†Rv–GF€ —66ÆTÆ&VÅ’Ò÷6—F–öâÓÓÒv&÷GFöÒp “òÖRæ&÷GFöÒÒ†ÆdÆ–æT†V–v‡BÒ66ÆTÆ&VÅFF–æræ&÷GFöÐ “¢ÖRçF÷²†ÆdÆ–æT†V–v‡B²66ÆTÆ&VÅFF–ærçF÷° —ÒVÇ6R° —f"—4ÆVgBÒ÷6—F–öâÓÓÒvÆVgBs° —66ÆTÆ&VÅ‚Ò—4ÆVg@ “òÖRæÆVgB²†ÆdÆ–æT†V–v‡B²66ÆTÆ&VÅFF–ærçF÷  “¢ÖRç&–v‡BÒ†ÆdÆ–æT†V–v‡BÒ66ÆTÆ&VÅFF–ærçF÷° —66ÆTÆ&VÅ’ÒÖRçF÷²ÖRæ†V–v‡Bò#° —&÷FF–öâÒ—4ÆVgBòÓãR¢ÖF‚å’¢ãR¢ÖF‚å“° —Ð  –7G‚ç6fR‚“° –7G‚çG&ç6ÆFR‡66ÆTÆ&VÅ‚Â66ÆTÆ&VÅ’“° –7G‚ç&÷FFR‡&÷FF–öâ“° –7G‚çFW‡DÆ–vâÒv6VçFW"s° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs° –7G‚æf–ÆÅ7G–ÆRÒ66ÆTÆ&VÄföçD6öÆ÷#²òò&VæFW"–â6÷'&V7B6öÆ÷W  –7G‚æföçBÒ66ÆTÆ&VÄföçBç7G&–æs° –7G‚æf–ÆÅFW‡B‡66ÆTÆ&VÂæÆ&VÅ7G&–ærÂÂ“° –7G‚ç&W7F÷&R‚“° —ÒÀ  –G&s¢gVæ7F–öâ†6†'D&V’° —f"ÖRÒF†—3°  ––b‚ÖRåö—5f—6–&ÆR‚’’° —&WGW&ã° —Ð  –ÖRåöG&tw&–B†6†'D&V“° –ÖRåöG&uF—FÆR‚“° –ÖRåöG&tÆ&VÇ2‚“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öÆ–W'3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"G¢Ò÷G2çF–6·2bb÷G2çF–6·2ç¢ÇÂ° —f"w¢Ò÷G2æw&–DÆ–æW2bb÷G2æw&–DÆ–æW2ç¢ÇÂ°  ––b‚ÖRåö—5f—6–&ÆR‚’ÇÂG¢ÓÓÒw¢ÇÂÖRæG&rÓÒÖRåöG&r’° ’òò&6·v&B6ö×F–&–Æ—G“¢G&r†2&VVâ÷fW'&–FFVâ'’7W7FöÒ66ÆP —&WGW&â·° —£¢G¢À –G&s¢gVæ7F–öâ‚’° –ÖRæG&ræÇ’†ÖRÂ&wVÖVçG2“° —Ð —ÕÓ° —Ð  —&WGW&â·° —£¢w¢À –G&s¢gVæ7F–öâ‚’° –ÖRåöG&tw&–BæÇ’†ÖRÂ&wVÖVçG2“° –ÖRåöG&uF—FÆRæÇ’†ÖRÂ&wVÖVçG2“° —Ð —ÒÂ° —£¢G¢À –G&s¢gVæ7F–öâ‚’° –ÖRåöG&tÆ&VÇ2æÇ’†ÖRÂ&wVÖVçG2“° —Ð —ÕÓ° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWDÖF6†–æuf—6–&ÆTÖWF3¢gVæ7F–öâ‡G—R’° —f"ÖRÒF†—3° —f"—4†÷&—¦öçFÂÒÖRæ—4†÷&—¦öçFÂ‚“° —&WGW&âÖRæ6†'BåövWE6÷'FVEf—6–&ÆTFF6WDÖWF2‚ ’æf–ÇFW"†gVæ7F–öâ†ÖWF’° —&WGW&â‚G—RÇÂÖWFçG—RÓÓÒG—R ’bb†—4†÷&—¦öçFÂòÖWFç„†—4”BÓÓÒÖRæ–B¢ÖWFç”†—4”BÓÓÒÖRæ–B“° —Ò“° —Ð§Ò“° ¥66ÆRç&÷F÷G—RåöG&rÒ66ÆRç&÷F÷G—RæG&s° §f"6÷&U÷66ÆRÒ66ÆS° §f"—4çVÆÄ÷%VæFVbCÒ†VÇW'2Cæ—4çVÆÄ÷%VæFVc° §f"FVfVÇD6öæf–rÒ° —÷6—F–öã¢v&÷GFöÒp§Ó° §f"66ÆUö6FVv÷'’Ò6÷&U÷66ÆRæW‡FVæB‡° –FWFW&Ö–æTFFÆ–Ö—G3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"Æ&VÇ2ÒÖRåövWDÆ&VÇ2‚“° —f"F–6·4÷G2ÒÖRæ÷F–öç2çF–6·3° —f"Ö–âÒF–6·4÷G2æÖ–ã° —f"Ö‚ÒF–6·4÷G2æÖƒ° —f"Ö–ä–æFW‚Ò° —f"Ö„–æFW‚ÒÆ&VÇ2æÆVæwF‚Ò° —f"f–æD–æFWƒ°  ––b†Ö–âÓÒVæFVf–æVB’° ’òòW6W"7V6–f–VBÖ–âfÇVP –f–æD–æFW‚ÒÆ&VÇ2æ–æFW„öb†Ö–â“° ––b†f–æD–æFW‚ãÒ’° –Ö–ä–æFW‚Òf–æD–æFWƒ° —Ð —Ð  ––b†Ö‚ÓÒVæFVf–æVB’° ’òòW6W"7V6–f–VBÖ‚fÇVP –f–æD–æFW‚ÒÆ&VÇ2æ–æFW„öb†Ö‚“° ––b†f–æD–æFW‚ãÒ’° –Ö„–æFW‚Òf–æD–æFWƒ° —Ð —Ð  –ÖRæÖ–ä–æFW‚ÒÖ–ä–æFWƒ° –ÖRæÖ„–æFW‚ÒÖ„–æFWƒ° –ÖRæÖ–âÒÆ&VÇ5¶Ö–ä–æFW…Ó° –ÖRæÖ‚ÒÆ&VÇ5¶Ö„–æFW…Ó° —ÒÀ  –'V–ÆEF–6·3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"Æ&VÇ2ÒÖRåövWDÆ&VÇ2‚“° —f"Ö–ä–æFW‚ÒÖRæÖ–ä–æFWƒ° —f"Ö„–æFW‚ÒÖRæÖ„–æFWƒ°  ’òò–bvR&Rf–Wv–ær6öÖR7V'6WBöbÆ&VÇ2Â6Æ–6RF†R÷&–v–æÂ'& –ÖRçF–6·2Ò†Ö–ä–æFW‚ÓÓÒbbÖ„–æFW‚ÓÓÒÆ&VÇ2æÆVæwF‚Ò’òÆ&VÇ2¢Æ&VÇ2ç6Æ–6R†Ö–ä–æFW‚ÂÖ„–æFW‚²“° —ÒÀ  –vWDÆ&VÄf÷$–æFWƒ¢gVæ7F–öâ†–æFW‚ÂFF6WD–æFW‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C°  ––b†6†'BævWDFF6WDÖWF†FF6WD–æFW‚’æ6öçG&öÆÆW"åövWEfÇVU66ÆT–B‚’ÓÓÒÖRæ–B’° —&WGW&âÖRævWE&–v‡EfÇVR†6†'BæFFæFF6WG5¶FF6WD–æFW…ÒæFF¶–æFW…Ò“° —Ð  —&WGW&âÖRåövWDÆ&VÇ2‚•¶–æFW…Ó° —ÒÀ  •ö6öæf–wW&S¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"öfg6WBÒÖRæ÷F–öç2æöfg6WC° —f"F–6·2ÒÖRçF–6·3°  –6÷&U÷66ÆRç&÷F÷G—Råö6öæf–wW&Ræ6ÆÂ†ÖR“°  ––b‚ÖRæ—4†÷&—¦öçFÂ‚’’° ’òòf÷"&6·v&B6ö×F–&–Æ—G’ÂfW'F–6Â6FVv÷'’66ÆR&WfW'6R—2–çfW'FVBà –ÖRå÷&WfW'6U—†VÇ2ÒÖRå÷&WfW'6U—†VÇ3° —Ð  ––b‚F–6·2’° —&WGW&ã° —Ð  –ÖRå÷7F'EfÇVRÒÖRæÖ–ä–æFW‚Ò†öfg6WBòãR¢“° –ÖRå÷fÇVU&ævRÒÖF‚æÖ‚‡F–6·2æÆVæwF‚Ò†öfg6WBò¢’Â“° —ÒÀ  ’òòW6VBFòvWBFFfÇVRÆö6F–öç2âfÇVR6âV—F†W"&Râ–æFW‚÷"çVÖW&–6ÂfÇVP –vWE—†VÄf÷%fÇVS¢gVæ7F–öâ‡fÇVRÂ–æFW‚ÂFF6WD–æFW‚’° —f"ÖRÒF†—3° —f"fÇVT6FVv÷'’ÂÆ&VÇ2Â–Gƒ°  ––b‚—4çVÆÄ÷%VæFVbC†–æFW‚’bb—4çVÆÄ÷%VæFVbC†FF6WD–æFW‚’’° —fÇVRÒÖRæ6†'BæFFæFF6WG5¶FF6WD–æFW…ÒæFF¶–æFW…Ó° —Ð  ’òò–bfÇVR—2FFö&¦V7BÂF†Vâ–æFW‚—2F†R–æFW‚–âF†RFF'&’À ’òòæ÷BF†R–æFW‚öbF†R66ÆRâvRæVVBFò6†ævRF†Bà ––b‚—4çVÆÄ÷%VæFVbC‡fÇVR’’° —fÇVT6FVv÷'’ÒÖRæ—4†÷&—¦öçFÂ‚’òfÇVRç‚¢fÇVRç“° —Ð ––b‡fÇVT6FVv÷'’ÓÒVæFVf–æVBÇÂ‡fÇVRÓÒVæFVf–æVBbb—4æâ†–æFW‚’’’° –Æ&VÇ2ÒÖRåövWDÆ&VÇ2‚“° —fÇVRÒ†VÇW'2CçfÇVT÷$FVfVÇB‡fÇVT6FVv÷'’ÂfÇVR“° ––G‚ÒÆ&VÇ2æ–æFW„öb‡fÇVR“° ––æFW‚Ò–G‚ÓÒÓò–G‚¢–æFWƒ° ––b†—4æâ†–æFW‚’’° ––æFW‚ÒfÇVS° —Ð —Ð —&WGW&âÖRævWE—†VÄf÷$FV6–ÖÂ‚†–æFW‚ÒÖRå÷7F'EfÇVR’òÖRå÷fÇVU&ævR“° —ÒÀ  –vWE—†VÄf÷%F–6³¢gVæ7F–öâ†–æFW‚’° —f"F–6·2ÒF†—2çF–6·3° —&WGW&â–æFW‚ÂÇÂ–æFW‚âF–6·2æÆVæwF‚Ò “òçVÆÀ “¢F†—2ævWE—†VÄf÷%fÇVR‡F–6·5¶–æFW…ÒÂ–æFW‚²F†—2æÖ–ä–æFW‚“° —ÒÀ  –vWEfÇVTf÷%—†VÃ¢gVæ7F–öâ‡—†VÂ’° —f"ÖRÒF†—3° —f"fÇVRÒÖF‚ç&÷VæB†ÖRå÷7F'EfÇVR²ÖRævWDFV6–ÖÄf÷%—†VÂ‡—†VÂ’¢ÖRå÷fÇVU&ævR“° —&WGW&âÖF‚æÖ–â„ÖF‚æÖ‚‡fÇVRÂ’ÂÖRçF–6·2æÆVæwF‚Ò“° —ÒÀ  –vWD&6U—†VÃ¢gVæ7F–öâ‚’° —&WGW&âF†—2æ&÷GFöÓ° —Ð§Ò“° ¢òò”åDU$äÃ¢7FF–2FVfVÇB÷F–öç2Â&Vv—7FW&VB–â7&2ö–æFW‚æ§0§f"öFVfVÇG2ÒFVfVÇD6öæf–s°§66ÆUö6FVv÷'’åöFVfVÇG2ÒöFVfVÇG3° §f"æö÷Ò†VÇW'2Cææö÷°§f"—4çVÆÄ÷%VæFVbC"Ò†VÇW'2Cæ—4çVÆÄ÷%VæFVc° ¢ò¢ ¢¢vVæW&FR6WBöbÆ–æV"F–6·0¢¢&ÒvVæW&F–öä÷F–öç2F†R÷F–öç2W6VBFòvVæW&FRF†RF–6·0¢¢&ÒFF&ævRF†R&ævRöbF†RFF¢¢&WGW&ç2¶çVÖ&W%µ×Ò'&’öbF–6²fÇVW0¢¢ð¦gVæ7F–öâvVæW&FUF–6·2†vVæW&F–öä÷F–öç2ÂFF&ævR’° —f"F–6·2ÒµÓ° ’òòFòvWB&æ–6R"fÇVRf÷"F†RF–6²76–ærÂvRv–ÆÂW6RF†R&÷&–FVÇ’æÖV@ ’òò&æ–6RçVÖ&W""Æv÷&—F†Òâ6VR‡GG3¢ò÷7F6¶÷fW&fÆ÷ræ6öÒ÷VW7F–öç2óƒScƒƒöæ–6RÖÆ&VÂÖÆv÷&—F†ÒÖf÷"Ö6†'G2×v—F‚ÖÖ–æ–×VÒ×F–6·0 ’òòf÷"FWF–Ç2à  —f"Ô”åõ54”ärÒRÓC° —f"7FW6—¦RÒvVæW&F–öä÷F–öç2ç7FW6—¦S° —f"Væ—BÒ7FW6—¦RÇÂ° —f"Ö„çVÕ76W2ÒvVæW&F–öä÷F–öç2æÖ…F–6·2Ò° —f"Ö–âÒvVæW&F–öä÷F–öç2æÖ–ã° —f"Ö‚ÒvVæW&F–öä÷F–öç2æÖƒ° —f"&V6—6–öâÒvVæW&F–öä÷F–öç2ç&V6—6–öã° —f"&Ö–âÒFF&ævRæÖ–ã° —f"&Ö‚ÒFF&ævRæÖƒ° —f"76–ærÒ†VÇW'2Cææ–6TçVÒ‚‡&Ö‚Ò&Ö–â’òÖ„çVÕ76W2òVæ—B’¢Væ—C° —f"f7F÷"Âæ–6TÖ–âÂæ–6TÖ‚ÂçVÕ76W3°  ’òò&W–öæBÔ”åõ54”ärfÆöF–ærö–çBçVÖ&W'2&V–ærFòÆ÷6R&V6—6–öà ’òò7V6‚F†BvR6âwBFòF†RÖF‚æV6W76'’FòvVæW&FRF–6·0 ––b‡76–ærÂÔ”åõ54”ärbb—4çVÆÄ÷%VæFVbC"†Ö–â’bb—4çVÆÄ÷%VæFVbC"†Ö‚’’° —&WGW&â·&Ö–âÂ&Ö…Ó° —Ð  –çVÕ76W2ÒÖF‚æ6V–Â‡&Ö‚ò76–ær’ÒÖF‚æfÆö÷"‡&Ö–âò76–ær“° ––b†çVÕ76W2âÖ„çVÕ76W2’° ’òò–bF†R6Æ7VÆFVBçVÒöb76W2W†6VVG2Ö„çVÕ76W2Â&V6Æ7VÆFR—@ —76–ærÒ†VÇW'2Cææ–6TçVÒ†çVÕ76W2¢76–æròÖ„çVÕ76W2òVæ—B’¢Væ—C° —Ð  ––b‡7FW6—¦RÇÂ—4çVÆÄ÷%VæFVbC"‡&V6—6–öâ’’° ’òò–b&V6—6–öâ—2æ÷B7V6–f–VBÂ6Æ7VÆFRf7F÷"&6VBöâ76–æp –f7F÷"ÒÖF‚ç÷rƒÂ†VÇW'2CåöFV6–ÖÅÆ6W2‡76–ær’“° —ÒVÇ6R° ’òò–bF†RW6W"7V6–f–VB&V6—6–öâÂ&÷VæBFòF†BçVÖ&W"öbFV6–ÖÂÆ6W0 –f7F÷"ÒÖF‚ç÷rƒÂ&V6—6–öâ“° —76–ærÒÖF‚æ6V–Â‡76–ær¢f7F÷"’òf7F÷#° —Ð  –æ–6TÖ–âÒÖF‚æfÆö÷"‡&Ö–âò76–ær’¢76–æs° –æ–6TÖ‚ÒÖF‚æ6V–Â‡&Ö‚ò76–ær’¢76–æs°  ’òò–bÖ–âÂÖ‚æB7FW6—¦R—26WBæBF†W’Ö¶RâWfVæÇ’76VB66ÆRW6R—Bà ––b‡7FW6—¦R’° ’òò–bfW'’6Æ÷6RFò÷W"v†öÆRçVÖ&W"ÂW6R—Bà ––b‚—4çVÆÄ÷%VæFVbC"†Ö–â’bb†VÇW'2CæÆÖ÷7Ev†öÆR†Ö–âò76–ærÂ76–ærò’’° –æ–6TÖ–âÒÖ–ã° —Ð ––b‚—4çVÆÄ÷%VæFVbC"†Ö‚’bb†VÇW'2CæÆÖ÷7Ev†öÆR†Ö‚ò76–ærÂ76–ærò’’° –æ–6TÖ‚ÒÖƒ° —Ð —Ð  –çVÕ76W2Ò†æ–6TÖ‚Òæ–6TÖ–â’ò76–æs° ’òò–bfW'’6Æ÷6RFò÷W"&÷VæFVBfÇVRÂW6R—Bà ––b††VÇW'2CæÆÖ÷7DWVÇ2†çVÕ76W2ÂÖF‚ç&÷VæB†çVÕ76W2’Â76–ærò’’° –çVÕ76W2ÒÖF‚ç&÷VæB†çVÕ76W2“° —ÒVÇ6R° –çVÕ76W2ÒÖF‚æ6V–Â†çVÕ76W2“° —Ð  –æ–6TÖ–âÒÖF‚ç&÷VæB†æ–6TÖ–â¢f7F÷"’òf7F÷#° –æ–6TÖ‚ÒÖF‚ç&÷VæB†æ–6TÖ‚¢f7F÷"’òf7F÷#° —F–6·2çW6‚†—4çVÆÄ÷%VæFVbC"†Ö–â’òæ–6TÖ–â¢Ö–â“° –f÷"‡f"¢Ò²¢ÂçVÕ76W3²²¶¢’° —F–6·2çW6‚„ÖF‚ç&÷VæB‚†æ–6TÖ–â²¢¢76–ær’¢f7F÷"’òf7F÷"“° —Ð —F–6·2çW6‚†—4çVÆÄ÷%VæFVbC"†Ö‚’òæ–6TÖ‚¢Ö‚“°  —&WGW&âF–6·3°§Ð §f"66ÆUöÆ–æV&&6RÒ6÷&U÷66ÆRæW‡FVæB‡° –vWE&–v‡EfÇVS¢gVæ7F–öâ‡fÇVR’° ––b‡G—VöbfÇVRÓÓÒw7G&–ærr’° —&WGW&â·fÇVS° —Ð —&WGW&â6÷&U÷66ÆRç&÷F÷G—RævWE&–v‡EfÇVRæ6ÆÂ‡F†—2ÂfÇVR“° —ÒÀ  –†æFÆUF–6µ&ævT÷F–öç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"F–6´÷G2Ò÷G2çF–6·3°  ’òò–bvR&Rf÷&6–ær—BFò&Vv–âBÂ'WBv–ÆÂÇ&VG’&R&VæFW&VBöâF†R6†'BÀ ’òòFòæ÷F†–ær6–æ6RF†Bv÷VÆBÖ¶RF†R6†'BvV—&Bâ–bF†RW6W"&VÆÇ’vçG2vV—&B6†'@ ’òò†—2ÂF†W’6âÖçVÆÇ’÷fW'&–FR—@ ––b‡F–6´÷G2æ&Vv–äE¦W&ò’° —f"Ö–å6–vâÒ†VÇW'2Cç6–vâ†ÖRæÖ–â“° —f"Ö…6–vâÒ†VÇW'2Cç6–vâ†ÖRæÖ‚“°  ––b†Ö–å6–vâÂbbÖ…6–vâÂ’° ’òòÖ÷fRF†RF÷WFò  –ÖRæÖ‚Ò° —ÒVÇ6R–b†Ö–å6–vââbbÖ…6–vââ’° ’òòÖ÷fRF†R&÷GFöÒF÷vâFò  –ÖRæÖ–âÒ° —Ð —Ð  —f"6WDÖ–âÒF–6´÷G2æÖ–âÓÒVæFVf–æVBÇÂF–6´÷G2ç7VvvW7FVDÖ–âÓÒVæFVf–æVC° —f"6WDÖ‚ÒF–6´÷G2æÖ‚ÓÒVæFVf–æVBÇÂF–6´÷G2ç7VvvW7FVDÖ‚ÓÒVæFVf–æVC°  ––b‡F–6´÷G2æÖ–âÓÒVæFVf–æVB’° –ÖRæÖ–âÒF–6´÷G2æÖ–ã° —ÒVÇ6R–b‡F–6´÷G2ç7VvvW7FVDÖ–âÓÒVæFVf–æVB’° ––b†ÖRæÖ–âÓÓÒçVÆÂ’° –ÖRæÖ–âÒF–6´÷G2ç7VvvW7FVDÖ–ã° —ÒVÇ6R° –ÖRæÖ–âÒÖF‚æÖ–â†ÖRæÖ–âÂF–6´÷G2ç7VvvW7FVDÖ–â“° —Ð —Ð  ––b‡F–6´÷G2æÖ‚ÓÒVæFVf–æVB’° –ÖRæÖ‚ÒF–6´÷G2æÖƒ° —ÒVÇ6R–b‡F–6´÷G2ç7VvvW7FVDÖ‚ÓÒVæFVf–æVB’° ––b†ÖRæÖ‚ÓÓÒçVÆÂ’° –ÖRæÖ‚ÒF–6´÷G2ç7VvvW7FVDÖƒ° —ÒVÇ6R° –ÖRæÖ‚ÒÖF‚æÖ‚†ÖRæÖ‚ÂF–6´÷G2ç7VvvW7FVDÖ‚“° —Ð —Ð  ––b‡6WDÖ–âÓÒ6WDÖ‚’° ’òòvR6WBF†RÖ–â÷"F†RÖ‚'WBæ÷B&÷F‚à ’òò6òVç7W&RF†B÷W"&ævR—2vöö@ ’òò–çfW'FVB÷"ÆVæwF‚&ævR6â†Vâv†Và ’òòF–6·2æÖ–â—26WBÂæBæòFF6WG2&Rf—6–&ÆP ––b†ÖRæÖ–âãÒÖRæÖ‚’° ––b‡6WDÖ–â’° –ÖRæÖ‚ÒÖRæÖ–â²° —ÒVÇ6R° –ÖRæÖ–âÒÖRæÖ‚Ò° —Ð —Ð —Ð  ––b†ÖRæÖ–âÓÓÒÖRæÖ‚’° –ÖRæÖ‚²³°  ––b‚F–6´÷G2æ&Vv–äE¦W&ò’° –ÖRæÖ–âÒÓ° —Ð —Ð —ÒÀ  –vWEF–6´Æ–Ö—C¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"F–6´÷G2ÒÖRæ÷F–öç2çF–6·3° —f"7FW6—¦RÒF–6´÷G2ç7FW6—¦S° —f"Ö…F–6·4Æ–Ö—BÒF–6´÷G2æÖ…F–6·4Æ–Ö—C° —f"Ö…F–6·3°  ––b‡7FW6—¦R’° –Ö…F–6·2ÒÖF‚æ6V–Â†ÖRæÖ‚ò7FW6—¦R’ÒÖF‚æfÆö÷"†ÖRæÖ–âò7FW6—¦R’²° —ÒVÇ6R° –Ö…F–6·2ÒÖRåö6ö×WFUF–6´Æ–Ö—B‚“° –Ö…F–6·4Æ–Ö—BÒÖ…F–6·4Æ–Ö—BÇÂ° —Ð  ––b†Ö…F–6·4Æ–Ö—B’° –Ö…F–6·2ÒÖF‚æÖ–â†Ö…F–6·4Æ–Ö—BÂÖ…F–6·2“° —Ð  —&WGW&âÖ…F–6·3° —ÒÀ  •ö6ö×WFUF–6´Æ–Ö—C¢gVæ7F–öâ‚’° —&WGW&âçVÖ&W"åõ4•D•dUô”äd”ä•E“° —ÒÀ  –†æFÆTF—&V7F–öæÄ6†ævW3¢æö÷À  –'V–ÆEF–6·3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"F–6´÷G2Ò÷G2çF–6·3°  ’òòf–wW&R÷WBv†BF†RÖ‚çVÖ&W"öbF–6·2vR6â7W÷'B—B—2&6VBöâF†R6—¦Rö` ’òòF†R†—2&Vâf÷"æ÷rÂvR6’F†BF†RÖ–æ–×VÒF–6²76–ær–â—†VÇ2×W7B&RC  ’òòvRÇ6òÆ–Ö—BF†RÖ†–×VÒçVÖ&W"öbF–6·2Fòv†–6‚v—fW2æ–6R7V&W2öà ’òòF†Rw&‚âÖ¶R7W&RvRÇv—2†fRBÆV7B"F–6·0 —f"Ö…F–6·2ÒÖRævWEF–6´Æ–Ö—B‚“° –Ö…F–6·2ÒÖF‚æÖ‚ƒ"ÂÖ…F–6·2“°  —f"çVÖW&–4vVæW&F÷$÷F–öç2Ò° –Ö…F–6·3¢Ö…F–6·2À –Ö–ã¢F–6´÷G2æÖ–âÀ –Öƒ¢F–6´÷G2æÖ‚À —&V6—6–öã¢F–6´÷G2ç&V6—6–öâÀ —7FW6—¦S¢†VÇW'2CçfÇVT÷$FVfVÇB‡F–6´÷G2æf—†VE7FW6—¦RÂF–6´÷G2ç7FW6—¦R —Ó° —f"F–6·2ÒÖRçF–6·2ÒvVæW&FUF–6·2†çVÖW&–4vVæW&F÷$÷F–öç2ÂÖR“°  –ÖRæ†æFÆTF—&V7F–öæÄ6†ævW2‚“°  ’òòBF†—2ö–çBÂvRæVVBFòWFFR÷W"Ö‚æBÖ–âv—fVâF†RF–6²fÇVW26–æ6RvR†fRW‡æFVBF†P ’òò&ævRöbF†R66ÆP –ÖRæÖ‚Ò†VÇW'2CæÖ‚‡F–6·2“° –ÖRæÖ–âÒ†VÇW'2CæÖ–â‡F–6·2“°  ––b‡F–6´÷G2ç&WfW'6R’° —F–6·2ç&WfW'6R‚“°  –ÖRç7F'BÒÖRæÖƒ° –ÖRæVæBÒÖRæÖ–ã° —ÒVÇ6R° –ÖRç7F'BÒÖRæÖ–ã° –ÖRæVæBÒÖRæÖƒ° —Ð —ÒÀ  –6öçfW'EF–6·5FôÆ&VÇ3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° –ÖRçF–6·44çVÖ&W'2ÒÖRçF–6·2ç6Æ–6R‚“° –ÖRç¦W&ôÆ–æT–æFW‚ÒÖRçF–6·2æ–æFW„öbƒ“°  –6÷&U÷66ÆRç&÷F÷G—Ræ6öçfW'EF–6·5FôÆ&VÇ2æ6ÆÂ†ÖR“° —ÒÀ  •ö6öæf–wW&S¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"F–6·2ÒÖRævWEF–6·2‚“° —f"7F'BÒÖRæÖ–ã° —f"VæBÒÖRæÖƒ° —f"öfg6WC°  –6÷&U÷66ÆRç&÷F÷G—Råö6öæf–wW&Ræ6ÆÂ†ÖR“°  ––b†ÖRæ÷F–öç2æöfg6WBbbF–6·2æÆVæwF‚’° –öfg6WBÒ†VæBÒ7F'B’òÖF‚æÖ‚‡F–6·2æÆVæwF‚ÒÂ’ò#° —7F'BÓÒöfg6WC° –VæB³Òöfg6WC° —Ð –ÖRå÷7F'EfÇVRÒ7F'C° –ÖRåöVæEfÇVRÒVæC° –ÖRå÷fÇVU&ævRÒVæBÒ7F'C° —Ð§Ò“° §f"FVfVÇD6öæf–rCÒ° —÷6—F–öã¢vÆVgBrÀ —F–6·3¢° –6ÆÆ&6³¢6÷&U÷F–6·2æf÷&ÖGFW'2æÆ–æV  —Ð§Ó° §f"DTdTÅEôÔ”âÒ°§f"DTdTÅEôÔ‚Ò° ¦gVæ7F–öâvWD÷$7&VFU7F6²‡7F6·2Â7F6¶VBÂÖWF’° —f"¶W’Ò° –ÖWFçG—RÀ ’òòvR†fR6W&FR7F6²f÷"7F6³×VæFVf–æVBFF6WG2v†VâF†R÷G2ç7F6¶VB—2VæFVf–æV@ —7F6¶VBÓÓÒVæFVf–æVBbbÖWFç7F6²ÓÓÒVæFVf–æVBòÖWFæ–æFW‚¢rrÀ –ÖWFç7F6° •Òæ¦ö–â‚râr“°  ––b‡7F6·5¶¶W•ÒÓÓÒVæFVf–æVB’° —7F6·5¶¶W•ÒÒ° —÷3¢µÒÀ –æVs¢µÐ —Ó° —Ð  —&WGW&â7F6·5¶¶W•Ó°§Ð ¦gVæ7F–öâ7F6´FF‡66ÆRÂ7F6·2ÂÖWFÂFF’° —f"÷G2Ò66ÆRæ÷F–öç3° —f"7F6¶VBÒ÷G2ç7F6¶VC° —f"7F6²ÒvWD÷$7&VFU7F6²‡7F6·2Â7F6¶VBÂÖWF“° —f"÷2Ò7F6²ç÷3° —f"æVrÒ7F6²ææVs° —f"–ÆVâÒFFæÆVæwFƒ° —f"’ÂfÇVS°  –f÷"†’Ò²’Â–ÆVã²²¶’’° —fÇVRÒ66ÆRå÷'6UfÇVR†FF¶•Ò“° ––b†—4æâ‡fÇVRæÖ–â’ÇÂ—4æâ‡fÇVRæÖ‚’ÇÂÖWFæFF¶•Òæ†–FFVâ’° –6öçF–çVS° —Ð  —÷5¶•ÒÒ÷5¶•ÒÇÂ° –æVu¶•ÒÒæVu¶•ÒÇÂ°  ––b†÷G2ç&VÆF—fUö–çG2’° —÷5¶•ÒÒ° —ÒVÇ6R–b‡fÇVRæÖ–âÂÇÂfÇVRæÖ‚Â’° –æVu¶•Ò³ÒfÇVRæÖ–ã° —ÒVÇ6R° —÷5¶•Ò³ÒfÇVRæÖƒ° —Ð —Ð§Ð ¦gVæ7F–öâWFFTÖ–äÖ‚‡66ÆRÂÖWFÂFF’° —f"–ÆVâÒFFæÆVæwFƒ° —f"’ÂfÇVS°  –f÷"†’Ò²’Â–ÆVã²²¶’’° —fÇVRÒ66ÆRå÷'6UfÇVR†FF¶•Ò“° ––b†—4æâ‡fÇVRæÖ–â’ÇÂ—4æâ‡fÇVRæÖ‚’ÇÂÖWFæFF¶•Òæ†–FFVâ’° –6öçF–çVS° —Ð  —66ÆRæÖ–âÒÖF‚æÖ–â‡66ÆRæÖ–âÂfÇVRæÖ–â“° —66ÆRæÖ‚ÒÖF‚æÖ‚‡66ÆRæÖ‚ÂfÇVRæÖ‚“° —Ð§Ð §f"66ÆUöÆ–æV"Ò66ÆUöÆ–æV&&6RæW‡FVæB‡° –FWFW&Ö–æTFFÆ–Ö—G3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"6†'BÒÖRæ6†'C° —f"FF6WG2Ò6†'BæFFæFF6WG3° —f"ÖWF6WG2ÒÖRåövWDÖF6†–æuf—6–&ÆTÖWF2‚“° —f"†57F6·2Ò÷G2ç7F6¶VC° —f"7F6·2Ò·Ó° —f"–ÆVâÒÖWF6WG2æÆVæwFƒ° —f"’ÂÖWFÂFFÂfÇVW3°  –ÖRæÖ–âÒçVÖ&W"åõ4•D•dUô”äd”ä•E“° –ÖRæÖ‚ÒçVÖ&W"ääTtD•dUô”äd”ä•E“°  ––b††57F6·2ÓÓÒVæFVf–æVB’° –f÷"†’Ò²†57F6·2bb’Â–ÆVã²²¶’’° –ÖWFÒÖWF6WG5¶•Ó° –†57F6·2ÒÖWFç7F6²ÓÒVæFVf–æVC° —Ð —Ð  –f÷"†’Ò²’Â–ÆVã²²¶’’° –ÖWFÒÖWF6WG5¶•Ó° –FFÒFF6WG5¶ÖWFæ–æFW…ÒæFF° ––b††57F6·2’° —7F6´FF†ÖRÂ7F6·2ÂÖWFÂFF“° —ÒVÇ6R° —WFFTÖ–äÖ‚†ÖRÂÖWFÂFF“° —Ð —Ð  –†VÇW'2CæV6‚‡7F6·2ÂgVæ7F–öâ‡7F6µfÇVW2’° —fÇVW2Ò7F6µfÇVW2ç÷2æ6öæ6B‡7F6µfÇVW2ææVr“° –ÖRæÖ–âÒÖF‚æÖ–â†ÖRæÖ–âÂ†VÇW'2CæÖ–â‡fÇVW2’“° –ÖRæÖ‚ÒÖF‚æÖ‚†ÖRæÖ‚Â†VÇW'2CæÖ‚‡fÇVW2’“° —Ò“°  –ÖRæÖ–âÒ†VÇW'2Cæ—4f–æ—FR†ÖRæÖ–â’bb—4æâ†ÖRæÖ–â’òÖRæÖ–â¢DTdTÅEôÔ”ã° –ÖRæÖ‚Ò†VÇW'2Cæ—4f–æ—FR†ÖRæÖ‚’bb—4æâ†ÖRæÖ‚’òÖRæÖ‚¢DTdTÅEôÔƒ°  ’òò6öÖÖöâ&6R–×ÆVÖVçFF–öâFò†æFÆRF–6·2æÖ–âÂF–6·2æÖ‚ÂF–6·2æ&Vv–äE¦W&ð –ÖRæ†æFÆUF–6µ&ævT÷F–öç2‚“° —ÒÀ  ’òò&WGW&ç2F†RÖ†–×VÒçVÖ&W"öbF–6·2&6VBöâF†R66ÆRF–ÖVç6–öà •ö6ö×WFUF–6´Æ–Ö—C¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"F–6´föçC°  ––b†ÖRæ—4†÷&—¦öçFÂ‚’’° —&WGW&âÖF‚æ6V–Â†ÖRçv–GF‚òC“° —Ð —F–6´föçBÒ†VÇW'2Cæ÷F–öç2å÷'6TföçB†ÖRæ÷F–öç2çF–6·2“° —&WGW&âÖF‚æ6V–Â†ÖRæ†V–v‡BòF–6´föçBæÆ–æT†V–v‡B“° —ÒÀ  ’òò6ÆÆVBgFW"F†RF–6·2&R'V–ÇBâvRæVV@ –†æFÆTF—&V7F–öæÄ6†ævW3¢gVæ7F–öâ‚’° ––b‚F†—2æ—4†÷&—¦öçFÂ‚’’° ’òòvR&R–âfW'F–6Â÷&–VçFF–öââF†RF÷fÇVR—2F†R†–v†W7Bâ6ò&WfW'6RF†R'& —F†—2çF–6·2ç&WfW'6R‚“° —Ð —ÒÀ  –vWDÆ&VÄf÷$–æFWƒ¢gVæ7F–öâ†–æFW‚ÂFF6WD–æFW‚’° —&WGW&âF†—2åövWE66ÆTÆ&VÂ‡F†—2æ6†'BæFFæFF6WG5¶FF6WD–æFW…ÒæFF¶–æFW…Ò“° —ÒÀ  ’òòWF–Ç0 –vWE—†VÄf÷%fÇVS¢gVæ7F–öâ‡fÇVR’° —f"ÖRÒF†—3° —&WGW&âÖRævWE—†VÄf÷$FV6–ÖÂ‚‚¶ÖRævWE&–v‡EfÇVR‡fÇVR’ÒÖRå÷7F'EfÇVR’òÖRå÷fÇVU&ævR“° —ÒÀ  –vWEfÇVTf÷%—†VÃ¢gVæ7F–öâ‡—†VÂ’° —&WGW&âF†—2å÷7F'EfÇVR²F†—2ævWDFV6–ÖÄf÷%—†VÂ‡—†VÂ’¢F†—2å÷fÇVU&ævS° —ÒÀ  –vWE—†VÄf÷%F–6³¢gVæ7F–öâ†–æFW‚’° —f"F–6·2ÒF†—2çF–6·44çVÖ&W'3° ––b†–æFW‚ÂÇÂ–æFW‚âF–6·2æÆVæwF‚Ò’° —&WGW&âçVÆÃ° —Ð —&WGW&âF†—2ævWE—†VÄf÷%fÇVR‡F–6·5¶–æFW…Ò“° —Ð§Ò“° ¢òò”åDU$äÃ¢7FF–2FVfVÇB÷F–öç2Â&Vv—7FW&VB–â7&2ö–æFW‚æ§0§f"öFVfVÇG2CÒFVfVÇD6öæf–rC°§66ÆUöÆ–æV"åöFVfVÇG2ÒöFVfVÇG2C° §f"fÇVT÷$FVfVÇBF"Ò†VÇW'2CçfÇVT÷$FVfVÇC°§f"ÆösÒ†VÇW'2CæÖF‚æÆös° ¢ò¢ ¢¢vVæW&FR6WBöbÆöv&—F†Ö–2F–6·0¢¢&ÒvVæW&F–öä÷F–öç2F†R÷F–öç2W6VBFòvVæW&FRF†RF–6·0¢¢&ÒFF&ævRF†R&ævRöbF†RFF¢¢&WGW&ç2¶çVÖ&W%µ×Ò'&’öbF–6²fÇVW0¢¢ð¦gVæ7F–öâvVæW&FUF–6·2C†vVæW&F–öä÷F–öç2ÂFF&ævR’° —f"F–6·2ÒµÓ°  —f"F–6µfÂÒfÇVT÷$FVfVÇBF"†vVæW&F–öä÷F–öç2æÖ–âÂÖF‚ç÷rƒÂÖF‚æfÆö÷"†Æös†FF&ævRæÖ–â’’’“°  —f"VæDW‡ÒÖF‚æfÆö÷"†Æös†FF&ævRæÖ‚’“° —f"VæE6–væ–f–6æBÒÖF‚æ6V–Â†FF&ævRæÖ‚òÖF‚ç÷rƒÂVæDW‡’“° —f"W‡Â6–væ–f–6æC°  ––b‡F–6µfÂÓÓÒ’° –W‡ÒÖF‚æfÆö÷"†Æös†FF&ævRæÖ–äæ÷E¦W&ò’“° —6–væ–f–6æBÒÖF‚æfÆö÷"†FF&ævRæÖ–äæ÷E¦W&òòÖF‚ç÷rƒÂW‡’“°  —F–6·2çW6‚‡F–6µfÂ“° —F–6µfÂÒ6–væ–f–6æB¢ÖF‚ç÷rƒÂW‡“° —ÒVÇ6R° –W‡ÒÖF‚æfÆö÷"†Æös‡F–6µfÂ’“° —6–væ–f–6æBÒÖF‚æfÆö÷"‡F–6µfÂòÖF‚ç÷rƒÂW‡’“° —Ð —f"&V6—6–öâÒW‡ÂòÖF‚ç÷rƒÂÖF‚æ'2†W‡’’¢°  –Fò° —F–6·2çW6‚‡F–6µfÂ“°  ’²·6–væ–f–6æC° ––b‡6–væ–f–6æBÓÓÒ’° —6–væ–f–6æBÒ° ’²¶W‡° —&V6—6–öâÒW‡ãÒò¢&V6—6–öã° —Ð  —F–6µfÂÒÖF‚ç&÷VæB‡6–væ–f–6æB¢ÖF‚ç÷rƒÂW‡’¢&V6—6–öâ’ò&V6—6–öã° —Òv†–ÆR†W‡ÂVæDW‡ÇÂ†W‡ÓÓÒVæDW‡bb6–væ–f–6æBÂVæE6–væ–f–6æB’“°  —f"Æ7EF–6²ÒfÇVT÷$FVfVÇBF"†vVæW&F–öä÷F–öç2æÖ‚ÂF–6µfÂ“° —F–6·2çW6‚†Æ7EF–6²“°  —&WGW&âF–6·3°§Ð §f"FVfVÇD6öæf–rC"Ò° —÷6—F–öã¢vÆVgBrÀ  ’òòÆ&VÂ6WGF–æw0 —F–6·3¢° –6ÆÆ&6³¢6÷&U÷F–6·2æf÷&ÖGFW'2æÆöv&—F†Ö–0 —Ð§Ó° ¢òòDôDò‡c2“¢6†ævRF†—2Fò÷6—F—fT÷$FVfVÇ@¦gVæ7F–öâæöäæVvF—fT÷$FVfVÇB‡fÇVRÂFVfVÇEfÇVR’° —&WGW&â†VÇW'2Cæ—4f–æ—FR‡fÇVR’bbfÇVRãÒòfÇVR¢FVfVÇEfÇVS°§Ð §f"66ÆUöÆöv&—F†Ö–2Ò6÷&U÷66ÆRæW‡FVæB‡° –FWFW&Ö–æTFFÆ–Ö—G3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"6†'BÒÖRæ6†'C° —f"FF6WG2Ò6†'BæFFæFF6WG3° —f"—4†÷&—¦öçFÂÒÖRæ—4†÷&—¦öçFÂ‚“° –gVæ7F–öâ”DÖF6†W2†ÖWF’° —&WGW&â—4†÷&—¦öçFÂòÖWFç„†—4”BÓÓÒÖRæ–B¢ÖWFç”†—4”BÓÓÒÖRæ–C° —Ð —f"FF6WD–æFW‚ÂÖWFÂfÇVRÂFFÂ’Â–ÆVã°  ’òò6Æ7VÆFR&ævP –ÖRæÖ–âÒçVÖ&W"åõ4•D•dUô”äd”ä•E“° –ÖRæÖ‚ÒçVÖ&W"ääTtD•dUô”äd”ä•E“° –ÖRæÖ–äæ÷E¦W&òÒçVÖ&W"åõ4•D•dUô”äd”ä•E“°  —f"†57F6·2Ò÷G2ç7F6¶VC° ––b††57F6·2ÓÓÒVæFVf–æVB’° –f÷"†FF6WD–æFW‚Ò²FF6WD–æFW‚ÂFF6WG2æÆVæwFƒ²FF6WD–æFW‚²²’° –ÖWFÒ6†'BævWDFF6WDÖWF†FF6WD–æFW‚“° ––b†6†'Bæ—4FF6WEf—6–&ÆR†FF6WD–æFW‚’bb”DÖF6†W2†ÖWF’b` –ÖWFç7F6²ÓÒVæFVf–æVB’° –†57F6·2ÒG'VS° –'&V³° —Ð —Ð —Ð  ––b†÷G2ç7F6¶VBÇÂ†57F6·2’° —f"fÇVW5W%7F6²Ò·Ó°  –f÷"†FF6WD–æFW‚Ò²FF6WD–æFW‚ÂFF6WG2æÆVæwFƒ²FF6WD–æFW‚²²’° –ÖWFÒ6†'BævWDFF6WDÖWF†FF6WD–æFW‚“° —f"¶W’Ò° –ÖWFçG—RÀ ’òòvR†fR6W&FR7F6²f÷"7F6³×VæFVf–æVBFF6WG2v†VâF†R÷G2ç7F6¶VB—2VæFVf–æV@ ’‚†÷G2ç7F6¶VBÓÓÒVæFVf–æVBbbÖWFç7F6²ÓÓÒVæFVf–æVB’òFF6WD–æFW‚¢rr’À –ÖWFç7F6° •Òæ¦ö–â‚râr“°  ––b†6†'Bæ—4FF6WEf—6–&ÆR†FF6WD–æFW‚’bb”DÖF6†W2†ÖWF’’° ––b‡fÇVW5W%7F6µ¶¶W•ÒÓÓÒVæFVf–æVB’° —fÇVW5W%7F6µ¶¶W•ÒÒµÓ° —Ð  –FFÒFF6WG5¶FF6WD–æFW…ÒæFF° –f÷"†’ÒÂ–ÆVâÒFFæÆVæwFƒ²’Â–ÆVã²’²²’° —f"fÇVW2ÒfÇVW5W%7F6µ¶¶W•Ó° —fÇVRÒÖRå÷'6UfÇVR†FF¶•Ò“° ’òò–çfÆ–BÂ†–FFVâæBæVvF—fRfÇVW2&R–væ÷&V@ ––b†—4æâ‡fÇVRæÖ–â’ÇÂ—4æâ‡fÇVRæÖ‚’ÇÂÖWFæFF¶•Òæ†–FFVâÇÂfÇVRæÖ–âÂÇÂfÇVRæÖ‚Â’° –6öçF–çVS° —Ð —fÇVW5¶•ÒÒfÇVW5¶•ÒÇÂ° —fÇVW5¶•Ò³ÒfÇVRæÖƒ° —Ð —Ð —Ð  –†VÇW'2CæV6‚‡fÇVW5W%7F6²ÂgVæ7F–öâ‡fÇVW4f÷%G—R’° ––b‡fÇVW4f÷%G—RæÆVæwF‚â’° —f"Ö–åfÂÒ†VÇW'2CæÖ–â‡fÇVW4f÷%G—R“° —f"Ö…fÂÒ†VÇW'2CæÖ‚‡fÇVW4f÷%G—R“° –ÖRæÖ–âÒÖF‚æÖ–â†ÖRæÖ–âÂÖ–åfÂ“° –ÖRæÖ‚ÒÖF‚æÖ‚†ÖRæÖ‚ÂÖ…fÂ“° —Ð —Ò“°  —ÒVÇ6R° –f÷"†FF6WD–æFW‚Ò²FF6WD–æFW‚ÂFF6WG2æÆVæwFƒ²FF6WD–æFW‚²²’° –ÖWFÒ6†'BævWDFF6WDÖWF†FF6WD–æFW‚“° ––b†6†'Bæ—4FF6WEf—6–&ÆR†FF6WD–æFW‚’bb”DÖF6†W2†ÖWF’’° –FFÒFF6WG5¶FF6WD–æFW…ÒæFF° –f÷"†’ÒÂ–ÆVâÒFFæÆVæwFƒ²’Â–ÆVã²’²²’° —fÇVRÒÖRå÷'6UfÇVR†FF¶•Ò“° ’òò–çfÆ–BÂ†–FFVâæBæVvF—fRfÇVW2&R–væ÷&V@ ––b†—4æâ‡fÇVRæÖ–â’ÇÂ—4æâ‡fÇVRæÖ‚’ÇÂÖWFæFF¶•Òæ†–FFVâÇÂfÇVRæÖ–âÂÇÂfÇVRæÖ‚Â’° –6öçF–çVS° —Ð  –ÖRæÖ–âÒÖF‚æÖ–â‡fÇVRæÖ–âÂÖRæÖ–â“° –ÖRæÖ‚ÒÖF‚æÖ‚‡fÇVRæÖ‚ÂÖRæÖ‚“°  ––b‡fÇVRæÖ–âÓÒ’° –ÖRæÖ–äæ÷E¦W&òÒÖF‚æÖ–â‡fÇVRæÖ–âÂÖRæÖ–äæ÷E¦W&ò“° —Ð —Ð —Ð —Ð —Ð  –ÖRæÖ–âÒ†VÇW'2Cæ—4f–æ—FR†ÖRæÖ–â’òÖRæÖ–â¢çVÆÃ° –ÖRæÖ‚Ò†VÇW'2Cæ—4f–æ—FR†ÖRæÖ‚’òÖRæÖ‚¢çVÆÃ° –ÖRæÖ–äæ÷E¦W&òÒ†VÇW'2Cæ—4f–æ—FR†ÖRæÖ–äæ÷E¦W&ò’òÖRæÖ–äæ÷E¦W&ò¢çVÆÃ°  ’òò6öÖÖöâ&6R–×ÆVÖVçFF–öâFò†æFÆRF–6·2æÖ–âÂF–6·2æÖ€ —F†—2æ†æFÆUF–6µ&ævT÷F–öç2‚“° —ÒÀ  –†æFÆUF–6µ&ævT÷F–öç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"F–6´÷G2ÒÖRæ÷F–öç2çF–6·3° —f"DTdTÅEôÔ”âÒ° —f"DTdTÅEôÔ‚Ò°  –ÖRæÖ–âÒæöäæVvF—fT÷$FVfVÇB‡F–6´÷G2æÖ–âÂÖRæÖ–â“° –ÖRæÖ‚ÒæöäæVvF—fT÷$FVfVÇB‡F–6´÷G2æÖ‚ÂÖRæÖ‚“°  ––b†ÖRæÖ–âÓÓÒÖRæÖ‚’° ––b†ÖRæÖ–âÓÒbbÖRæÖ–âÓÒçVÆÂ’° –ÖRæÖ–âÒÖF‚ç÷rƒÂÖF‚æfÆö÷"†Æös†ÖRæÖ–â’’Ò“° –ÖRæÖ‚ÒÖF‚ç÷rƒÂÖF‚æfÆö÷"†Æös†ÖRæÖ‚’’²“° —ÒVÇ6R° –ÖRæÖ–âÒDTdTÅEôÔ”ã° –ÖRæÖ‚ÒDTdTÅEôÔƒ° —Ð —Ð ––b†ÖRæÖ–âÓÓÒçVÆÂ’° –ÖRæÖ–âÒÖF‚ç÷rƒÂÖF‚æfÆö÷"†Æös†ÖRæÖ‚’’Ò“° —Ð ––b†ÖRæÖ‚ÓÓÒçVÆÂ’° –ÖRæÖ‚ÒÖRæÖ–âÓÒ  “òÖF‚ç÷rƒÂÖF‚æfÆö÷"†Æös†ÖRæÖ–â’’² “¢DTdTÅEôÔƒ° —Ð ––b†ÖRæÖ–äæ÷E¦W&òÓÓÒçVÆÂ’° ––b†ÖRæÖ–ââ’° –ÖRæÖ–äæ÷E¦W&òÒÖRæÖ–ã° —ÒVÇ6R–b†ÖRæÖ‚Â’° –ÖRæÖ–äæ÷E¦W&òÒÖF‚ç÷rƒÂÖF‚æfÆö÷"†Æös†ÖRæÖ‚’’“° —ÒVÇ6R° –ÖRæÖ–äæ÷E¦W&òÒDTdTÅEôÔ”ã° —Ð —Ð —ÒÀ  –'V–ÆEF–6·3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"F–6´÷G2ÒÖRæ÷F–öç2çF–6·3° —f"&WfW'6RÒÖRæ—4†÷&—¦öçFÂ‚“°  —f"vVæW&F–öä÷F–öç2Ò° –Ö–ã¢æöäæVvF—fT÷$FVfVÇB‡F–6´÷G2æÖ–â’À –Öƒ¢æöäæVvF—fT÷$FVfVÇB‡F–6´÷G2æÖ‚ —Ó° —f"F–6·2ÒÖRçF–6·2ÒvVæW&FUF–6·2C†vVæW&F–öä÷F–öç2ÂÖR“°  ’òòBF†—2ö–çBÂvRæVVBFòWFFR÷W"Ö‚æBÖ–âv—fVâF†RF–6²fÇVW26–æ6RvR†fRW‡æFVBF†P ’òò&ævRöbF†R66ÆP –ÖRæÖ‚Ò†VÇW'2CæÖ‚‡F–6·2“° –ÖRæÖ–âÒ†VÇW'2CæÖ–â‡F–6·2“°  ––b‡F–6´÷G2ç&WfW'6R’° —&WfW'6RÒ&WfW'6S° –ÖRç7F'BÒÖRæÖƒ° –ÖRæVæBÒÖRæÖ–ã° —ÒVÇ6R° –ÖRç7F'BÒÖRæÖ–ã° –ÖRæVæBÒÖRæÖƒ° —Ð ––b‡&WfW'6R’° —F–6·2ç&WfW'6R‚“° —Ð —ÒÀ  –6öçfW'EF–6·5FôÆ&VÇ3¢gVæ7F–öâ‚’° —F†—2çF–6µfÇVW2ÒF†—2çF–6·2ç6Æ–6R‚“°  –6÷&U÷66ÆRç&÷F÷G—Ræ6öçfW'EF–6·5FôÆ&VÇ2æ6ÆÂ‡F†—2“° —ÒÀ  ’òòvWBF†R6÷'&V7BFööÇF—Æ&VÀ –vWDÆ&VÄf÷$–æFWƒ¢gVæ7F–öâ†–æFW‚ÂFF6WD–æFW‚’° —&WGW&âF†—2åövWE66ÆTÆ&VÂ‡F†—2æ6†'BæFFæFF6WG5¶FF6WD–æFW…ÒæFF¶–æFW…Ò“° —ÒÀ  –vWE—†VÄf÷%F–6³¢gVæ7F–öâ†–æFW‚’° —f"F–6·2ÒF†—2çF–6µfÇVW3° ––b†–æFW‚ÂÇÂ–æFW‚âF–6·2æÆVæwF‚Ò’° —&WGW&âçVÆÃ° —Ð —&WGW&âF†—2ævWE—†VÄf÷%fÇVR‡F–6·5¶–æFW…Ò“° —ÒÀ  ’ò¢  ’¢&WGW&ç2F†RfÇVRöbF†Rf—'7BF–6²à ’¢&Ò¶çVÖ&W'ÒfÇVRÒF†RÖ–æ–×VÒæ÷B¦W&òfÇVRà ’¢&WGW&â¶çVÖ&W'ÒF†Rf—'7BF–6²fÇVRà ’¢&—fFP ’¢ð •övWDf—'7EF–6µfÇVS¢gVæ7F–öâ‡fÇVR’° —f"W‡ÒÖF‚æfÆö÷"†Æös‡fÇVR’“° —f"6–væ–f–6æBÒÖF‚æfÆö÷"‡fÇVRòÖF‚ç÷rƒÂW‡’“°  —&WGW&â6–væ–f–6æB¢ÖF‚ç÷rƒÂW‡“° —ÒÀ  •ö6öæf–wW&S¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"7F'BÒÖRæÖ–ã° —f"öfg6WBÒ°  –6÷&U÷66ÆRç&÷F÷G—Råö6öæf–wW&Ræ6ÆÂ†ÖR“°  ––b‡7F'BÓÓÒ’° —7F'BÒÖRåövWDf—'7EF–6µfÇVR†ÖRæÖ–äæ÷E¦W&ò“° –öfg6WBÒfÇVT÷$FVfVÇBF"†ÖRæ÷F–öç2çF–6·2æföçE6—¦RÂ6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇDföçE6—¦R’òÖRåöÆVæwFƒ° —Ð  –ÖRå÷7F'EfÇVRÒÆös‡7F'B“° –ÖRå÷fÇVTöfg6WBÒöfg6WC° –ÖRå÷fÇVU&ævRÒ†Æös†ÖRæÖ‚’ÒÆös‡7F'B’’òƒÒöfg6WB“° —ÒÀ  –vWE—†VÄf÷%fÇVS¢gVæ7F–öâ‡fÇVR’° —f"ÖRÒF†—3° —f"FV6–ÖÂÒ°  —fÇVRÒ¶ÖRævWE&–v‡EfÇVR‡fÇVR“°  ––b‡fÇVRâÖRæÖ–âbbfÇVRâ’° –FV6–ÖÂÒ†Æös‡fÇVR’ÒÖRå÷7F'EfÇVR’òÖRå÷fÇVU&ævR²ÖRå÷fÇVTöfg6WC° —Ð —&WGW&âÖRævWE—†VÄf÷$FV6–ÖÂ†FV6–ÖÂ“° —ÒÀ  –vWEfÇVTf÷%—†VÃ¢gVæ7F–öâ‡—†VÂ’° —f"ÖRÒF†—3° —f"FV6–ÖÂÒÖRævWDFV6–ÖÄf÷%—†VÂ‡—†VÂ“° —&WGW&âFV6–ÖÂÓÓÒbbÖRæÖ–âÓÓÒ  “ò  “¢ÖF‚ç÷rƒÂÖRå÷7F'EfÇVR²†FV6–ÖÂÒÖRå÷fÇVTöfg6WB’¢ÖRå÷fÇVU&ævR“° —Ð§Ò“° ¢òò”åDU$äÃ¢7FF–2FVfVÇB÷F–öç2Â&Vv—7FW&VB–â7&2ö–æFW‚æ§0§f"öFVfVÇG2C"ÒFVfVÇD6öæf–rC#°§66ÆUöÆöv&—F†Ö–2åöFVfVÇG2ÒöFVfVÇG2C#° §f"fÇVT÷$FVfVÇBF2Ò†VÇW'2CçfÇVT÷$FVfVÇC°§f"fÇVTD–æFW„÷$FVfVÇBCÒ†VÇW'2CçfÇVTD–æFW„÷$FVfVÇC°§f"&W6öÇfRCBÒ†VÇW'2Cæ÷F–öç2ç&W6öÇfS° §f"FVfVÇD6öæf–rC2Ò° –F—7Æ“¢G'VRÀ  ’òò&ööÆVâÒv†WF†W"Fòæ–ÖFR66Æ–ærF†R6†'Bg&öÒF†R6VçG&P –æ–ÖFS¢G'VRÀ —÷6—F–öã¢v6†'D&VrÀ  –ævÆTÆ–æW3¢° –F—7Æ“¢G'VRÀ –6öÆ÷#¢w&v&ƒÃÃÃã’rÀ –Æ–æUv–GFƒ¢À –&÷&FW$F6ƒ¢µÒÀ –&÷&FW$F6„öfg6WC¢ã  —ÒÀ  –w&–DÆ–æW3¢° –6—&7VÆ#¢fÇ6P —ÒÀ  ’òòÆ&VÂ6WGF–æw0 —F–6·3¢° ’òò&ööÆVâÒ6†÷r&6¶G&÷FòF†R66ÆRÆ&VÀ —6†÷tÆ&VÄ&6¶G&÷¢G'VRÀ  ’òò7G&–ærÒF†R6öÆ÷W"öbF†RÆ&VÂ&6¶G&÷  –&6¶G&÷6öÆ÷#¢w&v&ƒ#SRÃ#SRÃ#SRÃãsR’rÀ  ’òòçVÖ&W"ÒF†R&6¶G&÷FF–ær&÷fRb&VÆ÷rF†RÆ&VÂ–â—†VÇ0 –&6¶G&÷FF–æu“¢"À  ’òòçVÖ&W"ÒF†R&6¶G&÷FF–ærFòF†R6–FRöbF†RÆ&VÂ–â—†VÇ0 –&6¶G&÷FF–æuƒ¢"À  –6ÆÆ&6³¢6÷&U÷F–6·2æf÷&ÖGFW'2æÆ–æV  —ÒÀ  —ö–çDÆ&VÇ3¢° ’òò&ööÆVâÒ–bG'VRÂ6†÷rö–çBÆ&VÇ0 –F—7Æ“¢G'VRÀ  ’òòçVÖ&W"Òö–çBÆ&VÂföçB6—¦R–â—†VÇ0 –föçE6—¦S¢À  ’òògVæ7F–öâÒW6VBFò6öçfW'Bö–çBÆ&VÇ0 –6ÆÆ&6³¢gVæ7F–öâ†Æ&VÂ’° —&WGW&âÆ&VÃ° —Ð —Ð§Ó° ¦gVæ7F–öâvWEF–6´&6¶G&÷†V–v‡B†÷G2’° —f"F–6´÷G2Ò÷G2çF–6·3°  ––b‡F–6´÷G2æF—7Æ’bb÷G2æF—7Æ’’° —&WGW&âfÇVT÷$FVfVÇBF2‡F–6´÷G2æföçE6—¦RÂ6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇDföçE6—¦R’²F–6´÷G2æ&6¶G&÷FF–æu’¢#° —Ð —&WGW&â°§Ð ¦gVæ7F–öâÖV7W&TÆ&VÅ6—¦R†7G‚ÂÆ–æT†V–v‡BÂÆ&VÂ’° ––b††VÇW'2Cæ—4'&’†Æ&VÂ’’° —&WGW&â° —s¢†VÇW'2CæÆöævW7EFW‡B†7G‚Â7G‚æföçBÂÆ&VÂ’À –ƒ¢Æ&VÂæÆVæwF‚¢Æ–æT†V–v‡@ —Ó° —Ð  —&WGW&â° —s¢7G‚æÖV7W&UFW‡B†Æ&VÂ’çv–GF‚À –ƒ¢Æ–æT†V–v‡@ —Ó°§Ð ¦gVæ7F–öâFWFW&Ö–æTÆ–Ö—G2†ævÆRÂ÷2Â6—¦RÂÖ–âÂÖ‚’° ––b†ævÆRÓÓÒÖ–âÇÂævÆRÓÓÒÖ‚’° —&WGW&â° —7F'C¢÷2Ò‡6—¦Rò"’À –VæC¢÷2²‡6—¦Rò" —Ó° —ÒVÇ6R–b†ævÆRÂÖ–âÇÂævÆRâÖ‚’° —&WGW&â° —7F'C¢÷2Ò6—¦RÀ –VæC¢÷0 —Ó° —Ð  —&WGW&â° —7F'C¢÷2À –VæC¢÷2²6—¦P —Ó°§Ð ¢ò¢ ¢¢†VÇW"gVæ7F–öâFòf—B&F–ÂÆ–æV"66ÆRv—F‚ö–çBÆ&VÇ0¢¢ð¦gVæ7F–öâf—Ev—F…ö–çDÆ&VÇ2‡66ÆR’°  ’òò&–v‡BÂF†—2—2&VÆÇ’6öægW6–æræBF†W&R—2Æ÷BöbÖF‡2vö–æröâ†W&P ’òòF†Rv—7BöbF†R&ö&ÆVÒ—2†W&S¢‡GG3¢òöv—7Bæv—F‡V"æ6öÒöæææ–6²óc“f63–3SVcF#&V#†fS ’òð ’òò&V7F–öã¢‡GG3¢òöFÂæG&÷&÷‡W6W&6öçFVçBæ6öÒ÷Ró3Cc3c2÷Föö×V6‡66–Væ6Ræv–` ’òð ’òò6öÇWF–öã  ’òð ’òòvR77VÖRF†R&F—W2öbF†RöÇ–vöâ—2†ÆbF†R6—¦RöbF†R6çf2Bf—'7@ ’òòBV6‚–æFW‚vR6†V6²–bF†RFW‡B÷fW&Æ2à ’òð ’òòv†W&R—BFöW2ÂvR7F÷&RF†BævÆRæBF†B–æFW‚à ’òð ’òògFW"f–æF–ærF†RÆ&vW7B–æFW‚æBævÆRvR6Æ7VÆFR†÷r×V6‚vRæVVBFò&VÖ÷fP ’òòg&öÒF†R6†R&F—W2FòÖ÷fRF†Rö–çB–çv&G2'’F†B‚à ’òð ’òòvRfW&vRF†RÆVgBæB&–v‡BF—7Fæ6W2FòvWBF†RÖ†–×VÒ6†R&F—W2F†B6âf—B–âF†R&÷€ ’òòÆöærv—F‚Æ&VÇ2à ’òð ’òòöæ6RvR†fRF†BÂvR6âf–æBF†R6VçG&Rö–çBf÷"F†R6†'BÂ'’F¶–ærF†R‚FW‡B&÷G'W6–öà ’òòöâV6‚6–FRÂ&VÖ÷f–ærF†Bg&öÒF†R6—¦RÂ†Çf–ær—BæBFF–ærF†RÆVgB‚&÷G'W6–öâv–GF‚à ’òð ’òòF†—2v–ÆÂÖVâvR†fR6†Rf—GFVBFòF†R6çf2Â2Æ&vR2—B6â&Rv—F‚F†RÆ&VÇ0 ’òòæB÷6—F–öâ—B–âF†RÖ÷7B76RVff–6–VçBÖææW  ’òð ’òò‡GG3¢òöFÂæG&÷&÷‡W6W&6öçFVçBæ6öÒ÷Ró3Cc3c2÷–V‡66–Væ6Ræv–`  —f"ÄföçBÒ†VÇW'2Cæ÷F–öç2å÷'6TföçB‡66ÆRæ÷F–öç2çö–çDÆ&VÇ2“°  ’òòvWBÖ†–×VÒ&F—W2öbF†RöÇ–vöââV—F†W"†ÆbF†R†V–v‡B†Ö–çW2F†RFW‡Bv–GF‚’÷"†ÆbF†Rv–GF‚à ’òòW6RF†—2Fò6Æ7VÆFRF†Röfg6WB²6†ævRâÒÖ¶R7W&RÂõ"&÷G'W6–öâ—2BÆV7BFò7F÷—77VW2v—F‚6VçG&Rö–çG0 —f"gW'F†W7DÆ–Ö—G2Ò° –Ã¢À —#¢66ÆRçv–GF‚À —C¢À –#¢66ÆRæ†V–v‡BÒ66ÆRçFF–æuF÷  —Ó° —f"gW'F†W7DævÆW2Ò·Ó° —f"’ÂFW‡E6—¦RÂö–çE÷6—F–öã°  —66ÆRæ7G‚æföçBÒÄföçBç7G&–æs° —66ÆRå÷ö–çDÆ&VÅ6—¦W2ÒµÓ°  —f"fÇVT6÷VçBÒ66ÆRæ6†'BæFFæÆ&VÇ2æÆVæwFƒ° –f÷"†’Ò²’ÂfÇVT6÷VçC²’²²’° —ö–çE÷6—F–öâÒ66ÆRævWEö–çE÷6—F–öâ†’Â66ÆRæG&v–æt&V²R“° —FW‡E6—¦RÒÖV7W&TÆ&VÅ6—¦R‡66ÆRæ7G‚ÂÄföçBæÆ–æT†V–v‡BÂ66ÆRçö–çDÆ&VÇ5¶•Ò“° —66ÆRå÷ö–çDÆ&VÅ6—¦W5¶•ÒÒFW‡E6—¦S°  ’òòFBV'FW"6—&6ÆRFòÖ¶RFVw&VRÖVâF÷öb6—&6ÆP —f"ævÆU&F–ç2Ò66ÆRævWD–æFW„ævÆR†’“° —f"ævÆRÒ†VÇW'2CçFôFVw&VW2†ævÆU&F–ç2’R3c° —f"„Æ–Ö—G2ÒFWFW&Ö–æTÆ–Ö—G2†ævÆRÂö–çE÷6—F–öâç‚ÂFW‡E6—¦RçrÂÂƒ“° —f"dÆ–Ö—G2ÒFWFW&Ö–æTÆ–Ö—G2†ævÆRÂö–çE÷6—F–öâç’ÂFW‡E6—¦Ræ‚Â“Â#s“°  ––b†„Æ–Ö—G2ç7F'BÂgW'F†W7DÆ–Ö—G2æÂ’° –gW'F†W7DÆ–Ö—G2æÂÒ„Æ–Ö—G2ç7F'C° –gW'F†W7DævÆW2æÂÒævÆU&F–ç3° —Ð  ––b†„Æ–Ö—G2æVæBâgW'F†W7DÆ–Ö—G2ç"’° –gW'F†W7DÆ–Ö—G2ç"Ò„Æ–Ö—G2æVæC° –gW'F†W7DævÆW2ç"ÒævÆU&F–ç3° —Ð  ––b‡dÆ–Ö—G2ç7F'BÂgW'F†W7DÆ–Ö—G2çB’° –gW'F†W7DÆ–Ö—G2çBÒdÆ–Ö—G2ç7F'C° –gW'F†W7DævÆW2çBÒævÆU&F–ç3° —Ð  ––b‡dÆ–Ö—G2æVæBâgW'F†W7DÆ–Ö—G2æ"’° –gW'F†W7DÆ–Ö—G2æ"ÒdÆ–Ö—G2æVæC° –gW'F†W7DævÆW2æ"ÒævÆU&F–ç3° —Ð —Ð  —66ÆRç6WE&VGV7F–öç2‡66ÆRæG&v–æt&VÂgW'F†W7DÆ–Ö—G2ÂgW'F†W7DævÆW2“°§Ð ¦gVæ7F–öâvWEFW‡DÆ–väf÷$ævÆR†ævÆR’° ––b†ævÆRÓÓÒÇÂævÆRÓÓÒƒ’° —&WGW&âv6VçFW"s° —ÒVÇ6R–b†ævÆRÂƒ’° —&WGW&âvÆVgBs° —Ð  —&WGW&âw&–v‡Bs°§Ð ¦gVæ7F–öâf–ÆÅFW‡B†7G‚ÂFW‡BÂ÷6—F–öâÂÆ–æT†V–v‡B’° —f"’Ò÷6—F–öâç’²Æ–æT†V–v‡Bò#° —f"’Â–ÆVã°  ––b††VÇW'2Cæ—4'&’‡FW‡B’’° –f÷"†’ÒÂ–ÆVâÒFW‡BæÆVæwFƒ²’Â–ÆVã²²¶’’° –7G‚æf–ÆÅFW‡B‡FW‡E¶•ÒÂ÷6—F–öâç‚Â’“° —’³ÒÆ–æT†V–v‡C° —Ð —ÒVÇ6R° –7G‚æf–ÆÅFW‡B‡FW‡BÂ÷6—F–öâç‚Â’“° —Ð§Ð ¦gVæ7F–öâF§W7Eö–çE÷6—F–öäf÷$Æ&VÄ†V–v‡B†ævÆRÂFW‡E6—¦RÂ÷6—F–öâ’° ––b†ævÆRÓÓÒ“ÇÂævÆRÓÓÒ#s’° —÷6—F–öâç’ÓÒ‡FW‡E6—¦Ræ‚ò"“° —ÒVÇ6R–b†ævÆRâ#sÇÂævÆRÂ“’° —÷6—F–öâç’ÓÒFW‡E6—¦Ræƒ° —Ð§Ð ¦gVæ7F–öâG&uö–çDÆ&VÇ2‡66ÆR’° —f"7G‚Ò66ÆRæ7Gƒ° —f"÷G2Ò66ÆRæ÷F–öç3° —f"ö–çDÆ&VÄ÷G2Ò÷G2çö–çDÆ&VÇ3° —f"F–6´&6¶G&÷†V–v‡BÒvWEF–6´&6¶G&÷†V–v‡B†÷G2“° —f"÷WFW$F—7Fæ6RÒ66ÆRævWDF—7Fæ6Tg&öÔ6VçFW$f÷%fÇVR†÷G2çF–6·2ç&WfW'6Rò66ÆRæÖ–â¢66ÆRæÖ‚“° —f"ÄföçBÒ†VÇW'2Cæ÷F–öç2å÷'6TföçB‡ö–çDÆ&VÄ÷G2“°  –7G‚ç6fR‚“°  –7G‚æföçBÒÄföçBç7G&–æs° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs°  –f÷"‡f"’Ò66ÆRæ6†'BæFFæÆ&VÇ2æÆVæwF‚Ò²’ãÒ²’ÒÒ’° ’òòW‡G&—†VÇ2÷WBf÷"6öÖRÆ&VÂ76–æp —f"W‡G&Ò†’ÓÓÒòF–6´&6¶G&÷†V–v‡Bò"¢“° —f"ö–çDÆ&VÅ÷6—F–öâÒ66ÆRævWEö–çE÷6—F–öâ†’Â÷WFW$F—7Fæ6R²W‡G&²R“°  ’òò¶VWF†—2–âÆö÷6–æ6RvRÖ’7W÷'B'&’&÷W'F–W2†W&P —f"ö–çDÆ&VÄföçD6öÆ÷"ÒfÇVTD–æFW„÷$FVfVÇBC‡ö–çDÆ&VÄ÷G2æföçD6öÆ÷"Â’Â6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇDföçD6öÆ÷"“° –7G‚æf–ÆÅ7G–ÆRÒö–çDÆ&VÄföçD6öÆ÷#°  —f"ævÆU&F–ç2Ò66ÆRævWD–æFW„ævÆR†’“° —f"ævÆRÒ†VÇW'2CçFôFVw&VW2†ævÆU&F–ç2“° –7G‚çFW‡DÆ–vâÒvWEFW‡DÆ–väf÷$ævÆR†ævÆR“° –F§W7Eö–çE÷6—F–öäf÷$Æ&VÄ†V–v‡B†ævÆRÂ66ÆRå÷ö–çDÆ&VÅ6—¦W5¶•ÒÂö–çDÆ&VÅ÷6—F–öâ“° –f–ÆÅFW‡B†7G‚Â66ÆRçö–çDÆ&VÇ5¶•ÒÂö–çDÆ&VÅ÷6—F–öâÂÄföçBæÆ–æT†V–v‡B“° —Ð –7G‚ç&W7F÷&R‚“°§Ð ¦gVæ7F–öâG&u&F—W4Æ–æR‡66ÆRÂw&–DÆ–æT÷G2Â&F—W2Â–æFW‚’° —f"7G‚Ò66ÆRæ7Gƒ° —f"6—&7VÆ"Òw&–DÆ–æT÷G2æ6—&7VÆ#° —f"fÇVT6÷VçBÒ66ÆRæ6†'BæFFæÆ&VÇ2æÆVæwFƒ° —f"Æ–æT6öÆ÷"ÒfÇVTD–æFW„÷$FVfVÇBC†w&–DÆ–æT÷G2æ6öÆ÷"Â–æFW‚Ò“° —f"Æ–æUv–GF‚ÒfÇVTD–æFW„÷$FVfVÇBC†w&–DÆ–æT÷G2æÆ–æUv–GF‚Â–æFW‚Ò“° —f"ö–çE÷6—F–öã°  ––b‚‚6—&7VÆ"bbfÇVT6÷VçB’ÇÂÆ–æT6öÆ÷"ÇÂÆ–æUv–GF‚’° —&WGW&ã° —Ð  –7G‚ç6fR‚“° –7G‚ç7G&ö¶U7G–ÆRÒÆ–æT6öÆ÷#° –7G‚æÆ–æUv–GF‚ÒÆ–æUv–GFƒ° ––b†7G‚ç6WDÆ–æTF6‚’° –7G‚ç6WDÆ–æTF6‚†w&–DÆ–æT÷G2æ&÷&FW$F6‚ÇÂµÒ“° –7G‚æÆ–æTF6„öfg6WBÒw&–DÆ–æT÷G2æ&÷&FW$F6„öfg6WBÇÂã° —Ð  –7G‚æ&Vv–åF‚‚“° ––b†6—&7VÆ"’° ’òòG&r6—&7VÆ"&72&WGvVVâF†Rö–çG0 –7G‚æ&2‡66ÆRç„6VçFW"Â66ÆRç”6VçFW"Â&F—W2ÂÂÖF‚å’¢"“° —ÒVÇ6R° ’òòG&r7G&–v‡BÆ–æW26öææV7F–ærV6‚–æFW€ —ö–çE÷6—F–öâÒ66ÆRævWEö–çE÷6—F–öâƒÂ&F—W2“° –7G‚æÖ÷fUFò‡ö–çE÷6—F–öâç‚Âö–çE÷6—F–öâç’“°  –f÷"‡f"’Ò²’ÂfÇVT6÷VçC²’²²’° —ö–çE÷6—F–öâÒ66ÆRævWEö–çE÷6—F–öâ†’Â&F—W2“° –7G‚æÆ–æUFò‡ö–çE÷6—F–öâç‚Âö–çE÷6—F–öâç’“° —Ð —Ð –7G‚æ6Æ÷6UF‚‚“° –7G‚ç7G&ö¶R‚“° –7G‚ç&W7F÷&R‚“°§Ð ¦gVæ7F–öâçVÖ&W$÷%¦W&ò‡&Ò’° —&WGW&â†VÇW'2Cæ—4çVÖ&W"‡&Ò’ò&Ò¢°§Ð §f"66ÆU÷&F–ÄÆ–æV"Ò66ÆUöÆ–æV&&6RæW‡FVæB‡° —6WDF–ÖVç6–öç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3°  ’òò6WBF†RVæ6öç7G&–æVBF–ÖVç6–öâ&Vf÷&RÆ&VÂ&÷FF–öà –ÖRçv–GF‚ÒÖRæÖ…v–GFƒ° –ÖRæ†V–v‡BÒÖRæÖ„†V–v‡C° –ÖRçFF–æuF÷ÒvWEF–6´&6¶G&÷†V–v‡B†ÖRæ÷F–öç2’ò#° –ÖRç„6VçFW"ÒÖF‚æfÆö÷"†ÖRçv–GF‚ò"“° –ÖRç”6VçFW"ÒÖF‚æfÆö÷"‚†ÖRæ†V–v‡BÒÖRçFF–æuF÷’ò"“° –ÖRæG&v–æt&VÒÖF‚æÖ–â†ÖRæ†V–v‡BÒÖRçFF–æuF÷ÂÖRçv–GF‚’ò#° —ÒÀ  –FWFW&Ö–æTFFÆ–Ö—G3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"Ö–âÒçVÖ&W"åõ4•D•dUô”äd”ä•E“° —f"Ö‚ÒçVÖ&W"ääTtD•dUô”äd”ä•E“°  –†VÇW'2CæV6‚†6†'BæFFæFF6WG2ÂgVæ7F–öâ†FF6WBÂFF6WD–æFW‚’° ––b†6†'Bæ—4FF6WEf—6–&ÆR†FF6WD–æFW‚’’° —f"ÖWFÒ6†'BævWDFF6WDÖWF†FF6WD–æFW‚“°  –†VÇW'2CæV6‚†FF6WBæFFÂgVæ7F–öâ‡&ufÇVRÂ–æFW‚’° —f"fÇVRÒ¶ÖRævWE&–v‡EfÇVR‡&ufÇVR“° ––b†—4æâ‡fÇVR’ÇÂÖWFæFF¶–æFW…Òæ†–FFVâ’° —&WGW&ã° —Ð  –Ö–âÒÖF‚æÖ–â‡fÇVRÂÖ–â“° –Ö‚ÒÖF‚æÖ‚‡fÇVRÂÖ‚“° —Ò“° —Ð —Ò“°  –ÖRæÖ–âÒ†Ö–âÓÓÒçVÖ&W"åõ4•D•dUô”äd”ä•E’ò¢Ö–â“° –ÖRæÖ‚Ò†Ö‚ÓÓÒçVÖ&W"ääTtD•dUô”äd”ä•E’ò¢Ö‚“°  ’òò6öÖÖöâ&6R–×ÆVÖVçFF–öâFò†æFÆRF–6·2æÖ–âÂF–6·2æÖ‚ÂF–6·2æ&Vv–äE¦W&ð –ÖRæ†æFÆUF–6µ&ævT÷F–öç2‚“° —ÒÀ  ’òò&WGW&ç2F†RÖ†–×VÒçVÖ&W"öbF–6·2&6VBöâF†R66ÆRF–ÖVç6–öà •ö6ö×WFUF–6´Æ–Ö—C¢gVæ7F–öâ‚’° —&WGW&âÖF‚æ6V–Â‡F†—2æG&v–æt&VòvWEF–6´&6¶G&÷†V–v‡B‡F†—2æ÷F–öç2’“° —ÒÀ  –6öçfW'EF–6·5FôÆ&VÇ3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3°  —66ÆUöÆ–æV&&6Rç&÷F÷G—Ræ6öçfW'EF–6·5FôÆ&VÇ2æ6ÆÂ†ÖR“°  ’òòö–çBÆ&VÇ0 –ÖRçö–çDÆ&VÇ2ÒÖRæ6†'BæFFæÆ&VÇ2æÖ†gVæ7F–öâ‚’° —f"Æ&VÂÒ†VÇW'2Cæ6ÆÆ&6²†ÖRæ÷F–öç2çö–çDÆ&VÇ2æ6ÆÆ&6²Â&wVÖVçG2ÂÖR“° —&WGW&âÆ&VÂÇÂÆ&VÂÓÓÒòÆ&VÂ¢rs° —Ò“° —ÒÀ  –vWDÆ&VÄf÷$–æFWƒ¢gVæ7F–öâ†–æFW‚ÂFF6WD–æFW‚’° —&WGW&â·F†—2ævWE&–v‡EfÇVR‡F†—2æ6†'BæFFæFF6WG5¶FF6WD–æFW…ÒæFF¶–æFW…Ò“° —ÒÀ  –f—C¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3°  ––b†÷G2æF—7Æ’bb÷G2çö–çDÆ&VÇ2æF—7Æ’’° –f—Ev—F…ö–çDÆ&VÇ2†ÖR“° —ÒVÇ6R° –ÖRç6WD6VçFW%ö–çBƒÂÂÂ“° —Ð —ÒÀ  ’ò¢  ’¢6WB&F—W2&VGV7F–öç2æBFWFW&Ö–æRæWr&F—W2æB6VçFW"ö–ç@ ’¢&—fFP ’¢ð —6WE&VGV7F–öç3¢gVæ7F–öâ†Æ&vW7E÷76–&ÆU&F—W2ÂgW'F†W7DÆ–Ö—G2ÂgW'F†W7DævÆW2’° —f"ÖRÒF†—3° —f"&F—W5&VGV7F–öäÆVgBÒgW'F†W7DÆ–Ö—G2æÂòÖF‚ç6–â†gW'F†W7DævÆW2æÂ“° —f"&F—W5&VGV7F–öå&–v‡BÒÖF‚æÖ‚†gW'F†W7DÆ–Ö—G2ç"ÒÖRçv–GF‚Â’òÖF‚ç6–â†gW'F†W7DævÆW2ç"“° —f"&F—W5&VGV7F–öåF÷ÒÖgW'F†W7DÆ–Ö—G2çBòÖF‚æ6÷2†gW'F†W7DævÆW2çB“° —f"&F—W5&VGV7F–öä&÷GFöÒÒÔÖF‚æÖ‚†gW'F†W7DÆ–Ö—G2æ"Ò†ÖRæ†V–v‡BÒÖRçFF–æuF÷’Â’òÖF‚æ6÷2†gW'F†W7DævÆW2æ"“°  —&F—W5&VGV7F–öäÆVgBÒçVÖ&W$÷%¦W&ò‡&F—W5&VGV7F–öäÆVgB“° —&F—W5&VGV7F–öå&–v‡BÒçVÖ&W$÷%¦W&ò‡&F—W5&VGV7F–öå&–v‡B“° —&F—W5&VGV7F–öåF÷ÒçVÖ&W$÷%¦W&ò‡&F—W5&VGV7F–öåF÷“° —&F—W5&VGV7F–öä&÷GFöÒÒçVÖ&W$÷%¦W&ò‡&F—W5&VGV7F–öä&÷GFöÒ“°  –ÖRæG&v–æt&VÒÖF‚æÖ–â€ ”ÖF‚æfÆö÷"†Æ&vW7E÷76–&ÆU&F—W2Ò‡&F—W5&VGV7F–öäÆVgB²&F—W5&VGV7F–öå&–v‡B’ò"’À ”ÖF‚æfÆö÷"†Æ&vW7E÷76–&ÆU&F—W2Ò‡&F—W5&VGV7F–öåF÷²&F—W5&VGV7F–öä&÷GFöÒ’ò"’“° –ÖRç6WD6VçFW%ö–çB‡&F—W5&VGV7F–öäÆVgBÂ&F—W5&VGV7F–öå&–v‡BÂ&F—W5&VGV7F–öåF÷Â&F—W5&VGV7F–öä&÷GFöÒ“° —ÒÀ  —6WD6VçFW%ö–çC¢gVæ7F–öâ†ÆVgDÖ÷fVÖVçBÂ&–v‡DÖ÷fVÖVçBÂF÷Ö÷fVÖVçBÂ&÷GFöÔÖ÷fVÖVçB’° —f"ÖRÒF†—3° —f"Ö…&–v‡BÒÖRçv–GF‚Ò&–v‡DÖ÷fVÖVçBÒÖRæG&v–æt&V° —f"Ö„ÆVgBÒÆVgDÖ÷fVÖVçB²ÖRæG&v–æt&V° —f"Ö…F÷ÒF÷Ö÷fVÖVçB²ÖRæG&v–æt&V° —f"Ö„&÷GFöÒÒ†ÖRæ†V–v‡BÒÖRçFF–æuF÷’Ò&÷GFöÔÖ÷fVÖVçBÒÖRæG&v–æt&V°  –ÖRç„6VçFW"ÒÖF‚æfÆö÷"‚‚†Ö„ÆVgB²Ö…&–v‡B’ò"’²ÖRæÆVgB“° –ÖRç”6VçFW"ÒÖF‚æfÆö÷"‚‚†Ö…F÷²Ö„&÷GFöÒ’ò"’²ÖRçF÷²ÖRçFF–æuF÷“° —ÒÀ  –vWD–æFW„ævÆS¢gVæ7F–öâ†–æFW‚’° —f"6†'BÒF†—2æ6†'C° —f"ævÆT×VÇF—Æ–W"Ò3cò6†'BæFFæÆ&VÇ2æÆVæwFƒ° —f"÷F–öç2Ò6†'Bæ÷F–öç2ÇÂ·Ó° —f"7F'DævÆRÒ÷F–öç2ç7F'DævÆRÇÂ°  ’òò7F'Bg&öÒF†RF÷–ç7FVBöb&–v‡BÂ6ò&VÖ÷fRV'FW"öbF†R6—&6ÆP —f"ævÆRÒ†–æFW‚¢ævÆT×VÇF—Æ–W"²7F'DævÆR’R3c°  —&WGW&â†ævÆRÂòævÆR²3c¢ævÆR’¢ÖF‚å’¢"ò3c° —ÒÀ  –vWDF—7Fæ6Tg&öÔ6VçFW$f÷%fÇVS¢gVæ7F–öâ‡fÇVR’° —f"ÖRÒF†—3°  ––b††VÇW'2Cæ—4çVÆÄ÷%VæFVb‡fÇVR’’° —&WGW&âæã° —Ð  ’òòF¶R–çFò66÷VçB†ÆbföçB6—¦R²F†R•FF–æröbF†RF÷fÇVP —f"66Æ–ætf7F÷"ÒÖRæG&v–æt&Vò†ÖRæÖ‚ÒÖRæÖ–â“° ––b†ÖRæ÷F–öç2çF–6·2ç&WfW'6R’° —&WGW&â†ÖRæÖ‚ÒfÇVR’¢66Æ–ætf7F÷#° —Ð —&WGW&â‡fÇVRÒÖRæÖ–â’¢66Æ–ætf7F÷#° —ÒÀ  –vWEö–çE÷6—F–öã¢gVæ7F–öâ†–æFW‚ÂF—7Fæ6Tg&öÔ6VçFW"’° —f"ÖRÒF†—3° —f"F†—4ævÆRÒÖRævWD–æFW„ævÆR†–æFW‚’Ò„ÖF‚å’ò"“° —&WGW&â° —ƒ¢ÖF‚æ6÷2‡F†—4ævÆR’¢F—7Fæ6Tg&öÔ6VçFW"²ÖRç„6VçFW"À —“¢ÖF‚ç6–â‡F†—4ævÆR’¢F—7Fæ6Tg&öÔ6VçFW"²ÖRç”6VçFW  —Ó° —ÒÀ  –vWEö–çE÷6—F–öäf÷%fÇVS¢gVæ7F–öâ†–æFW‚ÂfÇVR’° —&WGW&âF†—2ævWEö–çE÷6—F–öâ†–æFW‚ÂF†—2ævWDF—7Fæ6Tg&öÔ6VçFW$f÷%fÇVR‡fÇVR’“° —ÒÀ  –vWD&6U÷6—F–öã¢gVæ7F–öâ†–æFW‚’° —f"ÖRÒF†—3° —f"Ö–âÒÖRæÖ–ã° —f"Ö‚ÒÖRæÖƒ°  —&WGW&âÖRævWEö–çE÷6—F–öäf÷%fÇVR†–æFW‚ÇÂÀ –ÖRæ&Vv–äE¦W&òò  –Ö–âÂbbÖ‚ÂòÖ‚  –Ö–ââbbÖ‚âòÖ–â  ““° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öG&tw&–C¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"7G‚ÒÖRæ7Gƒ° —f"÷G2ÒÖRæ÷F–öç3° —f"w&–DÆ–æT÷G2Ò÷G2æw&–DÆ–æW3° —f"ævÆTÆ–æT÷G2Ò÷G2æævÆTÆ–æW3° —f"Æ–æUv–GF‚ÒfÇVT÷$FVfVÇBF2†ævÆTÆ–æT÷G2æÆ–æUv–GF‚Âw&–DÆ–æT÷G2æÆ–æUv–GF‚“° —f"Æ–æT6öÆ÷"ÒfÇVT÷$FVfVÇBF2†ævÆTÆ–æT÷G2æ6öÆ÷"Âw&–DÆ–æT÷G2æ6öÆ÷"“° —f"’Âöfg6WBÂ÷6—F–öã°  ––b†÷G2çö–çDÆ&VÇ2æF—7Æ’’° –G&uö–çDÆ&VÇ2†ÖR“° —Ð  ––b†w&–DÆ–æT÷G2æF—7Æ’’° –†VÇW'2CæV6‚†ÖRçF–6·2ÂgVæ7F–öâ†Æ&VÂÂ–æFW‚’° ––b†–æFW‚ÓÒ’° –öfg6WBÒÖRævWDF—7Fæ6Tg&öÔ6VçFW$f÷%fÇVR†ÖRçF–6·44çVÖ&W'5¶–æFW…Ò“° –G&u&F—W4Æ–æR†ÖRÂw&–DÆ–æT÷G2Âöfg6WBÂ–æFW‚“° —Ð —Ò“° —Ð  ––b†ævÆTÆ–æT÷G2æF—7Æ’bbÆ–æUv–GF‚bbÆ–æT6öÆ÷"’° –7G‚ç6fR‚“° –7G‚æÆ–æUv–GF‚ÒÆ–æUv–GFƒ° –7G‚ç7G&ö¶U7G–ÆRÒÆ–æT6öÆ÷#° ––b†7G‚ç6WDÆ–æTF6‚’° –7G‚ç6WDÆ–æTF6‚‡&W6öÇfRCB…¶ævÆTÆ–æT÷G2æ&÷&FW$F6‚Âw&–DÆ–æT÷G2æ&÷&FW$F6‚ÂµÕÒ’“° –7G‚æÆ–æTF6„öfg6WBÒ&W6öÇfRCB…¶ævÆTÆ–æT÷G2æ&÷&FW$F6„öfg6WBÂw&–DÆ–æT÷G2æ&÷&FW$F6„öfg6WBÂãÒ“° —Ð  –f÷"†’ÒÖRæ6†'BæFFæÆ&VÇ2æÆVæwF‚Ò²’ãÒ²’ÒÒ’° –öfg6WBÒÖRævWDF—7Fæ6Tg&öÔ6VçFW$f÷%fÇVR†÷G2çF–6·2ç&WfW'6RòÖRæÖ–â¢ÖRæÖ‚“° —÷6—F–öâÒÖRævWEö–çE÷6—F–öâ†’Âöfg6WB“° –7G‚æ&Vv–åF‚‚“° –7G‚æÖ÷fUFò†ÖRç„6VçFW"ÂÖRç”6VçFW"“° –7G‚æÆ–æUFò‡÷6—F–öâç‚Â÷6—F–öâç’“° –7G‚ç7G&ö¶R‚“° —Ð  –7G‚ç&W7F÷&R‚“° —Ð —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öG&tÆ&VÇ3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"7G‚ÒÖRæ7Gƒ° —f"÷G2ÒÖRæ÷F–öç3° —f"F–6´÷G2Ò÷G2çF–6·3°  ––b‚F–6´÷G2æF—7Æ’’° —&WGW&ã° —Ð  —f"7F'DævÆRÒÖRævWD–æFW„ævÆRƒ“° —f"F–6´föçBÒ†VÇW'2Cæ÷F–öç2å÷'6TföçB‡F–6´÷G2“° —f"F–6´föçD6öÆ÷"ÒfÇVT÷$FVfVÇBF2‡F–6´÷G2æföçD6öÆ÷"Â6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇDföçD6öÆ÷"“° —f"öfg6WBÂv–GFƒ°  –7G‚ç6fR‚“° –7G‚æföçBÒF–6´föçBç7G&–æs° –7G‚çG&ç6ÆFR†ÖRç„6VçFW"ÂÖRç”6VçFW"“° –7G‚ç&÷FFR‡7F'DævÆR“° –7G‚çFW‡DÆ–vâÒv6VçFW"s° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs°  –†VÇW'2CæV6‚†ÖRçF–6·2ÂgVæ7F–öâ†Æ&VÂÂ–æFW‚’° ––b†–æFW‚ÓÓÒbbF–6´÷G2ç&WfW'6R’° —&WGW&ã° —Ð  –öfg6WBÒÖRævWDF—7Fæ6Tg&öÔ6VçFW$f÷%fÇVR†ÖRçF–6·44çVÖ&W'5¶–æFW…Ò“°  ––b‡F–6´÷G2ç6†÷tÆ&VÄ&6¶G&÷’° —v–GF‚Ò7G‚æÖV7W&UFW‡B†Æ&VÂ’çv–GFƒ° –7G‚æf–ÆÅ7G–ÆRÒF–6´÷G2æ&6¶G&÷6öÆ÷#°  –7G‚æf–ÆÅ&V7B€ ’×v–GF‚ò"ÒF–6´÷G2æ&6¶G&÷FF–æu‚À ’Ööfg6WBÒF–6´föçBç6—¦Rò"ÒF–6´÷G2æ&6¶G&÷FF–æu’À —v–GF‚²F–6´÷G2æ&6¶G&÷FF–æu‚¢"À —F–6´föçBç6—¦R²F–6´÷G2æ&6¶G&÷FF–æu’¢  ’“° —Ð  –7G‚æf–ÆÅ7G–ÆRÒF–6´föçD6öÆ÷#° –7G‚æf–ÆÅFW‡B†Æ&VÂÂÂÖöfg6WB“° —Ò“°  –7G‚ç&W7F÷&R‚“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •öG&uF—FÆS¢†VÇW'2Cææö÷ §Ò“° ¢òò”åDU$äÃ¢7FF–2FVfVÇB÷F–öç2Â&Vv—7FW&VB–â7&2ö–æFW‚æ§0§f"öFVfVÇG2C2ÒFVfVÇD6öæf–rC3°§66ÆU÷&F–ÄÆ–æV"åöFVfVÇG2ÒöFVfVÇG2C3° §f"FW&V6FVBCÒ†VÇW'2CåöFW&V6FVC°§f"&W6öÇfRCRÒ†VÇW'2Cæ÷F–öç2ç&W6öÇfS°§f"fÇVT÷$FVfVÇBFBÒ†VÇW'2CçfÇVT÷$FVfVÇC° ¢òò–çFVvW"6öç7FçG2&Rg&öÒF†RU3b7V2à§f"Ô”åô”åDTtU"ÒçVÖ&W"äÔ”åõ4dUô”åDTtU"ÇÂÓ“s““#SCsC““°§f"Ô…ô”åDTtU"ÒçVÖ&W"äÔ…õ4dUô”åDTtU"ÇÂ“s““#SCsC““° §f"”åDU%dÅ2Ò° –Ö–ÆÆ—6V6öæC¢° –6öÖÖöã¢G'VRÀ —6—¦S¢À —7FW3¢  —ÒÀ —6V6öæC¢° –6öÖÖöã¢G'VRÀ —6—¦S¢À —7FW3¢c  —ÒÀ –Ö–çWFS¢° –6öÖÖöã¢G'VRÀ —6—¦S¢cÀ —7FW3¢c  —ÒÀ –†÷W#¢° –6öÖÖöã¢G'VRÀ —6—¦S¢3cÀ —7FW3¢#@ —ÒÀ –F“¢° –6öÖÖöã¢G'VRÀ —6—¦S¢ƒcCÀ —7FW3¢3  —ÒÀ —vVV³¢° –6öÖÖöã¢fÇ6RÀ —6—¦S¢cCƒÀ —7FW3¢@ —ÒÀ –ÖöçFƒ¢° –6öÖÖöã¢G'VRÀ —6—¦S¢"ãc#†S’À —7FW3¢  —ÒÀ —V'FW#¢° –6öÖÖöã¢fÇ6RÀ —6—¦S¢rãƒƒFS’À —7FW3¢@ —ÒÀ —–V#¢° –6öÖÖöã¢G'VRÀ —6—¦S¢2ãSFS  —Ð§Ó° §f"Tä•E2Òö&¦V7Bæ¶W—2„”åDU%dÅ2“° ¦gVæ7F–öâ6÷'FW"†Â"’° —&WGW&âÒ#°§Ð ¦gVæ7F–öâ'&•Væ—VR†—FV×2’° —f"†6‚Ò·Ó° —f"÷WBÒµÓ° —f"’Â–ÆVâÂ—FVÓ°  –f÷"†’ÒÂ–ÆVâÒ—FV×2æÆVæwFƒ²’Â–ÆVã²²¶’’° –—FVÒÒ—FV×5¶•Ó° ––b‚†6…¶—FVÕÒ’° –†6…¶—FVÕÒÒG'VS° –÷WBçW6‚†—FVÒ“° —Ð —Ð  —&WGW&â÷WC°§Ð ¦gVæ7F–öâvWDÖ–â†÷F–öç2’° —&WGW&â†VÇW'2CçfÇVT÷$FVfVÇB†÷F–öç2çF–ÖRæÖ–âÂ÷F–öç2çF–6·2æÖ–â“°§Ð ¦gVæ7F–öâvWDÖ‚†÷F–öç2’° —&WGW&â†VÇW'2CçfÇVT÷$FVfVÇB†÷F–öç2çF–ÖRæÖ‚Â÷F–öç2çF–6·2æÖ‚“°§Ð ¢ò¢ ¢¢&WGW&ç2â'&’öb·F–ÖRÂ÷7Òö&¦V7G2W6VBFò–çFW'öÆFR7V6–f–2F–ÖV÷"÷6—F–öà¢¢†÷6’öâF†R66ÆRÂ'’6V&6†–ærVçG&–W2&Vf÷&RæBgFW"F†R&WVW7FVBfÇVRâ÷6—0¢¢FV6–ÖÂ&WGvVVâæB¢&V–ærF†R7F'BöbF†R66ÆR†ÆVgB÷"F÷’æBF†R÷F†W ¢¢W‡G&VÖ—G’†ÆVgB²v–GF‚÷"F÷²†V–v‡B’âæ÷FRF†B—Bv÷VÆB&RÖ÷&R÷F–Ö—¦VBFòF—&V7FÇ¢¢7F÷&R&RÖ6ö×WFVB—†VÇ2Â'WBF†R66ÆRF–ÖVç6–öç2&Ræ÷BwV&çFVVBBF†RF–ÖRvRæVV@¢¢Fò7&VFRF†RÆöö·WF&ÆRâF†RF&ÆRÅt•26öçF–ç2BÆV7BGvò—FV×3¢Ö–âæBÖ‚à¢ ¢¢&Ò¶çVÖ&W%µ×ÒF–ÖW7F×2ÒF–ÖW7F×26÷'FVBg&öÒÆ÷vW7BFò†–v†W7Bà¢¢&Ò·7G&–æwÒF—7G&–'WF–öâÒ–bvÆ–æV"rÂF–ÖW7F×2v–ÆÂ&R7&VBÆ–æV&Ç’ÆöærF†RÖ–à¢¢æBÖ‚&ævRÂ6ò&6–6ÆÇ’ÂF†RF&ÆRv–ÆÂ6öçF–ç2öæÇ’Gvò—FV×3¢¶Ö–âÂÒæB¶Ö‚ÂÒà¢¢–bw6W&–W2rÂF–ÖW7F×2v–ÆÂ&R÷6—F–öæVBBF†R6ÖRF—7Fæ6Rg&öÒV6‚÷F†W"â–âF†—0¢¢66RÂöæÇ’F–ÖW7F×2F†B'&V²F†RF–ÖRÆ–æV&—G’&R&Vv—7FW&VBÂÖVæ–ærF†B–âF†P¢¢&W7B66RÂÆÂF–ÖW7F×2&RÆ–æV"ÂF†RF&ÆR6öçF–ç2öæÇ’Ö–âæBÖ‚à¢¢ð¦gVæ7F–öâ'V–ÆDÆöö·WF&ÆR‡F–ÖW7F×2ÂÖ–âÂÖ‚ÂF—7G&–'WF–öâ’° ––b†F—7G&–'WF–öâÓÓÒvÆ–æV"rÇÂF–ÖW7F×2æÆVæwF‚’° —&WGW&â° —·F–ÖS¢Ö–âÂ÷3¢ÒÀ —·F–ÖS¢Ö‚Â÷3¢Ð •Ó° —Ð  —f"F&ÆRÒµÓ° —f"—FV×2Ò¶Ö–åÓ° —f"’Â–ÆVâÂ&WbÂ7W'"ÂæW‡C°  –f÷"†’ÒÂ–ÆVâÒF–ÖW7F×2æÆVæwFƒ²’Â–ÆVã²²¶’’° –7W'"ÒF–ÖW7F×5¶•Ó° ––b†7W'"âÖ–âbb7W'"ÂÖ‚’° –—FV×2çW6‚†7W'"“° —Ð —Ð  –—FV×2çW6‚†Ö‚“°  –f÷"†’ÒÂ–ÆVâÒ—FV×2æÆVæwFƒ²’Â–ÆVã²²¶’’° –æW‡BÒ—FV×5¶’²Ó° —&WbÒ—FV×5¶’ÒÓ° –7W'"Ò—FV×5¶•Ó°  ’òòöæÇ’FBö–çG2F†B'&V·2F†R66ÆRÆ–æV&—G ––b‡&WbÓÓÒVæFVf–æVBÇÂæW‡BÓÓÒVæFVf–æVBÇÂÖF‚ç&÷VæB‚†æW‡B²&Wb’ò"’ÓÒ7W'"’° —F&ÆRçW6‚‡·F–ÖS¢7W'"Â÷3¢’ò†–ÆVâÒ—Ò“° —Ð —Ð  —&WGW&âF&ÆS°§Ð ¢òò6VRFFVBg&öÒ‡GG3¢ò÷wwræçV¦v¶†"æ6öÒó#Bó2óö&–æ'’×6V&6‚Ö–âÖ¦f67&—Bð¦gVæ7F–öâÆöö·W‡F&ÆRÂ¶W’ÂfÇVR’° —f"ÆòÒ° —f"†’ÒF&ÆRæÆVæwF‚Ò° —f"Ö–BÂ“Â“°  —v†–ÆR†ÆòãÒbbÆòÃÒ†’’° –Ö–BÒ†Æò²†’’ãâ° –“ÒF&ÆU¶Ö–BÒÒÇÂçVÆÃ° –“ÒF&ÆU¶Ö–EÓ°  ––b‚“’° ’òòv—fVâfÇVR—2÷WG6–FRF&ÆR†&Vf÷&Rf—'7B—FVÒ —&WGW&â¶Æó¢çVÆÂÂ†“¢“Ó° —ÒVÇ6R–b†“¶¶W•ÒÂfÇVR’° –ÆòÒÖ–B²° —ÒVÇ6R–b†“¶¶W•ÒâfÇVR’° –†’ÒÖ–BÒ° —ÒVÇ6R° —&WGW&â¶Æó¢“Â†“¢“Ó° —Ð —Ð  ’òòv—fVâfÇVR—2÷WG6–FRF&ÆR†gFW"Æ7B—FVÒ —&WGW&â¶Æó¢“Â†“¢çVÆÇÓ°§Ð ¢ò¢ ¢¢Æ–æV&Ç’–çFW'öÆFW2F†Rv—fVâ6÷W&6RfÇVVW6–ærF†RF&ÆR—FV×26¶W–fÇVW2æ@¢¢&WGW&ç2F†R76ö6–FVBF¶W–fÇVRâf÷"W†×ÆRÂ–çFW'öÆFR‡F&ÆRÂwF–ÖRrÂC"Âw÷2r¢¢&WGW&ç2F†R÷6—F–öâf÷"F–ÖW7F×WVÂFòC"â–bfÇVR—2÷WBöb&÷VæG2ÂfÇVW2@¢¢–æFW‚³ÂÒ÷"¶âÒÂåÒ&RW6VBf÷"F†R–çFW'öÆF–öâà¢¢ð¦gVæ7F–öâ–çFW'öÆFRC‡F&ÆRÂ6¶W’Â7fÂÂF¶W’’° —f"&ævRÒÆöö·W‡F&ÆRÂ6¶W’Â7fÂ“°  ’òòæ÷FS¢F†RÆöö·WF&ÆRÅt•26öçF–ç2BÆV7B"—FV×2†Ö–âæBÖ‚ —f"&WbÒ&ævRæÆòòF&ÆU³Ò¢&ævRæ†’òF&ÆU·F&ÆRæÆVæwF‚Ò%Ò¢&ævRæÆó° —f"æW‡BÒ&ævRæÆòòF&ÆU³Ò¢&ævRæ†’òF&ÆU·F&ÆRæÆVæwF‚ÒÒ¢&ævRæ†“°  —f"7âÒæW‡E·6¶W•ÒÒ&We·6¶W•Ó° —f"&F–òÒ7âò‡7fÂÒ&We·6¶W•Ò’ò7â¢° —f"öfg6WBÒ†æW‡E·F¶W•ÒÒ&We·F¶W•Ò’¢&F–ó°  —&WGW&â&We·F¶W•Ò²öfg6WC°§Ð ¦gVæ7F–öâFõF–ÖW7F×‡66ÆRÂ–çWB’° —f"FFW"Ò66ÆRåöFFW#° —f"÷F–öç2Ò66ÆRæ÷F–öç2çF–ÖS° —f"'6W"Ò÷F–öç2ç'6W#° —f"f÷&ÖBÒ'6W"ÇÂ÷F–öç2æf÷&ÖC° —f"fÇVRÒ–çWC°  ––b‡G—Vöb'6W"ÓÓÒvgVæ7F–öâr’° —fÇVRÒ'6W"‡fÇVR“° —Ð  ’òòöæÇ’'6R–b—G2æ÷BF–ÖW7F×Ç&VG ––b‚†VÇW'2Cæ—4f–æ—FR‡fÇVR’’° —fÇVRÒG—Vöbf÷&ÖBÓÓÒw7G&–ærp “òFFW"ç'6R‡fÇVRÂf÷&ÖB “¢FFW"ç'6R‡fÇVR“° —Ð  ––b‡fÇVRÓÒçVÆÂ’° —&WGW&â·fÇVS° —Ð  ’òòÆ&VÇ2&R–ââ–æ6ö×F–&ÆRf÷&ÖBæBæò'6W&†2&VVâ&÷f–FVBà ’òòF†RW6W"Ö–v‡B7F–ÆÂW6RF†RFW&V6FVBf÷&ÖF÷F–öâf÷"'6–ærà ––b‚'6W"bbG—Vöbf÷&ÖBÓÓÒvgVæ7F–öâr’° —fÇVRÒf÷&ÖB†–çWB“°  ’òòf÷&ÖF6÷VÆB&WGW&â6öÖWF†–ærVÇ6RF†âF–ÖW7F×Â–b6òÂ'6R—@ ––b‚†VÇW'2Cæ—4f–æ—FR‡fÇVR’’° —fÇVRÒFFW"ç'6R‡fÇVR“° —Ð —Ð  —&WGW&âfÇVS°§Ð ¦gVæ7F–öâ'6R‡66ÆRÂ–çWB’° ––b††VÇW'2Cæ—4çVÆÄ÷%VæFVb†–çWB’’° —&WGW&âçVÆÃ° —Ð  —f"÷F–öç2Ò66ÆRæ÷F–öç2çF–ÖS° —f"fÇVRÒFõF–ÖW7F×‡66ÆRÂ66ÆRævWE&–v‡EfÇVR†–çWB’“° ––b‡fÇVRÓÓÒçVÆÂ’° —&WGW&âfÇVS° —Ð  ––b†÷F–öç2ç&÷VæB’° —fÇVRÒ·66ÆRåöFFW"ç7F'Döb‡fÇVRÂ÷F–öç2ç&÷VæB“° —Ð  —&WGW&âfÇVS°§Ð ¢ò¢ ¢¢f–wW&W2÷WBv†BVæ—B&W7VÇG2–ââ&÷&–FRçVÖ&W"öbWFòÖvVæW&FVBF–6·0¢¢ð¦gVæ7F–öâFWFW&Ö–æUVæ—Df÷$WFõF–6·2†Ö–åVæ—BÂÖ–âÂÖ‚Â66—G’’° —f"–ÆVâÒTä•E2æÆVæwFƒ° —f"’Â–çFW'fÂÂf7F÷#°  –f÷"†’ÒTä•E2æ–æFW„öb†Ö–åVæ—B“²’Â–ÆVâÒ²²¶’’° ––çFW'fÂÒ”åDU%dÅ5µTä•E5¶•ÕÓ° –f7F÷"Ò–çFW'fÂç7FW2ò–çFW'fÂç7FW2¢Ô…ô”åDTtU#°  ––b†–çFW'fÂæ6öÖÖöâbbÖF‚æ6V–Â‚†Ö‚ÒÖ–â’ò†f7F÷"¢–çFW'fÂç6—¦R’’ÃÒ66—G’’° —&WGW&âTä•E5¶•Ó° —Ð —Ð  —&WGW&âTä•E5¶–ÆVâÒÓ°§Ð ¢ò¢ ¢¢f–wW&W2÷WBv†BVæ—BFòf÷&ÖB6WBöbF–6·2v—F€¢¢ð¦gVæ7F–öâFWFW&Ö–æUVæ—Df÷$f÷&ÖGF–ær‡66ÆRÂçVÕF–6·2ÂÖ–åVæ—BÂÖ–âÂÖ‚’° —f"’ÂVæ—C°  –f÷"†’ÒTä•E2æÆVæwF‚Ò²’ãÒTä•E2æ–æFW„öb†Ö–åVæ—B“²’ÒÒ’° —Væ—BÒTä•E5¶•Ó° ––b„”åDU%dÅ5·Væ—EÒæ6öÖÖöâbb66ÆRåöFFW"æF–fb†Ö‚ÂÖ–âÂVæ—B’ãÒçVÕF–6·2Ò’° —&WGW&âVæ—C° —Ð —Ð  —&WGW&âTä•E5¶Ö–åVæ—BòTä•E2æ–æFW„öb†Ö–åVæ—B’¢Ó°§Ð ¦gVæ7F–öâFWFW&Ö–æTÖ¦÷%Væ—B‡Væ—B’° –f÷"‡f"’ÒTä•E2æ–æFW„öb‡Væ—B’²Â–ÆVâÒTä•E2æÆVæwFƒ²’Â–ÆVã²²¶’’° ––b„”åDU%dÅ5µTä•E5¶•ÕÒæ6öÖÖöâ’° —&WGW&âTä•E5¶•Ó° —Ð —Ð§Ð ¢ò¢ ¢¢vVæW&FW2Ö†–×VÒöb66—G–F–ÖW7F×2&WGvVVâÖ–âæBÖ‚Â&÷VæFVBFòF†P¢¢Ö–æ÷&Væ—BW6–ærF†Rv—fVâ66ÆRF–ÖR÷F–öç6à¢¢–×÷'FçC¢F†—2ÖWF†öB6â&WGW&âF–6·2÷WG6–FRF†RÖ–âæBÖ‚&ævRÂ—Bw2F†P¢¢&W7öç6–&–Æ—G’öbF†R6ÆÆ–ær6öFRFò6Æ×fÇVW2–bæVVFVBà¢¢ð¦gVæ7F–öâvVæW&FR‡66ÆRÂÖ–âÂÖ‚Â66—G’’° —f"FFW"Ò66ÆRåöFFW#° —f"÷F–öç2Ò66ÆRæ÷F–öç3° —f"F–ÖT÷G2Ò÷F–öç2çF–ÖS° —f"Ö–æ÷"ÒF–ÖT÷G2çVæ—BÇÂFWFW&Ö–æUVæ—Df÷$WFõF–6·2‡F–ÖT÷G2æÖ–åVæ—BÂÖ–âÂÖ‚Â66—G’“° —f"7FW6—¦RÒ&W6öÇfRCR…·F–ÖT÷G2ç7FW6—¦RÂF–ÖT÷G2çVæ—E7FW6—¦RÂÒ“° —f"vVV¶F’ÒÖ–æ÷"ÓÓÒwvVV²ròF–ÖT÷G2æ—6õvVV¶F’¢fÇ6S° —f"f—'7BÒÖ–ã° —f"F–6·2ÒµÓ° —f"F–ÖS°  ’òòf÷"wvVV²rVæ—BÂ†æFÆRF†Rf—'7BF’öbvVV²÷F–öà ––b‡vVV¶F’’° –f—'7BÒ¶FFW"ç7F'Döb†f—'7BÂv—6õvVV²rÂvVV¶F’“° —Ð  ’òòÆ–vâf—'7BF–6·2öâVæ—@ –f—'7BÒ¶FFW"ç7F'Döb†f—'7BÂvVV¶F’òvF’r¢Ö–æ÷"“°  ’òò&WfVçB'&÷w6W"g&öÒg&VW¦–ær–â66RW6W"÷F–öç2&WVW7BÖ–ÆÆ–öç2öbÖ–ÆÆ—6V6öæG0 ––b†FFW"æF–fb†Ö‚ÂÖ–âÂÖ–æ÷"’â¢7FW6—¦R’° —F‡&÷rÖ–â²ræBr²Ö‚²r&RFöòf"'Bv—F‚7FW6—¦Röbr²7FW6—¦R²rr²Ö–æ÷#° —Ð  –f÷"‡F–ÖRÒf—'7C²F–ÖRÂÖƒ²F–ÖRÒ¶FFW"æFB‡F–ÖRÂ7FW6—¦RÂÖ–æ÷"’’° —F–6·2çW6‚‡F–ÖR“° —Ð  ––b‡F–ÖRÓÓÒÖ‚ÇÂ÷F–öç2æ&÷VæG2ÓÓÒwF–6·2r’° —F–6·2çW6‚‡F–ÖR“° —Ð  —&WGW&âF–6·3°§Ð ¢ò¢ ¢¢&WGW&ç2F†R7F'BæBVæBöfg6WG2g&öÒVFvW2–âF†Rf÷&Òöb·7F'BÂVæGÐ¢¢v†W&RV6‚fÇVR—2&VÆF—fRv–GF‚FòF†R66ÆRæB&ævW2&WGvVVâæBà¢¢F†W’FBW‡G&Ö&v–ç2öâF†R&÷F‚6–FW2'’66Æ–ærF÷vâF†R÷&–v–æÂ66ÆRà¢¢öfg6WG2&RFFVBv†VâF†Röfg6WF÷F–öâ—2G'VRà¢¢ð¦gVæ7F–öâ6ö×WFTöfg6WG2‡F&ÆRÂF–6·2ÂÖ–âÂÖ‚Â÷F–öç2’° —f"7F'BÒ° —f"VæBÒ° —f"f—'7BÂÆ7C°  ––b†÷F–öç2æöfg6WBbbF–6·2æÆVæwF‚’° –f—'7BÒ–çFW'öÆFRC‡F&ÆRÂwF–ÖRrÂF–6·5³ÒÂw÷2r“° ––b‡F–6·2æÆVæwF‚ÓÓÒ’° —7F'BÒÒf—'7C° —ÒVÇ6R° —7F'BÒ†–çFW'öÆFRC‡F&ÆRÂwF–ÖRrÂF–6·5³ÒÂw÷2r’Òf—'7B’ò#° —Ð –Æ7BÒ–çFW'öÆFRC‡F&ÆRÂwF–ÖRrÂF–6·5·F–6·2æÆVæwF‚ÒÒÂw÷2r“° ––b‡F–6·2æÆVæwF‚ÓÓÒ’° –VæBÒÆ7C° —ÒVÇ6R° –VæBÒ†Æ7BÒ–çFW'öÆFRC‡F&ÆRÂwF–ÖRrÂF–6·5·F–6·2æÆVæwF‚Ò%ÒÂw÷2r’’ò#° —Ð —Ð  —&WGW&â·7F'C¢7F'BÂVæC¢VæBÂf7F÷#¢ò‡7F'B²²VæB—Ó°§Ð ¦gVæ7F–öâ6WDÖ¦÷%F–6·2‡66ÆRÂF–6·2ÂÖÂÖ¦÷%Væ—B’° —f"FFW"Ò66ÆRåöFFW#° —f"f—'7BÒ¶FFW"ç7F'Döb‡F–6·5³ÒçfÇVRÂÖ¦÷%Væ—B“° —f"Æ7BÒF–6·5·F–6·2æÆVæwF‚ÒÒçfÇVS° —f"Ö¦÷"Â–æFWƒ°  –f÷"†Ö¦÷"Òf—'7C²Ö¦÷"ÃÒÆ7C²Ö¦÷"Ò¶FFW"æFB†Ö¦÷"ÂÂÖ¦÷%Væ—B’’° ––æFW‚ÒÖ¶Ö¦÷%Ó° ––b†–æFW‚ãÒ’° —F–6·5¶–æFW…ÒæÖ¦÷"ÒG'VS° —Ð —Ð —&WGW&âF–6·3°§Ð ¦gVæ7F–öâF–6·4g&öÕF–ÖW7F×2‡66ÆRÂfÇVW2ÂÖ¦÷%Væ—B’° —f"F–6·2ÒµÓ° —f"ÖÒ·Ó° —f"–ÆVâÒfÇVW2æÆVæwFƒ° —f"’ÂfÇVS°  –f÷"†’Ò²’Â–ÆVã²²¶’’° —fÇVRÒfÇVW5¶•Ó° –Ö·fÇVUÒÒ“°  —F–6·2çW6‚‡° —fÇVS¢fÇVRÀ –Ö¦÷#¢fÇ6P —Ò“° —Ð  ’òòvR6WBF†RÖ¦÷"F–6·26W&FVÇ’g&öÒF†R&÷fRÆö÷&V6W6R6ÆÆ–ær7F'Döbf÷"WfW'’F–6° ’òò—2W‡Vç6—fRv†VâF†W&R—2Æ&vRçVÖ&W"öbF–6·0 —&WGW&â†–ÆVâÓÓÒÇÂÖ¦÷%Væ—B’òF–6·2¢6WDÖ¦÷%F–6·2‡66ÆRÂF–6·2ÂÖÂÖ¦÷%Væ—B“°§Ð §f"FVfVÇD6öæf–rCBÒ° —÷6—F–öã¢v&÷GFöÒrÀ  ’ò¢  ’¢FFF—7G&–'WF–öâÆöærF†R66ÆS  ’¢ÒvÆ–æV"s¢FF&R7&VB66÷&F–ærFòF†V—"F–ÖR†F—7Fæ6W26âf'’’À ’¢Òw6W&–W2s¢FF&R7&VBBF†R6ÖRF—7Fæ6Rg&öÒV6‚÷F†W"à ’¢6VR‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2÷VÆÂóCSp ’¢6–æ6R"ãrã  ’¢ð –F—7G&–'WF–öã¢vÆ–æV"rÀ  ’ò¢  ’¢66ÆR&÷VæF'’7G&FVw’†'—76VB'’Ö–âöÖ‚F–ÖR÷F–öç2 ’¢ÒFF¢Ö¶R7W&RFF&RgVÆÇ’f—6–&ÆRÂF–6·2÷WG6–FR&R&VÖ÷fV@ ’¢ÒF–6·6¢Ö¶R7W&RF–6·2&RgVÆÇ’f—6–&ÆRÂFF÷WG6–FR&RG'Væ6FV@ ’¢6VR‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2÷VÆÂóCSS` ’¢6–æ6R"ãrã  ’¢ð –&÷VæG3¢vFFrÀ  –FFW'3¢·ÒÀ —F–ÖS¢° —'6W#¢fÇ6RÂòòfÇ6RÓÒGFW&â7G&–ærg&öÒ‡GG3¢òöÖöÖVçF§2æ6öÒöFö72ò2÷'6–ær÷7G&–ærÖf÷&ÖBò÷"7W7FöÒ6ÆÆ&6²F†B6öçfW'G2—G2&wVÖVçBFòÖöÖVç@ —Væ—C¢fÇ6RÂòòfÇ6RÓÒWFöÖF–2÷"÷fW'&–FRv—F‚vVV²ÂÖöçF‚Â–V"ÂWF2à —&÷VæC¢fÇ6RÂòòæöæRÂ÷"÷fW'&–FRv—F‚vVV²ÂÖöçF‚Â–V"ÂWF2à –F—7Æ”f÷&ÖC¢fÇ6RÂòòDU$T4DT@ –—6õvVV¶F“¢fÇ6RÂòò÷fW'&–FRvVV²7F'BF’Ò6VR‡GG3¢òöÖöÖVçF§2æ6öÒöFö72ò2övWB×6WBö—6ò×vVV¶F’ð –Ö–åVæ—C¢vÖ–ÆÆ—6V6öæBrÀ –F—7Æ”f÷&ÖG3¢·Ð —ÒÀ —F–6·3¢° –WFõ6¶—¢fÇ6RÀ  ’ò¢  ’¢F–6·2vVæW&F–öâ–çWBfÇVW3  ’¢ÒvWFòs¢vVæW&FW2&÷F–ÖÂ"F–6·2&6VBöâ66ÆR6—¦RæBF–ÖR÷F–öç2à ’¢ÒvFFs¢vVæW&FW2F–6·2g&öÒFF†–æ6ÇVF–ærÆ&VÇ2g&öÒFF·GÇ‡Ç—Òö&¦V7G2’à ’¢ÒvÆ&VÇ2s¢vVæW&FW2F–6·2g&öÒW6W"v—fVâFFæÆ&VÇ6fÇVW2ôäÅ’à ’¢6VR‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2÷VÆÂóCSp ’¢6–æ6R"ãrã  ’¢ð —6÷W&6S¢vWFòrÀ  –Ö¦÷#¢° –Væ&ÆVC¢fÇ6P —Ð —Ð§Ó° §f"66ÆU÷F–ÖRÒ6÷&U÷66ÆRæW‡FVæB‡° ––æ—F–Æ—¦S¢gVæ7F–öâ‚’° —F†—2æÖW&vUF–6·4÷F–öç2‚“° –6÷&U÷66ÆRç&÷F÷G—Ræ–æ—F–Æ—¦Ræ6ÆÂ‡F†—2“° —ÒÀ  —WFFS¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"F–ÖRÒ÷F–öç2çF–ÖRÇÂ†÷F–öç2çF–ÖRÒ·Ò“° —f"FFW"ÒÖRåöFFW"ÒæWr6÷&UöFFW'2åöFFR†÷F–öç2æFFW'2æFFR“°  ’òòDU$T4D”ôå3¢÷WGWBÖW76vRöæÇ’öæRF–ÖRW"WFFP –FW&V6FVBC‚wF–ÖR66ÆRrÂF–ÖRæf÷&ÖBÂwF–ÖRæf÷&ÖBrÂwF–ÖRç'6W"r“° –FW&V6FVBC‚wF–ÖR66ÆRrÂF–ÖRæÖ–âÂwF–ÖRæÖ–ârÂwF–6·2æÖ–âr“° –FW&V6FVBC‚wF–ÖR66ÆRrÂF–ÖRæÖ‚ÂwF–ÖRæÖ‚rÂwF–6·2æÖ‚r“°  ’òò&6·v&B6ö×F–&–Æ—G“¢&Vf÷&R–çG&öGV6–ærFFW"ÂF—7Æ”f÷&ÖG6v0 ’òò7W÷6VBFò6öçF–â¦ÆÂ¢Væ—B÷7G&–ær—'2'WBF†—26âwB&R&W6öÇfV@ ’òòv†VâÆöF–ærF†R66ÆR†FFW'2&RÆöFVBgFW'v&B’Â6òÆWBw2÷VÆFP ’òòÖ—76–ærf÷&ÖG2öâWFFP –†VÇW'2CæÖW&vT–b‡F–ÖRæF—7Æ”f÷&ÖG2ÂFFW"æf÷&ÖG2‚’“°  —&WGW&â6÷&U÷66ÆRç&÷F÷G—RçWFFRæÇ’†ÖRÂ&wVÖVçG2“° —ÒÀ  ’ò¢  ’¢ÆÆ÷w2FFFò&R&VfW&Væ6VBf–wBrGG&–'WFP ’¢ð –vWE&–v‡EfÇVS¢gVæ7F–öâ‡&ufÇVR’° ––b‡&ufÇVRbb&ufÇVRçBÓÒVæFVf–æVB’° —&ufÇVRÒ&ufÇVRçC° —Ð —&WGW&â6÷&U÷66ÆRç&÷F÷G—RævWE&–v‡EfÇVRæ6ÆÂ‡F†—2Â&ufÇVR“° —ÒÀ  –FWFW&Ö–æTFFÆ–Ö—G3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"6†'BÒÖRæ6†'C° —f"FFW"ÒÖRåöFFW#° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"Væ—BÒ÷F–öç2çF–ÖRçVæ—BÇÂvF’s° —f"Ö–âÒÔ…ô”åDTtU#° —f"Ö‚ÒÔ”åô”åDTtU#° —f"F–ÖW7F×2ÒµÓ° —f"FF6WG2ÒµÓ° —f"Æ&VÇ2ÒµÓ° —f"’Â¢Â–ÆVâÂ¦ÆVâÂFFÂF–ÖW7F×ÂÆ&VÇ4FFVC° —f"FFÆ&VÇ2ÒÖRåövWDÆ&VÇ2‚“°  –f÷"†’ÒÂ–ÆVâÒFFÆ&VÇ2æÆVæwFƒ²’Â–ÆVã²²¶’’° –Æ&VÇ2çW6‚‡'6R†ÖRÂFFÆ&VÇ5¶•Ò’“° —Ð  –f÷"†’ÒÂ–ÆVâÒ†6†'BæFFæFF6WG2ÇÂµÒ’æÆVæwFƒ²’Â–ÆVã²²¶’’° ––b†6†'Bæ—4FF6WEf—6–&ÆR†’’’° –FFÒ6†'BæFFæFF6WG5¶•ÒæFF°  ’òòÆWBw26öç6–FW"F†BÆÂFF†fRF†R6ÖRf÷&ÖBà ––b††VÇW'2Cæ—4ö&¦V7B†FF³Ò’’° –FF6WG5¶•ÒÒµÓ°  –f÷"†¢ÒÂ¦ÆVâÒFFæÆVæwFƒ²¢Â¦ÆVã²²¶¢’° —F–ÖW7F×Ò'6R†ÖRÂFF¶¥Ò“° —F–ÖW7F×2çW6‚‡F–ÖW7F×“° –FF6WG5¶•Õ¶¥ÒÒF–ÖW7F×° —Ð —ÒVÇ6R° –FF6WG5¶•ÒÒÆ&VÇ2ç6Æ–6Rƒ“° ––b‚Æ&VÇ4FFVB’° —F–ÖW7F×2ÒF–ÖW7F×2æ6öæ6B†Æ&VÇ2“° –Æ&VÇ4FFVBÒG'VS° —Ð —Ð —ÒVÇ6R° –FF6WG5¶•ÒÒµÓ° —Ð —Ð  ––b†Æ&VÇ2æÆVæwF‚’° –Ö–âÒÖF‚æÖ–â†Ö–âÂÆ&VÇ5³Ò“° –Ö‚ÒÖF‚æÖ‚†Ö‚ÂÆ&VÇ5¶Æ&VÇ2æÆVæwF‚ÒÒ“° —Ð  ––b‡F–ÖW7F×2æÆVæwF‚’° —F–ÖW7F×2Ò–ÆVââò'&•Væ—VR‡F–ÖW7F×2’ç6÷'B‡6÷'FW"’¢F–ÖW7F×2ç6÷'B‡6÷'FW"“° –Ö–âÒÖF‚æÖ–â†Ö–âÂF–ÖW7F×5³Ò“° –Ö‚ÒÖF‚æÖ‚†Ö‚ÂF–ÖW7F×5·F–ÖW7F×2æÆVæwF‚ÒÒ“° —Ð  –Ö–âÒ'6R†ÖRÂvWDÖ–â†÷F–öç2’’ÇÂÖ–ã° –Ö‚Ò'6R†ÖRÂvWDÖ‚†÷F–öç2’’ÇÂÖƒ°  ’òò–â66RF†W&R—2æòfÆ–BÖ–âöÖ‚Â6WBÆ–Ö—G2&6VBöâVæ—BF–ÖR÷F–öà –Ö–âÒÖ–âÓÓÒÔ…ô”åDTtU"ò¶FFW"ç7F'Döb„FFRææ÷r‚’ÂVæ—B’¢Ö–ã° –Ö‚ÒÖ‚ÓÓÒÔ”åô”åDTtU"ò¶FFW"æVæDöb„FFRææ÷r‚’ÂVæ—B’²¢Öƒ°  ’òòÖ¶R7W&RF†BÖ‚—27G&–7FÇ’†–v†W"F†âÖ–â‡&WV—&VB'’F†RÆöö·WF&ÆR –ÖRæÖ–âÒÖF‚æÖ–â†Ö–âÂÖ‚“° –ÖRæÖ‚ÒÖF‚æÖ‚†Ö–â²ÂÖ‚“°  ’òò$•dDP –ÖRå÷F&ÆRÒµÓ° –ÖRå÷F–ÖW7F×2Ò° –FF¢F–ÖW7F×2À –FF6WG3¢FF6WG2À –Æ&VÇ3¢Æ&VÇ0 —Ó° —ÒÀ  –'V–ÆEF–6·3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"Ö–âÒÖRæÖ–ã° —f"Ö‚ÒÖRæÖƒ° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"F–6´÷G2Ò÷F–öç2çF–6·3° —f"F–ÖT÷G2Ò÷F–öç2çF–ÖS° —f"F–ÖW7F×2ÒÖRå÷F–ÖW7F×3° —f"F–6·2ÒµÓ° —f"66—G’ÒÖRævWDÆ&VÄ66—G’†Ö–â“° —f"6÷W&6RÒF–6´÷G2ç6÷W&6S° —f"F—7G&–'WF–öâÒ÷F–öç2æF—7G&–'WF–öã° —f"’Â–ÆVâÂF–ÖW7F×°  ––b‡6÷W&6RÓÓÒvFFrÇÂ‡6÷W&6RÓÓÒvWFòrbbF—7G&–'WF–öâÓÓÒw6W&–W2r’’° —F–ÖW7F×2ÒF–ÖW7F×2æFF° —ÒVÇ6R–b‡6÷W&6RÓÓÒvÆ&VÇ2r’° —F–ÖW7F×2ÒF–ÖW7F×2æÆ&VÇ3° —ÒVÇ6R° —F–ÖW7F×2ÒvVæW&FR†ÖRÂÖ–âÂÖ‚Â66—G’“° —Ð  ––b†÷F–öç2æ&÷VæG2ÓÓÒwF–6·2rbbF–ÖW7F×2æÆVæwF‚’° –Ö–âÒF–ÖW7F×5³Ó° –Ö‚ÒF–ÖW7F×5·F–ÖW7F×2æÆVæwF‚ÒÓ° —Ð  ’òòVæf÷&6RÆ–Ö—G2v—F‚W6W"Ö–âöÖ‚÷F–öç0 –Ö–âÒ'6R†ÖRÂvWDÖ–â†÷F–öç2’’ÇÂÖ–ã° –Ö‚Ò'6R†ÖRÂvWDÖ‚†÷F–öç2’’ÇÂÖƒ°  ’òò&VÖ÷fRF–6·2÷WG6–FRF†RÖ–âöÖ‚&ævP –f÷"†’ÒÂ–ÆVâÒF–ÖW7F×2æÆVæwFƒ²’Â–ÆVã²²¶’’° —F–ÖW7F×ÒF–ÖW7F×5¶•Ó° ––b‡F–ÖW7F×ãÒÖ–âbbF–ÖW7F×ÃÒÖ‚’° —F–6·2çW6‚‡F–ÖW7F×“° —Ð —Ð  –ÖRæÖ–âÒÖ–ã° –ÖRæÖ‚ÒÖƒ°  ’òò$•dDP ’òòFWFW&Ö–æUVæ—Df÷$f÷&ÖGF–ær&VÆ–W2öâF†RçVÖ&W"öbF–6·26òvRFöâwBW6R—Bv†Và ’òòWFõ6¶——2Væ&ÆVB&V6W6RvRFöâwB–WB¶æ÷rv†BF†Rf–æÂçVÖ&W"öbF–6·2v–ÆÂ&P –ÖRå÷Væ—BÒF–ÖT÷G2çVæ—BÇÂ‡F–6´÷G2æWFõ6¶—  “òFWFW&Ö–æUVæ—Df÷$WFõF–6·2‡F–ÖT÷G2æÖ–åVæ—BÂÖRæÖ–âÂÖRæÖ‚Â66—G’ “¢FWFW&Ö–æUVæ—Df÷$f÷&ÖGF–ær†ÖRÂF–6·2æÆVæwF‚ÂF–ÖT÷G2æÖ–åVæ—BÂÖRæÖ–âÂÖRæÖ‚’“° –ÖRåöÖ¦÷%Væ—BÒF–6´÷G2æÖ¦÷"æVæ&ÆVBÇÂÖRå÷Væ—BÓÓÒw–V"ròVæFVf–æV@ “¢FWFW&Ö–æTÖ¦÷%Væ—B†ÖRå÷Væ—B“° –ÖRå÷F&ÆRÒ'V–ÆDÆöö·WF&ÆR†ÖRå÷F–ÖW7F×2æFFÂÖ–âÂÖ‚ÂF—7G&–'WF–öâ“° –ÖRåööfg6WG2Ò6ö×WFTöfg6WG2†ÖRå÷F&ÆRÂF–6·2ÂÖ–âÂÖ‚Â÷F–öç2“°  ––b‡F–6´÷G2ç&WfW'6R’° —F–6·2ç&WfW'6R‚“° —Ð  —&WGW&âF–6·4g&öÕF–ÖW7F×2†ÖRÂF–6·2ÂÖRåöÖ¦÷%Væ—B“° —ÒÀ  –vWDÆ&VÄf÷$–æFWƒ¢gVæ7F–öâ†–æFW‚ÂFF6WD–æFW‚’° —f"ÖRÒF†—3° —f"FFW"ÒÖRåöFFW#° —f"FFÒÖRæ6†'BæFF° —f"F–ÖT÷G2ÒÖRæ÷F–öç2çF–ÖS° —f"Æ&VÂÒFFæÆ&VÇ2bb–æFW‚ÂFFæÆ&VÇ2æÆVæwF‚òFFæÆ&VÇ5¶–æFW…Ò¢rs° —f"fÇVRÒFFæFF6WG5¶FF6WD–æFW…ÒæFF¶–æFW…Ó°  ––b††VÇW'2Cæ—4ö&¦V7B‡fÇVR’’° –Æ&VÂÒÖRævWE&–v‡EfÇVR‡fÇVR“° —Ð ––b‡F–ÖT÷G2çFööÇF—f÷&ÖB’° —&WGW&âFFW"æf÷&ÖB‡FõF–ÖW7F×†ÖRÂÆ&VÂ’ÂF–ÖT÷G2çFööÇF—f÷&ÖB“° —Ð ––b‡G—VöbÆ&VÂÓÓÒw7G&–ærr’° —&WGW&âÆ&VÃ° —Ð —&WGW&âFFW"æf÷&ÖB‡FõF–ÖW7F×†ÖRÂÆ&VÂ’ÂF–ÖT÷G2æF—7Æ”f÷&ÖG2æFFWF–ÖR“° —ÒÀ  ’ò¢  ’¢gVæ7F–öâFòf÷&ÖBâ–æF—f–GVÂF–6²Ö&° ’¢&—fFP ’¢ð —F–6´f÷&ÖDgVæ7F–öã¢gVæ7F–öâ‡F–ÖRÂ–æFW‚ÂF–6·2Âf÷&ÖB’° —f"ÖRÒF†—3° —f"FFW"ÒÖRåöFFW#° —f"÷F–öç2ÒÖRæ÷F–öç3° —f"f÷&ÖG2Ò÷F–öç2çF–ÖRæF—7Æ”f÷&ÖG3° —f"Ö–æ÷$f÷&ÖBÒf÷&ÖG5¶ÖRå÷Væ—EÓ° —f"Ö¦÷%Væ—BÒÖRåöÖ¦÷%Væ—C° —f"Ö¦÷$f÷&ÖBÒf÷&ÖG5¶Ö¦÷%Væ—EÓ° —f"F–6²ÒF–6·5¶–æFW…Ó° —f"F–6´÷G2Ò÷F–öç2çF–6·3° —f"Ö¦÷"ÒÖ¦÷%Væ—BbbÖ¦÷$f÷&ÖBbbF–6²bbF–6²æÖ¦÷#° —f"Æ&VÂÒFFW"æf÷&ÖB‡F–ÖRÂf÷&ÖBòf÷&ÖB¢Ö¦÷"òÖ¦÷$f÷&ÖB¢Ö–æ÷$f÷&ÖB“° —f"æW7FVEF–6´÷G2ÒÖ¦÷"òF–6´÷G2æÖ¦÷"¢F–6´÷G2æÖ–æ÷#° —f"f÷&ÖGFW"Ò&W6öÇfRCR…° –æW7FVEF–6´÷G2æ6ÆÆ&6²À –æW7FVEF–6´÷G2çW6W$6ÆÆ&6²À —F–6´÷G2æ6ÆÆ&6²À —F–6´÷G2çW6W$6ÆÆ&6° •Ò“°  —&WGW&âf÷&ÖGFW"òf÷&ÖGFW"†Æ&VÂÂ–æFW‚ÂF–6·2’¢Æ&VÃ° —ÒÀ  –6öçfW'EF–6·5FôÆ&VÇ3¢gVæ7F–öâ‡F–6·2’° —f"Æ&VÇ2ÒµÓ° —f"’Â–ÆVã°  –f÷"†’ÒÂ–ÆVâÒF–6·2æÆVæwFƒ²’Â–ÆVã²²¶’’° –Æ&VÇ2çW6‚‡F†—2çF–6´f÷&ÖDgVæ7F–öâ‡F–6·5¶•ÒçfÇVRÂ’ÂF–6·2’“° —Ð  —&WGW&âÆ&VÇ3° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð –vWE—†VÄf÷$öfg6WC¢gVæ7F–öâ‡F–ÖR’° —f"ÖRÒF†—3° —f"öfg6WG2ÒÖRåööfg6WG3° —f"÷2Ò–çFW'öÆFRC†ÖRå÷F&ÆRÂwF–ÖRrÂF–ÖRÂw÷2r“° —&WGW&âÖRævWE—†VÄf÷$FV6–ÖÂ‚†öfg6WG2ç7F'B²÷2’¢öfg6WG2æf7F÷"“° —ÒÀ  –vWE—†VÄf÷%fÇVS¢gVæ7F–öâ‡fÇVRÂ–æFW‚ÂFF6WD–æFW‚’° —f"ÖRÒF†—3° —f"F–ÖRÒçVÆÃ°  ––b†–æFW‚ÓÒVæFVf–æVBbbFF6WD–æFW‚ÓÒVæFVf–æVB’° —F–ÖRÒÖRå÷F–ÖW7F×2æFF6WG5¶FF6WD–æFW…Õ¶–æFW…Ó° —Ð  ––b‡F–ÖRÓÓÒçVÆÂ’° —F–ÖRÒ'6R†ÖRÂfÇVR“° —Ð  ––b‡F–ÖRÓÒçVÆÂ’° —&WGW&âÖRævWE—†VÄf÷$öfg6WB‡F–ÖR“° —Ð —ÒÀ  –vWE—†VÄf÷%F–6³¢gVæ7F–öâ†–æFW‚’° —f"F–6·2ÒF†—2ævWEF–6·2‚“° —&WGW&â–æFW‚ãÒbb–æFW‚ÂF–6·2æÆVæwF‚ð —F†—2ævWE—†VÄf÷$öfg6WB‡F–6·5¶–æFW…ÒçfÇVR’  –çVÆÃ° —ÒÀ  –vWEfÇVTf÷%—†VÃ¢gVæ7F–öâ‡—†VÂ’° —f"ÖRÒF†—3° —f"öfg6WG2ÒÖRåööfg6WG3° —f"÷2ÒÖRævWDFV6–ÖÄf÷%—†VÂ‡—†VÂ’òöfg6WG2æf7F÷"Òöfg6WG2æVæC° —f"F–ÖRÒ–çFW'öÆFRC†ÖRå÷F&ÆRÂw÷2rÂ÷2ÂwF–ÖRr“°  ’òòDU$T4D”ôâÂvR6†÷VÆB&WGW&âF–ÖRF—&V7FÇ —&WGW&âÖRåöFFW"åö7&VFR‡F–ÖR“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWDÆ&VÅ6—¦S¢gVæ7F–öâ†Æ&VÂ’° —f"ÖRÒF†—3° —f"F–6·4÷G2ÒÖRæ÷F–öç2çF–6·3° —f"F–6´Æ&VÅv–GF‚ÒÖRæ7G‚æÖV7W&UFW‡B†Æ&VÂ’çv–GFƒ° —f"ævÆRÒ†VÇW'2CçFõ&F–ç2†ÖRæ—4†÷&—¦öçFÂ‚’òF–6·4÷G2æÖ…&÷FF–öâ¢F–6·4÷G2æÖ–å&÷FF–öâ“° —f"6÷5&÷FF–öâÒÖF‚æ6÷2†ævÆR“° —f"6–å&÷FF–öâÒÖF‚ç6–â†ævÆR“° —f"F–6´föçE6—¦RÒfÇVT÷$FVfVÇBFB‡F–6·4÷G2æföçE6—¦RÂ6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇDföçE6—¦R“°  —&WGW&â° —s¢‡F–6´Æ&VÅv–GF‚¢6÷5&÷FF–öâ’²‡F–6´föçE6—¦R¢6–å&÷FF–öâ’À –ƒ¢‡F–6´Æ&VÅv–GF‚¢6–å&÷FF–öâ’²‡F–6´föçE6—¦R¢6÷5&÷FF–öâ —Ó° —ÒÀ  ’ò¢  ’¢7'VFR&÷†–ÖF–öâöbv†BF†RÆ&VÂv–GF‚Ö–v‡B&P ’¢&—fFP ’¢ð –vWDÆ&VÅv–GFƒ¢gVæ7F–öâ†Æ&VÂ’° —&WGW&âF†—2åövWDÆ&VÅ6—¦R†Æ&VÂ’çs° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð –vWDÆ&VÄ66—G“¢gVæ7F–öâ†W†×ÆUF–ÖR’° —f"ÖRÒF†—3° —f"F–ÖT÷G2ÒÖRæ÷F–öç2çF–ÖS° —f"F—7Æ”f÷&ÖG2ÒF–ÖT÷G2æF—7Æ”f÷&ÖG3°  ’òò–6²F†RÆöævW7Bf÷&ÖB†Ö–ÆÆ—6V6öæG2’f÷"wVW7F–ÖF–öà —f"f÷&ÖBÒF—7Æ”f÷&ÖG5·F–ÖT÷G2çVæ—EÒÇÂF—7Æ”f÷&ÖG2æÖ–ÆÆ—6V6öæC° —f"W†×ÆTÆ&VÂÒÖRçF–6´f÷&ÖDgVæ7F–öâ†W†×ÆUF–ÖRÂÂF–6·4g&öÕF–ÖW7F×2†ÖRÂ¶W†×ÆUF–ÖUÒÂÖRåöÖ¦÷%Væ—B’Âf÷&ÖB“° —f"6—¦RÒÖRåövWDÆ&VÅ6—¦R†W†×ÆTÆ&VÂ“° —f"66—G’ÒÖF‚æfÆö÷"†ÖRæ—4†÷&—¦öçFÂ‚’òÖRçv–GF‚ò6—¦Rçr¢ÖRæ†V–v‡Bò6—¦Ræ‚“°  ––b†ÖRæ÷F–öç2æöfg6WB’° –66—G’ÒÓ° —Ð  —&WGW&â66—G’âò66—G’¢° —Ð§Ò“° ¢òò”åDU$äÃ¢7FF–2FVfVÇB÷F–öç2Â&Vv—7FW&VB–â7&2ö–æFW‚æ§0§f"öFVfVÇG2CBÒFVfVÇD6öæf–rCC°§66ÆU÷F–ÖRåöFVfVÇG2ÒöFVfVÇG2CC° §f"66ÆW2Ò° –6FVv÷'“¢66ÆUö6FVv÷'’À –Æ–æV#¢66ÆUöÆ–æV"À –Æöv&—F†Ö–3¢66ÆUöÆöv&—F†Ö–2À —&F–ÄÆ–æV#¢66ÆU÷&F–ÄÆ–æV"À —F–ÖS¢66ÆU÷F–ÖP§Ó° §f"dõ$ÔE2Ò° –FFWF–ÖS¢tÔÔÒBÂ•••’Âƒ¦ÖÓ§72rÀ –Ö–ÆÆ—6V6öæC¢vƒ¦ÖÓ§72å552rÀ —6V6öæC¢vƒ¦ÖÓ§72rÀ –Ö–çWFS¢vƒ¦ÖÒrÀ –†÷W#¢v„rÀ –F“¢tÔÔÒBrÀ —vVV³¢vÆÂrÀ –ÖöçFƒ¢tÔÔÒ•••’rÀ —V'FW#¢uµÕÒ•••’rÀ —–V#¢u•••’p§Ó° ¦6÷&UöFFW'2åöFFRæ÷fW'&–FR‡G—VöbÖöÖVçBÓÓÒvgVæ7F–öârò° •ö–C¢vÖöÖVçBrÂòòDT%TrôäÅ  –f÷&ÖG3¢gVæ7F–öâ‚’° —&WGW&âdõ$ÔE3° —ÒÀ  —'6S¢gVæ7F–öâ‡fÇVRÂf÷&ÖB’° ––b‡G—VöbfÇVRÓÓÒw7G&–ærrbbG—Vöbf÷&ÖBÓÓÒw7G&–ærr’° —fÇVRÒÖöÖVçB‡fÇVRÂf÷&ÖB“° —ÒVÇ6R–b‚‡fÇVR–ç7Fæ6VöbÖöÖVçB’’° —fÇVRÒÖöÖVçB‡fÇVR“° —Ð —&WGW&âfÇVRæ—5fÆ–B‚’òfÇVRçfÇVTöb‚’¢çVÆÃ° —ÒÀ  –f÷&ÖC¢gVæ7F–öâ‡F–ÖRÂf÷&ÖB’° —&WGW&âÖöÖVçB‡F–ÖR’æf÷&ÖB†f÷&ÖB“° —ÒÀ  –FC¢gVæ7F–öâ‡F–ÖRÂÖ÷VçBÂVæ—B’° —&WGW&âÖöÖVçB‡F–ÖR’æFB†Ö÷VçBÂVæ—B’çfÇVTöb‚“° —ÒÀ  –F–fc¢gVæ7F–öâ†Ö‚ÂÖ–âÂVæ—B’° —&WGW&âÖöÖVçB†Ö‚’æF–fb†ÖöÖVçB†Ö–â’ÂVæ—B“° —ÒÀ  —7F'Döc¢gVæ7F–öâ‡F–ÖRÂVæ—BÂvVV¶F’’° —F–ÖRÒÖöÖVçB‡F–ÖR“° ––b‡Væ—BÓÓÒv—6õvVV²r’° —&WGW&âF–ÖRæ—6õvVV¶F’‡vVV¶F’’çfÇVTöb‚“° —Ð —&WGW&âF–ÖRç7F'Döb‡Væ—B’çfÇVTöb‚“° —ÒÀ  –VæDöc¢gVæ7F–öâ‡F–ÖRÂVæ—B’° —&WGW&âÖöÖVçB‡F–ÖR’æVæDöb‡Væ—B’çfÇVTöb‚“° —ÒÀ  ’òòDU$T4D”ôå0  ’ò¢  ’¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’v—F‚66ÆRævWEfÇVTf÷%—†VÂ‚’à ’¢FW&V6FVB6–æ6RfW'6–öâ"ã‚ã  ’¢FöFò&VÖ÷fRBfW'6–öâ0 ’¢&—fFP ’¢ð •ö7&VFS¢gVæ7F–öâ‡F–ÖR’° —&WGW&âÖöÖVçB‡F–ÖR“° —ÒÀ§Ò¢·Ò“° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° —ÇVv–ç3¢° –f–ÆÆW#¢° —&÷vFS¢G'VP —Ð —Ð§Ò“° §f"ÖW'2Ò° –FF6WC¢gVæ7F–öâ‡6÷W&6R’° —f"–æFW‚Ò6÷W&6Ræf–ÆÃ° —f"6†'BÒ6÷W&6Ræ6†'C° —f"ÖWFÒ6†'BævWDFF6WDÖWF†–æFW‚“° —f"f—6–&ÆRÒÖWFbb6†'Bæ—4FF6WEf—6–&ÆR†–æFW‚“° —f"ö–çG2Ò‡f—6–&ÆRbbÖWFæFF6WBåö6†–ÆG&Vâ’ÇÂµÓ° —f"ÆVæwF‚Òö–çG2æÆVæwF‚ÇÂ°  —&WGW&âÆVæwF‚òçVÆÂ¢gVæ7F–öâ‡ö–çBÂ’’° —&WGW&â†’ÂÆVæwF‚bbö–çG5¶•Òå÷f–Wr’ÇÂçVÆÃ° —Ó° —ÒÀ  –&÷VæF'“¢gVæ7F–öâ‡6÷W&6R’° —f"&÷VæF'’Ò6÷W&6Ræ&÷VæF'“° —f"‚Ò&÷VæF'’ò&÷VæF'’ç‚¢çVÆÃ° —f"’Ò&÷VæF'’ò&÷VæF'’ç’¢çVÆÃ°  ––b††VÇW'2Cæ—4'&’†&÷VæF'’’’° —&WGW&âgVæ7F–öâ‡ö–çBÂ’’° —&WGW&â&÷VæF'•¶•Ó° —Ó° —Ð  —&WGW&âgVæ7F–öâ‡ö–çB’° —&WGW&â° —ƒ¢‚ÓÓÒçVÆÂòö–çBç‚¢‚À —“¢’ÓÓÒçVÆÂòö–çBç’¢’À —Ó° —Ó° —Ð§Ó° ¢òòFöFò–b†f–ÆÅ³ÒÓÓÒr2r¦gVæ7F–öâFV6öFTf–ÆÂ†VÂÂ–æFW‚Â6÷VçB’° —f"ÖöFVÂÒVÂåöÖöFVÂÇÂ·Ó° —f"f–ÆÂÒÖöFVÂæf–ÆÃ° —f"F&vWC°  ––b†f–ÆÂÓÓÒVæFVf–æVB’° –f–ÆÂÒÖöFVÂæ&6¶w&÷VæD6öÆ÷#° —Ð  ––b†f–ÆÂÓÓÒfÇ6RÇÂf–ÆÂÓÓÒçVÆÂ’° —&WGW&âfÇ6S° —Ð  ––b†f–ÆÂÓÓÒG'VR’° —&WGW&âv÷&–v–âs° —Ð  —F&vWBÒ'6TfÆöB†f–ÆÂÂ“° ––b†—4f–æ—FR‡F&vWB’bbÖF‚æfÆö÷"‡F&vWB’ÓÓÒF&vWB’° ––b†f–ÆÅ³ÒÓÓÒrÒrÇÂf–ÆÅ³ÒÓÓÒr²r’° —F&vWBÒ–æFW‚²F&vWC° —Ð  ––b‡F&vWBÓÓÒ–æFW‚ÇÂF&vWBÂÇÂF&vWBãÒ6÷VçB’° —&WGW&âfÇ6S° —Ð  —&WGW&âF&vWC° —Ð  —7v—F6‚†f–ÆÂ’° ’òò6ö×F–&–Æ—G –66Rv&÷GFöÒs  —&WGW&âw7F'Bs° –66RwF÷s  —&WGW&âvVæBs° –66Rw¦W&òs  —&WGW&âv÷&–v–âs° ’òò7W÷'FVB&÷VæF&–W0 –66Rv÷&–v–âs  –66Rw7F'Bs  –66RvVæBs  —&WGW&âf–ÆÃ° ’òò–çfÆ–Bf–ÆÂfÇVW0 –FVfVÇC  —&WGW&âfÇ6S° —Ð§Ð ¦gVæ7F–öâ6ö×WFTÆ–æV$&÷VæF'’‡6÷W&6R’° —f"ÖöFVÂÒ6÷W&6RæVÂåöÖöFVÂÇÂ·Ó° —f"66ÆRÒ6÷W&6RæVÂå÷66ÆRÇÂ·Ó° —f"f–ÆÂÒ6÷W&6Ræf–ÆÃ° —f"F&vWBÒçVÆÃ° —f"†÷&—¦öçFÃ°  ––b†—4f–æ—FR†f–ÆÂ’’° —&WGW&âçVÆÃ° —Ð  ’òò&6·v&B6ö×F–&–Æ—G“¢VçF–Âc2ÂvR7F–ÆÂæVVBFò7W÷'B&÷VæF'’fÇVW26WBöà ’òòF†RÖöFVÂ‡66ÆUF÷Â66ÆT&÷GFöÒæB66ÆU¦W&ò’&V6W6R6öÖRW‡FW&æÂÇVv–ç2æ@ ’òò6öçG&öÆÆW'2Ö–v‡B7F–ÆÂW6R—B†RærâF†R6Ö—F‚6†'B’à  ––b†f–ÆÂÓÓÒw7F'Br’° —F&vWBÒÖöFVÂç66ÆT&÷GFöÒÓÓÒVæFVf–æVBò66ÆRæ&÷GFöÒ¢ÖöFVÂç66ÆT&÷GFöÓ° —ÒVÇ6R–b†f–ÆÂÓÓÒvVæBr’° —F&vWBÒÖöFVÂç66ÆUF÷ÓÓÒVæFVf–æVBò66ÆRçF÷¢ÖöFVÂç66ÆUF÷° —ÒVÇ6R–b†ÖöFVÂç66ÆU¦W&òÓÒVæFVf–æVB’° —F&vWBÒÖöFVÂç66ÆU¦W&ó° —ÒVÇ6R–b‡66ÆRævWD&6U—†VÂ’° —F&vWBÒ66ÆRævWD&6U—†VÂ‚“° —Ð  ––b‡F&vWBÓÒVæFVf–æVBbbF&vWBÓÒçVÆÂ’° ––b‡F&vWBç‚ÓÒVæFVf–æVBbbF&vWBç’ÓÒVæFVf–æVB’° —&WGW&âF&vWC° —Ð  ––b††VÇW'2Cæ—4f–æ—FR‡F&vWB’’° –†÷&—¦öçFÂÒ66ÆRæ—4†÷&—¦öçFÂ‚“° —&WGW&â° —ƒ¢†÷&—¦öçFÂòF&vWB¢çVÆÂÀ —“¢†÷&—¦öçFÂòçVÆÂ¢F&vW@ —Ó° —Ð —Ð  —&WGW&âçVÆÃ°§Ð ¦gVæ7F–öâ6ö×WFT6—&7VÆ$&÷VæF'’‡6÷W&6R’° —f"66ÆRÒ6÷W&6RæVÂå÷66ÆS° —f"÷F–öç2Ò66ÆRæ÷F–öç3° —f"ÆVæwF‚Ò66ÆRæ6†'BæFFæÆ&VÇ2æÆVæwFƒ° —f"f–ÆÂÒ6÷W&6Ræf–ÆÃ° —f"F&vWBÒµÓ° —f"7F'BÂVæBÂ6VçFW"Â’Âö–çC°  ––b‚ÆVæwF‚’° —&WGW&âçVÆÃ° —Ð  —7F'BÒ÷F–öç2çF–6·2ç&WfW'6Rò66ÆRæÖ‚¢66ÆRæÖ–ã° –VæBÒ÷F–öç2çF–6·2ç&WfW'6Rò66ÆRæÖ–â¢66ÆRæÖƒ° –6VçFW"Ò66ÆRævWEö–çE÷6—F–öäf÷%fÇVRƒÂ7F'B“° –f÷"†’Ò²’ÂÆVæwFƒ²²¶’’° —ö–çBÒf–ÆÂÓÓÒw7F'BrÇÂf–ÆÂÓÓÒvVæBp “ò66ÆRævWEö–çE÷6—F–öäf÷%fÇVR†’Âf–ÆÂÓÓÒw7F'Brò7F'B¢VæB “¢66ÆRævWD&6U÷6—F–öâ†’“° ––b†÷F–öç2æw&–DÆ–æW2æ6—&7VÆ"’° —ö–çBæ7‚Ò6VçFW"çƒ° —ö–çBæ7’Ò6VçFW"ç“° —ö–çBæævÆRÒ66ÆRævWD–æFW„ævÆR†’’ÒÖF‚å’ò#° —Ð —F&vWBçW6‚‡ö–çB“° —Ð —&WGW&âF&vWC°§Ð ¦gVæ7F–öâ6ö×WFT&÷VæF'’‡6÷W&6R’° —f"66ÆRÒ6÷W&6RæVÂå÷66ÆRÇÂ·Ó°  ––b‡66ÆRævWEö–çE÷6—F–öäf÷%fÇVR’° —&WGW&â6ö×WFT6—&7VÆ$&÷VæF'’‡6÷W&6R“° —Ð —&WGW&â6ö×WFTÆ–æV$&÷VæF'’‡6÷W&6R“°§Ð ¦gVæ7F–öâ&W6öÇfUF&vWB‡6÷W&6W2Â–æFW‚Â&÷vFR’° —f"6÷W&6RÒ6÷W&6W5¶–æFW…Ó° —f"f–ÆÂÒ6÷W&6Ræf–ÆÃ° —f"f—6—FVBÒ¶–æFW…Ó° —f"F&vWC°  ––b‚&÷vFR’° —&WGW&âf–ÆÃ° —Ð  —v†–ÆR†f–ÆÂÓÒfÇ6Rbbf—6—FVBæ–æFW„öb†f–ÆÂ’ÓÓÒÓ’° ––b‚—4f–æ—FR†f–ÆÂ’’° —&WGW&âf–ÆÃ° —Ð  —F&vWBÒ6÷W&6W5¶f–ÆÅÓ° ––b‚F&vWB’° —&WGW&âfÇ6S° —Ð  ––b‡F&vWBçf—6–&ÆR’° —&WGW&âf–ÆÃ° —Ð  —f—6—FVBçW6‚†f–ÆÂ“° –f–ÆÂÒF&vWBæf–ÆÃ° —Ð  —&WGW&âfÇ6S°§Ð ¦gVæ7F–öâ7&VFTÖW"‡6÷W&6R’° —f"f–ÆÂÒ6÷W&6Ræf–ÆÃ° —f"G—RÒvFF6WBs°  ––b†f–ÆÂÓÓÒfÇ6R’° —&WGW&âçVÆÃ° —Ð  ––b‚—4f–æ—FR†f–ÆÂ’’° —G—RÒv&÷VæF'’s° —Ð  —&WGW&âÖW'5·G—UÒ‡6÷W&6R“°§Ð ¦gVæ7F–öâ—4G&v&ÆR‡ö–çB’° —&WGW&âö–çBbbö–çBç6¶—°§Ð ¦gVæ7F–öâG&t&V†7G‚Â7W'fSÂ7W'fSÂÆVãÂÆVã’° —f"’Â7‚Â7’Â#°  ––b‚ÆVãÇÂÆVã’° —&WGW&ã° —Ð  ’òò'V–ÆF–ærf—'7B&V7W'fR†æ÷&ÖÂ –7G‚æÖ÷fUFò†7W'fS³Òç‚Â7W'fS³Òç’“° –f÷"†’Ò²’ÂÆVã²²¶’’° –†VÇW'2Cæ6çf2æÆ–æUFò†7G‚Â7W'fS¶’ÒÒÂ7W'fS¶•Ò“° —Ð  ––b†7W'fS³ÒæævÆRÓÒVæFVf–æVB’° –7‚Ò7W'fS³Òæ7ƒ° –7’Ò7W'fS³Òæ7“° —"ÒÖF‚ç7'B„ÖF‚ç÷r†7W'fS³Òç‚Ò7‚Â"’²ÖF‚ç÷r†7W'fS³Òç’Ò7’Â"’“° –f÷"†’ÒÆVãÒ²’â²ÒÖ’’° –7G‚æ&2†7‚Â7’Â"Â7W'fS¶•ÒæævÆRÂ7W'fS¶’ÒÒæævÆRÂG'VR“° —Ð —&WGW&ã° —Ð  ’òò¦ö–æ–ærF†RGvò&V7W'fW0 –7G‚æÆ–æUFò†7W'fS¶ÆVãÒÒç‚Â7W'fS¶ÆVãÒÒç’“°  ’òò'V–ÆF–ær÷÷6—FR&V7W'fR‡&WfW'6R –f÷"†’ÒÆVãÒ²’â²ÒÖ’’° –†VÇW'2Cæ6çf2æÆ–æUFò†7G‚Â7W'fS¶•ÒÂ7W'fS¶’ÒÒÂG'VR“° —Ð§Ð ¦gVæ7F–öâFôf–ÆÂ†7G‚Âö–çG2ÂÖW"Âf–WrÂ6öÆ÷"ÂÆö÷’° —f"6÷VçBÒö–çG2æÆVæwFƒ° —f"7âÒf–Wrç7äv3° —f"7W'fSÒµÓ° —f"7W'fSÒµÓ° —f"ÆVãÒ° —f"ÆVãÒ° —f"’Â–ÆVâÂ–æFW‚ÂÂÂCÂCÂÆö÷öfg6WC°  –7G‚æ&Vv–åF‚‚“°  –f÷"†’ÒÂ–ÆVâÒ6÷VçC²’Â–ÆVã²²¶’’° ––æFW‚Ò’R6÷VçC° —Òö–çG5¶–æFW…Òå÷f–Ws° —ÒÖW"‡Â–æFW‚Âf–Wr“° –CÒ—4G&v&ÆR‡“° –CÒ—4G&v&ÆR‡“°  ––b†Æö÷bbÆö÷öfg6WBÓÓÒVæFVf–æVBbbC’° –Æö÷öfg6WBÒ’²° ––ÆVâÒ6÷VçB²Æö÷öfg6WC° —Ð  ––b†CbbC’° –ÆVãÒ7W'fSçW6‚‡“° –ÆVãÒ7W'fSçW6‚‡“° —ÒVÇ6R–b†ÆVãbbÆVã’° ––b‚7â’° –G&t&V†7G‚Â7W'fSÂ7W'fSÂÆVãÂÆVã“° –ÆVãÒÆVãÒ° –7W'fSÒµÓ° –7W'fSÒµÓ° —ÒVÇ6R° ––b†C’° –7W'fSçW6‚‡“° —Ð ––b†C’° –7W'fSçW6‚‡“° —Ð —Ð —Ð —Ð  –G&t&V†7G‚Â7W'fSÂ7W'fSÂÆVãÂÆVã“°  –7G‚æ6Æ÷6UF‚‚“° –7G‚æf–ÆÅ7G–ÆRÒ6öÆ÷#° –7G‚æf–ÆÂ‚“°§Ð §f"ÇVv–åöf–ÆÆW"Ò° ––C¢vf–ÆÆW"rÀ  –gFW$FF6WG5WFFS¢gVæ7F–öâ†6†'BÂ÷F–öç2’° —f"6÷VçBÒ†6†'BæFFæFF6WG2ÇÂµÒ’æÆVæwFƒ° —f"&÷vFRÒ÷F–öç2ç&÷vFS° —f"6÷W&6W2ÒµÓ° —f"ÖWFÂ’ÂVÂÂ6÷W&6S°  –f÷"†’Ò²’Â6÷VçC²²¶’’° –ÖWFÒ6†'BævWDFF6WDÖWF†’“° –VÂÒÖWFæFF6WC° —6÷W&6RÒçVÆÃ°  ––b†VÂbbVÂåöÖöFVÂbbVÂ–ç7Fæ6VöbVÆVÖVçG2äÆ–æR’° —6÷W&6RÒ° —f—6–&ÆS¢6†'Bæ—4FF6WEf—6–&ÆR†’’À –f–ÆÃ¢FV6öFTf–ÆÂ†VÂÂ’Â6÷VçB’À –6†'C¢6†'BÀ –VÃ¢VÀ —Ó° —Ð  –ÖWFâFf–ÆÆW"Ò6÷W&6S° —6÷W&6W2çW6‚‡6÷W&6R“° —Ð  –f÷"†’Ò²’Â6÷VçC²²¶’’° —6÷W&6RÒ6÷W&6W5¶•Ó° ––b‚6÷W&6R’° –6öçF–çVS° —Ð  —6÷W&6Ræf–ÆÂÒ&W6öÇfUF&vWB‡6÷W&6W2Â’Â&÷vFR“° —6÷W&6Ræ&÷VæF'’Ò6ö×WFT&÷VæF'’‡6÷W&6R“° —6÷W&6RæÖW"Ò7&VFTÖW"‡6÷W&6R“° —Ð —ÒÀ  –&Vf÷&TFF6WG4G&s¢gVæ7F–öâ†6†'B’° —f"ÖWF6WG2Ò6†'BåövWE6÷'FVEf—6–&ÆTFF6WDÖWF2‚“° —f"7G‚Ò6†'Bæ7Gƒ° —f"ÖWFÂ’ÂVÂÂf–WrÂö–çG2ÂÖW"Â6öÆ÷#°  –f÷"†’ÒÖWF6WG2æÆVæwF‚Ò²’ãÒ²ÒÖ’’° –ÖWFÒÖWF6WG5¶•ÒâFf–ÆÆW#°  ––b‚ÖWFÇÂÖWFçf—6–&ÆR’° –6öçF–çVS° —Ð  –VÂÒÖWFæVÃ° —f–WrÒVÂå÷f–Ws° —ö–çG2ÒVÂåö6†–ÆG&VâÇÂµÓ° –ÖW"ÒÖWFæÖW#° –6öÆ÷"Òf–Wræ&6¶w&÷VæD6öÆ÷"ÇÂ6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇD6öÆ÷#°  ––b†ÖW"bb6öÆ÷"bbö–çG2æÆVæwF‚’° –†VÇW'2Cæ6çf2æ6Æ—&V†7G‚Â6†'Bæ6†'D&V“° –Fôf–ÆÂ†7G‚Âö–çG2ÂÖW"Âf–WrÂ6öÆ÷"ÂVÂåöÆö÷“° –†VÇW'2Cæ6çf2çVæ6Æ—&V†7G‚“° —Ð —Ð —Ð§Ó° §f"vWE'FÄ†VÇW"CÒ†VÇW'2Cç'FÂævWE'FÄFFW#°§f"æö÷CÒ†VÇW'2Cææö÷°§f"fÇVT÷$FVfVÇBFRÒ†VÇW'2CçfÇVT÷$FVfVÇC° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° –ÆVvVæC¢° –F—7Æ“¢G'VRÀ —÷6—F–öã¢wF÷rÀ –Æ–vã¢v6VçFW"rÀ –gVÆÅv–GFƒ¢G'VRÀ —&WfW'6S¢fÇ6RÀ —vV–v‡C¢À  ’òò6ÆÆ&6²F†Bv–ÆÂ†æFÆP –öä6Æ–6³¢gVæ7F–öâ†RÂÆVvVæD—FVÒ’° —f"–æFW‚ÒÆVvVæD—FVÒæFF6WD–æFWƒ° —f"6’ÒF†—2æ6†'C° —f"ÖWFÒ6’ævWDFF6WDÖWF†–æFW‚“°  ’òò6VR6öçG&öÆÆW"æ—4FF6WEf—6–&ÆR6öÖÖVç@ –ÖWFæ†–FFVâÒÖWFæ†–FFVâÓÓÒçVÆÂò6’æFFæFF6WG5¶–æFW…Òæ†–FFVâ¢çVÆÃ°  ’òòvR†–BFF6WBâââ&W&VæFW"F†R6†'@ –6’çWFFR‚“° —ÒÀ  –öä†÷fW#¢çVÆÂÀ –öäÆVfS¢çVÆÂÀ  –Æ&VÇ3¢° –&÷…v–GFƒ¢CÀ —FF–æs¢À ’òòvVæW&FW2Æ&VÇ26†÷vâ–âF†RÆVvVæ@ ’òòfÆ–B&÷W'F–W2Fò&WGW&ã  ’òòFW‡B¢FW‡BFòF—7Æ ’òòf–ÆÅ7G–ÆR¢f–ÆÂöb6öÆ÷W&VB&÷€ ’òò7G&ö¶U7G–ÆS¢7G&ö¶Röb6öÆ÷W&VB&÷€ ’òò†–FFVâ¢–bF†—2ÆVvVæB—FVÒ&VfW'2Fò†–FFVâ—FVÐ ’òòÆ–æT6¢67G–ÆRf÷"Æ–æP ’òòÆ–æTF6€ ’òòÆ–æTF6„öfg6WB  ’òòÆ–æT¦ö–â  ’òòÆ–æUv–GF‚  –vVæW&FTÆ&VÇ3¢gVæ7F–öâ†6†'B’° —f"FF6WG2Ò6†'BæFFæFF6WG3° —f"÷F–öç2Ò6†'Bæ÷F–öç2æÆVvVæBÇÂ·Ó° —f"W6Uö–çE7G–ÆRÒ÷F–öç2æÆ&VÇ2bb÷F–öç2æÆ&VÇ2çW6Uö–çE7G–ÆS°  —&WGW&â6†'BåövWE6÷'FVDFF6WDÖWF2‚’æÖ†gVæ7F–öâ†ÖWF’° —f"7G–ÆRÒÖWFæ6öçG&öÆÆW"ævWE7G–ÆR‡W6Uö–çE7G–ÆRò¢VæFVf–æVB“°  —&WGW&â° —FW‡C¢FF6WG5¶ÖWFæ–æFW…ÒæÆ&VÂÀ –f–ÆÅ7G–ÆS¢7G–ÆRæ&6¶w&÷VæD6öÆ÷"À –†–FFVã¢6†'Bæ—4FF6WEf—6–&ÆR†ÖWFæ–æFW‚’À –Æ–æT6¢7G–ÆRæ&÷&FW$67G–ÆRÀ –Æ–æTF6ƒ¢7G–ÆRæ&÷&FW$F6‚À –Æ–æTF6„öfg6WC¢7G–ÆRæ&÷&FW$F6„öfg6WBÀ –Æ–æT¦ö–ã¢7G–ÆRæ&÷&FW$¦ö–å7G–ÆRÀ –Æ–æUv–GFƒ¢7G–ÆRæ&÷&FW%v–GF‚À —7G&ö¶U7G–ÆS¢7G–ÆRæ&÷&FW$6öÆ÷"À —ö–çE7G–ÆS¢7G–ÆRçö–çE7G–ÆRÀ —&÷FF–öã¢7G–ÆRç&÷FF–öâÀ  ’òò&VÆ÷r—2W‡G&FFW6VBf÷"FövvÆ–ærF†RFF6WG0 –FF6WD–æFWƒ¢ÖWFæ–æFW€ —Ó° —ÒÂF†—2“° —Ð —Ð —ÒÀ  –ÆVvVæD6ÆÆ&6³¢gVæ7F–öâ†6†'B’° —f"Æ—7BÒFö7VÖVçBæ7&VFTVÆVÖVçB‚wVÂr“° —f"FF6WG2Ò6†'BæFFæFF6WG3° —f"’Â–ÆVâÂÆ—7D—FVÒÂÆ—7D—FVÕ7ã°  –Æ—7Bç6WDGG&–'WFR‚v6Æ72rÂ6†'Bæ–B²rÖÆVvVæBr“°  –f÷"†’ÒÂ–ÆVâÒFF6WG2æÆVæwFƒ²’Â–ÆVã²’²²’° –Æ—7D—FVÒÒÆ—7BæVæD6†–ÆB†Fö7VÖVçBæ7&VFTVÆVÖVçB‚vÆ’r’“° –Æ—7D—FVÕ7âÒÆ—7D—FVÒæVæD6†–ÆB†Fö7VÖVçBæ7&VFTVÆVÖVçB‚w7âr’“° –Æ—7D—FVÕ7âç7G–ÆRæ&6¶w&÷VæD6öÆ÷"ÒFF6WG5¶•Òæ&6¶w&÷VæD6öÆ÷#° ––b†FF6WG5¶•ÒæÆ&VÂ’° –Æ—7D—FVÒæVæD6†–ÆB†Fö7VÖVçBæ7&VFUFW‡DæöFR†FF6WG5¶•ÒæÆ&VÂ’“° —Ð —Ð  —&WGW&âÆ—7Bæ÷WFW$…DÔÃ° —Ð§Ò“° ¢ò¢ ¢¢†VÇW"gVæ7F–öâFòvWBF†R&÷‚v–GF‚&6VBöâF†RW6Uö–çE7G–ÆR÷F–öà¢¢&Ò¶ö&¦V7GÒÆ&VÆ÷G2ÒF†RÆ&VÂ÷F–öç2öâF†RÆVvVæ@¢¢&Ò¶çVÖ&W'ÒföçE6—¦RÒF†RÆ&VÂföçB6—¦P¢¢&WGW&â¶çVÖ&W'Òv–GF‚öbF†R6öÆ÷"&÷‚&V¢¢ð¦gVæ7F–öâvWD&÷…v–GF‚†Æ&VÄ÷G2ÂföçE6—¦R’° —&WGW&âÆ&VÄ÷G2çW6Uö–çE7G–ÆRbbÆ&VÄ÷G2æ&÷…v–GF‚âföçE6—¦Rð –föçE6—¦R  –Æ&VÄ÷G2æ&÷…v–GFƒ°§Ð ¢ò¢ ¢¢”Õõ%DåC¢F†—26Æ72—2W‡÷6VBV&Æ–6Ç’26†'BäÆVvVæBÂ&6·v&B6ö×F–&–Æ—G’&WV—&VB¢¢ð§f"ÆVvVæBÒ6÷&UöVÆVÖVçBæW‡FVæB‡°  ––æ—F–Æ—¦S¢gVæ7F–öâ†6öæf–r’° —f"ÖRÒF†—3° –†VÇW'2CæW‡FVæB†ÖRÂ6öæf–r“°  ’òò6öçF–ç2†—B&÷†W2f÷"V6‚FF6WB†–âFF6WB÷&FW" –ÖRæÆVvVæD†—D&÷†W2ÒµÓ°  ’ò¢ ¢ ’¢&—fFP¢ ’¢ð –ÖRåö†÷fW&VD—FVÒÒçVÆÃ°  ’òò&RvR–âF÷Vv†çWBÖöFRv†–6‚†2F–ffW&VçBFFG—P –ÖRæF÷Vv†çWDÖöFRÒfÇ6S° —ÒÀ  ’òòF†W6RÖWF†öG2&R÷&FW&VB'’Æ–fV7–6ÆRâWF–Æ—F–W2F†VâföÆÆ÷rà ’òòç’gVæ7F–öâFVf–æVB†W&R—2–æ†W&—FVB'’ÆÂÆVvVæBG—W2à ’òòç’gVæ7F–öâ6â&RW‡FVæFVB'’F†RÆVvVæBG—P  –&Vf÷&UWFFS¢æö÷CÀ —WFFS¢gVæ7F–öâ†Ö…v–GF‚ÂÖ„†V–v‡BÂÖ&v–ç2’° —f"ÖRÒF†—3°  ’òòWFFRÆ–fV7–6ÆRÒ&ö&&Ç’FöâwBvçBFòWfW"W‡FVæB÷"÷fW'w&—FRF†—2gVæ7F–öâ² –ÖRæ&Vf÷&UWFFR‚“°  ’òò'6÷&"F†RÖ7FW"ÖV7W&VÖVçG0 –ÖRæÖ…v–GF‚ÒÖ…v–GFƒ° –ÖRæÖ„†V–v‡BÒÖ„†V–v‡C° –ÖRæÖ&v–ç2ÒÖ&v–ç3°  ’òòF–ÖVç6–öç0 –ÖRæ&Vf÷&U6WDF–ÖVç6–öç2‚“° –ÖRç6WDF–ÖVç6–öç2‚“° –ÖRægFW%6WDF–ÖVç6–öç2‚“° ’òòÆ&VÇ0 –ÖRæ&Vf÷&T'V–ÆDÆ&VÇ2‚“° –ÖRæ'V–ÆDÆ&VÇ2‚“° –ÖRægFW$'V–ÆDÆ&VÇ2‚“°  ’òòf—@ –ÖRæ&Vf÷&Tf—B‚“° –ÖRæf—B‚“° –ÖRægFW$f—B‚“° ’òð –ÖRægFW%WFFR‚“°  —&WGW&âÖRæÖ–å6—¦S° —ÒÀ –gFW%WFFS¢æö÷CÀ  ’òð  –&Vf÷&U6WDF–ÖVç6–öç3¢æö÷CÀ —6WDF–ÖVç6–öç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° ’òò6WBF†RVæ6öç7G&–æVBF–ÖVç6–öâ&Vf÷&RÆ&VÂ&÷FF–öà ––b†ÖRæ—4†÷&—¦öçFÂ‚’’° ’òò&W6WB÷6—F–öâ&Vf÷&R6Æ7VÆF–ær&÷FF–öà –ÖRçv–GF‚ÒÖRæÖ…v–GFƒ° –ÖRæÆVgBÒ° –ÖRç&–v‡BÒÖRçv–GFƒ° —ÒVÇ6R° –ÖRæ†V–v‡BÒÖRæÖ„†V–v‡C°  ’òò&W6WB÷6—F–öâ&Vf÷&R6Æ7VÆF–ær&÷FF–öà –ÖRçF÷Ò° –ÖRæ&÷GFöÒÒÖRæ†V–v‡C° —Ð  ’òò&W6WBFF–æp –ÖRçFF–ætÆVgBÒ° –ÖRçFF–æuF÷Ò° –ÖRçFF–æu&–v‡BÒ° –ÖRçFF–æt&÷GFöÒÒ°  ’òò&W6WBÖ–å6—¦P –ÖRæÖ–å6—¦RÒ° —v–GFƒ¢À –†V–v‡C¢  —Ó° —ÒÀ –gFW%6WDF–ÖVç6–öç3¢æö÷CÀ  ’òð  –&Vf÷&T'V–ÆDÆ&VÇ3¢æö÷CÀ –'V–ÆDÆ&VÇ3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"Æ&VÄ÷G2ÒÖRæ÷F–öç2æÆ&VÇ2ÇÂ·Ó° —f"ÆVvVæD—FV×2Ò†VÇW'2Cæ6ÆÆ&6²†Æ&VÄ÷G2ævVæW&FTÆ&VÇ2Â¶ÖRæ6†'EÒÂÖR’ÇÂµÓ°  ––b†Æ&VÄ÷G2æf–ÇFW"’° –ÆVvVæD—FV×2ÒÆVvVæD—FV×2æf–ÇFW"†gVæ7F–öâ†—FVÒ’° —&WGW&âÆ&VÄ÷G2æf–ÇFW"†—FVÒÂÖRæ6†'BæFF“° —Ò“° —Ð  ––b†ÖRæ÷F–öç2ç&WfW'6R’° –ÆVvVæD—FV×2ç&WfW'6R‚“° —Ð  –ÖRæÆVvVæD—FV×2ÒÆVvVæD—FV×3° —ÒÀ –gFW$'V–ÆDÆ&VÇ3¢æö÷CÀ  ’òð  –&Vf÷&Tf—C¢æö÷CÀ –f—C¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"Æ&VÄ÷G2Ò÷G2æÆ&VÇ3° —f"F—7Æ’Ò÷G2æF—7Æ“°  —f"7G‚ÒÖRæ7Gƒ°  —f"Æ&VÄföçBÒ†VÇW'2Cæ÷F–öç2å÷'6TföçB†Æ&VÄ÷G2“° —f"föçE6—¦RÒÆ&VÄföçBç6—¦S°  ’òò&W6WB†—B&÷†W0 —f"†—F&÷†W2ÒÖRæÆVvVæD†—D&÷†W2ÒµÓ°  —f"Ö–å6—¦RÒÖRæÖ–å6—¦S° —f"—4†÷&—¦öçFÂÒÖRæ—4†÷&—¦öçFÂ‚“°  ––b†—4†÷&—¦öçFÂ’° –Ö–å6—¦Rçv–GF‚ÒÖRæÖ…v–GFƒ²òòf–ÆÂÆÂF†Rv–GF€ –Ö–å6—¦Ræ†V–v‡BÒF—7Æ’ò¢° —ÒVÇ6R° –Ö–å6—¦Rçv–GF‚ÒF—7Æ’ò¢° –Ö–å6—¦Ræ†V–v‡BÒÖRæÖ„†V–v‡C²òòf–ÆÂÆÂF†R†V–v‡@ —Ð  ’òò–æ7&V6R6—¦W2†W&P ––b‚F—7Æ’’° –ÖRçv–GF‚ÒÖ–å6—¦Rçv–GF‚ÒÖRæ†V–v‡BÒÖ–å6—¦Ræ†V–v‡BÒ° —&WGW&ã° —Ð –7G‚æföçBÒÆ&VÄföçBç7G&–æs°  ––b†—4†÷&—¦öçFÂ’° ’òòÆ&VÇ0  ’òòv–GF‚öbV6‚Æ–æRöbÆVvVæB&÷†W2âÆ&VÇ2w&öçFò×VÇF—ÆRÆ–æW2v†VâF†W&R&RFöòÖç’Fòf—BöâöæP —f"Æ–æUv–GF‡2ÒÖRæÆ–æUv–GF‡2Ò³Ó° —f"F÷FÄ†V–v‡BÒ°  –7G‚çFW‡DÆ–vâÒvÆVgBs° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs°  –†VÇW'2CæV6‚†ÖRæÆVvVæD—FV×2ÂgVæ7F–öâ†ÆVvVæD—FVÒÂ’’° —f"&÷…v–GF‚ÒvWD&÷…v–GF‚†Æ&VÄ÷G2ÂföçE6—¦R“° —f"v–GF‚Ò&÷…v–GF‚²†föçE6—¦Rò"’²7G‚æÖV7W&UFW‡B†ÆVvVæD—FVÒçFW‡B’çv–GFƒ°  ––b†’ÓÓÒÇÂÆ–æUv–GF‡5¶Æ–æUv–GF‡2æÆVæwF‚ÒÒ²v–GF‚²"¢Æ&VÄ÷G2çFF–ærâÖ–å6—¦Rçv–GF‚’° —F÷FÄ†V–v‡B³ÒföçE6—¦R²Æ&VÄ÷G2çFF–æs° –Æ–æUv–GF‡5¶Æ–æUv–GF‡2æÆVæwF‚Ò†’âò¢•ÒÒ° —Ð  ’òò7F÷&RF†R†—F&÷‚v–GF‚æB†V–v‡B†W&Râf–æÂ÷6—F–öâv–ÆÂ&RWFFVB–âG&v  –†—F&÷†W5¶•ÒÒ° –ÆVgC¢À —F÷¢À —v–GFƒ¢v–GF‚À –†V–v‡C¢föçE6—¦P —Ó°  –Æ–æUv–GF‡5¶Æ–æUv–GF‡2æÆVæwF‚ÒÒ³Òv–GF‚²Æ&VÄ÷G2çFF–æs° —Ò“°  –Ö–å6—¦Ræ†V–v‡B³ÒF÷FÄ†V–v‡C°  —ÒVÇ6R° —f"eFF–ærÒÆ&VÄ÷G2çFF–æs° —f"6öÇVÖåv–GF‡2ÒÖRæ6öÇVÖåv–GF‡2ÒµÓ° —f"6öÇVÖä†V–v‡G2ÒÖRæ6öÇVÖä†V–v‡G2ÒµÓ° —f"F÷FÅv–GF‚ÒÆ&VÄ÷G2çFF–æs° —f"7W'&VçD6öÅv–GF‚Ò° —f"7W'&VçD6öÄ†V–v‡BÒ°  –†VÇW'2CæV6‚†ÖRæÆVvVæD—FV×2ÂgVæ7F–öâ†ÆVvVæD—FVÒÂ’’° —f"&÷…v–GF‚ÒvWD&÷…v–GF‚†Æ&VÄ÷G2ÂföçE6—¦R“° —f"—FVÕv–GF‚Ò&÷…v–GF‚²†föçE6—¦Rò"’²7G‚æÖV7W&UFW‡B†ÆVvVæD—FVÒçFW‡B’çv–GFƒ°  ’òò–bFöòFÆÂÂvòFòæWr6öÇVÖà ––b†’âbb7W'&VçD6öÄ†V–v‡B²föçE6—¦R²"¢eFF–ærâÖ–å6—¦Ræ†V–v‡B’° —F÷FÅv–GF‚³Ò7W'&VçD6öÅv–GF‚²Æ&VÄ÷G2çFF–æs° –6öÇVÖåv–GF‡2çW6‚†7W'&VçD6öÅv–GF‚“²òò&Wf–÷W26öÇVÖâv–GF€ –6öÇVÖä†V–v‡G2çW6‚†7W'&VçD6öÄ†V–v‡B“° –7W'&VçD6öÅv–GF‚Ò° –7W'&VçD6öÄ†V–v‡BÒ° —Ð  ’òòvWBÖ‚v–GF€ –7W'&VçD6öÅv–GF‚ÒÖF‚æÖ‚†7W'&VçD6öÅv–GF‚Â—FVÕv–GF‚“° –7W'&VçD6öÄ†V–v‡B³ÒföçE6—¦R²eFF–æs°  ’òò7F÷&RF†R†—F&÷‚v–GF‚æB†V–v‡B†W&Râf–æÂ÷6—F–öâv–ÆÂ&RWFFVB–âG&v  –†—F&÷†W5¶•ÒÒ° –ÆVgC¢À —F÷¢À —v–GFƒ¢—FVÕv–GF‚À –†V–v‡C¢föçE6—¦P —Ó° —Ò“°  —F÷FÅv–GF‚³Ò7W'&VçD6öÅv–GFƒ° –6öÇVÖåv–GF‡2çW6‚†7W'&VçD6öÅv–GF‚“° –6öÇVÖä†V–v‡G2çW6‚†7W'&VçD6öÄ†V–v‡B“° –Ö–å6—¦Rçv–GF‚³ÒF÷FÅv–GFƒ° —Ð  –ÖRçv–GF‚ÒÖ–å6—¦Rçv–GFƒ° –ÖRæ†V–v‡BÒÖ–å6—¦Ræ†V–v‡C° —ÒÀ –gFW$f—C¢æö÷CÀ  ’òò6†&VBÖWF†öG0 –—4†÷&—¦öçFÃ¢gVæ7F–öâ‚’° —&WGW&âF†—2æ÷F–öç2ç÷6—F–öâÓÓÒwF÷rÇÂF†—2æ÷F–öç2ç÷6—F–öâÓÓÒv&÷GFöÒs° —ÒÀ  ’òò7GVÆÇ’G&rF†RÆVvVæBöâF†R6çf0 –G&s¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"Æ&VÄ÷G2Ò÷G2æÆ&VÇ3° —f"vÆö&ÄFVfVÇG2Ò6÷&UöFVfVÇG2ævÆö&Ã° —f"FVfVÇD6öÆ÷"ÒvÆö&ÄFVfVÇG2æFVfVÇD6öÆ÷#° —f"Æ–æTFVfVÇBÒvÆö&ÄFVfVÇG2æVÆVÖVçG2æÆ–æS° —f"ÆVvVæD†V–v‡BÒÖRæ†V–v‡C° —f"6öÇVÖä†V–v‡G2ÒÖRæ6öÇVÖä†V–v‡G3° —f"ÆVvVæEv–GF‚ÒÖRçv–GFƒ° —f"Æ–æUv–GF‡2ÒÖRæÆ–æUv–GF‡3°  ––b‚÷G2æF—7Æ’’° —&WGW&ã° —Ð  —f"'FÄ†VÇW"ÒvWE'FÄ†VÇW"C†÷G2ç'FÂÂÖRæÆVgBÂÖRæÖ–å6—¦Rçv–GF‚“° —f"7G‚ÒÖRæ7Gƒ° —f"föçD6öÆ÷"ÒfÇVT÷$FVfVÇBFR†Æ&VÄ÷G2æföçD6öÆ÷"ÂvÆö&ÄFVfVÇG2æFVfVÇDföçD6öÆ÷"“° —f"Æ&VÄföçBÒ†VÇW'2Cæ÷F–öç2å÷'6TföçB†Æ&VÄ÷G2“° —f"föçE6—¦RÒÆ&VÄföçBç6—¦S° —f"7W'6÷#°  ’òò6çf26WGW  –7G‚çFW‡DÆ–vâÒ'FÄ†VÇW"çFW‡DÆ–vâ‚vÆVgBr“° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs° –7G‚æÆ–æUv–GF‚ÒãS° –7G‚ç7G&ö¶U7G–ÆRÒföçD6öÆ÷#²òòf÷"7G&–¶WF‡&÷Vv‚VffV7@ –7G‚æf–ÆÅ7G–ÆRÒföçD6öÆ÷#²òò&VæFW"–â6÷'&V7B6öÆ÷W  –7G‚æföçBÒÆ&VÄföçBç7G&–æs°  —f"&÷…v–GF‚ÒvWD&÷…v–GF‚†Æ&VÄ÷G2ÂföçE6—¦R“° —f"†—F&÷†W2ÒÖRæÆVvVæD†—D&÷†W3°  ’òò7W'&VçB÷6—F–öà —f"G&tÆVvVæD&÷‚ÒgVæ7F–öâ‡‚Â’ÂÆVvVæD—FVÒ’° ––b†—4æâ†&÷…v–GF‚’ÇÂ&÷…v–GF‚ÃÒ’° —&WGW&ã° —Ð  ’òò6WBF†R7G‚f÷"F†R&÷€ –7G‚ç6fR‚“°  —f"Æ–æUv–GF‚ÒfÇVT÷$FVfVÇBFR†ÆVvVæD—FVÒæÆ–æUv–GF‚ÂÆ–æTFVfVÇBæ&÷&FW%v–GF‚“° –7G‚æf–ÆÅ7G–ÆRÒfÇVT÷$FVfVÇBFR†ÆVvVæD—FVÒæf–ÆÅ7G–ÆRÂFVfVÇD6öÆ÷"“° –7G‚æÆ–æT6ÒfÇVT÷$FVfVÇBFR†ÆVvVæD—FVÒæÆ–æT6ÂÆ–æTFVfVÇBæ&÷&FW$67G–ÆR“° –7G‚æÆ–æTF6„öfg6WBÒfÇVT÷$FVfVÇBFR†ÆVvVæD—FVÒæÆ–æTF6„öfg6WBÂÆ–æTFVfVÇBæ&÷&FW$F6„öfg6WB“° –7G‚æÆ–æT¦ö–âÒfÇVT÷$FVfVÇBFR†ÆVvVæD—FVÒæÆ–æT¦ö–âÂÆ–æTFVfVÇBæ&÷&FW$¦ö–å7G–ÆR“° –7G‚æÆ–æUv–GF‚ÒÆ–æUv–GFƒ° –7G‚ç7G&ö¶U7G–ÆRÒfÇVT÷$FVfVÇBFR†ÆVvVæD—FVÒç7G&ö¶U7G–ÆRÂFVfVÇD6öÆ÷"“°  ––b†7G‚ç6WDÆ–æTF6‚’° ’òò”R’æBFòæ÷B7W÷'BÆ–æRF6€ –7G‚ç6WDÆ–æTF6‚‡fÇVT÷$FVfVÇBFR†ÆVvVæD—FVÒæÆ–æTF6‚ÂÆ–æTFVfVÇBæ&÷&FW$F6‚’“° —Ð  ––b†Æ&VÄ÷G2bbÆ&VÄ÷G2çW6Uö–çE7G–ÆR’° ’òò&V6Æ7VÆFR‚æB’f÷"G&uö–çB‚’&V6W6R—G2W‡V7F–æp ’òò‚æB’Fò&R6VçFW"öbf–wW&R†–ç7FVBöbF÷ÆVgB —f"&F—W2Ò&÷…v–GF‚¢ÖF‚å5%C"ò#° —f"6VçFW%‚Ò'FÄ†VÇW"ç…ÇW2‡‚Â&÷…v–GF‚ò"“° —f"6VçFW%’Ò’²föçE6—¦Rò#°  ’òòG&rö–çE7G–ÆR2ÆVvVæB7–Ö&öÀ –†VÇW'2Cæ6çf2æG&uö–çB†7G‚ÂÆVvVæD—FVÒçö–çE7G–ÆRÂ&F—W2Â6VçFW%‚Â6VçFW%’ÂÆVvVæD—FVÒç&÷FF–öâ“° —ÒVÇ6R° ’òòG&r&÷‚2ÆVvVæB7–Ö&öÀ –7G‚æf–ÆÅ&V7B‡'FÄ†VÇW"æÆVgDf÷$ÇG"‡‚Â&÷…v–GF‚’Â’Â&÷…v–GF‚ÂföçE6—¦R“° ––b†Æ–æUv–GF‚ÓÒ’° –7G‚ç7G&ö¶U&V7B‡'FÄ†VÇW"æÆVgDf÷$ÇG"‡‚Â&÷…v–GF‚’Â’Â&÷…v–GF‚ÂföçE6—¦R“° —Ð —Ð  –7G‚ç&W7F÷&R‚“° —Ó°  —f"f–ÆÅFW‡BÒgVæ7F–öâ‡‚Â’ÂÆVvVæD—FVÒÂFW‡Ev–GF‚’° —f"†ÆdföçE6—¦RÒföçE6—¦Rò#° —f"„ÆVgBÒ'FÄ†VÇW"ç…ÇW2‡‚Â&÷…v–GF‚²†ÆdföçE6—¦R“° —f"”Ö–FFÆRÒ’²†ÆdföçE6—¦S°  –7G‚æf–ÆÅFW‡B†ÆVvVæD—FVÒçFW‡BÂ„ÆVgBÂ”Ö–FFÆR“°  ––b†ÆVvVæD—FVÒæ†–FFVâ’° ’òò7G&–¶WF‡&÷Vv‚F†RFW‡B–b†–FFVà –7G‚æ&Vv–åF‚‚“° –7G‚æÆ–æUv–GF‚Ò#° –7G‚æÖ÷fUFò‡„ÆVgBÂ”Ö–FFÆR“° –7G‚æÆ–æUFò‡'FÄ†VÇW"ç…ÇW2‡„ÆVgBÂFW‡Ev–GF‚’Â”Ö–FFÆR“° –7G‚ç7G&ö¶R‚“° —Ð —Ó°  —f"Æ–væÖVçDöfg6WBÒgVæ7F–öâ†F–ÖVç6–öâÂ&Æö6µ6—¦R’° —7v—F6‚†÷G2æÆ–vâ’° –66Rw7F'Bs  —&WGW&âÆ&VÄ÷G2çFF–æs° –66RvVæBs  —&WGW&âF–ÖVç6–öâÒ&Æö6µ6—¦S° –FVfVÇC¢òò6VçFW  —&WGW&â†F–ÖVç6–öâÒ&Æö6µ6—¦R²Æ&VÄ÷G2çFF–ær’ò#° —Ð —Ó°  ’òò†÷&—¦öçFÀ —f"—4†÷&—¦öçFÂÒÖRæ—4†÷&—¦öçFÂ‚“° ––b†—4†÷&—¦öçFÂ’° –7W'6÷"Ò° —ƒ¢ÖRæÆVgB²Æ–væÖVçDöfg6WB†ÆVvVæEv–GF‚ÂÆ–æUv–GF‡5³Ò’À —“¢ÖRçF÷²Æ&VÄ÷G2çFF–ærÀ –Æ–æS¢  —Ó° —ÒVÇ6R° –7W'6÷"Ò° —ƒ¢ÖRæÆVgB²Æ&VÄ÷G2çFF–ærÀ —“¢ÖRçF÷²Æ–væÖVçDöfg6WB†ÆVvVæD†V–v‡BÂ6öÇVÖä†V–v‡G5³Ò’À –Æ–æS¢  —Ó° —Ð  –†VÇW'2Cç'FÂæ÷fW'&–FUFW‡DF—&V7F–öâ†ÖRæ7G‚Â÷G2çFW‡DF—&V7F–öâ“°  —f"—FVÔ†V–v‡BÒföçE6—¦R²Æ&VÄ÷G2çFF–æs° –†VÇW'2CæV6‚†ÖRæÆVvVæD—FV×2ÂgVæ7F–öâ†ÆVvVæD—FVÒÂ’’° —f"FW‡Ev–GF‚Ò7G‚æÖV7W&UFW‡B†ÆVvVæD—FVÒçFW‡B’çv–GFƒ° —f"v–GF‚Ò&÷…v–GF‚²†föçE6—¦Rò"’²FW‡Ev–GFƒ° —f"‚Ò7W'6÷"çƒ° —f"’Ò7W'6÷"ç“°  —'FÄ†VÇW"ç6WEv–GF‚†ÖRæÖ–å6—¦Rçv–GF‚“°  ’òòW6R†ÖRæÆVgB²ÖRæÖ–å6—¦Rçv–GF‚’æB†ÖRçF÷²ÖRæÖ–å6—¦Ræ†V–v‡B ’òò–ç7FVBöbÖRç&–v‡BæBÖRæ&÷GFöÒ&V6W6RÖRçv–GF‚æBÖRæ†V–v‡@ ’òòÖ’†fR&VVâ6†ævVB6–æ6RÖRæÖ–å6—¦Rv26Æ7VÆFV@ ––b†—4†÷&—¦öçFÂ’° ––b†’âbb‚²v–GF‚²Æ&VÄ÷G2çFF–ærâÖRæÆVgB²ÖRæÖ–å6—¦Rçv–GF‚’° —’Ò7W'6÷"ç’³Ò—FVÔ†V–v‡C° –7W'6÷"æÆ–æR²³° —‚Ò7W'6÷"ç‚ÒÖRæÆVgB²Æ–væÖVçDöfg6WB†ÆVvVæEv–GF‚ÂÆ–æUv–GF‡5¶7W'6÷"æÆ–æUÒ“° —Ð —ÒVÇ6R–b†’âbb’²—FVÔ†V–v‡BâÖRçF÷²ÖRæÖ–å6—¦Ræ†V–v‡B’° —‚Ò7W'6÷"ç‚Ò‚²ÖRæ6öÇVÖåv–GF‡5¶7W'6÷"æÆ–æUÒ²Æ&VÄ÷G2çFF–æs° –7W'6÷"æÆ–æR²³° —’Ò7W'6÷"ç’ÒÖRçF÷²Æ–væÖVçDöfg6WB†ÆVvVæD†V–v‡BÂ6öÇVÖä†V–v‡G5¶7W'6÷"æÆ–æUÒ“° —Ð  —f"&VÅ‚Ò'FÄ†VÇW"ç‚‡‚“°  –G&tÆVvVæD&÷‚‡&VÅ‚Â’ÂÆVvVæD—FVÒ“°  –†—F&÷†W5¶•ÒæÆVgBÒ'FÄ†VÇW"æÆVgDf÷$ÇG"‡&VÅ‚Â†—F&÷†W5¶•Òçv–GF‚“° –†—F&÷†W5¶•ÒçF÷Ò“°  ’òòf–ÆÂF†R7GVÂÆ&VÀ –f–ÆÅFW‡B‡&VÅ‚Â’ÂÆVvVæD—FVÒÂFW‡Ev–GF‚“°  ––b†—4†÷&—¦öçFÂ’° –7W'6÷"ç‚³Òv–GF‚²Æ&VÄ÷G2çFF–æs° —ÒVÇ6R° –7W'6÷"ç’³Ò—FVÔ†V–v‡C° —Ð —Ò“°  –†VÇW'2Cç'FÂç&W7F÷&UFW‡DF—&V7F–öâ†ÖRæ7G‚Â÷G2çFW‡DF—&V7F–öâ“° —ÒÀ  ’ò¢  ’¢&—fFP ’¢ð •övWDÆVvVæD—FVÔC¢gVæ7F–öâ‡‚Â’’° —f"ÖRÒF†—3° —f"’Â†—D&÷‚ÂÆƒ°  ––b‡‚ãÒÖRæÆVgBbb‚ÃÒÖRç&–v‡Bbb’ãÒÖRçF÷bb’ÃÒÖRæ&÷GFöÒ’° ’òò6VR–bvR&RF÷V6†–æröæRöbF†RFF6WB&÷†W0 –Æ‚ÒÖRæÆVvVæD†—D&÷†W3° –f÷"†’Ò²’ÂÆ‚æÆVæwFƒ²²¶’’° –†—D&÷‚ÒÆ…¶•Ó°  ––b‡‚ãÒ†—D&÷‚æÆVgBbb‚ÃÒ†—D&÷‚æÆVgB²†—D&÷‚çv–GF‚bb’ãÒ†—D&÷‚çF÷bb’ÃÒ†—D&÷‚çF÷²†—D&÷‚æ†V–v‡B’° ’òòF÷V6†–ærâVÆVÖVç@ —&WGW&âÖRæÆVvVæD—FV×5¶•Ó° —Ð —Ð —Ð  —&WGW&âçVÆÃ° —ÒÀ  ’ò¢  ’¢†æFÆRâWfVç@ ’¢&—fFP ’¢&Ò´”WfVçGÒWfVçBÒF†RWfVçBFò†æFÆP ’¢ð –†æFÆTWfVçC¢gVæ7F–öâ†R’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"G—RÒRçG—RÓÓÒvÖ÷W6WWròv6Æ–6²r¢RçG—S° —f"†÷fW&VD—FVÓ°  ––b‡G—RÓÓÒvÖ÷W6VÖ÷fRr’° ––b‚÷G2æöä†÷fW"bb÷G2æöäÆVfR’° —&WGW&ã° —Ð —ÒVÇ6R–b‡G—RÓÓÒv6Æ–6²r’° ––b‚÷G2æöä6Æ–6²’° —&WGW&ã° —Ð —ÒVÇ6R° —&WGW&ã° —Ð  ’òò6†'BWfVçBÇ&VG’†2&VÆF—fR÷6—F–öâ–â—@ –†÷fW&VD—FVÒÒÖRåövWDÆVvVæD—FVÔB†Rç‚ÂRç’“°  ––b‡G—RÓÓÒv6Æ–6²r’° ––b††÷fW&VD—FVÒbb÷G2æöä6Æ–6²’° ’òòW6RRææF—fRf÷"&6·v&G26ö×F–&–Æ—G –÷G2æöä6Æ–6²æ6ÆÂ†ÖRÂRææF—fRÂ†÷fW&VD—FVÒ“° —Ð —ÒVÇ6R° ––b†÷G2æöäÆVfRbb†÷fW&VD—FVÒÓÒÖRåö†÷fW&VD—FVÒ’° ––b†ÖRåö†÷fW&VD—FVÒ’° –÷G2æöäÆVfRæ6ÆÂ†ÖRÂRææF—fRÂÖRåö†÷fW&VD—FVÒ“° —Ð –ÖRåö†÷fW&VD—FVÒÒ†÷fW&VD—FVÓ° —Ð  ––b†÷G2æöä†÷fW"bb†÷fW&VD—FVÒ’° ’òòW6RRææF—fRf÷"&6·v&G26ö×F–&–Æ—G –÷G2æöä†÷fW"æ6ÆÂ†ÖRÂRææF—fRÂ†÷fW&VD—FVÒ“° —Ð —Ð —Ð§Ò“° ¦gVæ7F–öâ7&VFTæWtÆVvVæDæDGF6‚†6†'BÂÆVvVæD÷G2’° —f"ÆVvVæBÒæWrÆVvVæB‡° –7Gƒ¢6†'Bæ7G‚À –÷F–öç3¢ÆVvVæD÷G2À –6†'C¢6†'@ —Ò“°  –6÷&UöÆ–÷WG2æ6öæf–wW&R†6†'BÂÆVvVæBÂÆVvVæD÷G2“° –6÷&UöÆ–÷WG2æFD&÷‚†6†'BÂÆVvVæB“° –6†'BæÆVvVæBÒÆVvVæC°§Ð §f"ÇVv–åöÆVvVæBÒ° ––C¢vÆVvVæBrÀ  ’ò¢  ’¢&6·v&B6ö×F–&–Æ—G“¢6–æ6R"ããRÂF†RÆVvVæB—2&Vv—7FW&VB2ÇVv–âÂÖ¶–æp ’¢6†'BäÆVvVæBö'6öÆWFRâFòfö–B'&V¶–ær6†ævRÂvRW‡÷'BF†RÆVvVæB2'Bö` ’¢F†RÇVv–âÂv†–6‚öæRv–ÆÂ&R&RÖW‡÷6VB–âF†R6†'Bæ§2f–ÆRà ’¢‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2÷VÆÂó#cC  ’¢&—fFP ’¢ð •öVÆVÖVçC¢ÆVvVæBÀ  –&Vf÷&T–æ—C¢gVæ7F–öâ†6†'B’° —f"ÆVvVæD÷G2Ò6†'Bæ÷F–öç2æÆVvVæC°  ––b†ÆVvVæD÷G2’° –7&VFTæWtÆVvVæDæDGF6‚†6†'BÂÆVvVæD÷G2“° —Ð —ÒÀ  –&Vf÷&UWFFS¢gVæ7F–öâ†6†'B’° —f"ÆVvVæD÷G2Ò6†'Bæ÷F–öç2æÆVvVæC° —f"ÆVvVæBÒ6†'BæÆVvVæC°  ––b†ÆVvVæD÷G2’° –†VÇW'2CæÖW&vT–b†ÆVvVæD÷G2Â6÷&UöFVfVÇG2ævÆö&ÂæÆVvVæB“°  ––b†ÆVvVæB’° –6÷&UöÆ–÷WG2æ6öæf–wW&R†6†'BÂÆVvVæBÂÆVvVæD÷G2“° –ÆVvVæBæ÷F–öç2ÒÆVvVæD÷G3° —ÒVÇ6R° –7&VFTæWtÆVvVæDæDGF6‚†6†'BÂÆVvVæD÷G2“° —Ð —ÒVÇ6R–b†ÆVvVæB’° –6÷&UöÆ–÷WG2ç&VÖ÷fT&÷‚†6†'BÂÆVvVæB“° –FVÆWFR6†'BæÆVvVæC° —Ð —ÒÀ  –gFW$WfVçC¢gVæ7F–öâ†6†'BÂR’° —f"ÆVvVæBÒ6†'BæÆVvVæC° ––b†ÆVvVæB’° –ÆVvVæBæ†æFÆTWfVçB†R“° —Ð —Ð§Ó° §f"æö÷C"Ò†VÇW'2Cææö÷° ¦6÷&UöFVfVÇG2å÷6WB‚vvÆö&ÂrÂ° —F—FÆS¢° –F—7Æ“¢fÇ6RÀ –föçE7G–ÆS¢v&öÆBrÀ –gVÆÅv–GFƒ¢G'VRÀ —FF–æs¢À —÷6—F–öã¢wF÷rÀ —FW‡C¢rrÀ —vV–v‡C¢#òò'’FVfVÇBw&VFW"F†âÆVvVæBƒ’Fò&R&÷fP —Ð§Ò“° ¢ò¢ ¢¢”Õõ%DåC¢F†—26Æ72—2W‡÷6VBV&Æ–6Ç’26†'BäÆVvVæBÂ&6·v&B6ö×F–&–Æ—G’&WV—&VB¢¢ð§f"F—FÆRÒ6÷&UöVÆVÖVçBæW‡FVæB‡° ––æ—F–Æ—¦S¢gVæ7F–öâ†6öæf–r’° —f"ÖRÒF†—3° –†VÇW'2CæW‡FVæB†ÖRÂ6öæf–r“°  ’òò6öçF–ç2†—B&÷†W2f÷"V6‚FF6WB†–âFF6WB÷&FW" –ÖRæÆVvVæD†—D&÷†W2ÒµÓ° —ÒÀ  ’òòF†W6RÖWF†öG2&R÷&FW&VB'’Æ–fV7–6ÆRâWF–Æ—F–W2F†VâföÆÆ÷rà  –&Vf÷&UWFFS¢æö÷C"À —WFFS¢gVæ7F–öâ†Ö…v–GF‚ÂÖ„†V–v‡BÂÖ&v–ç2’° —f"ÖRÒF†—3°  ’òòWFFRÆ–fV7–6ÆRÒ&ö&&Ç’FöâwBvçBFòWfW"W‡FVæB÷"÷fW'w&—FRF†—2gVæ7F–öâ² –ÖRæ&Vf÷&UWFFR‚“°  ’òò'6÷&"F†RÖ7FW"ÖV7W&VÖVçG0 –ÖRæÖ…v–GF‚ÒÖ…v–GFƒ° –ÖRæÖ„†V–v‡BÒÖ„†V–v‡C° –ÖRæÖ&v–ç2ÒÖ&v–ç3°  ’òòF–ÖVç6–öç0 –ÖRæ&Vf÷&U6WDF–ÖVç6–öç2‚“° –ÖRç6WDF–ÖVç6–öç2‚“° –ÖRægFW%6WDF–ÖVç6–öç2‚“° ’òòÆ&VÇ0 –ÖRæ&Vf÷&T'V–ÆDÆ&VÇ2‚“° –ÖRæ'V–ÆDÆ&VÇ2‚“° –ÖRægFW$'V–ÆDÆ&VÇ2‚“°  ’òòf—@ –ÖRæ&Vf÷&Tf—B‚“° –ÖRæf—B‚“° –ÖRægFW$f—B‚“° ’òð –ÖRægFW%WFFR‚“°  —&WGW&âÖRæÖ–å6—¦S°  —ÒÀ –gFW%WFFS¢æö÷C"À  ’òð  –&Vf÷&U6WDF–ÖVç6–öç3¢æö÷C"À —6WDF–ÖVç6–öç3¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° ’òò6WBF†RVæ6öç7G&–æVBF–ÖVç6–öâ&Vf÷&RÆ&VÂ&÷FF–öà ––b†ÖRæ—4†÷&—¦öçFÂ‚’’° ’òò&W6WB÷6—F–öâ&Vf÷&R6Æ7VÆF–ær&÷FF–öà –ÖRçv–GF‚ÒÖRæÖ…v–GFƒ° –ÖRæÆVgBÒ° –ÖRç&–v‡BÒÖRçv–GFƒ° —ÒVÇ6R° –ÖRæ†V–v‡BÒÖRæÖ„†V–v‡C°  ’òò&W6WB÷6—F–öâ&Vf÷&R6Æ7VÆF–ær&÷FF–öà –ÖRçF÷Ò° –ÖRæ&÷GFöÒÒÖRæ†V–v‡C° —Ð  ’òò&W6WBFF–æp –ÖRçFF–ætÆVgBÒ° –ÖRçFF–æuF÷Ò° –ÖRçFF–æu&–v‡BÒ° –ÖRçFF–æt&÷GFöÒÒ°  ’òò&W6WBÖ–å6—¦P –ÖRæÖ–å6—¦RÒ° —v–GFƒ¢À –†V–v‡C¢  —Ó° —ÒÀ –gFW%6WDF–ÖVç6–öç3¢æö÷C"À  ’òð  –&Vf÷&T'V–ÆDÆ&VÇ3¢æö÷C"À –'V–ÆDÆ&VÇ3¢æö÷C"À –gFW$'V–ÆDÆ&VÇ3¢æö÷C"À  ’òð  –&Vf÷&Tf—C¢æö÷C"À –f—C¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"÷G2ÒÖRæ÷F–öç3° —f"Ö–å6—¦RÒÖRæÖ–å6—¦RÒ·Ó° —f"—4†÷&—¦öçFÂÒÖRæ—4†÷&—¦öçFÂ‚“° —f"Æ–æT6÷VçBÂFW‡E6—¦S°  ––b‚÷G2æF—7Æ’’° –ÖRçv–GF‚ÒÖ–å6—¦Rçv–GF‚ÒÖRæ†V–v‡BÒÖ–å6—¦Ræ†V–v‡BÒ° —&WGW&ã° —Ð  –Æ–æT6÷VçBÒ†VÇW'2Cæ—4'&’†÷G2çFW‡B’ò÷G2çFW‡BæÆVæwF‚¢° —FW‡E6—¦RÒÆ–æT6÷VçB¢†VÇW'2Cæ÷F–öç2å÷'6TföçB†÷G2’æÆ–æT†V–v‡B²÷G2çFF–ær¢#°  –ÖRçv–GF‚ÒÖ–å6—¦Rçv–GF‚Ò—4†÷&—¦öçFÂòÖRæÖ…v–GF‚¢FW‡E6—¦S° –ÖRæ†V–v‡BÒÖ–å6—¦Ræ†V–v‡BÒ—4†÷&—¦öçFÂòFW‡E6—¦R¢ÖRæÖ„†V–v‡C° —ÒÀ –gFW$f—C¢æö÷C"À  ’òò6†&VBÖWF†öG0 –—4†÷&—¦öçFÃ¢gVæ7F–öâ‚’° —f"÷2ÒF†—2æ÷F–öç2ç÷6—F–öã° —&WGW&â÷2ÓÓÒwF÷rÇÂ÷2ÓÓÒv&÷GFöÒs° —ÒÀ  ’òò7GVÆÇ’G&rF†RF—FÆR&Æö6²öâF†R6çf0 –G&s¢gVæ7F–öâ‚’° —f"ÖRÒF†—3° —f"7G‚ÒÖRæ7Gƒ° —f"÷G2ÒÖRæ÷F–öç3°  ––b‚÷G2æF—7Æ’’° —&WGW&ã° —Ð  —f"föçD÷G2Ò†VÇW'2Cæ÷F–öç2å÷'6TföçB†÷G2“° —f"Æ–æT†V–v‡BÒföçD÷G2æÆ–æT†V–v‡C° —f"öfg6WBÒÆ–æT†V–v‡Bò"²÷G2çFF–æs° —f"&÷FF–öâÒ° —f"F÷ÒÖRçF÷° —f"ÆVgBÒÖRæÆVgC° —f"&÷GFöÒÒÖRæ&÷GFöÓ° —f"&–v‡BÒÖRç&–v‡C° —f"Ö…v–GF‚ÂF—FÆU‚ÂF—FÆU“°  –7G‚æf–ÆÅ7G–ÆRÒ†VÇW'2CçfÇVT÷$FVfVÇB†÷G2æföçD6öÆ÷"Â6÷&UöFVfVÇG2ævÆö&ÂæFVfVÇDföçD6öÆ÷"“²òò&VæFW"–â6÷'&V7B6öÆ÷W  –7G‚æföçBÒföçD÷G2ç7G&–æs°  ’òò†÷&—¦öçFÀ ––b†ÖRæ—4†÷&—¦öçFÂ‚’’° —F—FÆU‚ÒÆVgB²‚‡&–v‡BÒÆVgB’ò"“²òòÖ–Gö–çBöbF†Rv–GF€ —F—FÆU’ÒF÷²öfg6WC° –Ö…v–GF‚Ò&–v‡BÒÆVgC° —ÒVÇ6R° —F—FÆU‚Ò÷G2ç÷6—F–öâÓÓÒvÆVgBròÆVgB²öfg6WB¢&–v‡BÒöfg6WC° —F—FÆU’ÒF÷²‚†&÷GFöÒÒF÷’ò"“° –Ö…v–GF‚Ò&÷GFöÒÒF÷° —&÷FF–öâÒÖF‚å’¢†÷G2ç÷6—F–öâÓÓÒvÆVgBròÓãR¢ãR“° —Ð  –7G‚ç6fR‚“° –7G‚çG&ç6ÆFR‡F—FÆU‚ÂF—FÆU’“° –7G‚ç&÷FFR‡&÷FF–öâ“° –7G‚çFW‡DÆ–vâÒv6VçFW"s° –7G‚çFW‡D&6VÆ–æRÒvÖ–FFÆRs°  —f"FW‡BÒ÷G2çFW‡C° ––b††VÇW'2Cæ—4'&’‡FW‡B’’° —f"’Ò° –f÷"‡f"’Ò²’ÂFW‡BæÆVæwFƒ²²¶’’° –7G‚æf–ÆÅFW‡B‡FW‡E¶•ÒÂÂ’ÂÖ…v–GF‚“° —’³ÒÆ–æT†V–v‡C° —Ð —ÒVÇ6R° –7G‚æf–ÆÅFW‡B‡FW‡BÂÂÂÖ…v–GF‚“° —Ð  –7G‚ç&W7F÷&R‚“° —Ð§Ò“° ¦gVæ7F–öâ7&VFTæWuF—FÆT&Æö6´æDGF6‚†6†'BÂF—FÆT÷G2’° —f"F—FÆRÒæWrF—FÆR‡° –7Gƒ¢6†'Bæ7G‚À –÷F–öç3¢F—FÆT÷G2À –6†'C¢6†'@ —Ò“°  –6÷&UöÆ–÷WG2æ6öæf–wW&R†6†'BÂF—FÆRÂF—FÆT÷G2“° –6÷&UöÆ–÷WG2æFD&÷‚†6†'BÂF—FÆR“° –6†'BçF—FÆT&Æö6²ÒF—FÆS°§Ð §f"ÇVv–å÷F—FÆRÒ° ––C¢wF—FÆRrÀ  ’ò¢  ’¢&6·v&B6ö×F–&–Æ—G“¢6–æ6R"ããRÂF†RF—FÆR—2&Vv—7FW&VB2ÇVv–âÂÖ¶–æp ’¢6†'BåF—FÆRö'6öÆWFRâFòfö–B'&V¶–ær6†ævRÂvRW‡÷'BF†RF—FÆR2'Bö` ’¢F†RÇVv–âÂv†–6‚öæRv–ÆÂ&R&RÖW‡÷6VB–âF†R6†'Bæ§2f–ÆRà ’¢‡GG3¢òöv—F‡V"æ6öÒö6†'F§2ô6†'Bæ§2÷VÆÂó#cC  ’¢&—fFP ’¢ð •öVÆVÖVçC¢F—FÆRÀ  –&Vf÷&T–æ—C¢gVæ7F–öâ†6†'B’° —f"F—FÆT÷G2Ò6†'Bæ÷F–öç2çF—FÆS°  ––b‡F—FÆT÷G2’° –7&VFTæWuF—FÆT&Æö6´æDGF6‚†6†'BÂF—FÆT÷G2“° —Ð —ÒÀ  –&Vf÷&UWFFS¢gVæ7F–öâ†6†'B’° —f"F—FÆT÷G2Ò6†'Bæ÷F–öç2çF—FÆS° —f"F—FÆT&Æö6²Ò6†'BçF—FÆT&Æö6³°  ––b‡F—FÆT÷G2’° –†VÇW'2CæÖW&vT–b‡F—FÆT÷G2Â6÷&UöFVfVÇG2ævÆö&ÂçF—FÆR“°  ––b‡F—FÆT&Æö6²’° –6÷&UöÆ–÷WG2æ6öæf–wW&R†6†'BÂF—FÆT&Æö6²ÂF—FÆT÷G2“° —F—FÆT&Æö6²æ÷F–öç2ÒF—FÆT÷G3° —ÒVÇ6R° –7&VFTæWuF—FÆT&Æö6´æDGF6‚†6†'BÂF—FÆT÷G2“° —Ð —ÒVÇ6R–b‡F—FÆT&Æö6²’° –6÷&UöÆ–÷WG2ç&VÖ÷fT&÷‚†6†'BÂF—FÆT&Æö6²“° –FVÆWFR6†'BçF—FÆT&Æö6³° —Ð —Ð§Ó° §f"ÇVv–ç2Ò·Ó°§f"f–ÆÆW"ÒÇVv–åöf–ÆÆW#°§f"ÆVvVæBÒÇVv–åöÆVvVæC°§f"F—FÆRÒÇVv–å÷F—FÆS°§ÇVv–ç2æf–ÆÆW"Òf–ÆÆW#°§ÇVv–ç2æÆVvVæBÒÆVvVæC°§ÇVv–ç2çF—FÆRÒF—FÆS° ¢ò¢ ¢¢æÖW76R6†'@¢¢ð  ¦6÷&Uö6öçG&öÆÆW"æ†VÇW'2Ò†VÇW'2C° ¢òòFöFòF—7F6‚F†W6R†VÇW'2–çFò&÷&–FVB†VÇW'2ö†VÇW'2â¢f–ÆRæBw&—FRVæ—BFW7G2¦6÷&Uö†VÇW'2‚“° ¦6÷&Uö6öçG&öÆÆW"åöFFW'2Ò6÷&UöFFW'3°¦6÷&Uö6öçG&öÆÆW"äæ–ÖF–öâÒ6÷&Uöæ–ÖF–öã°¦6÷&Uö6öçG&öÆÆW"ææ–ÖF–öå6W'f–6RÒ6÷&Uöæ–ÖF–öç3°¦6÷&Uö6öçG&öÆÆW"æ6öçG&öÆÆW'2Ò6öçG&öÆÆW'3°¦6÷&Uö6öçG&öÆÆW"äFF6WD6öçG&öÆÆW"Ò6÷&UöFF6WD6öçG&öÆÆW#°¦6÷&Uö6öçG&öÆÆW"æFVfVÇG2Ò6÷&UöFVfVÇG3°¦6÷&Uö6öçG&öÆÆW"äVÆVÖVçBÒ6÷&UöVÆVÖVçC°¦6÷&Uö6öçG&öÆÆW"æVÆVÖVçG2ÒVÆVÖVçG3°¦6÷&Uö6öçG&öÆÆW"ä–çFW&7F–öâÒ6÷&Uö–çFW&7F–öã°¦6÷&Uö6öçG&öÆÆW"æÆ–÷WG2Ò6÷&UöÆ–÷WG3°¦6÷&Uö6öçG&öÆÆW"çÆFf÷&ÒÒÆFf÷&Ó°¦6÷&Uö6öçG&öÆÆW"çÇVv–ç2Ò6÷&U÷ÇVv–ç3°¦6÷&Uö6öçG&öÆÆW"å66ÆRÒ6÷&U÷66ÆS°¦6÷&Uö6öçG&öÆÆW"ç66ÆU6W'f–6RÒ6÷&U÷66ÆU6W'f–6S°¦6÷&Uö6öçG&öÆÆW"åF–6·2Ò6÷&U÷F–6·3°¦6÷&Uö6öçG&öÆÆW"åFööÇF—Ò6÷&U÷FööÇF—° ¢òò&Vv—7FW"'V–ÇBÖ–â66ÆW0 ¦6÷&Uö6öçG&öÆÆW"æ†VÇW'2æV6‚‡66ÆW2ÂgVæ7F–öâ‡66ÆRÂG—R’° –6÷&Uö6öçG&öÆÆW"ç66ÆU6W'f–6Rç&Vv—7FW%66ÆUG—R‡G—RÂ66ÆRÂ66ÆRåöFVfVÇG2“°§Ò“° ¢òòÆöBFò&Vv—7FW"'V–ÇBÖ–âFFW'2†26–FRVffV7G2  ¢òòÆöF–ær'V–ÇBÖ–âÇVv–ç0 ¦f÷"‡f"²–âÇVv–ç2’° ––b‡ÇVv–ç2æ†4÷vå&÷W'G’†²’’° –6÷&Uö6öçG&öÆÆW"çÇVv–ç2ç&Vv—7FW"‡ÇVv–ç5¶µÒ“° —Ð§Ð ¦6÷&Uö6öçG&öÆÆW"çÆFf÷&Òæ–æ—F–Æ—¦R‚“° §f"7&2Ò6÷&Uö6öçG&öÆÆW#°¦–b‡G—Vöbv–æF÷rÓÒwVæFVf–æVBr’° —v–æF÷rä6†'BÒ6÷&Uö6öçG&öÆÆW#°§Ð ¢òòDU$T4D”ôå0 ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&P¢¢æÖW76R6†'Bä6†'@¢¢FW&V6FVB6–æ6RfW'6–öâ"ã‚ã ¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦6÷&Uö6öçG&öÆÆW"ä6†'BÒ6÷&Uö6öçG&öÆÆW#° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&P¢¢æÖW76R6†'BäÆVvVæ@¢¢FW&V6FVB6–æ6RfW'6–öâ"ããP¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦6÷&Uö6öçG&öÆÆW"äÆVvVæBÒÇVv–ç2æÆVvVæBåöVÆVÖVçC° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&P¢¢æÖW76R6†'BåF—FÆP¢¢FW&V6FVB6–æ6RfW'6–öâ"ããP¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦6÷&Uö6öçG&öÆÆW"åF—FÆRÒÇVv–ç2çF—FÆRåöVÆVÖVçC° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’ÂW6R6†'BçÇVv–ç2–ç7FV@¢¢æÖW76R6†'BçÇVv–å6W'f–6P¢¢FW&V6FVB6–æ6RfW'6–öâ"ããP¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦6÷&Uö6öçG&öÆÆW"çÇVv–å6W'f–6RÒ6÷&Uö6öçG&öÆÆW"çÇVv–ç3° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Â–æ†W&—F–ærg&öÒ6†'BåÇVv–æt&6R†2æð¢¢VffV7BÂ–ç7FVB6–×Ç’7&VFR÷&Vv—7FW"ÇVv–ç2f–Æ–â¦f67&—Bö&¦V7G2à¢¢–çFW&f6R6†'BåÇVv–ä&6P¢¢FW&V6FVB6–æ6RfW'6–öâ"ãRã ¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦6÷&Uö6öçG&öÆÆW"åÇVv–ä&6RÒ6÷&Uö6öçG&öÆÆW"äVÆVÖVçBæW‡FVæB‡·Ò“° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’ÂW6R6†'Bæ†VÇW'2æ6çf2–ç7FVBà¢¢æÖW76R6†'Bæ6çf4†VÇW'0¢¢FW&V6FVB6–æ6RfW'6–öâ"ãbã ¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦6÷&Uö6öçG&öÆÆW"æ6çf4†VÇW'2Ò6÷&Uö6öçG&öÆÆW"æ†VÇW'2æ6çf3° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’ÂW6R6†'BæÆ–÷WG2–ç7FVBà¢¢æÖW76R6†'BæÆ–÷WE6W'f–6P¢¢FW&V6FVB6–æ6RfW'6–öâ"ãrã0¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦6÷&Uö6öçG&öÆÆW"æÆ–÷WE6W'f–6RÒ6÷&Uö6öçG&öÆÆW"æÆ–÷WG3° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Âæ÷Bf–Æ&ÆRç–Ö÷&Rà¢¢æÖW76R6†'BäÆ–æV%66ÆT&6P¢¢FW&V6FVB6–æ6RfW'6–öâ"ã€¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢&—fFP¢¢ð¦6÷&Uö6öçG&öÆÆW"äÆ–æV%66ÆT&6RÒ66ÆUöÆ–æV&&6S° ¢ò¢ ¢¢&÷f–FVBf÷"&6·v&B6ö×F–&–Æ—G’Â–ç7FVBvR6†÷VÆB7&VFRæWr6†'@¢¢'’6WGF–ærF†RG—R–âF†R6öæf–r†æWr6†'B†–BÂ·G—S¢w¶6†'B×G—WÒwÖ’à¢¢FW&V6FVB6–æ6RfW'6–öâ"ã‚ã ¢¢FöFò&VÖ÷fRBfW'6–öâ0¢¢ð¦6÷&Uö6öçG&öÆÆW"æ†VÇW'2æV6‚€ •° ’t&"rÀ ’t'V&&ÆRrÀ ’tF÷Vv†çWBrÀ ’tÆ–æRrÀ ’uöÆ$&VrÀ ’u&F"rÀ ’u66GFW"p •ÒÀ –gVæ7F–öâ†¶Æ72’° –6÷&Uö6öçG&öÆÆW%¶¶Æ75ÒÒgVæ7F–öâ†7G‚Â6fr’° —&WGW&âæWr6÷&Uö6öçG&öÆÆW"†7G‚Â6÷&Uö6öçG&öÆÆW"æ†VÇW'2æÖW&vR†6frÇÂ·ÒÂ° —G—S¢¶Æ72æ6†$Bƒ’çFôÆ÷vW$66R‚’²¶Æ72ç6Æ–6Rƒ —Ò’“° —Ó° —Ð¢“° §&WGW&â7&3° §Ò’’“°  ¢ò¢¢¢òÒ’À¢ò¢#C’¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2Âõ÷vV'6µ÷&WV—&Uõò’° §f"ÖÒ° ’"âöb#¢S‚À ’"âöbæ§2#¢S‚À ’"âö"#¢S’À ’"âö"ÖG¢#¢cÀ ’"âö"ÖG¢æ§2#¢cÀ ’"âö"Ö·r#¢cÀ ’"âö"Ö·ræ§2#¢cÀ ’"âö"ÖÇ’#¢c"À ’"âö"ÖÇ’æ§2#¢c"À ’"âö"ÖÖ#¢c2À ’"âö"ÖÖæ§2#¢c2À ’"âö"×6#¢cBÀ ’"âö"×6æ§2#¢cBÀ ’"âö"×Fâ#¢cRÀ ’"âö"×Fâæ§2#¢cRÀ ’"âö"æ§2#¢S’À ’"âö¢#¢cbÀ ’"âö¢æ§2#¢cbÀ ’"âö&R#¢crÀ ’"âö&Ræ§2#¢crÀ ’"âö&r#¢c‚À ’"âö&ræ§2#¢c‚À ’"âö&Ò#¢c’À ’"âö&Òæ§2#¢c’À ’"âö&â#¢sÀ ’"âö&âæ§2#¢sÀ ’"âö&ò#¢sÀ ’"âö&òæ§2#¢sÀ ’"âö'"#¢s"À ’"âö'"æ§2#¢s"À ’"âö'2#¢s2À ’"âö'2æ§2#¢s2À ’"âö6#¢sBÀ ’"âö6æ§2#¢sBÀ ’"âö72#¢sRÀ ’"âö72æ§2#¢sRÀ ’"âö7b#¢sbÀ ’"âö7bæ§2#¢sbÀ ’"âö7’#¢srÀ ’"âö7’æ§2#¢srÀ ’"âöF#¢s‚À ’"âöFæ§2#¢s‚À ’"âöFR#¢s’À ’"âöFRÖB#¢ƒÀ ’"âöFRÖBæ§2#¢ƒÀ ’"âöFRÖ6‚#¢ƒÀ ’"âöFRÖ6‚æ§2#¢ƒÀ ’"âöFRæ§2#¢s’À ’"âöGb#¢ƒ"À ’"âöGbæ§2#¢ƒ"À ’"âöVÂ#¢ƒ2À ’"âöVÂæ§2#¢ƒ2À ’"âöVâÕ4r#¢ƒBÀ ’"âöVâÕ4ræ§2#¢ƒBÀ ’"âöVâÖR#¢ƒRÀ ’"âöVâÖRæ§2#¢ƒRÀ ’"âöVâÖ6#¢ƒbÀ ’"âöVâÖ6æ§2#¢ƒbÀ ’"âöVâÖv"#¢ƒrÀ ’"âöVâÖv"æ§2#¢ƒrÀ ’"âöVâÖ–R#¢ƒ‚À ’"âöVâÖ–Ræ§2#¢ƒ‚À ’"âöVâÖ–Â#¢ƒ’À ’"âöVâÖ–Âæ§2#¢ƒ’À ’"âöVâÖç¢#¢“À ’"âöVâÖç¢æ§2#¢“À ’"âöVò#¢“À ’"âöVòæ§2#¢“À ’"âöW2#¢“"À ’"âöW2ÖFò#¢“2À ’"âöW2ÖFòæ§2#¢“2À ’"âöW2×W2#¢“BÀ ’"âöW2×W2æ§2#¢“BÀ ’"âöW2æ§2#¢“"À ’"âöWB#¢“RÀ ’"âöWBæ§2#¢“RÀ ’"âöWR#¢“bÀ ’"âöWRæ§2#¢“bÀ ’"âöf#¢“rÀ ’"âöfæ§2#¢“rÀ ’"âöf’#¢“‚À ’"âöf’æ§2#¢“‚À ’"âöfò#¢“’À ’"âöfòæ§2#¢“’À ’"âög"#¢À ’"âög"Ö6#¢À ’"âög"Ö6æ§2#¢À ’"âög"Ö6‚#¢"À ’"âög"Ö6‚æ§2#¢"À ’"âög"æ§2#¢À ’"âög’#¢2À ’"âög’æ§2#¢2À ’"âöv#¢BÀ ’"âövæ§2#¢BÀ ’"âövB#¢RÀ ’"âövBæ§2#¢RÀ ’"âövÂ#¢bÀ ’"âövÂæ§2#¢bÀ ’"âövöÒÖÆFâ#¢rÀ ’"âövöÒÖÆFâæ§2#¢rÀ ’"âöwR#¢‚À ’"âöwRæ§2#¢‚À ’"âö†R#¢’À ’"âö†Ræ§2#¢’À ’"âö†’#¢À ’"âö†’æ§2#¢À ’"âö‡"#¢À ’"âö‡"æ§2#¢À ’"âö‡R#¢"À ’"âö‡Ræ§2#¢"À ’"âö‡’ÖÒ#¢2À ’"âö‡’ÖÒæ§2#¢2À ’"âö–B#¢BÀ ’"âö–Bæ§2#¢BÀ ’"âö—2#¢RÀ ’"âö—2æ§2#¢RÀ ’"âö—B#¢bÀ ’"âö—BÖ6‚#¢rÀ ’"âö—BÖ6‚æ§2#¢rÀ ’"âö—Bæ§2#¢bÀ ’"âö¦#¢‚À ’"âö¦æ§2#¢‚À ’"âö§b#¢’À ’"âö§bæ§2#¢’À ’"âö¶#¢#À ’"âö¶æ§2#¢#À ’"âö¶²#¢#À ’"âö¶²æ§2#¢#À ’"âö¶Ò#¢#"À ’"âö¶Òæ§2#¢#"À ’"âö¶â#¢#2À ’"âö¶âæ§2#¢#2À ’"âö¶ò#¢#BÀ ’"âö¶òæ§2#¢#BÀ ’"âö·R#¢#RÀ ’"âö·Ræ§2#¢#RÀ ’"âö·’#¢#bÀ ’"âö·’æ§2#¢#bÀ ’"âöÆ"#¢#rÀ ’"âöÆ"æ§2#¢#rÀ ’"âöÆò#¢#‚À ’"âöÆòæ§2#¢#‚À ’"âöÇB#¢#’À ’"âöÇBæ§2#¢#’À ’"âöÇb#¢3À ’"âöÇbæ§2#¢3À ’"âöÖR#¢3À ’"âöÖRæ§2#¢3À ’"âöÖ’#¢3"À ’"âöÖ’æ§2#¢3"À ’"âöÖ²#¢32À ’"âöÖ²æ§2#¢32À ’"âöÖÂ#¢3BÀ ’"âöÖÂæ§2#¢3BÀ ’"âöÖâ#¢3RÀ ’"âöÖâæ§2#¢3RÀ ’"âö×"#¢3bÀ ’"âö×"æ§2#¢3bÀ ’"âö×2#¢3rÀ ’"âö×2Ö×’#¢3‚À ’"âö×2Ö×’æ§2#¢3‚À ’"âö×2æ§2#¢3rÀ ’"âö×B#¢3’À ’"âö×Bæ§2#¢3’À ’"âö×’#¢CÀ ’"âö×’æ§2#¢CÀ ’"âöæ"#¢CÀ ’"âöæ"æ§2#¢CÀ ’"âöæR#¢C"À ’"âöæRæ§2#¢C"À ’"âöæÂ#¢C2À ’"âöæÂÖ&R#¢CBÀ ’"âöæÂÖ&Ræ§2#¢CBÀ ’"âöæÂæ§2#¢C2À ’"âöæâ#¢CRÀ ’"âöæâæ§2#¢CRÀ ’"â÷Ö–â#¢CbÀ ’"â÷Ö–âæ§2#¢CbÀ ’"â÷Â#¢CrÀ ’"â÷Âæ§2#¢CrÀ ’"â÷B#¢C‚À ’"â÷BÖ'"#¢C’À ’"â÷BÖ'"æ§2#¢C’À ’"â÷Bæ§2#¢C‚À ’"â÷&ò#¢SÀ ’"â÷&òæ§2#¢SÀ ’"â÷'R#¢SÀ ’"â÷'Ræ§2#¢SÀ ’"â÷6B#¢S"À ’"â÷6Bæ§2#¢S"À ’"â÷6R#¢S2À ’"â÷6Ræ§2#¢S2À ’"â÷6’#¢SBÀ ’"â÷6’æ§2#¢SBÀ ’"â÷6²#¢SRÀ ’"â÷6²æ§2#¢SRÀ ’"â÷6Â#¢SbÀ ’"â÷6Âæ§2#¢SbÀ ’"â÷7#¢SrÀ ’"â÷7æ§2#¢SrÀ ’"â÷7"#¢S‚À ’"â÷7"Ö7—&Â#¢S’À ’"â÷7"Ö7—&Âæ§2#¢S’À ’"â÷7"æ§2#¢S‚À ’"â÷72#¢cÀ ’"â÷72æ§2#¢cÀ ’"â÷7b#¢cÀ ’"â÷7bæ§2#¢cÀ ’"â÷7r#¢c"À ’"â÷7ræ§2#¢c"À ’"â÷F#¢c2À ’"â÷Fæ§2#¢c2À ’"â÷FR#¢cBÀ ’"â÷FRæ§2#¢cBÀ ’"â÷FWB#¢cRÀ ’"â÷FWBæ§2#¢cRÀ ’"â÷Fr#¢cbÀ ’"â÷Fræ§2#¢cbÀ ’"â÷F‚#¢crÀ ’"â÷F‚æ§2#¢crÀ ’"â÷FÂ×‚#¢c‚À ’"â÷FÂ×‚æ§2#¢c‚À ’"â÷FÆ‚#¢c’À ’"â÷FÆ‚æ§2#¢c’À ’"â÷G"#¢sÀ ’"â÷G"æ§2#¢sÀ ’"â÷G¦Â#¢sÀ ’"â÷G¦Âæ§2#¢sÀ ’"â÷G¦Ò#¢s"À ’"â÷G¦ÒÖÆFâ#¢s2À ’"â÷G¦ÒÖÆFâæ§2#¢s2À ’"â÷G¦Òæ§2#¢s"À ’"â÷VrÖ6â#¢sBÀ ’"â÷VrÖ6âæ§2#¢sBÀ ’"â÷V²#¢sRÀ ’"â÷V²æ§2#¢sRÀ ’"â÷W"#¢sbÀ ’"â÷W"æ§2#¢sbÀ ’"â÷W¢#¢srÀ ’"â÷W¢ÖÆFâ#¢s‚À ’"â÷W¢ÖÆFâæ§2#¢s‚À ’"â÷W¢æ§2#¢srÀ ’"â÷f’#¢s’À ’"â÷f’æ§2#¢s’À ’"â÷‚×6WVFò#¢ƒÀ ’"â÷‚×6WVFòæ§2#¢ƒÀ ’"â÷–ò#¢ƒÀ ’"â÷–òæ§2#¢ƒÀ ’"â÷¦‚Ö6â#¢ƒ"À ’"â÷¦‚Ö6âæ§2#¢ƒ"À ’"â÷¦‚Ö†²#¢ƒ2À ’"â÷¦‚Ö†²æ§2#¢ƒ2À ’"â÷¦‚×Gr#¢ƒBÀ ’"â÷¦‚×Græ§2#¢ƒ@§Ó°¦gVæ7F–öâvV'6´6öçFW‡B‡&W’° —&WGW&âõ÷vV'6µ÷&WV—&Uõò‡vV'6´6öçFW‡E&W6öÇfR‡&W’“°§Ó°¦gVæ7F–öâvV'6´6öçFW‡E&W6öÇfR‡&W’° —f"–BÒÖ·&WÓ° ––b‚†–B²’’òò6†V6²f÷"çVÖ&W"÷"7G&–æp —F‡&÷ræWrW'&÷"‚$6ææ÷Bf–æBÖöGVÆRr"²&W²"râ"“° —&WGW&â–C°§Ó°§vV'6´6öçFW‡Bæ¶W—2ÒgVæ7F–öâvV'6´6öçFW‡D¶W—2‚’° —&WGW&âö&¦V7Bæ¶W—2†Ö“°§Ó°§vV'6´6öçFW‡Bç&W6öÇfRÒvV'6´6öçFW‡E&W6öÇfS°¦ÖöGVÆRæW‡÷'G2ÒvV'6´6öçFW‡C°§vV'6´6öçFW‡Bæ–BÒ#C“° ¢ò¢¢¢òÒ’À¢ò¢#S¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2Âõ÷vV'6µ÷&WV—&Uõò’° ¥õ÷vV'6µ÷&WV—&Uõòƒ#S“° ¦¥VW'’†gVæ7F–öâ‚B’°¢'W6R7G&–7B#°¢–b‚B‚ræ6—&7VÆ"×&öw&W76&"r’æÆVæwF‚’°¢Væ&ÆT6—&7VÆ%&öw&W76&'2‚“°¢òò6†V6²–b¶æö"—2–âf–Ww÷'@¢B‡v–æF÷r’æ&–æB‚w67&öÆÂÆöB&W6—¦RrÂgVæ7F–öâ‚’°¢Væ&ÆT6—&7VÆ%&öw&W76&'2‚“°¢Ò“°¢Ð§Ò“°  ¢òòVæ&ÆR6—&7VÆ"&öw&W76&'0¦gVæ7F–öâVæ&ÆT6—&7VÆ%&öw&W76&'2‚’° ¢òò–æ—F–Æ—¦R6—&7VÆ"&öw&W76&'0¢–æ—D6—&7VÆ%&öw&W76&'2‚“° ¢B‚ræ6—&7VÆ"×&öw&W76&"r’æV6‚†gVæ7F–öâ‚’°¢ò¢¶æö"VÆVÖVçG2¢ð¢f"¶æö"ÒB‡F†—2’æf–æB‚ræ6—&7VÆ"×&öw&W76&"Ö–ææW"–çWBr“°¢f"¶æö%÷W&6VçBÒ¶æö"ç&VçG2‚ræ6—&7VÆ"×&öw&W76&"Ö–ææW"r’æf–æB‚w7âæ¶æö"×W&6VçBr“° ¢ò¢¶æö"f&–&ÆW2¢ð¢f"fÇVRÒ¶æö"æFF‚wfÇVRr“°¢f"¶æö%÷fÂÒ¶æö"æFF‚wfÇVRr“°¢f"¶æö%öæ–ÖFVBÒ¶æö"æ†46Æ72‚v¶æö"Öæ–ÖFVBr“° ¢òòæ–ÖFR¶æö"–b–âf–Ww÷'@¢–b†—4VÆVÖVçD–åf–Ww÷'B†¶æö"’bb¶æö%öæ–ÖFVB’° ¢¶æö"æFD6Æ72‚v¶æö"Öæ–ÖFVBr“°¢B‡·7F'EfÃ¢Ò’ææ–ÖFR‡·7F'EfÃ¢¶æö%÷fÇÒÀ¢°¢GW&F–öã¢À¢V6–æs¢w7v–ærrÀ¢7FW¢gVæ7F–öâ‚’°¢¶æö"çfÂ„ÖF‚æ6V–Â‡F†—2ç7F'EfÂ’’çG&–vvW"‚v6†ævRr“°¢¶æö%÷W&6VçBæ‡FÖÂ„ÖF‚æ6V–Â‡F†—2ç7F'EfÂ’²sÇ7ãâSÂ÷7ãâr“°¢Ð¢Ð¢“° ¢Ð ¢Ò“°§Ð ¢òò–æ—B6—&7VÆ"&öw&W74&'0¦gVæ7F–öâ–æ—D6—&7VÆ%&öw&W76&'2‚’°¢B‚ræ6—&7VÆ"×&öw&W76&#æ–çWBr’æV6‚†gVæ7F–öâ‚’°¢f"¶æö"ÒB‡F†—2“°¢¶æö"çw&‚sÆF—b6Æ73Ò&6—&7VÆ"×&öw&W76&"Ö–ææW"#ãÂöF—câr“°¢¶æö"ç&VçB‚’æVæB‚sÇ7â6Æ73Ò&¶æö"×W&6VçB#ãÂ÷7ãâr“° ¢òò6WBF†RfÇVP¢f"fÇVRÒB‡F†—2’çfÂ‚“°¢B‡F†—2’æFF‚wfÇVRrÂfÇVR“° ¢f"6—¦RÒ#°¢–b‚B‡F†—2’æFF‚w6—¦Rr’’°¢6—¦RÒB‡F†—2’æFF‚w6—¦Rr“°¢Ð¢òò–æ—F–Æ—¦R¶æö ¢B‡F†—2’æ¶æö"‡°¢Ö–ã¢À¢Öƒ¢À¢v–GFƒ¢6—¦RÀ¢†V–v‡C¢6—¦RÀ¢&VDöæÇ“¢G'VRÀ¢F—7Æ”–çWC¢fÇ6P¢Ò“° ¢òò6WBF†R7F'BfÇVRFò ¢B‡F†—2’çfÂƒ’çG&–vvW"‚v6†ævRr“° ¢Ò“°§Ð  ¢ò¢¢¢òÒ’À¢ò¢#S¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2Âõ÷vV'6µ÷&WV—&Uõò’° §f"õõtT%4µôÔEôDTd”äUôd5Dõ%•õòÂõõtT%4µôÔEôDTd”äUô%$•õòÂõõtT%4µôÔEôDTd”äUõ$U5TÅEõó²†gVæ7F–öâ†R—¶–b‡G'VR—²…õõtT%4µôÔEôDTd”äUô%$•õòÒµõ÷vV'6µ÷&WV—&Uõòƒ’•ÒÂõõtT%4µôÔEôDTd”äUôd5Dõ%•õòÒ†R’À •õõtT%4µôÔEôDTd”äUõ$U5TÅEõòÒ‡G—VöbõõtT%4µôÔEôDTd”äUôd5Dõ%•õòÓÓÒvgVæ7F–öârð ’…õõtT%4µôÔEôDTd”äUôd5Dõ%•õòæÇ’†W‡÷'G2ÂõõtT%4µôÔEôDTd”äUô%$•õò’’¢õõtT%4µôÔEôDTd”äUôd5Dõ%•õò’À •õõtT%4µôÔEôDTd”äUõ$U5TÅEõòÓÒVæFVf–æVBbb†ÖöGVÆRæW‡÷'G2ÒõõtT%4µôÔEôDTd”äUõ$U5TÅEõò’—ÖVÇ6W¶R†¥VW'’—×Ò’†gVæ7F–öâ†R—²'W6R7G&–7B#·f"C×·ÒÆãÔÖF‚æÖ‚Ç#ÔÖF‚æÖ–ã·Bæ3×·Ó·Bæ2æCÖR†Fö7VÖVçB“·Bæ2çCÖgVæ7F–öâ†R—·&WGW&âRæ÷&–v–æÄWfVçBçF÷V6†W2æÆVæwF‚ÓÓ·BæóÖgVæ7F–öâ‚—·f"ã×F†—3·F†—2æóÖçVÆÃ·F†—2âCÖçVÆÃ·F†—2æ“ÖçVÆÃ·F†—2æsÖçVÆÃ·F†—2çcÖçVÆÃ·F†—2æ7cÖçVÆÃ·F†—2çƒÓ·F†—2ç“Ó·F†—2çsÓ·F†—2æƒÓ·F†—2âF3ÖçVÆÃ·F†—2æ3ÖçVÆÃ·F†—2çCÓ·F†—2æ—4–æ—CÖfÇ6S·F†—2æft6öÆ÷#ÖçVÆÃ·F†—2ç6öÆ÷#ÖçVÆÃ·F†—2æDƒÖçVÆÃ·F†—2æ4ƒÖçVÆÃ·F†—2æTƒÖçVÆÃ·F†—2ç$ƒÖçVÆÃ·F†—2ç66ÆSÓ·F†—2ç&VÆF—fSÖfÇ6S·F†—2ç&VÆF—fUv–GFƒÖfÇ6S·F†—2ç&VÆF—fT†V–v‡CÖfÇ6S·F†—2âFF—cÖçVÆÃ·F†—2ç'VãÖgVæ7F–öâ‚—·f"CÖgVæ7F–öâ†RÇB—·f"#¶f÷"‡"–âB—¶âæõ·%Ó×E·%×Öâåö6'fR‚’æ–æ—B‚“¶âåö6öæf–wW&R‚’åöG&r‚—Ó¶–b‡F†—2âBæFF‚&¶öçG&öÆVB"’—&WGW&ã·F†—2âBæFF‚&¶öçG&öÆVB"ÇG'VR“·F†—2æW‡FVæB‚“·F†—2æóÖRæW‡FVæB‡¶Ö–ã§F†—2âBæFF‚&Ö–â"’Ó×VæFVf–æVC÷F†—2âBæFF‚&Ö–â"“£ÆÖƒ§F†—2âBæFF‚&Ö‚"’Ó×VæFVf–æVC÷F†—2âBæFF‚&Ö‚"“£Ç7F÷W#§G'VRÇ&VDöæÇ“§F†—2âBæFF‚'&VFöæÇ’"—ÇÇF†—2âBæGG"‚'&VFöæÇ’"“ÓÓÒ'&VFöæÇ’"Æ7W'6÷#§F†—2âBæFF‚&7W'6÷""“ÓÓ×G'VRbc3ÇÇF†—2âBæFF‚&7W'6÷""—ÇÃÇF†–6¶æW73§F†—2âBæFF‚'F†–6¶æW72"’bdÖF‚æÖ‚„ÖF‚æÖ–â‡F†—2âBæFF‚'F†–6¶æW72"’Ã’Âã—ÇÂã3RÆÆ–æT6§F†—2âBæFF‚&Æ–æV6"—ÇÂ&'WGB"Çv–GFƒ§F†—2âBæFF‚'v–GF‚"—ÇÃ#Æ†V–v‡C§F†—2âBæFF‚&†V–v‡B"—ÇÃ#ÆF—7Æ”–çWC§F†—2âBæFF‚&F—7Æ––çWB"“ÓÖçVÆÇÇÇF†—2âBæFF‚&F—7Æ––çWB"’ÆF—7Æ•&Wf–÷W3§F†—2âBæFF‚&F—7Æ—&Wf–÷W2"’Æft6öÆ÷#§F†—2âBæFF‚&fv6öÆ÷""—ÇÂ"3ƒt4TT""Æ–çWD6öÆ÷#§F†—2âBæFF‚&–çWF6öÆ÷""’ÆföçC§F†—2âBæFF‚&föçB"—ÇÂ$&–Â"ÆföçEvV–v‡C§F†—2âBæFF‚&föçB×vV–v‡B"—ÇÂ&&öÆB"Æ–æÆ–æS¦fÇ6RÇ7FW§F†—2âBæFF‚'7FW"—ÇÃÇ&÷FF–öã§F†—2âBæFF‚'&÷FF–öâ"’ÆG&s¦çVÆÂÆ6†ævS¦çVÆÂÆ6æ6VÃ¦çVÆÂÇ&VÆV6S¦çVÆÂÆf÷&ÖC¦gVæ7F–öâ†R—·&WGW&âWÒÇ'6S¦gVæ7F–öâ†R—·&WGW&â'6TfÆöB†R—×ÒÇF†—2æò“·F†—2æòæfÆ—×F†—2æòç&÷FF–öãÓÓÒ&çF–6Æö6·v—6R'ÇÇF†—2æòç&÷FF–öãÓÓÒ&7r#¶–b‚F†—2æòæ–çWD6öÆ÷"—·F†—2æòæ–çWD6öÆ÷#×F†—2æòæft6öÆ÷'Ö–b‡F†—2âBæ—2‚&f–VÆG6WB"’—·F†—2çc×·Ó·F†—2æ“×F†—2âBæf–æB‚&–çWB"“·F†—2æ’æV6‚†gVæ7F–öâ‡B—·f"#ÖR‡F†—2“¶âæ•·EÓ×#¶âçe·EÓÖâæòç'6R‡"çfÂ‚’“·"æ&–æB‚&6†ævR&ÇW""ÆgVæ7F–öâ‚—·f"S×·Ó¶U·EÓ×"çfÂ‚“¶âçfÂ†âå÷fÆ–FFR†R’—Ò—Ò“·F†—2âBæf–æB‚&ÆVvVæB"’ç&VÖ÷fR‚—ÖVÇ6W·F†—2æ“×F†—2âC·F†—2çc×F†—2æòç'6R‡F†—2âBçfÂ‚’“·F†—2çcÓÓÒ""bb‡F†—2çc×F†—2æòæÖ–â“·F†—2âBæ&–æB‚&6†ævR&ÇW""ÆgVæ7F–öâ‚—¶âçfÂ†âå÷fÆ–FFR†âæòç'6R†ââBçfÂ‚’’’—Ò—ÒF†—2æòæF—7Æ”–çWBbgF†—2âBæ†–FR‚“·F†—2âF3ÖR†Fö7VÖVçBæ7&VFTVÆVÖVçB‚&6çf2"’’æGG"‡·v–GFƒ§F†—2æòçv–GF‚Æ†V–v‡C§F†—2æòæ†V–v‡GÒ“·F†—2âFF—cÖR‚sÆF—b7G–ÆSÒ"r²‡F†—2æòæ–æÆ–æSò&F—7Æ“¦–æÆ–æS²#¢""’²'v–GFƒ¢"·F†—2æòçv–GF‚²'ƒ¶†V–v‡C¢"·F†—2æòæ†V–v‡B²'ƒ²"²r#ãÂöF—câr“·F†—2âBçw&‡F†—2âFF—b’æ&Vf÷&R‡F†—2âF2“·F†—2âFF—c×F†—2âBç&VçB‚“¶–b‡G—Vöbu÷fÖÄ6çf4ÖævW"ÓÒ'VæFVf–æVB"—´u÷fÖÄ6çf4ÖævW"æ–æ—DVÆVÖVçB‡F†—2âF5³Ò—×F†—2æ3×F†—2âF5³ÒævWD6öçFW‡C÷F†—2âF5³ÒævWD6öçFW‡B‚#&B"“¦çVÆÃ¶–b‚F†—2æ2—·F‡&÷w¶æÖS¢$6çf4æ÷E7W÷'FVDW†6WF–öâ"ÆÖW76vS¢$6çf2æ÷B7W÷'FVBâÆV6RW6RW†6çf2öâ”S‚ãâ"ÇFõ7G&–æs¦gVæ7F–öâ‚—·&WGW&âF†—2ææÖR²#¢"·F†—2æÖW76vW×××F†—2ç66ÆSÒ‡v–æF÷ræFWf–6U—†VÅ&F–÷ÇÃ’ò‡F†—2æ2çvV&¶—D&6¶–æu7F÷&U—†VÅ&F–÷ÇÇF†—2æ2æÖ÷¤&6¶–æu7F÷&U—†VÅ&F–÷ÇÇF†—2æ2æ×4&6¶–æu7F÷&U—†VÅ&F–÷ÇÇF†—2æ2æô&6¶–æu7F÷&U—†VÅ&F–÷ÇÇF†—2æ2æ&6¶–æu7F÷&U—†VÅ&F–÷ÇÃ“·F†—2ç&VÆF—fUv–GFƒ×F†—2æòçv–GF‚SÓÓbgF†—2æòçv–GF‚æ–æFW„öb‚"R"“·F†—2ç&VÆF—fT†V–v‡C×F†—2æòæ†V–v‡BSÓÓbgF†—2æòæ†V–v‡Bæ–æFW„öb‚"R"“·F†—2ç&VÆF—fS×F†—2ç&VÆF—fUv–GF‡ÇÇF†—2ç&VÆF—fT†V–v‡C·F†—2åö6'fR‚“¶–b‡F†—2çb–ç7Fæ6Vöbö&¦V7B—·F†—2æ7c×·Ó·F†—2æ6÷’‡F†—2çbÇF†—2æ7b—ÖVÇ6W·F†—2æ7c×F†—2çg×F†—2âBæ&–æB‚&6öæf–wW&R"ÇB’ç&VçB‚’æ&–æB‚&6öæf–wW&R"ÇB“·F†—2åöÆ—7FVâ‚’åö6öæf–wW&R‚’å÷‡’‚’æ–æ—B‚“·F†—2æ—4–æ—C×G'VS·F†—2âBçfÂ‡F†—2æòæf÷&ÖB‡F†—2çb’“·F†—2åöG&r‚“·&WGW&âF†—7Ó·F†—2åö6'fSÖgVæ7F–öâ‚—¶–b‡F†—2ç&VÆF—fR—·f"S×F†—2ç&VÆF—fUv–GFƒ÷F†—2âFF—bç&VçB‚’çv–GF‚‚’§'6T–çB‡F†—2æòçv–GF‚’ó§F†—2âFF—bç&VçB‚’çv–GF‚‚’ÇC×F†—2ç&VÆF—fT†V–v‡C÷F†—2âFF—bç&VçB‚’æ†V–v‡B‚’§'6T–çB‡F†—2æòæ†V–v‡B’ó§F†—2âFF—bç&VçB‚’æ†V–v‡B‚“·F†—2çs×F†—2æƒÔÖF‚æÖ–â†RÇB—ÖVÇ6W·F†—2çs×F†—2æòçv–GFƒ·F†—2æƒ×F†—2æòæ†V–v‡G×F†—2âFF—bæ772‡·v–GFƒ§F†—2çr²'‚"Æ†V–v‡C§F†—2æ‚²'‚'Ò“·F†—2âF2æGG"‡·v–GFƒ§F†—2çrÆ†V–v‡C§F†—2æ‡Ò“¶–b‡F†—2ç66ÆRÓÓ—·F†—2âF5³Òçv–GFƒ×F†—2âF5³Òçv–GF‚§F†—2ç66ÆS·F†—2âF5³Òæ†V–v‡C×F†—2âF5³Òæ†V–v‡B§F†—2ç66ÆS·F†—2âF2çv–GF‚‡F†—2çr“·F†—2âF2æ†V–v‡B‡F†—2æ‚—×&WGW&âF†—7Ó·F†—2åöG&sÖgVæ7F–öâ‚—·f"S×G'VS¶âæsÖâæ3¶âæ6ÆV"‚“¶âæD‚bb†SÖâæD‚‚’“¶RÓÖfÇ6RbfâæG&r‚—Ó·F†—2å÷F÷V6ƒÖgVæ7F–öâ†R—·f"#ÖgVæ7F–öâ†R—·f"CÖâç‡“'fÂ†Ræ÷&–v–æÄWfVçBçF÷V6†W5¶âçEÒçvU‚ÆRæ÷&–v–æÄWfVçBçF÷V6†W5¶âçEÒçvU’“¶–b‡CÓÖâæ7b—&WGW&ã¶–b†âæ4‚bfâæ4‚‡B“ÓÓÖfÇ6R—&WGW&ã¶âæ6†ævR†âå÷fÆ–FFR‡B’“¶âåöG&r‚—Ó·F†—2çC×Bæ2çB†R“·"†R“·Bæ2æBæ&–æB‚'F÷V6†Ö÷fRæ²"Ç"’æ&–æB‚'F÷V6†VæBæ²"ÆgVæ7F–öâ‚—·Bæ2æBçVæ&–æB‚'F÷V6†Ö÷fRæ²F÷V6†VæBæ²"“¶âçfÂ†âæ7b—Ò“·&WGW&âF†—7Ó·F†—2åöÖ÷W6SÖgVæ7F–öâ†R—·f"#ÖgVæ7F–öâ†R—·f"CÖâç‡“'fÂ†RçvU‚ÆRçvU’“¶–b‡CÓÖâæ7b—&WGW&ã¶–b†âæ4‚bfâæ4‚‡B“ÓÓÖfÇ6R—&WGW&ã¶âæ6†ævR†âå÷fÆ–FFR‡B’“¶âåöG&r‚—Ó·"†R“·Bæ2æBæ&–æB‚&Ö÷W6VÖ÷fRæ²"Ç"’æ&–æB‚&¶W—Wæ²"ÆgVæ7F–öâ†R—¶–b†Ræ¶W”6öFSÓÓÓ#r—·Bæ2æBçVæ&–æB‚&Ö÷W6WWæ²Ö÷W6VÖ÷fRæ²¶W—Wæ²"“¶–b†âæT‚bfâæT‚‚“ÓÓÖfÇ6R—&WGW&ã¶âæ6æ6VÂ‚—×Ò’æ&–æB‚&Ö÷W6WWæ²"ÆgVæ7F–öâ†R—·Bæ2æBçVæ&–æB‚&Ö÷W6VÖ÷fRæ²Ö÷W6WWæ²¶W—Wæ²"“¶âçfÂ†âæ7b—Ò“·&WGW&âF†—7Ó·F†—2å÷‡“ÖgVæ7F–öâ‚—·f"S×F†—2âF2æöfg6WB‚“·F†—2çƒÖRæÆVgC·F†—2ç“ÖRçF÷·&WGW&âF†—7Ó·F†—2åöÆ—7FVãÖgVæ7F–öâ‚—¶–b‚F†—2æòç&VDöæÇ’—·F†—2âF2æ&–æB‚&Ö÷W6VF÷vâ"ÆgVæ7F–öâ†R—¶Rç&WfVçDFVfVÇB‚“¶âå÷‡’‚’åöÖ÷W6R†R—Ò’æ&–æB‚'F÷V6‡7F'B"ÆgVæ7F–öâ†R—¶Rç&WfVçDFVfVÇB‚“¶âå÷‡’‚’å÷F÷V6‚†R—Ò“·F†—2æÆ—7FVâ‚—ÖVÇ6W·F†—2âBæGG"‚'&VFöæÇ’"Â'&VFöæÇ’"—Ö–b‡F†—2ç&VÆF—fR—¶R‡v–æF÷r’ç&W6—¦R†gVæ7F–öâ‚—¶âåö6'fR‚’æ–æ—B‚“¶âåöG&r‚—Ò—×&WGW&âF†—7Ó·F†—2åö6öæf–wW&SÖgVæ7F–öâ‚—¶–b‡F†—2æòæG&r—F†—2æDƒ×F†—2æòæG&s¶–b‡F†—2æòæ6†ævR—F†—2æ4ƒ×F†—2æòæ6†ævS¶–b‡F†—2æòæ6æ6VÂ—F†—2æTƒ×F†—2æòæ6æ6VÃ¶–b‡F†—2æòç&VÆV6R—F†—2ç$ƒ×F†—2æòç&VÆV6S¶–b‡F†—2æòæF—7Æ•&Wf–÷W2—·F†—2ç6öÆ÷#×F†—2æƒ'&v&‡F†—2æòæft6öÆ÷"Â#ãB"“·F†—2æft6öÆ÷#×F†—2æƒ'&v&‡F†—2æòæft6öÆ÷"Â#ãb"—ÖVÇ6W·F†—2æft6öÆ÷#×F†—2æòæft6öÆ÷'×&WGW&âF†—7Ó·F†—2åö6ÆV#ÖgVæ7F–öâ‚—·F†—2âF5³Òçv–GFƒ×F†—2âF5³Òçv–GF‡Ó·F†—2å÷fÆ–FFSÖgVæ7F–öâ†R—·f"C×çâ‚†SÃòÒãS¢ãR’¶R÷F†—2æòç7FW’§F†—2æòç7FW·&WGW&âÖF‚ç&÷VæB‡B£’óÓ·F†—2æÆ—7FVãÖgVæ7F–öâ‚—·Ó·F†—2æW‡FVæCÖgVæ7F–öâ‚—·Ó·F†—2æ–æ—CÖgVæ7F–öâ‚—·Ó·F†—2æ6†ævSÖgVæ7F–öâ†R—·Ó·F†—2çfÃÖgVæ7F–öâ†R—·Ó·F†—2ç‡“'fÃÖgVæ7F–öâ†RÇB—·Ó·F†—2æG&sÖgVæ7F–öâ‚—·Ó·F†—2æ6ÆV#ÖgVæ7F–öâ‚—·F†—2åö6ÆV"‚—Ó·F†—2æƒ'&v&ÖgVæ7F–öâ†RÇB—·f"ã¶SÖRç7V'7G&–ærƒÃr“¶ãÕ·'6T–çB†Rç7V'7G&–ærƒÃ"’Ãb’Ç'6T–çB†Rç7V'7G&–ærƒ"ÃB’Ãb’Ç'6T–çB†Rç7V'7G&–ærƒBÃb’Ãb•Ó·&WGW&â'&v&‚"¶å³Ò²"Â"¶å³Ò²"Â"¶å³%Ò²"Â"·B²"’'Ó·F†—2æ6÷“ÖgVæ7F–öâ†RÇB—¶f÷"‡f"â–âR—·E¶åÓÖU¶å×××Ó·BäF–ÃÖgVæ7F–öâ‚—·Bæòæ6ÆÂ‡F†—2“·F†—2ç7F'DævÆSÖçVÆÃ·F†—2ç‡“ÖçVÆÃ·F†—2ç&F—W3ÖçVÆÃ·F†—2æÆ–æUv–GFƒÖçVÆÃ·F†—2æ7W'6÷$W‡CÖçVÆÃ·F†—2çs#ÖçVÆÃ·F†—2å“#Ó"¤ÖF‚å“·F†—2æW‡FVæCÖgVæ7F–öâ‚—·F†—2æóÖRæW‡FVæB‡¶&t6öÆ÷#§F†—2âBæFF‚&&v6öÆ÷""—ÇÂ"4TTTTTR"ÆævÆTöfg6WC§F†—2âBæFF‚&ævÆVöfg6WB"—ÇÃÆævÆT&3§F†—2âBæFF‚&ævÆV&2"—ÇÃ3cÆ–æÆ–æS§G'VWÒÇF†—2æò—Ó·F†—2çfÃÖgVæ7F–öâ†RÇB—¶–b†çVÆÂÖR—¶S×F†—2æòç'6R†R“¶–b‡BÓÖfÇ6RbfR×F†—2çbbgF†—2ç$‚bgF†—2ç$‚†R“ÓÓÖfÇ6R—·&WGW&ç×F†—2æ7c×F†—2æòç7F÷W#öâ‡"†RÇF†—2æòæÖ‚’ÇF†—2æòæÖ–â“¦S·F†—2çc×F†—2æ7c·F†—2âBçfÂ‡F†—2æòæf÷&ÖB‡F†—2çb’“·F†—2åöG&r‚—ÖVÇ6W·&WGW&âF†—2çg×Ó·F†—2ç‡“'fÃÖgVæ7F–öâ†RÇB—·f"’Ç3¶“ÔÖF‚æFã"†RÒ‡F†—2ç‚·F†—2çs"’ÂÒ‡B×F†—2ç’×F†—2çs"’’×F†—2æævÆTöfg6WC¶–b‡F†—2æòæfÆ——¶“×F†—2æævÆT&2Ö’×F†—2å“'Ö–b‡F†—2æævÆT&2×F†—2å“"bf“Ãbf“âÒãR—¶“ÓÖVÇ6R–b†“Ã—¶’³×F†—2å“'×3Ö’¢‡F†—2æòæÖ‚×F†—2æòæÖ–â’÷F†—2æævÆT&2·F†—2æòæÖ–ã·F†—2æòç7F÷W"bb‡3Öâ‡"‡2ÇF†—2æòæÖ‚’ÇF†—2æòæÖ–â’“·&WGW&â7Ó·F†—2æÆ—7FVãÖgVæ7F–öâ‚—·f"C×F†—2Æ’Ç2ÆóÖgVæ7F–öâ†R—¶Rç&WfVçDFVfVÇB‚“·f"óÖRæ÷&–v–æÄWfVçBÇSÖòæFWF–ÇÇÆòçv†VVÄFVÇF‚ÆÖòæFWF–ÇÇÆòçv†VVÄFVÇF’Æc×Bå÷fÆ–FFR‡Bæòç'6R‡BâBçfÂ‚’’’²‡SãÇÆã÷Bæòç7FW§SÃÇÆÃò×Bæòç7FW£“¶cÖâ‡"†bÇBæòæÖ‚’ÇBæòæÖ–â“·BçfÂ†bÆfÇ6R“¶–b‡Bç$‚—¶6ÆV%F–ÖV÷WB†’“¶“×6WEF–ÖV÷WB†gVæ7F–öâ‚—·Bç$‚†b“¶“ÖçVÆÇÒÃ“¶–b‚2—·3×6WEF–ÖV÷WB†gVæ7F–öâ‚—¶–b†’—Bç$‚†b“·3ÖçVÆÇÒÃ#—××ÒÇRÆÆcÓÆÃ×³3s¢×Bæòç7FWÃ3ƒ§Bæòç7FWÃ3“§Bæòç7FWÃC¢×Bæòç7FWÓ·F†—2âBæ&–æB‚&¶W–F÷vâ"ÆgVæ7F–öâ†’—·f"3Ö’æ¶W”6öFS¶–b‡3ãÓ“bbg3ÃÓR—·3Ö’æ¶W”6öFS×2ÓC‡×S×'6T–çB…7G&–æræg&öÔ6†$6öFR‡2’“¶–b†—4æâ‡R’—·2ÓÓ2bg2ÓÓ‚bg2ÓÓ’bg2ÓÓƒ’bb‡2ÓÓ“ÇÇBâBçfÂ‚’æÖF6‚‚õÂâò’’bf’ç&WfVçDFVfVÇB‚“¶–b†Ræ–ä'&’‡2Å³3rÃ3‚Ã3’ÃCÒ“âÓ—¶’ç&WfVçDFVfVÇB‚“·f"ó×Bæòç'6R‡BâBçfÂ‚’’¶Å·5Ò¦c·Bæòç7F÷W"bb†óÖâ‡"†òÇBæòæÖ‚’ÇBæòæÖ–â’“·Bæ6†ævR‡Bå÷fÆ–FFR†ò’“·BåöG&r‚“¶×v–æF÷rç6WEF–ÖV÷WB†gVæ7F–öâ‚—¶b£Ó'ÒÃ3—××Ò’æ&–æB‚&¶W—W"ÆgVæ7F–öâ†R—¶–b†—4æâ‡R’—¶–b†—·v–æF÷ræ6ÆV%F–ÖV÷WB†“¶ÖçVÆÃ¶cÓ·BçfÂ‡BâBçfÂ‚’—×ÖVÇ6W·BâBçfÂ‚“çBæòæÖ‚bgBâBçfÂ‡BæòæÖ‚—ÇÇBâBçfÂ‚“ÇBæòæÖ–âbgBâBçfÂ‡BæòæÖ–â—×Ò“·F†—2âF2æ&–æB‚&Ö÷W6Wv†VVÂDôÔÖ÷W6U67&öÆÂ"Æò“·F†—2âBæ&–æB‚&Ö÷W6Wv†VVÂDôÔÖ÷W6U67&öÆÂ"Æò—Ó·F†—2æ–æ—CÖgVæ7F–öâ‚—¶–b‡F†—2çcÇF†—2æòæÖ–çÇÇF†—2çcçF†—2æòæÖ‚—·F†—2çc×F†—2æòæÖ–ç×F†—2âBçfÂ‡F†—2çb“·F†—2çs#×F†—2çró#·F†—2æ7W'6÷$W‡C×F†—2æòæ7W'6÷"ó·F†—2ç‡“×F†—2çs"§F†—2ç66ÆS·F†—2æÆ–æUv–GFƒ×F†—2ç‡’§F†—2æòçF†–6¶æW73·F†—2æÆ–æT6×F†—2æòæÆ–æT6·F†—2ç&F—W3×F†—2ç‡’×F†—2æÆ–æUv–GF‚ó#·F†—2æòæævÆTöfg6WBbb‡F†—2æòæævÆTöfg6WCÖ—4æâ‡F†—2æòæævÆTöfg6WB“ó§F†—2æòæævÆTöfg6WB“·F†—2æòæævÆT&2bb‡F†—2æòæævÆT&3Ö—4æâ‡F†—2æòæævÆT&2“÷F†—2å“#§F†—2æòæævÆT&2“·F†—2æævÆTöfg6WC×F†—2æòæævÆTöfg6WB¤ÖF‚å’óƒ·F†—2æævÆT&3×F†—2æòæævÆT&2¤ÖF‚å’óƒ·F†—2ç7F'DævÆSÓãR¤ÖF‚å’·F†—2æævÆTöfg6WC·F†—2æVæDævÆSÓãR¤ÖF‚å’·F†—2æævÆTöfg6WB·F†—2æævÆT&3·f"SÖâ…7G&–ær„ÖF‚æ'2‡F†—2æòæÖ‚’’æÆVæwF‚Å7G&–ær„ÖF‚æ'2‡F†—2æòæÖ–â’’æÆVæwF‚Ã"’³#·F†—2æòæF—7Æ”–çWBbgF†—2æ’æ772‡·v–GFƒ¢‡F†—2çró"³Cãã’²'‚"Æ†V–v‡C¢‡F†—2çró3ãã’²'‚"Ç÷6—F–öã¢&'6öÇWFR"Â'fW'F–6ÂÖÆ–vâ#¢&Ö–FFÆR"Â&Ö&v–â×F÷#¢‡F†—2çró3ãã’²'‚"Â&Ö&v–âÖÆVgB#¢"Ò"²‡F†—2çr£2óB³#ãã’²'‚"Æ&÷&FW#£Æ&6¶w&÷VæC¢&æöæR"ÆföçC§F†—2æòæföçEvV–v‡B²""²‡F†—2çröSãã’²'‚"·F†—2æòæföçBÂ'FW‡BÖÆ–vâ#¢&6VçFW""Æ6öÆ÷#§F†—2æòæ–çWD6öÆ÷'ÇÇF†—2æòæft6öÆ÷"ÇFF–æs¢#‚"Â"×vV&¶—BÖV&æ6R#¢&æöæR'Ò—ÇÇF†—2æ’æ772‡·v–GFƒ¢#‚"Çf—6–&–Æ—G“¢&†–FFVâ'Ò—Ó·F†—2æ6†ævSÖgVæ7F–öâ†R—·F†—2æ7cÖS·F†—2âBçfÂ‡F†—2æòæf÷&ÖB†R’—Ó·F†—2æævÆSÖgVæ7F–öâ†R—·&WGW&â†R×F†—2æòæÖ–â’§F†—2æævÆT&2ò‡F†—2æòæÖ‚×F†—2æòæÖ–â—Ó·F†—2æ&3ÖgVæ7F–öâ†R—·f"BÆã¶S×F†—2æævÆR†R“¶–b‡F†—2æòæfÆ——·C×F†—2æVæDævÆR³RÓS¶ã×BÖRÓRÓWÖVÇ6W·C×F†—2ç7F'DævÆRÓRÓS¶ã×B¶R³RÓW×F†—2æòæ7W'6÷"bb‡CÖâ×F†—2æ7W'6÷$W‡B’bb†ãÖâ·F†—2æ7W'6÷$W‡B“·&WGW&ç·3§BÆS¦âÆC§F†—2æòæfÆ—bbF†—2æòæ7W'6÷'×Ó·F†—2æG&sÖgVæ7F–öâ‚—·f"S×F†—2ærÇC×F†—2æ&2‡F†—2æ7b’ÆâÇ#Ó¶RæÆ–æUv–GFƒ×F†—2æÆ–æUv–GFƒ¶RæÆ–æT6×F†—2æÆ–æT6¶–b‡F†—2æòæ&t6öÆ÷"ÓÒ&æöæR"—¶Ræ&Vv–åF‚‚“¶Rç7G&ö¶U7G–ÆS×F†—2æòæ&t6öÆ÷#¶Ræ&2‡F†—2ç‡’ÇF†—2ç‡’ÇF†—2ç&F—W2ÇF†—2æVæDævÆRÓRÓRÇF†—2ç7F'DævÆR³RÓRÇG'VR“¶Rç7G&ö¶R‚—Ö–b‡F†—2æòæF—7Æ•&Wf–÷W2—¶ã×F†—2æ&2‡F†—2çb“¶Ræ&Vv–åF‚‚“¶Rç7G&ö¶U7G–ÆS×F†—2ç6öÆ÷#¶Ræ&2‡F†—2ç‡’ÇF†—2ç‡’ÇF†—2ç&F—W2Æâç2ÆâæRÆâæB“¶Rç7G&ö¶R‚“·#×F†—2æ7cÓ×F†—2çgÖRæ&Vv–åF‚‚“¶Rç7G&ö¶U7G–ÆS×#÷F†—2æòæft6öÆ÷#§F†—2æft6öÆ÷#¶Ræ&2‡F†—2ç‡’ÇF†—2ç‡’ÇF†—2ç&F—W2ÇBç2ÇBæRÇBæB“¶Rç7G&ö¶R‚—Ó·F†—2æ6æ6VÃÖgVæ7F–öâ‚—·F†—2çfÂ‡F†—2çb—×Ó¶RæfâæF–ÃÖRæfâæ¶æö#ÖgVæ7F–öâ†â—·&WGW&âF†—2æV6‚†gVæ7F–öâ‚—·f"#ÖæWrBäF–Ã·"æóÖã·"âCÖR‡F†—2“·"ç'Vâ‚—Ò’ç&VçB‚—×Ò ¢ò¢¢¢òÒ’À¢ò¢#S"¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¦¥VW'’†gVæ7F–öâ‚B’°¢'W6R7G&–7B#°¢–b‚B‚rærÖÖr’æÆVæwF‚’°¢B‚rærÖÖr’æV6‚†gVæ7F–öâ†–æFW‚ÂVÆVÖVçB’°¢f"Ö÷6VÆV7F÷"ÒB‡F†—2’æFF‚v–Br’À¢ÖFG&W72ÒB‡F†—2’æFF‚vFG&W72r’À¢ÖG—RÒB‡F†—2’æFF‚vÖG—Rr’À¢¦ööÔÇfÂÒB‡F†—2’æFF‚w¦ööÖÇfÂr’À¢Ö–âÒB‡F†—2’æFF‚vÖ–âr“°¢ ¢B‡F†—2’æGG"‚v–BrÂÖ÷6VÆV7F÷"“°¢Ö&VæFW"†Ö÷6VÆV7F÷"ÂÖFG&W72ÂÖG—RÂ¦ööÔÇfÂÂÖ–â“°¢Ò“°¢Ð¢gVæ7F–öâÖ&VæFW"‡6VÆV7F÷"ÂFG&W72ÂG—RÂ¦ööÕöÇfÂÂÖ–â’°¢òò7V6–g’fVGW&W2æBVÆVÖVçG2FòFVf–æR7G–ÆW2à¢f"7G–ÆT'&’Ò·°¢fVGW&UG—S¢&ÆÂ"À¢7G–ÆW'3¢·°¢6GW&F–öã¢Óƒ ¢ÕÐ¢ÒÂ°¢fVGW&UG—S¢'&öBæ'FW&–Â"À¢VÆVÖVçEG—S¢&vVöÖWG'’"À¢7G–ÆW'3¢·°¢‡VS¢"3ffVR ¢ÒÂ°¢6GW&F–öã¢S ¢ÕÐ¢ÒÂ°¢fVGW&UG—S¢'ö’æ'W6–æW72"À¢VÆVÖVçEG—S¢&Æ&VÇ2"À¢7G–ÆW'3¢·°¢f—6–&–Æ—G“¢&öfb ¢ÕÐ¢ÕÓ°¢f"ÖÒæWrvöövÆRæÖ2äÖ†Fö7VÖVçBævWDVÆVÖVçD'”–B‡6VÆV7F÷"’Â°¢òòÖG—T–C¢G—RÀ¢7G–ÆW3¢7G–ÆT'&’À¢67&öÆÇv†VVÃ¢fÇ6RÀ¢G&vv&ÆS¢fÇ6RÀ¢¦ööÓ¢¦ööÕöÇfÂÀ¢ÖG—T6öçG&öÃ¢fÇ6RÀ¢Ò“° ¢f"Ö÷–âÒ&76WG2ö–Örö&6–2÷–âçær#° ¢–b†Ö–â’°¢Ö÷–âÒÖ–ã°¢Ð ¢f"vVö6öFW"ÒæWrvöövÆRæÖ2ävVö6öFW"‚“°¢vVö6öFW"ævVö6öFR‡°¢vFG&W72s¢FG&W70¢ÒÀ¢gVæ7F–öâ‡&W7VÇG2Â7FGW2’°¢–b‡7FGW2ÓÓÒvöövÆRæÖ2ävVö6öFW%7FGW2äô²’°¢æWrvöövÆRæÖ2äÖ&¶W"‡°¢÷6—F–öã¢&W7VÇG5³ÒævVöÖWG'’æÆö6F–öâÀ¢Ö¢ÖÀ¢–6öã¢Ö÷–à¢Ò“°¢Öç6WD6VçFW"‡&W7VÇG5³ÒævVöÖWG'’æÆö6F–öâ“°¢Ð¢Ò“°¢Ð§Ò“° ¢ò¢¢¢òÒ’À¢ò¢#S2¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¢†gVæ7F–öâ‚’°¢wW6R7G&–7Bs°¢B‚&&öG’"’æöâ‚&6Æ–6²"Â"æ6Æ÷6U&öÖ÷F–öç2"ÂgVæ7F–öâ†R’°¢Rç&WfVçDFVfVÇB‚“°¢f"GF†—2ÒB‡F†—2“°¢GF†—2ç&VçB‚’ç6Æ–FUW‚“°¢Ò“°§Ò‚’“° ¢ò¢¢¢òÒ’À¢ò¢#SB¢òÀ¢ò¢#SR¢òÀ¢ò¢#Sb¢òÀ¢ò¢#Sr¢òÀ¢ò¢#S‚¢òÀ¢ò¢#S’¢òÀ¢ò¢#c¢òÀ¢ò¢#c¢òÀ¢ò¢#c"¢òÀ¢ò¢#c2¢òÀ¢ò¢#cB¢òÀ¢ò¢#cR¢òÀ¢ò¢#cb¢òÀ¢ò¢#cr¢òÀ¢ò¢#c‚¢òÀ¢ò¢#c’¢òÀ¢ò¢#s¢òÀ¢ò¢#s¢òÀ¢ò¢#s"¢òÀ¢ò¢#s2¢òÀ¢ò¢#sB¢òÀ¢ò¢#sR¢òÀ¢ò¢#sb¢òÀ¢ò¢#sr¢òÀ¢ò¢#s‚¢òÀ¢ò¢#s’¢òÀ¢ò¢#ƒ¢òÀ¢ò¢#ƒ¢òÀ¢ò¢#ƒ"¢òÀ¢ò¢#ƒ2¢òÀ¢ò¢#ƒB¢òÀ¢ò¢#ƒR¢òÀ¢ò¢#ƒb¢òÀ¢ò¢#ƒr¢òÀ¢ò¢#ƒ‚¢òÀ¢ò¢#ƒ’¢òÀ¢ò¢#“¢òÀ¢ò¢#“¢òÀ¢ò¢#“"¢òÀ¢ò¢#“2¢òÀ¢ò¢#“B¢òÀ¢ò¢#“R¢òÀ¢ò¢#“b¢òÀ¢ò¢#“r¢òÀ¢ò¢#“‚¢òÀ¢ò¢#“’¢òÀ¢ò¢3¢òÀ¢ò¢3¢òÀ¢ò¢3"¢òÀ¢ò¢32¢òÀ¢ò¢3B¢òÀ¢ò¢3R¢òÀ¢ò¢3b¢òÀ¢ò¢3r¢òÀ¢ò¢3‚¢òÀ¢ò¢3’¢òÀ¢ò¢3¢òÀ¢ò¢3¢òÀ¢ò¢3"¢òÀ¢ò¢32¢òÀ¢ò¢3B¢òÀ¢ò¢3R¢òÀ¢ò¢3b¢òÀ¢ò¢3r¢òÀ¢ò¢3‚¢òÀ¢ò¢3’¢òÀ¢ò¢3#¢òÀ¢ò¢3#¢òÀ¢ò¢3#"¢òÀ¢ò¢3#2¢òÀ¢ò¢3#B¢òÀ¢ò¢3#R¢òÀ¢ò¢3#b¢òÀ¢ò¢3#r¢òÀ¢ò¢3#‚¢òÀ¢ò¢3#’¢òÀ¢ò¢33¢òÀ¢ò¢33¢òÀ¢ò¢33"¢òÀ¢ò¢332¢òÀ¢ò¢33B¢òÀ¢ò¢33R¢òÀ¢ò¢33b¢òÀ¢ò¢33r¢òÀ¢ò¢33‚¢òÀ¢ò¢33’¢òÀ¢ò¢3C¢òÀ¢ò¢3C¢òÀ¢ò¢3C"¢òÀ¢ò¢3C2¢òÀ¢ò¢3CB¢òÀ¢ò¢3CR¢òÀ¢ò¢3Cb¢òÀ¢ò¢3Cr¢òÀ¢ò¢3C‚¢òÀ¢ò¢3C’¢òÀ¢ò¢3S¢òÀ¢ò¢3S¢òÀ¢ò¢3S"¢òÀ¢ò¢3S2¢òÀ¢ò¢3SB¢òÀ¢ò¢3SR¢òÀ¢ò¢3Sb¢òÀ¢ò¢3Sr¢òÀ¢ò¢3S‚¢òÀ¢ò¢3S’¢òÀ¢ò¢3c¢òÀ¢ò¢3c¢òÀ¢ò¢3c"¢òÀ¢ò¢3c2¢òÀ¢ò¢3cB¢òÀ¢ò¢3cR¢òÀ¢ò¢3cb¢òÀ¢ò¢3cr¢òÀ¢ò¢3c‚¢òÀ¢ò¢3c’¢òÀ¢ò¢3s¢òÀ¢ò¢3s¢òÀ¢ò¢3s"¢òÀ¢ò¢3s2¢òÀ¢ò¢3sB¢òÀ¢ò¢3sR¢òÀ¢ò¢3sb¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2Âõ÷vV'6µ÷&WV—&Uõò’° ¦ÖöGVÆRæW‡÷'G2Òõ÷vV'6µ÷&WV—&Uõòƒ3sr“°  ¢ò¢¢¢òÒ’À¢ò¢3sr¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2Âõ÷vV'6µ÷&WV—&Uõò’° ¢ò¢ ¢¢&ö÷BWfW'—F†–ærvRæVVBf÷"W"g&öçBVæ@¢¢vR&RW6–ærwVÇvV'6²Fò–æ6ÇVFR67&—G2&V6W6P¢¢—G27WW"6–×ÆP¢¢ð ¥õ÷vV'6µ÷&WV—&Uõòƒ##“° ¥õ÷vV'6µ÷&WV—&Uõòƒ3s‚“° ¥õ÷vV'6µ÷&WV—&Uõòƒ3s’“° ¥õ÷vV'6µ÷&WV—&Uõòƒ3ƒ“° ¥õ÷vV'6µ÷&WV—&Uõòƒ3ƒ"“° ¥õ÷vV'6µ÷&WV—&Uõòƒ3ƒ2“° ¥õ÷vV'6µ÷&WV—&Uõòƒ3ƒR“° ¥õ÷vV'6µ÷&WV—&Uõòƒ3ƒb“°  ¢ò¢¢¢òÒ’À¢ò¢3s‚¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¦¥VW'’†Fö7VÖVçB’ç&VG’†gVæ7F–öâ‚B’°¢ò÷6WBæ–ÖF–öâF–Ö–æp¢f"æ–ÖF–öäFVÆ’Ò#SÀ¢òöÆöF–ær&"VffV7@¢&$æ–ÖF–öäFVÆ’Ò3ƒÀ¢&%v—F–ærÒ&$æ–ÖF–öäFVÆ’Ò3Âòó3—2F†RGW&F–öâöbF†RG&ç6—F–öâöâF†RÆöF–ær&"Ò6WB–âF†R6772ö772f–ÆP¢òöÆWGFW'2VffV7@¢ÆWGFW'4FVÆ’ÒSÀ¢ò÷G—RVffV7@¢G—TÆWGFW'4FVÆ’ÒSÀ¢6VÆV7F–öäGW&F–öâÒSÀ¢G—Tæ–ÖF–öäFVÆ’Ò6VÆV7F–öäGW&F–öâ²ƒÀ¢òö6Æ—VffV7B ¢&WfVÄGW&F–öâÒcÀ¢&WfVÄæ–ÖF–öäFVÆ’ÒS° ¢–æ—D†VFÆ–æR‚“°  ¢gVæ7F–öâ–æ—D†VFÆ–æR‚’°¢òö–ç6W'BÆ“âVÆVÖVçBf÷"V6‚ÆWGFW"öb6†æv–ærv÷&@¢6–ævÆTÆWGFW'2‚B‚ræ6BÖ†VFÆ–æRæÆWGFW'2r’æf–æB‚v"r’“°¢òö–æ—F–Æ—6R†VFÆ–æRæ–ÖF–öà¢æ–ÖFT†VFÆ–æR‚B‚ræ6BÖ†VFÆ–æRr’“°¢Ð ¢gVæ7F–öâ6–ævÆTÆWGFW'2‚Gv÷&G2’°¢Gv÷&G2æV6‚†gVæ7F–öâ‚’°¢f"v÷&BÒB‡F†—2’À¢ÆWGFW'2Òv÷&BçFW‡B‚’ç7Æ—B‚rr’À¢6VÆV7FVBÒv÷&Bæ†46Æ72‚v—2×f—6–&ÆRr“°¢f÷"†’–âÆWGFW'2’°¢–b‡v÷&Bç&VçG2‚rç&÷FFRÓ"r’æÆVæwF‚â’ÆWGFW'5¶•ÒÒsÆVÓâr²ÆWGFW'5¶•Ò²sÂöVÓâs°¢ÆWGFW'5¶•ÒÒ‡6VÆV7FVB’òsÆ’6Æ73Ò&–â#âr²ÆWGFW'5¶•Ò²sÂö“âr¢sÆ“âr²ÆWGFW'5¶•Ò²sÂö“âs°¢Ð¢f"æWtÆWGFW'2ÒÆWGFW'2æ¦ö–â‚rr“°¢v÷&Bæ‡FÖÂ†æWtÆWGFW'2’æ772‚v÷6—G’rÂ“°¢Ò“°¢Ð ¢gVæ7F–öâæ–ÖFT†VFÆ–æR‚F†VFÆ–æW2’°¢f"GW&F–öâÒæ–ÖF–öäFVÆ“°¢F†VFÆ–æW2æV6‚†gVæ7F–öâ‚’°¢f"†VFÆ–æRÒB‡F†—2“° ¢–b††VFÆ–æRæ†46Æ72‚vÆöF–ærÖ&"r’’°¢GW&F–öâÒ&$æ–ÖF–öäFVÆ“°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢†VFÆ–æRæf–æB‚ræ6B×v÷&G2×w&W"r’æFD6Æ72‚v—2ÖÆöF–ærr¢ÒÂ&%v—F–ær“°¢ÒVÇ6R–b††VFÆ–æRæ†46Æ72‚v6Æ—r’’°¢f"7åw&W"Ò†VFÆ–æRæf–æB‚ræ6B×v÷&G2×w&W"r’À¢æWuv–GF‚Ò7åw&W"çv–GF‚‚’²°¢7åw&W"æ772‚wv–GF‚rÂæWuv–GF‚“°¢ÒVÇ6R–b‚†VFÆ–æRæ†46Æ72‚wG—Rr’’°¢òö76–vâFòæ6B×v÷&G2×w&W"F†Rv–GF‚öb—G2ÆöævW7Bv÷&@¢f"v÷&G2Ò†VFÆ–æRæf–æB‚ræ6B×v÷&G2×w&W""r’À¢v–GF‚Ò°¢v÷&G2æV6‚†gVæ7F–öâ‚’°¢f"v÷&Ev–GF‚ÒB‡F†—2’çv–GF‚‚“°¢–b‡v÷&Ev–GF‚âv–GF‚’v–GF‚Òv÷&Ev–GFƒ°¢Ò“°¢†VFÆ–æRæf–æB‚ræ6B×v÷&G2×w&W"r’æ772‚wv–GF‚rÂv–GF‚“°¢Ð¢ò÷G&–vvW"æ–ÖF–öà¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢†–FUv÷&B††VFÆ–æRæf–æB‚ræ—2×f—6–&ÆRr’æWƒ’¢ÒÂGW&F–öâ“°¢Ò“°¢Ð ¢gVæ7F–öâ†–FUv÷&B‚Gv÷&B’°¢f"æW‡Ev÷&BÒF¶TæW‡B‚Gv÷&B“° ¢–b‚Gv÷&Bç&VçG2‚ræ6BÖ†VFÆ–æRr’æ†46Æ72‚wG—Rr’’°¢f"&VçE7âÒGv÷&Bç&VçB‚ræ6B×v÷&G2×w&W"r“°¢&VçE7âæFD6Æ72‚w6VÆV7FVBr’ç&VÖ÷fT6Æ72‚wv—F–ærr“°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢&VçE7âç&VÖ÷fT6Æ72‚w6VÆV7FVBr“°¢Gv÷&Bç&VÖ÷fT6Æ72‚v—2×f—6–&ÆRr’æFD6Æ72‚v—2Ö†–FFVâr’æ6†–ÆG&Vâ‚v’r’ç&VÖ÷fT6Æ72‚v–âr’æFD6Æ72‚v÷WBr“°¢ÒÂ6VÆV7F–öäGW&F–öâ“°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢6†÷uv÷&B†æW‡Ev÷&BÂG—TÆWGFW'4FVÆ’¢ÒÂG—Tæ–ÖF–öäFVÆ’“° ¢ÒVÇ6R–b‚Gv÷&Bç&VçG2‚ræ6BÖ†VFÆ–æRr’æ†46Æ72‚vÆWGFW'2r’’°¢f"&ööÂÒ‚Gv÷&Bæ6†–ÆG&Vâ‚v’r’æÆVæwF‚ãÒæW‡Ev÷&Bæ6†–ÆG&Vâ‚v’r’æÆVæwF‚’òG'VR¢fÇ6S°¢†–FTÆWGFW"‚Gv÷&Bæf–æB‚v’r’æWƒ’ÂGv÷&BÂ&ööÂÂÆWGFW'4FVÆ’“°¢6†÷tÆWGFW"†æW‡Ev÷&Bæf–æB‚v’r’æWƒ’ÂæW‡Ev÷&BÂ&ööÂÂÆWGFW'4FVÆ’“° ¢ÒVÇ6R–b‚Gv÷&Bç&VçG2‚ræ6BÖ†VFÆ–æRr’æ†46Æ72‚v6Æ—r’’°¢Gv÷&Bç&VçG2‚ræ6B×v÷&G2×w&W"r’ææ–ÖFR‡·v–GFƒ¢s'‚wÒÂ&WfVÄGW&F–öâÂgVæ7F–öâ‚’°¢7v—F6…v÷&B‚Gv÷&BÂæW‡Ev÷&B“°¢6†÷uv÷&B†æW‡Ev÷&B“°¢Ò“° ¢ÒVÇ6R–b‚Gv÷&Bç&VçG2‚ræ6BÖ†VFÆ–æRr’æ†46Æ72‚vÆöF–ærÖ&"r’’°¢Gv÷&Bç&VçG2‚ræ6B×v÷&G2×w&W"r’ç&VÖ÷fT6Æ72‚v—2ÖÆöF–ærr“°¢7v—F6…v÷&B‚Gv÷&BÂæW‡Ev÷&B“°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢†–FUv÷&B†æW‡Ev÷&B¢ÒÂ&$æ–ÖF–öäFVÆ’“°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢Gv÷&Bç&VçG2‚ræ6B×v÷&G2×w&W"r’æFD6Æ72‚v—2ÖÆöF–ærr¢ÒÂ&%v—F–ær“° ¢ÒVÇ6R°¢7v—F6…v÷&B‚Gv÷&BÂæW‡Ev÷&B“°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢†–FUv÷&B†æW‡Ev÷&B¢ÒÂæ–ÖF–öäFVÆ’“°¢Ð¢Ð ¢gVæ7F–öâ6†÷uv÷&B‚Gv÷&BÂFGW&F–öâ’°¢–b‚Gv÷&Bç&VçG2‚ræ6BÖ†VFÆ–æRr’æ†46Æ72‚wG—Rr’’°¢6†÷tÆWGFW"‚Gv÷&Bæf–æB‚v’r’æWƒ’ÂGv÷&BÂfÇ6RÂFGW&F–öâ“°¢Gv÷&BæFD6Æ72‚v—2×f—6–&ÆRr’ç&VÖ÷fT6Æ72‚v—2Ö†–FFVâr“° ¢ÒVÇ6R–b‚Gv÷&Bç&VçG2‚ræ6BÖ†VFÆ–æRr’æ†46Æ72‚v6Æ—r’’°¢Gv÷&Bç&VçG2‚ræ6B×v÷&G2×w&W"r’ææ–ÖFR‡²wv–GF‚s¢Gv÷&Bçv–GF‚‚’²ÒÂ&WfVÄGW&F–öâÂgVæ7F–öâ‚’°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢†–FUv÷&B‚Gv÷&B¢ÒÂ&WfVÄæ–ÖF–öäFVÆ’“°¢Ò“°¢Ð¢Ð ¢gVæ7F–öâ†–FTÆWGFW"‚FÆWGFW"ÂGv÷&BÂF&ööÂÂFGW&F–öâ’°¢FÆWGFW"ç&VÖ÷fT6Æ72‚v–âr’æFD6Æ72‚v÷WBr“° ¢–b‚FÆWGFW"æ—2‚s¦Æ7BÖ6†–ÆBr’’°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢†–FTÆWGFW"‚FÆWGFW"ææW‡B‚’ÂGv÷&BÂF&ööÂÂFGW&F–öâ“°¢ÒÂFGW&F–öâ“°¢ÒVÇ6R–b‚F&ööÂ’°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢†–FUv÷&B‡F¶TæW‡B‚Gv÷&B’¢ÒÂæ–ÖF–öäFVÆ’“°¢Ð ¢–b‚FÆWGFW"æ—2‚s¦Æ7BÖ6†–ÆBr’bbB‚v‡FÖÂr’æ†46Æ72‚væòÖ777G&ç6—F–öç2r’’°¢f"æW‡Ev÷&BÒF¶TæW‡B‚Gv÷&B“°¢7v—F6…v÷&B‚Gv÷&BÂæW‡Ev÷&B“°¢Ð¢Ð ¢gVæ7F–öâ6†÷tÆWGFW"‚FÆWGFW"ÂGv÷&BÂF&ööÂÂFGW&F–öâ’°¢FÆWGFW"æFD6Æ72‚v–âr’ç&VÖ÷fT6Æ72‚v÷WBr“° ¢–b‚FÆWGFW"æ—2‚s¦Æ7BÖ6†–ÆBr’’°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢6†÷tÆWGFW"‚FÆWGFW"ææW‡B‚’ÂGv÷&BÂF&ööÂÂFGW&F–öâ“°¢ÒÂFGW&F–öâ“°¢ÒVÇ6R°¢–b‚Gv÷&Bç&VçG2‚ræ6BÖ†VFÆ–æRr’æ†46Æ72‚wG—Rr’’°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢Gv÷&Bç&VçG2‚ræ6B×v÷&G2×w&W"r’æFD6Æ72‚wv—F–ærr“°¢ÒÂ#“°¢Ð¢–b‚F&ööÂ’°¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢†–FUv÷&B‚Gv÷&B¢ÒÂæ–ÖF–öäFVÆ’¢Ð¢Ð¢Ð ¢gVæ7F–öâF¶TæW‡B‚Gv÷&B’°¢&WGW&â‚Gv÷&Bæ—2‚s¦Æ7BÖ6†–ÆBr’’òGv÷&BææW‡B‚’¢Gv÷&Bç&VçB‚’æ6†–ÆG&Vâ‚’æWƒ“°¢Ð ¢gVæ7F–öâF¶U&Wb‚Gv÷&B’°¢&WGW&â‚Gv÷&Bæ—2‚s¦f—'7BÖ6†–ÆBr’’òGv÷&Bç&Wb‚’¢Gv÷&Bç&VçB‚’æ6†–ÆG&Vâ‚’æÆ7B‚“°¢Ð ¢gVæ7F–öâ7v—F6…v÷&B‚FöÆEv÷&BÂFæWuv÷&B’°¢FöÆEv÷&Bç&VÖ÷fT6Æ72‚v—2×f—6–&ÆRr’æFD6Æ72‚v—2Ö†–FFVâr“°¢FæWuv÷&Bç&VÖ÷fT6Æ72‚v—2Ö†–FFVâr’æFD6Æ72‚v—2×f—6–&ÆRr“°¢Ð§Ò“° ¢ò¢¢¢òÒ’À¢ò¢3s’¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2Âõ÷vV'6µ÷&WV—&Uõò’° ¥õ÷vV'6µ÷&WV—&Uõòƒ3ƒ“° ¦¥VW'’†gVæ7F–öâ‚B’°¢'W6R7G&–7B#°¢f"‡e÷wrÒB‡v–æF÷r’çv–GF‚‚’À¢‡e÷6Æ–FW6†÷rÒG'VS°¢ÖVçT–æ—B‚“° ¢òò6†V6²–b6÷VçFW"–âf–Ww÷'@¢B‡v–æF÷r’æöâ‚vÆöB&W6—¦RrÂgVæ7F–öâ‚’°¢ÖVçT–æ—B‚“°¢Ò“° ¢gVæ7F–öâÖVçT–æ—B‚’°¢‡e÷wrÒB‡v–æF÷r’çv–GF‚‚“°¢–b‚B‚rææbÖöff6çf2r’æÆVæwF‚’°¢B‚rçW"Öæb×FövvÆRr’ç&VÖ÷fT6Æ72‚vFÂ×G&–vvW"r“°¢Ð ¢–b‚‚B‚rææbÖöff6çf2r’æÆVæwF‚bb‡e÷wrÃÒ3’ÇÂB‚rææbÖöff6çf2ÖFW6·F÷r’æÆVæwF‚’° ¢–b‚B‚rææbÖöff6çf2r’æFF‚w6–FV&"Ö6öÆÆ6Rr’’°¢B‚v&öG’r’æFD6Æ72‚w6–FV&"Ö6öÆÆ6Rr“°¢Ð¢ ¢B‚ræFÂÖÖVçRr’æFD6Æ72‚&FÂÖÖVçV÷Vâ"“°¢B‚rçW"Öæb×FövvÆRr’ç&VÖ÷fT6Æ72‚vFÂ×G&–vvW"r“°¢B‚rææbÖöff6çf2çW%öÖVçRr’æFD6Æ72‚vÖ–â×6–FV&"6†F÷sf—†VBöff6çf2r“°¢ÒVÇ6R°¢B‚rææbÖöff6çf2çW%öÖVçRr’ç&VÖ÷fT6Æ72‚vÖ–â×6–FV&"6†F÷sf—†VBöff6çf2r“°¢Ð  ¢–b‡‡e÷wrÃÒ3ÇÂB‚ræÖ–æ’Öæbr’æÆVæwF‚’°¢B‚rç&W7öç6—fRÖÖVçRr’ç&VÖ÷fT6Æ72‚w‡bÖÖVçWw&W"r’æFD6Æ72‚vFÂÖÖVçWw&W"r“°¢B‚rçW6W"ÖfF"r’ç&VÖ÷fT6Æ72‚wVÆÂ×&–v‡Br“°¢B‚ræÆr×7V&ÖVçRr’æFD6Æ72‚&FÂ×7V&ÖVçR"“°¢ÒVÇ6R°¢B‚rç&W7öç6—fRÖÖVçRr’ç&VÖ÷fT6Æ72‚vFÂÖÖVçWw&W"r’æFD6Æ72‚w‡bÖÖVçWw&W"r“°¢B‚ræÆr×7V&ÖVçRr’ç&VÖ÷fT6Æ72‚&FÂ×7V&ÖVçR"“°¢B‚rçW6W"ÖfF"r’æFD6Æ72‚wVÆÂ×&–v‡Br“°¢Ð¢Ð¢B‚r6FÂÖÖVçRr’æFÆÖVçR‡°¢æ–ÖF–öä6Æ76W3¢°¢6Æ76–ã¢vFÂÖæ–ÖFRÖ–âÓ"rÀ¢6Æ76÷WC¢vFÂÖæ–ÖFRÖ÷WBÓ"p¢Ð¢Ò“°§Ò“° ¢ò¢¢¢òÒ’À¢ò¢3ƒ¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¢ò¢ ¢¢§VW'’æFÆÖVçRæ§2cãã¢¢‡GG¢ò÷wwræ6öG&÷2æ6öÐ¢¢ð£²†gVæ7F–öâ‚BÂv–æF÷rÂVæFVf–æVB’° ¢wW6R7G&–7Bs° ¢òòvÆö&À¢f"ÖöFW&æ—§"Òv–æF÷räÖöFW&æ—§"ÂF&öG’ÒB‚v&öG’r“° ¢BäDÄÖVçRÒgVæ7F–öâ†÷F–öç2ÂVÆVÖVçB’°¢F†—2âFVÂÒB†VÆVÖVçB“°¢F†—2åö–æ—B†÷F–öç2“°¢Ó° ¢òòF†R÷F–öç0¢BäDÄÖVçRæFVfVÇG2Ò°¢òò6Æ76W2f÷"F†Ræ–ÖF–öâVffV7G0¢æ–ÖF–öä6Æ76W3¢¶6Æ76–ã¢vFÂÖæ–ÖFRÖ–âÓrÂ6Æ76÷WC¢vFÂÖæ–ÖFRÖ÷WBÓwÒÀ¢òò6ÆÆ&6³¢6Æ–6²Æ–æ²F†B†27V"ÖVçP¢òòVÂ—2F†RÆ–æ²VÆVÖVçB†Æ’“²æÖR—2F†RÆWfVÂæÖP¢öäÆWfVÄ6Æ–6³¢gVæ7F–öâ†VÂÂæÖR’°¢&WGW&âfÇ6S°¢ÒÀ¢òò6ÆÆ&6³¢6Æ–6²Æ–æ²F†BFöW2æ÷B†fR7V"ÖVçP¢òòVÂ—2F†RÆ–æ²VÆVÖVçB†Æ’“²Wb—2F†RWfVçBö& ¢öäÆ–æ´6Æ–6³¢gVæ7F–öâ†VÂÂWb’°¢&WGW&âfÇ6S°¢Ð¢Ó° ¢BäDÄÖVçRç&÷F÷G—RÒ°¢ö–æ—C¢gVæ7F–öâ†÷F–öç2’° ¢òò÷F–öç0¢F†—2æ÷F–öç2ÒBæW‡FVæB‡G'VRÂ·ÒÂBäDÄÖVçRæFVfVÇG2Â÷F–öç2“°¢òò66†R6öÖRVÆVÖVçG2æB–æ—F–Æ—¦R6öÖRf&–&ÆW0¢F†—2åö6öæf–r‚“° ¢f"æ–ÔVæDWfVçDæÖW2Ò°¢uvV&¶—Dæ–ÖF–öâs¢wvV&¶—Dæ–ÖF–öäVæBrÀ¢tôæ–ÖF–öâs¢vôæ–ÖF–öäVæBrÀ¢v×4æ–ÖF–öâs¢tÕ4æ–ÖF–öäVæBrÀ¢væ–ÖF–öâs¢væ–ÖF–öæVæBp¢ÒÀ¢G&ç4VæDWfVçDæÖW2Ò°¢uvV&¶—EG&ç6—F–öâs¢wvV&¶—EG&ç6—F–öäVæBrÀ¢tÖ÷¥G&ç6—F–öâs¢wG&ç6—F–öæVæBrÀ¢tõG&ç6—F–öâs¢võG&ç6—F–öäVæBrÀ¢v×5G&ç6—F–öâs¢tÕ5G&ç6—F–öäVæBrÀ¢wG&ç6—F–öâs¢wG&ç6—F–öæVæBp¢Ó°¢òòæ–ÖF–öâVæBWfVçBæÖP¢F†—2ææ–ÔVæDWfVçDæÖRÒæ–ÔVæDWfVçDæÖW5´ÖöFW&æ—§"ç&Vf—†VB‚væ–ÖF–öâr•Ò²ræFÆÖVçRs°¢òòG&ç6—F–öâVæBWfVçBæÖP¢F†—2çG&ç4VæDWfVçDæÖRÒG&ç4VæDWfVçDæÖW5´ÖöFW&æ—§"ç&Vf—†VB‚wG&ç6—F–öâr•Ò²ræFÆÖVçRrÀ¢òò7W÷'Bf÷"772æ–ÖF–öç2æB772G&ç6—F–öç0¢F†—2ç7W÷'Dæ–ÖF–öç2ÒÖöFW&æ—§"æ776æ–ÖF–öç2À¢F†—2ç7W÷'EG&ç6—F–öç2ÒÖöFW&æ—§"æ777G&ç6—F–öç3° ¢F†—2åö–æ—DWfVçG2‚“° ¢ÒÀ¢ö6öæf–s¢gVæ7F–öâ‚’°¢F†—2æ÷VâÒfÇ6S°¢F†—2âGG&–vvW"ÒB‚ræFÂ×G&–vvW"r“°¢F†—2âFÖVçRÒF†—2âFVÂæ6†–ÆG&Vâ‚wVÂæFÂÖÖVçRr“°¢F†—2âFÖVçV—FV×2ÒF†—2âFÖVçRæf–æB‚vÆ“¦æ÷B‚æFÂÖ&6²’r“°¢F†—2âFVÂæf–æB‚wVÂæFÂ×7V&ÖVçRÇVÂæÆr×7V&ÖVçRr’ç&WVæB‚sÆÆ’6Æ73Ò&FÂÖ&6²#ãÆ‡&VcÒ"2#æ&6³ÂöãÂöÆ“âr“°¢F†—2âF&6²ÒF†—2âFÖVçRæf–æB‚vÆ’æFÂÖ&6²r“°¢ÒÀ¢ö–æ—DWfVçG3¢gVæ7F–öâ‚’° ¢f"6VÆbÒF†—3° ¢F†—2âGG&–vvW"æöâ‚v6Æ–6²æFÆÖVçRrÂgVæ7F–öâ‚’° ¢–b‡6VÆbæ÷Vâ’°¢6VÆbåö6Æ÷6TÖVçR‚“°¢Ð¢VÇ6R°¢6VÆbåö÷VäÖVçR‚“°¢Ð¢&WGW&âfÇ6S° ¢Ò“° ¢F†—2âFÖVçV—FV×2æöâ‚v6Æ–6²æFÆÖVçRrÂgVæ7F–öâ†WfVçB’° ¢–b‚B‡F†—2’æf–æB‚vr’ç6Æ–6RƒÂ’æFF‚wFövvÆRr’’° ¢WfVçBç7F÷&÷vF–öâ‚“°¢Ð ¢f"F—FVÒÒB‡F†—2’À¢G7V&ÖVçRÒF—FVÒæ6†–ÆG&Vâ‚wVÂæFÂ×7V&ÖVçRr“° ¢–b‚G7V&ÖVçRæÆVæwF‚â’° ¢f"FfÇ––âÒG7V&ÖVçRæ6ÆöæR‚’æ772‚v÷6—G’rÂ’æ–ç6W'DgFW"‡6VÆbâFÖVçR’À¢öäæ–ÖF–öäVæDfâÒgVæ7F–öâ‚’°¢6VÆbâFÖVçRæöfb‡6VÆbææ–ÔVæDWfVçDæÖR’ç&VÖ÷fT6Æ72‡6VÆbæ÷F–öç2ææ–ÖF–öä6Æ76W2æ6Æ76÷WB’æFD6Æ72‚vFÂ×7V'f–Wrr“°¢F—FVÒæFD6Æ72‚vFÂ×7V'f–Wv÷Vâr’ç&VçG2‚ræFÂ×7V'f–Wv÷Vã¦f—'7Br’ç&VÖ÷fT6Æ72‚vFÂ×7V'f–Wv÷Vâr’æFD6Æ72‚vFÂ×7V'f–Wrr“°¢FfÇ––âç&VÖ÷fR‚“°¢Ó° ¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢FfÇ––âæFD6Æ72‡6VÆbæ÷F–öç2ææ–ÖF–öä6Æ76W2æ6Æ76–â“°¢6VÆbâFÖVçRæFD6Æ72‡6VÆbæ÷F–öç2ææ–ÖF–öä6Æ76W2æ6Æ76÷WB“°¢–b‡6VÆbç7W÷'Dæ–ÖF–öç2’°¢6VÆbâFÖVçRæöâ‡6VÆbææ–ÔVæDWfVçDæÖRÂöäæ–ÖF–öäVæDfâ“°¢Ð¢VÇ6R°¢öäæ–ÖF–öäVæDfâæ6ÆÂ‚“°¢Ð ¢6VÆbæ÷F–öç2æöäÆWfVÄ6Æ–6²‚F—FVÒÂF—FVÒæ6†–ÆG&Vâ‚v¦f—'7Br’çFW‡B‚’“°¢Ò“° ¢&WGW&âfÇ6S° ¢Ð¢VÇ6R°¢6VÆbæ÷F–öç2æöäÆ–æ´6Æ–6²‚F—FVÒÂWfVçB“°¢Ð ¢Ò“° ¢F†—2âF&6²æöâ‚v6Æ–6²æFÆÖVçRrÂgVæ7F–öâ†WfVçB’° ¢f"GF†—2ÒB‡F†—2’À¢G7V&ÖVçRÒGF†—2ç&VçG2‚wVÂæFÂ×7V&ÖVçS¦f—'7Br’À¢F—FVÒÒG7V&ÖVçRç&VçB‚’À ¢FfÇ––âÒG7V&ÖVçRæ6ÆöæR‚’æ–ç6W'DgFW"‡6VÆbâFÖVçR“° ¢f"öäæ–ÖF–öäVæDfâÒgVæ7F–öâ‚’°¢6VÆbâFÖVçRæöfb‡6VÆbææ–ÔVæDWfVçDæÖR’ç&VÖ÷fT6Æ72‡6VÆbæ÷F–öç2ææ–ÖF–öä6Æ76W2æ6Æ76–â“°¢FfÇ––âç&VÖ÷fR‚“°¢Ó° ¢6WEF–ÖV÷WB†gVæ7F–öâ‚’°¢FfÇ––âæFD6Æ72‡6VÆbæ÷F–öç2ææ–ÖF–öä6Æ76W2æ6Æ76÷WB“°¢6VÆbâFÖVçRæFD6Æ72‡6VÆbæ÷F–öç2ææ–ÖF–öä6Æ76W2æ6Æ76–â“°¢–b‡6VÆbç7W÷'Dæ–ÖF–öç2’°¢6VÆbâFÖVçRæöâ‡6VÆbææ–ÔVæDWfVçDæÖRÂöäæ–ÖF–öäVæDfâ“°¢Ð¢VÇ6R°¢öäæ–ÖF–öäVæDfâæ6ÆÂ‚“°¢Ð ¢F—FVÒç&VÖ÷fT6Æ72‚vFÂ×7V'f–Wv÷Vâr“° ¢f"G7V'f–WrÒGF†—2ç&VçG2‚ræFÂ×7V'f–Ws¦f—'7Br“°¢–b‚G7V'f–Wræ—2‚vÆ’r’’°¢G7V'f–WræFD6Æ72‚vFÂ×7V'f–Wv÷Vâr“°¢Ð¢G7V'f–Wrç&VÖ÷fT6Æ72‚vFÂ×7V'f–Wrr“°¢Ò“° ¢&WGW&âfÇ6S° ¢Ò“° ¢ÒÀ¢6Æ÷6TÖVçS¢gVæ7F–öâ‚’°¢–b‡F†—2æ÷Vâ’°¢F†—2åö6Æ÷6TÖVçR‚“° ¢Ð¢ÒÀ¢ö6Æ÷6TÖVçS¢gVæ7F–öâ‚’°¢f"6VÆbÒF†—2À¢öåG&ç6—F–öäVæDfâÒgVæ7F–öâ‚’°¢6VÆbâFÖVçRæöfb‡6VÆbçG&ç4VæDWfVçDæÖR“°¢6VÆbå÷&W6WDÖVçR‚“°¢Ó° ¢F†—2âFÖVçRç&VÖ÷fT6Æ72‚vFÂÖÖVçV÷Vâr“°¢F†—2âFÖVçRæFD6Æ72‚vFÂÖÖVçR×FövvÆRr“°¢F†—2âGG&–vvW"ç&VÖ÷fT6Æ72‚vFÂÖ7F—fRr“° ¢–b‡F†—2ç7W÷'EG&ç6—F–öç2’°¢F†—2âFÖVçRæöâ‡F†—2çG&ç4VæDWfVçDæÖRÂöåG&ç6—F–öäVæDfâ“°¢Ð¢VÇ6R°¢öåG&ç6—F–öäVæDfâæ6ÆÂ‚“°¢Ð ¢F†—2æ÷VâÒfÇ6S°¢ÒÀ¢÷VäÖVçS¢gVæ7F–öâ‚’°¢–b‚F†—2æ÷Vâ’°¢F†—2åö÷VäÖVçR‚“°¢Ð¢ÒÀ¢ö÷VäÖVçS¢gVæ7F–öâ‚’°¢f"6VÆbÒF†—3°¢òò6Æ–6¶–ær6öÖWv†W&RVÇ6RÖ¶W2F†RÖVçR6Æ÷6P¢F&öG’æöfb‚v6Æ–6²r’æöâ‚v6Æ–6²æFÆÖVçRrÂgVæ7F–öâ‚’°¢6VÆbåö6Æ÷6TÖVçR‚“°¢Ò“°¢F†—2âFÖVçRæFD6Æ72‚vFÂÖÖVçV÷VâFÂÖÖVçR×FövvÆRr’æöâ‡F†—2çG&ç4VæDWfVçDæÖRÂgVæ7F–öâ‚’°¢B‡F†—2’ç&VÖ÷fT6Æ72‚vFÂÖÖVçR×FövvÆRr“°¢Ò“°¢F†—2âGG&–vvW"æFD6Æ72‚vFÂÖ7F—fRr“°¢F†—2æ÷VâÒG'VS°¢ÒÀ¢òò&W6WG2F†RÖVçRFò—G2÷&–v–æÂ7FFR†f—'7BÆWfVÂöb÷F–öç2¢÷&W6WDÖVçS¢gVæ7F–öâ‚’°¢F†—2âFÖVçRç&VÖ÷fT6Æ72‚vFÂ×7V'f–Wrr“°¢F†—2âFÖVçV—FV×2ç&VÖ÷fT6Æ72‚vFÂ×7V'f–WrFÂ×7V'f–Wv÷Vâr“°¢Ð¢Ó° ¢f"ÆötW'&÷"ÒgVæ7F–öâ†ÖW76vR’°¢–b‡v–æF÷ræ6öç6öÆR’°¢v–æF÷ræ6öç6öÆRæW'&÷"†ÖW76vR“°¢Ð¢Ó° ¢BæfâæFÆÖVçRÒgVæ7F–öâ†÷F–öç2’°¢–b‡G—Vöb÷F–öç2ÓÓÒw7G&–ærr’°¢f"&w2Ò'&’ç&÷F÷G—Rç6Æ–6Ræ6ÆÂ†&wVÖVçG2Â“°¢F†—2æV6‚†gVæ7F–öâ‚’°¢f"–ç7Fæ6RÒBæFF‡F†—2ÂvFÆÖVçRr“°¢–b‚–ç7Fæ6R’°¢ÆötW'&÷"‚&6ææ÷B6ÆÂÖWF†öG2öâFÆÖVçR&–÷"Fò–æ—F–Æ—¦F–öã²"°¢&GFV×FVBFò6ÆÂÖWF†öBr"²÷F–öç2²"r"“°¢&WGW&ã°¢Ð¢–b‚Bæ—4gVæ7F–öâ†–ç7Fæ6U¶÷F–öç5Ò’ÇÂ÷F–öç2æ6†$Bƒ’ÓÓÒ%ò"’°¢ÆötW'&÷"‚&æò7V6‚ÖWF†öBr"²÷F–öç2²"rf÷"FÆÖVçR–ç7Fæ6R"“°¢&WGW&ã°¢Ð¢–ç7Fæ6U¶÷F–öç5ÒæÇ’†–ç7Fæ6RÂ&w2“°¢Ò“°¢Ð¢VÇ6R°¢F†—2æV6‚†gVæ7F–öâ‚’°¢f"–ç7Fæ6RÒBæFF‡F†—2ÂvFÆÖVçRr“°¢–b†–ç7Fæ6R’°¢–ç7Fæ6Råö–æ—B‚“°¢Ð¢VÇ6R°¢–ç7Fæ6RÒBæFF‡F†—2ÂvFÆÖVçRrÂæWrBäDÄÖVçR†÷F–öç2ÂF†—2’“°¢Ð¢Ò“°¢Ð¢&WGW&âF†—3°¢Ó° §Ò’†¥VW'’Âv–æF÷r“° ¢ò¢¢¢òÒ’À¢ò¢3ƒ¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¦¥VW'’†gVæ7F–öâ‚B’°¢'W6R7G&–7B#°¢ò£ÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÐ¢†W&ò6V7F–öà¢ÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÒ¢ð¢–b‚B‚w6V7F–öâæ†W&òÖ†VFW"r’æÆVæwF‚â’°¢f"FÖ–ææbÒB‚ræÖ–ææbr’æ†V–v‡B‚“°¢B‚w6V7F–öâæ†W&òÖ†VFW"r’æ†V–v‡B‚B‡v–æF÷r’æ†V–v‡B‚’“°¢òòv–æF÷r&W6—¦P¢B‡v–æF÷r’ç&W6—¦R†gVæ7F–öâ‚’°¢B‚w6V7F–öâæ†W&òÖ†VFW"r’æ†V–v‡B‚B‡v–æF÷r’æ†V–v‡B‚’“°¢Ò“°¢Ð¢ò£ÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÐ¢7WB6V7F–öà¢ÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÒ¢ð¢–b‚B‚ræ7WBr’æÆVæwF‚â’°¢B‚ræ7WBr’æV6‚†gVæ7F–öâ‚’°¢–b‚B‡F†—2’æ†46Æ72‚v7WB×F÷r’¢B‡F†—2’æ772‚v&÷&FW"×&–v‡B×v–GF‚rÂB‡F†—2’ç&VçB‚’çv–GF‚‚’²'‚"“°¢VÇ6R–b‚B‡F†—2’æ†46Æ72‚v7WBÖ&÷GFöÒr’¢B‡F†—2’æ772‚v&÷&FW"ÖÆVgB×v–GF‚rÂB‡F†—2’ç&VçB‚’çv–GF‚‚’²'‚"“°¢Ò“° ¢Ð§Ò“° ¢ò¢¢¢òÒ’À¢ò¢3ƒ"¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¦¥VW'’†gVæ7F–öâ‚B’°¢'W6R7G&–7B#°¢f"G—RÀ¢s62À¢7F'BÀ¢vV&¶—BÀ¢÷6—G’À¢&ææW%ö÷fW&Æ’Òræ÷fW&Æ’rÀ¢6öÆ÷%÷7F'BÀ¢6öÆ÷%öVæBÀ¢÷&–VçFF–öã°  ¢f"÷fW&Æ’ÒB†&ææW%ö÷fW&Æ’“° ¢÷fW&Æ’æV6‚†gVæ7F–öâ‚’°¢f"GF†—2ÒB‡F†—2’À¢6öÆ÷%÷7F'BÒGF†—2æFF‚w7F'Br’À¢6öÆ÷%öVæBÒGF†—2æFF‚vVæBr’À¢÷&–VçFF–öâÒGF†—2æFF‚v÷&–VçFF–öâr’À¢÷6—G’ÒGF†—2æFF‚v÷6—G’r“° ¢Ç•öw&F–VçB‚GF†—2Â6öÆ÷%÷7F'BÂ6öÆ÷%öVæBÂ÷&–VçFF–öâÂ÷6—G’“° ¢Ò“°  ¢gVæ7F–öâÇ•öw&F–VçB†VÆRÂ6öÆ÷%÷7F'BÂ6öÆ÷%öVæBÂ÷&–VçFF–öâÂ÷6—G’’° ¢7v—F6‚†÷&–VçFF–öâ’°¢66RwFö&÷GFö×&–v‡Bs ¢G—RÒ&Æ–æV"#°¢s62Ò'Fò&÷GFöÒ&–v‡B#°¢7F'BÒ'F÷ÆVgB#°¢vV&¶—BÒ&ÆVgBF÷Â&–v‡B&÷GFöÒ#°¢'&V³°¢66RwFö&÷GFöÒr ¢G—RÒ&Æ–æV"#°¢s62Ò'Fò&÷GFöÒ#°¢7F'BÒ'F÷#°¢vV&¶—BÒ&ÆVgBF÷ÂÆVgB&÷GFöÒ#°¢'&V³°¢66RwFö&÷GFöÖÆVgBr ¢G—RÒ&Æ–æV"#°¢s62Ò'Fò&÷GFöÒÆVgB#°¢7F'BÒ'F÷&–v‡B#°¢vV&¶—BÒ'&–v‡BF÷ÂÆVgB&÷GFöÒ#°¢'&V³°¢66RwF÷&–v‡Br ¢G—RÒ&Æ–æV"#°¢s62Ò'Fò&–v‡B#°¢7F'BÒ&ÆVgB#°¢vV&¶—BÒ&ÆVgBF÷Â&–v‡BF÷#°¢'&V³°¢66RwFöÆVgBr ¢G—RÒ&Æ–æV"#°¢s62Ò'FòÆVgB#°¢7F'BÒ'&–v‡B#°¢vV&¶—BÒ'&–v‡BF÷ÂÆVgBF÷#°¢'&V³°¢66RwF÷F÷&–v‡Br ¢G—RÒ&Æ–æV"#°¢s62Ò'FòF÷&–v‡B#°¢7F'BÒ&&÷GFöÒÆVgB#°¢vV&¶—BÒ&ÆVgB&÷GFöÒÂ&–v‡BF÷#°¢'&V³°¢66RwF÷F÷r ¢G—RÒ&Æ–æV"#°¢s62Ò'FòF÷#°¢7F'BÒ&&÷GFöÒ#°¢vV&¶—BÒ&ÆVgB&÷GFöÒÂÆVgBF÷#°¢'&V³°¢66RwF÷F÷ÆVgBr ¢G—RÒ&Æ–æV"#°¢s62Ò'FòF÷ÆVgB#°¢7F'BÒ&&÷GFöÒ&–v‡B#°¢vV&¶—BÒ'&–v‡B&÷GFöÒÂÆVgBF÷#°¢'&V³°¢66Rv6—&7VÆ'F÷ÆVgBr ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRBÆVgBF÷#°¢7F'BÒ&ÆVgBF÷Â6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ&ÆVgBF÷ÂÂÆVgBF÷Â“s2#°¢'&V³°¢66Rv6—&7VÆ'F÷6VçFW"r ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRB6VçFW"F÷#°¢7F'BÒ&6VçFW"F÷Â6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ&6VçFW"F÷ÂÂ6VçFW"F÷ÂCƒr#°¢'&V³°¢66Rv6—&7VÆ'F÷&–v‡Br ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRB&–v‡BF÷#°¢7F'BÒ'&–v‡BF÷Â6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ'&–v‡BF÷ÂÂ&–v‡BF÷Â“s2#°¢'&V³°¢66Rv6—&7VÆ&Ö–FFÆVÆVgBr ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRBÆVgB6VçFW"#°¢7F'BÒ&ÆVgB6VçFW"Â6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ&ÆVgB6VçFW"ÂÂÆVgB6VçFW"Â“s2#°¢'&V³°¢66Rv6—&7VÆ&Ö–FFÆV6VçFW"r ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRB6VçFW"#°¢7F'BÒ&6VçFW"Â6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ&6VçFW"6VçFW"ÂÂ6VçFW"6VçFW"ÂCƒr#°¢'&V³°¢66Rv6—&7VÆ&Ö–FFÆW&–v‡Br ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRB&–v‡B6VçFW"#°¢7F'BÒ'&–v‡B6VçFW"Â6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ'&–v‡B6VçFW"ÂÂ&–v‡B6VçFW"#°¢'&V³°¢66Rv6—&7VÆ&&÷GFöÖÆVgBr ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRBÆVgB&÷GFöÒ#°¢7F'BÒ&ÆVgB&÷GFöÒÂ6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ&ÆVgB&÷GFöÒÂÂÆVgB&÷GFöÒÂ“s2#°¢'&V³°¢66Rv6—&7VÆ&&÷GFöÖ6VçFW"r ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRB6VçFW"&÷GFöÒ#°¢7F'BÒ&6VçFW"&÷GFöÒÂ6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ&6VçFW"&÷GFöÒÂÂ6VçFW"&÷GFöÒÂCƒr#°¢'&V³°¢66Rv6—&7VÆ&&÷GFö×&–v‡Br ¢G—RÒ'&F–Â#°¢s62Ò&6—&6ÆRf'F†W7B×6–FRB&–v‡B&÷GFöÒ#°¢7F'BÒ'&–v‡B&÷GFöÒÂ6—&6ÆRf'F†W7B×6–FR#°¢vV&¶—BÒ'&–v‡B&÷GFöÒÂÂ&–v‡B&÷GFöÒÂ“s2#°¢'&V³°¢66RvVÆÆ—6WF÷ÆVgBr ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRBÆVgBF÷#°¢7F'BÒ&ÆVgBF÷ÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ&ÆVgBF÷ÂÂÆVgBF÷Â“s2#°¢'&V³°¢66RvVÆÆ—6WF÷6VçFW"r ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRB6VçFW"F÷#°¢7F'BÒ&6VçFW"F÷ÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ&6VçFW"F÷ÂÂ6VçFW"F÷ÂCƒr#°¢'&V³°¢66RvVÆÆ—6WF÷&–v‡Br ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRB&–v‡BF÷#°¢7F'BÒ'&–v‡BF÷ÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ'&–v‡BF÷ÂÂ&–v‡BF÷Â“s2#°¢'&V³°¢66RvVÆÆ—6VÖ–FFÆVÆVgBr ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRBÆVgB6VçFW"#°¢7F'BÒ&ÆVgB6VçFW"ÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ&ÆVgB6VçFW"ÂÂÆVgB6VçFW"Â“s2#°¢'&V³°¢66RvVÆÆ—6VÖ–FFÆV6VçFW"r ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRB6VçFW"#°¢7F'BÒ&6VçFW"ÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ&6VçFW"6VçFW"ÂÂ6VçFW"6VçFW"ÂCƒr#°¢'&V³°¢66RvVÆÆ—6VÖ–FFÆW&–v‡Br ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRB&–v‡B6VçFW"#°¢7F'BÒ'&–v‡B6VçFW"ÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ'&–v‡B6VçFW"ÂÂ&–v‡B6VçFW"#°¢'&V³°¢66RvVÆÆ—6V&÷GFöÖÆVgBr ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRBÆVgB&÷GFöÒ#°¢7F'BÒ&ÆVgB&÷GFöÒÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ&ÆVgB&÷GFöÒÂÂÆVgB&÷GFöÒÂ“s2#°¢'&V³°¢66RvVÆÆ—6V&÷GFöÖ6VçFW"r ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRB6VçFW"&÷GFöÒ#°¢7F'BÒ&6VçFW"&÷GFöÒÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ&6VçFW"&÷GFöÒÂÂ6VçFW"&÷GFöÒÂCƒr#°¢'&V³°¢66RvVÆÆ—6V&÷GFö×&–v‡Br ¢G—RÒ'&F–Â#°¢s62Ò&VÆÆ—6Rf'F†W7B×6–FRB&–v‡B&÷GFöÒ#°¢7F'BÒ'&–v‡B&÷GFöÒÂVÆÆ—6Rf'F†W7B×6–FR#°¢vV&¶—BÒ'&–v‡B&÷GFöÒÂÂ&–v‡B&÷GFöÒÂ“s2#°¢'&V³° ¢FVfVÇC ¢G—RÒ&Æ–æV"#°¢s62Ò'Fò&–v‡B#°¢7F'BÒ&ÆVgB#°¢vV&¶—BÒ&ÆVgBF÷Â&–v‡BF÷#°¢'&V³°¢Ð ¢–b†6öÆ÷%öVæB’°¢¥VW'’†VÆR’æ772‡²v&6¶w&÷VæBs¢6öÆ÷%÷7F'BÂv÷6—G’s¢÷6—G—Ò“°¢¥VW'’†VÆR’æ772‡°¢v&6¶w&÷VæBs¢rÖÖ÷¢Òr²G—R²rÖw&F–VçB‚r²7F'B²rÂr²6öÆ÷%÷7F'B²rRÂr²6öÆ÷%öVæB²rR’rÀ¢v÷6—G’s¢÷6—G¢Ò“°¢¥VW'’†VÆR’æ772‡°¢v&6¶w&÷VæBs¢r×vV&¶—BÖw&F–VçB‚r²G—R²rÂr²vV&¶—B²rÂ6öÆ÷"×7F÷ƒÂr²6öÆ÷%÷7F'B²r’Â6öÆ÷"×7F÷ƒÂr²6öÆ÷%öVæB²r’’rÀ¢v÷6—G’s¢÷6—G¢Ò“°¢¥VW'’†VÆR’æ772‡°¢v&6¶w&÷VæBs¢r×vV&¶—BÒr²G—R²rÖw&F–VçB‚r²7F'B²rÂr²6öÆ÷%÷7F'B²rRÂr²6öÆ÷%öVæB²rR’rÀ¢v÷6—G’s¢÷6—G¢Ò“°¢¥VW'’†VÆR’æ772‡°¢v&6¶w&÷VæBs¢rÖòÒr²G—R²rÖw&F–VçB‚r²7F'B²rÂr²6öÆ÷%÷7F'B²rRÂr²6öÆ÷%öVæB²rR’rÀ¢v÷6—G’s¢÷6—G¢Ò“°¢¥VW'’†VÆR’æ772‡°¢v&6¶w&÷VæBs¢rÖ×2Òr²G—R²rÖw&F–VçB‚r²7F'B²rÂr²6öÆ÷%÷7F'B²rRÂr²6öÆ÷%öVæB²rR’rÀ¢v÷6—G’s¢÷6—G¢Ò“°¢¥VW'’†VÆR’æ772‡°¢v&6¶w&÷VæBs¢rr²G—R²rÖw&F–VçB‚r²s62²rÂr²6öÆ÷%÷7F'B²rRÂr²6öÆ÷%öVæB²rR’rÀ¢v÷6—G’s¢÷6—G¢Ò“°¢¥VW'’†VÆR’æ772‡°¢v&6¶w&÷VæBs¢vf–ÇFW#¢&öv–C¤E„–ÖvUG&ç6f÷&ÒäÖ–7&÷6ögBæw&F–VçB‚7F'D6öÆ÷'7G#ÕÂrr²6öÆ÷%÷7F'B²uÂrÂVæD6öÆ÷'7G#ÕÂrr²6öÆ÷%öVæB²uÂrÄw&F–VçEG—SÓ’rÀ¢v÷6—G’s¢÷6—G¢Ò“°¢Ð ¢VÇ6R°¢¥VW'’†VÆR’æ772‡²v&6¶w&÷VæBs¢6öÆ÷%÷7F'BÂv÷6—G’s¢÷6—G—Ò“°¢Ð¢Ð §Ò“°  ¢ò¢¢¢òÒ’À¢ò¢3ƒ2¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2Âõ÷vV'6µ÷&WV—&Uõò’° ¥õ÷vV'6µ÷&WV—&Uõòƒ3ƒB“°¦¥VW'’†gVæ7F–öâ‚B’°¢'W6R7G&–7B#°¢B‚rç&ÆÆ‚r’ç7FVÆÆ"‡°¢†÷&—¦öçFÅ67&öÆÆ–æs¢fÇ6RÀ¢fW'F–6Äöfg6WC¢CÀ¢&W7öç6—fS¢G'VP¢Ò“°§Ò“° ¢ò¢¢¢òÒ’À¢ò¢3ƒB¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¢ò¢7FVÆÆ"æ§2cãbã"Â6÷—&–v‡B#BÂÖ&²FÆvÆV—6‚Â‡GG¢òöÖ&¶FÆvÆV—6‚æ6öÒ÷&ö¦V7G2÷7FVÆÆ"æ§2Â‡GG¢òöÖ&¶FÆvÆV—6‚æÖ—BÖÆ–6Vç6Ræ÷&r¢ð¢gVæ7F–öâ†Æ"Æ2ÆB—¶gVæ7F–öâR†"Æ2—·F†—2æVÆVÖVçCÖ"ÇF†—2æ÷F–öç3ÖæW‡FVæB‡·ÒÆrÆ2’ÇF†—2åöFVfVÇG3ÖrÇF†—2åöæÖSÖbÇF†—2æ–æ—B‚—×f"cÒ'7FVÆÆ""Æs×·67&öÆÅ&÷W'G“¢'67&öÆÂ"Ç÷6—F–öå&÷W'G“¢'÷6—F–öâ"Æ†÷&—¦öçFÅ67&öÆÆ–æs¢ÇfW'F–6Å67&öÆÆ–æs¢Æ†÷&—¦öçFÄöfg6WC£ÇfW'F–6Äöfg6WC£Ç&W7öç6—fS¢Ç&ÆÆ„&6¶w&÷VæG3¢Ç&ÆÆ„VÆVÖVçG3¢Æ†–FTF—7FçDVÆVÖVçG3¢Æ†–FTVÆVÖVçC¦gVæ7F–öâ†—¶æ†–FR‚—ÒÇ6†÷tVÆVÖVçC¦gVæ7F–öâ†—¶ç6†÷r‚—×ÒÆƒ×·67&öÆÃ§¶vWDÆVgC¦gVæ7F–öâ†—·&WGW&âç67&öÆÄÆVgB‚—ÒÇ6WDÆVgC¦gVæ7F–öâ†Æ"—¶ç67&öÆÄÆVgB†"—ÒÆvWEF÷¦gVæ7F–öâ†—·&WGW&âç67&öÆÅF÷‚—ÒÇ6WEF÷¦gVæ7F–öâ†Æ"—¶ç67&öÆÅF÷†"—×ÒÇ÷6—F–öã§¶vWDÆVgC¦gVæ7F–öâ†—·&WGW&âÓ§'6T–çB†æ772‚&ÆVgB"’Ã—ÒÆvWEF÷¦gVæ7F–öâ†—·&WGW&âÓ§'6T–çB†æ772‚'F÷"’Ã—×ÒÆÖ&v–ã§¶vWDÆVgC¦gVæ7F–öâ†—·&WGW&âÓ§'6T–çB†æ772‚&Ö&v–âÖÆVgB"’Ã—ÒÆvWEF÷¦gVæ7F–öâ†—·&WGW&âÓ§'6T–çB†æ772‚&Ö&v–â×F÷"’Ã—×ÒÇG&ç6f÷&Ó§¶vWDÆVgC¦gVæ7F–öâ†—·f"#ÖvWD6ö×WFVE7G–ÆR†³Ò•¶µÓ·&WGW&â&æöæR"ÓÖ#òÓ§'6T–çB†"æÖF6‚‚ò‚Óõ³Ó•Ò²’ör•³EÒÃ“£ÒÆvWEF÷¦gVæ7F–öâ†—·f"#ÖvWD6ö×WFVE7G–ÆR†³Ò•¶µÓ·&WGW&â&æöæR"ÓÖ#òÓ§'6T–çB†"æÖF6‚‚ò‚Óõ³Ó•Ò²’ör•³UÒÃ“£××ÒÆ“×·÷6—F–öã§·6WDÆVgC¦gVæ7F–öâ†Æ"—¶æ772‚&ÆVgB"Æ"—ÒÇ6WEF÷¦gVæ7F–öâ†Æ"—¶æ772‚'F÷"Æ"—×ÒÇG&ç6f÷&Ó§·6WE÷6—F–öã¦gVæ7F–öâ†Æ"Æ2ÆBÆR—¶³Òç7G–ÆU¶µÓÒ'G&ç6ÆFS6B‚"²†"Ö2’²'‚Â"²†BÖR’²'‚Â’'××ÒÆ£ÖgVæ7F–öâ‚—·f""Æ3Òõâ„Ö÷§ÅvV&¶—GÄ¶‡FÖÇÄ÷Æ×7Ä–6"’ƒóÕ´Õ¥Ò’òÆCÖ‚'67&—B"•³Òç7G–ÆRÆSÒ"#¶f÷"†"–âB––b†2çFW7B†"’—¶SÖ"æÖF6‚†2•³Ó¶'&V·×&WGW&â%vV&¶—D÷6—G’&–âBbb†SÒ%vV&¶—B"’Â$¶‡FÖÄ÷6—G’&–âBbb†SÒ$¶‡FÖÂ"’ÆgVæ7F–öâ†—·&WGW&âR²†RæÆVæwFƒãöæ6†$Bƒ’çFõWW$66R‚’¶ç6Æ–6Rƒ“¦—×Ò‚’Æ³Ö¢‚'G&ç6f÷&Ò"’ÆÃÖ‚#ÆF—bóâ"Ç·7G–ÆS¢&&6¶w&÷VæC¢6ffb'Ò’æ772‚&&6¶w&÷VæB×÷6—F–öâ×‚"’ÓÖBÆÓÖÃögVæ7F–öâ†Æ"Æ2—¶æ772‡²&&6¶w&÷VæB×÷6—F–öâ×‚#¦"Â&&6¶w&÷VæB×÷6—F–öâ×’#¦7Ò—Ó¦gVæ7F–öâ†Æ"Æ2—¶æ772‚&&6¶w&÷VæB×÷6—F–öâ"Æ"²""¶2—ÒÆãÖÃögVæ7F–öâ†—·&WGW&å¶æ772‚&&6¶w&÷VæB×÷6—F–öâ×‚"’Ææ772‚&&6¶w&÷VæB×÷6—F–öâ×’"•×Ó¦gVæ7F–öâ†—·&WGW&âæ772‚&&6¶w&÷VæB×÷6—F–öâ"’ç7Æ—B‚""—ÒÆóÖ"ç&WVW7Dæ–ÖF–öäg&ÖWÇÆ"çvV&¶—E&WVW7Dæ–ÖF–öäg&ÖWÇÆ"æÖ÷¥&WVW7Dæ–ÖF–öäg&ÖWÇÆ"æõ&WVW7Dæ–ÖF–öäg&ÖWÇÆ"æ×5&WVW7Dæ–ÖF–öäg&ÖWÇÆgVæ7F–öâ†—·6WEF–ÖV÷WB†ÃS2óc—Ó¶Rç&÷F÷G—S×¶–æ—C¦gVæ7F–öâ‚—·F†—2æ÷F–öç2ææÖSÖb²%ò"´ÖF‚æfÆö÷"ƒS’¤ÖF‚ç&æFöÒ‚’’ÇF†—2åöFVf–æTVÆVÖVçG2‚’ÇF†—2åöFVf–æTvWGFW'2‚’ÇF†—2åöFVf–æU6WGFW'2‚’ÇF†—2åö†æFÆUv–æF÷tÆöDæE&W6—¦R‚’ÇF†—2åöFWFV7Ef–Ww÷'B‚’ÇF†—2ç&Vg&W6‚‡¶f—'7DÆöC¢Ò’Â'67&öÆÂ#ÓÓ×F†—2æ÷F–öç2ç67&öÆÅ&÷W'G“÷F†—2åö†æFÆU67&öÆÄWfVçB‚“§F†—2å÷7F'Dæ–ÖF–öäÆö÷‚—ÒÅöFVf–æTVÆVÖVçG3¦gVæ7F–öâ‚—·F†—2æVÆVÖVçCÓÓÖ2æ&öG’bb‡F†—2æVÆVÖVçCÖ"’ÇF†—2âG67&öÆÄVÆVÖVçCÖ‡F†—2æVÆVÖVçB’ÇF†—2âFVÆVÖVçC×F†—2æVÆVÖVçCÓÓÖ#ö‚&&öG’"“§F†—2âG67&öÆÄVÆVÖVçBÇF†—2âGf–Ww÷'DVÆVÖVçC×F†—2æ÷F–öç2çf–Ww÷'DVÆVÖVçBÓÖCö‡F†—2æ÷F–öç2çf–Ww÷'DVÆVÖVçB“§F†—2âG67&öÆÄVÆVÖVçE³ÓÓÓÖ'ÇÂ'67&öÆÂ#ÓÓ×F†—2æ÷F–öç2ç67&öÆÅ&÷W'G“÷F†—2âG67&öÆÄVÆVÖVçC§F†—2âG67&öÆÄVÆVÖVçBç&VçB‚—ÒÅöFVf–æTvWGFW'3¦gVæ7F–öâ‚—·f"×F†—2Æ#Ö…¶æ÷F–öç2ç67&öÆÅ&÷W'G•Ó·F†—2åövWE67&öÆÄÆVgCÖgVæ7F–öâ‚—·&WGW&â"ævWDÆVgB†âG67&öÆÄVÆVÖVçB—ÒÇF†—2åövWE67&öÆÅF÷ÖgVæ7F–öâ‚—·&WGW&â"ævWEF÷†âG67&öÆÄVÆVÖVçB—×ÒÅöFVf–æU6WGFW'3¦gVæ7F–öâ‚—·f"#×F†—2Æ3Ö…¶"æ÷F–öç2ç67&öÆÅ&÷W'G•ÒÆCÖ•¶"æ÷F–öç2ç÷6—F–öå&÷W'G•ÒÆSÖ2ç6WDÆVgBÆcÖ2ç6WEF÷·F†—2å÷6WE67&öÆÄÆVgCÒ&gVæ7F–öâ#Ó×G—VöbSögVæ7F–öâ†—¶R†"âG67&öÆÄVÆVÖVçBÆ—Ó¦ææö÷ÇF†—2å÷6WE67&öÆÅF÷Ò&gVæ7F–öâ#Ó×G—VöbcögVæ7F–öâ†—¶b†"âG67&öÆÄVÆVÖVçBÆ—Ó¦ææö÷ÇF†—2å÷6WE÷6—F–öãÖBç6WE÷6—F–öçÇÆgVæ7F–öâ†Æ2ÆRÆbÆr—¶"æ÷F–öç2æ†÷&—¦öçFÅ67&öÆÆ–ærbfBç6WDÆVgB†Æ2ÆR’Æ"æ÷F–öç2çfW'F–6Å67&öÆÆ–ærbfBç6WEF÷†ÆbÆr—×ÒÅö†æFÆUv–æF÷tÆöDæE&W6—¦S¦gVæ7F–öâ‚—·f"3×F†—2ÆCÖ†"“¶2æ÷F–öç2ç&W7öç6—fRbfBæ&–æB‚&ÆöBâ"·F†—2ææÖRÆgVæ7F–öâ‚—¶2ç&Vg&W6‚‚—Ò’ÆBæ&–æB‚'&W6—¦Râ"·F†—2ææÖRÆgVæ7F–öâ‚—¶2åöFWFV7Ef–Ww÷'B‚’Æ2æ÷F–öç2ç&W7öç6—fRbf2ç&Vg&W6‚‚—Ò—ÒÇ&Vg&W6ƒ¦gVæ7F–öâ†2—·f"C×F†—2ÆSÖBåövWE67&öÆÄÆVgB‚’ÆcÖBåövWE67&öÆÅF÷‚“¶2bf2æf—'7DÆöGÇÇF†—2å÷&W6WB‚’ÇF†—2å÷6WE67&öÆÄÆVgBƒ’ÇF†—2å÷6WE67&öÆÅF÷ƒ’ÇF†—2å÷6WDöfg6WG2‚’ÇF†—2åöf–æE'F–6ÆW2‚’ÇF†—2åöf–æD&6¶w&÷VæG2‚’Æ2bf2æf—'7DÆöBbbõvV$¶—BòçFW7B†æf–vF÷"çW6W$vVçB’bf†"’æÆöB†gVæ7F–öâ‚—·f"ÖBåövWE67&öÆÄÆVgB‚’Æ#ÖBåövWE67&öÆÅF÷‚“¶Bå÷6WE67&öÆÄÆVgB†³’ÆBå÷6WE67&öÆÅF÷†"³’ÆBå÷6WE67&öÆÄÆVgB†’ÆBå÷6WE67&öÆÅF÷†"—Ò’ÇF†—2å÷6WE67&öÆÄÆVgB†R’ÇF†—2å÷6WE67&öÆÅF÷†b—ÒÅöFWFV7Ef–Ww÷'C¦gVæ7F–öâ‚—·f"×F†—2âGf–Ww÷'DVÆVÖVçBæöfg6WB‚’Æ#ÖçVÆÂÓÖbfÓÖC·F†—2çf–Ww÷'Ev–GFƒ×F†—2âGf–Ww÷'DVÆVÖVçBçv–GF‚‚’ÇF†—2çf–Ww÷'D†V–v‡C×F†—2âGf–Ww÷'DVÆVÖVçBæ†V–v‡B‚’ÇF†—2çf–Ww÷'Döfg6WEF÷Ö#öçF÷£ÇF†—2çf–Ww÷'Döfg6WDÆVgCÖ#öæÆVgC£ÒÅöf–æE'F–6ÆW3¦gVæ7F–öâ‚—··f"#×F†—3·F†—2åövWE67&öÆÄÆVgB‚’ÇF†—2åövWE67&öÆÅF÷‚—Ö–b‡F†—2ç'F–6ÆW2ÓÖB–f÷"‡f"3×F†—2ç'F–6ÆW2æÆVæwF‚Ó¶3ãÓ¶2ÒÒ—F†—2ç'F–6ÆW5¶5ÒâFVÆVÖVçBæFF‚'7FVÆÆ"ÖVÆVÖVçD—47F—fR"ÆB“·F†—2ç'F–6ÆW3ÕµÒÇF†—2æ÷F–öç2ç&ÆÆ„VÆVÖVçG2bgF†—2âFVÆVÖVçBæf–æB‚%¶FF×7FVÆÆ"×&F–õÒ"’æV6‚†gVæ7F–öâ‚—·f"2ÆRÆbÆrÆ‚Æ’Æ¢Æ²ÆÂÆÓÖ‡F†—2’ÆãÓÆóÓÇÓÇÓ¶–b†ÒæFF‚'7FVÆÆ"ÖVÆVÖVçD—47F—fR"’—¶–b†ÒæFF‚'7FVÆÆ"ÖVÆVÖVçD—47F—fR"’Ó×F†—2—&WGW&çÖVÇ6RÒæFF‚'7FVÆÆ"ÖVÆVÖVçD—47F—fR"ÇF†—2“¶"æ÷F–öç2ç6†÷tVÆVÖVçB†Ò’ÆÒæFF‚'7FVÆÆ"×7F'F–ætÆVgB"“ò†Òæ772‚&ÆVgB"ÆÒæFF‚'7FVÆÆ"×7F'F–ætÆVgB"’’ÆÒæ772‚'F÷"ÆÒæFF‚'7FVÆÆ"×7F'F–æuF÷"’’“¢†ÒæFF‚'7FVÆÆ"×7F'F–ætÆVgB"ÆÒæ772‚&ÆVgB"’’ÆÒæFF‚'7FVÆÆ"×7F'F–æuF÷"ÆÒæ772‚'F÷"’’’ÆcÖÒç÷6—F–öâ‚’æÆVgBÆsÖÒç÷6—F–öâ‚’çF÷ÆƒÒ&WFò#ÓÓÖÒæ772‚&Ö&v–âÖÆVgB"“ó§'6T–çB†Òæ772‚&Ö&v–âÖÆVgB"’Ã’Æ“Ò&WFò#ÓÓÖÒæ772‚&Ö&v–â×F÷"“ó§'6T–çB†Òæ772‚&Ö&v–â×F÷"’Ã’Æ³ÖÒæöfg6WB‚’æÆVgBÖ‚ÆÃÖÒæöfg6WB‚’çF÷Ö’ÆÒç&VçG2‚’æV6‚†gVæ7F–öâ‚—·f"#Ö‡F†—2“·&WGW&â"æFF‚'7FVÆÆ"Ööfg6WB×&VçB"“ÓÓÒò†ã×Æó×Æ£Ö"Â“¢‡³Ö"ç÷6—F–öâ‚’æÆVgBÇfö–B‡³Ö"ç÷6—F–öâ‚’çF÷’—Ò’Æ3ÖÒæFF‚'7FVÆÆ"Ö†÷&—¦öçFÂÖöfg6WB"’ÓÖCöÒæFF‚'7FVÆÆ"Ö†÷&—¦öçFÂÖöfg6WB"“¦¢ÓÖBbf¢æFF‚'7FVÆÆ"Ö†÷&—¦öçFÂÖöfg6WB"’ÓÖCö¢æFF‚'7FVÆÆ"Ö†÷&—¦öçFÂÖöfg6WB"“¦"æ†÷&—¦öçFÄöfg6WBÆSÖÒæFF‚'7FVÆÆ"×fW'F–6ÂÖöfg6WB"’ÓÖCöÒæFF‚'7FVÆÆ"×fW'F–6ÂÖöfg6WB"“¦¢ÓÖBbf¢æFF‚'7FVÆÆ"×fW'F–6ÂÖöfg6WB"’ÓÖCö¢æFF‚'7FVÆÆ"×fW'F–6ÂÖöfg6WB"“¦"çfW'F–6Äöfg6WBÆ"ç'F–6ÆW2çW6‚‡²FVÆVÖVçC¦ÒÂFöfg6WE&VçC¦¢Æ—4f—†VC¢&f—†VB#ÓÓÖÒæ772‚'÷6—F–öâ"’Æ†÷&—¦öçFÄöfg6WC¦2ÇfW'F–6Äöfg6WC¦RÇ7F'F–æu÷6—F–öäÆVgC¦bÇ7F'F–æu÷6—F–öåF÷¦rÇ7F'F–ætöfg6WDÆVgC¦²Ç7F'F–ætöfg6WEF÷¦ÂÇ&VçDöfg6WDÆVgC¦âÇ&VçDöfg6WEF÷¦òÇ7FVÆÆ%&F–ó¦ÒæFF‚'7FVÆÆ"×&F–ò"’ÓÖCöÒæFF‚'7FVÆÆ"×&F–ò"“£Çv–GFƒ¦Òæ÷WFW%v–GF‚‚’Æ†V–v‡C¦Òæ÷WFW$†V–v‡B‚’Æ—4†–FFVã¢Ò—Ò—ÒÅöf–æD&6¶w&÷VæG3¦gVæ7F–öâ‚—·f""Æ3×F†—2ÆS×F†—2åövWE67&öÆÄÆVgB‚’Æc×F†—2åövWE67&öÆÅF÷‚“·F†—2æ&6¶w&÷VæG3ÕµÒÇF†—2æ÷F–öç2ç&ÆÆ„&6¶w&÷VæG2bb†#×F†—2âFVÆVÖVçBæf–æB‚%¶FF×7FVÆÆ"Ö&6¶w&÷VæB×&F–õÒ"’ÇF†—2âFVÆVÖVçBæFF‚'7FVÆÆ"Ö&6¶w&÷VæB×&F–ò"’bb†#Ö"æFB‡F†—2âFVÆVÖVçB’’Æ"æV6‚†gVæ7F–öâ‚—·f""ÆrÆ‚Æ’Æ¢Æ²ÆÂÆóÖ‡F†—2’ÇÖâ†ò’ÇÓÇ#ÓÇ3ÓÇCÓ¶–b†òæFF‚'7FVÆÆ"Ö&6¶w&÷VæD—47F—fR"’—¶–b†òæFF‚'7FVÆÆ"Ö&6¶w&÷VæD—47F—fR"’Ó×F†—2—&WGW&çÖVÇ6RòæFF‚'7FVÆÆ"Ö&6¶w&÷VæD—47F—fR"ÇF†—2“¶òæFF‚'7FVÆÆ"Ö&6¶w&÷VæE7F'F–ætÆVgB"“öÒ†òÆòæFF‚'7FVÆÆ"Ö&6¶w&÷VæE7F'F–ætÆVgB"’ÆòæFF‚'7FVÆÆ"Ö&6¶w&÷VæE7F'F–æuF÷"’“¢†òæFF‚'7FVÆÆ"Ö&6¶w&÷VæE7F'F–ætÆVgB"Ç³Ò’ÆòæFF‚'7FVÆÆ"Ö&6¶w&÷VæE7F'F–æuF÷"Ç³Ò’’ÆƒÒ&WFò#ÓÓÖòæ772‚&Ö&v–âÖÆVgB"“ó§'6T–çB†òæ772‚&Ö&v–âÖÆVgB"’Ã’Æ“Ò&WFò#ÓÓÖòæ772‚&Ö&v–â×F÷"“ó§'6T–çB†òæ772‚&Ö&v–â×F÷"’Ã’Æ£Öòæöfg6WB‚’æÆVgBÖ‚ÖRÆ³Öòæöfg6WB‚’çF÷Ö’ÖbÆòç&VçG2‚’æV6‚†gVæ7F–öâ‚—·f"#Ö‡F†—2“·&WGW&â"æFF‚'7FVÆÆ"Ööfg6WB×&VçB"“ÓÓÒò‡×2Ç#×BÆÃÖ"Â“¢‡2³Ö"ç÷6—F–öâ‚’æÆVgBÇfö–B‡B³Ö"ç÷6—F–öâ‚’çF÷’—Ò’Æ#ÖòæFF‚'7FVÆÆ"Ö†÷&—¦öçFÂÖöfg6WB"’ÓÖCöòæFF‚'7FVÆÆ"Ö†÷&—¦öçFÂÖöfg6WB"“¦ÂÓÖBbfÂæFF‚'7FVÆÆ"Ö†÷&—¦öçFÂÖöfg6WB"’ÓÖCöÂæFF‚'7FVÆÆ"Ö†÷&—¦öçFÂÖöfg6WB"“¦2æ†÷&—¦öçFÄöfg6WBÆsÖòæFF‚'7FVÆÆ"×fW'F–6ÂÖöfg6WB"’ÓÖCöòæFF‚'7FVÆÆ"×fW'F–6ÂÖöfg6WB"“¦ÂÓÖBbfÂæFF‚'7FVÆÆ"×fW'F–6ÂÖöfg6WB"’ÓÖCöÂæFF‚'7FVÆÆ"×fW'F–6ÂÖöfg6WB"“¦2çfW'F–6Äöfg6WBÆ2æ&6¶w&÷VæG2çW6‚‡²FVÆVÖVçC¦òÂFöfg6WE&VçC¦ÂÆ—4f—†VC¢&f—†VB#ÓÓÖòæ772‚&&6¶w&÷VæBÖGF6†ÖVçB"’Æ†÷&—¦öçFÄöfg6WC¦"ÇfW'F–6Äöfg6WC¦rÇ7F'F–æufÇVTÆVgC§³ÒÇ7F'F–æufÇVUF÷§³ÒÇ7F'F–æt&6¶w&÷VæE÷6—F–öäÆVgC¦—4æâ‡'6T–çB‡³ÒÃ’“ó§'6T–çB‡³ÒÃ’Ç7F'F–æt&6¶w&÷VæE÷6—F–öåF÷¦—4æâ‡'6T–çB‡³ÒÃ’“ó§'6T–çB‡³ÒÃ’Ç7F'F–æu÷6—F–öäÆVgC¦òç÷6—F–öâ‚’æÆVgBÇ7F'F–æu÷6—F–öåF÷¦òç÷6—F–öâ‚’çF÷Ç7F'F–ætöfg6WDÆVgC¦¢Ç7F'F–ætöfg6WEF÷¦²Ç&VçDöfg6WDÆVgC§Ç&VçDöfg6WEF÷§"Ç7FVÆÆ%&F–ó¦òæFF‚'7FVÆÆ"Ö&6¶w&÷VæB×&F–ò"“ÓÓÖCó¦òæFF‚'7FVÆÆ"Ö&6¶w&÷VæB×&F–ò"—Ò—Ò’—ÒÅ÷&W6WC¦gVæ7F–öâ‚—·f"Æ"Æ2ÆBÆS¶f÷"†S×F†—2ç'F–6ÆW2æÆVæwF‚Ó¶SãÓ¶RÒÒ–×F†—2ç'F–6ÆW5¶UÒÆ#ÖâFVÆVÖVçBæFF‚'7FVÆÆ"×7F'F–ætÆVgB"’Æ3ÖâFVÆVÖVçBæFF‚'7FVÆÆ"×7F'F–æuF÷"’ÇF†—2å÷6WE÷6—F–öâ†âFVÆVÖVçBÆ"Æ"Æ2Æ2’ÇF†—2æ÷F–öç2ç6†÷tVÆVÖVçB†âFVÆVÖVçB’ÆâFVÆVÖVçBæFF‚'7FVÆÆ"×7F'F–ætÆVgB"ÆçVÆÂ’æFF‚'7FVÆÆ"ÖVÆVÖVçD—47F—fR"ÆçVÆÂ’æFF‚'7FVÆÆ"Ö&6¶w&÷VæD—47F—fR"ÆçVÆÂ“¶f÷"†S×F†—2æ&6¶w&÷VæG2æÆVæwF‚Ó¶SãÓ¶RÒÒ–C×F†—2æ&6¶w&÷VæG5¶UÒÆBâFVÆVÖVçBæFF‚'7FVÆÆ"Ö&6¶w&÷VæE7F'F–ætÆVgB"ÆçVÆÂ’æFF‚'7FVÆÆ"Ö&6¶w&÷VæE7F'F–æuF÷"ÆçVÆÂ’ÆÒ†BâFVÆVÖVçBÆBç7F'F–æufÇVTÆVgBÆBç7F'F–æufÇVUF÷—ÒÆFW7G&÷“¦gVæ7F–öâ‚—·F†—2å÷&W6WB‚’ÇF†—2âG67&öÆÄVÆVÖVçBçVæ&–æB‚'&W6—¦Râ"·F†—2ææÖR’çVæ&–æB‚'67&öÆÂâ"·F†—2ææÖR’ÇF†—2åöæ–ÖF–öäÆö÷Öææö÷Æ†"’çVæ&–æB‚&ÆöBâ"·F†—2ææÖR’çVæ&–æB‚'&W6—¦Râ"·F†—2ææÖR—ÒÅ÷6WDöfg6WG3¦gVæ7F–öâ‚—·f"3×F†—2ÆCÖ†"“¶BçVæ&–æB‚'&W6—¦Ræ†÷&—¦öçFÂÒ"·F†—2ææÖR’çVæ&–æB‚'&W6—¦RçfW'F–6ÂÒ"·F†—2ææÖR’Â&gVæ7F–öâ#Ó×G—VöbF†—2æ÷F–öç2æ†÷&—¦öçFÄöfg6WCò‡F†—2æ†÷&—¦öçFÄöfg6WC×F†—2æ÷F–öç2æ†÷&—¦öçFÄöfg6WB‚’ÆBæ&–æB‚'&W6—¦Ræ†÷&—¦öçFÂÒ"·F†—2ææÖRÆgVæ7F–öâ‚—¶2æ†÷&—¦öçFÄöfg6WCÖ2æ÷F–öç2æ†÷&—¦öçFÄöfg6WB‚—Ò’“§F†—2æ†÷&—¦öçFÄöfg6WC×F†—2æ÷F–öç2æ†÷&—¦öçFÄöfg6WBÂ&gVæ7F–öâ#Ó×G—VöbF†—2æ÷F–öç2çfW'F–6Äöfg6WCò‡F†—2çfW'F–6Äöfg6WC×F†—2æ÷F–öç2çfW'F–6Äöfg6WB‚’ÆBæ&–æB‚'&W6—¦RçfW'F–6ÂÒ"·F†—2ææÖRÆgVæ7F–öâ‚—¶2çfW'F–6Äöfg6WCÖ2æ÷F–öç2çfW'F–6Äöfg6WB‚—Ò’“§F†—2çfW'F–6Äöfg6WC×F†—2æ÷F–öç2çfW'F–6Äöfg6WGÒÅ÷&W÷6—F–öäVÆVÖVçG3¦gVæ7F–öâ‚—·f"Æ"Æ2ÆBÆRÆbÆrÆ‚Æ’Æ¢Æ³×F†—2åövWE67&öÆÄÆVgB‚’ÆÃ×F†—2åövWE67&öÆÅF÷‚’ÆãÒÆóÒ¶–b‡F†—2æ7W'&VçE67&öÆÄÆVgBÓÖ·ÇÇF†—2æ7W'&VçE67&öÆÅF÷ÓÖÇÇÇF†—2æ7W'&VçEv–GF‚Ó×F†—2çf–Ww÷'Ev–GF‡ÇÇF†—2æ7W'&VçD†V–v‡BÓ×F†—2çf–Ww÷'D†V–v‡B—¶f÷"‡F†—2æ7W'&VçE67&öÆÄÆVgCÖ²ÇF†—2æ7W'&VçE67&öÆÅF÷ÖÂÇF†—2æ7W'&VçEv–GFƒ×F†—2çf–Ww÷'Ev–GF‚ÇF†—2æ7W'&VçD†V–v‡C×F†—2çf–Ww÷'D†V–v‡BÆ£×F†—2ç'F–6ÆW2æÆVæwF‚Ó¶£ãÓ¶¢ÒÒ–×F†—2ç'F–6ÆW5¶¥ÒÆ#Öæ—4f—†VCó£ÇF†—2æ÷F–öç2æ†÷&—¦öçFÅ67&öÆÆ–æsò†cÒ†²¶æ†÷&—¦öçFÄöfg6WB·F†—2çf–Ww÷'Döfg6WDÆVgB¶ç7F'F–æu÷6—F–öäÆVgBÖç7F'F–ætöfg6WDÆVgB¶ç&VçDöfg6WDÆVgB’¢Ò†ç7FVÆÆ%&F–ò¶"Ó’¶ç7F'F–æu÷6—F–öäÆVgBÆƒÖbÖç7F'F–æu÷6—F–öäÆVgB¶ç7F'F–ætöfg6WDÆVgB“¢†cÖç7F'F–æu÷6—F–öäÆVgBÆƒÖç7F'F–ætöfg6WDÆVgB’ÇF†—2æ÷F–öç2çfW'F–6Å67&öÆÆ–æsò†sÒ†Â¶çfW'F–6Äöfg6WB·F†—2çf–Ww÷'Döfg6WEF÷¶ç7F'F–æu÷6—F–öåF÷Öç7F'F–ætöfg6WEF÷¶ç&VçDöfg6WEF÷’¢Ò†ç7FVÆÆ%&F–ò¶"Ó’¶ç7F'F–æu÷6—F–öåF÷Æ“ÖrÖç7F'F–æu÷6—F–öåF÷¶ç7F'F–ætöfg6WEF÷“¢†sÖç7F'F–æu÷6—F–öåF÷Æ“Öç7F'F–ætöfg6WEF÷’ÇF†—2æ÷F–öç2æ†–FTF—7FçDVÆVÖVçG2bb†óÒF†—2æ÷F–öç2æ†÷&—¦öçFÅ67&öÆÆ–æwÇÆ‚¶çv–GFƒâ†æ—4f—†VCó¦²’bfƒÂ†æ—4f—†VCó¦²’·F†—2çf–Ww÷'Ev–GF‚·F†—2çf–Ww÷'Döfg6WDÆVgBÆãÒF†—2æ÷F–öç2çfW'F–6Å67&öÆÆ–æwÇÆ’¶æ†V–v‡Câ†æ—4f—†VCó¦Â’bf“Â†æ—4f—†VCó¦Â’·F†—2çf–Ww÷'D†V–v‡B·F†—2çf–Ww÷'Döfg6WEF÷’Æòbfãò†æ—4†–FFVâbb‡F†—2æ÷F–öç2ç6†÷tVÆVÖVçB†âFVÆVÖVçB’Ææ—4†–FFVãÒ’ÇF†—2å÷6WE÷6—F–öâ†âFVÆVÖVçBÆbÆç7F'F–æu÷6—F–öäÆVgBÆrÆç7F'F–æu÷6—F–öåF÷’“¦æ—4†–FFVçÇÂ‡F†—2æ÷F–öç2æ†–FTVÆVÖVçB†âFVÆVÖVçB’Ææ—4†–FFVãÒ“¶f÷"†£×F†—2æ&6¶w&÷VæG2æÆVæwF‚Ó¶£ãÓ¶¢ÒÒ–3×F†—2æ&6¶w&÷VæG5¶¥ÒÆ#Ö2æ—4f—†VCó£ÆC×F†—2æ÷F–öç2æ†÷&—¦öçFÅ67&öÆÆ–æsò†²¶2æ†÷&—¦öçFÄöfg6WB×F†—2çf–Ww÷'Döfg6WDÆVgBÖ2ç7F'F–ætöfg6WDÆVgB¶2ç&VçDöfg6WDÆVgBÖ2ç7F'F–æt&6¶w&÷VæE÷6—F–öäÆVgB’¢†"Ö2ç7FVÆÆ%&F–ò’²'‚#¦2ç7F'F–æufÇVTÆVgBÆS×F†—2æ÷F–öç2çfW'F–6Å67&öÆÆ–æsò†Â¶2çfW'F–6Äöfg6WB×F†—2çf–Ww÷'Döfg6WEF÷Ö2ç7F'F–ætöfg6WEF÷¶2ç&VçDöfg6WEF÷Ö2ç7F'F–æt&6¶w&÷VæE÷6—F–öåF÷’¢†"Ö2ç7FVÆÆ%&F–ò’²'‚#¦2ç7F'F–æufÇVUF÷ÆÒ†2âFVÆVÖVçBÆBÆR—×ÒÅö†æFÆU67&öÆÄWfVçC¦gVæ7F–öâ‚—·f"×F†—2Æ#ÒÆ3ÖgVæ7F–öâ‚—¶å÷&W÷6—F–öäVÆVÖVçG2‚’Æ#ÒÒÆCÖgVæ7F–öâ‚—¶'ÇÂ†ò†2’Æ#Ò—Ó·F†—2âG67&öÆÄVÆVÖVçBæ&–æB‚'67&öÆÂâ"·F†—2ææÖRÆB’ÆB‚—ÒÅ÷7F'Dæ–ÖF–öäÆö÷¦gVæ7F–öâ‚—·f"×F†—3·F†—2åöæ–ÖF–öäÆö÷ÖgVæ7F–öâ‚—¶ò†åöæ–ÖF–öäÆö÷’Æå÷&W÷6—F–öäVÆVÖVçG2‚—ÒÇF†—2åöæ–ÖF–öäÆö÷‚—×ÒÆæfå¶eÓÖgVæ7F–öâ†"—·f"3Ö&wVÖVçG3·&WGW&â#ÓÓÖGÇÂ&ö&¦V7B#Ó×G—Vöb#÷F†—2æV6‚†gVæ7F–öâ‚—¶æFF‡F†—2Â'ÇVv–åò"¶b—ÇÆæFF‡F†—2Â'ÇVv–åò"¶bÆæWrR‡F†—2Æ"’—Ò“¢'7G&–ær#Ó×G—Vöb"bb%ò"ÓÖ%³Òbb&–æ—B"ÓÖ#÷F†—2æV6‚†gVæ7F–öâ‚—·f"CÖæFF‡F†—2Â'ÇVv–åò"¶b“¶B–ç7Fæ6VöbRbb&gVæ7F–öâ#Ó×G—VöbE¶%ÒbfE¶%ÒæÇ’†BÄ'&’ç&÷F÷G—Rç6Æ–6Ræ6ÆÂ†2Ã’’Â&FW7G&÷’#ÓÓÖ"bfæFF‡F†—2Â'ÇVv–åò"¶bÆçVÆÂ—Ò“§fö–BÒÆ¶eÓÖgVæ7F–öâ‚—·f"3Ö†"“·&WGW&â2ç7FVÆÆ"æÇ’†2Ä'&’ç&÷F÷G—Rç6Æ–6Ræ6ÆÂ†&wVÖVçG2Ã’—ÒÆ¶eÒç67&öÆÅ&÷W'G“Ö‚Æ¶eÒç÷6—F–öå&÷W'G“Ö’Æ"å7FVÆÆ#ÖWÒ†¥VW'’ÇF†—2ÆFö7VÖVçB“° ¢ò¢¢¢òÒ’À¢ò¢3ƒR¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¦¥VW'’†gVæ7F–öâ‚B’°¢'W6R7G&–7B#°¢v–æF÷ræFDWfVçDÆ—7FVæW"‚&ÆöB"ÂgVæ7F–öâ‚’°¢f"f÷&ÒÒFö7VÖVçBævWDVÆVÖVçD'”–B‚&6öçF7Ff÷&Ò"“°¢–b†f÷&Ò—°¢f÷&ÒæFDWfVçDÆ—7FVæW"‚'7V&Ö—B"ÂgVæ7F–öâ†WfVçB’° ¢–b†f÷&Òæ6†V6µfÆ–F—G’‚’ÓÒfÇ6R’°¢WfVçBç&WfVçDFVfVÇB‚“°¢WfVçBç7F÷&÷vF–öâ‚“°¢ÒVÇ6R°¢Bæ¦‚‡°¢G—S¢%õ5B"À¢W&Ã¢&76WG2÷‡÷7V&Ö—Bç‡"À¢FF¢f÷&Òç6W&–Æ—¦R‚’À¢7V66W73¢gVæ7F–öâ‚’°¢B‚r7fÆ–BÖ—77VRr’æFD6Æ72‚vÆW'B×7V66W72r’æ‡FÖÂ‚u–÷W"ÖW76vR†2&VVâ6VçBÃÄ%#âvRv–ÆÂ6öçF7B–÷R&6²v—F‚–âæW‡B#B†÷W'2âr’ç6†÷r‚“°¢Ð¢Ò“°¢Ð ¢f÷&Òæ6Æ74Æ—7BæFB‚'v2×fÆ–FFVB"“°¢ÒÂfÇ6R“°¢Ð ¢ÒÂfÇ6R“°§Ò“° ¦¥VW'’†gVæ7F–öâ‚B’°¢'W6R7G&–7B#°¢–b‚B‚"66öçF7Ff÷&Ò"’’°¢B‚"66öçF7Ff÷&Ò"’ç7V&Ö—B†gVæ7F–öâ†R’°¢Rç&WfVçDFVfVÇB‚“°¢f"æÖRÒB‚"6æÖR"’çfÂ‚’À¢VÖ–ÂÒB‚"6VÖ–Â"’çfÂ‚’À¢7V&¦V7BÒB‚"77V&¦V7B"’çfÂ‚’À¢ÖW76vRÒB‚"6ÖW76vR"’çfÂ‚’À¢FF7G&–ærÒvæÖSÒr²æÖR²rfVÖ–ÃÒr²VÖ–Â²rg7V&¦V7CÒr²7V&¦V7B²rfÖW76vSÒr²ÖW76vS° ¢–b†æÖRÓÓÒrrÇÂ—4VÖ–Â†VÖ–Â’ÇÂÖW76vRÓÓÒrr’°¢B‚r7fÆ–BÖ—77VRr’æFD6Æ72‚vÆW'BÖFævW"r’æ‡FÖÂ‚uÆV6R&÷f–FRfÆ–B–æf÷&ÖF–öâr’ç6Æ–FTF÷vâ‚“°¢ÒVÇ6R°¢Bæ¦‚‡°¢G—S¢%õ5B"À¢W&Ã¢&76WG2÷‡÷7V&Ö—Bç‡"À¢FF¢B‚&f÷&Ò"’ç6W&–Æ—¦R‚’À¢7V66W73¢gVæ7F–öâ‚’°¢B‚r66öçF7Ff÷&Òr’ç6Æ–FUW‚“°¢B‚r7fÆ–BÖ—77VRr’æFD6Æ72‚vÆW'B×7V66W72r’æ‡FÖÂ‚u–÷W"ÖW76vR†2&VVâ6VçBÃÄ%#âvRv–ÆÂ6öçF7B–÷R&6²v—F‚–âæW‡B#B†÷W'2âr’ç6†÷r‚“°¢Ð¢Ò“°¢Ð¢Ò“°¢Ð§Ò“°  ¦gVæ7F–öâ—4VÖ–Â†VÖ–Â’°¢f"&VvW‚Òõâ…¶×¤Õ£Ó•õÂåÂÕÂµÒ’µÄ‚…¶×¤Õ£Ó•ÂÕÒ’µÂâ’²…¶×¤Õ£Ó•×³"ÃGÒ’²Bó°¢&WGW&â&VvW‚çFW7B†VÖ–Â“°§Ð    ¢ò¢¢¢òÒ’À¢ò¢3ƒb¢ð¢ò¢¢¢ò†gVæ7F–öâ†ÖöGVÆRÂW‡÷'G2’° ¦¥VW'’†gVæ7F–öâ‚B’° ¢f"FÆövõ7F–6·’ÂFÆövó°¢FÆövòÒB‚rææf&"Ö'&æB–Örr’æGG"‚w7&2r“° ¢v–æF÷ræöç67&öÆÂÒgVæ7F–öâ‚’°¢f"FVÆRÒB‚rææb×7F–6·’r“°¢f"F6Æ76W3°¢–b‚FVÆRæÆVæwF‚â’°¢F6Æ76W2Ò‚FVÆRæFF‚væb×7F–6·’Ö6Æ76W2r’’òFVÆRæFF‚væb×7F–6·’Ö6Æ76W2r’¢wv†—FRs°¢–b‚B‡v–æF÷r’ç67&öÆÅF÷‚’âS’°¢–b‚FÆövõ7F–6·’ÒFVÆRæFF‚væb×7F–6·’ÖÆövòr’’°¢B‚rææf&"Ö'&æB–Örr’æGG"‚w7&2rÂFÆövõ7F–6·’¢Ð¢FVÆRæFD6Æ72‚w7F–6·’6†F÷rr²F6Æ76W2“°¢ÒVÇ6R°¢FVÆRç&VÖ÷fT6Æ72‚w7F–6·’6†F÷rr²F6Æ76W2“°¢B‚rææf&"Ö'&æB–Örr’æGG"‚w7&2rÂFÆövò“°¢Ð¢Ð¢Ó°§Ò“° ¢ò¢¢¢òÒ¢ò¢¢¢¢¢¢òÒ“