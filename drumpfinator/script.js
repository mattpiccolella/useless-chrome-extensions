var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
var MATCH = ['Trump'];
var REPLACE = ['Drumpf'];

walk(document.body);

function walk(node) {
    // Function from here for replacing text: http://is.gd/mwZp7E

    var child, next;

    switch (node.nodeType) {
        case ELEMENT:  // Element
        case DOCUMENT:  // Document
        case DOCUMENT_FRAGMENT: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case TEXT: // Text node
            replaceText(node);
            break;
    }
}

function replaceText(textNode) {
    var v = textNode.nodeValue;

    // Go through and match/replace all the strings we've given it, using RegExp.
    for (var i = 0; i < MATCH.length; i++) {
        v = v.replace(new RegExp('\\b' + MATCH[i] + '\\b', 'g'), REPLACE[i]);
    }

    textNode.nodeValue = v;
}

// Create a MutationObserver to handle events
// (e.g. filtering TextNode elements)
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes) {
            [].slice.call(mutation.addedNodes).forEach(function(node) {
              walk(node);
            });
        }
    });
});

// Start observing "childList" events in document and its descendants
observer.observe(document, {
    childList: true,
    subtree:   true
});

// Replace all images with images of Donald Trump. 
TRUMP_PICS = [
  'http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg',
  'http://cdn1.thr.com/sites/default/files/2015/08/splash-trump-a1.jpg',
  'http://www.modernman.com/wp-content/uploads/2015/12/Trump-Funny.jpg',
  'http://www.speakgif.com/wp-content/uploads/bfi_thumb/donald-trump-funny-face-animated-gif-30twjrw7kil4ifiwtasge8.gif',
  'http://static1.businessinsider.com/image/566ed6766da811ff178b4567/eagle-handler-explains-what-happened-when-his-bald-eagle-attacked-trump.jpg'
]

function trumpify() {

  // Get all the images on a page.
  var images = document.getElementsByTagName("img");

  // Replace each image with a random one.
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    image.src = TRUMP_PICS[Math.floor(Math.random() * TRUMP_PICS.length)];
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  trumpify();
  walk(document.body);
});