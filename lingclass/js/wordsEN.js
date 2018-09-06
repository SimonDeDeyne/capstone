var test_stimuli = [
    { stimulus: { cue: 'train', targetA: 'tank', targetB: 'bomb' } },
    { stimulus: { cue: 'cloud', targetA: 'rose', targetB: 'feather' } },
    { stimulus: { cue: 'teacher', targetA: 'nurse', targetB: 'ruler' } },
    { stimulus: { cue: 'doctor', targetA: 'pilot', targetB: 'teacher' } },
    { stimulus: { cue: 'candle', targetA: 'finger', targetB: 'key' } },
    { stimulus: { cue: 'candle', targetA: 'needle', targetB: 'computer' } },
    { stimulus: { cue: 'candle', targetA: 'pencil', targetB: 'comb' } },
    { stimulus: { cue: 'candle', targetA: 'pillar', targetB: 'spear' } },
    { stimulus: { cue: 'candle', targetA: 'banana', targetB: 'key' } },
    { stimulus: { cue: 'candle', targetA: 'chalk', targetB: 'scissors' } },
    { stimulus: { cue: 'finger', targetA: 'needle', targetB: 'comb' } },
    { stimulus: { cue: 'finger', targetA: 'pillar', targetB: 'knife' } },
    { stimulus: { cue: 'finger', targetA: 'banana', targetB: 'spear' } },
    { stimulus: { cue: 'finger', targetA: 'chalk', targetB: 'chain' } },
    { stimulus: { cue: 'needle', targetA: 'pencil', targetB: 'thermometer' } },
    { stimulus: { cue: 'needle', targetA: 'pillar', targetB: 'arm' } },
    { stimulus: { cue: 'needle', targetA: 'banana', targetB: 'hammer' } },
    { stimulus: { cue: 'needle', targetA: 'chalk', targetB: 'comb' } },
    { stimulus: { cue: 'pencil', targetA: 'pillar', targetB: 'wall' } },
    { stimulus: { cue: 'pencil', targetA: 'banana', targetB: 'ruler' } },
    { stimulus: { cue: 'pillar', targetA: 'banana', targetB: 'button' } },
    { stimulus: { cue: 'pillar', targetA: 'chalk', targetB: 'radio' } },
    { stimulus: { cue: 'banana', targetA: 'chalk', targetB: 'bomb' } },
    { stimulus: { cue: 'piano', targetA: 'helicopter', targetB: 'skirt' } },
    { stimulus: { cue: 'scissors', targetA: 'knife', targetB: 'gun' } },
    { stimulus: { cue: 'scissors', targetA: 'fork', targetB: 'spear' } },
    { stimulus: { cue: 'scissors', targetA: 'key', targetB: 'bullet' } },
    { stimulus: { cue: 'scissors', targetA: 'broom', targetB: 'button' } },
    { stimulus: { cue: 'scissors', targetA: 'hammer', targetB: 'pillar' } },
    { stimulus: { cue: 'scissors', targetA: 'spoon', targetB: 'door' } },
    { stimulus: { cue: 'scissors', targetA: 'ruler', targetB: 'pencil' } },
    { stimulus: { cue: 'scissors', targetA: 'guitar', targetB: 'bow' } },
    { stimulus: { cue: 'scissors', targetA: 'screwdriver', targetB: 'gun' } },
    { stimulus: { cue: 'knife', targetA: 'key', targetB: 'pencil' } },
    { stimulus: { cue: 'knife', targetA: 'broom', targetB: 'candle' } },
    { stimulus: { cue: 'knife', targetA: 'hammer', targetB: 'pill' } },
    { stimulus: { cue: 'knife', targetA: 'comb', targetB: 'needle' } },
    { stimulus: { cue: 'knife', targetA: 'spoon', targetB: 'chain' } },
    { stimulus: { cue: 'knife', targetA: 'umbrella', targetB: 'pill' } },
    { stimulus: { cue: 'knife', targetA: 'ruler', targetB: 'button' } },
    { stimulus: { cue: 'knife', targetA: 'screwdriver', targetB: 'spear' } },
    { stimulus: { cue: 'fork', targetA: 'key', targetB: 'radio' } },
    { stimulus: { cue: 'fork', targetA: 'umbrella', targetB: 'pill' } },
    { stimulus: { cue: 'fork', targetA: 'chair', targetB: 'needle' } },
    { stimulus: { cue: 'fork', targetA: 'ruler', targetB: 'camera' } },
    { stimulus: { cue: 'key', targetA: 'hammer', targetB: 'candle' } },
    { stimulus: { cue: 'key', targetA: 'umbrella', targetB: 'car' } },
    { stimulus: { cue: 'key', targetA: 'spoon', targetB: 'needle' } },
    { stimulus: { cue: 'key', targetA: 'ruler', targetB: 'cigarette' } },
    { stimulus: { cue: 'key', targetA: 'sword', targetB: 'arm' } },
    { stimulus: { cue: 'broom', targetA: 'hammer', targetB: 'pencil' } },
    { stimulus: { cue: 'broom', targetA: 'chair', targetB: 'button' } },
    { stimulus: { cue: 'broom', targetA: 'violin', targetB: 'pearl' } },
    { stimulus: { cue: 'broom', targetA: 'screwdriver', targetB: 'pencil' } },
    { stimulus: { cue: 'hammer', targetA: 'umbrella', targetB: 'pillar' } },
    { stimulus: { cue: 'hammer', targetA: 'violin', targetB: 'radio' } },
    { stimulus: { cue: 'hammer', targetA: 'ruler', targetB: 'pillar' } },
    { stimulus: { cue: 'hammer', targetA: 'guitar', targetB: 'button' } },
    { stimulus: { cue: 'comb', targetA: 'umbrella', targetB: 'pill' } },
    { stimulus: { cue: 'spoon', targetA: 'chair', targetB: 'pencil' } },
    { stimulus: { cue: 'umbrella', targetA: 'chair', targetB: 'camera' } },
    { stimulus: { cue: 'umbrella', targetA: 'violin', targetB: 'star' } },
    { stimulus: { cue: 'umbrella', targetA: 'sword', targetB: 'stamp' } },
    { stimulus: { cue: 'umbrella', targetA: 'guitar', targetB: 'soap' } },
    { stimulus: { cue: 'umbrella', targetA: 'screwdriver', targetB: 'star' } },
    { stimulus: { cue: 'chair', targetA: 'violin', targetB: 'piano' } },
    { stimulus: { cue: 'chair', targetA: 'sword', targetB: 'knife' } },
    { stimulus: { cue: 'chair', targetA: 'guitar', targetB: 'gun' } },
    { stimulus: { cue: 'pearl', targetA: 'bullet', targetB: 'medal' } },
    { stimulus: { cue: 'pearl', targetA: 'bomb', targetB: 'pencil' } },
    { stimulus: { cue: 'button', targetA: 'bullet', targetB: 'knife' } },
    { stimulus: { cue: 'button', targetA: 'bomb', targetB: 'comb' } },
    { stimulus: { cue: 'button', targetA: 'corn', targetB: 'candle' } },
    { stimulus: { cue: 'button', targetA: 'pill', targetB: 'ruler' } },
    { stimulus: { cue: 'tooth', targetA: 'bomb', targetB: 'radio' } },
    { stimulus: { cue: 'tooth', targetA: 'star', targetB: 'guitar' } },
    { stimulus: { cue: 'tooth', targetA: 'corn', targetB: 'ruler' } },
    { stimulus: { cue: 'tooth', targetA: 'pill', targetB: 'camera' } },
    { stimulus: { cue: 'bullet', targetA: 'star', targetB: 'comb' } },
    { stimulus: { cue: 'bullet', targetA: 'corn', targetB: 'tractor' } },
    { stimulus: { cue: 'bomb', targetA: 'star', targetB: 'camera' } },
    { stimulus: { cue: 'bomb', targetA: 'corn', targetB: 'chain' } },
    { stimulus: { cue: 'bomb', targetA: 'pill', targetB: 'guitar' } },
    { stimulus: { cue: 'star', targetA: 'corn', targetB: 'skirt' } },
    { stimulus: { cue: 'star', targetA: 'pill', targetB: 'key' } },
    { stimulus: { cue: 'corn', targetA: 'pill', targetB: 'knife' } },
    { stimulus: { cue: 'lion', targetA: 'elephant', targetB: 'snake' } },
    { stimulus: { cue: 'rope', targetA: 'trousers', targetB: 'candle' } },
    { stimulus: { cue: 'rope', targetA: 'skirt', targetB: 'ruler' } },
    { stimulus: { cue: 'snake', targetA: 'road', targetB: 'arm' } },
    { stimulus: { cue: 'snake', targetA: 'skirt', targetB: 'pearl' } },
    { stimulus: { cue: 'road', targetA: 'skirt', targetB: 'knife' } },
    { stimulus: { cue: 'road', targetA: 'scarf', targetB: 'guitar' } },
    { stimulus: { cue: 'road', targetA: 'belt', targetB: 'star' } },
    { stimulus: { cue: 'trousers', targetA: 'wire', targetB: 'pillar' } },
    { stimulus: { cue: 'trousers', targetA: 'chain', targetB: 'pencil' } },
    { stimulus: { cue: 'skirt', targetA: 'wire', targetB: 'pearl' } },
    { stimulus: { cue: 'scarf', targetA: 'wire', targetB: 'bullet' } },
    { stimulus: { cue: 'belt', targetA: 'chain', targetB: 'chair' } },
    { stimulus: { cue: 'sofa', targetA: 'bow', targetB: 'candle' } },
    { stimulus: { cue: 'table', targetA: 'bow', targetB: 'camera' } },
    { stimulus: { cue: 'bed', targetA: 'mouth', targetB: 'pearl' } },
    { stimulus: { cue: 'bed', targetA: 'bow', targetB: 'radio' } },
    { stimulus: { cue: 'mouth', targetA: 'bow', targetB: 'bomb' } },
    { stimulus: { cue: 'soap', targetA: 'meat', targetB: 'camera' } },
    { stimulus: { cue: 'thermometer', targetA: 'gun', targetB: 'knife' } },
    { stimulus: { cue: 'thermometer', targetA: 'arm', targetB: 'chair' } },
    { stimulus: { cue: 'thermometer', targetA: 'feather', targetB: 'candle' } },
    { stimulus: { cue: 'gun', targetA: 'feather', targetB: 'pill' } },
    { stimulus: { cue: 'spear', targetA: 'arm', targetB: 'ruler' } },
    { stimulus: { cue: 'spear', targetA: 'feather', targetB: 'pillar' } },
    { stimulus: { cue: 'spear', targetA: 'hand', targetB: 'bullet' } },
    { stimulus: { cue: 'arm', targetA: 'feather', targetB: 'skirt' } },
    { stimulus: { cue: 'feather', targetA: 'hand', targetB: 'button' } },
    { stimulus: { cue: 'flag', targetA: 'mirror', targetB: 'guitar' } },
    { stimulus: { cue: 'flag', targetA: 'drum', targetB: 'soldier' } }
];

var instructionsWordsEN = ['<h3>Welcome</h3>' +
    '<p>This experiment is about word relateness.</p>' +
    '<p>In this experiment,  a fixation cross followed by three words will appear in the middle of the screen. ' +
    '<p>For example:</p><p><img src="../img/exampleEnglishWords.png" width="220px"></p>' +
    '<br>Press <strong>f</strong> if the left word is in any way more related to the bottom word. ' +
    '<br>Press <strong>j</strong> if the right word is in any way related to the bottom word.</p>' +
    '<p>Try to respond as <strong>quickly as possible</strong>.</p>' +
    '<p>Words might occur repeatedly, some combinations are harder than others, but follow your intuition.' +
    '<p>There are 116 trials in this study and the task is about 10 minutes.</p><p>Click next to begin.</p>'];

var instructionsNext = 'Next';
var instructionsPrevious = 'Previous';

var imageList = [];