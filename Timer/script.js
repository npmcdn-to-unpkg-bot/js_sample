(function () {
    'use strict';

    // window.onloadし忘れた
    var time = document.getElementById('time');
    var min = document.getElementById('min');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var reset = document.getElementById('reset');

    start.addEventListener('click', function () {
        // time.innerHTML = min.value;
        var startTime = Date.now();
        var id = setInterval({

        }, 1000);
    });

    stop.addEventListener('click', function () {
        clearInterval(id);
    });

    reset.addEventListener('click', function () {
        time.innerHTML = '00:00';
    });
})();