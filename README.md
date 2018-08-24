# Capstone Projects 
University of Melbourne School of Psychology, 2018

## General

The experiments are coded with [jsPsych](https://www.jspsych.org/plugins/jspsych-html-keyboard-response/).

These are very preliminary first drafts of the experiments. They will require input (instructions etc.), and the 
procedures need refinements (counter-balancing of responses etc.).

You should be able to run these experiments on your own computer by downloading the repository.
The code has only been tested using a recent version of Chrome, so try to only use that browser.
Also you probably want to turn of anything that might interfere (such as plugins, messenger or other stuff happening in the background). When testing this becomes a concern when accurate RTs are needed. Something to discuss...

## Debugging scripts
If you make changes to the scripts and want to test, you will want to use the browser's debugging facilities.
In Chrome you can access the [Development Tools](https://developers.google.com/web/tools/chrome-devtools/) panel by pressing <code>Ctrl + i</code>. 

## Obtaining the data
The experiments provided here are for testing only. They will not write data to the server, but you can manually inspect the data
and copy into a text or Excel file. The actual experiments will include some additional code to save the responses to the server.

For the colour experiment, you can obtain the data by entering <code>jsPsych.data.get().filter({test_part: 'visualSearch'}).csv()</code> into the Console Bar using Chrome (use <code>Ctrl + i</code> to activate it).

