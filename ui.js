var ui = ui || {};
(function(ui){

    ui.canvas = document.getElementById('canvas')
    ui.drawContext = ui.canvas.getContext('2d')
    ui.blurbg = document.getElementById('blur')
    function setbounds() {
        ui.canvas.width = window.innerWidth;
        ui.canvas.height = window.innerHeight;
    }

    setbounds()

    window.onresize = function(e) {
        setbounds()
    }

    function drawBackground(frequency) {
        var blue  = frequency;
        var green = 255 - frequency;
        var red   = frequency  * 2;
        document.documentElement.style.backgroundColor = 'rgba('+ red +','+ green +','+ blue +', 0.3)';
    }

    function arrAvg(arr) {
        return _.reduce(arr, function (p, c) {
            return p + c;
        }) / arr.length;
    }

    function blurBackground(frequency) {
        ui.blurbg.style.WebkitFilter = "blur("+(Math.floor(arrAvg(frequency)/5))+"px)"
    }

    function lineStroke(frequency) {
        var blue  = frequency;
        var green = 255 - frequency;
        var red   = frequency  * 2;
        ui.drawContext.strokeStyle = 'rgba('+(green + 30) +','+(red + 30) +','+(blue + 30) +', 1)';
    };

    ui.bars = function (frequencyBinCount, frequency) {
        ui.bars.FFT = 32;
        blurBackground(frequency || [10,10]);
        // ui.drawContext.clearRect(0, 0, ui.canvas.width, ui.canvas.height);

        // var value, green, red, percent, height, offset, barWidth

        // for (var i = 0, bc = frequencyBinCount;i < bc; i++) {
        //     value    = frequency[i];
        //     green    = 255 - value;
        //     red      = value  * 2;
        //     percent  = value / 256;
        //     height   = ui.canvas.height * percent;
        //     offset   = ui.canvas.height - height - 1;
        //     barWidth = ui.canvas.width / frequencyBinCount;

        //     // ui.drawContext.fillStyle = 'rgba('+ red +','+ green +','+ value +', 1)';
        //     // ui.drawContext.fillRect(i * barWidth, offset, barWidth , value * 5);
        //     ui.drawContext.strokeStyle = 'rgba('+ (red + 30) +','+ (green + 30) +','+ (value + 30) +', 0.8)';
        //     ui.drawContext.lineWidth   = 5;
        //     ui.drawContext.strokeRect(i * barWidth, offset, barWidth , value * 5);
        // }
    };

    ui.oscillo = function (frequencyBinCount, frequency) {
        ui.oscillo.FFT = 32;
        // ui.drawContext.clearRect(0, 0, ui.canvas.width, ui.canvas.height);
        blurBackground(frequency || [10]);
        // lineStroke(frequency[10] || 10);

        // ui.drawContext.lineWidth = 8;
        // ui.drawContext.beginPath();

        // var sliceWidth = ui.canvas.width / frequencyBinCount;
        // var x = 0;

        // for (var i = 0; i < frequencyBinCount; i++) {

        //     var v = frequency[i] / 64;
        //     var y = (-(v * ui.canvas.height/2) + canvas.height * 2) - canvas.height/2;

        //     if (i === 0) {
        //         ui.drawContext.moveTo(x, y/2);
        //     } else {
        //         ui.drawContext.lineTo(x, y/2);
        //     }
        //     x += sliceWidth;
        // }

        // ui.drawContext.lineTo(ui.canvas.width, -frequency[frequency.length - 1] + ui.canvas.height);
        // ui.drawContext.stroke();
    };

    ui.abyss = function (frequencyBinCount, frequency) {
        ui.abyss.FFT = 32;
        ui.drawContext.clearRect(0, 0, ui.canvas.width, ui.canvas.height);

        drawBackground(frequency[10] || 10);
        ui.drawContext.strokeStyle = 'black';
        ui.drawContext.lineWidth = 5;

        var x = ui.canvas.width/2;
        var y = -(ui.canvas.height/2) + ui.canvas.height;

        var startAngle = 0;
        var endAngle =  (2 * Math.PI) / 64;

        ui.drawContext.beginPath();

        for (var i = 0; i < frequencyBinCount; i++) {
            if (i%2) {
                radius = frequency[i] * 1.2;
                ui.drawContext.arc(x, y, radius, startAngle, endAngle, true);
                startAngle = endAngle;
                endAngle = endAngle + endAngle;
            }
        }
        ui.drawContext.stroke();
        ui.drawContext.closePath();
        startAngle = 0;
        endAngle =  (2 * Math.PI) / 64;
    };
})(ui);
