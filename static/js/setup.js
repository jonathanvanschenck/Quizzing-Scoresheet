//
// === Data and references ===
//

// Get current date
var dateObj = new Date();
var dlist = dateObj.toLocaleDateString().match(/(\d*)[/](\d*)[/](\d*)/);

// Create convenient jquery references
var _mtable = $("#meta-table");
var _table = $("#table-cont");
var _pmenu = $("#primary-menu");
var _smenu = $("#secondary-menu");
var _spmenu = $("#sp-menu");
var _hmenu = $("#h-menu");
var _qtmenu = $("#qt-menu");

// Cell creation data
var data_meta_h = [ // Meta Table
  {label:"Date:",l1: "a"},
  {label:"PlaceHolder",l1: "b"},
  {label:"",l1: "g"},
  {label:"Name",l1: "h"},
  {label:"",l1: "c"},
  {label:"Team",l1: "d"},
  {label:"Score",l1: "e"},
  {label:"Points",l1: "f"}
];
var data_startpoints = [ // Starting Points Menu
  {content:"__", value:""},
  {content:"20", value:"20"}
];
var data_h = [ // Header Menu
  {content:"No Jump", value:"|"},
  {content:"Team Foul", value:"TF"}
];
var data_pmenu = [ // Primary Menu
  {content:"__", value:""},
  {content:"No Jump", value:"|"},
  {content:"20", value:"20"},
  {content:"30", value:"30"},
  {content:"E", value:"E"},
  {content:"E-10", value:"E-10"},
  {content:"B20", value:"B20"},
  {content:"B10", value:"B10"},
  {content:"BE", value:"BE"}
];
var data_smenu = [ // Secondary Menu
  {content:"__", value:""},
  {content:"F", value:"F"},
  {content:"F-10", value:"F-10"},
  {content:"Team Foul", value:"TF"},
  {content:"CA", value:"CA"},
  {content:"CO", value:"CO"},
  {content:"CO-10", value:"CO-10"}
];
var data_qtmenu = [ // Question Types
  [{content:"__", value:""}],
  [{content:"INT", value:"INT", type:"I"}],
  [{content:"MA", value:"MA", type:"MA"}],
  [{content:"CR", value:"CR", type:"R"},
  {content:"CVR", value:"CVR", type:"R"},
  {content:"CRMA", value:"CRMA", type:"R"},
  {content:"CVRMA", value:"CVRMA", type:"R"}],
  [{content:"QT", value:"QT", type:"Q"},
  {content:"Q2V", value:"Q2V", type:"Q"}],
  [{content:"FTV", value:"FTV", type:"F"},
  {content:"F2V", value:"F2V", type:"F"},
  {content:"FT", value:"QT", type:"F"},
  {content:"FTN", value:"CR", type:"F"}],
  [{content:"SIT", value:"SIT", type:"S"}]
];
var data_questions = [ // Questions Table
  {Q:"1",visible:true},
  {Q:"2",visible:true},
  {Q:"3",visible:true},
  {Q:"4",visible:true},
  {Q:"5",visible:true},
  {Q:"6",visible:true},
  {Q:"7",visible:true},
  {Q:"8",visible:true},
  {Q:"9",visible:true},
  {Q:"10",visible:true},
  {Q:"11",visible:true},
  {Q:"12",visible:true},
  {Q:"13",visible:true},
  {Q:"14",visible:true},
  {Q:"15",visible:true},
  {Q:"16",visible:true},
  {Q:"17",visible:true},
  {Q:"18",visible:true},
  {Q:"19",visible:true},
  {Q:"20",visible:true},
  {Q:"21",visible:true},
  {Q:"22",visible:true},
  {Q:"23",visible:true}
];

