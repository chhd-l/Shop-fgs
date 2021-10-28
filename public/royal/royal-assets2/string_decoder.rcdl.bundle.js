(window["RCDLjsonFunction"]=window["RCDLjsonFunction"]||[]).push([[74],{485:function(t,e,s){"use strict";var i=s(461).Buffer;var n=i.isEncoding||function(t){t=""+t;switch(t&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return true;default:return false}};function _normalizeEncoding(t){if(!t)return"utf8";var e;while(true){switch(t){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return t;default:if(e)return;t=(""+t).toLowerCase();e=true}}}function normalizeEncoding(t){var e=_normalizeEncoding(t);if(typeof e!=="string"&&(i.isEncoding===n||!n(t)))throw new Error("Unknown encoding: "+t);return e||t}e.StringDecoder=StringDecoder;function StringDecoder(t){this.encoding=normalizeEncoding(t);var e;switch(this.encoding){case"utf16le":this.text=utf16Text;this.end=utf16End;e=4;break;case"utf8":this.fillLast=utf8FillLast;e=4;break;case"base64":this.text=base64Text;this.end=base64End;e=3;break;default:this.write=simpleWrite;this.end=simpleEnd;return}this.lastNeed=0;this.lastTotal=0;this.lastChar=i.allocUnsafe(e)}StringDecoder.prototype.write=function(t){if(t.length===0)return"";var e;var s;if(this.lastNeed){e=this.fillLast(t);if(e===undefined)return"";s=this.lastNeed;this.lastNeed=0}else{s=0}if(s<t.length)return e?e+this.text(t,s):this.text(t,s);return e||""};StringDecoder.prototype.end=utf8End;StringDecoder.prototype.text=utf8Text;StringDecoder.prototype.fillLast=function(t){if(this.lastNeed<=t.length){t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,t.length);this.lastNeed-=t.length};function utf8CheckByte(t){if(t<=127)return 0;else if(t>>5===6)return 2;else if(t>>4===14)return 3;else if(t>>3===30)return 4;return t>>6===2?-1:-2}function utf8CheckIncomplete(t,e,s){var i=e.length-1;if(i<s)return 0;var n=utf8CheckByte(e[i]);if(n>=0){if(n>0)t.lastNeed=n-1;return n}if(--i<s||n===-2)return 0;n=utf8CheckByte(e[i]);if(n>=0){if(n>0)t.lastNeed=n-2;return n}if(--i<s||n===-2)return 0;n=utf8CheckByte(e[i]);if(n>=0){if(n>0){if(n===2)n=0;else t.lastNeed=n-3}return n}return 0}function utf8CheckExtraBytes(t,e,s){if((e[0]&192)!==128){t.lastNeed=0;return"�"}if(t.lastNeed>1&&e.length>1){if((e[1]&192)!==128){t.lastNeed=1;return"�"}if(t.lastNeed>2&&e.length>2){if((e[2]&192)!==128){t.lastNeed=2;return"�"}}}}function utf8FillLast(t){var e=this.lastTotal-this.lastNeed;var s=utf8CheckExtraBytes(this,t,e);if(s!==undefined)return s;if(this.lastNeed<=t.length){t.copy(this.lastChar,e,0,this.lastNeed);return this.lastChar.toString(this.encoding,0,this.lastTotal)}t.copy(this.lastChar,e,0,t.length);this.lastNeed-=t.length}function utf8Text(t,e){var s=utf8CheckIncomplete(this,t,e);if(!this.lastNeed)return t.toString("utf8",e);this.lastTotal=s;var i=t.length-(s-this.lastNeed);t.copy(this.lastChar,0,i);return t.toString("utf8",e,i)}function utf8End(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed)return e+"�";return e}function utf16Text(t,e){if((t.length-e)%2===0){var s=t.toString("utf16le",e);if(s){var i=s.charCodeAt(s.length-1);if(i>=55296&&i<=56319){this.lastNeed=2;this.lastTotal=4;this.lastChar[0]=t[t.length-2];this.lastChar[1]=t[t.length-1];return s.slice(0,-1)}}return s}this.lastNeed=1;this.lastTotal=2;this.lastChar[0]=t[t.length-1];return t.toString("utf16le",e,t.length-1)}function utf16End(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed){var s=this.lastTotal-this.lastNeed;return e+this.lastChar.toString("utf16le",0,s)}return e}function base64Text(t,e){var s=(t.length-e)%3;if(s===0)return t.toString("base64",e);this.lastNeed=3-s;this.lastTotal=3;if(s===1){this.lastChar[0]=t[t.length-1]}else{this.lastChar[0]=t[t.length-2];this.lastChar[1]=t[t.length-1]}return t.toString("base64",e,t.length-s)}function base64End(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed)return e+this.lastChar.toString("base64",0,3-this.lastNeed);return e}function simpleWrite(t){return t.toString(this.encoding)}function simpleEnd(t){return t&&t.length?this.write(t):""}}}]);