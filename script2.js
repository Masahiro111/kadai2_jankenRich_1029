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


// ページ読み込み後の初期化処理
window.onload = function () {

    let all_janken_preview_area = "";
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
        let add_code = `
        <div class="relative mx-auto" data-jankenID="${janken_id}">
            <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-1"></div>
            <img class="rounded-full shadow-sm cursor-pointer border-4 border-${theme_color}-300 bg-${theme_color}-50 h-20 w-20" src="./images/case-${janken_id}.png" alt="">
        </div >
        `;
        all_janken_preview_area = all_janken_preview_area + add_code;
    }
    document.getElementById('janken-preview-area').innerHTML = all_janken_preview_area;
};

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

    jankenPreviewArea.firstElementChild.remove();

    if (jankenPreviewArea.childElementCount) {
        console.log("next");
    } else {
        console.log("finished")
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