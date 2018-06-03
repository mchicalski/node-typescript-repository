import { createConnection } from 'mongoose'

const mongouri : string = `mongodb://localhost/ts`
const mongoconn = createConnection(mongouri)
const mongomsg = (msg : string) => () => { console.log('MongoDB:', msg) }

mongoconn.on('connected', mongomsg(`Connected to ${mongouri}`))
mongoconn.on('open', mongomsg('Connection openned'))
mongoconn.on('close', mongomsg('Connection closed'))
process.on('SIGINT', function () {
  mongoconn.close()
  mongomsg('Closed by SIGINT')()
  process.exit(0)
})

export default mongoconn