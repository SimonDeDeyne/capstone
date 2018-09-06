/*
The following experiment uses jsPsych to display a sequence of stimuli spread over a number of blocks.
It is based on the study by Gilbert and combines elements from both Experiment 1 and 2.
The experiment has only been tested with recent versions of Chrome.

All participants get to do half of the blocks with verbal interference and the other half without
The verbal interference blocks order is randomized in the experiment.(Needs to be fixed)

Change task so digits appear one by one at a rate of 1 sec per digit
*/


/* create timeline */
var timeline = [];


function saveData() {
    'use strict';
    var timeStamp = Math.floor(Date.now());
    jsPsych.data.get().localSave('csv', 'colourSearch' + timeStamp + '.csv');

}

// https://github.com/jspsych/jsPsych/issues/193
var generateString = function() {
    'use strict';
    var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    digits = jsPsych.randomization.shuffle(digits);
    var digitSpan = digits.slice(0, 4);
    return digitSpan.join(' ');
};


/*
    Mutate the string by permuting position or changing integer
*/
var mutateString = function(digitSpan, mutationProb, randomNumber) {
    'use strict';
    if (randomNumber < mutationProb) {
        //console.log('mutating');
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
    //console.log(digitSpan);
    return digitSpan;
};

var generateDigitspans = function(nTrials) {
    'use strict';
    var stimuli = [];
    var item = generateString();
    var m = new MersenneTwister();
    stimuli.push({ verbalStimulus: item });
    var m = new MersenneTwister();
    for (var i = 1; i < nTrials; i++) {

        var randomNumber = m.random();

        item = mutateString(item, 0.5, randomNumber);
        stimuli.push({ verbalStimulus: item });
    }

    return stimuli;
};


/*
Generate the stimuli for the experiment. Manually adjust the first trials of the block
to remove the response prompt.
*/

var addDigitSpans = function(stimuli) {
    var n = stimuli.length
    var verbal_stimuli = generateDigitspans(n);
    prompt = false;
    for (t in stimuli) {
        var same = false;

        var v = verbal_stimuli[t].verbalStimulus;
        if (t > 0 && v == verbal_stimuli[t - 1].verbalStimulus) {
            var same = true;
        }

        var id = stimuli[t]['data'].id;
        var digits = v.split(' ')
        stimuli[t]['digit1'] = '<div class="fixation" style="height: 190px;">' + digits[0] + '</div>';
        stimuli[t]['digit2'] = '<div class="fixation" style="height: 190px;">' + digits[1] + '</div>';
        stimuli[t]['digit3'] = '<div class="fixation" style="height: 190px;">' + digits[2] + '</div>';
        stimuli[t]['digit4'] = '<div class="fixation" style="height: 190px;">' + digits[3] + '</div>';
       
        stimuli[t]['dataVerbal'] = {id: id, digits: v, verbalSame: same, test_part: 'verbal' };

        // Don't prompt on first ite
        if(prompt == true){
            stimuli[t]['prompt'] = '<p class="prompt">Press Space if digits are different.</p>';
        }
        else{
         stimuli[t]['prompt'] = '<p class="prompt">Memorise these digits.</p>';   
        }
        prompt = true;

    }
    return stimuli;
}


var loadStimuli = function(colourStimuli,verbalInterference,block) {
    var stimuli = [];
    var n = colourStimuli.length
    for (var i = 1; i < n; i++) {
        var s = colourStimuli[i];
        //console.log(s);
        var position = s.stimulus.position;
        if (s.stimulus.vf == 'RVF') {
            var position = position + 6;
        }

        var stimData = {
            id: s.stimulus.id,
            target: s.stimulus.target,
            position: position,
            distractor: s.stimulus.distractor,
            vf: s.stimulus.vf,
            block: block,
            test_part: 'visualSearch',
            interference: verbalInterference
        };
        stimuli.push({
            stimulus: generateCircle(s.stimulus.target, s.stimulus.distractor, position),
            data: stimData
        });

        // Randomize
        stimuli = jsPsych.randomization.shuffle(stimuli);

    }

    if(verbalInterference == true){
        stimuli = addDigitSpans(stimuli);
    }
        

    return stimuli;
}



var generateCircle = function(colorTarget, colorDistractor, targetPosition) {

    var newSvg = document.getElementById('jspsych-target');
    newSvg.outerHTML += '<svg xmlns="http://www.w3.org/2000/svg" id="circle"></svg>';

    targetPosition = targetPosition - 1;

    // size should be 190
    var s = Snap('#circle');
    //s.attr({ id: 'circle', class: 'svg' });
    s.attr({ width: 220, height: 200 });
    var coordsX = [60, 22, 0, 0, 22, 60, 98, 133, 156, 156, 133, 98];
    var coordsY = [1, 22, 56, 98, 133, 156, 1, 22, 56, 98, 133, 156];
    //var coordsX = [145, 59, 102, 15, 0, 0, 15, 59, 102, 164, 164, 145];
    //var coordsY = [15, 1, 1, 15, 59, 102, 145, 164, 164, 59, 102, 145];

    var rects = [];
    var rectSize = 28;

    for (let x in coordsX) {
        var color = colorDistractor;
        if (targetPosition == x) {
            color = colorTarget;
        }
        var r = s.rect(coordsX[x], coordsY[x], rectSize, rectSize)
            .addClass(color);

        rects.push(r);
    }
    var stim = '<div style="height: 190px; id="svg-container">' + s.toString() + '</div>';

    var elem = document.getElementById("circle")
    elem.remove();
    return stim;
};

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



// Combine the stimuli
var stimuli = {};

/*
stimuli.practice1 = loadStimuli(practiceStimuli,false,0).slice(0, 3);
stimuli.practice2 = loadStimuli(practiceStimuli,true,0).slice(0, 3);
stimuli.test1     = loadStimuli(colourStimuli,false,1).slice(0, 3);
stimuli.test2     = loadStimuli(colourStimuli,true,2).slice(0, 3);
stimuli.test3     = loadStimuli(colourStimuli,false,3).slice(0, 3);
stimuli.test4     = loadStimuli(colourStimuli,true,4).slice(0, 3);
*/

if(sessionStorage.condition == 'colour Test'){
    stimuli.practice1 = loadStimuli(practiceStimuli,false,0).slice(0, 3);
    stimuli.practice2 = loadStimuli(practiceStimuli,true,0).slice(0, 3);
    stimuli.test1     = loadStimuli(colourStimuli,false,1).slice(0, 3);
    stimuli.test2     = loadStimuli(colourStimuli,true,2).slice(0, 3);
    stimuli.test3     = loadStimuli(colourStimuli,false,3).slice(0, 3);
    stimuli.test4     = loadStimuli(colourStimuli,true,4).slice(0, 3);
}
else{
    stimuli.practice1 = loadStimuli(practiceStimuli,false,0);
    stimuli.practice2 = loadStimuli(practiceStimuli,true,0);
    stimuli.test1     = loadStimuli(colourStimuli,false,1);
    stimuli.test2     = loadStimuli(colourStimuli,true,2);
    stimuli.test3     = loadStimuli(colourStimuli,false,3);
    stimuli.test4     = loadStimuli(colourStimuli,true,4);
}


// TRIALS
// https://groups.google.com/forum/#!topic/jspsych/G-AylIr7e0E
var verbal_seed = {
    type: 'html-keyboard-response',
    stimulus: generateString(),
};

var digit1 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('digit1'),
    data: { test_part: 'digit 1' },
    trial_duration: 600,
    response_ends_trial: false,
    choices: jsPsych.NO_KEYS
};

