fabric.util.object.extend(fabric.Canvas.prototype, /** @lends fabric.StaticCanvas.prototype */ {
	fullZoomLevel : 100,
  fullZoom: function (level) {
  	this.fullZoomLevel = level;
  	if (this.discardActiveGroup) {
      this.discardActiveGroup();
    }
    if (this.discardActiveObject) {
      this.discardActiveObject();
    }
    for (var i = 0, len = this._objects.length; i < len; i++) {
      var obj = this._objects[i];
      /*if(obj && obj['_objects']){
				obj.saveState();
      	this._zoomGroup(obj);
				obj.saveCoords().setObjectsCoords();
      }
      else{*/
      	this._zoomObject(obj);
				obj.setCoords();
      //}
    }
    this.renderAll();
  },
  _zoomGroup: function (group) {
  	for(i=0; i<group['_objects'].length; i++){
			group['_objects'][i].scaleX = Math.abs(group.zoomOrginal.scaleX * (this.fullZoomLevel/100));
			group['_objects'][i].scaleY = Math.abs(group.zoomOrginal.scaleY * (this.fullZoomLevel/100));
			group['_objects'][i].left   = Math.abs(group.zoomOrginal.left   * (this.fullZoomLevel/100));
			group['_objects'][i].top    = Math.abs(group.zoomOrginal.top    * (this.fullZoomLevel/100));
		}
  },
  _zoomObject: function (object) {
    object.scaleX = Math.abs(object.zoomOrginal.scaleX * (this.fullZoomLevel/100));
		object.scaleY = Math.abs(object.zoomOrginal.scaleY * (this.fullZoomLevel/100));
		object.left   = Math.abs(object.zoomOrginal.left   * (this.fullZoomLevel/100));
		object.top    = Math.abs(object.zoomOrginal.top    * (this.fullZoomLevel/100));
  },
  getFullZoom: function () {
    return this.fullZoomLevel;
  },
  fullZoomInit: function (level) {
  	var self = this;
    this.on('object:added', function(o){
    	self._updateZoomOriginal(o);
    	o.target.set({
    		left		: 	o.target.zoomOrginal.left,
    		top 		: 	o.target.zoomOrginal.top,
    		scaleX	: 	o.target.zoomOrginal.scaleX,
    		scaleY	: 	o.target.zoomOrginal.scaleY
    	}).setCoords();
    });
    this.on('object:moving', function(o){
    	self._updateZoomOriginal(o);
    });
    this.on('object:scaling', function(o){
    	self._updateZoomOriginal(o);
    });
    this.on('object:modified', function(o){
    	self._updateZoomOriginal(o);
    });
  }
  _updateZoomOriginal: function (o) {
    o.target.zoomOrginal = {
  		left 		: (o.target.left 		* (self.fullZoomLevel/100)),
  		top 		: (o.target.top 		* (self.fullZoomLevel/100)),
  		scaleX	: (o.target.scaleX 	* (self.fullZoomLevel/100)),
  		scaleY	: (o.target.scaleY 	* (self.fullZoomLevel/100))
  	}
  },
});