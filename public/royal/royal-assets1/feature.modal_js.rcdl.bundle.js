(window["RCDLjsonFunction"]=window["RCDLjsonFunction"]||[]).push([[16],{177:function(e,t,i){"use strict";i.r(t);var r=i(416);var a=i.n(r);var n=i(417);var l=i(8);var o=i.n(l);var s=i(0);var u=i.n(s);RCDL.features.modal=function(e){var t=document.body;var i=null;if(window.document!==null){i=RCDL.utilities.queryDOM(e);if(i.length>0){var r;u()(r=o()(i)).call(r,function(r){if(i[r].getAttribute("data-modal-active")!=="true"){i[r].setAttribute("data-modal-active","true");i[r].addEventListener("click",function(){var a='[data-modal-target="'+i[r].getAttribute(e.replace(/\[|\]/g,""))+'"]';var n=document.querySelector(a);if(n!==null){RCDL.utilities.modifyClass("toggle",n,"rc-hidden");t.appendChild(n);if(!RCDL.utilities.hasClass(n,"rc-modal--full")){RCDL.shade(n)}if(RCDL.utilities.hasClass(n,"rc-hidden")){RCDL.utilities.modifyClass("remove",t,"rc-scroll--none")}else{RCDL.utilities.modifyClass("add",t,"rc-scroll--none")}RCDL.utilities.queryDOM(".rc-modal__close",n)[0].focus()}else{throw new Error("Failed to find ".concat(a,". The markup is probably missing."))}window.RCDL.utilities.triggerResize()})}})}}};t["default"]={fn:function(){var e=Object(n["a"])(a.a.mark(function _callee(){return a.a.wrap(function _callee$(e){while(1){switch(e.prev=e.next){case 0:return e.abrupt("return",RCDL.features.modal("[data-modal-trigger]"));case 1:case"end":return e.stop()}}},_callee)}));function fn(){return e.apply(this,arguments)}return fn}(),trigger:{selector:["[data-modal-trigger]"]}}}}]);