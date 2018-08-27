/*
The following experiment uses jsPsych to display a sequence of stimuli spread over a number of blocks.
It is based on the study by Gilbert and combines elements from both Experiment 1 and 2.

The experiment has only been tested with recent versions of Chrome.
*/


/* create timeline */
var timeline = [];


function saveData() {
    var timeStamp = Math.floor(Date.now());
    jsPsych.data.get().localSave('csv', 'colourSearch' + timeStamp + '.csv');

}

// https://github.com/jspsych/jsPsych/issues/193
var generateString = function() {
    'use strict';
    var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    digits = jsPsych.randomization.shuffle(digits);
    var digitSpan = digits.slice(0, 5);
    return digitSpan.join(' ');
};


/*
    Mutate the string by permuting position or changing integer
*/
var mutateString = function(digitSpan, mutationProb,randomNumber) {
    'use strict';
    if (randomNumber < mutationProb) {

        console.log(digitSpan + ' mutated ' + randomNumber);
        var n = [1, 2, 2, 3, 3];
        var edits = ['m', 'm', 'p_left', 'p_right'];
        n = jsPsych.randomization.shuffle(n);
        edits = jsPsych.randomization.shuffle(edits);
        edits = edits.slice(0, n[0]);

        var s = digitSpan.split(' ');

        var positions = [...Array(s.length).keys()];

        positions = jsPsych.randomization.shuffle(positions);
        positions = positions.slice(0, n[0]);

        var i = 0;
        var edit, p, e, tmp;

        for (e in edits) {
            edit = edits[e];
            p = positions[i];
            i = i + 1;
            switch (edit) {
                case 'm':
                    s[p] = Math.round(Math.random() * (9 - 0));
                    break;

                case 'p_left':
                    tmp = s[p];
                    if (p > 0) {
                        s[p] = s[p - 1];
                        s[p - 1] = tmp;
                    } else {
                        s[p] = s[s.length - 1];
                        s[s.length - 1] = tmp;
                    }
                    break;

                case 'p_right':
                    tmp = s[p];
                    if (p < (s.length - 1)) {
                        s[p] = s[p + 1];
                        s[p + 1] = tmp;
                    } else {
                        s[p] = s[0];
                        s[0] = tmp;
                    }

                    break;
            }

        }

        digitSpan = s.join(' ');

    }
    else {
        console.log(digitSpan + ' same');
    }
    

    return digitSpan;
};

var generateDigitspans = function(nTrials) {
    'use strict';
    var testStimuli = [];
    var item = generateString();
    var m = new MersenneTwister();
    var formatItem = '<div class="verbalStim">' + item + '</div>';
    testStimuli.push({ verbalStimulus: formatItem });
    for (var i = 1; i < nTrials; i++) {        
        
        var randomNumber = m.random();

        item = mutateString(item, 0.5,randomNumber);
        formatItem = '<div class="verbalStim">' + item + '</div>';
        testStimuli.push({ verbalStimulus: formatItem });
    }

    return testStimuli;
};


/*
Generate the stimuli for the experiment. Manually adjust the first trials of the block
to remove the response prompt.
*/

var generateCombinations = function() {
    var test_stimuli = [];
    var colorCombo = [
        { t: 'A', distractor: 'B' },
        { t: 'A', distractor: 'C' },
        { t: 'A', distractor: 'D' },
        { t: 'B', distractor: 'A' },
        { t: 'B', distractor: 'C' },
        { t: 'B', distractor: 'D' },
        { t: 'C', distractor: 'A' },
        { t: 'C', distractor: 'B' },
        { t: 'C', distractor: 'D' },
        { t: 'D', distractor: 'A' },
        { t: 'D', distractor: 'B' },
        { t: 'D', distractor: 'C' },
    ];
    var positions = [...Array(12).keys()];
    var ctr = 0;
    for (let i in colorCombo) {
        var color = colorCombo[i];
        positions = jsPsych.randomization.shuffle(positions);
        for (let j in positions) {
            var p = positions[j];
            var stimData = {
                test_part: 'visualSearch',
                target: color.t,
                position: p,
                distractor: color.distractor
            };
            test_stimuli.push({
                stimulus: generateCircle(color.t, color.distractor, p),
                data: stimData
            });
            ctr = ctr + 1;
        }
    }
    test_stimuli = jsPsych.randomization.shuffle(test_stimuli);

    // Add verbal interference items (note fixed order)
    var verbal_stimuli = generateDigitspans(12 * 12);
    for (t in test_stimuli) {
        var same = false;
        var v = verbal_stimuli[t].verbalStimulus;
        if (t > 0 && v == verbal_stimuli[t - 1].verbalStimulus) {
            var same = true;
        }

        test_stimuli[t]['verbalStimulus'] = v;
        test_stimuli[t]['prompt'] = '<br><p class="prompt">Press <em>Space</em> if item is same.</p>';
        test_stimuli[t]['data']['verbalSame'] = same;
    }

    // For the first item of the block, omit the digit span prompt
    test_stimuli[0].prompt = '';
    test_stimuli[5].prompt = '';


    return test_stimuli;
};




