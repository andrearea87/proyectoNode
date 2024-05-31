//console.log("Hola Mundo");

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
res.send('Hello World! desde get')
})

app.post('/', (req, res) => {
    res.send('Hello World! desde post')
    })

app.put('/', (req, res) => {
        res.send('Hello World! desde put')
        })   
app.delete('/', (req, res) => {
            res.send('Hello World! desde delete')
    })     

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})