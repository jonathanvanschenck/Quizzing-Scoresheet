const interactive = false;
const use_socket = true;

clear(interactive, use_socket);

// Handle button functions
$("#clear-button").remove();
$("#update-button").on("click", () => update_all());
$("#render1-button").remove();
$("#upload-button").remove();
$("#upload-input").remove();
$("#use_used").on("change", () => update_used());

var room = '1';

// Attach Socket.io functionality
$(document).ready(function () {
  let namespace = "/test";
  var socket = io(namespace);

  socket.on('connect', function() {
    socket.emit('join', {room: room, admin: false})
  });

  socket.on('log', function(msg) {
    console.log(msg);
  });
  socket.on('update_table', function(msg) {
    table_from_text(msg.table);
    update_all();
  });
  broadcast_action = function (msg) {
    alert("Cannot Broadcast from viewer")
  }
});
