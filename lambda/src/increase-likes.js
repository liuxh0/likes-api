const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB({ region: 'eu-central-1' });

exports.handler = async () => {
  const a = await dynamodb.updateItem({
    TableName: 'Likes-Stats',
    Key: { 'key': { S: 'total' }},
    UpdateExpression: 'SET #value = #value + :val',
    ExpressionAttributeNames: {
      '#value': 'value'
    },
    ExpressionAttributeValues: {
      ':val': { N: '1' }
    }
  }).promise();

  return {
    statusCode: 200
  };
}
