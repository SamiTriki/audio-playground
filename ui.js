var ui = ui || {};
(function(ui){
    ui.canvas = document.getElementById('canvas');
    ui.canvas.width = window.innerWidth;
    ui.canvas.height = window.innerHeight;
    ui.drawContext = ui.canvas.getContext('2d');

    ui.draw = function (soundAnalyzer, frequency) {

        ui.drawContext.clearRect(0, 0, ui.canvas.width, ui.canvas.height);

        var data = frequency[10] || 10;
        var g = 255 - data;
        var r = data  * 2;

        document.documentElement.style.backgroundColor = 'rgba('+r+','+g+','+data+', 0.3)';

        for (var i = 0; i < soundAnalyzer.frequencyBinCount; i++) {
            var value = frequency[i];
            var green = 255 - value;
            var red = value  * 2;
            var percent = value / 256;
            var height = ui.canvas.height * percent;
            var offset = ui.canvas.height - height - 1;
            var barWidth = ui.canvas.width / soundAnalyzer.frequencyBinCount;

            ui.drawContext.fillStyle = 'rgba('+red+','+green+','+value+', 1)';
            ui.drawContext.fillRect(i * barWidth, offset, barWidth , value * 5);

            ui.drawContext.strokeStyle = 'rgba(' + (red + 30) + ',' + (green + 30) + ',' + (value + 30) + ', 0.8)';
            ui.drawContext.lineWidth   = 3;
            ui.drawContext.strokeRect(i * barWidth, offset, barWidth , value * 5);
        }
    };

})(ui);
