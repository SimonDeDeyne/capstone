var el = document.getElementById('sketchpad');
var pad = new Sketchpad(el);

// Anonymous self invoking function
(function () {
  initialize();
})();

// setLineColor
function setLineColor(e) {
    var color = e.target.value;
    if (!color.startsWith('#')) {
        color = '#' + color;
    }
    pad.setLineColor(color);
}

function initialize(){
  sessionStorage.ctr = 0;
  updateCue();
}


function countDown(){
  var timeleft = 0;
  var downloadTimer = setInterval(function(){
    //document.getElementById("countdown").innerHTML = 40 - --timeleft;
    document.getElementById("countdown").innerHTML = 40 + --timeleft;
    if(timeleft <= -40)
      clearInterval(downloadTimer);
  },1000); 
}


function updateCue(){

  var cues = ['dog','cat','telephone','mermaid'];
  sessionStorage.ctr = parseInt(sessionStorage.ctr) + 1;

  // add a cue word
  var cue = document.getElementById('cue')
  cue.innerHTML = cues[parseInt(sessionStorage.ctr)];
  countDown();
}

//document.getElementById('line-color-input').oninput = setLineColor;

// setLineSize
function setLineSize(e) {
    var size = e.target.value;
    pad.setLineSize(size);
}
//document.getElementById('line-size-input').oninput = setLineSize;

// undo
function undo() {
    pad.undo();
}
document.getElementById('undo').onclick = undo;

// redo
function redo() {
    pad.redo();
}
document.getElementById('redo').onclick = redo;

// clear
function clear() {
    pad.clear();
}
document.getElementById('clear').onclick = clear;



document.getElementById('done').onclick = function (){
  createSVG(pad.strokes);
  clear();
  updateCue();
};


// resize
window.onresize = function (e) {
  pad.resize(el.offsetWidth);
}


function createSVG(strokes){
  var h = pad.canvas.height;
  var w = pad.canvas.width;

  // get the cue
  var cue = document.getElementById('cue').innerHTML;

  // initialize SVG.js
  var draw = SVG('drawing').size(h,w).id('cow');
  draw.hide();      

  var path = '';
  var RT = 0;
  for (s in strokes) {
      var points = strokes[s].points;
      RT = strokes[s].RT;
      for (p in points) {

        // start of path
        if(p == 0){
          path = path + 'M' + points[p].x * w + ' ' + points[p].y * h;
        }

        path = path + 'L' + points[p].x * w + ' ' + points[p].y * h;
        
      }
    draw.path(path)
        .fill('none')
        .stroke({ color: '#f06', width: 3, linecap: 'round', linejoin: 'miter', miterlimit: '10'})
        .data('RT', RT);
    //rect.data('key', { value: { data: 0.3 }})

    // add data-RT to path (see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/data-*)
    
  }
  
  //console.log(draw.svg());
  var blob = new Blob([draw.svg()], {type: "text/plain;charset=utf-8"});
  saveAs(blob, cue + ".svg");

}




// save the figure
//var z = pad.toJSON();

