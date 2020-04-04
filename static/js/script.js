setup = function() {
  var d = new Date();
  var dlist = d.toLocaleDateString().match(/(\d*)[/](\d*)[/](\d*)/);
  var _wind = $(".window");
  var _mtable = $("#meta-table");
  var _table = $("#table-cont");
  var _pmenu = $("#primary-menu");
  var _smenu = $("#secondary-menu");
  var _spmenu = $("#sp-menu");
  var _hmenu = $("#h-menu");

  // meta data setup
  var data_meta_h = [{label:"Date:",l1: "a"},{label:"PlaceHolder",l1: "b"},
  {label:"",l1: "g"},{label:"Name",l1: "h"},
  {label:"",l1: "c"},
  {label:"Team",l1: "d"},{label:"Score",l1: "e"},{label:"Points",l1: "f"}]

  // construct meta table
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

  // Populate meta table
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

  $("#MH-b").toggleClass("meta-header", false).toggleClass("meta-data", true)
  .text("")
  .append(
    $("<input>").attr("type","date")
        .attr("id","input-MH-b")
        .toggleClass("meta-input", true)
        .val(dlist[3]+"-"+padl(dlist[1],"0",2)+"-"+padl(dlist[2],"0",2))
  );

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

  var data_startpoints = [{content:"__", value:""},
  {content:"20", value:"20"}]
  var data_h = [{content:"No Jump", value:"|"},{content:"Team Foul", value:"TF"}]
  var data_pmenu = [{content:"__", value:""},
  {content:"No Jump", value:"|"},
  {content:"20", value:"20"},
  {content:"30", value:"30"},
  {content:"E", value:"E"},
  {content:"E-10", value:"E-10"},
  {content:"B20", value:"B20"},
  {content:"B10", value:"B10"},
  {content:"BE", value:"BE"}]
  var data_smenu = [{content:"__", value:""},
  {content:"F", value:"F"},
  {content:"F-10", value:"F-10"},
  {content:"Team Foul", value:"TF"},
  {content:"CA", value:"CA"},
  {content:"CO", value:"CO"},
  {content:"CO-10", value:"CO-10"}]

  data_pmenu.map(d => {
    _pmenu.append(
      $("<tr>").toggleClass("menu-row", true)
      .append(
        $("<td>").toggleClass("menu-option", true)
        .text(d.content).data(d)
      )
    )
  });
  data_smenu.map(d => {
    _smenu.append(
      $("<tr>").toggleClass("menu-row", true)
      .append(
        $("<td>").toggleClass("menu-option", true)
        .text(d.content).data(d)
      )
    )
  });
  data_startpoints.map(d => {
    _spmenu.append(
      $("<tr>").toggleClass("menu-row", true)
      .append(
        $("<td>").toggleClass("menu-option", true)
        .text(d.content).data(d)
      )
    )
  });
  data_h.map(d => {
    _hmenu.append(
      $("<tr>").toggleClass("menu-row", true)
      .append(
        $("<td>").toggleClass("menu-option", true)
        .text(d.content).data(d)
      )
    )
  });

  var data_questions = [
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
    {Q:"23",visible:true}];

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

    // Menu Option click setup
    $('.menu-option').on("click", function(event) {
      let _data = $(this).data();
      let q = $('.active');
      let tn = q.attr("id").match(/([ABC])[HF12345][-]\d*/)[1];
      let qn = q.attr("id").match(/[ABC]([HF12345])[-]\d*/)[1];
      let ques_num = q.attr("id").match(/[ABC][HF12345][-](\d*)/)[1];
      if (q.text() === "TF") {
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
      update_score(tn);
      if (!( qn==="H" || qn==="F")) {
        update_CI(tn,qn);
      }
      $(".active").toggleClass("active",false);
      $('.menu').css('display', 'none');
      update_meta();
    });



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

    update_score("A");
    update_score("B");
    update_score("C");
    update_meta();
  }

  get_input_value = function (jquery_input_obj) {
    return document.getElementById(jquery_input_obj.attr("id")).value;
  }

  clear = function() {
    $("tr").remove();
    setup();
    $("#uploaded-file-label").text("");
  };

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
  }

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

  render = function(ext) {
    let res = [];
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
      res.push(row.join(",") + "\n");//row.slice(0,-1)+"\n");
    });
    let blob = new Blob(res, {type: "text/plaintext;charset=utf-8"});
    saveAs(blob, get_input_value($("#input-MH-b"))+"-"+padl(get_input_value($("#input-MC-b")),"0",3)+"."+ext);
  }

  load_file = function(input) {
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

    clear();
    reader.readAsText(file);
    $("#uploaded-file-label").text("From File: "+file.name);
    document.getElementById("upload-input").value = '';
    setTimeout(function(){
      update_all();
    }, 1000); // ugly, but functional
  }

  $("#clear-button").on("click", function () {
    if (confirm("Are you sure you want to clear this form?")) {
      clear();
    } else {}
  });
  $("#update-button").on("click", () => update_all());
  $("#render1-button").on("click", () => render('dat'));
  $("#upload-button").on("click", () => document.getElementById("upload-input").click());
  $("#upload-input").on("change", function () { load_file(this); });
  setup();
