<a id="top"></a>
# Building (Useless) Chrome Extensions

*Build (silly) things that can make your browser experience much more enjoyable.*

Written and developed by [Matt Piccolella][matt-pic] and [ADI][adi].

Credit to [Chrome Developer] [chrome-developer].

**Download the sample code [here][code-link].**

## Getting Started: FAQs

### What is a Chrome Extension?
From Google Chrome's website, Chrome extensions "allow you to add functionality to Chrome without diving deeply into native code." This could include, for example, [changing the text that appears on the page][cloud-to-butt], [blocking ads that would appear on a page][ad-block], or [add some much-needed doge to your webpages][doge].

### Why should I build Chrome extensions?
Chrome extensions are fun, fast, and easy! Using just a few lines of beginner JavaScript code, you can make something that can make people's lives easier, or something that will make them laugh.

### What will this tutorial teach me?
This tutorial will teach you the basics of Chrome extensions: what files you'll need, what goes in each file, and how to use it in your Chrome browser. After the tutorial, you will have several Chrome extensions that you can use.

## Using this Document
The start of this document walks you through building a Chrome extension and launching it on your browser. After you've gotten your 'Hello World' extension done, we'll give you some examples of things you can do with your Chrome extensions. From there, it's all up to your own creativity!

## Table of Contents
-   [1.0 Your First Chrome Extension](#first-extension)
    - [1.1 `manifest.json`](#manifest)
    - [1.2 Writing your JavaScript](#javascript)
    - [1.3 Using your Extension](#using-extension)
-   [2.0 Examples](#examples)
    - [2.1 Text Replacement](#text-replace)
    - [2.2 Image Replacement](#image-replace)
    - [2.3 Link Replacement](#link-replace)
    - [2.4 Other Things](#other-things)
-    [3.0 More Advanced Topics](#advanced)
    - [3.1 Background Scripts](#background)
    - [3.2 Browser Actions](#browser_action)
    - [3.3 Message Passing] (#messaging)
-    [4.0 Drumpfinator](#drumpfinator)
    - [4.1 Text Replacement](#drumpf-text)
    - [4.2 Image Replacement](#drumpf-image)
    - [4.3 Advanced JavaScript: DOM Mutations](#drumpf-dom)
-   [Additional Resources](#additionalresources)

------------------------------
<a id="first-extension"></a>
## 1.0 Your First Chrome Extension
Building a Chrome extension is surprisingly easy, and takes just a few pieces of understanding. You'll need at least two files, all of which are written in the familiar HTML, CSS, and JavaScript languages that the rest of the web is written in. This is wonderful because we won't need to worry about any of the internals of Chrome, which can be quite complicated, in order to get our apps working.

<a id="manifest"></a>
### 1.1 `manifest.json`
One of our files must be `manifest.json`. This file is a small file which provides some details about what the Chrome extension is: things like name, version number, a description of what your extension does, what images/scripts you'll be using, etc. This is generally just a few lines long, and contains just a few details. Here is a simple manifest file:

```javascript
{
  "manifest_version": 2,
  "name": "My First Chrome Extension",
  "version": "1.0",
  "description": "The very first chrome extension I've ever written!",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

Let's go through this piece by piece.

1. `manifest_version`: This is the version of the manifest specification we're using, basically just describing what format of the file we're currently using. **This will always be 2, for our purposes.**
2. `name`: The name of our Chrome extension. Be creative!
3. `version`: A string to represent the version of our application. Generally a good idea to start with `1.0` or `1.0.0`, but this is purely descriptive.
4. `description`: The description of your extension. This let's your users know what they're in for, so it's best to be descriptive.
5. `content_scripts`: This field is the first of the ones we've seen that is **optional**. Content scripts allow us to specify some scripts that we want to run in the browser context, which basically means we have access to the [DOM][dom], or the HTML elements of the page. 
    1. We use `matches` to provide a regular expression for websites we'd match: `*://*/*` matches all websites! However, say we only wanted this to happen on Google websites, we could provide `http://www.google.com/*`. We can also provide more than one of these.
    2. We use `js` to provide the scripts we want to run. For example, here we provide the file name `script.js`, which tells the browser that we will be providing a file `script.js` that the browser will run. **We will create this file in the next section.
    3. We use `run_at` to tell the browser when the script should execute. In this case, we want to run it at `document_end`, which means once the entire page has loaded.

This is just one simple `manifest.json` file. There are lots of other attributes you can set, such as [`background`][background], which allows us to run a single script in the background, [`permissions`][permissions], which allow us to ask the user for certain things we may not be able to do withour permission, and [`browser_action`][browser-action], which creates small icons next to the search bar that you can click and have something happen. However, `content_scripts` is what we'll mainly be looking in this tutorial.

<a id="javascript"></a>
### 1.2 Writing your JavaScript
In the same directory that you have your `manifest.json` file, now create a new file and call it `script.js`; remember, this is the name that we used in our `manifest.json` file, so we're now going to create that script. Now our directory, which I've called `first-chrome-extension`, has our two files:

```
manifest.json script.js
```

Inside of `script.js`, put the following line:

```javascript
console.log("My first chrome extension!");
```

That's it! With this simple line of JavaScript, we can prove that we have a working Chrome extension, which will print `My first chrome extension!` in the JavaScript console on every page that you load.

<a id="using-extension"></a>
### 1.3 Using your Extension
Let's run `first-chrome-extension` now. To do this, you're going to need to open Chrome (install [here][chrome-install] if you haven't already). 

Next, visit `chrome://extensions` by typing it into the toolbar and pressing enter (or selecting `More Tools > Extensions` from the Chrome menu).Once you've done this, make sure the option for `Developer mode` in the top-right corner is selected, as follows:

![Developer Mode](https://dl.dropboxusercontent.com/s/gtz78ws5pxyi0c0/extensions.png)

Once this is checked, select the option for `Load unpacked extension...`. In the dialogue that appears, select the directory in which you have been keeping your files, for me `first-chrome-extension`. Once you've done this, your Chrome extension is installed!

To try it out, try visiting a website, like `https://google.com`. Once you've done this, open up your JavaScript console (`More Tools > JavaScript Console` or `Alt-Command-J`). You should see the following:

![First Extension](https://dl.dropboxusercontent.com/s/2ihtch3i6qmklio/first-chrome-extension.png)

Congrats! You've created your first Chrome extension! 

<a id="examples"></a>
## 2.0 Examples
Now that we know how to create the simplest Chrome extension, we can start thinking about other things we're going to be doing. We'll provide three examples of (funny) applications that all deal with DOM manipulation, which is manipulating elements that already exist on the page. **There are other types of Chrome extensions then the `content_scripts` examples we provide in these examples; we'll discuss those in [section 2.4](#other-things).

<a id="text-replace"></a>
### 2.1 Text Replacement
You've heard of [Cloud-to-Butt][cloud-to-butt]. Let's make our own! Maybe I want to change `computer` to `robot`, or `person` to `cantaloupe`. The possibilities are endless!

`manifest.json`
```javascript
{
  "manifest_version": 2,
  "name": "Text Replacement",
  "version": "1.0",
  "description": "Sample application that will replace text on webpages.",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

`script.js`
```javascript
var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
var MATCH = ['computer','person'];
var REPLACE = ['robot','cantaloupe'];

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
```

All you need to do to have all the text-replace goodness you want is change the arrays at the top of the script.

<a id="image-replace"></a>
### 2.2 Image Replacement
There's not enough Nicholas Cage on the Internet. Let's do that by changing all the images on the Internet to a random picture of Nicholas Cage!

`manifest.json`
```javascript
{
  "manifest_version": 2,
  "name": "Cage Match",
  "version": "1.0",
  "description": "Replace all the images on a webpage with pictures of Nicholas Cage.",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

`script.js`
```javascript
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
```

Replace the links in our `CAGE_URLS` array with links to any pictures you'd like, and watch your browsing experience transform!

<a id="link-replace"></a>
### 2.3 Link Replacement
[Rick-Rolling](rick-roll) is hilarious. Let's make a certain percentage of the links on every page redirect to 'Never Gonna Give You Up'.

`manifest.json`
```javascript
{
  "manifest_version": 2,
  "name": "Rick Roll",
  "version": "1.0",
  "description": "Application that replaces all links with a link to RickRoll.",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

`script.js`
```javascript
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
```

Click with care people!

<a id="other-things"></a>
### 2.4 Other Things
The applications we'll This is just one simple `manifest.json` file. There are lots of other attributes you can set, such as [`background`][background], which allows us to run a single script in the background, [`permissions`][permissions], which allow us to ask the user for certain things we may not be able to do withour permission, and [`browser_action`][browser-action], which creates small icons next to the search bar that you can click and have something happen. However, `content_scripts` is what we'll mainly be looking in this tutorial.

My name is [Matt Piccolella][matt-pic] and the GitHub repository for this is available [here][github-repo].

<a id="advanced"></a>
## 3.0 More Advanced Topics
Chrome extensions provide all sorts of functionality beyond the functionality described above. You can explore more advanced topics on the [Chrome Developer Website][chrome-developer]. However, several of these features will be important to us as we move forward, so we will go through them here.

<a id="background"></a>
### 3.1 Background Pages
So far, we've been working with content scripts, which are linked to individual pages. They can be loaded and run at different times in the page's life; for example, when the page first loads, or when it's about to be presented. However, it will useful for certain applications to have a single script that runs across the entire lifetime of an extension; rather than having the script run once for every page, we can just have one script that runs when the extension is first loaded.

As a result, Chrome extensions provide us with something called [background pages][background-pages]. A background page is essentially a single dummy page that runs in the extension process that exists for the entire lifetime of the process. In order to utilize the background page, we must first make a change to our `manifest.json` file:

```javascript
{
  "name" : "My extension",
  ...
  "background": {
    "scripts" : ["background.js"]
  },
  ...
}
```

By adding this, we'll have a new background page created by the extension that is associated with each of our scripts. To try this out, create a new file called `background.js` and add a single line:

```javascript
console.log("I am in the background.");
```

Reload your page, and check your console for the print message. You won't see the printed statement. So what gives? Well, as we saw before, the background page is not linked to any specific page, which explains why we're not seeing it in the individual tab's console. Instead, it'll be linked to the extension's background page.

To view the background page, go to `chrome://extensions`. Once you reload your extension, there should be a new part of your chrome extension that says "Inspect views: background page." Click 'background page', and a new console should show up that shows our "I am in the background" message! Thus, we see that the background page is linked to the application and not the tab.

<a id="browser_action"></a>
### 3.2 Browser Actions
You may be used to using Chrome extensions that have icons next to your search bar. We can customize these images, add tooltips, and respond to clicks to the button by user [browser actions][browser-actions].

Just as before, to add a browser action, we simply add a new JSON object to our `manifest.json`:

```javascript
{
  "name" : "My extension",
  ...
  "browser_action": {
    "default_icon": "icon.png",
    "default_title": "My extension",
    "default_popup": "popup.html"
  },
  ...
}
```

By adding this, we can customize the icon that gets added to the Chrome toolbar for our extension. `default_icon` allows us to set a custom icon; to do this, simple add an icon to your extension directory and refer to it by name here. `default_title` allows us to change the tooltip that we see when we hover over the icon. `default_popup` allows us to define an HTML page that will show when we click the icon; this is for applications where you might want to allow the user to fill out some form when they click on your icon.

We can also, somewhat more interestingly, add listeners for clicks to our icon. If we want to set a listener for a click to our icon, we can use the following code segment:

```javascript
// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  ...
});
```

As we will see in a moment, this function will be called from our background script. The parameter, `tab`, refers to the tab that was open when the button was pressed; thus, this is a way for us to be able to interact with the contents of a page from the background of our application.

<a id="messaging"></a>
### 3.3 Message Passing
Imagine you want to do something to the page you're currently viewing when you click on the extension's icon. This is a very common task; later, we'll change all the images on the page when we click the icon. However, before when we were discussing background pages, we learned that we have only one page running for the entire extension. Similarly, we only have one icon for the entire application; we don't get a new icon for each new tab. Thus, this means that our icon is handled by our `background.js` script, while our current page is handled by our `script.js` script, our content script. So, if we want to be able to change the current page in response to a click of the icon, we're going to need some way for these two scripts to interact.

For this, we will use a technology called [message passing][message-passing]. Message passing essentially allows us to send messages from the background of our script to the content (each browser page) of our browser. To send a message from the content to the background, we simply call this:

```javascript
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response);
})
```

Thus, from any one of our pages, we can send data from the client to the background. We then get a callback function that runs when the message has been successfully returned. Similarly, we can send a message from the background to any one of our pages by using a different API:

```javascript
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  console.log(response);
});
```

However, as we see here, we have to provide a tab ID. This is because, as we saw before, there is one background page but many content pages; so, in order for the background to send to a content page, it needs to know which of the many content pages it needs to send the message to. As we'll see later, there are ways of finding the tab ID for the tab that you're interested in.

<a id="drumpfinator"></a>
## 4.0 Drumpfinator
If any of you are fans of "Last Week Tonight with John Oliver," you may have seen the episode in which he [discusses Donald Trump][john-oliver]. In it, Oliver encourages Trump to return his name to his ancestral name, "Drumpf." As a part of this goal, John Oliver's team released a Chrome extension called 
"Drumpfinator," which replaces every instance of the word "Trump" with "Drumpf." The extension is available [here][drumpfinator]. 

As a part of this curriculum, I thought it might be cool for us to build our own Drumpfinator extension, with one or two extra features.

<a id="drumpf-text"></a>
### 4.1 Text Replacement
First, let's start with the most basic application, one that replaces the words on the page with "Drumpf" instead of "Trump." To do this, let's first create our basic `manifest.json` file in a new directory called `drumpfinator`:

```javascript
{
  "manifest_version": 2,
  "name": "Drumpfinator",
  "version": "1.0",
  "description": "An extension that replaces all instances of 'Trump' with 'Drumpf'",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

Now that we have this, copy `script.js` from our sample `text-replacement` code we saw earlier. Inside of it, please update `MATCH` and `REPLACE` to be 'Trump' and 'Drumpf'. When you're finished, your code should look as follows:

```javascript
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
```

Load your new extension by pressing "Load unpacked extension" at `chrome://extensions` and selecting your `drumpfinator` directory. Go to the Wikipedia page for Donald Trump located [here][trump-wiki], and you should see the names have changed. Woo!

<a id="drumpf-image"></a>
### 4.2 Image Replacement
I've decided that my internet doesn't have enough Trump on it. So, I want my extension to be able to replace all the images on a page with images of Donald Trump. However, I don't want this for all pages, only for the ones that I want. I want to be able to press my icon and have all the images change to Donald Trump. To do this, let's use our more advanced techniques: background pages, browser actions, and message passing.

First, let's set the icon of our extension. Download [this image][trump-image] and add it to your `drumpfinator` directory. Add this to your `manifest.json`:

```javascript
"browser_action": {
  "default_icon": "trump.png"
}
```

Now, if you reload your extension, you should the picture of The Donald as your extension icon.

Now, let's add our background page. First, add this to your `manifest.json` file:

```javascript
"permissions" : ["tabs", "*://*/*"],
"background" : {
  "scripts" : ["background.js"],
  "persistent" : false
}
```

First, we request permissions, which we'll use for our background page. First, we'll need access to the tabs in your browser, which we'll use to pass messages between the background and the content. Next, we specify the script, which will be our background script; we choose to name it `background.js`. Also, importantly, we set `persistent` equal to false, to specify that our background page is an event page that only needs to be loaded in response to certain events; this is a little confusing, but more information is available [here][event-pages].

From here, our `manifest.json` file is complete, and should look as follows:

```javascript
{
  "manifest_version": 2,
  "name": "Drumpfinator",
  "version": "1.0",
  "description": "An extension that replaces all instances of 'Trump' with 'Drumpf'",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ],
  "permissions" : ["tabs", "*://*/*"],
  "background" : {
    "scripts" : ["background.js"],
    "persistent" : false
  },
  "browser_action": {
    "default_icon": "trump.png"
  }
}
```

(Note: order is not important.)

Now, let's create our new `background.js` file; add the following code there:

```javascript
// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(response) {
    console.log("Your page has been trumpified!");
  });
});
```

We see the only thing we do is add a listener to the click of our icon. Once we receive this click, we send a message to our tab ID. Once we hear back from our tab, we can confidently print that the page has been trumpified.

In `script.js`, our content script, we need to add the functionality to both change the images to images of Trump and the ability to actually receive the messages our background script is sending. Add this code to the bottom of your `script.js` file:

```javascript
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
});
```

The code at the top is very similar to the code from our `cage-match` extension provided in the sample code and shown above. We create a list of links, each one of which is a picture of Donald Trump. Then, we create a function called `trumpify`, which takes each image on the current page, and makes it an image of Donald Trump from one of the five that we have provided.

The interesting bit is the part at the bottom. Essentially, we add a listener to the Chrome runtime that listens for any messages that are sent to the tab. As soon as we get a message, we know it is being sent from our background page to tell us that our icon has been pressed, so at that point, we can change the images on our page.

Reload your extension. Then, go to Google Images and search for something, like "pizza" or "puppies." Then, click our extension logo and watch all your pictures change!

<a id="drumpf-dom"></a>
### 4.3 Advanced JavaScript: DOM Mutations
Our extension is looking pretty good, but there's one problem. Try doing a Google search for "Donald Trump," and look at the search results for the first page. You should see that all of our "Trump"s have been changed to "Drumpf"s. However, try clicking to the next page; you should still see "Trump." 

This is because of a problem in the way that content scripts work. Remember in our `manifest.json` file where we specified `run_at`: `document_end`? This basically says that as soon as our page is loaded for the first time, run our script, which does the text replacement. However, many pages load things dynamically, which update the current document without having to load a new page. Facebook does this so you don't have to reload the page to scroll down on your newsfeed, and Google does this with its search results. So, how can we change the text in this dynamically loaded content?

We can do this with an advanced JavaScript technique called mutation observing. Essentially, we can create an observer that listens for certain events that occur within our DOM; this could be an event like the addition of a new link, the deletion of an image, or anything like that. In this case, we want to listen for the insertion of new elements; these new elements that are inserted may have "Trump"s in them, which we definitely need to change.

To do this, add the following code to your `script.js`:

```javascript
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
```

First, we create a `MutationObserver` object. We go through each of our mutations, looking at any nodes that may have been added in that mutation. Then, we step through each of those added nodes, and call `walk` on them, the function that we use to do our text replacement. This way, we make sure to do text replacement on every new node that is added. Then, we call the observer to observe, passing in our entire document and instructing it to look at both the childList of our document as well as the subtree (essentially any sub-elements of the document). This way, whenever any new elements are added to our page, we can Drumpfify them without having to reload the page.

Reload your extension and try the Google search results again. No matter how many pages you go through, you should see your Drumpf results. 

Our final code should look as follows:

`manifest.json`
```javascript
{
  "manifest_version": 2,
  "name": "Drumpfinator",
  "version": "1.0",
  "description": "An extension that replaces all instances of 'Trump' with 'Drumpf'",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ],
  "permissions" : ["tabs", "*://*/*"],
  "background" : {
    "scripts" : ["background.js"],
    "persistent" : false
  },
  "browser_action": {
    "default_icon": "trump.png"
  }
}
```

`script.js`
```javascript
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
```

`background.js`
```javascript
// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(response) {
    console.log("Your page has been trumpified!");
  });
});
```

___________

<a id="additionalresources"></a>
## Additional Resources
If you want to learn more about how to build awesome Chrome extensions, check out these resources:

[Sample Extensions][samples]
[Boiler Plate to Start][extensionizr]
[jQuery and DOM Manipulation][jquery]
[Inspiration][inspiration]
[ADI Resources][learn]

[cloud-to-butt]: https://chrome.google.com/webstore/detail/cloud-to-butt-plus/apmlngnhgbnjpajelfkmabhkfapgnoai
[ad-block]: https://chrome.google.com/webstore/detail/betafish-adblocker/gighmmpiobklfepjocnamgkkbiglidom
[doge]: https://chrome.google.com/webstore/detail/libdoge/ifbchccfedjkkhlnffjckaghjdpchhmo
[adi]: https://adicu.com
[sample-code]: http://google.com
[matt-pic]: https://twitter.com/matthew_pic
[github-repo]: https://github.com/mjp2220/useless-chrome-extensions
[chrome-developer]: https://developer.chrome.com/extensions
[dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[background]: https://developer.chrome.com/extensions/event_pages
[permissions]: https://developer.chrome.com/extensions/activeTab
[browser-action]: https://developer.chrome.com/extensions/browserAction
[chrome-install]: https://www.google.com/chrome/browser/desktop/
[samples]: https://developer.chrome.com/extensions/samples
[extensionizr]: http://extensionizr.com/
[jquery]: http://learn.adicu.com/jquery/
[inspiration]: http://www.creativebloq.com/web-design/google-chrome-extensions-21410570
[rick-roll]: https://www.youtube.com/watch?v=dQw4w9WgXcQ
[learn]: https://adicu.com/resources
[code-link]: https://github.com/mjp2220/useless-chrome-extensions/archive/master.zip
[browser-actions]: https://developer.chrome.com/extensions/browserAction
[background-pages]: https://developer.chrome.com/extensions/background_pages
[message-passing]: https://developer.chrome.com/extensions/messaging
[john-oliver]: https://www.youtube.com/watch?v=DnpO_RTSNmQ
[drumpfinator]: https://chrome.google.com/webstore/detail/drumpfinator/hcimhbfpiofdihhdnofbdlhjcmjopilp?hl=en
[trump-wiki]: https://en.wikipedia.org/wiki/Donald_Trump
[trump-image]: http://graphics8.nytimes.com/newsgraphics/2015/01/30/candidate-tracker/assets/images/trump-square-silo-150.png
[event-pages]: https://developer.chrome.com/extensions/event_pages


