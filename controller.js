var mode = 'oscillo';

decibel.staticFile();

var start = function () {
    decibel.analyser.getByteFrequencyData(decibel.frequencyData);

    if (ui[mode].FFT && decibel.analyser.fftSize !== ui[mode].FFT) {
        decibel.setFFT( ui[mode].FFT );
    }
    ui[mode](decibel.analyser, decibel.frequencyData);
    requestAnimationFrame(start);
};

start();

