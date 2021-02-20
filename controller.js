var mode = 'oscillo';


var start = function () {
    decibel.staticFile();
    requestAnimationFrame(draw)
};

function draw () {
    decibel.analyser.getByteFrequencyData(decibel.frequencyData);
    if (ui[mode].FFT && decibel.analyser.fftSize !== ui[mode].FFT) {
        decibel.setFFT( ui[mode].FFT );
    }
    ui[mode](decibel.analyser, decibel.frequencyData);
    requestAnimationFrame(draw);
}

// Chrome wants a user interaction before starting to play sound, fair enough
document
  .getElementById("overlay")
  .addEventListener("click", function () {
    document.getElementById("overlay").remove();
    start();
  });


