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






### MIT License

Copyright (C) 2016 Wajahat Qasim

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
