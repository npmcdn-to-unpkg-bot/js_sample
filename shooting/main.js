var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();

window.onload = function () {
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 256;
    screenCanvas.height = 256;

    screenCanvas.addEventListener('mousemove', mouseMove, true);
    window.addEventListener('keydowm', keyDown, true);

    info = document.getElementById('info');

    (function () {
        info.innerHTML = mouse.x + ' : ' + mouse.y;
        if (run) {
            setTimeout(arguments.callee, fps);
        }
    })();
};

function mouseMove(e) {
    mouse.x = e.clientX - screenCanvas.offsetLeft;
    mouse.y = e.clientX - screenCanvas.offsetTop;
}

function keyDown(e) {
    var ck = e.keyCode;
    if (ck === 27) {
        run = false;
    }
}