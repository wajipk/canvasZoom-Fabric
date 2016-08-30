jQuery(document).ready(function($) {
	canvasSize('mainCanvas', parseInt($('#rightSection').width()), parseInt($('#rightSection').height()));
	//chartApp.backgorundColor('images/background.png');
	contextMenu.init();
	

	/*$(document).delegate('body', 'click', function(e) {
		var clickedOn=$(e.target);
		if(!clickedOn.parents().addBack().is('#moveCanvas, #connector, canvas') && !chartApp.connectingStatus()){
			$('#connector').removeClass('active');
			chartApp.stopConnecting();
		}
		if(!clickedOn.parents().addBack().is('#rightclick') && !chartApp.connectingStatus()){
			contextMenu.hide();
		}
	});*/
	$(document).delegate('#addText', 'click', function(e) {
		chartApp.addText();
	});
	$(document).delegate('#svgList>img', 'click', function(e) {
		var src = $(this).attr('src');
		chartApp.addSvg(src);
	});
	$(document).delegate('#connector', 'click', function(e) {
		if(chartApp.connectingStatus()){
			$('#connector').removeClass('active');
			chartApp.stopConnecting();
			
		}else{
			$(this).addClass('active');
			chartApp.startConnecting();
		}
	});
	$(document).delegate('#moveCanvas', 'click', function(e) {
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			chartApp.stopCanvasMove();
			
		}else{
			$(this).addClass('active');
			chartApp.startCanvasMove();
		}
	});
	$(document).delegate('#removeConnector', 'click', function(e) {
		if ($(this).attr('data-id')) {
			chartApp.removeConnector($(this).attr('data-id'));
			$(this).attr('data-id', '').hide();
		}
	});
	$(document).delegate('#undo', 'click', function(e) {
		chartApp.undo();
	});
	$(document).delegate('#redo', 'click', function(e) {
		chartApp.redo();
	});
	$(document).delegate('#zoomIn', 'click', function(e) {
		chartApp.zoomIn();
	});
	$(document).delegate('#zoomOut', 'click', function(e) {
		chartApp.zoomOut();
	});
	$(document).delegate('li#bringFront,button#bringFront', 'click', function(e) {
		chartApp.bringForward();
		contextMenu.hide();
	});
	$(document).delegate('li#sendBack,button#sendBack', 'click', function(e) {
		chartApp.sendBackward();
		contextMenu.hide();
	});
	$(document).delegate('li#removeSvg,button#removeSvg', 'click', function(e) {
		chartApp.removeSVG();
		$('#removeSvg').hide();
		contextMenu.hide();
	});
	$(document).delegate('li#headerToggle,button#headerToggle', 'click', function(e) {
		chartApp.headerToggle();
		contextMenu.hide();
	});
	$(document).delegate('li#editTitle,button#editTitle', 'click', function(e) {
		var person = prompt("Please enter new Title for Header");
		if (person != null) {
			chartApp.editTitle(person);
			contextMenu.hide();
		}
	});
	$(document).delegate('#addsvg', 'change', function(e) {
		var file;
        if ($(this).get(0).files){
            file = $(this).get(0).files[0];
            var _n = file.name.split('.')
            ext = _n[_n.length-1];
            if(ext == 'svg'){
				chartApp.addSvg(URL.createObjectURL(file));
            }
        }
	});
	$(document).delegate('body', 'keydown', function(e) {
		if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA'){
			return;
		}
		var keycode = e.keyCode;
		//e.preventDefault();
		if(keycode == 37){//left arrow
			chartApp.moveObject(keycode);
		}
		else if(keycode == 38){//up arrow
			chartApp.moveObject(keycode);
		}
		else if(keycode == 39){//right arrow
			chartApp.moveObject(keycode);
		}
		else if(keycode == 40){//down arrow
			chartApp.moveObject(keycode);
		}
		else if(keycode == 46){//delete
			chartApp.removeSVG();
		}
		else if(e.ctrlKey && keycode == 38){//Crtl + up arrow
			chartApp.bringForward();
		}
		else if(e.ctrlKey && keycode == 40){//Crtl + down arrow
			chartApp.sendBackward();
		}
		else if(e.ctrlKey && keycode == 90){//Crtl + z arrow
			chartApp.undo();
		}
		else if(e.ctrlKey && keycode == 89){//Crtl + y arrow
			chartApp.redo();
		}
	});
	$("canvas").on("contextmenu", function(e) {
		e.preventDefault();
		contextMenu.setPosition();
		contextMenu.hide();
		object = chartApp.findTargetAt(e);
		if(object && object.class == 'svg') {
			chartApp.setObjectActive(object);
            contextMenu.data([
                { text: 'Edit Title', id: 'editTitle' },
                { text: 'Header On/Off', id: 'headerToggle' },
                { text: 'Bring To Front', id: 'bringFront' },
                { text: 'Send To Back', id: 'sendBack' },
                { text: 'Remove', id: 'removeSvg', divider: true}
            ]);
			contextMenu.show();
        }
        else{
        	chartApp.discardCanvas();
        	chartApp.fireCanvasEvent('before:selection:cleared');
        }
        return false;
    });

});
canvasSize = function(id, w, h){
	var _marginLeft 	= (($('.rightSection').width()-w)/2),
		_marginTop 		= (($('.rightSection').height()-h)/2);
	$('#'+id).parents('.absoluteCenter').css({
		width: w,
		height: h,
		marginLeft 	: (_marginLeft 	> 0 ? _marginLeft 	: 0),
		marginTop 	: (_marginTop 	> 0 ? _marginTop 	: 0)
	});
	chartApp.canvasDimension(id, w, h)
}
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
