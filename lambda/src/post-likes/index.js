const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB({ region: 'eu-central-1' });
const tableName = process.env.TABLE_NAME;

exports.lambdaHandler = async () => {
  await dynamodb.updateItem({
    TableName: tableName,
    Key: {
      'key': { S: 'total' }
    },
    UpdateExpression: 'ADD #value :val',
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
