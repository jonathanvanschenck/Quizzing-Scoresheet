setup = function() {
    var wind = d3.select(".window");
    var table = d3.select("#table-cont");
    var pmenu = d3.select("#primary-menu");
    var smenu = d3.select("#secondary-menu");
    var spmenu = d3.select("#sp-menu");
    
    var data_startpoints = [{content:"__", value:""},
                           {content:"20", value:"20"}] 
    var data_pmenu = [{content:"__", value:""},
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
        d3.event.preventDefault();
    });
    
    d3.selectAll('.menu-option').on("click", function(data, index) {
        var q = d3.select('.active');
        q.text(data.value);
        update_score(q.attr("id").match("([ABC])[AF12345][-]\d*")[1]);
        d3.selectAll(".active").classed("active",false);
        d3.selectAll('.menu').style('display', 'none'); 
    });
    
    
    update_footer = function(element) {
        q = d3.select(element);
        console.log(q);
    }

    update_score("A");
    update_score("B");
    update_score("C");
}

clear = function() {
    console.log("cleared");
    d3.selectAll("tr").remove();
    setup();
};

parse_score = function (score) {
    var sc = score.match(/[A-z]*([-]{0,1}\d*)/)[1];
    if (sc === "") {
        return 0;
    } else {
        return +sc;
    }
};

update_score = function(tn) {
    var q = d3.select("#"+tn+"F-c")
    var cumsum = +q.text();
    //var tn = q.attr("id").match(/([ABC])F[-]\d*/)[1];
    d3.select(q.node().parentNode).selectAll(".question").each(function(d) {
        var self = d3.select(this);
        var qn = self.attr("id").match(/[A-Z]{2}[-](\d*)/)[1];
        var psum = 0;
        var j;
        for (j = 1; j < 6; j++) {
            psum += parse_score(d3.select("#"+tn+j+"-"+qn).text());
        };
        cumsum += psum
        if (!(psum === 0) || qn === "20") {
            self.text(cumsum);
        }
    });
}

setup();