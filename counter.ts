import fs from 'fs'
import path from 'path'
const binaryRoute = path.join(__dirname, 'counter-256.bin')
const binaryFile = fs.createWriteStream(binaryRoute)

const counter = (module: number) => {
  let i = 0
  for (i = 0; i < module; i++) {
    binaryFile.write(`${i} `, 'binary')
  }
}

counter(256)
