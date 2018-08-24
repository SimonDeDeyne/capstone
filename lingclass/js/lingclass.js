/*
Stimuli can be obtained from https://crl.ucsd.edu/experiments/ipnp/
https://www.bcbl.eu/databases/multipic

% some ideas for the sketch project: http://cybertron.cg.tu-berlin.de/eitz/projects/classifysketch/


*/

var timeline = [];
/*
var categorization_trial = {
    type: 'categorize-html',
    stimulus: '<div><img src="img/obj045bird.gif"><img src="img/obj045bird.gif"></div><br><img src="img/obj045bird.gif">',
    text_answer: 'letter',
      choices: ['f', 'j'],
    correct_text: "",
    incorrect_text: "",
    show_stim_with_feedback: false,
    prompt: "<p>Which item is most related left (press f) or right (press j).</p>"
};
*/
var instructions = {
    type: 'instructions',
    pages: [
        'Welcome to the experiment.<br> Here are the instructions',
        'Here\'s an example ',
        'Click next to begin.',
    ],
    show_clickable_nav: true
}

/*
var twoAFC_trial = {
    type: 'vistriad',
    stimulus: {cue: './img/1.png', targetA: './img/2.png', targetB: './img/3.png'}

}*/

var test_stimuli = [
    {stimulus: {cue: './img/1.png', targetA: './img/2.png', targetB: './img/3.png'},verbalStimulus: '2 3 4 5 6',prompt: ''},
    {stimulus: {cue: './img/2.png', targetA: './img/4.png', targetB: './img/3.png'},verbalStimulus: '2 3 4 5 6',prompt: "<br><p class='prompt'>Press <em>Space</em> if item is same.</p>"},
    {stimulus: {cue: './img/3.png', targetA: './img/1.png', targetB: './img/5.png'},verbalStimulus: '2 3 4 5 6',prompt: "<br><p class='prompt'>Press <em>Space</em> if item is same.</p>"}
];


/*var digit_stimuli = [
    {verbalStimulus: '2 3 4 5 6'},
    {verbalStimulus: '2 3 5 4 6'},
    {verbalStimulus: '2 3 4 5 6'},
];
*///, digitSpan: '2 3 4 5 6'


var test = {
    type: 'vistriad',
    stimulus: jsPsych.timelineVariable('stimulus'),
    data: jsPsych.timelineVariable('data')
}

var verbal = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('verbalStimulus'),
    trial_duration: 2000,
    response_ends_trial: false,
    choices: 32,
    prompt: jsPsych.timelineVariable('prompt')
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
          '</div>',
        ].join(''),
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    trial_duration: function() {
        return jsPsych.randomization.sampleWithoutReplacement([750, 1000, 1250], 1)[0];
    },
    //prompt: "<br><p class='prompt'></p>",
    prompt: '',
    data: { test_part: 'fixation' }
};

var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function() {
        return "<p>Good job! You deserve a one minute break.</p>";
    }
};


var debrief_experiment = {
    type: "html-keyboard-response",
    stimulus: function() {
        return "<p>Thank you, I will now buy you a beer / coffee / kitten.</p>";
    }
};



var block_1 = {
    timeline: [verbal, fixation, test],
    //timeline_variables: test_stimuli.slice(0, 4, 1),
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 1
}


var block_2 = {
    timeline: [fixation, test],
    //timeline_variables: test_stimuli.slice(0, 4, 1),
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 1
}



timeline.push(block_1,debrief_block,block_2,debrief_experiment);



jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
// show the images