var digit2 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('digit2'),
    data: { test_part: 'digit 2' },
    trial_duration: 600,
    response_ends_trial: false,
    choices: jsPsych.NO_KEYS
};

var digit3 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('digit3'),
    data: { test_part: 'digit 3' },
    trial_duration: 600,
    response_ends_trial: false,
    choices: jsPsych.NO_KEYS
};

var digit4 = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('digit4'),
    data: { test_part: 'digit 4' },
    trial_duration: 600,
    response_ends_trial: false,
    choices: jsPsych.NO_KEYS
};


var digitPrompt = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('prompt'),
    trial_duration: 2500,
    response_ends_trial: false,
    choices: jsPsych.ALL_KEYS,
    data: jsPsych.timelineVariable('dataVerbal'),
    on_start: function(trial) { $("#jspsych-target").focus(); },
    on_finish: function(data) {
        data.correctVerbal = false;
        if (data.key_press) {
            data.verbalKeyPress = data.key_press;
            data.verbalRT       = data.rt;
            console.log(data.key_press + ' Same' + data.verbalSame);
            if (data.key_press == 32 && data.verbalSame == false) {
                data.correctVerbal = true;
            }
        } else {
            if (data.verbalSame == true) {
                data.correctVerbal = true;
            }
        }

    },

};


