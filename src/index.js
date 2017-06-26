var Alexa = require('alexa-sdk');
var getFootballData = require('./helpers/getBinData');
var dialogue = require('./helpers/getDialogue');

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.appId = 'amzn1.ask.skill.1a302baf-75e1-4a7e-bfa9-d495664fc60c'; // Bin Demo (Development)
	alexa.registerHandlers(handlers);
	alexa.execute();
};

var handlers = {
	'LaunchRequest': function() {
		this.emit(':ask', dialogue.pickPhrase(dialogue.phrases.welcome.prompt),dialogue.pickPhrase(dialogue.phrases.welcome.reprompt));
	},
	'binsIntent': function() {
		if(this.event.request.intent.slots.colour.value) {
			// get the slot value the user uttered
			var thisColour = this.event.request.intent.slots.colour.value;
			// evaluate this slot value into an object for the dialogue picker
			var thisDialogue = eval("dialogue.phrases.bins." + thisColour);
			// send the output
			this.emit(':tell', dialogue.pickPhrase(thisDialogue));
		}
		else {
			this.emit(':ask', dialogue.pickPhrase(dialogue.phrases.help.generic),dialogue.pickPhrase(dialogue.phrases.help.generic));
		}
	},
    'AMAZON.HelpIntent': function () {
		this.emit(':ask', dialogue.pickPhrase(dialogue.phrases.help.generic),dialogue.pickPhrase(dialogue.phrases.help.generic));
    },
    'AMAZON.CancelIntent': function () {
		this.emit(':tell', dialogue.pickPhrase(dialogue.phrases.generic.stop),dialogue.pickPhrase(dialogue.phrases.generic.stop));
    },
    'AMAZON.StopIntent': function () {
		this.emit(':tell', dialogue.pickPhrase(dialogue.phrases.generic.stop),dialogue.pickPhrase(dialogue.phrases.generic.stop));
    },
    'SessionEndedRequest': function () {
		this.emit(':tell', dialogue.pickPhrase(dialogue.phrases.generic.stop),dialogue.pickPhrase(dialogue.phrases.generic.stop));
    },
    'Unhandled': function() {
		this.emit(':tell', dialogue.pickPhrase(dialogue.phrases.help.generic),dialogue.pickPhrase(dialogue.phrases.help.generic));
	}
};

