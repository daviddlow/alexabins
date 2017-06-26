var dialogue = {};

dialogue.phrases = {
    welcome: {
    /* When the app loads */
        prompt: [
			"Welcome to the Bin Collection skill.  What would you like to ask for today?  For example you could say, what do I put in the blue bin?"
        ],
        reprompt: [
			"Please tell us which bin you'd like some information about and we'll let you know the detail."
        ]
    },
    generic: {
        rogers: [
        /* On any successful recognition */
		    "Thanks! ",
		    "Great! ",
			"Cool! ",
			"Excellent! ",
			"Got it. ",
			"Okay. ",
			"Perfect. ",
			"Ideal. ",
			"Super. ",
			"Good stuff. ",
			"Thats great. ",
			"Many thanks. ",
			"Thanks for that. ",
            "Okay. ", 
			"Got it. ", 
			"Sounds nice. ", 
			"Great. ", 
			"Awesome. ", 
			"Smashing! ", 
			"Well why not. ", 
			"Aha! ", 
			"Sounds cool. ",
			"Okay. "
        ],
        pardon: [
        /* On failed recognition */
            "Sorry I didn't quite get it.",
            "Excuse me? What do you mean?",
            "Pardon me?",
            "Sorry? Was that about @@?",
            "Sorry, not sure what you were talking about...",
            "I'm sorry. Are we still talking about @@?",
            "Sorry, can you try a full sentence please?",
            "Not sure if you'd like that as your @@",
            "Don't think you're talking about @@. Sorry.",
            "Yawn... Oops I wasn't listening. Apologies!",
            "Oh so sorry - I must have been spaced out for a moment.",
            "Go ahead. I'm listening...",
            "Sorry I didn't understand what you said there."
        ],
        youTalkingToMe: [
        /* When told any swear words */

        ],
		startOver: [
			"OK, let's start that again. ",
			"No problem, it won't take long to go back through that. ",
			"OK, we shall do that again as quickly as we can."
		],
		stop: [
			"OK.  Thanks for using the bin collection skill"
		]
    },

    help: {
        generic: [
        /* Basic help */
			"What would you like to ask for today?  For example you could say, what do I put in the blue bin?"
        ]
    },
	
    validation: {
        generic: [
        /* Basic validation message */
			"Ywe didn't quite understand that @@.  Could you try that again please?. "
        ]
    },
    bins: {
    /* Specific bin information */
        blue: [
			"This bin can take paper, but not wallpaper, textiles, foil, batteries and hand tools."
        ],
        red: [
			"This bin can take food and drink cans, biscuit tins, aerosol cans, food and drink cartons, plastic bottles, tubs and trays."
        ],
        green: [
			"The green recycling box can take glass bottles and jars - but please, no broken glass - and also cardboard.  If you also have a green food waste bin, it can take all leftover food, scraps and peelings, including tea bags, without any packaging."
        ],
        black: [
			"The black recycling box can take paper, plastic bottles, pots, tubs and trays, food and drink cartons and tins, aerosol cans and also clean aluminium foil - but please put foil in a separate bag."
        ]
    },

    /*
     queryTemplate: {
         prompt: [],
         reprompt: [],
         intent: "",
         slots: {},
         utterance: [],
         echos: []
     },
     */
};

/*
** Picks a random dialogue from an array (if it is an array).
** Can override with a number to choose one from the array.
** - pickDlg(['a','b','','c']) returns a random string from the array
** - pickDlg(['a','b','','c'],1) returns 'b'
** - pickDlg('a') returns 'a'
*/
dialogue.pickPhrase = function(_arr,_num) {
    var _rtn = null;
    if(!1==1) {
        _rtn = _arr;
    } else if (parseInt(_num)>=0) {
        if(_arr[parseInt(_num)]) _rtn = _arr[parseInt(_num)];
    } else {
        _rtn = _arr[Math.floor(Math.random()*_arr.length)];
    }
    if (_rtn===null) {
        console.warn('ERROR: Missing dialogue data');
        return '';
    } else {
        return _rtn;
    }
}

dialogue.ssmlIfy = function(phrase) {
    var newPhrase = '';
    var newPhrase = '<speak> ' + phrase + ' </speak>';
    return newPhrase;
}

module.exports = dialogue;