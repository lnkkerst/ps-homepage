function getHitokoto() {
    $.getJSON("https://v1.hitokoto.cn/", function (result) {
        $("#hitokoto").html("<p id='hitokoto_content'>" + result.hitokoto + "</p>" +
            "<p id='hitokoto_from'>—— " + result.from + "<\p>");
    }).fail(function () {
        $("#hitokoto").text("error");
    })
}

function switchTo(target) {
    for(let i of $(".content-item")) {
        $(i).hide();
    }
    $(target).show();
}

function getArchives() {
    $.ajax({
        type: "GET",
        url: "http://82.156.22.207/blog/index.php/feed/",
        dataType: "text",
        success: function (resultOri) { // reserved
            $("#archives_content").html("<p>nothing here...</p>");
        },
        error: function () {
            $("#archives_content").html("<p>nothing here...</p>");
        }
    });
}

function parseTimetable() {
    $.getJSON("src/json/timetable.json", function (timetable) {
        let htmlTT = $("<table></table>");
        let head = $("<tr></tr>");
        for (let i = 1; i <= 5; ++i) {
            head.append("<th>" + ["一", "二", "三", "四", "五"][i - 1] + "</th>");
        }
        htmlTT.append(head);
        for (let i = 1; i <= 4; ++i) {
            let newRow = $("<tr></tr>")
            for (let j = 1; j <= 5; ++j) {
                let newBlock = $("<td></td>")
                if (timetable[j - 1][i - 1] === "none") {
                    newBlock.append("<span class='class-none'><ion-icon name='fish'></ion-icon></span>")
                } else {
                    newBlock.append("<span class='class-name'>" +
                        timetable[j - 1][i - 1]['name'] + "</span>");
                    newBlock.append("<span class='class-room'>" +
                        timetable[j - 1][i - 1]['room'] + "</span>");
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
    getHitokoto();
    $(".btn").click(function () {
        $(".sidebar").toggleClass("sidebar-show");
    })
    getArchives();
    $("#hitokoto").click(function () {
        getHitokoto();
    });
});
