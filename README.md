# Fabric Zoom Library
Simple implementation of object base zoom in fabricjs.


### How to use it
Currently you need initialize manual after canvas initializaion.
In the HEAD of your HTML file include fabricjs and zoomForFabric.js.

initialize fullZoom after canvas initialization.<br>
`canvas.fullZoomInit()`

when updating deminsion of canvas update fullzoom Canvas size.<br>
`canvas.updateCanvasDimension(width, height)`

Call zoom function with percentage.<br>
`canvas.fullZoom(percentage)`

get current zoom level of canvas.<br>
`canvas.getFullZoom()`
