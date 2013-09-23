/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:120810:nu_ll:/html/js/ui.js.pkg.php:92                                 */
/*      Machine:  10.16.140.105                                                               */
/*    Generated:  September 13th 2008 1:22:10 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


var Drag={};Drag.currentDraggable=null;Drag.grab=function(draggable){if(Drag.currentDraggable){Drag._onmouseup();}
draggable.lastDragOver=null;Drag.attachDragEvents();Drag.currentDraggable=draggable;}
Drag.attachDragEvents=function(){document.onselectstart=function(){document.onselectstart=null;return false;}
if(Drag.dragEventsAttached){return;}
Drag.dragEventsAttached=true;Event.listen(document,'mousemove',Drag._onmousemove);Event.listen(document,'mouseup',Drag._onmouseup);}
Drag.droppables={};Drag.addDroppable=function(namespace,droppable){(Drag.droppables[namespace]=Drag.droppables[namespace]||[]).push(droppable);}
Drag.removeDroppable=function(namespace,droppable){Drag.droppables[namespace].filter(function(a){a!=droppable;});}
Drag._onmousemove=function(event){if(!Drag.currentDraggable){return;}
var cursorPosition=Vector2.getEventPosition(event),currentDraggable=Drag.currentDraggable,droppables=Drag.droppables[currentDraggable.namespace];if(currentDraggable.namespace&&currentDraggable.active&&droppables){var zIndexesDict={};droppables.each(function(droppable){zIndexesDict[droppable.zIndex]=droppable.zIndex;});var zIndexes=[];for(var i in zIndexesDict){zIndexes.push(zIndexesDict[i]);}
zIndexes.sort();var lastDragOver=currentDraggable.lastDragOver,currentDragOver=null;for(var z=zIndexes.length;z>=0;z--){if(lastDragOver&&lastDragOver.zIndex==zIndexes[z]&&lastDragOver.pointInside(cursorPosition)){currentDragOver=lastDragOver;break;}else{for(var i=0;i<droppables.length;i++){if(zIndexes[z]!=droppables[i].zIndex){continue;}
if(lastDragOver!=droppables[i]&&currentDraggable.dom!=droppables[i].dom&&droppables[i].pointInside(cursorPosition)){currentDragOver=droppables[i];z=-1;break;}}}}
if(currentDragOver&&currentDragOver!=lastDragOver){currentDragOver.ondragover(currentDraggable);}
if(currentDragOver){currentDragOver.ondragmove(currentDraggable,cursorPosition.sub(Vector2.getElementPosition(currentDragOver.dom)));}
currentDraggable.lastDragOver=currentDragOver;}
Drag.currentDraggable._onmousemove(cursorPosition);}
Drag._onmouseup=function(){document.onselectstart=null;if(Drag.currentDraggable){Drag.currentDraggable._ondrop();Drag.currentDraggable=null;}}
function Draggable(element){if(this==window){if(element instanceof Array){var collection=[];element.each(function(instance){collection.push(new Draggable(instance));});return new Collection(Draggable,collection);}else{return new Draggable(element);}}else{this.data={};this.handles=[];this.dom=element;this.addHandle(this.dom);}}
Draggable.prototype.destroy=function(){this.handles.each(function(handle){this.removeHandle(handle.dom);}.bind(this));this.data=this.dom=null;}
Draggable.prototype._onclick=function(event){if(this.active){return event_kill(event);}}
Draggable.prototype._ongrab=function(){this.ongrab();if(!this.oldPosition){this.oldPosition=this.dom.style.position;}
this.dom.style.position=this.absolute?'absolute':'relative';}
Draggable.prototype._onmousedown=function(event){var target=event_get_target(event);if(is_node(target,['input','select','textarea','object','embed'])){return true;}
var vector=Vector2.getEventPosition(event);this.cursorPositionVector=vector.sub(Vector2.getElementPosition(this.dom));Drag.grab(this,event);if(this.gutter){this.cursorInitialVector=vector;}else{this._setActive(true);this._ongrab();}
return event_prevent(event);}
Draggable.prototype._onmousemove=function(vector){if(!this.active){if(vector.distanceTo(this.cursorInitialVector)>=this.gutter){this._setActive(true);this._ongrab();}}
if(this.active){vector.sub(Vector2.getElementPosition(this.dom).sub(new Vector2(parseInt(this.dom.style.left?this.dom.style.left:CSS.getStyle(this.dom,'left'),10)||0,parseInt(this.dom.style.top?this.dom.style.top:CSS.getStyle(this.dom,'top'),10)||0))).sub(this.cursorPositionVector).setElementPosition(this.dom);this.ondrag(vector);}}
Draggable.prototype._ondrop=function(){if(this.active){(function(){this._setActive(false);}).bind(this).defer();this.ondrop();if(this.lastDragOver){this.lastDragOver.ondrop(this);}}}
Draggable.prototype.resetPosition=function(){this.dom.style.position=this.oldPosition;this.oldPosition=null;this.dom.style.left=null;this.dom.style.top=null;return this;}
Draggable.prototype.setUseAbsolute=function(absolute){this.absolute=absolute;return this;}
Draggable.prototype.ondrag=bagofholding;Draggable.prototype.setDragHandler=function(func){this.ondrag=func;return this;}
Draggable.prototype.ongrab=bagofholding;Draggable.prototype.setGrabHandler=function(func){this.ongrab=func;return this;}
Draggable.prototype.ondrop=bagofholding;Draggable.prototype.setDropHandler=function(func){this.ondrop=func;return this;}
Draggable.prototype.gutter=0;Draggable.prototype.setGutter=function(gutter){this.gutter=gutter;return this;}
Draggable.prototype.setNamespace=function(namespace){this.namespace=namespace;return this;}
Draggable.prototype.handles=null;Draggable.prototype.addHandle=function(handle){if(this.handles.length==1&&this.handles[0]==this.dom){this.removeHandle(this.dom);}
this.handles.push({obj:handle,evt:[Event.listen(handle,'mousedown',this._onmousedown.bind(this)),Event.listen(handle,'click',this._onclick.bind(this)),Event.listen(handle,'drag',Event.kill),Event.listen(handle,'selectstart',Event.kill)]});return this;}
Draggable.prototype.removeHandle=function(handle){this.handles.filter(function(a){if(a.dom!=handle){return true;}else{a.evt.each(function(evt){evt.remove();});return false;}});}
Draggable.prototype.getDOM=function(){return this.dom;}
Draggable.prototype.setKey=function(key,value){this.data[key]=value;return this;}
Draggable.prototype.getKey=function(key){return this.data[key];}
Draggable.prototype._setActive=function(state){this.dom.activeDrag=this.active=state;for(var i=0;i<this.handles.length;i++){this.handles[i].obj.activeDrag=state;}}
function Droppable(element){if(this==window){if(element instanceof Array){var collection=[];element.each(function(instance){collection.push(new Droppable(instance));});return new Collection(Droppable,collection);}else{return new Droppable(element);}}else{this.data={};this.dom=element;this.namespace=null;}}
Droppable.prototype.destroy=function(){if(this.namespace){Drag.removeDroppable(this.namespace,this);}
this.data=this.dom=null;}
Droppable.prototype.setNamespace=function(namespace){if(this.namespace){Drag.removeDroppable(namespace,this);}
Drag.addDroppable(namespace,this);return this;}
Droppable.prototype.zIndex=0;Droppable.prototype.setZIndex=function(index){this.zIndex=index;return this;}
Droppable.prototype.pointInside=function(vector){var position=Vector2.getElementPosition(this.dom);return position.x<=vector.x&&this.dom.offsetWidth+position.x>vector.x&&position.y<=vector.y&&this.dom.offsetHeight+position.y>vector.y;}
Droppable.prototype.ondragover=bagofholding;Droppable.prototype.setDragOverHandler=function(func){this.ondragover=func;return this;}
Droppable.prototype.ondragmove=bagofholding;Droppable.prototype.setDragMoveHandler=function(func){this.ondragmove=func;return this;}
Droppable.prototype.ondrop=bagofholding;Droppable.prototype.setDropHandler=function(func){this.ondrop=func;return this;}
Droppable.prototype.getDOM=Draggable.prototype.getDOM;Droppable.prototype.setKey=Draggable.prototype.setKey;Droppable.prototype.getKey=Draggable.prototype.getKey;

function SortableGroup(){this.namespace='sortable'+(++SortableGroup.instanceCount);this.draggables={};this.droppables={};this.sortables={};this.linkedGroups=[];this.linkedGroups.onlinkjump=bagofholding;this.rootNode=null;}
SortableGroup.instanceCount=0;SortableGroup.prototype.gutter=15;SortableGroup.prototype.addSortable=function(key,obj,handle){if(this.rootNode===null){this.rootNode=obj.parentNode;if(!this.linkedGroups.placeholder){this.linkedGroups.placeholder=this.placeholder=$N(obj.tagName,{className:'dragPlaceholder',style:{padding:'0px'}});}else{this.placeholder=this.linkedGroups.placeholder;}}else if(this.rootNode!=obj.parentNode){throw new Error('All sortables of a collection must share the same parentNode');}
if(key in this.draggables){throw new Error('All sortables must have a unique key');}
this.sortables[key]=obj;this.draggables[key]=(new Draggable(obj)).setNamespace(this.namespace).setGutter(this.gutter).setUseAbsolute(true).setGrabHandler(this.grabHandler.bind(this,key)).setDropHandler(this.dropHandler.bind(this,key)).setKey('key',key);if(handle){this.draggables[key].addHandle(handle);}
this.droppables[key]=(new Droppable(obj)).setNamespace(this.namespace).setDragOverHandler(this._dragOverHandlerShim.bind(null,this,key));return this;}
SortableGroup.prototype.link=function(sortgroup){sortgroup.linkedGroups=this.linkedGroups;if(!this.linkedGroups.length){this.linkedGroups.push(this);}
this.linkedGroups.push(sortgroup);for(var i=0;i<this.linkedGroups.length;i++){if(this.linkedGroups[i].namespace!=this.namespace){this.linkedGroups[i].namespace=this.namespace;for(var j in this.linkedGroups[i].droppables){this.linkedGroups[i].droppables[j].setNamespace(this.namespace);this.linkedGroups[i].draggables[j].setNamespace(this.namespace);}}}
return this;}
SortableGroup.prototype.getOrder=function(){if(!this.rootNode){return[];}
var ret=[],childNodes=this.rootNode.childNodes;for(var i=0;i<childNodes.length;i++){for(var k in this.sortables){if(this.sortables[k]==childNodes[i]){ret.push(k);break;}}}
return ret;}
SortableGroup.prototype.migrateLinkedSortable=function(key){for(var i=0;i<this.linkedGroups.length;i++){if(key in this.linkedGroups[i].draggables){this.sortables[key]=this.linkedGroups[i].sortables[key];this.draggables[key]=this.linkedGroups[i].draggables[key];this.draggables[key].setGrabHandler(this.grabHandler.bind(this,key)).setDropHandler(this.dropHandler.bind(this,key));this.droppables[key]=this.linkedGroups[i].droppables[key];this.droppables[key].setDragOverHandler(this._dragOverHandlerShim.bind(null,this,key));delete this.linkedGroups[i].sortables[key];delete this.linkedGroups[i].draggables[key];delete this.linkedGroups[i].droppables[key];return true;}}
return false;}
SortableGroup.prototype.setLinkJumpHandler=function(func){this.linkedGroups.onlinkjump=func;}
SortableGroup.prototype.onorderchange=bagofholding;SortableGroup.prototype.setOrderChangeHandler=function(func){this.onorderchange=func;}
SortableGroup.prototype.ongrabcallback=bagofholding;SortableGroup.prototype.setGrabCallback=function(func){this.ongrabcallback=func;return this;}
SortableGroup.prototype.grabHandler=function(draggableKey){this.placeholder.className=this.sortables[draggableKey].className;CSS.addClass(this.sortables[draggableKey],'drag');Vector2.getElementDimensions(this.sortables[draggableKey]).setElementDimensions(this.placeholder);this.rootNode.insertBefore(this.placeholder,this.sortables[draggableKey]);this.ongrabcallback(draggableKey);}
SortableGroup.prototype.ondropcallback=bagofholding;SortableGroup.prototype.setDropCallback=function(func){this.ondropcallback=func;return this;}
SortableGroup.prototype.dropHandler=function(draggableKey){CSS.removeClass(this.sortables[draggableKey],'drag');this.draggables[draggableKey].resetPosition();this.rootNode.insertBefore(this.sortables[draggableKey],this.placeholder);this.rootNode.removeChild(this.placeholder);this.ondropcallback(draggableKey);this.onorderchange();}
SortableGroup.prototype._dragOverHandlerShim=function(that,droppableKey,draggable){that.dragOverHandler(droppableKey,draggable.getKey('key'));};SortableGroup.prototype.dragOverHandler=function(droppableKey,draggableKey){var jumped=false;if(!(draggableKey in this.draggables)){if(!this.migrateLinkedSortable(draggableKey)){throw new Error('Draggable dropped onto a foreign droppable!');}
jumped=true;}
var before=true,childNodes=this.rootNode.childNodes,droppable=this.sortables[droppableKey],draggable=this.sortables[draggableKey];for(var i=0;i<childNodes.length;i++){if(childNodes[i]==droppable){break;}else if(childNodes[i]==draggable){before=false;break;}}
if(before){this.rootNode.insertBefore(draggable,droppable);}else{this.rootNode.insertBefore(droppable,draggable);}
this.rootNode.insertBefore(this.placeholder,draggable);if(jumped){this.linkedGroups.onlinkjump.call(this,draggableKey);}}
SortableGroup.prototype.destroy=function(){for(var k in this.droppables){this.droppables[k].destroy();}
for(var k in this.draggables){this.draggables[k].destroy();}
this.droppables=this.draggables=this.rootNode=null;}
SortableGroup.prototype.removeSortable=function(key){this.draggables[key].destroy();this.droppables[key].destroy();delete this.draggables[key];delete this.droppables[key];}
if (window.Bootloader) { Bootloader.done(["js\/ui.js.pkg.php"]); }