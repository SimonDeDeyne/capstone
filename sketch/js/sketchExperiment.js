// see http://paperjs.org/tutorials/getting-started/using-javascript-directly/
// Anonymous self invoking function
(function() {
    initialize();
})();


// Write to an svg file with name = cue + timestamp
function saveData(data) {
    var timeStamp = Math.floor(Date.now());
    // get the cue
    var cue = document.getElementById('cue').innerHTML;    
    var fileContent = new Blob([data], { type: "text/plain;charset=utf-8" });
    saveAs(fileContent, cue + '.' +  timeStamp + ".svg");
}


function initialize() {
    sessionStorage.ctr = 0;
    updateCue();
}


function countDown() {
    var timeleft = 0;
    var downloadTimer = setInterval(function() {
        document.getElementById("countdown").innerHTML = 50 + --timeleft;
        if (timeleft <= -50)
            clearInterval(downloadTimer);
    }, 1000);
}


function updateCue() {

    var cues = ['dog', 'cat', 'telephone', 'dolphin', 'mermaid'];
    sessionStorage.ctr = parseInt(sessionStorage.ctr) + 1;

    // add a cue word
    var cue = document.getElementById('cue')
    cue.innerHTML = cues[parseInt(sessionStorage.ctr)];
    countDown();
}


// Only executed our code once the DOM is ready.
window.onload = function() {


   paper.setup('sketchpad');
   with (paper) {
   

    var tool = new Tool();

    // Show debug info on simplified paths
/*    var textItem = new PointText({
        content: 'Click and drag to draw a line.',
        point: new paper.Point(20, 30),
        fillColor: 'black',
    });
*/

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function(event) {
        var RT = event.timeStamp;
        path = new Path();
        path.data.RT = RT;
        path.strokeColor = 'black';
        path.add(event.point);
        path.strokeWidth = 3;
        path.strokeCap = 'round';
        path.strokeJoin = 'round';
    }

    tool.onMouseDrag = function(event) {
        path.add(event.point);
    }



    // When the mouse is released, we simplify the path:
    tool.onMouseUp = function(event) {
        var RT2 = event.timeStamp;
        //console.log(path.getData().RT);
        path.data.RT = [path.data.RT, RT2];
        console.log(path.getData().RT);
        var segmentCount = path.segments.length;

        // When the mouse is released, simplify it:
        path.simplify(1);

        // Select the path, so we can see its segments:
        path.fullySelected = false;

        var newSegmentCount = path.segments.length;
        var difference = segmentCount - newSegmentCount;
        var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
        
        // textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';

    }


    function sketchDone() {
        console.log('done');
        var mysvg = project.exportSVG({asString:true});
        saveData(mysvg);
        project.clear();
        updateCue();
    }


    document.getElementById('done').onclick = sketchDone;

    // undo
    function undo() {
        console.log('undo');
        path.removeSegment(0);
    }

    document.getElementById('undo').onclick = undo;



    // clear
    function clear() {
        console.log('clear');
        project.clear();
    }

    document.getElementById('clear').onclick = clear;

    }
}
