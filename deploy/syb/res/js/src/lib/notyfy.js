(function($){function NotyfyObject(options){var self=this;$.extend(self,{container:$('#notyfy_container_'+ options.layout),closed:false,shown:false,_triggerEvent:function(type,args){var callback=$.Event('notyfy'+ type);self.wrapper.trigger(callback,[self].concat(args||[]));return!callback.isDefaultPrevented();},_generateID:function(){var id;do{id='notyfy_'
+(new Date().getTime()*Math.floor(Math.random()*1000000));}while(document.getElementById(id));return id;},init:function(){var adjuster;self.options=$.extend({},$.notyfy.defaults,{id:self._generateID()},options);if(!self.container.length){if(options.custom){self.container=options.custom.addClass('notyfy_container_inline');}
else{self.container=$('<ul />',{'id':'notyfy_container_'
+ self.options.layout,'class':'notyfy_container'}).appendTo(self.options.custom||document.body);}
if((adjuster=$.notyfy.layouts[self.options.layout])){$(window).bind('resize.'+ self.options.id,function(event){adjuster.call(self.container);}).triggerHandler('resize.'+ self.options.id);}
self.container.addClass('i-am-new');}
else{self.container.removeClass('i-am-new');}
self._build();return self;},_build:function(){var bar=$('<div />',{'id':self.options.id,'class':"notyfy_bar"}).append(self.options.template).find('.notyfy_text').html(self.options.text).end();self.wrapper=$('<li />',{'class':['notyfy_wrapper','notyfy_'+ self.options.type].join(' ')}).hide().append(bar);if(self.options.theme){self.wrapper.addClass('notyfytheme_'+ self.options.theme);}
if(self.options.buttons){self.options.closeWith=[];self.options.timeout=false;self.buttons=$('<div/>',{'class':'notyfy_buttons'}).appendTo($('.notyfy_bar',self.wrapper)).append($.map(self.options.buttons,function(button,i){return $('<button/>',{'class':button.addClass||'gray','html':button.text,'click':function(){if($.isFunction(button.onClick)){button.onClick.call($(this),self);}}})[0]}));}
$.each(self.options.events,function(event,callback){if($.isFunction(callback)){self.wrapper.bind('notyfy'+ event,callback);}})
self.message=self.wrapper.find('.notyfy_message');self.closeButton=self.wrapper.find('.notyfy_close');$.notyfy.store[self.options.id]=self;},show:function(event){self.wrapper.appendTo(self.container);if($.inArray('click',self.options.closeWith)>-1){self.wrapper.css('cursor','pointer').one('click',self.close);}
if($.inArray('hover',self.options.closeWith)>-1){self.wrapper.one('mouseenter',self.close);}
if($.inArray('button',self.options.closeWith)>-1){self.closeButton.one('click',self.close);}
if($.inArray('button',self.options.closeWith)==-1){self.closeButton.remove();}
self._triggerEvent('show');function after(){self._triggerEvent('shown');self.shown=true;}
if($.isFunction(self.options.showEffect)){self.wrapper.clearQueue().stop();self.options.showEffect.call(self,self.wrapper);self.wrapper.queue(after);}
else{self.wrapper.show();after();}
if(self.options.timeout){clearTimeout(self._delay);self._delay=setTimeout(function(){self.close();},parseInt(self.options.timeout,10));}
return self;},close:function(event){if(self.closed)
return;if(!self.shown){$.notyfy.queue=$.map($.notyfy.queue,function(n,i){if(n.options.id!=self.options.id){return n;}});return;}
self.wrapper.addClass('i-am-closing-now');self._triggerEvent('hide');function after(){self._triggerEvent('hidden');if(self.options.modal){renderer.hideModalFor(self);}
renderer.setLayoutCountFor(self,-1);if(renderer.getLayoutCountFor(self)==0){self.wrapper.remove();}
if(typeof self.wrapper!=='undefined'&&self.wrapper!==null){self.wrapper.remove();self.wrapper=null;self.closed=true;}
delete $.notyfy.store[self.options.id];if(!self.options.dismissQueue){$.notyfy.ontap=true;renderer.render();}}
if($.isFunction(self.options.hideEffect)){self.wrapper.clearQueue().stop();self.options.hideEffect.call(self,self.wrapper);self.wrapper.queue(after);}
else{self.wrapper.hide();after();}},setText:function(text){if(!self.closed){self.options.text=text;self.wrapper.find('.notyfy_text').html(text);}
return self;},setType:function(type){if(!self.closed){self.options.type=type;}
return self;}});self.init();};var renderer=$.notyfyRenderer={_modal:$('<div/>',{'id':'notyfy_modal','data':{'notyfy_modal_count':0}}),_modals:0,init:function(options){var notyfy=new NotyfyObject(options);$.notyfy.queue[notyfy.options.force?'unshift':'push'](notyfy);renderer.render();return notyfy;},render:function(){var instance=$.notyfy.queue[0];if($.type(instance)==='object'){if(instance.options.dismissQueue){renderer.show($.notyfy.queue.shift());}else{if($.notyfy.ontap){renderer.show($.notyfy.queue.shift());$.notyfy.ontap=false;}}}
else{$.notyfy.ontap=true;}},show:function(notyfy){if(notyfy.options.modal){renderer.createModalFor(notyfy);renderer.setModalCount(+1);}
renderer.setLayoutCountFor(notyfy,+1);notyfy.show();},createModalFor:function(notyfy){if(!renderer._modal[0].parentNode){renderer._modal.prependTo(document.body).fadeIn('fast');}},hideModalFor:function(notyfy){renderer.setModalCount(-1);if(renderer.getModalCount()==0){renderer._modal.fadeOut('fast',function(){renderer._modal.detach();});}},getLayoutCountFor:function(notyfy){return notyfy.container.data('notyfy_layout_count')||0;},setLayoutCountFor:function(notyfy,arg){return notyfy.container.data('notyfy_layout_count',renderer.getLayoutCountFor(notyfy)
+ arg);},getModalCount:function(){return renderer._modals;},setModalCount:function(arg){return(renderer._modals+=arg);}};var win=$(window);$.notyfy={ontap:true,queue:[],store:{},layouts:{center:function(){this[0].style.top=(win.height()/ 2 - this.outerHeight() / 2)
+'px';this[0].style.left=(win.width()/ 2 - this.outerWidth() / 2)
+'px';},centerLeft:function(){this[0].style.top=(win.height()/ 2 - this.outerHeight() / 2)
+'px';},centerRight:function(){this[0].style.top=(win.height()/ 2 - this.outerHeight() / 2)
+'px';},topCenter:function(){this[0].style.left=(win.width()/ 2 - this.outerWidth() / 2)
+'px';},bottomCenter:function(){this[0].style.left=(win.width()/ 2 - this.outerWidth() / 2)
+'px';}},get:function(id){return $.notyfy.store.hasOwnProperty(id)?$.notyfy.store[id]:false;},close:function(id){return $.notyfy.get(id)?$.notyfy.get(id).close():false;},setText:function(id,text){return $.notyfy.get(id)?$.notyfy.get(id).setText(text):false;},setType:function(id,type){return $.notyfy.get(id)?$.notyfy.get(id).setType(type):false;},clearQueue:function(){$.notyfy.queue=[];},closeAll:function(){$.notyfy.clearQueue();$.each($.notyfy.store,function(id,notyfy){notyfy.close();});},consumeAlert:function(options){window.alert=function(text){if(options){options.text=text;}else{options={text:text};}
renderer.init(options);};},stopConsumeAlert:function(){delete window.alert;},defaults:{layout:'top',theme:false,type:'alert',text:'',dismissQueue:true,template:'<div class="notyfy_message"><span class="notyfy_text"></span><div class="notyfy_close"></div></div>',showEffect:function(bar){bar.animate({height:'toggle'},500,'swing');},hideEffect:function(bar){bar.animate({height:'toggle'},500,'swing');},timeout:false,force:false,modal:false,buttons:false,closeWith:['click'],events:{show:null,hide:null,shown:null,hidden:null}}};window.notyfy=function(options){return renderer.init(options);}
$.fn.notyfy=function(options){options.custom=$(this);return renderer.init(options);};})(jQuery);