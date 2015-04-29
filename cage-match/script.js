// Links to pictures of Nicholas Cage
var CAGE_URLS = ['http://upload.wikimedia.org/wikipedia/commons/3/33/Nicolas_Cage_2011_CC.jpg',
								 'http://d1oi7t5trwfj5d.cloudfront.net/98/1d/ac290201446e98aabcef4965f141/nicolas-cage.jpg',
								 'http://pmcdeadline2.files.wordpress.com/2010/08/nicolas_cage.jpg',
								 'http://upload.wikimedia.org/wikipedia/commons/f/f3/Nicolas_Cage_-_66%C3%A8me_Festival_de_Venise_(Mostra).jpg',
								 'http://zuqka.nation.co.ke/wp-content/uploads/2013/07/Nicolas-Cage.jpg'
								];

// Pick out a random image from our collection.
function getRandomImage() {
	return CAGE_URLS[Math.floor(Math.random() * CAGE_URLS.length)];
}

// Get all the images on a page.
var images = document.getElementsByTagName("img");

// Replace each image with a random one.
for (var i = 0; i < images.length; i++) {
	var image = images[i];
  image.src = getRandomImage();
  console.log(image);
}
