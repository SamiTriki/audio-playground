var ui = ui || {};
(function(ui){
    ui.canvas = document.getElementById('canvas');
    ui.canvas.width = window.innerWidth;
    ui.canvas.height = window.innerHeight;
    ui.drawContext = ui.canvas.getContext('2d');

    ui.drawBackground = function(frequency) {
        var blue = frequency;
        var green = 255 - frequency;
        var red = frequency  * 2;
        document.documentElement.style.backgroundColor = 'rgba('+ red +','+ green +','+ blue +', 0.3)';
    };

    ui.lineStroke = function(frequency) {
        var blue = frequency;
        var green = 255 - frequency;
        var red = frequency  * 2;
        ui.drawContext.strokeStyle = 'rgba('+(green + 30) +','+(red + 30) +','+(blue + 30) +', 1)';
    };

    ui.bars = function (soundAnalyzer, frequency) {
        ui.drawContext.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
        ui.drawBackground(frequency[10] || 10);

        for (var i = 0; i < soundAnalyzer.frequencyBinCount; i++) {
            var value = frequency[i];
            var green = 255 - value;
            var red = value  * 2;
            var percent = value / 256;
            var height = ui.canvas.height * percent;
            var offset = ui.canvas.height - height - 1;
            var barWidth = ui.canvas.width / soundAnalyzer.frequencyBinCount;

            ui.drawContext.fillStyle = 'rgba('+ red +','+ green +','+ value +', 1)';
            ui.drawContext.fillRect(i * barWidth, offset, barWidth , value * 5);
            ui.drawContext.strokeStyle = 'rgba('+ (red + 30) +','+ (green + 30) +','+ (value + 30) +', 0.8)';
            ui.drawContext.lineWidth   = 3;
            ui.drawContext.strokeRect(i * barWidth, offset, barWidth , value * 5);
        }
    };

    ui.oscillo = function (soundAnalyzer, frequency) {
        ui.drawContext.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
        ui.drawBackground(frequency[10] || 10);
        ui.lineStroke(frequency[10] || 10);

        ui.drawContext.lineWidth = 8;
        ui.drawContext.beginPath();

        var sliceWidth = ui.canvas.width / soundAnalyzer.frequencyBinCount;
        var x = 0;

        for (var i = 0; i < soundAnalyzer.frequencyBinCount; i++) {

            var v = frequency[i] / 64;
            var y = - (v * ui.canvas.height/2) + canvas.height * 2;
 
            if (i === 0) {
                ui.drawContext.moveTo(x, y/2);
            } else {
                ui.drawContext.lineTo(x, y/2);
            }
            x += sliceWidth;
        }

        ui.drawContext.lineTo(ui.canvas.width, -frequency[frequency.length - 1] + ui.canvas.height);
        ui.drawContext.stroke();
    };

    ui.abyss = function (soundAnalyzer, frequency) {

        ui.abyss.FFT = 32;
        ui.drawContext.clearRect(0, 0, ui.canvas.width, ui.canvas.height);

        ui.drawBackground(frequency[10] || 10);
        ui.drawContext.strokeStyle = 'black';
        ui.drawContext.lineWidth = 5;

        var x = ui.canvas.width/2;
        var y = -(ui.canvas.height/2) + ui.canvas.height;

        var startAngle = 0;
        var endAngle =  (2 * Math.PI) / 64;

        ui.drawContext.beginPath();
        for (var i = 0; i < soundAnalyzer.frequencyBinCount; i++) {
            if (i%2) {
                radius = frequency[i] * 1.2;
                ui.drawContext.arc(x, y, radius, startAngle, endAngle, true);
                startAngle = endAngle;
                endAngle = endAngle + endAngle;
            }

        }
        ui.drawContext.translate(ui.canvas.width/2, ui.canvas.height/2);
        ui.drawContext.rotate(Math.PI / 180);
        ui.drawContext.translate(-ui.canvas.width/2,-ui.canvas.height/2);
        ui.drawContext.stroke();

        startAngle = 0;
        endAngle =  (2 * Math.PI) / 64;
    };
})(ui);
