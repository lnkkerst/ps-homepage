function unicodeDecode(str) {
    return unescape(str.replace(/\\u/g, "%u"));
}

function getHitokoto() {
    $.ajax({
        url: "https://v1.hitokoto.cn/",
        dataType: "json",
        success: function (result) {
            $("#hitokoto").text(result.hitokoto + " —— " + result.from);
        },
        error: function () {
            $("#hitokoto").text("access rror");
        }
    });
}

function switchTo(target) {
    for(let i of $(".content-item")) {
        $(i).hide();
    }
    $(target).show();
}

function parseTimetable() {
    $.getJSON("src/json/timetable.json", function (timetable) {
        let htmlTT = $("<table></table>");
        let head = $("<tr></tr>");
        for (let i = 1; i <= 5; ++i) {
            head.append("<th></th>");
        }
        htmlTT.append(head);
        for (let i = 1; i <= 4; ++i) {
            let newRow = $("<tr></tr>")
            for (let j = 1; j <= 5; ++j) {
                let newBlock = $("<td></td>")
                if (timetable[j - 1][i - 1] === "none") {
                    newBlock.append("<span class='class-none'></span>")
                } else {
                    newBlock.append("<span class='class-name'>" +
                        unicodeDecode(timetable[j - 1][i - 1]['name']) + "</span>");
                    newBlock.append("<span class='class-room'>" +
                        unicodeDecode(timetable[j - 1][i - 1]['room']) + "</span>");
                }
                newRow.append(newBlock);
            }
            htmlTT.append(newRow);
        }
        $('#timetable-content').append(htmlTT);
    });
}

$('document').ready(function (e) {
    $(".loading").hide();
    let blogUrl = "http://82.156.22.207/blog/";
    parseTimetable();
    $(".menu a").click(function () {
        switchTo($(this).attr('data-target'));
    });
    $("#hitokoto").text(getHitokoto());
});
