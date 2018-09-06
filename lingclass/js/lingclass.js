/*
Experiment on lexical processing effects of visually presented words in English or Mandarin.

*/



var instructions = {
    type: 'instructions',
    pages: [
        '<h3>Welcome to the experiment.</h3>' +
        '<p>In this experiment an image will appear in the middle of the screen followed by two other images above it.</p>' +
        '<img src="img/example.png" width=250px></img>' +
        '<p>Press <em>f</em> if the image left of the bottom image is more related or press <em>j</em> if the image on the right is more related.</p>' +
        '<p>Some combinations are harder than others, but follow your intuition and try to respond as quickly as possible.</p>',
        '<p>This experiment will take approximately 10 minutes.</p><p>Click next to begin.</p>'
    ],
    show_clickable_nav: true
};


// Counterbalance position of A and B
function counterBalanceStimuli(stimuli) {
    'use strict';
    var m = new MersenneTwister();
    var tmp = '';
    var s;

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

// Adapt for testing
var send_debrief = function() {
    if (typeof _record_task_complete == 'undefined') {
        window.location.href = "debriefing.html";
    } else {
        if (_record_task_complete) {
            //window.location.href ="/debrief";
            window.location.href = "debriefing.html";
        } else {
            window.setTimeout(send_debrief, 1000);
        }
    }
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
    right_key: jsPsych.NO_KEYS,
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
    randomize_order: true,
    repetitions: 1,
};


var block_2 = {
    timeline: [fixation, test, response],
    //timeline_variables: test_stimuli.slice(0, 4, 1),
    timeline_variables: test_stimuli.slice(5, 10, 1),
    randomize_order: true,
    data: { test_part: 'vistriad' },
    repetitions: 1
};

var fullscreenON = {
    type: 'fullscreen',
    full_screen_mode: true
};

var fullscreenOFF = {
    type: 'fullscreen',
    full_screen_mode: false,
    message: '<p>You will now exit full screen mode'
};


var timeline = [];

timeline.push(instructions, block_1, debrief_block, block_2);
//timeline.push(fullscreenON,instructions, block_1, debrief_block, block_2, fullscreenOFF,debrief_experiment);

test_stimuli = jsPsych.randomization.shuffle(test_stimuli);
test_stimuli = counterBalanceStimuli(test_stimuli);


jsPsych.init({
    show_progress_bar: true,
    timeline: timeline,
    display_element: 'jspsych-target',
    on_finish: function() {
        saveData();

        var all_data = jsPsych.data.get().json();
        _send_task_data(all_data);
        console.log('Experiment finished.');
        send_debrief();

    },
    default_iti: 1000
});