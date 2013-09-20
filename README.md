Lean Lazy Load
===

A javascript lazy loader without jQuery dependencies.  Very lean.

Was written to work with the random post php script but may be used in general.

Usage:

Call the function ll and pass three parameters: document, window, offset, imgs.

Offset tells the script to load an image while its still offscreen.  That way, the loading process will start before the user has scrolled all the way down to the image.

The imgs parameter can be populated as follows:
var imgs = document.querySelectorAll("img[data-lsrc]");

It can then be passed to the call of ll.

Notes on imgs parameter:
If no imgs is passed to the function then ll will run using its own call of document.querySelectorAll.
The imgs parameter exists to allow ll to be called after changes have been made to the DOM.