var digitBlank = {
    type: 'html-keyboard-response',
    stimulus: '<div class="fixation" style="height: 190px;""></div>',
    trial_duration: 200,
    response_ends_trial: false,
    choices: jsPsych.NO_KEYS,
    data: { test_part: 'verbal_blank' },
    prompt: ''

}

var blank = {
    type: 'html-keyboard-response',
    stimulus: '<div class="fixation" style="height: 190px;"">X X X X X X X</div>',
    trial_duration: 2500,
    response_ends_trial: false,
    choices: jsPsych.NO_KEYS,
    data: { test_part: 'blank' },
    prompt: ''
};

var testDisplay = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: jsPsych.NO_KEYS,
    trial_duration: 200,
    data: { test_part: 'circle' }
}


var test = {
    type: 'html-keyboard-response',
    stimulus: '<div class="fixation" style="height: 190px;">+</div>',
    choices: ['f', 'j'],
    prompt: "<br><p class='prompt'>Target left (f) or right (j)?</p>",
    data: jsPsych.timelineVariable('data'),
    on_start: function(trial) { $("#jspsych-target").focus(); },
    on_finish: function(data) {
        data.correctVisual = false;
        if (data.key_press) {
            //console.log(data.key_press + ' visual location' + data.vf);
            if (data.key_press == 70 && data.vf == 'LVF') {
                data.correctVisual = true;
            }
            if (data.key_press == 74 && data.vf == 'RVF') {
                data.correctVisual = true;
            }

        }
        console.log('Correct: ', data.correctVisual);
    }
};


var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div class="fixation" style="height: 190px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: function() {
        return jsPsych.randomization.sampleWithoutReplacement([1200, 1400, 1600], 1)[0];
    },
    prompt: "<br><p class='prompt'></p>",
    data: { test_part: 'fixation' }
};



// INSTRUCTION BLOCKS
var instructions = {
    type: 'instructions',
    pages: [
        '<p>Welcome to the experiment on colour discrimination.</p>' +
        '<p>You will see a series of circular stimuli composed of 12 colour patches.</p>' +
        '<p><img src="img/example.png" width="160px"></img></p>' +
        '<p>One of the patches either on the left or right side of the screen will have a different colour.<br>' +
        'If the different patch is on the <strong>left side</strong> of the circle, <strong>press the f key</strong>.<br>' +
        'If the different patch is on the <strong>right side</strong> of the circle, <strong>press the j key</strong>. <br>' +
        'Use your left and right index fingers to press the keys.</p>',
        '<p>On some of the trials the circle will be preceeded by a series of four digits.</p>' +
        '<p>You will have to memorise these digits and decide if they matches the ones from the previous trial.</p>' +
        '<p>If they are <strong>different</strong> you press the space bar with your thumb.</p>',
        '<p>The experiment takes about 30 to 40 minutes with breaks every ten minutes.</p>' +
        '<p>Make sure you are seated at the middle of the screen. Click next to begin.</p>',
    ],
    show_clickable_nav: true
};

var debriefblock_1 = {
    type: "html-keyboard-response",
    stimulus: function() {
        var trials = jsPsych.data.get().filter({ test_part: 'visualSearch' });
        var rt = Math.round(trials.select('rt').mean()) + 200;
        return "<p>Your average response time was " + rt + "ms.</p>" +
            "<p>Make sure you are seated at the middle of the screen. Press any key to continue</p>";
    }
};


var debriefblock_2 = {
    type: "html-keyboard-response",
    stimulus: function() {
        var trials = jsPsych.data.get().filter({ test_part: 'visualSearch' });
        var rt = Math.round(trials.select('rt').mean());

        var trials = jsPsych.data.get().filter({ test_part: 'verbal' });
        var correct_trials = trials.filter({ correctVerbal: true });
        var accuracyVerbal = Math.round(correct_trials.count() / trials.count() * 100);

        var trials = jsPsych.data.get().filter({ test_part: 'visualSearch' });
        var correct_trials = trials.filter({ correctVisual: true });
        var accuracyVisual = Math.round(correct_trials.count() / trials.count() * 100);


        return "<p>Your average response time was " + rt + "ms.</p>" +
            "<p>You responded correctly on " + accuracyVerbal + "% of digit items.</p><br>" +
            "<p style='font-color: red;'>You responded correctly on " + accuracyVisual + "% of colour items.</p><br>" +
            "<p>Make sure you are seated at the middle of the screen. Press any key to continue</p>";
    }
};




