/* グローバル変数の宣言 */
var SCREEN_SIZE = 500;
var SIDE_CELLS = 200;
var CELL_SIZE = SCREEN_SIZE / SIDE_CELLS;
var FPS = 10000;
var canvas;
var context;

window.onload = function () {
    /*　ゲームの初期化処理と開始処理　*/
    var field = new Array(SIDE_CELLS * SIDE_CELLS);
    var tempField = new Array(SIDE_CELLS * SIDE_CELLS);
    for (var i = 0; i < field.length; i++) {
        field[i] = Math.floor(Math.random() * 2);
    }
    canvas = document.getElementById('world');
    canvas.width = canvas.height = SCREEN_SIZE;
    var scaleRate = Math.min(window.innerWidth / SCREEN_SIZE, window.innerHeight / SCREEN_SIZE);
    canvas.style.width = canvas.style.height = SCREEN_SIZE * scaleRate + 'px';
    context = canvas.getContext('2d');
    context.fillStyle = 'rgb(211, 85, 149)';
    update(field, tempField);


}

function update(field, tempField) {
    /* 世代の更新処理とキャンパスの描画処理 */
    var n = 0;
    tempField = field.slice();
    for (var i = 0; i < tempField.length; i++) {
        n = 0;
        for (var s = -1; s < 2; s++) {
            for (var t = -1; t < 2; t++) {
                if (s == 0 && t == 0) continue;
                var c = i + s * SIDE_CELLS + t;
                if (c >= 0 && c % SIDE_CELLS != 0 || i > c && c % SIDE_CELLS != SIDE_CELLS - 1) {
                    if (i < c && c % SIDE_CELLS != 0 || i > c && c % SIDE_CELLS != SIDE_CELLS - 1) {
                        if (tempField[c]) n++;
                    }
                }
            }
        }
        if (tempField[i] && (n == 2 || n == 3)) {
            field[i] = 1;
        } else if (!tempField[i] && n == 3) {
            field[i] = 1;
        } else field[i] = 0;
    }
    draw(field);
    setTimeout(update, 1000 / FPS, field, tempField); //ミリ秒後に再起処理をしてループ
}

function draw(field) {
    /* キャンパスの描画処理。update関数で呼び出される予定 */
    context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);
    for (var i = 0; i < field.length; i++) {
        var x = (i % SIDE_CELLS) * CELL_SIZE;
        var y = Math.floor(i / SIDE_CELLS) * CELL_SIZE;
        if (field[i]) context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    }


}