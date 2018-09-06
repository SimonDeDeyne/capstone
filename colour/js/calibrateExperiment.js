/* create timeline */
var timeline = [];


var trial = {
    type: 'html-keyboard-response',
    stimulus: '<p style="font-size: 48px;">+</p>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
};


 /* test trials */
var test_stimuli = [
  { stimulus: '<div style="height: 50px;"><svg width="40" height="40" id="circle" class="svg"><rect x="0" y="0" width="40" height="40" class="munsellA"></rect></svg></div>'},
  { stimulus: '<div style="height: 50px;"><svg width="40" height="40" id="circle" class="svg"><rect x="0" y="0" width="40" height="40" class="munsellB"></rect></svg></div>'},
  { stimulus: '<div style="height: 50px;"><svg width="40" height="40" id="circle" class="svg"><rect x="0" y="0" width="40" height="40" class="munsellC"></rect></svg></div>'},
  { stimulus: '<div style="height: 50px;"><svg width="40" height="40" id="circle" class="svg"><rect x="0" y="0" width="40" height="40" class="munsellD"></rect></svg></div>'}

];

var testA = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    prompt: "<p>Indicate orange (f) or brown (j).</p>"
}

var testB = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    prompt: "<p>Indicate brown (f) or orange (j).</p>"
}


var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:40px; height: 50px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
  prompt: ""
}


/* define welcome message trial */
var welcome = {
  type: "html-keyboard-response",
  stimulus: "Welcome to the experiment. Press any key to begin."
};



if(Math.random() > 0.5){
  var test_procedure = {
    timeline: [fixation, testA],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 2
  }
}
else {
  var test_procedure = {
    timeline: [fixation, testB],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 2
  }

}




timeline = [welcome,test_procedure,debrief_block];

var debrief_block = {
  type: "html-keyboard-response",
  stimulus: function() {
    return "<p>Thank you. This completes the color calibration phase.</p>";

  }
};
timeline.push(debrief_block);


/* start the experiment */
jsPsych.init({
  timeline: timeline,
on_finish: function() {
    jsPsych.data.displayData();
  }      
});

