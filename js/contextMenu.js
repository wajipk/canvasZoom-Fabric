window.contextMenu = window.contextMenu || new Object || {};
;(function($,_){
    'use strict';

    var _options = {
        maxheight 		: 400,
        container 		: $('<div class="rightpopups" id="rightclick" />'),
        currentPosition : {
        	left:0,
        	top:0
        }
    };

    _.init = function(options) {
    	self = this;
    	_options = $.extend({}, _options, options);
		$(document).on('mousemove', function(e){
            _options.currentPosition.left = e.pageX;
			_options.currentPosition.top = e.pageY; 
        });
    };
    _.show = function() {
    	self = this;
    	$('body').find('#rightclick').remove();
    	_options.container.appendTo('body').show();
        $("div.rightcontextMenu").on("contextmenu", function(e){
            e.preventDefault();
        });
    };
    
    _.hide = function(){
        $('body').find('#rightclick').remove();
    };

    _.data = function(lis){
    	_options.container.html('');
        $.each(lis, function(index, val) {
            if(val.divider){
                _options.container.append('<div class="divider"></div>');
            }
            var classname = val.class;
            if(classname == "undefined")
            {
                classname = "";
            }
            _options.container.append('<li class = "'+classname+'" id="'+val.id+'">'+val.text+'</li>');
        });
    };
    _.setPosition = function(options){
    	if(!options){
    		options = {
    			left 	: _options.currentPosition.left,
    			top		: _options.currentPosition.top
    		}
    	}
        _options.container.css({
            top: options.top,
            left: options.left
        });
    }
})(jQuery, window.contextMenu);