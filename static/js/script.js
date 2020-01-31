// Set up table

var table = d3.select("#table-cont");

var data_questions = [{},{},{},{},
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
                  {Q:"16A",visible:false},
                  {Q:"16B",visible:false},
                  {Q:"17",visible:true},
                  {Q:"17A",visible:false},
                  {Q:"17B",visible:false},
                  {Q:"18",visible:true},
                  {Q:"18A",visible:false},
                  {Q:"18B",visible:false},
                  {Q:"19",visible:true},
                  {Q:"19A",visible:false},
                  {Q:"19B",visible:false},
                  {Q:"20",visible:true},
                  {Q:"20A",visible:false},
                  {Q:"20B",visible:false},
                  {Q:"21",visible:false},
                  {Q:"21A",visible:false},
                  {Q:"21B",visible:false},
                  {Q:"22",visible:false},
                  {Q:"22A",visible:false},
                  {Q:"22B",visible:false},
                  {Q:"23",visible:false},
                  {Q:"23A",visible:false},
                  {Q:"23B",visible:false}];

var teams = ["A","B","C"];
var t,i,r,j;
for (i = 0; i < 3; i++) {
    t = teams[i];
    r = table.append("tr")
            .classed("Team"+t,true)
            .classed("bracket-header",true);
    r.append("td").classed("Team"+t,true)
        .text("Team "+t).attr("rowspan","7")
        .attr("id",t+"H-a")
        .classed("rotate",true)
        .classed("bar",true);
    r.append("td").classed("Team"+t,true)
        .text("Name")
        .attr("id",t+"H-b")
        .classed("bar",true);
    r.append("td").classed("Team"+t,true)
        .text("C")
        .attr("id",t+"H-c")
        .classed("bar",true);
    r.append("td").classed("Team"+t,true)
        .text("I")
        .attr("id",t+"H-d")
        .classed("bar",true);
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
            .text("Quizzer "+j)
            .attr("id",t+j+"-b")
            .classed("bar",true);
        r.append("td").classed("Team"+t,true)
            .text("0")
            .attr("id",t+j+"-c")
            .classed("bar",true);
        r.append("td").classed("Team"+t,true)
            .text("0")
            .attr("id",t+j+"-d")
            .classed("bar",true);
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
        .text("total")
        .attr("id",t+"F-b")
        .attr("colspan","3")
        .classed("bar",true);
    r.selectAll("td").data(data_questions).enter()
        .append("td").classed("Team"+t,true)
        .attr("id", d => t+"F-"+d.Q)
        .classed("question",true)
        .style("display", d => d.visible ? "" : "none");
};


for (i = 4; i < 42; i++) {  
    t = data_questions[i].Q
    d3.selectAll("td").filter('[id$="-'+t+'"]')
            .each(function(d) {
                var oldclass = d3.select(this).attr("class");
                d3.select(this).attr("class", oldclass + " Que-" + t);
            });
};
for (i = 1; i < 6; i++) {  
    d3.selectAll("td").filter('[id*="'+i+'-"]')
            .each(function(d) {
                var oldclass = d3.select(this).attr("class");
                d3.select(this).attr("class", oldclass + " Qui-" + i);
            });
};

var cval;
d3.selectAll("td").on('click',function(d) {
    cval = d3.select(this).classed("greyout");
    t = d3.select(this).attr("id").substring(0,1);
    d3.selectAll(".Team"+t).classed("greyout",!cval);
});