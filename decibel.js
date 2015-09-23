var decibel = decibel || {};
(function(decibel){

    decibel.refresh = function(type) {
        decibel.audioCtx = new AudioContext();
        if (type === 'stream') {
            decibel.audioSrc = decibel.audioCtx.createMediaStreamSource(decibel.audio);
        } else {
            decibel.audioSrc = decibel.audioCtx.createMediaElementSource(decibel.audio);
        }
        
        decibel.analyser = decibel.audioCtx.createAnalyser();
        decibel.analyser.fftSize = 128; //default is 2048
        decibel.audioSrc.connect(decibel.analyser);
        decibel.frequencyData = new Uint8Array(decibel.analyser.frequencyBinCount);
    };

    decibel.staticFile = function () {
        decibel.audio = document.getElementById('sound');
        decibel.refresh();
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
        decibel.audio.pause();
        decibel.audio = stream;
        decibel.refresh('stream');
    };

})(decibel);
