fabric.util.object.extend(fabric.Canvas.prototype, /** @lends fabric.StaticCanvas.prototype */ {
    fullZoomLevel: 100,
    ZoomCanvasWidth : 0,
    ZoomCanvasHeight : 0,
    fullZoom: function(level) {
        self = this;
        this.fullZoomLevel = level;
        if (this.discardActiveGroup) {
            this.discardActiveGroup();
        }
        if (this.discardActiveObject) {
            this.discardActiveObject();
        }
        var _width  = (self.ZoomCanvasWidth      * (self.fullZoomLevel/100);
        var _height = (self.ZoomCanvasHeight   * (self.fullZoomLevel/100);
        if(_width<0 || _height<0) return;
        for (var i = 0, len = this._objects.length; i < len; i++) {
            var obj = this._objects[i];
            if (obj) {
                this._zoomObject(obj);
                obj.setCoords();
            }
        }
        this.setWidth (_width<0  ? 0 : _width)
            .setHeight(_height<0 ? 0 : _height) 
            .renderAll();
    },
    _zoomObject: function(object) {
        object.scaleX = Math.abs(object.zoomOriginal.scaleX * (this.fullZoomLevel / 100));
        object.scaleY = Math.abs(object.zoomOriginal.scaleY * (this.fullZoomLevel / 100));
        object.left = Math.abs(object.zoomOriginal.left * (this.fullZoomLevel / 100));
        object.top = Math.abs(object.zoomOriginal.top * (this.fullZoomLevel / 100));
    },
    getFullZoom: function() {
        return this.fullZoomLevel;
    },
    updateCanvasDimension: function(w, h) {
        this.ZoomCanvasWidth = w;
        this.ZoomCanvasHeight = h;
    },
    fullZoomInit: function() {
        var self = this;
        this.ZoomCanvasWidth    = this.getWidth();
        this.ZoomCanvasHeight   = this.getHeight();
        this.on('object:added', function(o) {
            self._updateZoomOriginal(o.target);
            o.target.set({
                left: o.target.zoomOriginal.left,
                top: o.target.zoomOriginal.top,
                scaleX: o.target.zoomOriginal.scaleX,
                scaleY: o.target.zoomOriginal.scaleY
            }).setCoords();
        });
        this.on('object:moving', function(o) {
            self._updateZoomOriginal(o.target);
        });
        this.on('object:scaling', function(o) {
            self._updateZoomOriginal(o.target);
        });
        this.on('object:modified', function(o) {
            self._updateZoomOriginal(o.target);
        });
    },
    _updateZoomOriginal: function(o) {
        self = this;
        o.zoomOriginal = {
            left    : (o.left    * (self.fullZoomLevel / 100)),
            top     : (o.top     * (self.fullZoomLevel / 100)),
            scaleX  : (o.scaleX  * (self.fullZoomLevel / 100)),
            scaleY  : (o.scaleY  * (self.fullZoomLevel / 100))
        }
    },
});
