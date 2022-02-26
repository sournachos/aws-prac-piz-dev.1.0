const {
  DynamoDBClient
} = require('@aws-sdk/client-dynamodb')
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand
} = require('@aws-sdk/lib-dynamodb')

function getClient () {
  const marshallOptions = {
    convertClassInstanceToMap: true
  }
  const client = new DynamoDBClient({ region: 'us-east-2' })
  return DynamoDBDocumentClient.from(client, { marshallOptions })
}

async function putItem (table, item) {
  const params = {
    TableName: table,
    Item: item
  }
  const client = getClient()
  const command = new PutCommand(params)
  return client.send(command)
}

async function getAllItems (table) {
  const params = {
    TableName: table
  }
  const client = getClient()
  const command = new ScanCommand(params)
  const response = await client.send(command)
  return response.Items
}

async function getItem (table, idKey, id) {
  const params = {
    TableName: table,
    Key: {
      [idKey]: id
    }
  }
  const client = getClient()
  const command = new GetCommand(params)
  const response = await client.send(command)
  return response.Item
}

module.exports = {
  putItem,
  getAllItems,
  getItem
}