const { request } = require("express")
const express = require("express")

const port = 3000

const app = express()

const novoPedido = []

app.post('/novopedido', (request, response) => {

    const resposta = {order,clientName,price,status} = request.body

    novoPedido.push(resposta)

    return response.status(201).json
})

app.listen(port , () => {
    console.log(`server started on port ${port}`)
})

app.get('/novopedido', (request, response) => {
    return response.json(novoPedido)
})