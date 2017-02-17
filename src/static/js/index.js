(function() {
    var data;
    var htmlData = '';
    var uniFont = 'T';

    function toUnicode(theString) {
        switch (theString) {
            case 'antichess':
                uniFont = '@';
                break;
            case 'bullet':
                uniFont = 'T';
                break;
            case 'racingKings':
                uniFont = '&#xe00a;';
                break;
            case 'crazyhouse':
                uniFont = '&#xe00b;';
                break;
            case 'atomic':
                uniFont = '>';
                break;
            case 'threeCheck':
                uniFont = '&#46;';
                break;
            case 'correspondence':
                uniFont = ';';
                break;
            case 'kingOfTheHill':
                uniFont = '(';
                break;
            case 'blitz':
                uniFont = ')';
                break;
            case 'classical':
                uniFont = '+';
                break;
            case 'puzzle':
                uniFont = '-';
                break;
            case 'horde':
                uniFont = '_';
                break;
            case 'chess960':
                uniFont = "&#39;";
                break;
        }
        return uniFont;
    }

    function createTableRow( type ) {
        var html = [];

        html.push(
            '<tr id="' + type + '" data-icon="' + toUnicode( type ) + '">',
            '<td>',
                '<span class="number">',
                type,
                '</span>',
            '</td>',
            '<td>',
                '<span class="rating">',
                JSON.parse(localStorage.getItem("user"))["perfs"][type]["rating"],
                '</span>',
            '</td>',
            '</tr>'
        );

        return html.join('');
    }

    if (JSON.parse(localStorage.getItem('user')) != null) {
        var gameTypes = JSON.parse(localStorage.getItem("user"))["perfs"];

        for (var type in gameTypes) {
            if (gameTypes.hasOwnProperty(type)) {
                var gamesOfTypePlayed = gameTypes[type]['games'];

                if (gamesOfTypePlayed > 1) {
                    htmlData += createTableRow( type );
                }
            }
        }
    }
    if (document.getElementById("inf")) {
        document.getElementById("inf").innerHTML = htmlData;
    }

    if (document.getElementById("inputname")) {
        console.log("options");
        document.addEventListener('DOMContentLoaded', function() {
            var checkPageButton = document.getElementById('submit');
            checkPageButton.addEventListener('click', function() {
                localStorage["accName"] = document.getElementById( "inputname" ).value;
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
            $( '#inf' ).hide();
            $.ajax({
                url: 'https://en.lichess.org/api/user/' + localStorage["accName"],
                dataType: 'json',
                error: function() {
                    localStorage.setItem('user', null);
                    document.getElementById("inf").remove();
                },
                success: function(data) {
                    JSON.parse(localStorage.getItem('user'));
                    document.getElementById("inf").innerHTML = htmlData;
                    localStorage.setItem('user', JSON.stringify(data));
                },
                complete: function() {
                    $( '#loadingDiv' ).hide();
                    $( '#inf' ).show();
                }
            });
        });
    }, Math.floor((Math.random() * 10) + 1)*1000);


    (function(i,s,o,g,r,a,m){
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function(){ (i[r].q=i[r].q||[]).push(arguments) },
            i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

    ga('create', 'UA-XXXXX-YY', 'auto');
    // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
    ga('set', 'checkProtocolTask', function(){});
    ga('require', 'displayfeatures');
    ga('send', 'pageview', '/options.html');
})();
