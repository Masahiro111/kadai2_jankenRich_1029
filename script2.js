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

// じゃんけんのセット回数
let total_janken_set = 5;

// ページ読み込み後の初期化処理
window.onload = function () {

    let all_janken_preview_area = generate_janken_one_set();

    document.getElementById('janken-preview-area').innerHTML = all_janken_preview_area;
};

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
            <img class="relative z-10 rounded-full shadow-sm border-4 border-${theme_color}-300 bg-${theme_color}-50 h-20 w-20" src="./images/case-${janken_id}.png" alt="">
            <img class="absolute -top-10 -right-4 rounded-full shadow-sm h-23 w-20" src="./images/obake-${obake_id}.png" alt="">
        </div >
        `;
        all_janken_preview_area = all_janken_preview_area + add_code;
    }
    return all_janken_preview_area;
}

function clickOfferer(pJankenId) {

    let jankenPreviewArea = document.getElementById("janken-preview-area");
    let targetJanken = jankenPreviewArea.firstElementChild;

    if (isWin(pJankenId, targetJanken.dataset.jankenid)) {
        document.getElementById("total-score").innerHTML = total_score += 100;
        console.log("win");
    }

    if (isDrow(pJankenId, targetJanken.dataset.jankenid)) {
        document.getElementById("total-score").innerHTML = total_score += 0;
        console.log("drow");
    }

    if (isLose(pJankenId, targetJanken.dataset.jankenid)) {
        document.getElementById("total-score").innerHTML = total_score -= 50;
        console.log("lose");
    }


    $('#janken-preview-area > :first').animate({
        opacity: 0.55,    // 透明度0.25へ
        top: '-=1000',
    }, 300, function () {
        // アニメーション完了後に実行する処理
        this.remove();
    });


    // // じゃんけんフィールドの最初の子要素を削除
    // jankenPreviewArea.firstElementChild.animate([
    //     // keyframes
    //     { transform: 'translateY(0px)' },
    //     { transform: 'translateY(-1500px)' }
    // ], {
    //     // timing options
    //     duration: 300,
    // });
    // jankenPreviewArea.firstElementChild.remove();


    if (!jankenPreviewArea.childElementCount && total_janken_set > 0) {
        // フィールドのじゃんけんがない 且つ じゃんけんセットが残っている場合

        total_janken_set--;
        let all_janken_preview_area = generate_janken_one_set();

        document.getElementById('janken-preview-area').innerHTML = all_janken_preview_area;

        console.log("finished");

    } else if (!jankenPreviewArea.childElementCount && total_janken_set == 0) {
        // フィールドのじゃんけんがない 且つ じゃんけんセットが終了した場合

        alert("stage finished");
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