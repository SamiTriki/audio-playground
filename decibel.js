var decibel = decibel || {};
(function(decibel){

    decibel.setAudioContext = function(type, options) {
        decibel.audioCtx = (window.AudioContext) ? new AudioContext() : new webkitAudioContext() ;

        if (!type) { throw new Error('You need to pass a type when resetting audio context')}

        if (type === 'stream') {
            decibel.audio = options.stream;
            decibel.audioSrc = decibel.audioCtx.createMediaStreamSource(decibel.audio);
        } else {
            var audio = document.createElement('audio')
            audio.src = './audio.mp3'
            audio.id = 'audio'

            decibel.audio = audio;
            decibel.audioSrc = decibel.audioCtx.createMediaElementSource(decibel.audio);
        }

        decibel.analyser = decibel.audioCtx.createAnalyser();
        decibel.analyser.fftSize = 128; //default is 2048
        decibel.audioSrc.connect(decibel.analyser);
        decibel.frequencyData = new Uint8Array(decibel.analyser.frequencyBinCount);
    };

    decibel.staticFile = function () {
        decibel.setAudioContext('static');
        decibel.audioSrc.connect(decibel.audioCtx.destination);
        decibel.audio.play();
    };

    decibel.requestMicro = function () {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        navigator.getUserMedia( {audio:true}, decibel.gotMicrophone, noMicrophone );

        function noMicrophone () {
            alert('access to microphone needed');
        }
    };

    decibel.gotMicrophone = function (stream) {
        decibel.audio && decibel.audio.pause();
        decibel.setAudioContext('stream', { stream: stream });
    };

    decibel.setFFT = function (size) {
        decibel.analyser.fftSize = parseInt(size);
        console.log('FFT set to '+size);
    };

})(decibel);