//
// === Setup function to populate rows in tables ===
//
populate_table = function() {
  // === Meta Table ===
  // Create headers
  let row = $('<tr>').toggleClass("meta-header-row", true)
  data_meta_h.map(d => {
    row.append(
      $('<td>').toggleClass("meta-header", true)
        .toggleClass("empty",d.label === "")
        .attr("id","MH-"+d.l1)
        .text(d.label)
    );
  });
  _mtable.append(row);

  // Create cells
  let la = ["A","B","C"];
  for (let i = 0 ; i < 3 ; i++) {
    let row = $('<tr>').toggleClass("meta-data-row", true)
    data_meta_h.map(d => {
      row.append(
        $('<td>').toggleClass("meta-data",true)
                 .attr("id","M"+la[i]+"-"+d.l1)
      );
    });
    _mtable.append(row);
  };

  // Attach Data
  $("#MH-a").toggleClass("meta-bar",true)
    .toggleClass("meta-header",false)
    .toggleClass("meta-data",true);
  $("#MA-a").toggleClass("meta-bar",true).text("Meet:");
  $("#MB-a").toggleClass("meta-bar",true).text("Room:");
  $("#MC-a").toggleClass("meta-bar",true).text("Quiz #:");

  $("#MA-c").toggleClass("meta-bar",true).text("First:");
  $("#MB-c").toggleClass("meta-bar",true).text("Second:");
  $("#MC-c").toggleClass("meta-bar",true).text("Third:");

  $("#MA-g").toggleClass("meta-bar",true).text("QM:");
  $("#MB-g").toggleClass("meta-bar",true).text("AJ:");
  $("#MC-g").toggleClass("meta-bar",true).text("SK:");

  _mtable.children(".meta-data-row")
  .children("td")
  .filter(function () {
    return $(this).attr('id').match(/[M][ABC]-([a-h])/)[1] == 'b';
  }).each(function() {
    elem = $(this);
    elem.append(
      $('<input>').attr("type","text")
      .attr("id","input-"+elem.attr("id"))
      .toggleClass("meta-input",true)
    )
  });

  // Date input
  $("#MH-b").toggleClass("meta-header", false).toggleClass("meta-data", true)
  .text("")
  .append(
    $("<input>").attr("type","date")
        .attr("id","input-MH-b")
        .toggleClass("meta-input", true)
        .val(dlist[3]+"-"+padl(dlist[1],"0",2)+"-"+padl(dlist[2],"0",2))
  );
  // Names inputs
  _mtable.children(".meta-data-row")
  .children("td")
  .filter(function() {
    return $(this).attr("id").match(/[M][ABC]-([a-h])/)[1] == 'h';
  }).each(function () {
    let elem = $(this);
    elem.append(
      $("<input>").attr("type","text")
      .attr("id","input-"+elem.attr('id'))
      .toggleClass("name-input",true)
    );
  });

  // === Primary Table ===
  // Create cells
  data_pmenu.map(d => {
    _pmenu.append(
      $("<tr>").toggleClass("menu-row", true)
      .append(
        $("<td>").toggleClass("menu-option", true)
        .text(d.content).data(d)
      )
    )
  });

  // === Secondary Table ===
  // Create cells
  data_smenu.map(d => {
    _smenu.append(
      $("<tr>").toggleClass("menu-row", true)
      .append(
        $("<td>").toggleClass("menu-option", true)
        .text(d.content).data(d)
      )
    )
  });

  // === Starting Points Table ===
  // Create cells
  data_startpoints.map(d => {
    _spmenu.append(
      $("<tr>").toggleClass("menu-row", true)
      .append(
        $("<td>").toggleClass("menu-option", true)
        .text(d.content).data(d)
      )
    )
  });
  // === Question Types Table ===
  // Create cells
  data_qtmenu.map(d => {
    let r = $("<tr>").toggleClass("menu-row", true)
    for (let dd of d) {
      r.append(
        $("<td>").toggleClass("menu-option", true)
        .text(dd.content).data(dd)
      );
    };
    _qtmenu.append(r);
  });

  // === Headers Table ===
  // Create cells
  data_h.map(d => {
    _hmenu.append(
      $("<tr>").toggleClass("menu-row", true)
      .append(
        $("<td>").toggleClass("menu-option", true)
        .text(d.content).data(d)
      )
    )
  });

  // === Questions Table ===
  for (let t of ["A", "B", "C"]) {
    // === Header Setup ===
    let r = $("<tr>").addClass("Team"+t+" bracket-header");
    r.append( // Team name
      $("<td>").addClass("Team"+t+" bar")
      .attr("id", t + "H-b")
      .append( // Team name input
        $("<input>").attr("type","text")
        .attr("id","input-"+t+"H-b")
        .addClass("Team"+t+" team-input")
        .val("Team "+t)
      )
    ).append( // C Box
      $("<td>").addClass("Team"+t+" bar CI-box")
      .attr("id", t + "H-c")
      .text("C")
    ).append( // I Box
      $("<td>").addClass("Team"+t+" bar CI-box")
      .attr("id", t + "H-d")
      .text("I")
    )
    // Question headers
    data_questions.map(d => {
      r.append(
        $("<td>").addClass("Team"+t+" question Que-"+d.Q)
        .attr("id", t+"H-"+d.Q)
        .text(d.Q)
        .css("display", d.visible ? "" : "none")
        .toggleClass("greyout", Number(d.Q) > 20)
      );
    });
    _table.append(r);

    // === Rows Setup ===
    for (let j = 1; j < 6; j++) {
      let r = $("<tr>").addClass("Team"+t+" bracket-"+j);
      r.append( // Quizzer Name
        $("<tr>").addClass("Team"+t+" bar")
        .attr("id",t+j+"-b")
        .append(
          $("<input>").attr("type","text")
          .addClass("Team"+t+" name-input")
          .attr("id","input-"+t+j+"-b")
          .val("Quizzer "+j)
        )
      ).append( // C box
        $("<td>").addClass("Team"+t+" bar CI-box")
        .attr("id",t+j+"-c")
        .text("0")
      ).append( // I box
        $("<td>").addClass("Team"+t+" bar CI-box")
        .attr("id",t+j+"-d")
        .text("0")
      )
      // Questions
      data_questions.map(d => {
        r.append(
          $("<td>").addClass("Team"+t+" question Que-"+d.Q+" Qui-"+j)
          .attr("id", t+j+"-"+d.Q)
          .css("display", d.visible ? "" : "none")
          .toggleClass("greyout", Number(d.Q) > 20)
        );
      });
      _table.append(r);
    };


    // === Footer Setup ===
    r = $("<tr>").addClass("Team"+t+" bracket-footer");
    r.append( // Total Box
      $("<td>").addClass("Team"+t+" bar")
      .attr("id", t + "F-b")
      .css("text-align","right")
      .text("Total:")
    ).append( // Total Box
      $("<td>").addClass("Team"+t+" bar start-points")
      .attr("id", t + "F-c")
      .attr("colspan","2")
      .text("20")
    ).append( // Empty Box
      $("<td>").addClass("Team"+t)
      .attr("id", t + "F-d")
      .css("display","none")
    )
    // Question headers
    data_questions.map(d => {
      r.append(
        $("<td>").addClass("Team"+t+" question Que-"+d.Q)
        .attr("id", t+"F-"+d.Q)
        .css("display", d.visible ? "" : "none")
        .toggleClass("greyout", Number(d.Q) > 20)
      );
    });
    _table.append(r);
  };

  // === Question Types Setup ===
  t = "D";
  r = $("<tr>").addClass("Team"+t+" bracket-qt");
  r.append( // Label Box
    $("<td>").addClass("Team"+t+" bar")
    .attr("id", t + "F-b")
    .css("text-align","right")
    .attr("colspan","3")
    .text("Q Types:")
  ).append( // Empty Box
    $("<td>").addClass("Team"+t)
    .attr("id", t + "F-c")
    .css("display","none")
  ).append( // Empty Box
    $("<td>").addClass("Team"+t)
    .attr("id", t + "F-d")
    .css("display","none")
  )
  // Question headers
  data_questions.map(d => {
    r.append(
      $("<td>").addClass("Team"+t+" question-type Que-"+d.Q)
      .attr("id", t+"F-"+d.Q)
      .css("display", (d.visible && Number(d.Q) < 21) ? "" : "none")
    );
  });
  _table.append(r);
  // === Update all cells ===
  update_all();
};

