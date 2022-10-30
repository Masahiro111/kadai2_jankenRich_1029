window.onload = function () {
    let total_win = 0;
    let total_drow = 0;
    let total_lose = 0;
    let total_winning_streak = 0;
    let total_winning_streak_todays_max = 0;
    let flag_winning_streak = 0;

    const janken_jp = ['グー', 'チョキ', 'パー',];  //"janken"のリストを作成します。

    let add_code =
        '<div class="relative mx-auto" data-jankenID="2"><div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-1"></div><img class="rounded-full shadow-sm cursor-pointer border-4 border-yellow-300 bg-yellow-50 h-20 w-20" src="./images/case-3.png" alt=""></div >';
    let all_janken_preview_area = "";
    for (i = 0; i < 5; i++) {
        all_janken_preview_area = all_janken_preview_area + add_code;
    }
    document.getElementById('janken-preview-area').innerHTML = all_janken_preview_area;
};

function p_select_click(p_janken_id) {

    let jankenPreviewArea = document.getElementById("janken-preview-area");
    let targetJanken = jankenPreviewArea.firstElementChild;

    alert(targetJanken.dataset.jankenid);

    jankenPreviewArea.firstElementChild.remove();
}
