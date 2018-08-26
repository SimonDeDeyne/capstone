# Capstone Projects 
University of Melbourne School of Psychology, 2018


## General

The experiments are coded with [jsPsych](https://www.jspsych.org/plugins/jspsych-html-keyboard-response/).

These are very preliminary first drafts of the experiments. They will require input (instructions etc.), and the 
procedures need refinements (counter-balancing of responses etc.).

You should be able to run these experiments on your own computer by downloading the repository.
The code has only been tested using a recent version of Chrome, so try to only use that browser.


## Debugging scripts
If you make changes to the scripts and want to test, you will want to use the browser's debugging facilities.
In Chrome you can access the [Development Tools](https://developers.google.com/web/tools/chrome-devtools/) panel by pressing <code>Ctrl + i</code>. 


## Obtaining the data
The experiments provided here are for testing only. They will not write data to a remote server,  but to a local <code>.csv</code> file.
You can easily copy the content of that file to Excel. 
The actual experiments will include some additional code to save the responses to the server.


## Hints for collecting accurate data
Millisecond accuracy can be hard to obtain using online experiments in some cases. However, recent work shows that web-browser-based experiments can still be used to obtain accurate RTs ([de Leeuw, Motz, 2015](https://link.springer.com/article/10.3758/s13428-015-0567-2)). The biggest risk is having the task interrupted with all kinds of notifications or processes running in the background. That's why it's best to make sure there no other programs or tabs open and disabling programs running in the background (Dropbox, Facebook, etc.).



## Experiments
Informed consents and plain language statements can\ be given separately as a printed document. 
Debriefing is done at the end of the experiments. Just take a look at the code and adapt the debriefing statements where needed. Don't forget to test the updated scripts to see if they still work!

### Colour study
The main code of the experiment can be found in [colourExperiment.js](./colour/js/colourExperiment.js).
This code contains the instructions and stimuli and some timing parameters. A template for the 12-position colour circle is also included in the [colour/img](./colour/img/) folder.


### Linguistic Classifier study
The main code of the experiment can be found in [lingclass.js](./lingclass/js/lingclass.js).
This code contains the instructions and stimuli and some timing parameters.


### Sketch study
A series of words is shown at the top of the screen and each participant gets 50 seconds to sketch the word. Path simplification is used to reduce the sketch complexity. The result is saved as an svg file, from which we can extract the ordered strokes and the onset time of each stroke. 
Some of the techniques might not work across browsers and platforms, so make sure to pilot this.
Consider using a single device with stylus-support to get good drawings and reduce device-specific  variability.


