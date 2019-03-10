const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB({ region: 'eu-central-1' });

exports.handler = async () => {
  const result = await dynamodb.getItem({
    TableName: 'Likes-Stats',
    Key: {
      'key': { S: 'total' }
    }
  }).promise();

  const value = result.Item['value'].N;
  return {
    statusCode: 200,
    body: value
  };
}
