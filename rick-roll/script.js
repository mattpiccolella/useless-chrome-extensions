// Link and a percentage likelihood to replace your link.
var LINK = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
var RATIO = 1.0;

var links = document.getElementsByTagName("a");

for (var i = 0; i < links.length; i++) {
	if (Math.random() < .5) {
  	links[i].href = LINK;
	}
}
