var putImageData = function(settings){
    var data = settings.imageData.data;
    for (var y = 0; y < settings.height; ++y) {
        for (var x = 0; x < settings.width; ++x) {
            var index = (y * settings.width + x) * 4;

            var value = x * y & 0xff;

            data[index]   = value;    // red
            data[++index] = value;    // green
            data[++index] = value;    // blue
            data[++index] = 255;      // alpha
        }
    }
    settings.ctx.putImageData(settings.imageData, 0, 0);
}

export {putImageData};