(function () {
    'use strict';

    // window.onloadし忘れた
    var time = document.getElementById('time');
    //    var min = document.getElementById('min');
    var start = document.getElementById('start');
    //    var stop = document.getElementById('stop');
    //    var reset = document.getElementById('reset');
    var rest = 180;
    var hello = "hello";
    console.log('hello');


    console.log(rest);

    start.addEventListener('click', function () {
        // time.innerHTML = min.value;

        var id = setInterval(function () {
            rest--;
            time.innerHTML = rest;
            if (rest <= 0) {

                clearInterval(id);
                alert('終了');
            }
        }, 1000);
    });




    //    stop.addEventListener('click', function () {
    //        clearInterval(id);
    //    });
    //
    //    reset.addEventListener('click', function () {
    //        time.innerHTML = '00:00';
    //    });
})();