const {
  PutObjectCommand,
  S3Client
} = require('@aws-sdk/client-s3')

module.exports.save = async (name, data) => {
  const params = {
    Bucket: 'pizza-luvrs-a-unique-string-ryan',
    Key: `pizzas/${name}.png`,
    Body: Buffer.from(data, 'base64'),
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  }
  const client = new S3Client({ region: 'us-east-2' })
  const command = new PutObjectCommand(params)
  await client.send(command)

  return `//pizza-luvrs-a-unique-string-ryan.s3.us-east-2.amazonaws.com/${params.Key}`
}