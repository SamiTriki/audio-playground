var decibel = decibel || {};

(function(decibel){

    decibel.resetAudioContext = function(type) {

        decibel.audioCtx = (window.AudioContext) ? new AudioContext() : new webkitAudioContext()
        if (type === 'stream') {
            decibel.audioSrc = decibel.audioCtx.createMediaStreamSource(decibel.audio)
        } else {
            decibel.audioSrc = decibel.audioCtx.createMediaElementSource(decibel.audio)
        }

        decibel.analyser = decibel.audioCtx.createAnalyser()
        decibel.analyser.fftSize = 128 //default is 2048
        decibel.audioSrc.connect(decibel.analyser);
        decibel.frequencyData = new Uint8Array(decibel.analyser.frequencyBinCount)
    };

    decibel.staticFile = function () {
        decibel.audio = document.getElementById('sound')
        decibel.resetAudioContext()
        decibel.audioSrc.connect(decibel.audioCtx.destination)
        decibel.audio.play()
        decibel.audio.volume = 0.5
    };

    decibel.requestMicro = function () {
        navigator.mediaDevices.getUserMedia( {audio:true}, decibel.gotMicrophone, noMicrophone )

        function noMicrophone () {
            alert('access to microphone needed')
        }
    }

    decibel.gotMicrophone = function (stream) {
        decibel.audio.pause()
        decibel.audio = stream
        decibel.resetAudioContext('stream')
    }

    decibel.setFFT = function (size) {
        decibel.analyser.fftSize = parseInt(size)
        console.log('FFT set to '+size)
    }

})(decibel);
