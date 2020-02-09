setup = function() {
    var d = new Date();
    var dlist = d.toLocaleDateString().match(/(\d*)[/](\d*)[/](\d*)/);
    var wind = d3.select(".window");
    var mtable = d3.select("#meta-table");
    var table = d3.select("#table-cont");
    var pmenu = d3.select("#primary-menu");
    var smenu = d3.select("#secondary-menu");
    var spmenu = d3.select("#sp-menu");
    var hmenu = d3.select("#h-menu");
    
    
    var data_meta_h = [{label:"Date:",l1: "a"},{label:"PlaceHolder",l1: "b"},
                        {label:"",l1: "g"},{label:"Name",l1: "h"},
                        {label:"",l1: "c"},
                        {label:"Team",l1: "d"},{label:"Score",l1: "e"},{label:"Points",l1: "f"}]
    
    mtable.append('tr')
            .classed("meta-header-row",true)
            .selectAll("td").data(data_meta_h).enter().append('td')
            .classed("meta-header",true)
            .classed("empty",d => d.label==="")
            .attr("id",d => "MH-"+d.l1)
            .text(d => d.label);

    var i, la= ["A","B","C"];
    for (i = 0 ; i < 3 ; i++) {
        mtable.append('tr')
                .classed("meta-data-row",true)
                .selectAll("td").data(data_meta_h).enter().append('td')
                .classed("meta-data",true)
                .attr("id",d => "M"+la[i]+"-"+d.l1);
    }
    
    d3.select("#MH-a").classed("meta-bar",true)
        .classed("meta-header",false).classed("meta-data",true);
    d3.select("#MA-a").classed("meta-bar",true).text("Meet:");
    d3.select("#MB-a").classed("meta-bar",true).text("Room:");
    d3.select("#MC-a").classed("meta-bar",true).text("Quiz #:");   
    
    d3.select("#MA-c").classed("meta-bar",true).text("First:");
    d3.select("#MB-c").classed("meta-bar",true).text("Second:");
    d3.select("#MC-c").classed("meta-bar",true).text("Third:");

    d3.select("#MA-g").classed("meta-bar",true).text("QM:");
    d3.select("#MB-g").classed("meta-bar",true).text("AJ:");
    d3.select("#MC-g").classed("meta-bar",true).text("SK:");    
    
    mtable.selectAll(".meta-data-row").each(function (d) {
        d3.select(this).selectAll("td").filter(function (d) {
            return d3.select(this).attr('id').match(/[M][ABC]-([a-h])/)[1] == 'b';
        }).each(function (d) {
            d3.select(this).append("input").attr("type","text")
                .attr("id","input-"+d3.select(this).attr('id'))
                .classed("meta-input",true)
        })
    });
    d3.select("#MH-b").classed("meta-header",false).classed("meta-data",true)
        .text("")
        .append("input").attr("type","date")
        .attr("value",dlist[3]+"-"+padl(dlist[1],"0",2)+"-"+padl(dlist[2],"0",2))
        .attr("id","input-MH-b")
        .classed("meta-input",true);
    
    
    mtable.selectAll(".meta-data-row").each(function (d) {
        d3.select(this).selectAll("td").filter(function (d) {
            return d3.select(this).attr('id').match(/[M][ABC]-([a-h])/)[1] == 'h';
        }).each(function (d,i) {
            d3.select(this).append("input").attr("type","text")
                .attr("id","input-"+d3.select(this).attr('id'))
                .classed("name-input",true)
        })
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
                      
    pmenu.selectAll("tr").data(data_pmenu).enter().append("tr")
            .classed("menu-row",true)
            .append("td")
            .classed("menu-option",true)
            .text(d => d.content);
    smenu.selectAll("tr").data(data_smenu).enter().append("tr")
            .classed("menu-row",true)
            .append("td")
            .classed("menu-option",true)
            .text(d => d.content);
    spmenu.selectAll("tr").data(data_startpoints).enter().append("tr")
            .classed("menu-row",true)
            .append("td")
            .classed("menu-option",true)
            .text(d => d.content);
    hmenu.selectAll("tr").data(data_h).enter().append("tr")
            .classed("menu-row",true)
            .append("td")
            .classed("menu-option",true)
            .text(d => d.content);
            
    var data_questions = [{},{},{},
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
    
    var teams = ["A","B","C"];
    var t,i,r,j;
    for (i = 0; i < 3; i++) {
        t = teams[i];
        r = table.append("tr")
                .classed("Team"+t,true)
                .classed("bracket-header",true);
        r.append("td").classed("Team"+t,true)
            .attr("id",t+"H-b")
            .classed("bar",true)//;
            .append("input").attr("type","text")
            .attr("id","input-"+t+"H-b")
            .classed("Team"+t,true)
            .classed("team-input",true)
            .attr("value","Team "+t);
        r.append("td").classed("Team"+t,true)
            .text("C")
            .attr("id",t+"H-c")
            .classed("bar",true)
            .classed("CI-box",true);
        r.append("td").classed("Team"+t,true)
            .text("I")
            .attr("id",t+"H-d")
            .classed("bar",true)
            .classed("CI-box",true);
        r.selectAll("td").data(data_questions).enter()
            .append("td").classed("Team"+t,true)
            .attr("id", d => t+"H-"+d.Q)
            .text(d => d.Q)
            .classed("question",true)
            .style("display", d => d.visible ? "" : "none");
            
        for (j = 1; j < 6; j++) {
            r = table.append("tr")
                .classed("Team"+t,true)
                .classed("bracket-"+j,true);
            r.append("td").classed("Team"+t,true)
                .attr("id",t+j+"-b")
                .classed("bar",true)
                .append("input").attr("type","text")
                .attr("id","input-"+t+j+"-b")
                .classed("name-input",true)
                .classed("Team"+t,true)
                .attr("value","Quizzer "+j);
            r.append("td").classed("Team"+t,true)
                .text("0")
                .attr("id",t+j+"-c")
                .classed("bar",true)
                .classed("CI-box",true);
            r.append("td").classed("Team"+t,true)
                .text("0")
                .attr("id",t+j+"-d")
                .classed("bar",true)
                .classed("CI-box",true);
            r.selectAll("td").data(data_questions).enter()
                .append("td").classed("Team"+t,true)
                .attr("id", d => t+j+"-"+d.Q)
                .classed("question",true)
                .style("display", d => d.visible ? "" : "none");
        };
        
        r = table.append("tr")
                .classed("Team"+t,true)
                .classed("bracket-footer",true);
        r.append("td").classed("Team"+t,true)
            .text("Total:")
            .style("text-align","right")
            .attr("id",t+"F-b")
            .classed("bar",true);
        r.append("td").classed("Team"+t,true)
            .attr("id",t+"F-c")
            .attr("colspan","2")
            .classed("bar",true)
            .classed("start-points",true)
            .text("20");
        r.append("td").classed("Team"+t,true)
            .attr("id",t+"F-d")
            .style("display","none");
        r.selectAll("td").data(data_questions).enter()
            .append("td").classed("Team"+t,true)
            .attr("id", d => t+"F-"+d.Q)
            .classed("question",true)
            .style("display", d => d.visible ? "" : "none");
    };
    
    var q;
    for (i = 3; i < data_questions.length; i++) {  
        t = data_questions[i].Q
        d3.selectAll("td").filter('[id$="-'+t+'"]')
                .each(function(d) {
                    q = d3.select(this);
                    q.attr("class", q.attr("class") + " Que-" + t);
                    q.classed("greyout",d => (d.Q === "21" | d.Q === "22" | d.Q === "23"));
                });
    };
    for (i = 1; i < 6; i++) {  
        d3.selectAll("td").filter('[id*="'+i+'-"]')
                .each(function(d) {
                    var oldclass = d3.select(this).attr("class");
                    d3.select(this).attr("class", oldclass + " Qui-" + i);
                });
    };
    
            
            
    var q,cval;   
    d3.selectAll('.question').filter(function(d) {
            q = d3.select(this.parentNode);
            return !(q.classed("bracket-header") || q.classed("bracket-footer"))
        }).on("click", function(data, index) {
            cval = d3.selectAll(".active").size();
            d3.selectAll('.menu').style('display', 'none'); 
            if (cval == 1) {
                d3.selectAll(".active").classed("active",false);
            } else {
                d3.selectAll(".active").classed("active",false);
                q = d3.select(this);
                q.classed("active",true);
                var position = [d3.event.pageX,d3.event.pageY];
                
                pmenu.style('position', 'absolute')
                      .style('left', position[0] + "px")
                      .style('top', position[1] + "px")
                      .style('display', 'block');
            }
        });
    
    d3.selectAll('.question').filter(function(d) {
            q = d3.select(this.parentNode);
            return !(q.classed("bracket-header") || q.classed("bracket-footer"))
        }).on("contextmenu", function(data, index) {
            cval = d3.selectAll(".active").size();
            d3.selectAll('.menu').style('display', 'none');  
            if (cval == 1) {
                d3.selectAll(".active").classed("active",false);
            } else {
                d3.selectAll(".active").classed("active",false);
                q = d3.select(this);
                q.classed("active",true);
                var position = [d3.event.pageX,d3.event.pageY];
                
                smenu.style('position', 'absolute')
                      .style('left', position[0] + "px")
                      .style('top', position[1] + "px")
                      .style('display', 'block');    
            }
            d3.event.preventDefault();
        });
        
    d3.selectAll('.question').filter(function(d) {
            q = d3.select(this.parentNode);
            return (q.classed("bracket-header"))
        }).on("click", function(data, index) {
            cval = d3.selectAll(".active").size();
            d3.selectAll('.menu').style('display', 'none'); 
            if (cval == 1) {
                d3.selectAll(".active").classed("active",false);
            } else {
                d3.selectAll(".active").classed("active",false);
                q = d3.select(this);
                q.classed("active",true);
                var position = [d3.event.pageX,d3.event.pageY];
                
                hmenu.style('position', 'absolute')
                      .style('left', position[0] + "px")
                      .style('top', position[1] + "px")
                      .style('display', 'block');
            }
        });
        
    d3.selectAll('.start-points').on("click", function(data, index) {
        cval = d3.selectAll(".active").size();
        d3.selectAll('.menu').style('display', 'none');  
        if (cval == 1) {
            d3.selectAll(".active").classed("active",false);
        } else {
            d3.selectAll(".active").classed("active",false);
            q = d3.select(this);
            q.classed("active",true);
            var position = [d3.event.pageX,d3.event.pageY];
            
            spmenu.style('position', 'absolute')
                  .style('left', position[0] + "px")
                  .style('top', position[1] + "px")
                  .style('display', 'block');    
        }
    });
    
    
    d3.selectAll('.menu-option').on("click", function(data, index) {
        var q = d3.select('.active');
        var tn = q.attr("id").match(/([ABC])[HF12345][-]\d*/)[1];
        var qn = q.attr("id").match(/[ABC]([HF12345])[-]\d*/)[1];
        var ques_num = q.attr("id").match(/[ABC][HF12345][-](\d*)/)[1];
        if (q.text() === "TF") {
            d3.selectAll(".question").filter(function (d) {
                var idm = d3.select(this).attr("id").match(/([ABC])[12345][-](\d*)/);
                if (!!idm) {
                    return (idm[1] === tn && idm[2] === ques_num);
                } else {
                    return false;
                }
            }).text("");
        } else if (q.text() === "|") {
            d3.selectAll(".question").filter(function (d) {
                var idm = d3.select(this).attr("id").match(/([ABC])[12345][-](\d*)/);
                if (!!idm) {
                    return idm[2] === ques_num;
                } else {
                    return false;
                }
            }).each(function (d) {
                var self = d3.select(this);
                if (self.text() === "|") {
                    self.text("")
                }
            });
            update_score("A");
            update_score("B");
            update_score("C");
        }        
        if (data.value === "TF") {
            d3.selectAll(".question").filter(function (d) {
                var idm = d3.select(this).attr("id").match(/([ABC])[12345][-](\d*)/);
                if (!!idm) {
                    return (idm[1] === tn && idm[2] === ques_num);
                } else {
                    return false;
                }
            }).text(data.value);
        } else if (data.value === "|") {
            var la = ["A","B","C"],i;
            for (i = 0 ; i < 3 ; i++ )  {
                var already_answered = false;
                d3.selectAll(".question").filter(function (d) {
                    var idm = d3.select(this).attr("id").match(/([ABC])[12345][-](\d*)/);
                    if (!!idm) {
                        return (idm[1] === la[i] && idm[2] === ques_num);
                    } else {
                        return false;
                    }
                }).each(function (d) {
                    if (!(d3.select(this).text() === "")) {
                        already_answered = true;
                    }
                })
                if (!already_answered) {
                    d3.selectAll(".question").filter(function (d) {
                        var idm = d3.select(this).attr("id").match(/([ABC])[12345][-](\d*)/);
                        if (!!idm) {
                            return (idm[1] === la[i] && idm[2] === ques_num);
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
            q.text(data.value);
        }
        update_score(tn);
        if (!( qn==="H" || qn==="F")) {
            update_CI(tn,qn);
        }
        d3.selectAll(".active").classed("active",false);
        d3.selectAll('.menu').style('display', 'none'); 
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

get_input_value = function (d3_input_obj) {
    return document.getElementById(d3_input_obj.attr("id")).value;
}

clear = function() {
    d3.selectAll("tr").remove();
    setup();
    d3.select("#uploaded-file-label").text("");
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
    //console.log("updating score: ",tn);
    var q = d3.select("#"+tn+"F-c")
    var cumsum = +q.text();
    //var tn = q.attr("id").match(/([ABC])F[-]\d*/)[1];
    d3.select(q.node().parentNode).selectAll(".question").each(function(d) {
        var self = d3.select(this);
        var qn = self.attr("id").match(/[ABC][AF12345][-](\d*)/)[1];
        var psum = 0;
        var update = false;
        var j;
        for (j = 1; j < 6; j++) {
            var pval = d3.select("#"+tn+j+"-"+qn).text();
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
    //console.log("updating ci: ",tn,qn);
    var csum = 0, isum = 0;
    d3.select(d3.select("#"+tn+qn+"-c").node().parentNode).selectAll(".question").filter(function (d) {
        return +d3.select(this).attr("id").match(/[ABC]\d*[-](\d*)/)[1] < 21;
    }).each(function(d) {
        var val = d3.select(this).text();
        if (val === "20" || val === "30") {
            csum += 1;
        } else if (val === "E" || val === "E-10") {
            isum += 1;
        }
    });
    d3.select("#"+tn+qn+"-c").text(csum);
    d3.select("#"+tn+qn+"-d").text(isum);
}

update_meta = function() {
    //console.log("updating meta");
    var team_list = [];
    d3.selectAll('.team-input').each(function (d,i) {
        var tn = d3.select(this).attr("class").match(/Team([ABC])/)[1];
        team_list.push({
            score: +d3.select("#"+tn+"F-20").text(),
            score2: +d3.select("#"+tn+"F-23").text(),
            t: tn,
            name: get_input_value(d3.select("#"+tn+"H-b").select("input")),
            order: i+1
        });
    });
    team_list.sort(sort_teams);
    var i;
    team_list[0].order = 1;
    for (i = 0 ; i < 2 ; i++) {
        if (team_list[i+1].score === team_list[i].score) {
            team_list[i+1].order = team_list[i].order
        } else {
            team_list[i+1].order = i+1+1;
        }
    }
    d3.selectAll('.team-input').each(function (d,i) {
        var tn = d3.select(this).attr("class").match(/Team([ABC])/)[1];
        d3.select('#M'+tn+'-e').text(team_list[i].score)
            .classed("TeamA",team_list[i].t === "A")
            .classed("TeamB",team_list[i].t === "B")
            .classed("TeamC",team_list[i].t === "C");
        d3.select('#M'+tn+'-d').text(team_list[i].name)
            .classed("TeamA",team_list[i].t === "A")
            .classed("TeamB",team_list[i].t === "B")
            .classed("TeamC",team_list[i].t === "C");
        d3.select('#M'+tn+'-f').text(parse_points(team_list[i].score,team_list[i].order))
            .classed("TeamA",team_list[i].t === "A")
            .classed("TeamB",team_list[i].t === "B")
            .classed("TeamC",team_list[i].t === "C");
    });
}

update_all = function() {
    let tlist = ["","A","B","C"];
    for (let t = tlist.pop(); tlist.length > 0 ; t = tlist.pop()) {
        update_score(t);
        let qlist = ["","1","2","3","4","5"];
        for (let q = qlist.pop(); qlist.length > 0; q = qlist.pop()) {
            update_CI(t,q);
            //console.log(t,q);
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
    d3.selectAll("tr").filter(function (d) {
        return !d3.select(this).classed("menu-row");
    }).each(function (d) {
        let row = []//"";
        d3.select(this).selectAll('td').each(function (d,i) {
            let inp = d3.select(this).selectAll("input");
            if (inp.size() === 0) {
                row.push(d3.select(this).text());// = row + d3.select(this).text() + ",";
            } else {
                row.push(get_input_value(inp));// = row + get_input_value(inp) + ",";
            }
        });
        res.push(row.join(",") + "\n");//row.slice(0,-1)+"\n");
    });
    let blob = new Blob(res, {type: "text/plaintext;charset=utf-8"});
    saveAs(blob, get_input_value(d3.select("#input-MH-b"))+"-"+padl(get_input_value(d3.select("#input-MC-b")),"0",3)+"."+ext);
}

load_file = function(input) {
    let file = input.files[0];
    //console.log(file.name.split('').reverse().join(''));
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
        d3.selectAll("tr").filter(function (d) {
            return !d3.select(this).classed("menu-row");
        }).each(function (d,i) {
            //console.log(i);
            //console.log(rows[i]);
            let row = rows[i].split(',');
            d3.select(this).selectAll('td').each(function (d,j) {
                let inp = d3.select(this).selectAll("input");
                if (inp.size() === 0) {
                    d3.select(this).text(row[j]);
                } else {
                    document.getElementById(inp.attr("id")).value = row[j];
                }
            });
        });
    };

    clear();
    reader.readAsText(file);
    d3.select("#uploaded-file-label").text("From File: "+file.name);
    document.getElementById("upload-input").value = '';
    setTimeout(function(){ 
        update_all();
    }, 1000); // ugly, but functional
}

d3.select("#clear-button").on("click", function (d) {
    if (confirm("Are you sure you want to clear this form?")) {
        clear();
    } else {}
});
d3.select("#update-button").on("click", d => update_all());
d3.select("#render1-button").on("click", d => render('dat'));
d3.select("#upload-button").on("click", d => document.getElementById("upload-input").click());
d3.select("#upload-input").on("change", function (d) { load_file(this); });
setup();