var feedbackblock_1 = {
    type: "html-keyboard-response",
    stimulus: "<p><b>Break</b></p>" +
        "<p>In some blocks of the experiment the circle with colour patches will be preceeded by a series of digits.</p>" +
        "<p>Silently read the digits and memorise them. On the next trial you will see either the same or a different series of digits.<br>" +
        "If they are <strong>different</strong> as thhose that came just before, press the <strong>Space</strong> key.  Don't press any key if they are the same.</p>" +
        "<p>No feedback will be given so try to be accurate.</p><br>" +
        "<p>The digits will be followed by the circle with coloured patches.<br>" +
        "Indicate the side of the coloured square as quickly as possible.<br><br></p>" +
        "<p>When you are ready, proceed to the experiment by pressing the Space bar.</p>",
    timing_post_trial: 2000

}

var feedbackblock_2 = {
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
        "<p>Please take a short break.<br> Make sure you are seated at the middle of the screen.</p>" +
        "<p>When you are ready. you can continue with the experiment by pressing the Space bar.</p>",
    data: { block: 'pause' },
    timing_post_trial: 2000
};


var namingInstructions = {
    type: "html-keyboard-response",
    stimulus: "<p><b>Nearly finished</b></p>" +
        "<p>Before we finish, we would like you to indicate what you think the name of the previously presented colours were.<br>" +
        "You will be shown a series of 8 squares and will be asked to press the <strong>f</strong> or <strong>j</strong> key to indicate their colour.</p>" +
        "<p>Press the Space bar to continue.</p>",
    data: { block: 'namingInstructions' },
    timing_post_trial: 2000

};

/* test trials */
var namingStimuli = [
  { namingStimulus: '<div style="height: 50px;"><svg width="40" height="40" id="circle" class="svg"><rect x="0" y="0" width="40" height="40" class="A1"></rect></svg></div>', data: {target: 'A1',test_part: 'naming'}},
  { namingStimulus: '<div style="height: 50px;"><svg width="40" height="40" id="circle" class="svg"><rect x="0" y="0" width="40" height="40" class="A2"></rect></svg></div>', data: {target: 'A2',test_part: 'naming'}},
  { namingStimulus: '<div style="height: 50px;"><svg width="40" height="40" id="circle" class="svg"><rect x="0" y="0" width="40" height="40" class="B1"></rect></svg></div>', data: {target: 'B1',test_part: 'naming'}},
  { namingStimulus: '<div style="height: 50px;"><svg width="40" height="40" id="circle" class="svg"><rect x="0" y="0" width="40" height="40" class="B2"></rect></svg></div>', data: {target: 'B2',test_part: 'naming'}}

];
var namingTestA = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('namingStimulus'),
    choices: ['f', 'j'],
    data: jsPsych.timelineVariable('data'),
    on_start: function(trial) { $("#jspsych-target").focus(); },
    on_finish: function(data) {
        if (data.key_press) {
            //console.log(data.key_press + ' visual location' + data.vf);
            if (data.key_press == 70) {
                data.response = 'orange';
            }
            if (data.key_press == 74) {
                data.response = 'brown';
            }

        }
        console.log(data);
    },
    prompt: "<p>Indicate orange (f) or brown (j).</p>"
}

var namingTestB = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('namingStimulus'),
    choices: ['f', 'j'],
    data: jsPsych.timelineVariable('data'),
    on_start: function(trial) { $("#jspsych-target").focus(); },
    on_finish: function(data) {
        if (data.key_press) {
            //console.log(data.key_press + ' visual location' + data.vf);
            if (data.key_press == 70) {
                data.response = 'brown';
            }
            if (data.key_press == 74) {
                data.response = 'orange';
            }

        }
        console.log(data);
    },
    prompt: "<p>Indicate brown (f) or orange (j).</p>"
}



var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function() {
        return "<p>Thank you. This completes the colour experiment.</p>";
    }
};




