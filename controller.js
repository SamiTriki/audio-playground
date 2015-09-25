var mode = 'abyss';

decibel.staticFile();

var start = function () {
    decibel.analyser.getByteFrequencyData(decibel.frequencyData);
    ui[mode](decibel.analyser, decibel.frequencyData);
    requestAnimationFrame(start);
};

start();

