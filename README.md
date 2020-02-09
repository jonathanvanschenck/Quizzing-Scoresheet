# Quizzing-Scoresheet
A simple HTML/JS web app to keep score of a quizzing match, intended to the used offline on a mobile device. Based on C&MA Quizzing rules.

The app is uses d3.js and FileSaver.js as the main workhorses.

## tl;dr
Save `templates/scoresheet_app.html` to your mobile device somehow (email attachments are pretty easy). Then open it with your favorite browser, like Chrome or Firefox (Android's "html viewer" doesn't work yet).

## How to Use
Left on questions to award points or errors and right click on questions to award nonstandard events (like fouls and challenges).

When the quiz is done, you can save the data locally into your device using the "Save As" button at the top of the page.

You can load old score sheets using the "Load" button.

## File structure
```
index.html
static/
|---style.css
|---js/
|   |---script.js
|---d3/
|   |---d3.min.js
|---filesaver/
|   |---FileSaver_old.min.js
templates/
|---scoresheet_app.html
```
## Developing and Deploying
Development should take place primarialy in the `index.html`, `static/style.css` and `static/js/script.js` files. `index.html` is the actual file which will render the score sheet app (calling the relevant `.css` and `.js` files). However, it is a pain to transfer the whole file structure to a mobile device, so you can collapse the whole file structure down into a single html file which can then run in isolation (this is `templates/scoresheet_app.html`). To generate this "usable" file, run:
```bash
 $ python3 convert.py
 ```
 which will take `index.html` and insert the relevant `.js` and `.css` source to create the single, isolate-able `templates/scoresheet_app.html` file.
 
 # Goals for the future
 1) Create a more "hand-holdy" version of the app, with simplified user interactions. Bascially, it will let a user say; "Quizzer 1 got a correct, then quizzer 8 got an error," and the app will keep track of the question number, 3rd persion bonuses, error outs, etc.
 2) Make the app look a little better?
 3) Make some improvements to the save file structure which would be more conducive to interfacing with other quizzing software--like cbqz.
 4) Stress test the app at an actual quiz meet
 5) Right now, there is no way to assign two states to a single quizzer's interaction with a question. That is, if a quizzer errors, then challenges and is overturned, the app cannot represent both the error and the overturned challenge at the same time. Find a good way to fix this...
