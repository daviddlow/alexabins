var expect = require('chai').expect;
var index = require('../src/index');
var dialogue = require('../src/helpers/getDialogue');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe("Testing standard LaunchRequest", function() {
	var speechResponse = null
	var speechError = null

	before(function(done) {
		index.handler({
  "session": {
    "sessionId": "SessionId.8172bbca-6eb5-49ec-8de4-2e926dde6ac9",
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
    "type": "LaunchRequest",
    "requestId": "EdwRequestId.cd12c69d-276e-4041-97cd-9dc9c67bf1cf",
    "locale": "en-GB",
    "timestamp": "2017-06-17T15:24:01Z"
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
			expect(speechResponse.response.shouldEndSession).to.be.false
		})

		it("should have a welcome message and reprompt from the getDialogue function Welcome array", function() {
			expect(speechResponse.response.outputSpeech.ssml).to.equal(dialogue.ssmlIfy(dialogue.pickPhrase(dialogue.phrases.welcome.prompt)));
			expect(speechResponse.response.reprompt.outputSpeech.ssml).to.equal(dialogue.ssmlIfy(dialogue.pickPhrase(dialogue.phrases.welcome.reprompt)));
		})

	})
})
