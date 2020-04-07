interactive = false;

clear(interactive);

// Handle button functions
$("#clear-button").remove();
$("#update-button").on("click", () => update_all());
$("#render1-button").remove();
$("#upload-button").remove();
$("#upload-input").remove();
$("#use_used").on("change", () => update_used());

// Attach Socket.io functionality
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
    table_from_text(msg.table);
  };
  broadcast_action = function (msg) {
    alert("Cannot Broadcast from viewer");
  }
});
