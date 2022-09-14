import styled, { css, ThemeProvider } from 'styled-components';
import {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo
} from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useDebouncedCallback } from 'use-debounce';
import cn from 'classnames';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$o =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this;
  })() ||
  Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$m = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$l = fails$m;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$l(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return (
    Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7
  );
});

var fails$k = fails$m;

var functionBindNative = !fails$k(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = function () {
    /* empty */
  }.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$i = Function.prototype.call;

var functionCall = NATIVE_BIND$3
  ? call$i.bind(call$i)
  : function () {
      return call$i.apply(call$i, arguments);
    };

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG =
  getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V);
      return !!descriptor && descriptor.enumerable;
    }
  : $propertyIsEnumerable;

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var bind$5 = FunctionPrototype$2.bind;
var call$h = FunctionPrototype$2.call;
var uncurryThis$m = NATIVE_BIND$2 && bind$5.bind(call$h, call$h);

var functionUncurryThis = NATIVE_BIND$2
  ? function (fn) {
      return fn && uncurryThis$m(fn);
    }
  : function (fn) {
      return (
        fn &&
        function () {
          return call$h.apply(fn, arguments);
        }
      );
    };

var uncurryThis$l = functionUncurryThis;

var toString$8 = uncurryThis$l({}.toString);
var stringSlice$5 = uncurryThis$l(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$5(toString$8(it), 8, -1);
};

var uncurryThis$k = functionUncurryThis;
var fails$j = fails$m;
var classof$7 = classofRaw$1;

var $Object$4 = Object;
var split = uncurryThis$k(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$j(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
})
  ? function (it) {
      return classof$7(it) == 'String' ? split(it, '') : $Object$4(it);
    }
  : $Object$4;

var $TypeError$d = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$5 = function (it) {
  if (it == undefined) throw $TypeError$d("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$2 = indexedObject;
var requireObjectCoercible$4 = requireObjectCoercible$5;

var toIndexedObject$5 = function (it) {
  return IndexedObject$2(requireObjectCoercible$4(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$n = function (argument) {
  return typeof argument == 'function';
};

var isCallable$m = isCallable$n;

var isObject$9 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$m(it);
};

var global$n = global$o;
var isCallable$l = isCallable$n;

var aFunction = function (argument) {
  return isCallable$l(argument) ? argument : undefined;
};

var getBuiltIn$8 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(global$n[namespace])
    : global$n[namespace] && global$n[namespace][method];
};

var uncurryThis$j = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$j({}.isPrototypeOf);

var getBuiltIn$7 = getBuiltIn$8;

var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

var global$m = global$o;
var userAgent$3 = engineUserAgent;

var process$3 = global$m.process;
var Deno$1 = global$m.Deno;
var versions = (process$3 && process$3.versions) || (Deno$1 && Deno$1.version);
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es-x/no-symbol -- required for testing */

var V8_VERSION$1 = engineV8Version;
var fails$i = fails$m;

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var nativeSymbol =
  !!Object.getOwnPropertySymbols &&
  !fails$i(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return (
      !String(symbol) ||
      !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      (!Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41)
    );
  });

/* eslint-disable es-x/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid =
  NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var getBuiltIn$6 = getBuiltIn$8;
var isCallable$k = isCallable$n;
var isPrototypeOf$4 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
      return typeof it == 'symbol';
    }
  : function (it) {
      var $Symbol = getBuiltIn$6('Symbol');
      return (
        isCallable$k($Symbol) &&
        isPrototypeOf$4($Symbol.prototype, $Object$3(it))
      );
    };

var $String$3 = String;

var tryToString$4 = function (argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$j = isCallable$n;
var tryToString$3 = tryToString$4;

var $TypeError$c = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$8 = function (argument) {
  if (isCallable$j(argument)) return argument;
  throw $TypeError$c(tryToString$3(argument) + ' is not a function');
};

var aCallable$7 = aCallable$8;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$7(func);
};

var call$g = functionCall;
var isCallable$i = isCallable$n;
var isObject$8 = isObject$9;

var $TypeError$b = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (
    pref === 'string' &&
    isCallable$i((fn = input.toString)) &&
    !isObject$8((val = call$g(fn, input)))
  )
    return val;
  if (
    isCallable$i((fn = input.valueOf)) &&
    !isObject$8((val = call$g(fn, input)))
  )
    return val;
  if (
    pref !== 'string' &&
    isCallable$i((fn = input.toString)) &&
    !isObject$8((val = call$g(fn, input)))
  )
    return val;
  throw $TypeError$b("Can't convert object to primitive value");
};

var shared$4 = { exports: {} };

var global$l = global$o;

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$6 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$6(global$l, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global$l[key] = value;
  }
  return value;
};

var global$k = global$o;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$k[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.23.1',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.23.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$3 = requireObjectCoercible$5;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$5 = function (argument) {
  return $Object$2(requireObjectCoercible$3(argument));
};

var uncurryThis$i = functionUncurryThis;
var toObject$4 = toObject$5;

var hasOwnProperty = uncurryThis$i({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 =
  Object.hasOwn ||
  function hasOwn(it, key) {
    return hasOwnProperty(toObject$4(it), key);
  };

var uncurryThis$h = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$7 = uncurryThis$h((1.0).toString);

var uid$2 = function (key) {
  return (
    'Symbol(' +
    (key === undefined ? '' : key) +
    ')_' +
    toString$7(++id + postfix, 36)
  );
};

var global$j = global$o;
var shared$3 = shared$4.exports;
var hasOwn$b = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$3('wks');
var Symbol$2 = global$j.Symbol;
var symbolFor = Symbol$2 && Symbol$2['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$2
  : (Symbol$2 && Symbol$2.withoutSetter) || uid$1;

var wellKnownSymbol$i = function (name) {
  if (
    !hasOwn$b(WellKnownSymbolsStore, name) ||
    !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
  ) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$b(Symbol$2, name)) {
      WellKnownSymbolsStore[name] = Symbol$2[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }
  return WellKnownSymbolsStore[name];
};

var call$f = functionCall;
var isObject$7 = isObject$9;
var isSymbol$1 = isSymbol$2;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$h = wellKnownSymbol$i;

var $TypeError$a = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$7(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$f(exoticToPrim, input, pref);
    if (!isObject$7(result) || isSymbol$1(result)) return result;
    throw $TypeError$a("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$i = global$o;
var isObject$6 = isObject$9;

var document$3 = global$i.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$6(document$3) && isObject$6(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$b = descriptors;
var fails$h = fails$m;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine =
  !DESCRIPTORS$b &&
  !fails$h(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty(createElement$1('div'), 'a', {
        get: function () {
          return 7;
        }
      }).a != 7
    );
  });

var DESCRIPTORS$a = descriptors;
var call$e = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$a = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a
  ? $getOwnPropertyDescriptor$1
  : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$4(O);
      P = toPropertyKey$1(P);
      if (IE8_DOM_DEFINE$1)
        try {
          return $getOwnPropertyDescriptor$1(O, P);
        } catch (error) {
          /* empty */
        }
      if (hasOwn$a(O, P))
        return createPropertyDescriptor$2(
          !call$e(propertyIsEnumerableModule$1.f, O, P),
          O[P]
        );
    };

var objectDefineProperty = {};

var DESCRIPTORS$9 = descriptors;
var fails$g = fails$m;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug =
  DESCRIPTORS$9 &&
  fails$g(function () {
    // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty(
        function () {
          /* empty */
        },
        'prototype',
        {
          value: 42,
          writable: false
        }
      ).prototype != 42
    );
  });

var isObject$5 = isObject$9;

var $String$2 = String;
var $TypeError$9 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$e = function (argument) {
  if (isObject$5(argument)) return argument;
  throw $TypeError$9($String$2(argument) + ' is not an object');
};

var DESCRIPTORS$8 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$d = anObject$e;
var toPropertyKey = toPropertyKey$2;

