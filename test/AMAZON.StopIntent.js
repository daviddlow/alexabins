var expect = require('chai').expect;
var index = require('../src/index');
var dialogue = require('../src/helpers/getDialogue');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe("Testing AMAZON.StopIntent", function() {
	var speechResponse = null
	var speechError = null

	before(function(done) {
		index.handler({
  "session": {
    "sessionId": "SessionId.9548e1a4-f352-4603-826d-7b3efced474a",
    "application": {
      "applicationId": "amzn1.ask.skill.1a302baf-75e1-4a7e-bfa9-d495664fc60c"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AF5G7Z7FGZXK5WQS2DZS4WLSGWDF7K5QGQ4WC5P44SIEFJW2MHKVZXX4TXPMCAAQFEIOYHRCIRS4LBMHYXRUE5ZCBYDYB4CCR5LTLXUVN6YKDHTRDPZIKOEUEZ7JRJEEXU3KNAEUV5J2RUVSJIFJ6DUNYMVXW2LQWQPKALAL6OQK5I7HH62FT66GTZISDXAW4CJSFAZGAXTKXVI"
    },
    "new": false
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.5180d7ed-a43e-47ac-8f63-6c156950ae82",
    "locale": "en-GB",
    "timestamp": "2017-06-26T10:08:02Z",
    "intent": {
      "name": "AMAZON.StopIntent",
      "slots": {}
    }
  },
  "version": "1.0"
}, ctx)

		ctx.Promise
			.then(resp => {
				speechResponse = resp;
				console.log(speechResponse);
				done();
			})
			.catch(err => {
				speechError = err;
				console.log(speechError);
				done();
			})
	})

	describe("The response is structurally correct for Alexa Speech Services", function() {
		it('should not have errored', function() {
			expect(speechError).to.be.null
		})

		it('should have a version', function() {
			expect(speechResponse.version).not.to.be.null
		})

		it('should have a speechlet response', function() {
			expect(speechResponse.response).not.to.be.null
		})

		it('should have session attributes', function() {
			expect(speechResponse.response.sessionAttributes).not.to.be.null
		})

		it("should have a spoken response", () => {
			expect(speechResponse.response.outputSpeech).not.to.be.null
		})

		it("should have a spoken response", () => {
			expect(speechResponse.response.outputSpeech).not.to.be.null
		})

		it("should not end the alexa session", function() {
			expect(speechResponse.response.shouldEndSession).not.to.be.null
			expect(speechResponse.response.shouldEndSession).to.be.true
		})

		it("should have a closing message from the getDialogue function Generic > Stop array", function() {
			expect(speechResponse.response.outputSpeech.ssml).to.equal(dialogue.ssmlIfy(dialogue.pickPhrase(dialogue.phrases.generic.stop)));
		})

	})
})
