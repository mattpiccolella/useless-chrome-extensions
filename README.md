<a id="top"></a>
# Building (Useless) Chrome Extesnions

*Build (silly) things that can make your browser experience much more enjoyable.*

Written and developed by [Matt Piccolella][matt-pic] and [ADI][adi].

Credit to [Chrome Developer][chrome-developer], [Ray Wenderlich][wenderlich], [Facebook Developers][facebook-dev].

**Download the sample code [here][sample-code].**

## Getting Started: FAQs

### What is a Chrome Extension?
From Google Chrome's website, Chrome extensions "allow you to add functionality to Chrome without diving deeply into native code." This could include, for example, [changing the text that appears on the page][cloud-to-butt], [blocking ads that would appear on a page][ad-block], or [add some much-needed doge to your webpages][doge].

### Why should I build Chrome extensions?
Chrome extensions are fun, fast, and easy! Using just a few lines of beginner JavaScript code, you can make something that can make people's lives easier (or make them laugh).

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

Use this to make any replacements you want!

<a id="image-replace"></a>
### 2.2 Image Replacement

<a id="link-replace"></a>
### 2.3 Link Replacement

<a id="other-things"></a>
### 2.4 Other Things
The applications we'll This is just one simple `manifest.json` file. There are lots of other attributes you can set, such as [`background`][background], which allows us to run a single script in the background, [`permissions`][permissions], which allow us to ask the user for certain things we may not be able to do withour permission, and [`browser_action`][browser-action], which creates small icons next to the search bar that you can click and have something happen. However, `content_scripts` is what we'll mainly be looking in this tutorial.



<a id="text-replace"></a>
## 2.0 Text Replacement

<a id="image-replace"></a>
## 3.0 Image Replacement

<a id="link-replace"></a>
## 4.0 Link Replacement

My name is [Matt Piccolella][matt-pic] and the GitHub repository for this is available [here][github-repo]

___________

<a id="additionalresources"></a>
## Additional Resources

While React Native is still a very new technology, there are still lots of quality resources available to learn more about it. Below are some good places to start:



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
[permission]: https://developer.chrome.com/extensions/activeTab
[browser-action]: https://developer.chrome.com/extensions/browserAction
[chrome-install]: https://www.google.com/chrome/browser/desktop/

