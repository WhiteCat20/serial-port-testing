var express = require('express')
var app = express()
var cors = require('cors')
var { SerialPort } = require('serialport')

var path = 'COM3'
var port = new SerialPort(
  {
    path,
    baudRate: 9600,
  },
  (err) => {
    if (err != null) {
      console.log(err)
      return
    }
  },
)

app.use(cors())
app.use(express.static(__dirname))

var stream
app.get('/data', (req, res) => {
  port.setMaxListeners(9000)
  port.on('data', (data) => {
    data = JSON.stringify(data)
    data = JSON.parse(data)
    stream = data
  })
  res.json(stream)
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})
