# Alexa public information prototype
Prototype for delivering static information on bin collection info

*Requirements:*

* [NodeJS](https://nodejs.org/en/) (6.10 LTS preferred but should work on higher versions)
* AWS Lambda access with the [AWS CLI](https://aws.amazon.com/cli/) installed and set up with your credentials

To enable this, test and go live:

* Create a local directory of your choosing
* Clone the repo to that directory
* In the root, run `npm install`
* To ensure everything has installed collrectly, run `npm test`

At this point you should see a suite of unit tests running.

To go live to Lambda, firstly set up a function of your choosing, with the Alexa Skills Kit trigger, then:

* Change the $FUNCTIONNAME and $REGION values in publish.sh to your own choices
* Run `sh ./publish.sh` 

The code should be published to your own Lambda function.  You can run a sample LaunchRequest from the Lambda console.  

To set up the Alexa skill

* Go to [Amazon Developer](http://developer.amazon.com) and set up a new skill
* Use Skill Builder's Code Editor and the InteractionModel.json file under "speechAssets" here, to populate your intents, slot values and utterances
* Go back to the code and in `index.js` change the `alexa.appId` to the new skill ID you just created.
* Test the skill against the Lambda function created earlier.
