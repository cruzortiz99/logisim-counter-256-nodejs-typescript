import fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, 'counter-256.txt')
const file = fs.createWriteStream(filePath)

file.write('v2.0 raw\n')

type CounterWriter = (count: number, file: fs.WriteStream) => void

const transformToHex = (count: number) => {
  switch (count) {
    case 15:
      return 'F'
    case 14:
      return 'E'
    case 13:
      return 'D'
    case 12:
      return 'C'
    case 11:
      return 'B'
    case 10:
      return 'A'
    default:
      return `${count}`
  }
}

export const writeBinary: CounterWriter = (
  count: number,
  file: fs.WriteStream
) => {
  let mods: Array<string> = []
  let mod = count % 16
  mods.push(transformToHex(mod))
  let res = Math.floor(count / 16)
  while (res >= 16) {
    mod = res % 16
    mods.push(transformToHex(mod))
    res = Math.floor(res / 16)
  }
  mods.push(transformToHex(res))
  mods.push(transformToHex(0))
  file.write(mods.reverse().join(''))
}

const count = (module: number, file: fs.WriteStream) => {
  let directions: ['asc', 'desc'] = ['asc', 'desc']
  let encoded: ['binary', 'bcd'] = ['binary', 'bcd']
  directions.forEach((dir) => {
    let ep = 0
    for (ep; ep < module; ep++) {
      if (dir === 'asc') {
        writeBinary(ep + 1, file)
      } else {
        writeBinary(ep - 1, file)
      }
      file.write(' ')
    }
    file.write('\n')
  })
}

count(256, file)
