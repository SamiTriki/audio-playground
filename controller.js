var mode = 'oscillo';

decibel.staticFile();

var start = function (isFftSet) {
    decibel.analyser.getByteFrequencyData(decibel.frequencyData)
    var frequencyBinCount = decibel.analyser.frequencyBinCount;
    var frequencyData = decibel.frequencyData;
    ui[mode](frequencyBinCount, frequencyData)
    if (ui[mode].FFT && decibel.analyser.fftSize !== ui[mode].FFT && !isFftSet) {
        decibel.setFFT( ui[mode].FFT )
    }
    isFftSet = true;
    requestAnimationFrame(function () {start(isFftSet)})
};

start(false);

