// Link and a percentage likelihood to replace your link.
var LINK = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
var RATIO = 0.5;

// Get all the links on the page.
var links = document.getElementsByTagName("a");

// Replace ~RATIO of them with Rick Astley.
for (var i = 0; i < links.length; i++) {
	if (Math.random() < RATIO) {
  	links[i].href = LINK;
	}
}