// PRACTICE
/* Randomizations performed in generating the stimuli, so randomize_order = false */
var practiceblock_1 = {
    timeline: [blank, fixation, testDisplay, test],
    timeline_variables: stimuli.practice1,
    randomize_order: false,
    repetitions: 1,
    data: { block: 'practice 1' }
};

var practiceblock_2 = {
    timeline: [digit1, digitBlank, digit2, digitBlank, digit3, digitBlank, digit4, digitBlank, digitPrompt, fixation, testDisplay, test],
    timeline_variables: stimuli.practice2,
    randomize_order: false,
    repetitions: 1,
    data: { block: 'practice 2' }
};


// TEST 
var testblock_1 = {
    timeline: [blank, fixation, testDisplay, test],
    timeline_variables: stimuli.test1,
    randomize_order: false,
    repetitions: 1,
    data: { block: 'test 1' }
};

var testblock_2 = {
    timeline: [digit1, digitBlank, digit2, digitBlank, digit3, digitBlank, digit4, digitBlank, digitPrompt, fixation, testDisplay, test],
    timeline_variables: stimuli.test2,
    randomize_order: false,
    repetitions: 1,
    data: { block: 'test 2' }
};

var testblock_3 = {
    timeline: [blank, fixation, testDisplay, test],
    timeline_variables: stimuli.test3,
    randomize_order: false,
    repetitions: 1,
    data: { block: 'test 3' }
};


var testblock_4 = {
    timeline: [digit1, digitBlank, digit2, digitBlank, digit3, digitBlank, digit4, digitBlank, digitPrompt, fixation, testDisplay, test],
    timeline_variables: stimuli.test4,
    randomize_order: false,
    repetitions: 1,
    data: { block: 'test 4' }
};




if(sessionStorage.namingOrder == 1){
    var namingBlock = {
      timeline: [fixation, namingTestA],
      timeline_variables: namingStimuli,
      randomize_order: true,
      repetitions: 2
    };
}
else {
    var namingBlock = {
      timeline: [fixation, namingTestB],
      timeline_variables: namingStimuli,
      randomize_order: true,
      repetitions: 2
    };

}

var fullscreenON = {
    type: 'fullscreen',
    full_screen_mode: true
};

var fullscreenOFF = {
    type: 'fullscreen',
    full_screen_mode: false,
    message: '<p>You will now exit full screen mode'
};




// Default (used for test)
var experiment_procedure = {
    timeline: [instructions, practiceblock_1, debriefblock_1, feedbackblock_1, practiceblock_2, feedbackblock_2,
        testblock_1, blockPause, testblock_2, blockPause, testblock_3, blockPause, testblock_4,namingInstructions,namingBlock
    ]
};


if(sessionStorage.condition == 'colour A'){
    var experiment_procedure = {
        timeline: [instructions, practiceblock_1, debriefblock_1, feedbackblock_1, practiceblock_2, feedbackblock_2,
            testblock_1, blockPause, testblock_2, blockPause, testblock_3, blockPause, testblock_4,namingInstructions,namingBlock
        ]
    };
}

if(sessionStorage.condition == 'colour B'){
    var experiment_procedure = {
        timeline: [instructions, practiceblock_1, debriefblock_1, feedbackblock_1, practiceblock_2, feedbackblock_2,
            testblock_2, blockPause, testblock_1, blockPause, testblock_4, blockPause, testblock_3,namingInstructions,namingBlock
        ]
    };

}



timeline.push(experiment_procedure);
//timeline.push({ timeline: [practiceblock_2, debriefblock_2] });

/* start the experiment */

jsPsych.init({
    timeline: timeline,
    //display_element: 'jspsych-target',
    on_finish: function() {

        jsPsych.data.addProperties({
            uid: sessionStorage.uid,
            age: sessionStorage.age,
            gender: sessionStorage.gender,
            spoon: sessionStorage.spoon,
            toothbrush: sessionStorage.toothbrush,
            throwing: sessionStorage.throwing,
            writing: sessionStorage.writing,
            language: sessionStorage.language,
            condition: sessionStorage.condition,
            namingOrder: sessionStorage.namingOrder
        });

        var all_data = jsPsych.data.get().ignore(['internal_node_id', 'trial_type', 'stimulus']).csv();

        saveData();
        //_send_task_data(all_data);
        console.log('Experiment finished.');
        send_debrief();

    },
    default_iti: 1000
});