var generateCircle = function(colorTarget, colorDistractor, targetPosition) {

    var s = Snap(190, 190);
    s.attr({ id: 'circle', class: 'svg' });
    var coordsX = [145, 59, 102, 15, 0, 0, 15, 59, 102, 164, 164, 145];
    var coordsY = [15, 1, 1, 15, 59, 102, 145, 164, 164, 59, 102, 145];

    var rects = [];
    var rectSize = 30;

    for (let x in coordsX) {
        var color = colorDistractor;
        if (targetPosition == x) {
            color = colorTarget;
        }
        var r = s.rect(coordsX[x], coordsY[x], rectSize, rectSize)
            .addClass('munsell' + color);

        rects.push(r);
    }
    var stim = '<div style="height: 190px; id="svg-container">' + s.toString() + '</div>';

    var elem = document.getElementById("circle")
    elem.remove();
    return stim;
};

/* Get 4 practice stimuli */
var practice_stimuli = generateCombinations();
practice_stimuli = practice_stimuli.slice(0, 4, 1);
var test_stimuli = generateCombinations();

// TRIALS
// https://groups.google.com/forum/#!topic/jspsych/G-AylIr7e0E
var verbal_seed = {
    type: 'html-keyboard-response',
    stimulus: generateString(),
}


var verbal = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('verbalStimulus'),
    trial_duration: 3000,
    response_ends_trial: false,
    choices: jsPsych.ALL_KEYS,
    on_finish: function(data) {
        if (data.key_press) {
            console.log(data.key_press);
        }
        
    },
    data: {test_part: 'verbal'},
    prompt: jsPsych.timelineVariable('prompt')
}



var test = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    prompt: "<br><p class='prompt'>Target left (f) or right (j)?</p>",
    data: jsPsych.timelineVariable('data')
}


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
}



// INSTRUCTION BLOCKS
var instructions = {
    type: 'instructions',
    pages: [
        'Welcome to the experiment. ',
        'Use your left and right index fingers to press the f or j key.<br> Use either thumb to press the space bar.<br>',
        'Here is a picture of what you will do: <img src="img/1.png"></img>',
        'Click next to begin.',
    ],
    show_clickable_nav: true
};

var feedbackBlock = {
    type: "html-keyboard-response",
    stimulus: "<p><b>Break</b></p>" +
        "<p>This concludes the practice session.</p>" +
        "<p>If you have any further questions, please ask the experiment leader.</p>" +
        "<p>Remember, try to indicate the side of the coloured square as quickly as possible!<br><br></p>" +
        "<p>When you are ready, proceed to the experiment by pressing the Space bar.</p>",
    timing_post_trial: 2000

}


var blockPause = {
    type: "html-keyboard-response",
    stimulus: "<p><b>Break</b></p>" +
        "<p>Please take a break for a minute or two.</p>" +
        "<p>When you are ready, you can continue with the experiment by pressing the Space bar.</p>",
    timing_post_trial: 2000
};

var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function() {
        return "<p>Thank you. This completes the colour experiment.</p>";
    }
};

// TEST AND PRACTIC BLOCKS
/* A short practice block with easy items */
/* Randomizations performed in generating the stimuli, so randomize_order = false */
var practiceblock = {
    timeline: [verbal, fixation, test],
    timeline_variables: practice_stimuli,
    randomize_order: false,
    repetitions: 1

};


/* The experiment is split into separate blocks giving participants a break after 10 minutes */
/* Additional blocks will need to be added once all stimuli are decided */
var testblock_1 = {
    timeline: [verbal, fixation, test],
    timeline_variables: test_stimuli.slice(0, 4, 1),
    randomize_order: false,
    repetitions: 1
};

var testblock_2 = {
    timeline: [verbal, fixation, test],
    timeline_variables: test_stimuli.slice(5, 9, 1),
    randomize_order: false,
    repetitions: 1
};

var testblock_3 = {
    timeline: [verbal, fixation, test],
    timeline_variables: test_stimuli.slice(5, 9, 1),
    randomize_order: false,
    repetitions: 1
};


var testblock_4 = {
    timeline: [verbal, fixation, test],
    timeline_variables: test_stimuli.slice(5, 9, 1),
    randomize_order: false,
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

var experiment_procedure = {
    timeline: [fullscreenON,instructions, practiceblock, feedbackBlock, 
    testblock_1, blockPause, testblock_2, fullscreenOFF,debrief_block]
};

timeline.push(experiment_procedure);

/* start the experiment */
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        // The following line is for testing purposes only...
        // jsPsych.data.displayData();
        saveData();
        console.log('Experiment finished.');

    }
});