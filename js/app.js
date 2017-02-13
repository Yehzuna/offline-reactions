jwplayer.key = "OvCYxxv2q1ZJkgeu8paqLhIQwUxGMgK17R2DbA==";

jw = jwplayer('player');

jw.setup({
    playlist: [{
        image: "http://img.maxisciences.com/tribu/la-tribu-isolee-surprise-dans-la-foret-du-bresil_76458_w460.jpg",
        sources: [
            {
                default: false,
                file: "http://tv.maxisciences.com/9103-w360.mp4?st=sBGNUtp54mwA2UIOLeHEWw&e=1486738967",
                label: "360p SD",
                type: "mp4"
            }
        ],
        title: "Un photographe capture d'incroyables images d&#039;une tribu isolée en Amazonie",
        description: "",
        tracks: []
    }],
    height: '100%',
    width: '100%',
    primary: 'html5',
    autostart: true,
    startparam: 'start',
    flashplayer: 'lib/jwplayer-7.9.1/jwplayer.flash.swf',
    analytics: {
        cookies: false,
        enabled: false
    },
    skin: {
        name: 'seven',
        active: '#f00',
        inactive: 'white',
        background: 'rgba(0,0,0,.7)'
    },
    captions: {
        backgroundOpacity: 75
    }
});


var log = [];
var json = {};

jw.on('time', function (event) {
    var time = Math.floor(event.position);

    if(json[time] && log.indexOf(time) == -1) {

        log.push(time);
        for(var index in json[time]) {
            for(var i=0; i<json[time][index]; i++) {
                createElement(index);
            }
        }
    }
});


var req = new XMLHttpRequest();
req.open('GET', 'data/data.json', true);
req.onload = function () {
    if (this.status >= 200 && this.status < 300) {
        json = JSON.parse(this.response);
    }
};
req.send();


function createElement(css) {
    var right = Math.round(Math.random()*60);
    var bottom = Math.round(Math.random()*50) + 50;
    var duration = Math.round(Math.random()*3);

    var div = document.createElement('div');

    div.classList.add('icon');
    div.classList.add(css);
    div.classList.add('duration-' + duration);

    div.style.right = right + "px";
    div.style.bottom = bottom + "px";
    div.addEventListener("animationend", function() {
        this.remove();
    }, false);

    document.getElementById('overlay').appendChild(div);
}


document.getElementById('like').addEventListener('click', function (e) {
    createElement('like');
});

document.getElementById('smiley').addEventListener('click', function (e) {
    createElement('smiley');
});