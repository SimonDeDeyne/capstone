/*
Experiment on lexical processing effects of visually presented words in English or Mandarin.
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



var test_stimuli = [{
        stimulus: { cue: './img/1.png', targetA: './img/2.png', targetB: './img/3.png' },
        verbalStimulus: '2 3 4 5 6',
        prompt: '',
        data: { test_part: 'vistriad' }
    },
    {
        stimulus: { cue: './img/2.png', targetA: './img/4.png', targetB: './img/3.png' },
        verbalStimulus: '2 3 4 5 6',
        prompt: "<br><p class='prompt'>Press <em>Space</em> if item is same.</p>",
        data: { test_part: 'vistriad' }
    },
    {
        stimulus: { cue: './img/3.png', targetA: './img/1.png', targetB: './img/5.png' },
        verbalStimulus: '2 3 4 5 6',
        prompt: "<br><p class='prompt'>Press <em>Space</em> if item is same.</p>",
        data: { test_part: 'vistriad' }
    }
];


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

var test = {
    type: 'vistriad',
    stimulus: jsPsych.timelineVariable('stimulus'),
    data: jsPsych.timelineVariable('data')
};

var verbal = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('verbalStimulus'),
    trial_duration: 2000,
    response_ends_trial: false,
    choices: jsPsych.ALL_KEYS,
    on_finish: function(data) {
        if (data.key_press) {
            console.log(data.key_press);
        }
        
    },
    data: {test_part: 'verbal'},
    prompt: jsPsych.timelineVariable('prompt')
};


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
    timeline: [verbal, fixation, test],
    //timeline_variables: test_stimuli.slice(0, 4, 1),
    timeline_variables: test_stimuli,
    randomize_order: false,
    repetitions: 1
};


var block_2 = {
    timeline: [fixation, test],
    //timeline_variables: test_stimuli.slice(0, 4, 1),
    timeline_variables: test_stimuli,
    randomize_order: false,
    repetitions: 1
};

var timeline = [];
timeline.push(instructions, block_1, debrief_block, block_2, debrief_experiment);


jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        //jsPsych.data.displayData();
        saveData();
        console.log('Experiment finished.');

    }
});
