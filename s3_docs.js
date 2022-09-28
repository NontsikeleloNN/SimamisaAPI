
const aws = require('aws-sdk')
const crypto = require('crypto')
const util=	require('util');
const randomBytes = util.promisify(crypto.randomBytes)


const region = " us-east-1"
const bucketName = "simamisa-documets"
//process.env for key protection
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const accessKeyId = "AKIAZHVEUUPQDQDEGUZS"
const secretAccessKey = "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"
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

const  generateUploadURL=async()=> {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')+".pdf"

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 300
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}
module.exports = {
    generateUploadURL,
}