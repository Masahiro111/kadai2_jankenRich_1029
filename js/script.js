// main game views --------------------------------------------------------------

// janken のリストを作成
const janken_jp = ['グー', 'チョキ', 'パー',];

// スコアの初期化
let total_score = 0;

// 出し手変化の変数
const WIN_REACTION = 1;
const DROW_REACTION = 2;
const LOSE_REACTION = 3;

let reaction_num = 0;

// タイマー
const time_init = 31;
let timer_set = time_init;
let timer;
let stop_flg = false;

// bgm
const music_op = new Audio('./audio/op1.mp3');
const music_battle = new Audio('./audio/battle1.mp3');

let ser_volume = 0.1;

music_op.play();
music_op.loop = true;
music_op.volume = ser_volume;

music_battle.pause();
music_battle.loop = true;
music_battle.volume = ser_volume;


// シーンの遷移 -----------------------------------------------------------------------

// タイトルへもどる
$('.to_title').on('click', function () {
    music_op.play();
    music_battle.pause();

    $('#title_view').fadeIn();
    $('#result_view').css('display', 'none');
    $('#time-flag').css('display', 'none');
    $('#timer').text(30);

    document.getElementById('janken-preview-area').innerHTML = "";
    clearInterval(timer);
});

// メインシーンへ移動
$('#to_janken').on('click', function () {
    music_op.pause();
    music_battle.play();

    $('#title_view').fadeOut(function () {
        gameInit();
    });
});


// タイマーの設定 ---------------------------------------------------------------------
function countdwn() {
    timer_set -= 1;
    document.getElementById('timer').innerHTML = timer_set;
    if (timer_set < 1) {
        clearInterval(timer);

        $('#time-flag').fadeIn();
        showResult(1);
    }
}

// ゲームの初期設定 ------------------------------------------------------------------
function gameInit() {
    timer_set = time_init;
    timer = setInterval(countdwn, 1000);

    total_score = 0;

    $('#total-score').text(total_score);

    show_janken_on_preview_area();
}

// リザルト画面の表示 ----------------------------------------------------------------
function showResult(time_flag) {
    $('#result_view').delay(2000).fadeIn(300, function () {
        $('#score_result').text(total_score);
        clearInterval(timer);
        $('#timer').text(30);
    });
}

// じゃんけんを生成してエリアに表示 ------------------------------------------------
function show_janken_on_preview_area() {
    var all_janken_preview_area = generate_janken_one_set();
    document.getElementById('janken-preview-area').innerHTML = all_janken_preview_area;
}

// じゃんけんの生成 ------------------------------------------------------------------
function generate_janken_one_set() {
    var all_janken_preview_area = "";

    for (i = 0; i < 8; i++) {
        var theme_color = "";
        var janken_id = Math.floor(Math.random() * 3);

        if (janken_id == 0) {
            theme_color = "blue";
        } else if (janken_id == 1) {
            theme_color = "red";
        } else {
            theme_color = "yellow";
        }

        var obake_id = Math.floor(Math.random() * 2);
        var add_code = `
        <div class="relative mx-auto" data-jankenID="${janken_id}">
            <img class="relative z-10 rounded-full shadow-sm border-4 border-${theme_color}-500 bg-${theme_color}-50 h-20 w-20" src="./images/case-${janken_id}.png" alt="">
            <img class="absolute -top-10 -right-4 rounded-full shadow-sm h-23 w-20" src="./images/obake-${obake_id}.png" alt="">
        </div >
        `;
        all_janken_preview_area = all_janken_preview_area + add_code;
    }
    return all_janken_preview_area;
}

// じゃんけんの正解アクションを表示 ----------------------------------------------------
function showJankenAction(pJankenId) {
    if (pJankenId == 0) {
        $('#attack-effect-gu-win').fadeIn(150, function () {
            $(this).fadeOut(150);
        });
    }

    if (pJankenId == 1) {
        $('#attack-effect-choki-win').fadeIn(150, function () {
            $(this).fadeOut(150);
        });
    }

    if (pJankenId == 2) {
        $('#attack-effect-pa-win').fadeIn(150, function () {
            $(this).fadeOut(150);
        });
    }
}

// じゃんけんのミスアクションを表示 ----------------------------------------------------
function showJankenMissAction(pJankenId) {
    if (pJankenId == 0) {
        $('#attack-miss-effect-gu').fadeIn(150, function () {
            $(this)().delay(3000).fadeOut(150);
        });
    }

    if (pJankenId == 1) {
        $('#attack-miss-effect-choki').fadeIn(150, function () {
            $(this).delay(3000).fadeOut(150);
        });
    }

    if (pJankenId == 2) {
        $('#attack-miss-effect-pa').fadeIn(150, function () {
            $(this).delay(3000).fadeOut(150);
        });
    }
}

// じゃんけんの判定 -----------------------------------------------------------------
function clickOfferer(pJankenId) {

    let jankenPreviewArea = document.getElementById("janken-preview-area");
    let targetJanken = jankenPreviewArea.firstElementChild;

    if (isWin(pJankenId, targetJanken.dataset.jankenid)) {
        document.getElementById("total-score").innerHTML = total_score += 100;

        showJankenAction(pJankenId);

        $('#janken-preview-area > :first').animate({
            opacity: 0.55,    // 透明度0.25へ
            top: '-=1000',
        }, 150, function () {
            // アニメーション完了後に実行する処理
            this.remove();

            if (!jankenPreviewArea.childElementCount) {
                // フィールドのじゃんけんがない場合
                // 新規にじゃんけんを表示
                show_janken_on_preview_area();

                console.log("finished");
            }
        });
    }

    if (isDrow(pJankenId, targetJanken.dataset.jankenid)) {
        showJankenMissAction(pJankenId);

        showResult();
    }

    if (isLose(pJankenId, targetJanken.dataset.jankenid)) {
        showJankenMissAction(pJankenId);

        showResult();
    }
}


function isWin(players, coms) {
    if (players == 0 && coms == 1) {
        return true;
    } else if (players == 1 && coms == 2) {
        return true;
    } else if (players == 2 && coms == 0) {
        return true;
    }
    return false;
}

function isDrow(players, coms) {
    if (players == coms) {
        return true;
    }
    return false;
}

function isLose(players, coms) {
    if (!isWin(players, coms) && !isDrow(players, coms)) {
        return true;
    }
    return false;
}