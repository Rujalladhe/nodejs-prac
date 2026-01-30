// read 
//write 
//duplex -> both read and write 
//TRANSFORM -> zlib streams 
const fs  = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const {Transform}= require('stream');


class EncryptStream extends Transform {
    constructor(key,vector){
        super()
        this.key = key ;
        this.vector = vector ;


    }
    _transform(chunk,encoding,callback) {
        // = cipher = (algorith,key,options(vector))
    const cipher = crypto.createCipheriv('aes-256-cbc',this.key,this.vector)
    const encrypted = Buffer.concat([cipher.update(chunk),cipher.final()])
    this.push(encrypted)
    callback()
}
}
const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);
const readableStream = fs.createReadStream('input.txt');
//compress data 
const gzipString = zlib.createGzip()
const encryptStream = new EncryptStream(key,vector) 
const writeablestram = fs.createWriteStream('output.txt.gz.enc');
//read - compresss - encrypt-write 
readableStream.pipe(gzipString).pipe(encryptStream).pipe(writeablestram);
console.log("streaminh-compresing-encryping-writing")

