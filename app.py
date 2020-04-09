from flask import Flask, render_template, send_file
from flask_socketio import SocketIO, emit, join_room


app = Flask(__name__, template_folder='html')
app.config['SECRET_KEY'] = 'dont_tell_anyone'
socketio = SocketIO(app)

@app.route('/')
@app.route('/index')
def index():
    return "Goto 'viewer', 'online' or 'offline'"

@app.route('/offline')
def offline():
    return send_file("html/Quizzing_Scoresheet_offline.html", as_attachment=True)

@app.route('/viewer', methods = ['GET', 'POST'])
def viewer():
    return render_template("Quizzing_Scoresheet_viewer.html")

@app.route('/online', methods = ['GET', 'POST'])
def online():
    return render_template("Quizzing_Scoresheet_online.html")

last_table = {}

@socketio.on('connect', namespace='/test')
def on_connect():
    emit('log', {'data': 'Connected at python!'})

@socketio.on('join', namespace='/test')
def on_join(msg):
    join_room(msg['room'])
    emit('log', {'data': 'Joined room: '+msg['room']})
    if msg['admin']:
        last_table[msg['room']] = None
    else:
        try:
            table = last_table[msg['room']]
        except:
            return
        if not table is None:
            emit('update_table', {'table':table})

@socketio.on('echo', namespace='/test')
def on_echo(msg):
    emit('log', msg)

@socketio.on('broadcast_action', namespace='/test')
def on_broadcast_action(msg):
    nmsg = msg;
    last_table[msg['room']] = msg['table']
    nmsg.update({"comment":"From python"})
    emit('log', nmsg, broadcast = True, room = msg['room'])
    emit('update_table', msg, broadcast = True, room = msg['room'])
