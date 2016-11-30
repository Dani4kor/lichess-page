(function() {
    var data;
    var datahtml = '';
    var uniFont = 'T';

    function toUnicode(theString) {
        switch (theString) {
            case 'antichess':
                uniFont = '@'
                break;
            case 'bullet':
                uniFont = 'T'
                break;
            case 'racingKings':
                uniFont = '&#xe00a;'
                break;
            case 'crazyhouse':
                uniFont = '&#xe00b;'
                break;
            case 'atomic':
                uniFont = '>'
                break;
            case 'threeCheck':
                uniFont = '&#46;'
                break;
            case 'correspondence':
                uniFont = ';'
                break;
            case 'kingOfTheHill':
                uniFont = '('
                break;
            case 'blitz':
                uniFont = ')'
                break;
            case 'classical':
                uniFont = '+'
                break;
            case 'puzzle':
                uniFont = '-'
                break;
            case 'horde':
                uniFont = '_'
                break;
            case 'horde':
                uniFont = "'"
                break;
            case 'chess960':
                uniFont = "&#39;"
                break;
        }
        return uniFont;
    }

    if (JSON.parse(localStorage.getItem('user')) != null) {
        for (var key in JSON.parse(localStorage.getItem("user"))["perfs"]) {
            if (JSON.parse(localStorage.getItem("user"))["perfs"][key]['games'] > 1) {
                if (key == 'correspondence') {
                    var key_short = 'correspond'
                    datahtml += '<a  class="inf" data-icon="' + toUnicode(key) + '"><p id = "number">' + key_short + ': &nbsp&nbsp&nbsp</p><p id = "rating-' + key + '">' + JSON.parse(localStorage.getItem("user"))["perfs"][key]["rating"] + '</p></a>\n'
                } else {
                    datahtml += '<a  class="inf" data-icon="' + toUnicode(key) + '"><p id = "number">' + key + ': &nbsp&nbsp&nbsp</p><p id = "rating-' + key + '">' + JSON.parse(localStorage.getItem("user"))["perfs"][key]["rating"] + '</p></a>\n'
                }
            }
        }
    }
    if (document.getElementById("inf")) {
        document.getElementById("inf").innerHTML = datahtml
    }

    if (document.getElementById("inputname")) {
        console.log("options")
        document.addEventListener('DOMContentLoaded', function() {
            var checkPageButton = document.getElementById('submit');
            checkPageButton.addEventListener('click', function() {
                var data = document.getElementById("inputname").value;
                localStorage["accName"] = data;
                $(document).ready(function() {
                    $.ajax({
                        url: 'https://en.lichess.org/api/user/' + localStorage["accName"],
                        dataType: 'json',
                        success: function(data) {
                            console.log(JSON.stringify(data));
                            localStorage.setItem('user', JSON.stringify(data))

                        }
                    });
                });
                 setTimeout(function wtf() {
                    window.location = '../template/index.html';
                },500);
            });
        });

    } else { console.log("New Tab") }

    setTimeout(function wtf() {
        $(document).ready(function() {
            $.ajax({
                url: 'https://en.lichess.org/api/user/' + localStorage["accName"],
                dataType: 'json',
                error: function() {
                    localStorage.setItem('user', null)
                    document.getElementById("inf").remove()
                },
                success: function(data) {
                    JSON.parse(localStorage.getItem('user'))
                    document.getElementById("inf").innerHTML = datahtml
                    localStorage.setItem('user', JSON.stringify(data))
                }
            });
        });
    }, Math.floor((Math.random() * 10) + 1)*1000);


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){

(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),

m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)

})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

ga('create', 'UA-XXXXX-YY', 'auto');

ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200

ga('require', 'displayfeatures');

ga('send', 'pageview', '/options.html');



})();
