var expect = require('chai').expect;
var index = require('../src/index');
var dialogue = require('../src/helpers/getDialogue');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe("Testing an Intent request for binsIntent - BLUE", function() {
	var speechResponse = null
	var speechError = null

	before(function(done) {
		index.handler({
  "session": {
    "sessionId": "SessionId.4dd4aa2f-7e97-4bad-8bc0-f38714fe891e",
    "application": {
      "applicationId": "amzn1.ask.skill.1a302baf-75e1-4a7e-bfa9-d495664fc60c"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AGS2K6E2MQPOPRLEVD7C6ROY5L7CTQKTPZSW7APWERU2IQRJUYK5HGYL3GSRKWTDGHYRCOPFRQ5U7XMBLSGEITVI6AJDF6TXILNBC344S3WTNF4EPB57BDZFAFYAEOOO2DY2TLTL3EBLEONI5KOI35KRMU4IGYUSX5DZ3VPKLPGAIDEMDIXOFMYSROOAEUDA2EKKYLBH67LQTIQ"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.3a76b4ed-9109-4e68-a71c-abc0aa165ca9",
    "locale": "en-GB",
    "timestamp": "2017-06-17T15:28:48Z",
    "intent": {
      "name": "binsIntent",
      "slots": {
        "colour": {
          "name": "colour",
          "value": "blue"
        }
      }
    }
  },
  "version": "1.0"
}, ctx)

		ctx.Promise
			.then(resp => {
				speechResponse = resp;
				done();
			})
			.catch(err => {
				speechError = err;
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

		it("should not end the alexa session", function() {
			expect(speechResponse.response.shouldEndSession).not.to.be.null
			expect(speechResponse.response.shouldEndSession).to.be.true
		})

		it("should have speechOutput from the getDialogue function bins > green array", function() {
			expect(speechResponse.response.outputSpeech.ssml).to.equal(dialogue.ssmlIfy(dialogue.pickPhrase(dialogue.phrases.bins.blue)));
		})

	})
})