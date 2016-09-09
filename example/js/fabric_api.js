fabric.util.object.extend(fabric.StaticCanvas.prototype, {FX_DURATION: 200});

chartApp;
var chartApp = new function() {
    var canvas = new fabric.Canvas('mainCanvas', {
    		backgroundColor : '#fff'
    	}), self = this;

    canvas.on('mouse:down', function(options) {
		
    });
    canvas.on('mouse:move', function(options) {
		
    });
    canvas.on('mouse:up', function(options) {
		var object = options.target;
    });
    canvas.fullZoomInit();

    this.addText = function() {
        var _left   = 100,
        _top        = 100,
        _text       = 'Insert your text here',
        _fontsize   = 18,
        _opacity    = 1,
        _target     = false,
        _fill       = '#555',
        _id         = "text" + new Date().getTime() + canvas.size();

        text = new fabric.IText(_text, {
            fontSize            : _fontsize,
            left                : _left,
            top                 : _top,
            fill                : _fill,
            lockScalingX        : true,
            lockScalingY        : true,
            hasRotatingPoint    : true,
            opacity             : _opacity,
            id                  : _id,
            class               : 'text',
            isTarget            : _target
        });
        canvas.add(text).setActiveObject(text);
        canvas.renderAll();
    };
    this.discardCanvas = function() {
        canvas.discardActiveObject();
        canvas.discardActiveGroup();
    };
    this.fireCanvasEvent = function(evt) {
        canvas.fire(evt);
    };
    this.getCurrentObject = function() {
        return canvas.getActiveObject();
    };
    this.setObjectActive = function(o) {
        canvas.setActiveObject(o);
    };
    this.findTargetAt = function(o) {
        return canvas.findTarget(o);
    };
    this.sendBackward = function(){
        var obj=canvas.getActiveObject();
        if(obj){
            canvas.sendBackwards(obj, true);
            canvas.renderAll();
        }
    };
    this.bringForward = function(){
        var obj=canvas.getActiveObject();
        if(obj){
            canvas.bringForward(obj, true);
            canvas.renderAll();
        }
    };
    this.connectingStatus = function() {
        return inConnectingMode;
    };
    this.canvasDimension = function(id, w, h) {
        canvas.setWidth(w);
        canvas.setHeight(h);
        canvas.renderAll();
    };
    this.addSvg = function(src) {
    	var _header = new Array(), _body = new Array(), _footer = new Array();
        fabric.loadSVGFromURL(src, function(objects, options) {
        	var group = new fabric.Group(objects, {
        		originX 		: 'center',
				originY 		: 'center',
				class 			: 'svg',
				top 			: 150,
				left 			: 150,
				hasRotatingPoint: false,
				lockUniScaling 	: true,
				line 			: '',
				lineType 		: '',
				connectors 		: new Array()
        	});
        	h=group.height;
			w=group.width;
			var r 	= (h>w)? (w/h) 	: (h/w);
			nh 	= (h>w)? 128 	: (128*r);
			nw 	= (h>w)? (128*r) : 128;
			group.set({
				scaleX 			: nw/w,
				scaleY 			: nh/h,
			});
        	canvas.add(group).setActiveObject(group).renderAll();
		},function(item, object) {
			if(item.getAttribute('data-max')){
				object.set('maxWords', item.getAttribute('data-max'));
			}
		});
    };
    this.removeSVG = function() {
    	var obj = canvas.getActiveObject();
    	if(obj && obj.class == 'svg'){
    		canvas.fxRemove(obj).calcOffset().renderAll();
    	}
    };
    this.moveObject=function(keycode){
        var obj = canvas.getActiveObject();
        if(!obj)return;
        if(keycode==37){
            obj.set({left:obj.left-5});
        }
        else if(keycode==38){
            obj.set({top:obj.top-5});
        }
        else if(keycode==39){
            obj.set({left:obj.left+5});
        }
        else if(keycode==40){
            obj.set({top:obj.top+5});
        }
        canvas.renderAll();
    }
    this.zoomIn=function(){
        canvas.fullZoom(canvas.getFullZoom()+15);
    }
    this.zoomOut=function(){
        canvas.fullZoom(canvas.getFullZoom()-15);
    }
};