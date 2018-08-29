/*
Experiment on lexical processing effects of visually presented words in English or Mandarin.

https://groups.google.com/forum/#!topic/jspsych/tECOqs3pWHo
Too fast responses: This feature isn't built into any particular plugin yet, 
but you assemble a pair of trials to make it work. 
I would use the html-keyboard-response plugin. 
Create two trials with identical stimulus parameters. 
The first trial should have choices: jsPsych.NO_KEYS and trial_duration: <minimum_time>. 
The second trial should have the desired keyboard responses. 
From the perspective of the subject, this will appear to be a single screen.


*/


var instructions = {
    type: 'instructions',
    pages: [
        'Welcome to the experiment.<br> Here are the instructions',
        'Here\'s an example ',
        'Click next to begin.'
    ],
    show_clickable_nav: true
};


// Counterbalance position of A and B
function counterBalanceStimuli(stimuli) {
    'use strict';
    var m = new MersenneTwister();
    var tmp = '';

    for (s in stimuli) {
        console.log(stimuli[s].stimulus.targetA);

        if (m.random() > 0.5) {
            tmp = stimuli[s].stimulus.targetA;
            stimuli[s].stimulus.targetA = stimuli[s].stimulus.targetB;
            stimuli[s].stimulus.targetB = tmp;
        }
    }
    return stimuli;
}



function saveData() {
    var timeStamp = Math.floor(Date.now());
    jsPsych.data.get().localSave('csv', 'lingclass' + timeStamp + '.csv');

}

var fixation = {
    type: 'html-keyboard-response',
    stimulus: [
        '<div class="content">',
        '<div class="row">',
        '<div class="cell" id="targetA">',
        '</div>',
        '<div class="cell" id="targetB">',
        '</div>',
        '</div>',
        '<div class="row">',
        '<div class="cell" id="cue"><p>+</p></div>',
        '</div>',
        '</div>'
    ].join(''),
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    trial_duration: function() {
        return jsPsych.randomization.sampleWithoutReplacement([750, 1000, 1250], 1)[0];
    },
    prompt: '',
    data: { test_part: 'fixation' }
};

var test = {
    type: 'vistriad',
    stimulus: jsPsych.timelineVariable('stimulus'),
    data: jsPsych.timelineVariable('data'),
    post_trial_gap: 500,
    cue_duration: 500,
    left_key: jsPsych.NO_KEYS,
    right_key:jsPsych.NO_KEYS,
};


var response = {
    type: 'vistriad',
    stimulus: jsPsych.timelineVariable('stimulus'),
    data: jsPsych.timelineVariable('data'),
    show_targets: true,
    post_trial_gap: 1500
};


var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function() {
        return "<p>Good job! You deserve a one minute break.</p><br>" +
            "<p>Press any key to proceed</p>";
    }
};


var debrief_experiment = {
    type: "html-keyboard-response",
    stimulus: function() {
        return "<p>Thank you, I will now buy you a beer / coffee / kitten.</p>";
    }
};


// Experiment blocks: note randomization is done in the stimulus generation phase
var block_1 = {
    timeline: [fixation, test, response],
    timeline_variables: test_stimuli.slice(0, 4, 1),
    //timeline_variables: test_stimuli,
    data: { test_part: 'vistriad' },
    randomize_order: false,
    repetitions: 1
};


var block_2 = {
    timeline: [fixation, test, response],
    //timeline_variables: test_stimuli.slice(0, 4, 1),
    timeline_variables: test_stimuli.slice(5, 10, 1),
    randomize_order: false,
    data: { test_part: 'vistriad' },
    repetitions: 1
};

var fullscreenON ={
    type: 'fullscreen',
    full_screen_mode: true
};

var fullscreenOFF ={
    type: 'fullscreen',
    full_screen_mode: false,
    message: '<p>You will now exit full screen mode'
};


var timeline = [];

timeline.push(block_1,debrief_block,block_2);
//timeline.push(fullscreenON,instructions, block_1, debrief_block, block_2, fullscreenOFF,debrief_experiment);


jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        saveData();
        console.log('Experiment finished.');

    },
    default_iti: 1000
});
