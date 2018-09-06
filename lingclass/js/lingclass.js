/*
Experiment on lexical processing effects of visually presented words in English or Mandarin.

*/


var condition  = sessionStorage.condition;
var instructionsTxt = '';
switch (condition) {
    case 'wordsEN':
        instructionsTxt = instructionsWordsEN;
        break;
    case 'picturesEN':
        instructionsTxt = instructionsPicturesEN;
        break;
    case 'wordsZH':
        instructionsTxt = instructionsWordsZH;
        break;
    case 'picturesZH':
        instructionsTxt = instructionsPicturesZH;
        break;
}

var instructions = {
    type: 'instructions',
    pages: instructionsTxt,    
    show_clickable_nav: true,
    button_label_next: instructionsNext,
    button_label_previous: instructionsPrevious,
};


// Counterbalance position of A and B
function counterBalanceStimuli(stimuli) {
    'use strict';
    var m = new MersenneTwister();
    var tmp = '';
    var s;

    for (s in stimuli) {
        //console.log(stimuli[s].stimulus.targetA);

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
        window.location.href = "./EN/debriefing.html";
    } else {
        if (_record_task_complete) {
            //window.location.href ="/debrief";
            window.location.href = "./EN/debriefing.html";
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
    post_trial_gap: 200,
    cue_duration: 200,
    left_key: jsPsych.NO_KEYS,
    right_key: jsPsych.NO_KEYS,
};


var response = {
    type: 'vistriad',
    stimulus: jsPsych.timelineVariable('stimulus'),
    data: jsPsych.timelineVariable('data'),    
    data: { test_part: 'response' },
    on_start: function(trial) { $( "#jspsych-target" ).focus(); },
    show_targets: true,
    post_trial_gap: 1000
};


var block_break = {
    type: "html-keyboard-response",
    stimulus: function() {
        return "<p>Take a short break.</p><br>" +
            "<p>Press any key to proceed</p>";
    }
};



test_stimuli = jsPsych.randomization.shuffle(test_stimuli);
test_stimuli = counterBalanceStimuli(test_stimuli);


// Experiment blocks: note randomization is done in the stimulus generation phase
var block_1 = {
    timeline: [fixation, test, response],
    timeline_variables: test_stimuli.slice(0, 29),
    randomize_order: false,
    repetitions: 1,
};


var block_2 = {
    timeline: [fixation, test, response],
    timeline_variables: test_stimuli.slice(29, 58),
    randomize_order: false,
    repetitions: 1,
    data: { block: 2 }
};


var block_3 = {
    timeline: [fixation, test, response],
    timeline_variables: test_stimuli.slice(58, 87),
    randomize_order: false,
    repetitions: 1,
    data: { block: 3 }
};

var block_4 = {
    timeline: [fixation, test, response],
    timeline_variables: test_stimuli.slice(87, 116),
    randomize_order: false,
    repetitions: 1,
    data: { block: 4 }
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

//timeline.push(instructions, block_1, debrief_block, block_2);
timeline.push(instructions, block_1, block_break, block_2, block_break, block_3, block_break,block_4);
//timeline.push(fullscreenON,instructions, block_1, debrief_block, block_2, fullscreenOFF,debrief_experiment);



jsPsych.init({
    //show_progress_bar: true,
    timeline: timeline,
    display_element: 'jspsych-target',
    preload_images: imageList,
    on_finish: function() {

        jsPsych.data.addProperties({
            userID: sessionStorage.userID,
            uid: sessionStorage.uid,
            age: sessionStorage.age,
            gender: sessionStorage.gender,
            language: sessionStorage.language,
            condition: sessionStorage.condition
        });

        //saveData();


        //var all_data = jsPsych.data.get().csv();
        var all_data = jsPsych.data.get().filter({ test_part: 'response' }).ignore(['internal_node_id', 'trial_type', 'stimulus']).csv();
        _send_task_data(all_data);
        console.log('Experiment finished.');
        send_debrief();

    },
    default_iti: 250
});