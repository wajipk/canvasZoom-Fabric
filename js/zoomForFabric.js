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
        for (var i = 0, len = this._objects.length; i < len; i++) {
            var obj = this._objects[i];
            if (obj) {
                this._zoomObject(obj);
                obj.setCoords();
            }
        }
        this.setWidth(self.ZoomCanvasWidth      * (self.fullZoomLevel/100))
            .setHeight(self.ZoomCanvasHeight    * (self.fullZoomLevel/100)) 
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
        this.setBackgroundColor('#ff0');
        this.on('object:added', function(o) {
            self._updateZoomOriginal(o);
            o.target.set({
                left: o.target.zoomOriginal.left,
                top: o.target.zoomOriginal.top,
                scaleX: o.target.zoomOriginal.scaleX,
                scaleY: o.target.zoomOriginal.scaleY
            }).setCoords();
        });
        this.on('object:moving', function(o) {
            self._updateZoomOriginal(o);
        });
        this.on('object:scaling', function(o) {
            self._updateZoomOriginal(o);
        });
        this.on('object:modified', function(o) {
            self._updateZoomOriginal(o);
        });
    },
    _updateZoomOriginal: function(o) {
        self = this;
        o.target.zoomOriginal = {
            left    : (o.target.get("left")    / (self.fullZoomLevel / 100)),
            top     : (o.target.get("top")     / (self.fullZoomLevel / 100)),
            scaleX  : (o.target.get("scaleX")  / (self.fullZoomLevel / 100)),
            scaleY  : (o.target.get("scaleY")  / (self.fullZoomLevel / 100))
        }
    },
});
