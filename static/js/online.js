const interactive = true;
const use_socket = true;

clear(interactive, use_socket);

// Attach button functions
$("#clear-button").on("click", function () {
  if (confirm("Are you sure you want to clear this form?")) {
    clear(interactive, use_socket);
  } else {}
});
$("#update-button").on("click", () => update_all());
$("#render1-button").on("click", () => render('dat'));
$("#upload-button").on("click", () => document.getElementById("upload-input").click());
$("#upload-input").on("change", function () { load_file(this, interactive, use_socket); });
$("#use_used").on("change", () => update_used());


// Attach Socket.io functionality
var room = '1';

$(document).ready(function () {
  let namespace = "/test";
  var socket = io(namespace);

  socket.on('connect', function() {
    socket.emit('join', {room: room, admin: true})
  });

  socket.on('log', function(msg) {
    console.log(msg);
  });
  socket.on('update_table', function(msg) {
    console.log("Got Action "+msg.value+" @ "+msg.cell);
  });
  broadcast_action = function (msg) {
    let nmsg = msg;
    nmsg.room = room;
    socket.emit('broadcast_action', nmsg)
  }
});
