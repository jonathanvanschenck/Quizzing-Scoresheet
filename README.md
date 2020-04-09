# Quizzing-Scoresheet
A simple HTML/JS web app to keep score of a quizzing match, intended to the used either offline on a mobile device, or online paired with a web server for real-time scoresheet updating. Based on C&MA Quizzing rules.

The app is uses `jQuery`, `socket.io` and `FileSaver.js` as the main workhorses.

A demo version of the online functionality is implemented in `python-flask` to
illustrate possibilities for generalization.

# Using Offline
## tl;dr
Save `html/Quizzing_Scoresheet_offline.html` to your mobile device somehow (email
attachments are pretty easy, or you can open [this link](https://raw.githubusercontent.com/jonathanvanschenck/Quizzing-Scoresheet/master/html/Quizzing_Scoresheet_offline.html) on
your device's browser, then from settings click the download button to save a copy locally on your device). Then open it with your favorite browser, like Chrome or Firefox (Android's
"html viewer" doesn't work yet).

## How to Use
Left click on questions to award points or errors and right click on questions to award nonstandard events (like fouls and challenges).

Left click on the starting 20 points to modify them.

Left click on the question types boxes to track question types.

Left click on the question number above a particular team to award no-jumps or team fouls.

Most actions can be undone by re-clicking on the mistake and selecting the __ option.

When the quiz is done, you can save the data locally into your device using the "Save As" button at the top of the page.

You can load old score sheets using the "Load" button.

You can click the "Clear" button to make a new score sheet, or just reload the page. WARNING: THIS ACTION
CANNOT BE UNDONE

## Developing
Development should take place primarily in the `templates/*.html`, `static/style.css` and `static/js/*.js` files. When your development is done, you can build the output `html` files which can then be used offline or served on a web server. To build, just run:
```bash
 $ python3 build.py
 ```
 This will collapse the whole `html`/`js`/`css` structure down into a single `html` file which can then be rendered by a browser in isolation (these are the `html/Quizzing_Scoresheet_*.html` files).

# Using Online (Python-Flask Demo)
## Install
To use the demo online version, you will need to have Python 3.7+ installed
on your system. Then open up a terminal in this directory and run:
```bash
 $ python3 -m venv venv
 $ source venv/bin/activate
 (venv) $ pip install -r requirements.txt
```
On windows `cmd`, this looks like:
```cmd
 > python -m venv venv
 > .\venv\Scripts\Activate
 (venv) > python -m pip install -r requirements.txt
```
## Running
Then, to host the web server locally, just run:
```bash
 (venv) $ gunicorn wsgi --worker-class eventlet --bind localhost:8000
```
If this doesn't work (i.e. if `gunicorn` didn't install), you can backup to:
```bash
 (venv) $ python3 wsgi.py
```
But this isn't recommended if you are going to deploy this anywhere.

## Using
With `gunicorn` running our `python-flask` app, you can then access the following
three urls from your computer:
1) (http://localhost:8000/offline) This will prompt you to download the Offline version off the app
(same as above)
2) (http://localhost:8000/online) This will open the online version of the app,
where a scorekeeper for a quiz can keep score.
3) (http://localhost:8000/viewer) This will open a "read only" version of the app,
which should update in real-time as the scorekeeper makes changes to the online
version.

# Using Online (Some Other Web Server)
If you prefer to use this with a different web server, (like `node.js` or whatever),
here is a quick summary of the server-side `socket.io` functions first you will
need to specify the namespace `/test` for all of your socket emit statements. Next,
you will need to implement each of the following functions (an example of these
can been found in `app.py` for `python-flask`):

## `.on('connect')`
This will is the ping that the server will get whenever a new client opens an
online or viewer app. This function needs to exist, but it doesn't really need
to do much. I just have it echo a response: `.emit('log', {'data': 'Connected at python!'})`

## `.on('join')`
This is called when a new client joins, and they wish to be registered in a
room (default is just "1", but you can change this in `static/js/online.js` to
be more complicated, say, if you need 40 seperate quizzes). At the very least,
this function needs to call `join_room` on the room value in the message (i.e.
`join_room(msg['room'])`).

## `.on('echo')`
This function should call `.emit('log', msg)` to send the message back to the
client for logging in the console.

## `.on('broadcast_action')`
This function needs to broadcast an emit to the the entire room indicted by
the message: `.emit('update_table', msg, broadcast = True, room = msg['room'])`

# Goals for the future
 1) Keep commenting the code!
 5) Make the app look a little better?
 7) Stress test the app at an actual quiz meet
 8) Right now, there is no way to assign two states to a single quizzer's interaction with a question. That is, if a quizzer errors, then challenges and is overturned, the app cannot represent both the error and the overturned challenge at the same time. Find a good way to fix this...
 9) Add some interfacing with offical meet draws, so that coaches could pre-generate scoresheets with the correct quizzer names, team names, room numbers, etc...
