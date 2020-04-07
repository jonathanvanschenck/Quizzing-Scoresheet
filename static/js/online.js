const interactive = true;

clear(interactive);

// Attach button functions
$("#clear-button").on("click", function () {
  if (confirm("Are you sure you want to clear this form?")) {
    clear(interactive);
  } else {}
});
$("#update-button").on("click", () => update_all());
$("#render1-button").on("click", () => render('dat', interactive));
$("#upload-button").on("click", () => document.getElementById("upload-input").click());
$("#upload-input").on("change", function () { load_file(this); });
$("#use_used").on("change", () => update_used());


// Attach Socket.io functionality
var room = '';

$(document).ready(function () {
  let namespace = "/test";
  var socket = io(namespace);

  socket.on('connect', function() {
    socket.emit('request_room', {})
  });
  socket.on('join_room', function(msg) {
    room = msg.room;
  });
  socket.on('log', function(msg) {
    console.log(msg);
  });
  socket.on('update_table', msg) {
    console.log("Got Action "+msg.value+" @ "+msg.cell);
  };
  broadcast_action = function (msg) {
    socket.emit('broadcast_action', msg)
  }
});
