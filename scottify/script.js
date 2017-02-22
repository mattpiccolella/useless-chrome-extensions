var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
var MATCH = ['Steve Carell'];
var REPLACE = ['Michael Scott'];

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

// Replace all images with images of Michael Scott. 
SCOTT_PICS = [
  'https://s-media-cache-ak0.pinimg.com/originals/4c/ac/d0/4cacd03e19d8b8ab7b939462176f8355.png',
  'http://www.businessnewsdaily.com/images/i/000/008/678/original/michael-scott-the-office.PNG?1432126986',
  'http://cdn1.theodysseyonline.com/files/2015/10/30/6358177813696988401291296824_michael-scott-the-office-9.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwrkfrrT2PCfRAheKr0BICorUaxfZHNQc6NGwhK4bO_8qf9g6p',
  'https://susanecolasanti.files.wordpress.com/2007/09/michaelscott2.jpg'
]

function scottify() {

  // Get all the images on a page.
  var images = document.getElementsByTagName("img");

  // Replace each image with a random one.
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    image.src = SCOTT_PICS[Math.floor(Math.random() * SCOTT_PICS.length)];
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  scottify();
  walk(document.body);
});