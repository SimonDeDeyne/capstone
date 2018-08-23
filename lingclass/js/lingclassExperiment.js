/*
Stimuli can be obtained from https://crl.ucsd.edu/experiments/ipnp/
https://www.bcbl.eu/databases/multipic

% some ideas for the sketch project: http://cybertron.cg.tu-berlin.de/eitz/projects/classifysketch/


*/

var timeline = [];

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

var welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};


var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div class="fixation">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    trial_duration: function() {
        return jsPsych.randomization.sampleWithoutReplacement([750, 1000, 1250], 1)[0];
    },
    prompt: "<br><p class='prompt'></p>",
    data: { test_part: 'fixation' }
};

var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function() {
        return "<p>Thank you. This completes this image match experiment.</p>";
    }
};




timeline.push(welcome,fixation,categorization_trial,debrief_block);



jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
// show the images