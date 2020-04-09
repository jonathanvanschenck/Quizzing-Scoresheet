interactive = true;

clear(interactive);

// Attach button functions
$("#clear-button").on("click", function () {
  if (confirm("Are you sure you want to clear this form?")) {
    clear(interactive);
  } else {}
});
$("#update-button").on("click", () => update_all());
$("#render1-button").on("click", () => render('dat'));
$("#upload-button").on("click", () => document.getElementById("upload-input").click());
$("#upload-input").on("change", function () { load_file(this, interactive); });
$("#use_used").on("change", () => update_used());

// Attach broadcast_action warning
$(document).ready(function () {
  broadcast_action = function (msg) {
    alert("Cannot Broadcast from viewer");
  }
});
