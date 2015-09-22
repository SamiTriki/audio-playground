var waves = document.getElementById('waves');
var audio = document.getElementById('sound');
var bar = document.getElementById('bar');
var canvas = document.getElementById('canvas');
audio.controls = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var audioCtx = new AudioContext();
var audioSrc = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();
var drawContext = canvas.getContext('2d');
analyser.fftSize = 128; //default is 2048

audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(analyser.frequencyBinCount);


function draw() {

    analyser.getByteFrequencyData(frequencyData);
    drawContext.clearRect(0, 0, canvas.width, canvas.height);

    var data = frequencyData[10] || 10;
    var g = 255 - data;
    var r = data  * 2;

    document.documentElement.style.backgroundColor = 'rgba('+r+','+g+','+data+', 0.3)';

    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        var value = frequencyData[i];
        var green = 255 - value;
        var red = value  * 2;
        var percent = value / 256;
        var height = canvas.height * percent;
        var offset = canvas.height - height - 1;
        var barWidth = canvas.width / analyser.frequencyBinCount;
        drawContext.fillStyle = 'rgba('+red+','+green+','+value+', 1)';
        drawContext.fillRect(i * barWidth, offset, barWidth , value * 4);

        drawContext.strokeStyle = 'rgba(' + (red + 30) + ',' + (green + 30) + ',' + (value + 30) + ', 0.8)';
        drawContext.lineWidth   = 3;
        drawContext.strokeRect(i * barWidth, offset, barWidth , value * 4);
    }
    requestAnimationFrame(draw);

}

draw();
audio.play();
