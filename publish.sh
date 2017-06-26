#!/bin/bash
FUNCTIONNAME=alexabins
REGION=eu-west-1
CURRENT_TIME=$(date "+%Y.%m.%d-%H.%M.%S")
FILENAME=$FUNCTIONNAME-$CURRENT_TIME".zip"

echo ---- Removing any existing zip files ----
cd ../dist
rm -Rf $FUNCTIONNAME
mkdir $FUNCTIONNAME
echo ---- Copying source files to dist folder ----
cd ../$FUNCTIONNAME
cp -r src/* ../dist/$FUNCTIONNAME/
cp package.json ../dist/$FUNCTIONNAME/
cd ../dist/$FUNCTIONNAME
echo ---- Create NPM package with only prod dependencies ----
npm install --production
echo ---- Zipping up contents of src folder ----
zip -r $FILENAME * > /dev/null
cd ..
echo ---- Updating Lambda function code ----
aws lambda update-function-code --function-name $FUNCTIONNAME --zip-file fileb://$FUNCTIONNAME/$FILENAME --region $REGION
cp $FUNCTIONNAME/$FILENAME archive/$FILENAME
echo ---- COMPLETE! ----

