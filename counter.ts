import fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, 'counter-256.txt')
const file = fs.createWriteStream(filePath)

type CounterWriter = (count: number, file: fs.WriteStream) => void
type Counter = (module: number, file: fs.WriteStream) => void

const writeBinary: CounterWriter = (count: number, file: fs.WriteStream) => {
  file.write(`${count}`)
}
const writeBCD: CounterWriter = (count: number, file: fs.WriteStream) => {
  file.write(`${count}`)
}

const writeCountIn = (
  count: number,
  encoding: 'bcd' | 'binary',
  file: fs.WriteStream
) => {
  switch (encoding) {
    case 'bcd':
      writeBCD(count, file)
      break
    case 'binary':
      writeBinary(count, file)
      break
  }
  file.write(' ')
}

const counterAsc: Counter = (module, file) => {
  let coded: ['binary', 'bcd'] = ['binary', 'bcd']
  coded.forEach((code) => {
    let i = 0
    for (i; i < module; i++) {
      writeCountIn(i, code, file)
    }
    file.write('\n')
  })
}
const counterDes: Counter = (module, file) => {
  let coded: ['binary', 'bcd'] = ['binary', 'bcd']
  coded.forEach((code) => {
    let i = module - 1
    for (i; i >= 0; i--) {
      writeCountIn(i, code, file)
    }
    file.write('\n')
  })
}

counterAsc(10, file)
counterDes(10, file)
