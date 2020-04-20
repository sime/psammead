(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1642:function(module,exports){function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}!function(){"use strict";if("object"===("undefined"==typeof window?"undefined":_typeof(window)))if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function get(){return this.intersectionRatio>0}});else{var document=window.document,registry=[];IntersectionObserver.prototype.THROTTLE_TIMEOUT=100,IntersectionObserver.prototype.POLL_INTERVAL=null,IntersectionObserver.prototype.USE_MUTATION_OBSERVER=!0,IntersectionObserver.prototype.observe=function(target){if(!this._observationTargets.some((function(item){return item.element==target}))){if(!target||1!=target.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:target,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},IntersectionObserver.prototype.unobserve=function(target){this._observationTargets=this._observationTargets.filter((function(item){return item.element!=target})),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},IntersectionObserver.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},IntersectionObserver.prototype.takeRecords=function(){var records=this._queuedEntries.slice();return this._queuedEntries=[],records},IntersectionObserver.prototype._initThresholds=function(opt_threshold){var threshold=opt_threshold||[0];return Array.isArray(threshold)||(threshold=[threshold]),threshold.sort().filter((function(t,i,a){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==a[i-1]}))},IntersectionObserver.prototype._parseRootMargin=function(opt_rootMargin){var margins=(opt_rootMargin||"0px").split(/\s+/).map((function(margin){var parts=/^(-?\d*\.?\d+)(px|%)$/.exec(margin);if(!parts)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(parts[1]),unit:parts[2]}}));return margins[1]=margins[1]||margins[0],margins[2]=margins[2]||margins[0],margins[3]=margins[3]||margins[1],margins},IntersectionObserver.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(addEvent(window,"resize",this._checkForIntersections,!0),addEvent(document,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},IntersectionObserver.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,removeEvent(window,"resize",this._checkForIntersections,!0),removeEvent(document,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},IntersectionObserver.prototype._checkForIntersections=function(){var rootIsInDom=this._rootIsInDom(),rootRect=rootIsInDom?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach((function(item){var target=item.element,targetRect=getBoundingClientRect(target),rootContainsTarget=this._rootContainsTarget(target),oldEntry=item.entry,intersectionRect=rootIsInDom&&rootContainsTarget&&this._computeTargetAndRootIntersection(target,rootRect),newEntry=item.entry=new IntersectionObserverEntry({time:window.performance&&performance.now&&performance.now(),target:target,boundingClientRect:targetRect,rootBounds:rootRect,intersectionRect:intersectionRect});oldEntry?rootIsInDom&&rootContainsTarget?this._hasCrossedThreshold(oldEntry,newEntry)&&this._queuedEntries.push(newEntry):oldEntry&&oldEntry.isIntersecting&&this._queuedEntries.push(newEntry):this._queuedEntries.push(newEntry)}),this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},IntersectionObserver.prototype._computeTargetAndRootIntersection=function(target,rootRect){if("none"!=window.getComputedStyle(target).display){for(var rect1,rect2,top,bottom,left,right,width,height,intersectionRect=getBoundingClientRect(target),parent=getParentNode(target),atRoot=!1;!atRoot;){var parentRect=null,parentComputedStyle=1==parent.nodeType?window.getComputedStyle(parent):{};if("none"==parentComputedStyle.display)return;if(parent==this.root||parent==document?(atRoot=!0,parentRect=rootRect):parent!=document.body&&parent!=document.documentElement&&"visible"!=parentComputedStyle.overflow&&(parentRect=getBoundingClientRect(parent)),parentRect&&(rect1=parentRect,rect2=intersectionRect,top=void 0,bottom=void 0,left=void 0,right=void 0,width=void 0,height=void 0,top=Math.max(rect1.top,rect2.top),bottom=Math.min(rect1.bottom,rect2.bottom),left=Math.max(rect1.left,rect2.left),right=Math.min(rect1.right,rect2.right),height=bottom-top,!(intersectionRect=(width=right-left)>=0&&height>=0&&{top:top,bottom:bottom,left:left,right:right,width:width,height:height})))break;parent=getParentNode(parent)}return intersectionRect}},IntersectionObserver.prototype._getRootRect=function(){var rootRect;if(this.root)rootRect=getBoundingClientRect(this.root);else{var html=document.documentElement,body=document.body;rootRect={top:0,left:0,right:html.clientWidth||body.clientWidth,width:html.clientWidth||body.clientWidth,bottom:html.clientHeight||body.clientHeight,height:html.clientHeight||body.clientHeight}}return this._expandRectByRootMargin(rootRect)},IntersectionObserver.prototype._expandRectByRootMargin=function(rect){var margins=this._rootMarginValues.map((function(margin,i){return"px"==margin.unit?margin.value:margin.value*(i%2?rect.width:rect.height)/100})),newRect={top:rect.top-margins[0],right:rect.right+margins[1],bottom:rect.bottom+margins[2],left:rect.left-margins[3]};return newRect.width=newRect.right-newRect.left,newRect.height=newRect.bottom-newRect.top,newRect},IntersectionObserver.prototype._hasCrossedThreshold=function(oldEntry,newEntry){var oldRatio=oldEntry&&oldEntry.isIntersecting?oldEntry.intersectionRatio||0:-1,newRatio=newEntry.isIntersecting?newEntry.intersectionRatio||0:-1;if(oldRatio!==newRatio)for(var i=0;i<this.thresholds.length;i++){var threshold=this.thresholds[i];if(threshold==oldRatio||threshold==newRatio||threshold<oldRatio!=threshold<newRatio)return!0}},IntersectionObserver.prototype._rootIsInDom=function(){return!this.root||containsDeep(document,this.root)},IntersectionObserver.prototype._rootContainsTarget=function(target){return containsDeep(this.root||document,target)},IntersectionObserver.prototype._registerInstance=function(){registry.indexOf(this)<0&&registry.push(this)},IntersectionObserver.prototype._unregisterInstance=function(){var index=registry.indexOf(this);-1!=index&&registry.splice(index,1)},window.IntersectionObserver=IntersectionObserver,window.IntersectionObserverEntry=IntersectionObserverEntry}function IntersectionObserverEntry(entry){this.time=entry.time,this.target=entry.target,this.rootBounds=entry.rootBounds,this.boundingClientRect=entry.boundingClientRect,this.intersectionRect=entry.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!entry.intersectionRect;var targetRect=this.boundingClientRect,targetArea=targetRect.width*targetRect.height,intersectionRect=this.intersectionRect,intersectionArea=intersectionRect.width*intersectionRect.height;this.intersectionRatio=targetArea?Number((intersectionArea/targetArea).toFixed(4)):this.isIntersecting?1:0}function IntersectionObserver(callback,opt_options){var options=opt_options||{};if("function"!=typeof callback)throw new Error("callback must be a function");if(options.root&&1!=options.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=function throttle(fn,timeout){var timer=null;return function(){timer||(timer=setTimeout((function(){fn(),timer=null}),timeout))}}(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=callback,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(options.rootMargin),this.thresholds=this._initThresholds(options.threshold),this.root=options.root||null,this.rootMargin=this._rootMarginValues.map((function(margin){return margin.value+margin.unit})).join(" ")}function addEvent(node,event,fn,opt_useCapture){"function"==typeof node.addEventListener?node.addEventListener(event,fn,opt_useCapture||!1):"function"==typeof node.attachEvent&&node.attachEvent("on"+event,fn)}function removeEvent(node,event,fn,opt_useCapture){"function"==typeof node.removeEventListener?node.removeEventListener(event,fn,opt_useCapture||!1):"function"==typeof node.detatchEvent&&node.detatchEvent("on"+event,fn)}function getBoundingClientRect(el){var rect;try{rect=el.getBoundingClientRect()}catch(err){}return rect?(rect.width&&rect.height||(rect={top:rect.top,right:rect.right,bottom:rect.bottom,left:rect.left,width:rect.right-rect.left,height:rect.bottom-rect.top}),rect):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function containsDeep(parent,child){for(var node=child;node;){if(node==parent)return!0;node=getParentNode(node)}return!1}function getParentNode(node){var parent=node.parentNode;return parent&&11==parent.nodeType&&parent.host?parent.host:parent&&parent.assignedSlot?parent.assignedSlot.parentNode:parent}}()}}]);
//# sourceMappingURL=intersection-observer-polyfill.3cef2d00de3f68ce6558.bundle.js.map