//
// === Attach Interactivity Function ===
//
attach_click_events = function(use_socket) {
  // === Main Row clicks ===
  $('.question').filter(function() {
    let q = $(this.parentNode);
    return !(q.hasClass("bracket-header") || q.hasClass("bracket-footer"))
  }).on("click", function(event) {
    let cval = $(".active").length;
    $('.menu').css('display', 'none');
    if (cval == 1) {
      $(".active").toggleClass("active",false);
    } else {
      $(".active").toggleClass("active",false);
      $(this).toggleClass("active",true)

      _pmenu.css('position', 'absolute')
      .css('left', event.pageX + "px")
      .css('top', event.pageY - (_pmenu.height() * $(this).hasClass("TeamC")) + "px")
      .css('display', 'block');
    }
  }).on("contextmenu", function(event) {
    let cval = $(".active").length;
    $('.menu').css('display', 'none');
    if (cval == 1) {
      $(".active").toggleClass("active",false);
    } else {
      $(".active").toggleClass("active",false);
      $(this).toggleClass("active",true);

      _smenu.css('position', 'absolute')
      .css('left', event.pageX + "px")
      .css('top', event.pageY- (_smenu.height() * $(this).hasClass("TeamC")) + "px")
      .css('display', 'block');
    }
    event.preventDefault();
  });

  // === header clicks ===
  $('.question').filter(function () {
    return $(this.parentNode).hasClass("bracket-header");
  }).on("click", function(event) {
    let cval = $(".active").length;
    $('.menu').css('display', 'none');
    if (cval == 1) {
      $(".active").toggleClass("active",false);
    } else {
      $(".active").toggleClass("active",false);
      $(this).toggleClass("active",true);

      _hmenu.css('position', 'absolute')
      .css('left', event.pageX + "px")
      .css('top', event.pageY + "px")
      .css('display', 'block');
    }
  });

  $('.start-points').on("click", function(event) {
    let cval = $(".active").length;
    $('.menu').css('display', 'none');
    if (cval == 1) {
      $(".active").toggleClass("active",false);
    } else {
      $(".active").toggleClass("active",false);
      $(this).toggleClass("active",true);

      _spmenu.css('position', 'absolute')
      .css('left', event.pageX + "px")
      .css('top', event.pageY- (_spmenu.height() * $(this).hasClass("TeamC")) + "px")
      .css('display', 'block');
    }
  });

  $('.question-type').on("click", function(event) {
    let cval = $(".active").length;
    $('.menu').css('display', 'none');
    if (cval == 1) {
      $(".active").toggleClass("active",false);
    } else {
      $(".active").toggleClass("active",false);

      let self = $(this);
      self.toggleClass("active",true);
      let q_num = self.attr("id").match(/DF[-](\d*)/)[1]

      _qtmenu.css('position', 'absolute')
      .css('left', event.pageX - (0.5 * _qtmenu.width() * (q_num > 16)) + "px")
      .css('top', (event.pageY - _qtmenu.height()) + "px")
      .css('display', 'block');
    }
  });

  // Menu Option click setup
  $('.menu-option').on("click", function(event) {
    let _data = $(this).data();
    let q = $('.active');
    let q_id = q.attr("id");
    let tn = q_id.match(/([ABCD])[HF12345][-]\d*/)[1];
    let qn = q_id.match(/[ABCD]([HF12345])[-]\d*/)[1];
    let ques_num = q_id.match(/[ABCD][HF12345][-](\d*)/)[1];
    if (q.text() === "TF") { //
      $(".question").filter(function () {
        let idm = $(this).attr("id").match(/([ABC])[12345][-](\d*)/);
        if (!!idm) {
          return (idm[1] === tn && idm[2] === ques_num);
        } else {
          return false;
        }
      }).text("");
    } else if (q.text() === "|") {
      $(".question").filter(function () {
        let idm = $(this).attr("id").match(/([ABC])[12345][-](\d*)/);
        if (!!idm) {
          return idm[2] === ques_num;
        } else {
          return false;
        }
      }).each(function () {
        let self = $(this);
        if (self.text() === "|") {
          self.text("")
        }
      });
      update_score("A");
      update_score("B");
      update_score("C");
    }
    if (_data.value === "TF") {
      $(".question").filter(function () {
        let idm = $(this).attr("id").match(/([ABC])[12345][-](\d*)/);
        if (!!idm) {
          return (idm[1] === tn && idm[2] === ques_num);
        } else {
          return false;
        }
      }).text(_data.value);
    } else if (_data.value === "|") {
      for (let la of ["A","B","C"])  {
        var already_answered = false;
        $(".question").filter(function () {
          let idm = $(this).attr("id").match(/([ABC])[12345][-](\d*)/);
          if (!!idm) {
            return (idm[1] === la && idm[2] === ques_num);
          } else {
            return false;
          }
        }).each(function () {
          if (!($(this).text() === "")) {
            already_answered = true;
          }
        })
        if (!already_answered) {
          $(".question").filter(function () {
            let idm = $(this).attr("id").match(/([ABC])[12345][-](\d*)/);
            if (!!idm) {
              return (idm[1] === la && idm[2] === ques_num);
            } else {
              return false;
            }
          }).text("|");
        }
      }
      update_score("A");
      update_score("B");
      update_score("C");
    } else {
      q.text(_data.value);
    }
    if (!(tn === "D")) {
      update_score(tn);
    }
    if (!( qn==="H" || qn==="F")) {
      update_CI(tn,qn);
    }
    $(".active").toggleClass("active",false);
    $('.menu').css('display', 'none');
    update_meta();
    update_used();

    // broadcast action
    if (use_socket) {
      broadcast_action({
        cell:q_id,
        value:_data.value,
        table:text_from_table()
      });
    }
  });

  // Set 'select all' functionality
  $("input[type='text']").on("click", function() { this.select(); });
}


