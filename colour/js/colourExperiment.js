/*
The following experiment uses jsPsych to display a sequence of stimuli spread over a number of blocks.
It is based on the study by Gilbert and combines elements from both Experiment 1 and 2.

The experiment has only been tested with recent versions of Chrome.
*/


/* create timeline */
var timeline = [];


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
var mutateString = function(digitSpan, mutationProb) {
    'use strict';
    var m = new MersenneTwister();
    var randomNumber = m.random();
    if (randomNumber < mutationProb) {

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
    return digitSpan;
};

var generateDigitspans = function(nTrials) {
    'use strict';
    var testStimuli = [];
    var item = generateString();
    //console.log(item);
    var formatItem = '<div class="verbalStim">' + item + '</div>';
    testStimuli.push({ verbalStimulus: formatItem });
    for (var i = 1; i < nTrials; i++) {
        var item = mutateString(item, 0.5);
        formatItem = '<div class="verbalStim">' + item + '</div>';
        testStimuli.push({ verbalStimulus: formatItem });
    }

    return testStimuli;
};



var generateCombinations = function() {
    var test_stimuli = [];
    //var verbal_stimuli = generateDigitspans(12*12);
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
        test_stimuli[t]['data']['verbalSame'] = same;
    }


    return test_stimuli;
};




var generateCircle = function(colorTarget, colorDistractor, targetPosition) {

    var s = Snap(190, 190);
    s.attr({ id: 'circle', class: 'svg' });
    var coordsX = [145, 59, 102, 15, 0, 0, 15, 59, 102, 164, 164, 145];
    var coordsY = [15, 1, 1, 15, 59, 102, 145, 164, 164, 59, 102, 145];

    /*    console.log(colorTarget);
        console.log(colorDistractor);
    */
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


var test_stimuli = generateCombinations();


/*
var digitSeries = {
    type: 'html-keyboard-response',    
    choices: jsPsych.NO_KEYS,
    trial_duration: 200,
    timeline: [
        {stimulus: '<div class="fixation">1</div>'},
        {stimulus: '<div class="fixation">2</div>'},
        {stimulus: '<div class="fixation">3</div>'},
        {stimulus: '<div class="fixation">4</div>'}
    ],
    prompt: "<br><p class='prompt'></p>"   
}
*/

// https://groups.google.com/forum/#!topic/jspsych/G-AylIr7e0E
var verbal_seed = {
    type: 'html-keyboard-response',
    stimulus: generateString(),
}


var verbal = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('verbalStimulus'),
    trial_duration: 2000,
    response_ends_trial: false,
    choices: 32,
    prompt: "<br><p class='prompt'>Press <em>Space</em> if item is same.</p>"
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


/* define welcome message trial */
var welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};


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


var block_1 = {
    timeline: [verbal, fixation, test],
    timeline_variables: test_stimuli.slice(0, 4, 1),
    randomize_order: true,
    repetitions: 1
}

var block_2 = {
    timeline: [verbal, fixation, test],
    timeline_variables: test_stimuli.slice(5, 9, 1),
    randomize_order: true,
    repetitions: 1
}


var experiment_procedure = {
    timeline: [welcome, block_1, blockPause, block_2, debrief_block]
}

timeline.push(experiment_procedure);

// var zz = jsPsych.data.get().filter({test_part: 'visualSearch'});
// zz.csv() gives you the data
/* start the experiment */
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        jsPsych.data.displayData();
    }
});