var audio = document.getElementById('sound');
var audioCtx = new AudioContext();
var audioSrc = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();

audio.controls = false;
analyser.fftSize = 128; //default is 2048

audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(analyser.frequencyBinCount);

var start = function() {
    analyser.getByteFrequencyData(frequencyData);
    ui.draw(analyser, frequencyData);
    requestAnimationFrame(start);
};

audio.play();
start();
