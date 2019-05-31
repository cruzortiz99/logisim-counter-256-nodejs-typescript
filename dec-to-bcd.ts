import fs from 'fs'
import path from 'path'
import { writeBinary } from './counter'

const filePath = path.join(__dirname, 'binary-bcd.txt')
const file = fs.createWriteStream(filePath)

file.write('v2.0 raw\n')

const decToBcd = (module: number, file: fs.WriteStream) => {
  const mode: ['binary', 'bcd'] = ['binary', 'bcd']
  mode.forEach((mode) => {
    let ep = 0
    for (ep; ep < module; ep++) {
      switch (mode) {
        case 'binary':
          writeBinary(ep, file)
          break
        case 'bcd':
          file.write(`${ep}`)
          break
      }
      file.write(' ')
    }
    file.write('\n')
  })
}
decToBcd(256, file)
