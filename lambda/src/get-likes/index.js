const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB({ region: 'eu-central-1' });
const tableName = process.env.TABLE_NAME;

exports.lambdaHandler = async () => {
  const result = await dynamodb.getItem({
    TableName: tableName,
    Key: {
      'key': { S: 'total' }
    }
  }).promise();

  const value = (() => {
    if (result.Item && result.Item['value'] && result.Item['value'].N) {
      return result.Item['value'].N;
    } else {
      return '0';
    }
  })();

  return {
    statusCode: 200,
    body: value
  };
}