//
// === Helper Functions ===
//

sort_teams = function (a , b) {
  if (a.score < b.score) {
    return 1;
  } else if (a.score > b.score) {
    return -1;
  } else {
    if (a.score2 < b.score2) {
      return 1;
    } else if (a.score2 > b.score2) {
      return -1;
    } else {
      return 0;
    }
  }
}

parse_points = function (score, order) {
  if (order === 1) {
    return Math.max(score/10,10);
  } else if (order === 2) {
    return Math.max(score/10 - 1,5);
  } else if (order === 3) {
    return Math.max(score/10 - 2,1);
  }
}

get_input_value = function (jquery_input_obj) {
  return document.getElementById(jquery_input_obj.attr("id")).value;
}

parse_score = function (score) {
  var sc = score.match(/[A-z]{0,2}([-]{0,1}\d*)/)[1];
  if (sc === "") {
    return 0;
  } else {
    return +sc;
  }
};

update_score = function(tn) {
  let q = $("#"+tn+"F-c")
  let cumsum = +q.text();
  q.parent().children(".question").each(function() {
    let self = $(this);
    let qn = self.attr("id").match(/[ABC][AF12345][-](\d*)/)[1];
    let psum = 0;
    let update = false;
    for (let j = 1; j < 6; j++) {
      let pval = $("#"+tn+j+"-"+qn).text();
      if (!(pval === "")) {
        update = true;
      }
      psum += parse_score(pval);
    };
    cumsum += psum
    if (!(psum === 0) || qn === "20" || qn === "23" || update) {
      self.text(cumsum);
    } else {
      self.text("");
    }
  });
}

