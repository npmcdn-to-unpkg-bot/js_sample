var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var fire = false;
var counter = 0;
var message;
var score = 0;

var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;
var ENEMY_COLOR = 'rgba(255, 0, 0, 0.75)';
var ENEMY_MAX_COUNT = 10;
var ENEMY_SHOT_COLOR = 'rgba(255, 0, 255, 0.75)';
var ENEMY_SHOT_MAX_COUNT = 100;

window.onload = function () {
    var p = new Point();

    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 256;
    screenCanvas.height = 256;

    ctx = screenCanvas.getContext('2d');

    screenCanvas.addEventListener('mousemove', mouseMove, true);
    screenCanvas.addEventListener('mousedown', mouseDown, true);
    window.addEventListener('keydowm', keyDown, true);

    info = document.getElementById('info');

    var chara = new Character();
    chara.init(10);

    var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
    for (var i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
        charaShot[i] = new CharacterShot();
    }

    var enemy = new Array(ENEMY_MAX_COUNT);
    for (var i = 0; i < ENEMY_MAX_COUNT; i++) {
        enemy[i] = new Enemy();
    }

    var enemyShot = new Array(ENEMY_SHOT_MAX_COUNT);
    for (var i = 0; i < ENEMY_SHOT_MAX_COUNT; i++) {
        enemyShot[i] = new EnemyShot();
    }

    (function () {
        counter++;

        info.innerHTML = mouse.x + ' : ' + mouse.y;

        ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
        ctx.beginPath();

        chara.position.x = mouse.x;
        chara.position.y = mouse.y;

        ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2, false);
        ctx.fill();

        if (fire) {
            for (var i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
                if (!charaShot[i].alive) {
                    charaShot[i].set(chara.position, 3, 5);
                    break;
                }
            }
            fire = false;
        }

        if (counter % 100 === 0) {
            for (var i = 0; i < ENEMY_MAX_COUNT; i++) {
                if (!enemy[i].alive) {
                    j = (counter % 200) / 100;

                    var enemySize = 15;
                    p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j;
                    p.y = screenCanvas.height / 2;

                    enemy[i].set(p, enemySize, j);
                    break;
                }
            }
        }

        ctx.beginPath();

        for (var i = 0; i < ENEMY_MAX_COUNT; i++) {
            if (enemy[i].alive) {
                enemy[i].move();

                ctx.arc(enemy[i].position.x, enemy[i].position.y, enemy[i].size, 0, Math.PI * 2, false);

                if (enemy[i].param % 30 === 0) {
                    for (var j = 0; j < ENEMY_SHOT_MAX_COUNT; j++) {
                        if (!enemyShot[j].alive) {
                            p = enemy[i].position.distance(chara.position);
                            p.normalize();
                            enemyShot[j].set(enemy[i].position, p, 5, 5);

                            break;
                        }
                    }
                }

                ctx.closePath();
            }
        }

        ctx.fillStyle = ENEMY_COLOR;

        ctx.fill();



        ctx.beginPath();
        for (var i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
            if (charaShot[i].alive) {
                charaShot[i].move();

                ctx.arc(
                    charaShot[i].position.x,
                    charaShot[i].position.y,
                    charaShot[i].size,
                    0, Math.PI * 2, false
                );

                ctx.closePath();
            }
        }

        ctx.fillStyle = CHARA_SHOT_COLOR;

        ctx.fill();

        ctx.beginPath();

        for (var i = 0; i < ENEMY_SHOT_MAX_COUNT; i++) {
            if (enemyShot[i].alive) {
                enemyShot[i].move();

                ctx.arc(
                    enemyShot[i].position.x,
                    enemyShot[i].position.y,
                    enemyShot[i].size,
                    0, Math.PI * 2, false
                );

                ctx.closePath();
            }
        }

        ctx.fillStyle = ENEMY_SHOT_COLOR;

        ctx.fill();

        for (var i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
            if (charaShot[i].alive) {
                for (var j = 0; j < ENEMY_MAX_COUNT; j++) {
                    if (enemy[j].alive) {
                        p = enemy[j].position.distance(charaShot[i].position);
                        if (p.length() < enemy[j].size) {
                            enemy[j].alive = false;
                            charaShot[i].alive = false;

                            score++;

                            break;
                        }
                    }
                }
            }
        }

        switch (true) {
        case counter < 70:
            message = 'READY...';
            break;
        case counter < 100:
            message = 'GO!!';
            break;
        default:
            message = '';
        }

        if (run) {
            setTimeout(arguments.callee, fps);
        }
    })();
};

function mouseMove(e) {
    mouse.x = e.clientX - screenCanvas.offsetLeft;
    mouse.y = e.clientY - screenCanvas.offsetTop;
}

function mouseDown(e) {
    fire = true;
}

function keyDown(e) {
    var ck = e.keyCode;
    if (ck === 27) {
        run = false;
    }
}