var $TypeError$8 = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$8
  ? V8_PROTOTYPE_DEFINE_BUG$1
    ? function defineProperty(O, P, Attributes) {
        anObject$d(O);
        P = toPropertyKey(P);
        anObject$d(Attributes);
        if (
          typeof O === 'function' &&
          P === 'prototype' &&
          'value' in Attributes &&
          WRITABLE in Attributes &&
          !Attributes[WRITABLE]
        ) {
          var current = $getOwnPropertyDescriptor(O, P);
          if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
              configurable:
                CONFIGURABLE$1 in Attributes
                  ? Attributes[CONFIGURABLE$1]
                  : current[CONFIGURABLE$1],
              enumerable:
                ENUMERABLE in Attributes
                  ? Attributes[ENUMERABLE]
                  : current[ENUMERABLE],
              writable: false
            };
          }
        }
        return $defineProperty(O, P, Attributes);
      }
    : $defineProperty
  : function defineProperty(O, P, Attributes) {
      anObject$d(O);
      P = toPropertyKey(P);
      anObject$d(Attributes);
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {
          /* empty */
        }
      if ('get' in Attributes || 'set' in Attributes)
        throw $TypeError$8('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

var DESCRIPTORS$7 = descriptors;
var definePropertyModule$4 = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;

var createNonEnumerableProperty$6 = DESCRIPTORS$7
  ? function (object, key, value) {
      return definePropertyModule$4.f(
        object,
        key,
        createPropertyDescriptor$1(1, value)
      );
    }
  : function (object, key, value) {
      object[key] = value;
      return object;
    };

var makeBuiltIn$2 = { exports: {} };

var DESCRIPTORS$6 = descriptors;
var hasOwn$9 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$6 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$9(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER =
  EXISTS &&
  function something() {
    /* empty */
  }.name === 'something';
var CONFIGURABLE =
  EXISTS &&
  (!DESCRIPTORS$6 ||
    (DESCRIPTORS$6 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$g = functionUncurryThis;
var isCallable$h = isCallable$n;
var store$1 = sharedStore;

var functionToString = uncurryThis$g(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$h(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$4 = store$1.inspectSource;

var global$h = global$o;
var isCallable$g = isCallable$n;
var inspectSource$3 = inspectSource$4;

var WeakMap$1 = global$h.WeakMap;

var nativeWeakMap =
  isCallable$g(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

var shared$2 = shared$4.exports;
var uid = uid$2;

var keys$1 = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys$1[key] || (keys$1[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$g = global$o;
var uncurryThis$f = functionUncurryThis;
var isObject$4 = isObject$9;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;
var hasOwn$8 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$2 = global$g.TypeError;
var WeakMap = global$g.WeakMap;
var set$1, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
    }
    return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = uncurryThis$f(store.get);
  var wmhas = uncurryThis$f(store.has);
  var wmset = uncurryThis$f(store.set);
  set$1 = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$8(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$5(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$8(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$8(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var fails$f = fails$m;
var isCallable$f = isCallable$n;
var hasOwn$7 = hasOwnProperty_1;
var DESCRIPTORS$5 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$4;
var InternalStateModule$2 = internalState;

var enforceInternalState$1 = InternalStateModule$2.enforce;
var getInternalState$2 = InternalStateModule$2.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$5 = Object.defineProperty;

var CONFIGURABLE_LENGTH =
  DESCRIPTORS$5 &&
  !fails$f(function () {
    return (
      defineProperty$5(
        function () {
          /* empty */
        },
        'length',
        { value: 8 }
      ).length !== 8
    );
  });

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = (makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (
    !hasOwn$7(value, 'name') ||
    (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)
  ) {
    defineProperty$5(value, 'name', { value: name, configurable: true });
  }
  if (
    CONFIGURABLE_LENGTH &&
    options &&
    hasOwn$7(options, 'arity') &&
    value.length !== options.arity
  ) {
    defineProperty$5(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$7(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$5)
        defineProperty$5(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) {
    /* empty */
  }
  var state = enforceInternalState$1(value);
  if (!hasOwn$7(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  }
  return value;
});

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return (
    (isCallable$f(this) && getInternalState$2(this).source) ||
    inspectSource$2(this)
  );
}, 'toString');

var isCallable$e = isCallable$n;
var definePropertyModule$3 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$8 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$e(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    if (!options.unsafe) delete O[key];
    else if (O[key]) simple = true;
    if (simple) O[key] = value;
    else
      definePropertyModule$3.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
  }
  return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
var mathTrunc =
  Math.trunc ||
  function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$1 : ceil)(n);
  };

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$4 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

var max$1 = Math.max;
var min$2 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index);
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$2 = function (argument) {
  return argument > 0
    ? min$1(toIntegerOrInfinity$2(argument), 0x1fffffffffffff)
    : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$1 = toLength$2;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$3 = function (obj) {
  return toLength$1(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$3;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$3 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$2(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el)
          return IS_INCLUDES || index || 0;
      }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$3(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$3(false)
};

var uncurryThis$e = functionUncurryThis;
var hasOwn$6 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$1 = uncurryThis$e([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !hasOwn$6(hiddenKeys$2, key) && hasOwn$6(O, key) && push$1(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i)
    if (hasOwn$6(O, (key = names[i++]))) {
      ~indexOf$1(result, key) || push$1(result, key);
    }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f =
  Object.getOwnPropertyNames ||
  function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$5 = getBuiltIn$8;
var uncurryThis$d = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$c = anObject$e;

var concat$2 = uncurryThis$d([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 =
  getBuiltIn$5('Reflect', 'ownKeys') ||
  function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$c(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols
      ? concat$2(keys, getOwnPropertySymbols(it))
      : keys;
  };

var hasOwn$5 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$2.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$5(target, key) && !(exceptions && hasOwn$5(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$e = fails$m;
var isCallable$d = isCallable$n;

var replacement = /#|\.prototype\./;

var isForced$3 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL
    ? true
    : value == NATIVE
    ? false
    : isCallable$d(detection)
    ? fails$e(detection)
    : !!detection;
};

var normalize = (isForced$3.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
});

var data = (isForced$3.data = {});
var NATIVE = (isForced$3.NATIVE = 'N');
var POLYFILL = (isForced$3.POLYFILL = 'P');

var isForced_1 = isForced$3;

var global$f = global$o;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
var defineBuiltIn$7 = defineBuiltIn$8;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$2 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$f;
  } else if (STATIC) {
    target = global$f[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$f[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$2(
        GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
        options.forced
      );
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$4(sourceProperty, 'sham', true);
      }
      defineBuiltIn$7(target, key, sourceProperty, options);
    }
};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
var objectKeys$2 =
  Object.keys ||
  function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

var DESCRIPTORS$4 = descriptors;
var uncurryThis$c = functionUncurryThis;
var call$d = functionCall;
var fails$d = fails$m;
var objectKeys$1 = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$3 = toObject$5;
var IndexedObject$1 = indexedObject;

// eslint-disable-next-line es-x/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
var defineProperty$4 = Object.defineProperty;
var concat$1 = uncurryThis$c([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign =
  !$assign ||
  fails$d(function () {
    // should have correct order of operations (Edge bug)
    if (
      DESCRIPTORS$4 &&
      $assign(
        { b: 1 },
        $assign(
          defineProperty$4({}, 'a', {
            enumerable: true,
            get: function () {
              defineProperty$4(this, 'b', {
                value: 3,
                enumerable: false
              });
            }
          }),
          { b: 2 }
        )
      ).b !== 1
    )
      return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es-x/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) {
      B[chr] = chr;
    });
    return (
      $assign({}, A)[symbol] != 7 ||
      objectKeys$1($assign({}, B)).join('') != alphabet
    );
  })
    ? function assign(target, source) {
        // eslint-disable-line no-unused-vars -- required for `.length`
        var T = toObject$3(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        var propertyIsEnumerable = propertyIsEnumerableModule.f;
        while (argumentsLength > index) {
          var S = IndexedObject$1(arguments[index++]);
          var keys = getOwnPropertySymbols
            ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S))
            : objectKeys$1(S);
          var length = keys.length;
          var j = 0;
          var key;
          while (length > j) {
            key = keys[j++];
            if (!DESCRIPTORS$4 || call$d(propertyIsEnumerable, S, key))
              T[key] = S[key];
          }
        }
        return T;
      }
    : $assign;

var $$a = _export;
var assign = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es-x/no-object-assign -- required for testing
$$a(
  { target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign },
  {
    assign: assign
  }
);

const generalColors = {
  white: '#fff',
  primary: '#e2001a',
  active: '#960011'
};
const greys = {
  darkest: '#444444',
  darker: '#666666',
  dark: '#767676',
  medium: '#aaaaaa',
  middle: '#d1d1d1',
  light: '#d7d7d7',
  lighter: '#cccccc',
  lightest: '#fafafa'
};
const colors = {
  background: {
    primary: generalColors.white
  },
  general: Object.assign({}, generalColors, {
    black: '#3e3d40',
    grey: '#808285',
    // brand color 2
    light: '#f6f6f6',
    //  brand color 4
    secondary: generalColors.primary,
    error: '#C03344',
    link: generalColors.primary,
    hyperlink: greys.darkest,
    iconography: {
      primary: greys.dark,
      secondary: generalColors.white
    },
    interface: greys.light,
    interfaceDark: '#333333',
    text: greys.darker,
    opaques: {
      primary15: 'rgba(226, 0, 26, 0.15)'
    }
  }),
  greys
};
const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  hd: 1440,
  grid: {
    small: 500,
    medium: 700,
    large: 900
  }
};
const wrappers = {
  large: '1346px',
  medium: '1000px',
  small: '897px'
};
const paddings = {
  small: '1.25rem',
  vertical: {
    large: '2.5rem',
    xlarge: '5rem'
  }
};
const buttons = {
  colors: {
    primary: {
      idle: {
        background: colors.general.primary,
        border: colors.general.primary,
        text: colors.general.white
      },
      hover: {
        background: colors.general.primary,
        border: colors.general.primary,
        text: colors.general.white
      },
      active: {
        background: colors.general.active,
        border: colors.general.active,
        text: colors.general.white
      },
      disabled: {
        background: '#dfdfdf',
        border: '#dfdfdf',
        text: '#5f5c61'
      }
    },
    secondary: {
      idle: {
        background: colors.general.white,
        border: colors.general.primary,
        text: colors.general.primary
      },
      hover: {
        background: colors.general.white,
        border: colors.general.primary,
        text: colors.general.primary
      },
      active: {
        background: colors.general.white,
        border: colors.general.active,
        text: colors.general.primary
      },
      disabled: {
        background: colors.general.white,
        border: '#79747b',
        text: '#79747b'
      }
    }
  },
  border: {
    radius: '2em',
    width: '2px'
  }
};
const devices = {
  mobileOnly: `(max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  tabletOnly: `
    (min-width: ${breakpoints.tablet}px) and
    (max-width: ${breakpoints.desktop - 1}px)
  `,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
  desktopOnly: `
    (min-width: ${breakpoints.desktop}px) and
    (max-width: ${breakpoints.hd - 1}px)
  `,
  hd: `(min-width: ${breakpoints.hd}px)`,
  gridSmall: `(min-width: ${breakpoints.grid.small}px)`,
  gridMedium: `(min-width: ${breakpoints.grid.medium}px)`,
  gridLarge: `(min-width: ${breakpoints.grid.large}px)`
};
const fonts = {
  main: {
    family: `'RC Type', Arial, sans-serif`,
    regular: 300,
    medium: 500
  }
};
const typography = {
  mobile: {
    impact: {
      size: '2.5rem',
      lineHeight: '2.5rem'
    },
    h1: {
      size: '1.875rem',
      lineHeight: '2.5rem'
    },
    h2: {
      size: '1.625rem',
      lineHeight: '2rem'
    },
    h3: {
      size: '1.375rem',
      lineHeight: '2rem'
    },
    h4: {
      size: '1.125rem',
      lineHeight: '1.5rem'
    },
    h5: {
      size: '1rem',
      lineHeight: '1.5rem'
    },
    h6: {
      size: '0.85rem',
      lineHeight: '1.5rem'
    },
    p: {
      size: '1rem',
      lineHeight: '1.5'
    },
    lists: {
      size: '1em',
      lineHeight: '1.5'
    }
  },
  desktop: {
    impact: {
      size: '4.5rem',
      lineHeight: '5.5rem'
    },
    h1: {
      size: '2.5rem',
      lineHeight: '3.5rem'
    },
    h2: {
      size: '1.875rem;',
      lineHeight: '2.5rem'
    },
    h3: {
      size: '1.625rem',
      lineHeight: '2.5rem'
    },
    h4: {
      size: '1.25rem',
      lineHeight: '2rem'
    },
    h5: {
      size: '1.125rem',
      lineHeight: '1.5rem'
    },
    h6: {
      size: '1rem',
      lineHeight: '1.5rem'
    },
    p: {
      size: '1rem',
      lineHeight: '1rem'
    },
    lists: {
      size: '1em',
      lineHeight: '1.5'
    }
  },
  headingSpacing: '0.5em'
};
const navigation = {
  wrappers: {
    main: '1120px'
  }
};
const royalCaninTheme = {
  name: 'royalCaninTheme',
  colors: Object.assign({}, colors, {
    outline: 'transparent'
  }),
  fonts,
  navigation,
  typography,
  dir: 'ltr',
  buttons,
  animations: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  breakpoints,
  wrappers,
  devices,
  paddings
};

var objectDefineProperties = {};

var DESCRIPTORS$3 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$1 = objectDefineProperty;
var anObject$b = anObject$e;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
objectDefineProperties.f =
  DESCRIPTORS$3 && !V8_PROTOTYPE_DEFINE_BUG
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        anObject$b(O);
        var props = toIndexedObject$1(Properties);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index)
          definePropertyModule$1.f(O, (key = keys[index++]), props[key]);
        return O;
      };

var getBuiltIn$4 = getBuiltIn$8;

var html$2 = getBuiltIn$4('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var anObject$a = anObject$e;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }
  NullProtoObject =
    typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
var objectCreate =
  Object.create ||
  function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$a(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined
      ? result
      : definePropertiesModule.f(result, Properties);
  };

var wellKnownSymbol$g = wellKnownSymbol$i;
var create$2 = objectCreate;
var defineProperty$3 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$g('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty$3(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$2(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var fails$c = fails$m;

var correctPrototypeGetter = !fails$c(function () {
  function F() {
    /* empty */
  }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$4 = hasOwnProperty_1;
var isCallable$c = isCallable$n;
var toObject$2 = toObject$5;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object$1 = Object;
var ObjectPrototype = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER
  ? $Object$1.getPrototypeOf
  : function (O) {
      var object = toObject$2(O);
      if (hasOwn$4(object, IE_PROTO)) return object[IE_PROTO];
      var constructor = object.constructor;
      if (isCallable$c(constructor) && object instanceof constructor) {
        return constructor.prototype;
      }
      return object instanceof $Object$1 ? ObjectPrototype : null;
    };

var fails$b = fails$m;
var isCallable$b = isCallable$n;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$6 = defineBuiltIn$8;
var wellKnownSymbol$f = wellKnownSymbol$i;

var ITERATOR$6 = wellKnownSymbol$f('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(
      getPrototypeOf$1(arrayIterator)
    );
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
      IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE =
  IteratorPrototype$2 == undefined ||
  fails$b(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$6].call(test) !== test;
  });

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$b(IteratorPrototype$2[ITERATOR$6])) {
  defineBuiltIn$6(IteratorPrototype$2, ITERATOR$6, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$2 = objectDefineProperty.f;
var hasOwn$3 = hasOwnProperty_1;
var wellKnownSymbol$e = wellKnownSymbol$i;

var TO_STRING_TAG$3 = wellKnownSymbol$e('toStringTag');

var setToStringTag$3 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$3(target, TO_STRING_TAG$3)) {
    defineProperty$2(target, TO_STRING_TAG$3, {
      configurable: true,
      value: TAG
    });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$1 = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$3;
var setToStringTag$2 = setToStringTag$3;
var Iterators$4 = iterators;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor$1 = function (
  IteratorConstructor,
  NAME,
  next,
  ENUMERABLE_NEXT
) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$1(IteratorPrototype$1, {
    next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next)
  });
  setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isCallable$a = isCallable$n;

var $String$1 = String;
var $TypeError$7 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$a(argument)) return argument;
  throw $TypeError$7("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$b = functionUncurryThis;
var anObject$9 = anObject$e;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
var objectSetPrototypeOf =
  Object.setPrototypeOf ||
  ('__proto__' in {}
    ? (function () {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
          // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
          setter = uncurryThis$b(
            Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set
          );
          setter(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) {
          /* empty */
        }
        return function setPrototypeOf(O, proto) {
          anObject$9(O);
          aPossiblePrototype(proto);
          if (CORRECT_SETTER) setter(O, proto);
          else O.__proto__ = proto;
          return O;
        };
      })()
    : undefined);

var $$9 = _export;
var call$c = functionCall;
var FunctionName = functionName;
var isCallable$9 = isCallable$n;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$2 = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$3;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;
var defineBuiltIn$5 = defineBuiltIn$8;
var wellKnownSymbol$d = wellKnownSymbol$i;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$5 = wellKnownSymbol$d('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () {
  return this;
};

var defineIterator$1 = function (
  Iterable,
  NAME,
  IteratorConstructor,
  next,
  DEFAULT,
  IS_SET,
  FORCED
) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
      return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };
      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };
      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }
    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator =
    IterablePrototype[ITERATOR$5] ||
    IterablePrototype['@@iterator'] ||
    (DEFAULT && IterablePrototype[DEFAULT]);
  var defaultIterator =
    (!BUGGY_SAFARI_ITERATORS && nativeIterator) || getIterationMethod(DEFAULT);
  var anyNativeIterator =
    NAME == 'Array'
      ? IterablePrototype.entries || nativeIterator
      : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(
      anyNativeIterator.call(new Iterable())
    );
    if (
      CurrentIteratorPrototype !== Object.prototype &&
      CurrentIteratorPrototype.next
    ) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$2) {
          setPrototypeOf$2(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$9(CurrentIteratorPrototype[ITERATOR$5])) {
          defineBuiltIn$5(CurrentIteratorPrototype, ITERATOR$5, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (
    PROPER_FUNCTION_NAME$1 &&
    DEFAULT == VALUES &&
    nativeIterator &&
    nativeIterator.name !== VALUES
  ) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$3(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() {
        return call$c(nativeIterator, this);
      };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED)
      for (KEY in methods) {
        if (
          BUGGY_SAFARI_ITERATORS ||
          INCORRECT_VALUES_NAME ||
          !(KEY in IterablePrototype)
        ) {
          defineBuiltIn$5(IterablePrototype, KEY, methods[KEY]);
        }
      }
    else
      $$9(
        {
          target: NAME,
          proto: true,
          forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
        },
        methods
      );
  }

  // define iterator
  if (IterablePrototype[ITERATOR$5] !== defaultIterator) {
    defineBuiltIn$5(IterablePrototype, ITERATOR$5, defaultIterator, {
      name: DEFAULT
    });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

var toIndexedObject = toIndexedObject$5;
var addToUnscopables = addToUnscopables$1;
var Iterators$2 = iterators;
var InternalStateModule$1 = internalState;
var defineProperty$1 = objectDefineProperty.f;
var defineIterator = defineIterator$1;
var DESCRIPTORS$2 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(
  Array,
  'Array',
  function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated), // target
      index: 0, // next index
      kind: kind // kind
    });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  },
  function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return { value: undefined, done: true };
    }
    if (kind == 'keys') return { value: index, done: false };
    if (kind == 'values') return { value: target[index], done: false };
    return { value: [index, target[index]], done: false };
  },
  'values'
);

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = (Iterators$2.Arguments = Iterators$2.Array);

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$2 && values.name !== 'values')
  try {
    defineProperty$1(values, 'name', { value: 'values' });
  } catch (error) {
    /* empty */
  }

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 =
  classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype =
  DOMTokenListPrototype$1 === Object.prototype
    ? undefined
    : DOMTokenListPrototype$1;

var global$e = global$o;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
var wellKnownSymbol$c = wellKnownSymbol$i;

var ITERATOR$4 = wellKnownSymbol$c('iterator');
var TO_STRING_TAG$2 = wellKnownSymbol$c('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$4] !== ArrayValues)
      try {
        createNonEnumerableProperty$2(
          CollectionPrototype,
          ITERATOR$4,
          ArrayValues
        );
      } catch (error) {
        CollectionPrototype[ITERATOR$4] = ArrayValues;
      }
    if (!CollectionPrototype[TO_STRING_TAG$2]) {
      createNonEnumerableProperty$2(
        CollectionPrototype,
        TO_STRING_TAG$2,
        COLLECTION_NAME
      );
    }
    if (DOMIterables[COLLECTION_NAME])
      for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (
          CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]
        )
          try {
            createNonEnumerableProperty$2(
              CollectionPrototype,
              METHOD_NAME,
              ArrayIteratorMethods[METHOD_NAME]
            );
          } catch (error) {
            CollectionPrototype[METHOD_NAME] =
              ArrayIteratorMethods[METHOD_NAME];
          }
      }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(
    global$e[COLLECTION_NAME] && global$e[COLLECTION_NAME].prototype,
    COLLECTION_NAME
  );
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

let actions;
(function (a) {
  (a.SET_PANEL = 'SET_PANEL'),
    (a.SELECTED_COUNTRY = 'SELECTED_COUNTRY'),
    (a.SET_COUNTRY_SELECTOR_DATA = 'SET_COUNTRY_SELECTOR_DATA');
})(actions || (actions = {}));

const reducer = (a, b) => {
  switch (b.type) {
    case actions.SET_PANEL:
      return Object.assign({}, a, b.payload);
    case actions.SELECTED_COUNTRY:
      return Object.assign({}, a, b.payload);
    case actions.SET_COUNTRY_SELECTOR_DATA:
      return Object.assign({}, a, b.payload);
  }
};

const initialState = {
  panelIsOpen: !1,
  selectedCountry: '',
  countrySelectorData: {},
  setPanel: () => void 0,
  setSelectedCountry: () => void 0,
  setCountrySelectorData: () => void 0
};
const CountrySelectorContext = /*#__PURE__*/ createContext({});
const setPanelStatus = (a, b) => {
  a({ type: actions.SET_PANEL, payload: { panelIsOpen: b } });
};
const setSelectedCountryText = (a, b) => {
  a({ type: actions.SELECTED_COUNTRY, payload: { selectedCountry: b } });
};
const setCountrySelectorTextData = (a, b) => {
  a({
    type: actions.SET_COUNTRY_SELECTOR_DATA,
    payload: { countrySelectorData: b }
  });
};
const CountrySelectorProvider = ({ children: a }) => {
  const [b, c] = useReducer(reducer, initialState),
    d = {
      state: Object.assign({}, b, {
        setPanel: (a) => {
          setPanelStatus(c, a);
        },
        setSelectedCountry: (a) => {
          setSelectedCountryText(c, a);
        },
        setCountrySelectorData: (a) => {
          setCountrySelectorTextData(c, a);
        }
      }),
      dispatch: () => void 0
    };
  return /*#__PURE__*/ jsx(CountrySelectorContext.Provider, {
    value: d,
    children: a
  });
};

const useCountrySelectorContext = () => useContext(CountrySelectorContext);

const ExportedComponentsProvider = ({ children: a }) =>
  /*#__PURE__*/ jsx(CountrySelectorProvider, { children: a });

const defaultRenderLink = (a, b, c) =>
  a &&
  /*#__PURE__*/ jsxs('a', {
    onClick: c,
    href: a.href,
    title: a.title,
    className: a.className,
    children: [b, a.text]
  });
const LinkContext = /*#__PURE__*/ createContext({
  renderLink: defaultRenderLink
});
const LinkContextProvider = ({ renderLink: a, children: b }) => {
  return /*#__PURE__*/ jsx(LinkContext.Provider, {
    value: { renderLink: a },
    children: b
  });
};

var classof$6 = classofRaw$1;
var global$d = global$o;

var engineIsNode = classof$6(global$d.process) == 'process';

var getBuiltIn$3 = getBuiltIn$8;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$b = wellKnownSymbol$i;
var DESCRIPTORS$1 = descriptors;

var SPECIES$3 = wellKnownSymbol$b('species');

var setSpecies$2 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var isPrototypeOf$3 = objectIsPrototypeOf;

var $TypeError$6 = TypeError;

var anInstance$1 = function (it, Prototype) {
  if (isPrototypeOf$3(Prototype, it)) return it;
  throw $TypeError$6('Incorrect invocation');
};

var wellKnownSymbol$a = wellKnownSymbol$i;

var TO_STRING_TAG$1 = wellKnownSymbol$a('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$8 = isCallable$n;
var classofRaw = classofRaw$1;
var wellKnownSymbol$9 = wellKnownSymbol$i;

var TO_STRING_TAG = wellKnownSymbol$9('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS =
  classofRaw(
    (function () {
      return arguments;
    })()
  ) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$5 = TO_STRING_TAG_SUPPORT
  ? classofRaw
  : function (it) {
      var O, tag, result;
      return it === undefined
        ? 'Undefined'
        : it === null
        ? 'Null'
        : // @@toStringTag case
        typeof (tag = tryGet((O = $Object(it)), TO_STRING_TAG)) == 'string'
        ? tag
        : // builtinTag case
        CORRECT_ARGUMENTS
        ? classofRaw(O)
        : // ES3 arguments fallback
        (result = classofRaw(O)) == 'Object' && isCallable$8(O.callee)
        ? 'Arguments'
        : result;
    };

var uncurryThis$a = functionUncurryThis;
var fails$a = fails$m;
var isCallable$7 = isCallable$n;
var classof$4 = classof$5;
var getBuiltIn$2 = getBuiltIn$8;
var inspectSource$1 = inspectSource$4;

var noop = function () {
  /* empty */
};
var empty = [];
var construct = getBuiltIn$2('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$3 = uncurryThis$a(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$7(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$7(argument)) return false;
  switch (classof$4(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return (
      INCORRECT_TO_STRING ||
      !!exec$3(constructorRegExp, inspectSource$1(argument))
    );
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 =
  !construct ||
  fails$a(function () {
    var called;
    return (
      isConstructorModern(isConstructorModern.call) ||
      !isConstructorModern(Object) ||
      !isConstructorModern(function () {
        called = true;
      }) ||
      called
    );
  })
    ? isConstructorLegacy
    : isConstructorModern;

var isConstructor = isConstructor$1;
var tryToString$2 = tryToString$4;

var $TypeError$5 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError$5(tryToString$2(argument) + ' is not a constructor');
};

var anObject$8 = anObject$e;
var aConstructor = aConstructor$1;
var wellKnownSymbol$8 = wellKnownSymbol$i;

var SPECIES$2 = wellKnownSymbol$8('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$8(O).constructor;
  var S;
  return C === undefined || (S = anObject$8(C)[SPECIES$2]) == undefined
    ? defaultConstructor
    : aConstructor(S);
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$2 = FunctionPrototype.apply;
var call$b = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
var functionApply =
  (typeof Reflect == 'object' && Reflect.apply) ||
  (NATIVE_BIND$1
    ? call$b.bind(apply$2)
    : function () {
        return call$b.apply(apply$2, arguments);
      });

var uncurryThis$9 = functionUncurryThis;
var aCallable$6 = aCallable$8;
var NATIVE_BIND = functionBindNative;

var bind$4 = uncurryThis$9(uncurryThis$9.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$6(fn);
  return that === undefined
    ? fn
    : NATIVE_BIND
    ? bind$4(fn, that)
    : function (/* ...args */) {
        return fn.apply(that, arguments);
      };
};

var uncurryThis$8 = functionUncurryThis;

var arraySlice$1 = uncurryThis$8([].slice);

var $TypeError$4 = TypeError;

var validateArgumentsLength$1 = function (passed, required) {
  if (passed < required) throw $TypeError$4('Not enough arguments');
  return passed;
};

var userAgent$2 = engineUserAgent;

var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

var global$c = global$o;
var apply$1 = functionApply;
var bind$3 = functionBindContext;
var isCallable$6 = isCallable$n;
var hasOwn$2 = hasOwnProperty_1;
var fails$9 = fails$m;
var html = html$2;
var arraySlice = arraySlice$1;
var createElement = documentCreateElement$2;
var validateArgumentsLength = validateArgumentsLength$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$3 = engineIsNode;

var set = global$c.setImmediate;
var clear = global$c.clearImmediate;
var process$2 = global$c.process;
var Dispatch = global$c.Dispatch;
var Function$1 = global$c.Function;
var MessageChannel = global$c.MessageChannel;
var String$1 = global$c.String;
var counter = 0;
var queue$1 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global$c.location;
} catch (error) {
  /* empty */
}

var run = function (id) {
  if (hasOwn$2(queue$1, id)) {
    var fn = queue$1[id];
    delete queue$1[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$c.postMessage(String$1(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable$6(handler) ? handler : Function$1(handler);
    var args = arraySlice(arguments, 1);
    queue$1[++counter] = function () {
      apply$1(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue$1[id];
  };
  // Node.js 0.8-
  if (IS_NODE$3) {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$3(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$c.addEventListener &&
    isCallable$6(global$c.postMessage) &&
    !global$c.importScripts &&
    location &&
    location.protocol !== 'file:' &&
    !fails$9(post)
  ) {
    defer = post;
    global$c.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] =
        function () {
          html.removeChild(this);
          run(id);
        };
    };
    // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var userAgent$1 = engineUserAgent;
var global$b = global$o;

var engineIsIosPebble =
  /ipad|iphone|ipod/i.test(userAgent$1) && global$b.Pebble !== undefined;

var userAgent = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

var global$a = global$o;
var bind$2 = functionBindContext;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$2 = engineIsNode;

var MutationObserver =
  global$a.MutationObserver || global$a.WebKitMutationObserver;
var document$2 = global$a.document;
var process$1 = global$a.process;
var Promise$1 = global$a.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(
  global$a,
  'queueMicrotask'
);
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$2 && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    }
    last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (
    !IS_IOS &&
    !IS_NODE$2 &&
    !IS_WEBOS_WEBKIT &&
    MutationObserver &&
    document$2
  ) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = bind$2(promise.then, promise);
    notify$1 = function () {
      then(flush);
    };
    // Node.js without promises
  } else if (IS_NODE$2) {
    notify$1 = function () {
      process$1.nextTick(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessage
    // - onreadystatechange
    // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind$2(macrotask, global$a);
    notify$1 = function () {
      macrotask(flush);
    };
  }
}

var microtask$1 =
  queueMicrotask ||
  function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify$1();
    }
    last = task;
  };

var global$9 = global$o;

var hostReportErrors$1 = function (a, b) {
  var console = global$9.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var Queue$1 = function () {
  this.head = null;
  this.tail = null;
};

Queue$1.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

var queue = Queue$1;

var global$8 = global$o;

var promiseNativeConstructor = global$8.Promise;

var engineIsBrowser = typeof window == 'object' && typeof Deno != 'object';

var global$7 = global$o;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$5 = isCallable$n;
var isForced$1 = isForced_1;
var inspectSource = inspectSource$4;
var wellKnownSymbol$7 = wellKnownSymbol$i;
var IS_BROWSER = engineIsBrowser;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$7('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$5(
  global$7.PromiseRejectionEvent
);

var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$1('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
  var GLOBAL_CORE_JS_PROMISE =
    PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE))
    return false;
  // Detect correctness of subclassing with @@species support
  var promise = new NativePromiseConstructor$3(function (resolve) {
    resolve(1);
  });
  var FakePromise = function (exec) {
    exec(
      function () {
        /* empty */
      },
      function () {
        /* empty */
      }
    );
  };
  var constructor = (promise.constructor = {});
  constructor[SPECIES$1] = FakePromise;
  SUBCLASSING =
    promise.then(function () {
      /* empty */
    }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return (
    !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_PROMISE_REJECTION_EVENT$1
  );
});

var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING: SUBCLASSING
};

var newPromiseCapability$2 = {};

var aCallable$5 = aCallable$8;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined)
      throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$5(resolve);
  this.reject = aCallable$5(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$8 = _export;
var IS_NODE$1 = engineIsNode;
var global$6 = global$o;
var call$a = functionCall;
var defineBuiltIn$4 = defineBuiltIn$8;
var setPrototypeOf$1 = objectSetPrototypeOf;
var setToStringTag = setToStringTag$3;
var setSpecies$1 = setSpecies$2;
var aCallable$4 = aCallable$8;
var isCallable$4 = isCallable$n;
var isObject$3 = isObject$9;
var anInstance = anInstance$1;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask$1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue;
var InternalStateModule = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT =
  PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype$1 =
  NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$1 = global$6.TypeError;
var document$1 = global$6.document;
var process = global$6.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(
  document$1 &&
  document$1.createEvent &&
  global$6.dispatchEvent
);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject$3(it) && isCallable$4((then = it.then)) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError$1('Promise-chain cycle'));
      } else if ((then = isThenable(result))) {
        call$a(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while ((reaction = reactions.get())) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$6.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$6['on' + name]))
    handler(event);
  else if (name === UNHANDLED_REJECTION)
    hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$a(task, global$6, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE$1) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call$a(task, global$6, function () {
    var promise = state.facade;
    if (IS_NODE$1) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$1 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value)
      throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$a(
            then,
            value,
            bind$1(internalResolve, wrapper, state),
            bind$1(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable$4(executor);
    call$a(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn$4(
    PromisePrototype,
    'then',
    function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability$1(
        speciesConstructor(this, PromiseConstructor)
      );
      state.parent = true;
      reaction.ok = isCallable$4(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable$4(onRejected) && onRejected;
      reaction.domain = IS_NODE$1 ? process.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);
      else
        microtask(function () {
          callReaction(reaction, state);
        });
      return reaction.promise;
    }
  );

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind$1(internalResolve, state);
    this.reject = bind$1(internalReject, state);
  };

  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (
    isCallable$4(NativePromiseConstructor$2) &&
    NativePromisePrototype$1 !== Object.prototype
  ) {
    nativeThen = NativePromisePrototype$1.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn$4(
        NativePromisePrototype$1,
        'then',
        function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            call$a(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected);
          // https://github.com/zloirock/core-js/issues/640
        },
        { unsafe: true }
      );
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) {
      /* empty */
    }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf$1) {
      setPrototypeOf$1(NativePromisePrototype$1, PromisePrototype);
    }
  }
}

$$8(
  {
    global: true,
    constructor: true,
    wrap: true,
    forced: FORCED_PROMISE_CONSTRUCTOR$4
  },
  {
    Promise: PromiseConstructor
  }
);

setToStringTag(PromiseConstructor, PROMISE, false);
setSpecies$1(PROMISE);

var wellKnownSymbol$6 = wellKnownSymbol$i;
var Iterators$1 = iterators;

var ITERATOR$3 = wellKnownSymbol$6('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return (
    it !== undefined &&
    (Iterators$1.Array === it || ArrayPrototype[ITERATOR$3] === it)
  );
};

var classof$3 = classof$5;
var getMethod$2 = getMethod$4;
var Iterators = iterators;
var wellKnownSymbol$5 = wellKnownSymbol$i;

var ITERATOR$2 = wellKnownSymbol$5('iterator');

var getIteratorMethod$2 = function (it) {
  if (it != undefined)
    return (
      getMethod$2(it, ITERATOR$2) ||
      getMethod$2(it, '@@iterator') ||
      Iterators[classof$3(it)]
    );
};

var call$9 = functionCall;
var aCallable$3 = aCallable$8;
var anObject$7 = anObject$e;
var tryToString$1 = tryToString$4;
var getIteratorMethod$1 = getIteratorMethod$2;

var $TypeError$3 = TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod =
    arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$3(iteratorMethod))
    return anObject$7(call$9(iteratorMethod, argument));
  throw $TypeError$3(tryToString$1(argument) + ' is not iterable');
};

var call$8 = functionCall;
var anObject$6 = anObject$e;
var getMethod$1 = getMethod$4;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$6(iterator);
  try {
    innerResult = getMethod$1(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$8(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$6(innerResult);
  return value;
};

var bind = functionBindContext;
var call$7 = functionCall;
var anObject$5 = anObject$e;
var tryToString = tryToString$4;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike$1 = lengthOfArrayLike$3;
var isPrototypeOf$2 = objectIsPrototypeOf;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var $TypeError$2 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$2 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$5(value);
      return INTERRUPTED
        ? fn(value[0], value[1], stop)
        : fn(value[0], value[1]);
    }
    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError$2(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (
        index = 0, length = lengthOfArrayLike$1(iterable);
        length > index;
        index++
      ) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$2(ResultPrototype, result)) return result;
      }
      return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = call$7(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (
      typeof result == 'object' &&
      result &&
      isPrototypeOf$2(ResultPrototype, result)
    )
      return result;
  }
  return new Result(false);
};

var wellKnownSymbol$4 = wellKnownSymbol$i;

var ITERATOR$1 = wellKnownSymbol$4('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    return: function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$1] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$1] = function () {
      return {
        next: function () {
          return { done: (ITERATION_SUPPORT = true) };
        }
      };
    };
    exec(object);
  } catch (error) {
    /* empty */
  }
  return ITERATION_SUPPORT;
};

var NativePromiseConstructor$1 = promiseNativeConstructor;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration =
  FORCED_PROMISE_CONSTRUCTOR$3 ||
  !checkCorrectnessOfIteration(function (iterable) {
    NativePromiseConstructor$1.all(iterable).then(undefined, function () {
      /* empty */
    });
  });

var $$7 = _export;
var call$6 = functionCall;
var aCallable$2 = aCallable$8;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$1 = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$7(
  {
    target: 'Promise',
    stat: true,
    forced: PROMISE_STATICS_INCORRECT_ITERATION$1
  },
  {
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$2.f(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform$1(function () {
        var $promiseResolve = aCallable$2(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate$1(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call$6($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  }
);

var $$6 = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$8;
var isCallable$3 = isCallable$n;
var defineBuiltIn$3 = defineBuiltIn$8;

var NativePromisePrototype =
  NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$6(
  {
    target: 'Promise',
    proto: true,
    forced: FORCED_PROMISE_CONSTRUCTOR$2,
    real: true
  },
  {
    catch: function (onRejected) {
      return this.then(undefined, onRejected);
    }
  }
);

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$3(NativePromiseConstructor)) {
  var method = getBuiltIn$1('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn$3(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

var $$5 = _export;
var call$5 = functionCall;
var aCallable$1 = aCallable$8;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$5(
  {
    target: 'Promise',
    stat: true,
    forced: PROMISE_STATICS_INCORRECT_ITERATION
  },
  {
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapabilityModule$1.f(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable$1(C.resolve);
        iterate(iterable, function (promise) {
          call$5($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  }
);

var $$4 = _export;
var call$4 = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$4(
  { target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 },
  {
    reject: function reject(r) {
      var capability = newPromiseCapabilityModule.f(this);
      call$4(capability.reject, undefined, r);
      return capability.promise;
    }
  }
);

var anObject$4 = anObject$e;
var isObject$2 = isObject$9;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$4(C);
  if (isObject$2(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$3 = _export;
var getBuiltIn = getBuiltIn$8;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;

getBuiltIn('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$3(
  { target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR },
  {
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  }
);

const fetchData = async (a) => {
  try {
    return await fetch(a).then((a) => a.json());
  } catch (a) {
    return console.error(a), {};
  }
};

const fetchFooterContentDelivery = async (a, b, c) =>
  fetchData(`${c}/rc-api/navigation/footer?sc_site=${a}&sc_lang=${b}`);
const fetchFooterRenderingHost = async (a, b, c) =>
  fetchData(`${c || ''}/${a}/${b}/rc-api/navigation/footer`);

const useFooterApi = (a, b, c, d) => {
  const [e, f] = useState(a),
    { current: g } = useRef(() =>
      fetchFooterRenderingHost(b, c, d).then((a) => f(a))
    );
  return (
    useEffect(() => {
      e.footer || g();
    }, [g, e.footer]),
    e
  );
};

const useLinkContext = () => {
  const { renderLink: a } = useContext(LinkContext);
  return { renderLink: a };
};

var classof$2 = classof$5;

var $String = String;

var toString$6 = function (argument) {
  if (classof$2(argument) === 'Symbol')
    throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

// a string of all valid unicode whitespaces
var whitespaces$2 =
  '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var uncurryThis$7 = functionUncurryThis;
var requireObjectCoercible$2 = requireObjectCoercible$5;
var toString$5 = toString$6;
var whitespaces$1 = whitespaces$2;

var replace$3 = uncurryThis$7(''.replace);
var whitespace = '[' + whitespaces$1 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$2 = function (TYPE) {
  return function ($this) {
    var string = toString$5(requireObjectCoercible$2($this));
    if (TYPE & 1) string = replace$3(string, ltrim, '');
    if (TYPE & 2) string = replace$3(string, rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$2(3)
};

var global$5 = global$o;
var fails$8 = fails$m;
var uncurryThis$6 = functionUncurryThis;
var toString$4 = toString$6;
var trim = stringTrim.trim;
var whitespaces = whitespaces$2;

var $parseInt$1 = global$5.parseInt;
var Symbol$1 = global$5.Symbol;
var ITERATOR = Symbol$1 && Symbol$1.iterator;
var hex = /^[+-]?0x/i;
var exec$2 = uncurryThis$6(hex.exec);
var FORCED =
  $parseInt$1(whitespaces + '08') !== 8 ||
  $parseInt$1(whitespaces + '0x16') !== 22 ||
  // MS Edge 18- broken with boxed symbols
  (ITERATOR &&
    !fails$8(function () {
      $parseInt$1(Object(ITERATOR));
    }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED
  ? function parseInt(string, radix) {
      var S = trim(toString$4(string));
      return $parseInt$1(S, radix >>> 0 || (exec$2(hex, S) ? 16 : 10));
    }
  : $parseInt$1;

var $$2 = _export;
var $parseInt = numberParseInt;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$$2(
  { global: true, forced: parseInt != $parseInt },
  {
    parseInt: $parseInt
  }
);

const toRemString = (px) => ((px || 0) !== 0 ? `${px / 16}rem` : '0');

const pxToRem = (...px) => px.map(toRemString).join(' ');

var aCallable = aCallable$8;
var toObject$1 = toObject$5;
var IndexedObject = indexedObject;
var lengthOfArrayLike = lengthOfArrayLike$3;

var $TypeError$1 = TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$1 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject$1(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2)
      while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw $TypeError$1('Reduce of empty array with no initial value');
        }
      }
    for (; IS_RIGHT ? index >= 0 : length > index; index += i)
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod$1(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod$1(true)
};

var fails$7 = fails$m;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return (
    !!method &&
    fails$7(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(
        null,
        argument ||
          function () {
            return 1;
          },
        1
      );
    })
  );
};

var $$1 = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$$1(
  { target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG },
  {
    reduce: function reduce(callbackfn /* , initialValue */) {
      var length = arguments.length;
      return $reduce(
        this,
        callbackfn,
        length,
        length > 1 ? arguments[1] : undefined
      );
    }
  }
);

var anObject$3 = anObject$e;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$3(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var fails$6 = fails$m;
var global$4 = global$o;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$4.RegExp;

var UNSUPPORTED_Y$2 = fails$6(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY$1 =
  UNSUPPORTED_Y$2 ||
  fails$6(function () {
    return !$RegExp$2('a', 'y').sticky;
  });

var BROKEN_CARET =
  UNSUPPORTED_Y$2 ||
  fails$6(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY$1,
  UNSUPPORTED_Y: UNSUPPORTED_Y$2
};

var fails$5 = fails$m;
var global$3 = global$o;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$3.RegExp;

var regexpUnsupportedDotAll = fails$5(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$4 = fails$m;
var global$2 = global$o;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$2.RegExp;

var regexpUnsupportedNcg = fails$4(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$3 = functionCall;
var uncurryThis$5 = functionUncurryThis;
var toString$3 = toString$6;
var regexpFlags = regexpFlags$1;
var stickyHelpers$1 = regexpStickyHelpers;
var shared = shared$4.exports;
var create = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$4 = uncurryThis$5(''.charAt);
var indexOf = uncurryThis$5(''.indexOf);
var replace$2 = uncurryThis$5(''.replace);
var stringSlice$4 = uncurryThis$5(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$3(nativeExec, re1, 'a');
  call$3(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH =
  UPDATES_LAST_INDEX_WRONG ||
  NPCG_INCLUDED ||
  UNSUPPORTED_Y$1 ||
  UNSUPPORTED_DOT_ALL$1 ||
  UNSUPPORTED_NCG$1;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString$3(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$3(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = call$3(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$2(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$4(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (
        re.lastIndex > 0 &&
        (!re.multiline ||
          (re.multiline && charAt$4(str, re.lastIndex - 1) !== '\n'))
      ) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$3(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$4(match.input, charsAdded);
        match[0] = stringSlice$4(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call$3(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $ = _export;
var exec$1 = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$(
  { target: 'RegExp', proto: true, forced: /./.exec !== exec$1 },
  {
    exec: exec$1
  }
);

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$4 = functionUncurryThis;
var defineBuiltIn$2 = defineBuiltIn$8;
var regexpExec$1 = regexpExec$2;
var fails$3 = fails$m;
var wellKnownSymbol$3 = wellKnownSymbol$i;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;

var SPECIES = wellKnownSymbol$3('species');
var RegExpPrototype$3 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$3(KEY);

  var DELEGATES_TO_SYMBOL = !fails$3(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () {
      return 7;
    };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC =
    DELEGATES_TO_SYMBOL &&
    !fails$3(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () {
          return re;
        };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () {
        execCalled = true;
        return null;
      };

      re[SYMBOL]('');
      return !execCalled;
    });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
    var uncurriedNativeRegExpMethod = uncurryThis$4(/./[SYMBOL]);
    var methods = exec(
      SYMBOL,
      ''[KEY],
      function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$4(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype$3.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: uncurriedNativeRegExpMethod(regexp, str, arg2)
            };
          }
          return {
            done: true,
            value: uncurriedNativeMethod(str, regexp, arg2)
          };
        }
        return { done: false };
      }
    );

    defineBuiltIn$2(String.prototype, KEY, methods[0]);
    defineBuiltIn$2(RegExpPrototype$3, SYMBOL, methods[1]);
  }

  if (SHAM)
    createNonEnumerableProperty$1(RegExpPrototype$3[SYMBOL], 'sham', true);
};

var uncurryThis$3 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var toString$2 = toString$6;
var requireObjectCoercible$1 = requireObjectCoercible$5;

var charAt$3 = uncurryThis$3(''.charAt);
var charCodeAt = uncurryThis$3(''.charCodeAt);
var stringSlice$3 = uncurryThis$3(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size)
      return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xd800 ||
      first > 0xdbff ||
      position + 1 === size ||
      (second = charCodeAt(S, position + 1)) < 0xdc00 ||
      second > 0xdfff
      ? CONVERT_TO_STRING
        ? charAt$3(S, position)
        : first
      : CONVERT_TO_STRING
      ? stringSlice$3(S, position, position + 2)
      : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

var charAt$2 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$2(S, index).length : 1);
};

var uncurryThis$2 = functionUncurryThis;
var toObject = toObject$5;

var floor = Math.floor;
var charAt$1 = uncurryThis$2(''.charAt);
var replace$1 = uncurryThis$2(''.replace);
var stringSlice$2 = uncurryThis$2(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (
  matched,
  str,
  position,
  captures,
  namedCaptures,
  replacement
) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace$1(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt$1(ch, 0)) {
      case '$':
        return '$';
      case '&':
        return matched;
      case '`':
        return stringSlice$2(str, 0, position);
      case "'":
        return stringSlice$2(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$2(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m)
            return captures[f - 1] === undefined
              ? charAt$1(ch, 1)
              : captures[f - 1] + charAt$1(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var call$2 = functionCall;
var anObject$2 = anObject$e;
var isCallable$2 = isCallable$n;
var classof$1 = classofRaw$1;
var regexpExec = regexpExec$2;

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$2(exec)) {
    var result = call$2(exec, R, S);
    if (result !== null) anObject$2(result);
    return result;
  }
  if (classof$1(R) === 'RegExp') return call$2(regexpExec, R, S);
  throw $TypeError('RegExp#exec called on incompatible receiver');
};

var apply = functionApply;
var call$1 = functionCall;
var uncurryThis$1 = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails$2 = fails$m;
var anObject$1 = anObject$e;
var isCallable$1 = isCallable$n;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toLength = toLength$2;
var toString$1 = toString$6;
var requireObjectCoercible = requireObjectCoercible$5;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$4;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol$2 = wellKnownSymbol$i;

var REPLACE = wellKnownSymbol$2('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis$1([].concat);
var push = uncurryThis$1([].push);
var stringIndexOf$1 = uncurryThis$1(''.indexOf);
var stringSlice$1 = uncurryThis$1(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$2(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic(
  'replace',
  function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      ? '$'
      : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer =
          searchValue == undefined
            ? undefined
            : getMethod(searchValue, REPLACE);
        return replacer
          ? call$1(replacer, searchValue, O, replaceValue)
          : call$1(nativeReplace, toString$1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject$1(this);
        var S = toString$1(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf$1(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable$1(replaceValue);
        if (!functionalReplace) replaceValue = toString$1(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;

          push(results, result);
          if (!global) break;

          var matchStr = toString$1(result[0]);
          if (matchStr === '')
            rx.lastIndex = advanceStringIndex(
              S,
              toLength(rx.lastIndex),
              fullUnicode
            );
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString$1(result[0]);
          var position = max(
            min(toIntegerOrInfinity(result.index), S.length),
            0
          );
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++)
            push(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat([matched], captures, position, S);
            if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
            var replacement = toString$1(
              apply(replaceValue, undefined, replacerArgs)
            );
          } else {
            replacement = getSubstitution(
              matched,
              S,
              position,
              captures,
              namedCaptures,
              replaceValue
            );
          }
          if (position >= nextSourcePosition) {
            accumulatedResult +=
              stringSlice$1(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice$1(S, nextSourcePosition);
      }
    ];
  },
  !REPLACE_SUPPORTS_NAMED_GROUPS ||
    !REPLACE_KEEPS_$0 ||
    REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
);

var isCallable = isCallable$n;
var isObject$1 = isObject$9;
var setPrototypeOf = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable((NewTarget = dummy.constructor)) &&
    NewTarget !== Wrapper &&
    isObject$1((NewTargetPrototype = NewTarget.prototype)) &&
    NewTargetPrototype !== Wrapper.prototype
  )
    setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var isObject = isObject$9;
var classof = classofRaw$1;
var wellKnownSymbol$1 = wellKnownSymbol$i;

var MATCH$1 = wellKnownSymbol$1('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return (
    isObject(it) &&
    ((isRegExp = it[MATCH$1]) !== undefined
      ? !!isRegExp
      : classof(it) == 'RegExp')
  );
};

var call = functionCall;
var hasOwn$1 = hasOwnProperty_1;
var isPrototypeOf$1 = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$2 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined &&
    !('flags' in RegExpPrototype$2) &&
    !hasOwn$1(R, 'flags') &&
    isPrototypeOf$1(RegExpPrototype$2, R)
    ? call(regExpFlags, R)
    : flags;
};

var defineProperty = objectDefineProperty.f;

var proxyAccessor$1 = function (Target, Source, key) {
  key in Target ||
    defineProperty(Target, key, {
      configurable: true,
      get: function () {
        return Source[key];
      },
      set: function (it) {
        Source[key] = it;
      }
    });
};

var DESCRIPTORS = descriptors;
var global$1 = global$o;
var uncurryThis = functionUncurryThis;
var isForced = isForced_1;
var inheritIfRequired = inheritIfRequired$1;
var createNonEnumerableProperty = createNonEnumerableProperty$6;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var isPrototypeOf = objectIsPrototypeOf;
var isRegExp = isRegexp;
var toString = toString$6;
var getRegExpFlags$1 = regexpGetFlags;
var stickyHelpers = regexpStickyHelpers;
var proxyAccessor = proxyAccessor$1;
var defineBuiltIn$1 = defineBuiltIn$8;
var fails$1 = fails$m;
var hasOwn = hasOwnProperty_1;
var enforceInternalState = internalState.enforce;
var setSpecies = setSpecies$2;
var wellKnownSymbol = wellKnownSymbol$i;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global$1.RegExp;
var RegExpPrototype$1 = NativeRegExp.prototype;
var SyntaxError = global$1.SyntaxError;
var exec = uncurryThis(RegExpPrototype$1.exec);
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED =
  DESCRIPTORS &&
  (!CORRECT_NEW ||
    MISSED_STICKY ||
    UNSUPPORTED_DOT_ALL ||
    UNSUPPORTED_NCG ||
    fails$1(function () {
      re2[MATCH] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      return (
        NativeRegExp(re1) != re1 ||
        NativeRegExp(re2) == re2 ||
        NativeRegExp(re1, 'i') != '/a/i'
      );
    }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      result += chr + charAt(string, ++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      }
      result += chr;
    }
  }
  return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      chr = chr + charAt(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets)
      switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          if (exec(IS_NCG, stringSlice(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || hasOwn(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = '';
          continue;
      }
    if (ncg) groupname += chr;
    else result += chr;
  }
  return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype$1, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (
      !thisIsRegExp &&
      patternIsRegExp &&
      flagsAreUndefined &&
      pattern.constructor === RegExpWrapper
    ) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf(RegExpPrototype$1, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = getRegExpFlags$1(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(
      NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype$1,
      RegExpWrapper
    );

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern)
      try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty(
          result,
          'source',
          rawPattern === '' ? '(?:)' : rawPattern
        );
      } catch (error) {
        /* empty */
      }

    return result;
  };

  for (
    var keys = getOwnPropertyNames(NativeRegExp), index = 0;
    keys.length > index;

  ) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
  }

  RegExpPrototype$1.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$1;
  defineBuiltIn$1(global$1, 'RegExp', RegExpWrapper, { constructor: true });
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

var PROPER_FUNCTION_NAME = functionName.PROPER;
var defineBuiltIn = defineBuiltIn$8;
var anObject = anObject$e;
var $toString = toString$6;
var fails = fails$m;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () {
  return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b';
});
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn(
    RegExp.prototype,
    TO_STRING,
    function toString() {
      var R = anObject(this);
      var pattern = $toString(R.source);
      var flags = $toString(getRegExpFlags(R));
      return '/' + pattern + '/' + flags;
    },
    { unsafe: true }
  );
}

let _t$c,
  _t2$7,
  _t3$6,
  _t4$6,
  _t5$6,
  _t6$5,
  _t7$3,
  _t8$3,
  _t9$2,
  _t10,
  _t11,
  _t12,
  _t13,
  _t14,
  _t15,
  _t16,
  _$c = (a) => a;
const StyledFooter = styled.footer(
    _t$c ||
      (_t$c = _$c`
  background-color: ${0};
  line-height: 1.6;
  text-align: left;
  box-sizing: border-box;
  overflow-wrap: break-word;

  * {
    color: ${0};
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    overflow-wrap: break-word;
  }

  a,
  button {
    display: inline;
    border-bottom: solid ${0};
    border-bottom-color: transparent;
    text-decoration: none;
    font-weight: ${0};
    transition: 0.2s ease-in;
    transition-property: border-bottom-color;

    &:hover,
    &:focus {
      border-bottom-color: ${0};
    }

    * {
      fill: currentColor;
    }
  }

  svg {
    width: ${0};
    height: ${0};
  }

  ul {
    list-style: none;
  }
`),
    ({ theme: a }) => a.colors.general.interfaceDark,
    ({ theme: a }) => a.colors.general.white,
    pxToRem(1),
    ({ theme: a }) => a.fonts.main.medium,
    ({ theme: a }) => a.colors.general.white,
    pxToRem(16),
    pxToRem(16)
  ),
  StyledFooterWrapper = styled.div(
    _t2$7 ||
      (_t2$7 = _$c`
  max-width: ${0};
  width: 100%;
  margin: 0 auto;
  padding-top: ${0};

  @media ${0} {
    padding: ${0};
    display: flex;
    flex-direction: column;
  }
`),
    pxToRem(1440),
    pxToRem(1),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(20)
  ),
  StyledFooterTopLinks = styled.div(
    _t3$6 ||
      (_t3$6 = _$c`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: ${0};
  border-bottom: solid ${0} ${0};

  @media ${0} {
    padding: ${0};
    justify-content: space-between;
    order: -1;
  }
`),
    pxToRem(25, 20, 5),
    pxToRem(1),
    ({ theme: a }) => a.colors.greys.middle,
    ({ theme: a }) => a.devices.tablet,
    pxToRem(7, 0, 21)
  ),
  StyledSitecoreSvgIcon$1 = styled.div(
    _t4$6 ||
      (_t4$6 = _$c`
  display: inline-block;
  padding-right: ${0};
  padding-bottom: ${0};
  transform: translateY(2px);
  background-color: ${0};
`),
    pxToRem(9),
    pxToRem(2),
    ({ theme: a }) => a.colors.general.interfaceDark
  ),
  StyledFooterLinksRightCol = styled.div(
    _t5$6 ||
      (_t5$6 = _$c`
  display: flex;
  flex-wrap: wrap;
`)
  ),
  StyledFooterTopLink = styled.div(
    _t6$5 ||
      (_t6$5 = _$c`
  margin: ${0};

  @media ${0} {
    padding: 0;
    margin: ${0};
  }
`),
    pxToRem(0, 10, 12, 0),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(0, 35, 0, 0)
  ),
  StyledFooterScrollToTopLink = styled.button(
    _t7$3 ||
      (_t7$3 = _$c`
  margin: ${0};
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  @media ${0} {
    margin: 0;
  }

  svg {
    width: ${0};
    height: ${0};
  }
`),
    pxToRem(0, 10, 15, 0),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(22),
    pxToRem(11)
  ),
  StyledFooterColumns = styled.ul(
    _t8$3 ||
      (_t8$3 = _$c`
  width: 100%;
  border-bottom: solid ${0} ${0};
  margin: 0;
  padding: 0;

  @media ${0} {
    display: flex;
  }
`),
    pxToRem(1),
    ({ theme: a }) => a.colors.greys.middle,
    ({ theme: a }) => a.devices.tablet
  ),
  StyledFooterColumn = styled.li(
    _t9$2 ||
      (_t9$2 = _$c`
  padding: ${0};
  border-bottom: solid ${0} ${0};

  :last-child {
    border-bottom: none;
  }

  @media ${0} {
    flex: 0 0 auto;
    width: calc(100% / 6);
    padding: ${0};
    border-bottom: none;
  }
`),
    pxToRem(12, 6, 12, 20),
    pxToRem(1),
    ({ theme: a }) => a.colors.greys.middle,
    ({ theme: a }) => a.devices.tablet,
    pxToRem(15, 20, 20, 0)
  ),
  StyledFooterColumnHead = styled.div(
    _t10 ||
      (_t10 = _$c`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-transform: uppercase;

  ${0};
`),
    ({ isOpen: a }) => !0 === a && `margin-bottom: ${pxToRem(0)}`
  ),
  StyledFooterColumnItems = styled.ul(
    _t11 ||
      (_t11 = _$c`
  margin: 0;
  padding: 0;

  a {
    font-size: ${0};
  }

  @media ${0} {
    max-height: 0;
    overflow: hidden;
    transition: 0.15s ease-in-out;
    transition-property: max-height;

    ${0}
  }
`),
    pxToRem(14),
    ({ theme: a }) => a.devices.mobileOnly,
    ({ isOpen: a }) => !0 === a && expandedStyles
  ),
  StyledFooterColumnItem = styled.li(
    _t12 ||
      (_t12 = _$c`
  padding: ${0};
  line-height: 1.25;
`),
    pxToRem(0, 0, 6, 0)
  ),
  StyledFooterColumnIconWrapper = styled.span(
    _t13 ||
      (_t13 = _$c`
  width: ${0};
  height: ${0};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: ${0};
    height: ${0};
    fill: currentColor;
  }
`),
    pxToRem(40),
    pxToRem(40),
    pxToRem(9),
    pxToRem(5)
  ),
  expandedStyles = css(
    _t14 ||
      (_t14 = _$c`
  max-height: 100vh;
`)
  ),
  expandedIconStyles = css(
    _t15 ||
      (_t15 = _$c`
  transform: rotate(0deg);
`)
  ),
  StyledFooterColumnIcon = styled.svg(
    _t16 ||
      (_t16 = _$c`
  transition: 0.15s ease-in-out;
  transition-property: transform;
  ${0}
  transform: rotate(180deg);

  @media ${0} {
    display: none;
  }
`),
    ({ isOpen: a }) => !0 === a && expandedIconStyles,
    ({ theme: a }) => a.devices.tablet
  );

const safeDataLayerPush = (data, timeout) => {
  const push = () => {
    var _window, _window$dataLayer;

    return (
      ((_window = window) == null
        ? void 0
        : (_window$dataLayer = _window.dataLayer) == null
        ? void 0
        : _window$dataLayer.push) && window.dataLayer.push(data)
    );
  };

  timeout !== undefined ? setTimeout(push, timeout) : push();
};

const pushCustomEvent = (data) =>
  safeDataLayerPush(
    Object.assign(
      {
        event: 'customEvent'
      },
      data
    )
  );

const pushFooterAnalyticsEvent = (a, b) => {
  b && (a = `${b} | ${a}`),
    pushCustomEvent({ event: 'footerClick', footerClick: { name: a } });
};

const FooterTopLink = ({
  item: {
    fields: { TopLink: a, TopLinkIcon: b, Enabled: c }
  }
}) => {
  var d;
  const { renderLink: e } = useLinkContext(),
    f = null == a || null == (d = a.value) ? void 0 : d.text;
  if (!c.value || !f) return null;
  const g =
    !!b &&
    /*#__PURE__*/ jsx(StyledSitecoreSvgIcon$1, {
      dangerouslySetInnerHTML: { __html: b.fields.SvgIcon.value },
      'data-qa': `sc-icon-${a.value}`
    });
  return /*#__PURE__*/ jsx(StyledFooterTopLink, {
    children: e(a.value, g, () => pushFooterAnalyticsEvent(f))
  });
};

const FooterTopLinks = ({ items: a, children: b }) =>
  /*#__PURE__*/ jsxs(StyledFooterTopLinks, {
    children: [
      /*#__PURE__*/ jsx(StyledFooterLinksRightCol, {
        children:
          null == a
            ? void 0
            : a.map((a) => /*#__PURE__*/ jsx(FooterTopLink, { item: a }, a.id))
      }),
      b
    ]
  });

let FooterTemplateIds;
(function (a) {
  (a.FooterTopLinkTemplateId = '9afff1fe-c0da-49f5-a765-e465881ebf3d'),
    (a.FooterColumnTemplateId = 'c4212ed7-cded-4a37-9d95-1addeaca8102');
})(FooterTemplateIds || (FooterTemplateIds = {}));

const useGlobalListener = (eventName, action) => {
  useEffect(() => {
    if (document) {
      document.addEventListener(eventName, action, true);
    }

    return () => {
      if (document) {
        document.removeEventListener(eventName, action, true);
      }
    };
  }, [action, eventName]);
};

const useGlobalKeyDown = (action, key) => {
  const keyDownHandler = (event) => {
    if (!key || event.key === key) {
      action();
    }
  };

  useGlobalListener('keydown', keyDownHandler);
};

const useClickOutside = (ref, action) => {
  useEffect(() => {
    const mousedownHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    };

    if (document) {
      document.addEventListener('mousedown', mousedownHandler, true);
    }

    return () => {
      if (document) {
        document.removeEventListener('mousedown', mousedownHandler, true);
      }
    };
  }, [ref, action]);
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    windowWidth: undefined,
    windowHeight: undefined
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState({
    isMobile: false
  });
  const { windowWidth } = useWindowSize();
  useEffect(() => {
    if (windowWidth)
      setIsMobile({
        isMobile: windowWidth < 768
      });
  }, [windowWidth]);
  return isMobile;
};

const useScrollLock = (open) => {
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.touchAction = 'none';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    } else {
      document.body.style.touchAction = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
    }
  }, [isMobile, open]);
};

const useFocusOutside = (ref, action) => {
  useEffect(() => {
    const focusHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    };

    if (document) {
      document.addEventListener('focus', focusHandler, true);
    }

    return () => {
      if (document) {
        document.removeEventListener('focus', focusHandler, true);
      }
    };
  }, [ref, action]);
};

const FooterColumnChild = ({
  item: {
    fields: { ChildLink: b, Enabled: c }
  },
  parentLinkText: a
}) => {
  var d;
  const { renderLink: e } = useLinkContext(),
    f = null == b || null == (d = b.value) ? void 0 : d.text;
  return c.value && f
    ? /*#__PURE__*/ jsx(StyledFooterColumnItem, {
        'data-qa': `footer-column-item`,
        children: e(b.value, null, () => pushFooterAnalyticsEvent(f, a))
      })
    : null;
};

const FooterColumn = ({
  item: {
    fields: { ColumnLink: c },
    items: b
  },
  isOpen: a
}) => {
  var d, e, f;
  const { renderLink: g } = useLinkContext(),
    { isMobile: h } = useIsMobile(),
    [i, j] = useState(a),
    k = () => {
      h && j(!i);
    },
    l = null == c || null == (d = c.value) ? void 0 : d.text;
  return /*#__PURE__*/ jsxs(StyledFooterColumn, {
    title: null == c || null == (e = c.value) ? void 0 : e.text,
    'data-qa': `footer-column`,
    isOpen: h && i,
    'aria-haspopup': 'true',
    'aria-controls': null == c || null == (f = c.value) ? void 0 : f.text,
    'aria-expanded': h ? i : a,
    children: [
      /*#__PURE__*/ jsxs(StyledFooterColumnHead, {
        isOpen: h && i,
        children: [
          !!l &&
            g(null == c ? void 0 : c.value, null, () =>
              pushFooterAnalyticsEvent(l)
            ),
          /*#__PURE__*/ jsx(StyledFooterColumnIconWrapper, {
            'data-qa': 'column-toggle',
            onClick: () => k(),
            children: /*#__PURE__*/ jsx(StyledFooterColumnIcon, {
              preserveAspectRatio: 'xMidYMid meet',
              focusable: 'false',
              'aria-hidden': 'true',
              viewBox: '0 0 7 3',
              isOpen: h && i,
              children: /*#__PURE__*/ jsx('path', {
                d: 'M6.8,2.2l-2.5-2c-0.4-0.3-1.1-0.3-1.6,0l-2.5,2C0,2.3,0,2.5,0,2.6C0,2.8,0.2,2.9,0.3,3c0.1,0,0.1,0,0.2,0 c0.1,0,0.3,0,0.4-0.1l2.5-2c0,0,0.1,0,0.1,0l2.5,2C6.3,3,6.6,3,6.8,2.9C6.9,2.8,7,2.7,7,2.6S6.9,2.3,6.8,2.2z'
              })
            })
          })
        ]
      }),
      /*#__PURE__*/ jsx(StyledFooterColumnItems, {
        isOpen: h && i,
        children:
          null == b
            ? void 0
            : b.map((a) =>
                /*#__PURE__*/ jsx(
                  FooterColumnChild,
                  { item: a, parentLinkText: l },
                  a.id
                )
              )
      })
    ]
  });
};

const FooterColumns = ({ items: a }) =>
  /*#__PURE__*/ jsx(StyledFooterColumns, {
    children:
      null == a
        ? void 0
        : a.map((a) =>
            /*#__PURE__*/ jsx(FooterColumn, { item: a, isOpen: !1 }, a.id)
          )
  });

let _t$b,
  _t2$6,
  _t3$5,
  _t4$5,
  _t5$5,
  _t6$4,
  _$b = (a) => a;
const StyledFooterContact = styled.div(
    _t$b ||
      (_t$b = _$b`
  display: flex;
  flex-direction: column;
  padding: ${0};

  @media ${0} {
    padding: ${0};
  }
`),
    pxToRem(20),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(20, 0)
  ),
  StyledFooterContactTitle = styled.h5(
    _t2$6 ||
      (_t2$6 = _$b`
  margin: 0;
  font-size: ${0};
  padding-bottom: ${0};
`),
    pxToRem(16),
    pxToRem(18)
  ),
  StyledFooterContactText = styled.p(
    _t3$5 ||
      (_t3$5 = _$b`
  margin: 0;
  font-size: ${0};
  line-height: ${0};
  padding-bottom: ${0};

  @media ${0} {
    padding-bottom: ${0};
  }
`),
    pxToRem(14),
    pxToRem(18),
    pxToRem(25),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(20)
  ),
  StyledFooterContactLinks = styled.ul(
    _t4$5 ||
      (_t4$5 = _$b`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`)
  ),
  StyledFooterContactLink = styled.li(
    _t5$5 ||
      (_t5$5 = _$b`
  padding-right: ${0};

  a {
    white-space: nowrap;
  }
`),
    pxToRem(20)
  ),
  StyledFooterContactIcon = styled.div(
    _t6$4 ||
      (_t6$4 = _$b`
  display: inline-block;
  padding-right: ${0};
  transform: translateY(2px);
  background-color: ${0};

  svg {
    width: ${0};
    height: ${0};
  }
`),
    pxToRem(7),
    ({ theme: a }) => a.colors.general.interfaceDark,
    pxToRem(16),
    pxToRem(16)
  );

const footerContactPhoneIcon = /*#__PURE__*/ jsx(StyledFooterContactIcon, {
    dangerouslySetInnerHTML: {
      __html:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M5,2C4.4,2,4,2.4,4,3v10c0,0.6,0.4,1,1,1h6c0.6,0,1-0.4,1-1V3c0-0.6-0.4-1-1-1H5z M11,16H5c-1.7,0-3-1.3-3-3V3c0-1.7,1.3-3,3-3h6c1.7,0,3,1.3,3,3v10C14,14.7,12.7,16,11,16z M8,13c-0.1,0-0.3,0-0.4-0.1c-0.3-0.1-0.4-0.3-0.5-0.5C7,12.3,7,12.1,7,12c0-1.3,2-1.3,2,0c0,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.1,0.2-0.2,0.3C8.5,12.9,8.3,13,8,13z" /></svg>'
    },
    'data-qa': 'icon-mobile'
  }),
  footerContactEmailIcon = /*#__PURE__*/ jsx(StyledFooterContactIcon, {
    dangerouslySetInnerHTML: {
      __html:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13,12.5H3c-0.6,0-1-0.4-1-1V4.8l5.4,4.5c0.4,0.3,0.9,0.3,1.3,0L14,4.8v6.7C14,12.1,13.6,12.5,13,12.5zM12.4,3.5L8,7.2L3.6,3.5H12.4z M13,1.5H3c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-7C16,2.8,14.7,1.5,13,1.5z" /></svg>'
    },
    'data-qa': 'icon-email'
  }),
  FooterContact = ({ Title: a, Text: b, PhoneNumber: c, ContactUsLink: d }) => {
    var e;
    const { renderLink: f } = useLinkContext(),
      g = null == c ? void 0 : c.value,
      h = null == d || null == (e = d.value) ? void 0 : e.text;
    return /*#__PURE__*/ jsxs(StyledFooterContact, {
      children: [
        /*#__PURE__*/ jsx(StyledFooterContactTitle, {
          children: null == a ? void 0 : a.value
        }),
        /*#__PURE__*/ jsx(StyledFooterContactText, {
          children: null == b ? void 0 : b.value
        }),
        /*#__PURE__*/ jsxs(StyledFooterContactLinks, {
          children: [
            /*#__PURE__*/ jsx(StyledFooterContactLink, {
              children:
                !!g &&
                /*#__PURE__*/ jsxs('a', {
                  href: `tel:${g}`,
                  onClick: () => pushFooterAnalyticsEvent(g),
                  children: [footerContactPhoneIcon, g]
                })
            }),
            /*#__PURE__*/ jsx(StyledFooterContactLink, {
              children:
                !!h &&
                f(null == d ? void 0 : d.value, footerContactEmailIcon, () =>
                  pushFooterAnalyticsEvent(h)
                )
            })
          ]
        })
      ]
    });
  };

const scrollToTopIcon = /*#__PURE__*/ jsx(StyledSitecoreSvgIcon$1, {
    dangerouslySetInnerHTML: {
      __html:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 11"><path d="M21,11c-0.3,0-0.5-0.1-0.7-0.3l-8.6-8.4c-0.4-0.4-1-0.4-1.4,0l-8.6,8.4c-0.9,0.9-2.4-0.5-1.4-1.4l8.6-8.4c1.2-1.1,3.1-1.1,4.2,0l8.6,8.4c0.4,0.4,0.4,1,0,1.4C21.5,10.9,21.3,11,21,11z"/></svg>'
    },
    'data-qa': 'icon-arrow-up'
  }),
  scrollToTop = (a) => {
    pushFooterAnalyticsEvent(a),
      window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  FooterScrollToTopButton = ({ text: a }) =>
    /*#__PURE__*/ jsxs(StyledFooterScrollToTopLink, {
      onClick: () => scrollToTop(a),
      children: [scrollToTopIcon, a]
    });

const _excluded$2 = ['site', 'locale', 'apiHost'];
const FooterComponent = (a) => {
  var b, c, d, e;
  let { site: f, locale: g, apiHost: h } = a,
    i = _objectWithoutPropertiesLoose(a, _excluded$2);
  const j = useFooterApi({ footer: i.footer }, f, g, h),
    { footer: k } = j,
    l = (a) => {
      var b, c;
      return null == k || null == (b = k.siteSettings) || null == (c = b.items)
        ? void 0
        : c.filter((b) => b.templateId === a);
    },
    m = l(FooterTemplateIds.FooterTopLinkTemplateId),
    n = l(FooterTemplateIds.FooterColumnTemplateId),
    o =
      null == k ||
      null == (b = k.siteSettings) ||
      null == (c = b.fields) ||
      null == (d = c.BackToTop)
        ? void 0
        : d.value,
    p = null == k || null == (e = k.siteSettings) ? void 0 : e.fields;
  return /*#__PURE__*/ jsx(StyledFooter, {
    children: /*#__PURE__*/ jsxs(StyledFooterWrapper, {
      children: [
        /*#__PURE__*/ jsx(FooterColumns, { items: n }),
        /*#__PURE__*/ jsx(FooterTopLinks, {
          items: m,
          children:
            !!o && /*#__PURE__*/ jsx(FooterScrollToTopButton, { text: o })
        }),
        !!p && /*#__PURE__*/ jsx(FooterContact, Object.assign({}, p))
      ]
    })
  });
};

const _excluded$1 = ['renderLink'];
const Footer = (a) => {
  let { renderLink: b } = a,
    c = _objectWithoutPropertiesLoose(a, _excluded$1);
  return /*#__PURE__*/ jsx(ThemeProvider, {
    theme: royalCaninTheme,
    children: /*#__PURE__*/ jsx(LinkContextProvider, {
      renderLink: b || defaultRenderLink,
      children: /*#__PURE__*/ jsx(FooterComponent, Object.assign({}, c))
    })
  });
};

const HeaderMobileMenuContext = /*#__PURE__*/ createContext({
  isMenuOpen: !1,
  setMenuOpen: () => {},
  isMenuClosing: !1,
  setMenuClosing: () => {}
});
const HeaderMobileMenuContextProvider = ({ children: a }) => {
  const [b, c] = useState(!1),
    [d, e] = useState(!1),
    f = {
      isMenuOpen: b,
      setMenuOpen: (a) => {
        c(a);
      },
      isMenuClosing: d,
      setMenuClosing: e
    },
    g = useDebouncedCallback(() => {
      f.setMenuOpen(!1);
    }, 200);
  return (
    useEffect(
      () => (
        window.addEventListener('resize', g),
        g(),
        () => window.removeEventListener('resize', g)
      ),
      [g]
    ),
    /*#__PURE__*/ jsx(HeaderMobileMenuContext.Provider, {
      value: f,
      children: a
    })
  );
};

const HeaderOverlayContext = /*#__PURE__*/ createContext({
  isOverlayVisible: !1,
  setIsOverlayVisible: () => {}
});
const HeaderOverlayContextProvider = ({ children: a }) => {
  const [b, c] = useState(!1);
  return /*#__PURE__*/ jsx(HeaderOverlayContext.Provider, {
    value: {
      isOverlayVisible: b,
      setIsOverlayVisible: (a) => {
        c(a);
      }
    },
    children: a
  });
};

let _t$a,
  _$a = (a) => a;
const StyledHeaderMenuOverlay = styled.div(
  _t$a ||
    (_t$a = _$a`
  &.header__page-overlay {
    display: none;

    @media ${0} {
      position: fixed;
      z-index: 800;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);

      &--active {
        display: block;
      }
    }
  }
`),
  ({ theme: a }) => a.devices.tablet
);

const HeaderMenuOverlay = () => {
  const { isOverlayVisible: a } = useContext(HeaderOverlayContext);
  return /*#__PURE__*/ jsx(StyledHeaderMenuOverlay, {
    className: cn('header__page-overlay', a && 'header__page-overlay--active')
  });
};

const fetchCountriesContentDelivery = async (a, b, c) =>
  fetchData(`${c}/rc-api/navigation/countryselector?sc_site=${a}&sc_lang=${b}`);
const fetchCountriesRenderingHost = async (a, b, c) =>
  fetchData(`${c || ''}/${a}/${b}/rc-api/navigation/CountrySelector`);

const fetchNavigationContentDelivery = async (a, b, c) =>
  fetchData(`${c}/rc-api/navigation?sc_site=${a}&sc_lang=${b}`);
const fetchNavigationRenderingHost = async (a, b, c) =>
  fetchData(`${c || ''}/${a}/${b}/rc-api/navigation`);

const useLocationChange = (a) => {
  const [b, c] = useState(''),
    [d, e] = useState('');
  useEffect(() => {
    d !== b && (a(), e(b));
  }, [b, d, a]),
    useEffect(() => {
      'undefined' != typeof window &&
        (c(window.location.href), e(window.location.href));
    }, []);
};

let _t$9,
  _t2$5,
  _t3$4,
  _t4$4,
  _t5$4,
  _t6$3,
  _t7$2,
  _t8$2,
  _t9$1,
  _$9 = (a) => a;
const topNavigationHeight = `calc(100vh - ${pxToRem(60)})`,
  StyledTopNavigation = styled.ul(
    _t$9 ||
      (_t$9 = _$9`
  font-family: ${0};
  font-weight: ${0};
  font-size: ${0};
  line-height: 1.6;
  text-align: left;
  color: ${0};
  box-sizing: border-box;
  overflow-wrap: break-word;

  position: fixed;
  top: ${0};
  left: 0;
  width: 100%;
  height: ${0};
  overflow-y: ${0};
  margin: 0;
  padding: 0;
  background: ${0};
  list-style: none;
  transition: 0.25s cubic-bezier(0.81, 0.23, 0.23, 0.76);
  transition-property: top, height;

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    overflow-wrap: break-word;
  }

  @media ${0} {
    position: relative;
    top: 0;
    height: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  ul {
    list-style: none;
  }
`),
    ({ theme: a }) => a.fonts.main.family,
    ({ theme: a }) => a.fonts.main.regular,
    pxToRem(16),
    ({ theme: a }) => a.colors.general.black,
    ({ isMenuOpen: a }) => (a ? pxToRem(60) : '100vh'),
    ({ isMenuOpen: a }) => (a ? topNavigationHeight : 0),
    ({ isMenuOpen: a }) => a && 'scroll',
    ({ theme: a }) => a.colors.background.primary,
    ({ theme: a }) => a.devices.tablet
  ),
  topNavItemLink = css(
    _t2$5 ||
      (_t2$5 = _$9`
  text-decoration: underline;
  display: block;
  transition: 0.2s ease-in-out;
  transition-property: color, text-decoration;
  text-decoration: none;
  position: relative;
  color: ${0};

  svg {
    fill: currentColor;
  }

  @media ${0} {
    color: ${0};

    svg {
      display: none;
    }
  }

  &:hover {
    color: ${0};
    text-decoration: underline;
  }
`),
    ({ theme: a }) => a.colors.general.hyperlink,
    ({ theme: a }) => a.devices.tablet,
    ({ theme: a }) => a.colors.general.text,
    ({ theme: a }) => a.colors.general.primary
  ),
  StyledTopNavigationItem = styled.li(
    _t3$4 ||
      (_t3$4 = _$9`
  padding: 0;
  margin: 0;

  > a,
  > button {
    ${0}
    font-weight: 500;
    padding: ${0};
    border-bottom: solid ${0} ${0};

    @media ${0} {
      padding: ${0};
      border-bottom: 0;
      white-space: nowrap;
    }
  }
`),
    topNavItemLink,
    pxToRem(15, 60, 15, 34),
    pxToRem(1),
    ({ theme: a }) => a.colors.general.interface,
    ({ theme: a }) => a.devices.tablet,
    pxToRem(20)
  ),
  StyledTopNavigationSubListItem = styled.li(
    _t4$4 ||
      (_t4$4 = _$9`
  a {
    ${0}
    line-height: initial;
    padding: ${0};

    @media ${0} {
      padding: ${0};
    }
  }

  .submenu-parent-link {
    font-weight: 500;
  }
`),
    topNavItemLink,
    pxToRem(5, 60, 5, 34),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(5, 0)
  ),
  StyledTopNavItemsWrapper = styled.div(
    _t5$4 ||
      (_t5$4 = _$9`
  width: 100%;
  padding-bottom: ${0};
  display: ${0};
  border-bottom: ${0} solid
    ${0};

  @media ${0} {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    width: 100%;
    padding: ${0};
    max-width: ${0};
    transform: translate(-50%, 0);
    transition: opacity 0.2s linear;
    background: ${0};
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.06);
    opacity: ${0};
    visibility: ${0};
    border-bottom: 0;
  }
`),
    pxToRem(30),
    ({ isOpen: a }) => (a ? 'block' : 'none'),
    pxToRem(1),
    ({ isOpen: a, theme: b }) =>
      a ? b.colors.general.interface : 'transparent',
    ({ theme: a }) => a.devices.tablet,
    pxToRem(40),
    ({ theme: a }) => a.navigation.wrappers.main,
    ({ theme: a }) => a.colors.background.primary,
    ({ isOpen: a }) => (a ? '1' : '0'),
    ({ isOpen: a }) => (a ? 'visible' : 'hidden')
  ),
  subMenuWithLinks2col1img = `width: calc(50% - ${pxToRem(100)})`,
  subMenuWithLinks1col1img = css(
    _t6$3 ||
      (_t6$3 = _$9`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - ${0});
`),
    pxToRem(490)
  ),
  StyledSubmenuWithLinks = styled.ul(
    _t7$2 ||
      (_t7$2 = _$9`
  @media ${0} {
    flex: 0 0 auto;
    width: 50%;
    padding-right: ${0};
    ${0};
    ${0};
  }
`),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(20),
    ({ variant: a }) => '1col1img' === a && subMenuWithLinks1col1img,
    ({ variant: a }) => '2col1img' === a && subMenuWithLinks2col1img
  ),
  setBorderBottom = (a, b) => {
    const c = a ? 'transparent !important' : b;
    return `solid ${pxToRem(1)} ${c}`;
  },
  StyledNavButton = styled.button(
    _t8$2 ||
      (_t8$2 = _$9`
  font-family: inherit;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border: none;
  font-size: 1rem;
  line-height: ${0};
  background: ${0};
  border-bottom: ${0};

  @media ${0} {
    color: ${0};
    padding: ${0};
    border-bottom: 0;

    &:hover {
      color: ${0};
      text-decoration: underline;
    }
  }

  svg {
    display: inline-block;
    width: ${0};
    height: ${0};
    position: absolute;
    right: ${0};
    top: 50%;
    transform: translateY(-50%);
    font-size: ${0};
    fill: ${0};
    transition: fill 0.2s ease-in-out;

    @media ${0} {
      display: none;
    }
  }

  a span {
    width: ${0};
    height: ${0};
  }
`),
    pxToRem(25.6),
    ({ theme: a }) => a.colors.background.primary,
    ({ isOpen: a, theme: b }) => setBorderBottom(a, b.colors.general.interface),
    ({ theme: a }) => a.devices.tablet,
    ({ theme: a }) => a.colors.general.text,
    pxToRem(20, 20),
    ({ theme: a }) => a.colors.general.primary,
    pxToRem(16),
    pxToRem(16),
    pxToRem(35),
    pxToRem(22),
    ({ theme: a }) => a.colors.general.iconography,
    ({ theme: a }) => a.devices.tablet,
    pxToRem(24),
    pxToRem(24)
  ),
  StyledTopNavColumnTitle = styled.p(
    _t9$1 ||
      (_t9$1 = _$9`
  font-weight: ${0};

  @media ${0} {
    padding: ${0};
  }
`),
    ({ theme: a }) => a.fonts.main.medium,
    ({ theme: a }) => a.devices.mobileOnly,
    pxToRem(15, 60, 5, 34)
  );

const pushTopNavAnalyticsEvent = (a, b) =>
  pushCustomEvent({ event: 'topNavClick', topNavClick: { level: b, name: a } });

const TopNavPrimaryItemWithoutSubmenu = ({ item: a }) => {
  const { renderLink: b } = useLinkContext();
  return b(
    Object.assign({}, a.fields.Link.value, {
      title: a.displayName,
      text: a.fields.PrimaryTitle.value
    }),
    null,
    () => pushTopNavAnalyticsEvent(a.fields.PrimaryTitle.value, '1')
  );
};

let TopNavTemplateIds;
(function (a) {
  (a.TopNavPrimaryItemWithoutSubmenuTemplateId =
    '8ac26f34-7f13-496a-b376-61021330bff8'),
    (a.TopNavPrimaryItem2Columns1SmallImageTemplateId =
      'e7620f1f-31b2-4079-81cf-77622688b26e'),
    (a.TopNavPrimaryItem1Column1PromoBlockTemplateId =
      '3432337f-e0a2-41aa-9428-c816d3d37f23'),
    (a.TopNavPrimaryItem1Columns1LargeImageTemplateId =
      'aeddbf22-6133-4186-897a-cb4b28395a2a'),
    (a.TopNavPrimaryItem2ProductBlocks1ImageTemplateId =
      'fb4ea992-ae2d-40a3-b020-584032f1b7c8'),
    (a.TopNavPrimaryItemContactUsTemplateId =
      'fa1059ce-58e3-46f6-8531-ef959c0e5eed'),
    (a.TopNavPrimaryItemContactUsButtonTemplateId =
      '754c524e-65a3-4d71-93e0-2b97fd89f69f');
})(TopNavTemplateIds || (TopNavTemplateIds = {}));

let _t$8,
  _t2$4,
  _$8 = (a) => a;
const StyledImageWrapper = styled.div(
    _t$8 ||
      (_t$8 = _$8`
  width: ${0};
  height: ${0};
  display: none;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }

  @media ${0} {
    display: flex;
    margin-left: auto;
  }
`),
    pxToRem(200),
    pxToRem(200),
    ({ theme: a }) => a.devices.tablet
  ),
  StyledLargeImageWrapper = styled.div(
    _t2$4 ||
      (_t2$4 = _$8`
  display: none;

  img {
    max-height: ${0};
  }

  @media ${0} {
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
  }
`),
    pxToRem(230),
    ({ theme: a }) => a.devices.tablet
  );

const useTopNavigationColumnCount = (a, b, c, d, e, f) => {
  var g, h, i, j;
  const k = null == b ? void 0 : b.filter((a) => a.fields.Enabled.value),
    l = !!e.value.href;
  let m = null == k ? void 0 : k.slice(0, a);
  if (l && !f && (null == (g = m) ? void 0 : g.length) === a) {
    var n;
    m = null == (n = m) ? void 0 : n.slice(0, m.length - 1);
  }
  const o = (m && 0 < (null == (h = m) ? void 0 : h.length)) || l,
    p = f
      ? (null == (i = m) ? void 0 : i.length) < a
      : (null == (j = m) ? void 0 : j.length) <= a,
    q = (!m || p) && l,
    r = (null == c ? void 0 : c.value) || d.value;
  return {
    visibleItems: k,
    firstColumnItems: m,
    isFirstColumnVisible: o,
    isFirstColumnPrimaryLinkVisible: q,
    submenuLinkTitle: r
  };
};

const TopNavSubmenuItem = ({ title: a, link: b, className: c }) => {
  var d;
  const { renderLink: e } = useLinkContext();
  return /*#__PURE__*/ jsx(StyledTopNavigationSubListItem, {
    'data-qa': 'topnav-submenu-listitem',
    children:
      (null == b || null == (d = b.value) ? void 0 : d.href) &&
      a &&
      e(
        Object.assign({}, b.value, { text: a, title: a, className: c }),
        null,
        () => pushTopNavAnalyticsEvent(a, '2')
      )
  });
};

const TopNavSubmenuItems = ({
  items: a,
  variant: b,
  children: c,
  title: d
}) => {
  const e =
    null == a
      ? void 0
      : a.map((a) => {
          var b;
          return /*#__PURE__*/ jsx(
            TopNavSubmenuItem,
            {
              title: null == (b = a.fields.Title) ? void 0 : b.value,
              link: a.fields.Link
            },
            a.id
          );
        });
  return /*#__PURE__*/ jsxs(StyledSubmenuWithLinks, {
    variant: b,
    'data-qa': 'topnav-submenu-with-links',
    children: [
      d && /*#__PURE__*/ jsx(StyledTopNavColumnTitle, { children: d }),
      e,
      c
    ]
  });
};

let _t$7,
  _$7 = (a) => a;
const StyledImage = styled.img(
  _t$7 ||
    (_t$7 = _$7`
  display: block;
  width: 100%;
  height: auto;
`)
);

const _excluded = ['src', 'width', 'height'];
const defaultWidths = [320, 360, 480, 640, 720, 960, 1280, 1440],
  setSrcSet = (a, b) => {
    const {
      formatjpg: c,
      autocompress: d,
      fpx: e,
      fpy: f,
      ar: g,
      useoptimalimageformat: h
    } = b;
    return a.map((a) => {
      const b = [],
        i = { w: a };
      return (
        'true' === c && (i.fm = 'jpg'),
        'true' === h && b.push('format'),
        'true' === d && b.push('compress'),
        ('true' === h || 'true' === d) && (i.auto = b.join('%2C')),
        e && (i['fp-x'] = e),
        f && (i['fp-y'] = f),
        (e || f) && g && ((i.crop = 'focalpoint'), (i.fit = 'crop')),
        g && ((i.ar = encodeURIComponent(g)), (i.fit = 'crop')),
        i
      );
    });
  },
  WeShareImage = ({ image: a, alt: b, widths: c, ratio: d, sizesSet: e }) => {
    const {
        value: { src: f }
      } = a,
      g = _objectWithoutPropertiesLoose(a.value, _excluded),
      h = c && 0 < c.length ? c : defaultWidths,
      i = Object.assign({}, g, { ar: d }),
      j = setSrcSet(h, i),
      k = j.reduce((a, b, c) => {
        let d = `${f}?`,
          e = 0;
        for (const f in b)
          (d += `${f}=${b[f]}${Object.keys(b).length - 2 >= e ? '&' : ''}`),
            e++;
        return j.length !== c + 1 && (d += ` ${h[c]}w,`), (a += d);
      }, '');
    return /*#__PURE__*/ jsx(StyledImage, {
      alt: b,
      loading: 'lazy',
      src: f,
      sizes: e,
      srcSet: k
    });
  };

const TopNavSubmenuTwoColumnsOneImage = ({
  item: {
    items: a,
    fields: {
      ImageRight: b,
      ImageAlt: c,
      Link: d,
      SubmenuTitle: e,
      PrimaryTitle: f
    }
  }
}) => {
  const g = null == a ? void 0 : a.filter((a) => a.fields.Enabled.value),
    {
      firstColumnItems: h,
      isFirstColumnVisible: i,
      isFirstColumnPrimaryLinkVisible: j,
      submenuLinkTitle: k
    } = useTopNavigationColumnCount(6, a, e, f, d, !0),
    l = null == g ? void 0 : g.slice(6, 11),
    m = (l && 0 < l.length) || (h && h.length === 6),
    n = (!l || l.length <= 5) && !!d.value.href;
  return /*#__PURE__*/ jsxs(Fragment, {
    children: [
      i &&
        /*#__PURE__*/ jsx(TopNavSubmenuItems, {
          items: h,
          variant: '2col1img',
          children:
            j &&
            /*#__PURE__*/ jsx(TopNavSubmenuItem, {
              title: k,
              link: d,
              className: 'submenu-parent-link'
            })
        }),
      m &&
        /*#__PURE__*/ jsx(TopNavSubmenuItems, {
          items: l,
          variant: '2col1img',
          children:
            n &&
            /*#__PURE__*/ jsx(TopNavSubmenuItem, {
              title: k,
              link: d,
              className: 'submenu-parent-link'
            })
        }),
      /*#__PURE__*/ jsx(StyledImageWrapper, {
        children: /*#__PURE__*/ jsx(WeShareImage, {
          image: b,
          widths: [200],
          ratio: '1:1',
          alt: c.value
        })
      })
    ]
  });
};

let _t$6,
  _t2$3,
  _t3$3,
  _t4$3,
  _t5$3,
  _$6 = (a) => a;
const StyledPromoBlockWrapper = styled.section(
    _t$6 ||
      (_t$6 = _$6`
  padding: ${0};
  border: none;
  width: 100%;

  @media ${0} {
    display: flex;
    flex: 0 0 auto;
    width: 50%;
    border-left: 1px solid ${0};
    padding: ${0};
  }
`),
    pxToRem(0, 34),
    ({ theme: a }) => a.devices.tablet,
    ({ theme: a }) => a.colors.general.interface,
    pxToRem(0, 0, 0, 40)
  ),
  StyledPromoBlockColumn = styled.div(
    _t2$3 ||
      (_t2$3 = _$6`
  a:hover {
    text-decoration: none;
  }
`)
  ),
  StyledPromoBlockImage = styled(StyledImageWrapper)(
    _t3$3 ||
      (_t3$3 = _$6`
  flex: 0 0 ${0};
`),
    pxToRem(200)
  ),
  StyledPromoTitle = styled.span(
    _t4$3 ||
      (_t4$3 = _$6`
  display: block;
  font-size: ${0};
  color: ${0};
  line-height: ${0};
  margin-bottom: ${0};
  margin-top: ${0};

  @media ${0} {
    margin-bottom: ${0};
    margin-top: 0;
  }
`),
    pxToRem(18),
    ({ theme: a }) => a.colors.general.primary,
    pxToRem(24),
    pxToRem(16),
    pxToRem(30),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(20)
  ),
  StyledPromoText = styled.p(
    _t5$3 ||
      (_t5$3 = _$6`
  font-size: ${0};
  line-height: ${0};
  color: ${0};
  margin-bottom: ${0};

  @media ${0} {
    margin-bottom: ${0};
  }
`),
    pxToRem(16),
    pxToRem(24),
    ({ theme: a }) => a.colors.general.text,
    pxToRem(24),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(20)
  );

let _t$5,
  _t2$2,
  _t3$2,
  _t4$2,
  _t5$2,
  _t6$2,
  _$5 = (a) => a;
const iconButtonStyles = css(
    _t$5 ||
      (_t$5 = _$5`
  background: ${0};
  border: ${0};
  border-radius: ${0};
  padding: ${0};
`),
    ({ variant: a }) => 'icon' === a && 'transparent',
    ({ variant: a }) => 'icon' === a && 'none',
    ({ variant: a }) => 'icon' === a && 0,
    ({ variant: a }) => 'icon' === a && 0
  ),
  setColor = (a, b) =>
    'primary' === b
      ? a.buttons.colors.primary.idle.text
      : a.buttons.colors.secondary.idle.text,
  buttonStyles = css(
    _t2$2 ||
      (_t2$2 = _$5`
  appearance: none;
  background: ${0};
  border-color: ${0};
  border-width: ${0};
  border-radius: ${0};
  border-style: solid;
  color: ${0};
  cursor: ${0};
  font-family: ${0};
  font-weight: ${0};
  font-size: ${0};
  font-weight: 500;
  line-height: ${0};
  max-width: 100%;
  overflow: hidden;
  padding: ${0};
  position: relative;
  text-align: center;
  text-decoration: none;
  display: ${0};
  width: ${0};

  &:focus,
  &:active {
    background: ${0};
    border-color: ${0};
  }

  &:hover span {
    transform: translateY(-50%) translateX(-8px);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${0};
  }

  > a {
    color: ${0};
  }
`),
    ({ variant: a, theme: b }) =>
      'primary' === a
        ? b.buttons.colors.primary.idle.background
        : b.buttons.colors.secondary.idle.background,
    ({ theme: a }) => a.buttons.colors.primary.idle.border,
    ({ theme: a }) => a.buttons.border.width,
    ({ theme: a }) => a.buttons.border.radius,
    ({ theme: a, variant: b }) => setColor(a, b),
    ({ disabled: a }) => (a ? 'not-allowed' : 'pointer'),
    ({ theme: a }) => a.fonts.main.family,
    ({ theme: a }) => a.fonts.main.regular,
    pxToRem(16),
    pxToRem(26),
    pxToRem(9, 32),
    ({ fullwidth: a }) => (a ? 'block' : 'inline-block'),
    ({ fullwidth: a }) => (a ? '100%' : 'auto'),
    ({ variant: a, theme: b }) =>
      'primary' === a
        ? b.buttons.colors.primary.active.background
        : b.buttons.colors.secondary.active.background,
    ({ theme: a }) => a.buttons.colors.primary.active.border,
    ({ variant: a, theme: b }) =>
      'primary' === a ? b.colors.general.white : b.colors.general.primary,
    ({ theme: a, variant: b }) => setColor(a, b)
  ),
  iconWrapperStyles = css(
    _t3$2 ||
      (_t3$2 = _$5`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) translateX(20px);
  transition: 0.2s ease-in-out transform;
`)
  ),
  StyledButton = styled.button(
    _t4$2 ||
      (_t4$2 = _$5`
  ${0}
  ${0}
`),
    buttonStyles,
    iconButtonStyles
  ),
  StyledLinkButton = styled.a(
    _t5$2 ||
      (_t5$2 = _$5`
  ${0}
  ${0}
`),
    buttonStyles,
    iconButtonStyles
  ),
  StyledIconWrapper = styled.span(
    _t6$2 ||
      (_t6$2 = _$5`
  ${0}
`),
    iconWrapperStyles
  );

let _t$4,
  _$4 = (a) => a;
const StyledBaseIcon = styled.svg(
  _t$4 ||
    (_t$4 = _$4`
  display: ${0};
  fill: ${0};
  height: ${0};
  width: ${0};
`),
  ({ styles: a }) => a.display,
  ({ styles: { fill: b }, theme: a }) =>
    '' === b ? a.colors.general.primary : b,
  ({ styles: { height: a } }) => a,
  ({ styles: { width: a } }) => a
);

const TopNavSubmenuOneColumnOnePromoBlock = ({
  item: {
    items: a,
    fields: {
      PromoTitle: b,
      Link: c,
      PromoButtonLabel: d,
      PromoButtonLink: e,
      PromoImage: f,
      ImageAlt: g,
      PromoText: h,
      SubmenuTitle: i,
      PrimaryTitle: j
    }
  }
}) => {
  var k, l, m, n, o;
  const {
    firstColumnItems: p,
    isFirstColumnVisible: q,
    isFirstColumnPrimaryLinkVisible: r,
    submenuLinkTitle: s
  } = useTopNavigationColumnCount(6, a, i, j, c, !1);
  return /*#__PURE__*/ jsxs(Fragment, {
    children: [
      q &&
        /*#__PURE__*/ jsx(TopNavSubmenuItems, {
          items: p,
          variant: '1col1promo',
          children:
            r &&
            /*#__PURE__*/ jsx(TopNavSubmenuItem, {
              title: s,
              link: c,
              className: 'submenu-parent-link'
            })
        }),
      /*#__PURE__*/ jsxs(StyledPromoBlockWrapper, {
        children: [
          /*#__PURE__*/ jsxs(StyledPromoBlockColumn, {
            children: [
              b.value &&
                /*#__PURE__*/ jsx(StyledPromoTitle, { children: b.value }),
              h.value &&
                /*#__PURE__*/ jsx(StyledPromoText, { children: h.value }),
              (null == e || null == (k = e.value) ? void 0 : k.href) &&
                /*#__PURE__*/ jsx(StyledLinkButton, {
                  href: e.value.href,
                  variant: 'secondary',
                  'data-qa': 'btn-secondary',
                  onClick: () => pushTopNavAnalyticsEvent(d.value, '2'),
                  children: /*#__PURE__*/ jsxs(Fragment, {
                    children: [
                      null != e &&
                      null != (l = e.value) &&
                      l.href &&
                      null != e &&
                      null != (m = e.value) &&
                      m.text
                        ? null == e || null == (n = e.value)
                          ? void 0
                          : n.text
                        : d.value,
                      /*#__PURE__*/ jsx(StyledIconWrapper, {
                        children: /*#__PURE__*/ jsx(StyledBaseIcon, {
                          viewBox: '0 0 32 32',
                          preserveAspectRatio: 'xMidYMid meet',
                          focusable: !1,
                          styles: {
                            display: 'block',
                            width: '',
                            height: '',
                            fill: ''
                          },
                          'aria-hidden': !0,
                          'aria-label': 'hidden',
                          children: /*#__PURE__*/ jsx('path', {
                            d: 'M12.59 27a1 1 0 01-.66-.25 1 1 0 01-.1-1.41l7.49-8.58a1.23 1.23 0 000-1.52l-7.49-8.58a1 1 0 011.51-1.32l7.49 8.59a3.21 3.21 0 010 4.14l-7.49 8.59a1 1 0 01-.75.34z',
                            'data-name': 'Arrow Right'
                          })
                        })
                      })
                    ]
                  })
                })
            ]
          }),
          (null == f || null == (o = f.value) ? void 0 : o.src) &&
            /*#__PURE__*/ jsx(StyledPromoBlockImage, {
              children: /*#__PURE__*/ jsx(WeShareImage, {
                image: f,
                widths: [200],
                ratio: '1:1',
                alt: g.value
              })
            })
        ]
      })
    ]
  });
};

const TopNavSubmenuOneColumnOneImage = ({
  item: {
    items: a,
    fields: {
      ImageRight: b,
      ImageAlt: c,
      Link: d,
      SubmenuTitle: e,
      PrimaryTitle: f
    }
  }
}) => {
  const {
    firstColumnItems: g,
    isFirstColumnVisible: h,
    isFirstColumnPrimaryLinkVisible: i,
    submenuLinkTitle: j
  } = useTopNavigationColumnCount(6, a, e, f, d, !1);
  return /*#__PURE__*/ jsxs(Fragment, {
    children: [
      h &&
        /*#__PURE__*/ jsx(TopNavSubmenuItems, {
          items: g,
          variant: '1col1img',
          children:
            i &&
            /*#__PURE__*/ jsx(TopNavSubmenuItem, {
              title: j,
              link: d,
              className: 'submenu-parent-link'
            })
        }),
      /*#__PURE__*/ jsx(StyledLargeImageWrapper, {
        children: /*#__PURE__*/ jsx(WeShareImage, {
          image: b,
          widths: [490],
          ratio: '16:9',
          alt: c.value
        })
      })
    ]
  });
};

let _t$3,
  _t2$1,
  _t3$1,
  _t4$1,
  _t5$1,
  _t6$1,
  _t7$1,
  _t8$1,
  _$3 = (a) => a;
const StyledTopNavContactUs = styled.div(
    _t$3 ||
      (_t$3 = _$3`
  width: 100%;

  @media ${0} {
    padding: ${0};
  }

  @media ${0} {
    padding-bottom: ${0};
  }
`),
    ({ theme: a }) => a.devices.mobileOnly,
    pxToRem(23, 34, 73, 34),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(30)
  ),
  StyledTopNavContactUsTitle = styled.p(
    _t2$1 ||
      (_t2$1 = _$3`
  font-size: ${0};
  color: ${0};
  padding-bottom: ${0};
`),
    pxToRem(20),
    ({ theme: a }) => a.colors.general.primary,
    pxToRem(5)
  ),
  StyledTopNavContactUsText = styled.p(
    _t3$1 ||
      (_t3$1 = _$3`
  color: ${0};
`),
    ({ theme: a }) => a.colors.greys.darker
  ),
  StyledTopNavContactUsItems = styled.ul(
    _t4$1 ||
      (_t4$1 = _$3`
  @media ${0} {
    margin: ${0};
  }

  @media ${0} {
    display: flex;
    margin: 0 ${0};
    padding: ${0} 0;
  }
`),
    ({ theme: a }) => a.devices.mobileOnly,
    pxToRem(40, 0, 16, 0),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(-24),
    pxToRem(23)
  ),
  StyledTopNavContactUsItem = styled.li(
    _t5$1 ||
      (_t5$1 = _$3`
  @media ${0} {
    margin-bottom: ${0};
  }

  @media ${0} {
    flex: 0 0 auto;
    width: 33.3333%;
    padding: 0 ${0};
  }

  a {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: solid ${0} ${0};
    border-radius: ${0};
    padding: ${0};
    text-decoration: none;
    font-weight: 500;
    width: 100%;
    color: ${0};
    transition: 0.2s ease-in-out;
    transition-property: color, border-color;

    @media ${0} {
      color: ${0};
      padding: ${0};
    }

    &:hover {
      border-color: ${0};
    }
  }

  svg {
    display: block;
    max-width: ${0};
    max-height: ${0};
  }
`),
    ({ theme: a }) => a.devices.mobileOnly,
    pxToRem(8),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(24),
    pxToRem(1),
    ({ theme: a }) => a.colors.greys.light,
    pxToRem(3),
    pxToRem(14, 16),
    ({ theme: a }) => a.colors.greys.darker,
    ({ theme: a }) => a.devices.tablet,
    ({ theme: a }) => a.colors.greys.dark,
    pxToRem(13, 16),
    ({ theme: a }) => a.colors.general.primary,
    pxToRem(24),
    pxToRem(24)
  ),
  StyledTopNavContactUsButtonLabel = styled.span(
    _t6$1 ||
      (_t6$1 = _$3`
  flex: 1 0 auto;
  font-size: ${0};
  max-width: 100%;

  @media ${0} {
    font-size: ${0};
  }
`),
    pxToRem(14),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(16)
  ),
  StyledTopNavContactUsButtonText = styled.span(
    _t7$1 ||
      (_t7$1 = _$3`
  color: ${0};
  padding-left: ${0};
  max-width: 100%;

  &:empty {
    display: none;
  }

  @media ${0} {
    font-size: ${0};
  }
`),
    ({ theme: a }) => a.colors.general.primary,
    pxToRem(14),
    ({ theme: a }) => a.devices.tablet,
    pxToRem(18)
  ),
  StyledTopNavContactUsDisclaimerText = styled.p(
    _t8$1 ||
      (_t8$1 = _$3`
  color: ${0};
  font-size: ${0};
  line-height: ${0};

  @media ${0} {
    color: ${0};
    font-size: ${0};
    line-height: ${0};
    max-width: ${0};
  }
`),
    ({ theme: a }) => a.colors.greys.darker,
    pxToRem(12),
    pxToRem(16),
    ({ theme: a }) => a.devices.tablet,
    ({ theme: a }) => a.colors.general.grey,
    pxToRem(14),
    pxToRem(18),
    pxToRem(641)
  );

let _t$2,
  _$2 = (a) => a;
const StyledSitecoreSvgIcon = styled.div(
  _t$2 ||
    (_t$2 = _$2`
  svg {
    width: ${0};
    height: ${0};
  }

  svg,
  svg * {
    fill: ${0};
  }
`),
  pxToRem(32),
  pxToRem(32),
  ({ theme: a }) => a.colors.general.primary
);

const TopNavContactUs = ({
  item: {
    items: a,
    fields: { DisclaimerText: b, Text: c, Title: d }
  }
}) => {
  const { renderLink: e } = useLinkContext(),
    f =
      null == a
        ? void 0
        : a
            .filter(
              (a) =>
                a.templateId ===
                TopNavTemplateIds.TopNavPrimaryItemContactUsButtonTemplateId
            )
            .slice(0, 3);
  return /*#__PURE__*/ jsxs(StyledTopNavContactUs, {
    'data-qa': 'topnav-contactus',
    children: [
      /*#__PURE__*/ jsx(StyledTopNavContactUsTitle, { children: d.value }),
      /*#__PURE__*/ jsx(StyledTopNavContactUsText, { children: c.value }),
      0 < (null == f ? void 0 : f.length) &&
        /*#__PURE__*/ jsx(StyledTopNavContactUsItems, {
          'data-qa': 'topnav-contactus-cta',
          children:
            null == f
              ? void 0
              : f.map((a) => {
                  var b, c, d, f;
                  return (
                    'ButtonLabel' in a.fields &&
                    /*#__PURE__*/ jsx(
                      StyledTopNavContactUsItem,
                      {
                        children:
                          (null == a ||
                          null == (b = a.fields) ||
                          null == (c = b.ButtonLink) ||
                          null == (d = c.value)
                            ? void 0
                            : d.href) &&
                          (null == a || null == (f = a.fields)
                            ? void 0
                            : f.ButtonIcon) &&
                          e(
                            a.fields.ButtonLink.value,
                            /*#__PURE__*/ jsxs(Fragment, {
                              children: [
                                /*#__PURE__*/ jsx(
                                  StyledTopNavContactUsButtonLabel,
                                  { children: a.fields.ButtonLabel.value }
                                ),
                                /*#__PURE__*/ jsx(StyledSitecoreSvgIcon, {
                                  dangerouslySetInnerHTML: {
                                    __html:
                                      a.fields.ButtonIcon.fields.SvgIcon.value
                                  },
                                  'data-qa': `sc-icon-${a.fields.ButtonIcon.name}`
                                }),
                                /*#__PURE__*/ jsx(
                                  StyledTopNavContactUsButtonText,
                                  { children: a.fields.ButtonText.value }
                                )
                              ]
                            }),
                            () =>
                              pushTopNavAnalyticsEvent(
                                a.fields.ButtonLabel.value,
                                '2'
                              )
                          )
                      },
                      a.id
                    )
                  );
                })
        }),
      /*#__PURE__*/ jsx(StyledTopNavContactUsDisclaimerText, {
        children: b.value
      })
    ]
  });
};

const TopNavSubmenuTwoProductBlocksOneImage = ({
  item: {
    items: a,
    fields: { ImageRight: b, ImageAlt: c }
  }
}) => {
  const d = null == a ? void 0 : a.map((a) => a.items).slice(0, 2),
    e = (a) =>
      null == a ? void 0 : a.filter((a) => a.fields.Enabled.value).slice(0, 6);
  return /*#__PURE__*/ jsxs(Fragment, {
    children: [
      null == d
        ? void 0
        : d.map((b, c) => {
            var d, f, g;
            return /*#__PURE__*/ jsx(
              TopNavSubmenuItems,
              {
                items: e(b),
                variant: '2col1img',
                title:
                  null == (d = a[c]) ||
                  null == (f = d.fields) ||
                  null == (g = f.ColumnTitle)
                    ? void 0
                    : g.value
              },
              c
            );
          }),
      /*#__PURE__*/ jsx(StyledImageWrapper, {
        children: /*#__PURE__*/ jsx(WeShareImage, {
          image: b,
          widths: [200],
          ratio: '1:1',
          alt: c.value
        })
      })
    ]
  });
};

const TopNavSubmenuTemplate = ({ item: a }) => {
  switch (a.templateId) {
    case TopNavTemplateIds.TopNavPrimaryItem2Columns1SmallImageTemplateId:
      return /*#__PURE__*/ jsx(TopNavSubmenuTwoColumnsOneImage, { item: a });
    case TopNavTemplateIds.TopNavPrimaryItem1Column1PromoBlockTemplateId:
      return /*#__PURE__*/ jsx(TopNavSubmenuOneColumnOnePromoBlock, {
        item: a
      });
    case TopNavTemplateIds.TopNavPrimaryItem1Columns1LargeImageTemplateId:
      return /*#__PURE__*/ jsx(TopNavSubmenuOneColumnOneImage, { item: a });
    case TopNavTemplateIds.TopNavPrimaryItemContactUsTemplateId:
      return /*#__PURE__*/ jsx(TopNavContactUs, { item: a });
    case TopNavTemplateIds.TopNavPrimaryItem2ProductBlocks1ImageTemplateId:
      return /*#__PURE__*/ jsx(TopNavSubmenuTwoProductBlocksOneImage, {
        item: a
      });
    default:
      return null;
  }
};

const TopNavSubmenu = ({ item: a, isOpen: b }) => {
  const { setIsOverlayVisible: c } = useContext(HeaderOverlayContext);
  return /*#__PURE__*/ jsx(StyledTopNavItemsWrapper, {
    id: a.templateId,
    isOpen: b,
    onFocus: () => c(b),
    'data-qa': `topnav-submenu ${a.displayName}`,
    children: /*#__PURE__*/ jsx(TopNavSubmenuTemplate, { item: a })
  });
};

const TopNavPrimaryItemWithSubmenu = ({ item: a, isOpen: b }) => {
  const { isMobile: c } = useIsMobile(),
    [d, e] = useState(b),
    f = () => {
      c && e(!d);
    };
  return /*#__PURE__*/ jsxs(Fragment, {
    children: [
      /*#__PURE__*/ jsxs(StyledNavButton, {
        type: 'button',
        title: a.displayName,
        'data-qa': `header-navigation-button`,
        isOpen: c && d,
        'aria-haspopup': 'true',
        'aria-controls': a.id,
        'aria-expanded': c ? d : b,
        onClick: () => f(),
        children: [
          a.fields.PrimaryTitle.value,
          c && d
            ? /*#__PURE__*/ jsx(StyledBaseIcon, {
                viewBox: '0 0 16 16',
                preserveAspectRatio: 'xMidYMid meet',
                focusable: !1,
                styles: { display: 'block', width: '', height: '', fill: '' },
                'aria-hidden': !0,
                children: /*#__PURE__*/ jsx('path', {
                  d: 'M26 17H6a1 1 0 010-2h20a1 1 0 010 2z'
                })
              })
            : /*#__PURE__*/ jsx(StyledBaseIcon, {
                viewBox: '0 0 16 16',
                preserveAspectRatio: 'xMidYMid meet',
                focusable: !1,
                styles: { display: 'block', width: '', height: '', fill: '' },
                'aria-hidden': !0,
                children: /*#__PURE__*/ jsx('polygon', {
                  points:
                    '8.5,0 7.5,0 7.5,7.5 0,7.5 0,8.5 7.5,8.5 7.5,16 8.5,16 8.5,8.5 16,8.5 16,7.5 8.5,7.5 8.5,0'
                })
              })
        ]
      }),
      /*#__PURE__*/ jsx(TopNavSubmenu, { item: a, isOpen: c ? d : b })
    ]
  });
};

const TopNavPrimaryItem = ({ item: a }) => {
  const { isMobile: b } = useIsMobile(),
    [c, d] = useState(!1),
    { setIsOverlayVisible: e } = useContext(HeaderOverlayContext),
    f = useRef(null);
  useFocusOutside(f, () => h(!1)),
    useLocationChange(() => h(!1)),
    useClickOutside(f, () => h(!1)),
    useGlobalKeyDown(() => h(!1), 'Escape');
  const g = (a) => {
      d(a), e(a);
    },
    h = (a) => !b && !i && g(a),
    i =
      a.templateId ===
      TopNavTemplateIds.TopNavPrimaryItemWithoutSubmenuTemplateId;
  return /*#__PURE__*/ jsxs(StyledTopNavigationItem, {
    ref: f,
    onMouseOver: () => h(!0),
    onMouseLeave: () => h(!1),
    onClick: () => h(!0),
    children: [
      i && /*#__PURE__*/ jsx(TopNavPrimaryItemWithoutSubmenu, { item: a }),
      !i &&
        /*#__PURE__*/ jsx(TopNavPrimaryItemWithSubmenu, { item: a, isOpen: c })
    ]
  });
};

const TopNavigation = ({ navigationData: a, renderLink: b }) => {
  const { isMenuOpen: c, setMenuOpen: d } = useContext(HeaderMobileMenuContext),
    e = useRef(null);
  useLocationChange(() => d(!1)),
    useEffect(() => {
      if (c && null != e && e.current) {
        const a = e.current.querySelector('button, a');
        setTimeout(() => {
          null == a ? void 0 : a.focus();
        }, 0);
      }
    }, [c]);
  const f = useMemo(
    () =>
      null == a ? void 0 : a.filter((a) => a.fields.Enabled.value).slice(0, 8),
    [a]
  );
  return /*#__PURE__*/ jsx(LinkContextProvider, {
    renderLink: b || defaultRenderLink,
    children: /*#__PURE__*/ jsx(StyledTopNavigation, {
      'data-id': 'top-navigation',
      'data-name': 'top-navigation',
      isMenuOpen: c,
      ref: e,
      children:
        0 < f.length &&
        /*#__PURE__*/ jsx(Fragment, {
          children: f.map((a) =>
            /*#__PURE__*/ jsx(TopNavPrimaryItem, { item: a }, a.name)
          )
        })
    })
  });
};

let _t$1,
  _$1 = (a) => a;
const StyledHeader = styled.header(
  _t$1 ||
    (_t$1 = _$1`
  position: ${0};

  @supports (position: sticky) {
    position: ${0};
  }
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: ${0};

  @media ${0} {
    box-shadow: ${0} rgba(0, 0, 0, 0.06);
    padding: ${0};
  }
`),
  ({ pageEditing: a }) => (a ? 'relative' : 'fixed'),
  ({ pageEditing: a }) => (a ? 'relative' : 'sticky'),
  ({ theme: a }) => a.colors.general.white,
  ({ theme: a }) => a.devices.tablet,
  pxToRem(0, 2, 4),
  pxToRem(29, 0, 0)
);

let _t,
  _t2,
  _t3,
  _t4,
  _t5,
  _t6,
  _t7,
  _t8,
  _t9,
  _ = (a) => a;
styled.div(
  _t ||
    (_t = _`
  height: ${0};
  flex: 1;
  text-align: center;

  @media ${0} {
    height: ${0};
  }
`),
  pxToRem(29.85),
  ({ theme: a }) => a.devices.tablet,
  pxToRem(52)
);
const StyledHeaderTopWrapper = styled.nav(
    _t2 ||
      (_t2 = _`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 999;
  box-shadow: ${0} rgba(0, 0, 0, 0.06);
  padding: ${0};

  button svg {
    fill: ${0};

    &:hover {
      fill: ${0};
    }
  }
  &::after {
    content: '';
    flex: 1;
  }

  @media ${0} {
    box-shadow: none;
    padding: 0;

    &::before {
      content: '';
      flex: 1;
    }
  }
`),
    pxToRem(0, 2, 4),
    pxToRem(15, 20),
    ({ theme: a }) => a.colors.greys.darkest,
    ({ theme: a }) => a.colors.general.primary,
    ({ theme: a }) => a.devices.tablet
  ),
  StyledButtonContainer = styled.div(
    _t3 ||
      (_t3 = _`
  flex: 1;
  button {
    display: flex;
    align-items: center;

    svg {
      width: ${0};
      height: ${0};
    }
  }

  @media ${0} {
    display: none;
  }
`),
    pxToRem(16),
    pxToRem(16),
    ({ theme: a }) => a.devices.tablet
  ),
  TransitionCSS = css(
    _t4 ||
      (_t4 = _`
  transition: 0.25s cubic-bezier(0.81, 0.23, 0.23, 0.76);
`)
  ),
  MoveDownAnimation = css(
    _t5 ||
      (_t5 = _`
  transform: translateY(${0});
  ${0}
`),
    pxToRem(18),
    TransitionCSS
  ),
  FadeOutAnimation = css(
    _t6 ||
      (_t6 = _`
  visibility: hidden;
  opacity: 0;
  ${0}
`),
    TransitionCSS
  ),
  FadeInAnimation = css(
    _t7 ||
      (_t7 = _`
  visibility: visible;
  opacity: 1;
  ${0}
`),
    TransitionCSS
  ),
  MoveUpAnimation = css(
    _t8 ||
      (_t8 = _`
  transform: translateY(${0});
  ${0}
`),
    pxToRem(0),
    TransitionCSS
  );
styled.a(
  _t9 ||
    (_t9 = _`
  display: inline-block;
  height: 100%;

  svg {
    fill: ${0};
  }

  .crown {
    path#crown {
      ${0}
    }
    path#text {
      ${0}
    }
  }
  .normal {
    path#crown {
      ${0}
    }
    path#text {
      ${0}
    }
  }
`),
  ({ theme: a }) => a.colors.general.primary,
  MoveDownAnimation,
  FadeOutAnimation,
  MoveUpAnimation,
  FadeInAnimation
);

const HeaderTop = ({ openMenuText: a, closeMenuText: b }) => {
  const { isMenuOpen: c, setMenuOpen: d } = useContext(HeaderMobileMenuContext),
    [e, f] = useState(!1);
  return (
    useScrollLock(c),
    useEffect(() => {
      f(c);
    }, [c]),
    /*#__PURE__*/ jsx(StyledHeaderTopWrapper, {
      role: 'menu',
      children: /*#__PURE__*/ jsx(StyledButtonContainer, {
        children: /*#__PURE__*/ jsx(StyledButton, {
          'aria-label': `${e ? b : a}`,
          role: 'menuitem',
          variant: 'icon',
          'data-qa': `header-menu-button-${e ? 'close' : 'open'}`,
          onClick: () => {
            d(!e);
          },
          children: /*#__PURE__*/ jsx(StyledBaseIcon, {
            viewBox: '0 0 32 32',
            preserveAspectRatio: 'xMidYMid meet',
            focusable: !1,
            styles: { display: 'block', width: '', height: '', fill: '' },
            'aria-hidden': !0,
            'aria-label': 'hidden',
            children: /*#__PURE__*/ jsx('path', {
              d: 'M31 17H1a1 1 0 010-2h30a1 1 0 010 2zM21 7H1a1 1 0 010-2h20a1 1 0 010 2zM27 27H1a1 1 0 010-2h26a1 1 0 010 2z',
              'data-name': 'Menu'
            })
          })
        })
      })
    })
  );
};

const HeaderWrapper = ({
  openTextCopy: a,
  closeTextCopy: b,
  locale: c,
  site: d,
  apiHost: e,
  navigationData: f
}) => {
  const g = a ? a : 'Open',
    h = b ? b : 'Close',
    [i, j] = useState(f),
    k = useRef(null),
    { isMenuOpen: l, setMenuOpen: m } = useContext(HeaderMobileMenuContext);
  return (
    useFocusOutside(k, () => l && m(!1)),
    useLocationChange(() => m(!1)),
    useEffect(() => {
      if (!(null != i && i.length) && d && c) {
        (async () => {
          var a;
          const b = await fetchNavigationRenderingHost(d, c, e);
          j(
            (null == b || null == (a = b.siteSettings) ? void 0 : a.items) || []
          );
        })();
      }
    }, [c, d, e, null == i ? void 0 : i.length]),
    /*#__PURE__*/ jsx(ThemeProvider, {
      theme: royalCaninTheme,
      children: /*#__PURE__*/ jsx(HeaderMobileMenuContextProvider, {
        children: /*#__PURE__*/ jsxs(HeaderOverlayContextProvider, {
          children: [
            /*#__PURE__*/ jsxs(StyledHeader, {
              'data-qa': 'header',
              ref: k,
              pageEditing: !1,
              children: [
                /*#__PURE__*/ jsx(HeaderTop, {
                  openMenuText: g,
                  closeMenuText: h
                }),
                0 < (null == i ? void 0 : i.length) &&
                  /*#__PURE__*/ jsx(TopNavigation, { navigationData: i })
              ]
            }),
            /*#__PURE__*/ jsx(HeaderMenuOverlay, {})
          ]
        })
      })
    })
  );
};

const CountrySelector = () => {
  const { state: a } = useCountrySelectorContext();
  return /*#__PURE__*/ jsx('div', { children: a.selectedCountry });
};

const CountrySelectorWrapper = ({ apiHost: a, locale: b, site: c }) => {
  const [d, e] = useState({}),
    { state: f } = useCountrySelectorContext();
  return (
    useEffect(() => {
      if (!Object.keys(d).length && c && b) {
        (async () => {
          const d = await fetchCountriesRenderingHost(c, b, a);
          e(d);
        })();
      }
    }, [b, c, a, d]),
    useEffect(() => {
      if (Object.keys(d).length) {
        const a = d.countrySelector.tenantSettings.items.filter((a) => {
          var c;
          return (
            (null == (c = a.fields.RelatedLanguage.name)
              ? void 0
              : c.toLowerCase()) === (null == b ? void 0 : b.toLowerCase())
          );
        })[0];
        f.setCountrySelectorData(d), f.setSelectedCountry(a.name);
      }
    }, [d, b]),
    /*#__PURE__*/ jsx('div', {
      children: /*#__PURE__*/ jsx(CountrySelector, {})
    })
  );
};

export {
  CountrySelectorWrapper as CountrySelector,
  CountrySelector as CountrySelectorDecoupled,
  CountrySelectorProvider,
  ExportedComponentsProvider,
  Footer,
  HeaderMenuOverlay,
  HeaderMobileMenuContext,
  HeaderMobileMenuContextProvider,
  HeaderOverlayContext,
  HeaderOverlayContextProvider,
  HeaderWrapper as TopNavigation,
  TopNavigation as TopNavigationDecoupled,
  fetchCountriesContentDelivery,
  fetchFooterContentDelivery,
  fetchNavigationContentDelivery,
  useCountrySelectorContext
};
