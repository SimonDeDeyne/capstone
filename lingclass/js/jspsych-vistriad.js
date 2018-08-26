/*
Two alternatives force choice with images
// to do  preloading
// jsPsych.pluginAPI.registerPreload('vistriad');

 */

jsPsych.plugins.vistriad = (function() {
    'use strict';
    var plugin = {};

    plugin.info = {
        name: "vistriad",
        description: 'Visual two alternative forced choice task (2AFC)',
        parameters: {
            stimulus: {
                cue: {
                    type: jsPsych.plugins.parameterType.IMAGE,
                    pretty_name: 'Cue',
                    default: undefined,
                    description: 'The cue image to be displayed.'
                },
                targetA: {
                    type: jsPsych.plugins.parameterType.IMAGE,
                    pretty_name: 'Target A',
                    default: undefined,
                    description: 'The target A image to be displayed.'
                },
                targetB: {
                    type: jsPsych.plugins.parameterType.IMAGE,
                    pretty_name: 'Target B',
                    default: undefined,
                    description: 'The target B image to be displayed.'
                }
            },

            left_key: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                pretty_name: 'Same key',
                default: 'f',
                description: ''
            },
            right_key: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                pretty_name: 'Different key',
                default: 'j',
                description: 'Right key'
            },
            gap_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Gap duration',
                default: 5000,
                description: 'How long to show a blank screen in between the two stimuli.'
            },
            second_stim_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Second stimulus duration',
                default: 1000,
                description: 'How long to show the second stimulus for in milliseconds.'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: null,
                description: 'Choose the most related picture (left) or (right).'
            }
        }
    };



    plugin.trial = function(display_element, trial) {

        display_element.innerHTML = [
            '<div class="content">',
            '<div class="row">',
            '<div class="cell hidden" id="targetA">',
            '<img src="' + trial.stimulus.targetA + '"</img>',
            '</div>',
            '<div class="cell hidden" id="targetB">',
            '<img src="' + trial.stimulus.targetB + '"</img>',
            '</div>',
            '</div>',
            '<div class="row">',
            '<div class="cell" id="cue"><img class="cue" src="' + trial.stimulus.cue + '"></img></div>',
            '</div>',
            '</div>'].join('');

        jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: afterKeyboardResponse,
            valid_responses: trial.advance_key,
            rt_method: 'date',
            persist: false,
            allow_held_key: false
        });



        jsPsych.pluginAPI.setTimeout(function() {
            removeTargets();
        }, trial.gap_duration);



        function afterKeyboardResponse(info) {
            first_stim_info = info;
            console.log(info);
            //showBlankScreen();
        }


        function removeTargets() {
            display_element.innerHTML = [
                '<div class="content">',
                '<div class="row">',
                '<div class="cell" id="targetA">',
                '</div>',
                '<div class="cell" id="targetB">',
                '</div>',
                '</div>',
                '<div class="row">',
                '<div class="cell" id="cue"><img class="cue" src="' + trial.stimulus.cue + '"></img></div>',
                '</div>',
                '</div>',
            ].join('');

            jsPsych.pluginAPI.setTimeout(function() {
                showBlankScreen();
            }, trial.gap_duration);
        }


        function showBlankScreen() {

            jsPsych.pluginAPI.setTimeout(function() {
                display_element.innerHTML = '<b>TOO SLOW!</b>';
                console.log('Blank screen');
            }, trial.gap_duration);
        }


        function afterKeyboardResponse(info) {
            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            var subjectResponse = '';
            if (info.key == 70) {
                subjectResponse = 'A';
            }

            if (info.key == 74) {
                subjectResponse = 'B';
            }
           
            var trial_data = {
                "rt": info.rt,
                "cue": JSON.stringify(trial.stimulus.cue),
                "targetA": JSON.stringify(trial.stimulus.targetA),
                "targetB": JSON.stringify(trial.stimulus.targetB),
                "key_press": info.key,
                "response": subjectResponse
            };

            console.log(trial_data);
            display_element.innerHTML = '';

            jsPsych.finishTrial(trial_data);

        }


    };

    return plugin;
})();