update_CI = function(tn,qn) {
  let csum = 0, isum = 0;
  $("#"+tn+qn+"-c").parent().children(".question").filter(function () {
    return +$(this).attr("id").match(/[ABC]\d*[-](\d*)/)[1] < 21;
  }).each(function() {
    let val = $(this).text();
    if (val === "20" || val === "30") {
      csum += 1;
    } else if (val === "E" || val === "E-10") {
      isum += 1;
    }
  });
  $("#"+tn+qn+"-c").text(csum);
  $("#"+tn+qn+"-d").text(isum);
}

update_used = function() {
  if (document.getElementById('use_used').checked) {
    for (let ques_n = 1; ques_n < 16; ques_n++) {
      let filled = false;
      // Loop through question rows
      for (let tn of ["A", "B", "C"]) {
        for (let quiz_n of [1,2,3,4,5]) {
          let text = $("#"+tn+quiz_n+"-"+ques_n).text();
          filled = filled || !(text === "" || text === "F" || text === "F-10");
        }
      }
      // Loop through again to set "used" state
      for (let tn of ["A", "B", "C"]) {
        for (let quiz_n of ["H","F","1","2","3","4","5"]) {
          $("#"+tn+quiz_n+"-"+ques_n).toggleClass("used",filled);
        }
      }
    };
    for (let ques_n = 16; ques_n < 24; ques_n++) {
      let has_correct = false;
      // Loop through question rows for corrects
      for (let tn of ["A", "B", "C"]) {
        for (let quiz_n of [1,2,3,4,5]) {
          let text = $("#"+tn+quiz_n+"-"+ques_n).text();
          has_correct = has_correct || text === "20" || text === "30";
        }
      }
      // Loop through again to set corrects state
      for (let tn of ["A", "B", "C"]) {
        for (let quiz_n of ["H","F","1","2","3","4","5"]) {
          $("#"+tn+quiz_n+"-"+ques_n).toggleClass("used",has_correct);
        }
      }
      // Loop through question rows for filled
      for (let tn of ["A", "B", "C"]) {
        let filled = false;
        for (let quiz_n of [1,2,3,4,5]) {
          let text = $("#"+tn+quiz_n+"-"+ques_n).text();
          filled = filled || !(text === "" || text === "F" || text === "F-10");
        }
        if (filled) {
          for (let quiz_n of ["H","F","1","2","3","4","5"]) {
            $("#"+tn+quiz_n+"-"+ques_n).addClass("used")
          }
        }
      }
    };
  } else {
    $("td").toggleClass("used",false)
  }
};

