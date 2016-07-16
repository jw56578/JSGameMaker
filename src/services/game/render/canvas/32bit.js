//this is only for testing purposes, this is assuming you are using the module for only one canvas per page
//https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
var buf;
var buf8;
var data;

var putImageData = function(settings){
    if(!buf){
        buf = new ArrayBuffer(settings.imageData.data.length);
        buf8 = new Uint8ClampedArray(buf);
        data = new Uint32Array(buf);
    }
    for (var y = 0; y < settings.height; ++y) {
        for (var x = 0; x < settings.width; ++x) {
            var value = x * y & 0xff;
            //nomrally you would store the rgba values in seperate array locations, but using this technique you put the 4 bytes necessary into one 32 bit integer space
            //use the bitwise shift operation to put the 8bit number in a certain location of the 32 bit space
            //when this is buffered back into the Uint8 array then the values will be spread back out
            //somehow this is faster than just putting things in the 8bit array directly, but i have no idea how
            data[y * settings.width + x] =
                (255   << 24) |    // alpha
                (value << 16) |    // blue
                (value <<  8) |    // green
                value;            // red
        }
    }

    settings.imageData.data.set(buf8);
    settings.ctx.putImageData(settings.imageData, 0, 0);
}

export {putImageData};