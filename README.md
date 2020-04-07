# Quizzing-Scoresheet
A simple HTML/JS web app to keep score of a quizzing match, intended to the used either offline on a mobile device, or online paired with a web-server for real-time scoresheet updating. Based on C&MA Quizzing rules.

The app is uses `jQuery`, `socket.io` and `FileSaver.js` as the main workhorses.

# Using Offline
## tl;dr
Save `html/Quizzing_Scoresheet_offline.html` to your mobile device somehow (email
attachments are pretty easy, or you can open [this link](https://raw.githubusercontent.com/jonathanvanschenck/Quizzing-Scoresheet/master/html/Quizzing_Scoresheet_offline.html) on
your device, then from settings click the download button to save a copy locally on your device). Then open it with your favorite browser, like Chrome or Firefox (Android's
"html viewer" doesn't work yet).

## How to Use
Left on questions to award points or errors and right click on questions to award nonstandard events (like fouls and challenges).

When the quiz is done, you can save the data locally into your device using the "Save As" button at the top of the page.

You can load old score sheets using the "Load" button.

## Developing and Deploying
Development should take place primarily in the `templates/*.html`, `static/style.css` and `static/js/*.js` files. When your development is done, you can build the output `html` files which can then be used offline or served on a webserver. To build, just run:
```bash
 $ python3 build.py
 ```
 This will collapse the whole `html`/`js`/`css` structure down into a single `html` file which can then be rendered by a browser in isolation (these are the `html/Quizzing_Scoresheet_*.html` files).

# Using Online

## `socket.io` Emit Functions
 On the server side, implement the following functions:
 * `.on('request_room')` => `.emit('join_room', {'room': ...})`
 * `.on('echo', msg)` => `.emit('log', msg)`
 * `.on('broadcast_action', msg)` => `.emit('update_table', msg, broadcast = true, room = msg.room)`


# Goals for the future
 1) Keep commenting the code!
 2) Add functionality to track question types
 3) Add `python-flask` based web service as an example of online usage
 5) Make the app look a little better?
 7) Stress test the app at an actual quiz meet
 8) Right now, there is no way to assign two states to a single quizzer's interaction with a question. That is, if a quizzer errors, then challenges and is overturned, the app cannot represent both the error and the overturned challenge at the same time. Find a good way to fix this...
 9) Add some interfacing with offical meet draws, so that coaches could pre-generate scoresheets with the correct quizzer names, team names, room numbers, etc...