update_meta = function() {
  let team_list = [];
  $('.team-input').each(function (i) {
    let tn = $(this).attr("class").match(/Team([ABC])/)[1];
    team_list.push({
      score: +$("#"+tn+"F-20").text(),
      score2: +$("#"+tn+"F-23").text(),
      t: tn,
      name: get_input_value($("#"+tn+"H-b").children("input")),
      order: i+1
    });
  });
  team_list.sort(sort_teams);
  let i;
  team_list[0].order = 1;
  for (i = 0 ; i < 2 ; i++) {
    if (team_list[i+1].score === team_list[i].score) {
      team_list[i+1].order = team_list[i].order
    } else {
      team_list[i+1].order = i+1+1;
    }
  }
  $('.team-input').each(function (i) {
    let tn = $(this).attr("class").match(/Team([ABC])/)[1];
    $('#M'+tn+'-e').text(team_list[i].score)
    .toggleClass("TeamA",team_list[i].t === "A")
    .toggleClass("TeamB",team_list[i].t === "B")
    .toggleClass("TeamC",team_list[i].t === "C");
    $('#M'+tn+'-d').text(team_list[i].name)
    .toggleClass("TeamA",team_list[i].t === "A")
    .toggleClass("TeamB",team_list[i].t === "B")
    .toggleClass("TeamC",team_list[i].t === "C");
    $('#M'+tn+'-f').text(parse_points(team_list[i].score,team_list[i].order))
    .toggleClass("TeamA",team_list[i].t === "A")
    .toggleClass("TeamB",team_list[i].t === "B")
    .toggleClass("TeamC",team_list[i].t === "C");
  });
}

update_all = function() {
  for (let t of ["","A","B","C"]) {
    update_score(t);
    for (let q of ["","1","2","3","4","5"]) {
      update_CI(t,q);
    }
  }
  update_meta();
  update_used();
}

clear = function(interactive) {
  $("tr").remove();
  populate_table();
  if (interactive) { attach_click_events(); };
  $("#uploaded-file-label").text("");
};

padl = function (str,pval,num) {
  let str2 = str + "";
  while (str2.length < num)
  str2 = pval + str2;
  return str2;
}
padr = function (str,pval,num) {
  let str2 = str + "";
  while (str2.length < num)
  str2 = str2 + pval;
  return str2;
}


// === Parsing Functions ===
text_from_table = function () {
  // Creates a list of comma seperated 'row' strings
  let rows = [];
  $("tr").filter(function () {
    return !$(this).hasClass("menu-row");
  }).each(function () {
    let row = [];
    $(this).children('td').each(function (i) {
      let inp = $(this).children("input");
      if (inp.length === 0) {
        row.push($(this).text());// = row + d3.select(this).text() + ",";
      } else {
        row.push(get_input_value(inp));// = row + get_input_value(inp) + ",";
      }
    });
    rows.push(row.join(",") + "\n");//row.slice(0,-1)+"\n");
  });
  return rows
};

table_from_text = function (rows) {
  // Given a list of comma seperated 'row' strings, populate table
  $("tr").filter(function () {
    return !$(this).hasClass("menu-row");
  }).each(function (i) {
    let row = rows[i].split(',');
    $(this).children('td').each(function (j) {
      let inp = $(this).children("input");
      if (inp.length === 0) {
        $(this).text(row[j]);
      } else {
        document.getElementById(inp.attr("id")).value = row[j];
      }
    });
  });
};

render = function(ext) {
  // Render the current table into a .ext file
  let rows = text_from_table();
  let blob = new Blob(rows, {type: "text/plaintext;charset=utf-8"});
  saveAs(blob, get_input_value($("#input-MH-b"))+"-"+padl(get_input_value($("#input-MC-b")),"0",3)+"."+ext);
}

load_file = function(input, interactive) {
  // Load a rendered file into the tables
  let file = input.files[0];
  let ext = file.name.split('').reverse().join('')
  if (ext.indexOf(".") === -1) {
    alert("Invalid File Type");
    return null;
  }
  ext = ext.slice(0,ext.indexOf('.')).split('').reverse().join('');
  //console.log(ext);
  if (!(ext === 'dat')) {
    alert("Invalid File Type");
    return null;
  }

  let reader = new FileReader();

  reader.onload = function () {
    let rows = reader.result.split("\n");
    table_from_text(rows);
  };

  clear(interactive);
  reader.readAsText(file);
  $("#uploaded-file-label").text("From File: "+file.name);
  document.getElementById("upload-input").value = '';
  setTimeout(function(){
    update_all();
  }, 1000); // ugly, but functional
}
