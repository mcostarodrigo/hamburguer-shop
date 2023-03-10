const { request, response } = require("express")
const express = require("express")
const uuid = require('uuid') // para gerar id único universal. 
const port = 3000
const app = express()
app.use(express.json())

const allRequest = []

/*Middleware para verificação de id, e obtenção de index */

const checkRequestId = (request, response, next) => {

    const { id } = request.params

    const index = allRequest.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "Request not found" })
    }
    request.pedidoIndex = index
    request.pedidoId = id
    next()
}

/*Middleware para mostrar url e método. */

const showMethodUrl = (request, response, next) =>{
    console.log(request.method)
    console.log(request.url)
    next()
}



// Rota que lista todos os pedidos já feitos

app.get('/allRequest',showMethodUrl, (request, response) => {
    return response.json(allRequest)
})


// Adicionando novo pedido

app.post('/allRequest',showMethodUrl, (request, response) => {

    const { order, clientName, price, status } = request.body

    const newRequest = { id: uuid.v4(), order, clientName, price, status }

    allRequest.push(newRequest)

    return response.status(201).json(newRequest)

})

/* Essa rota deve alterar um pedido já feito. Pode alterar,um ou todos os dados do pedido.O id do pedido deve ser enviado 
nos parâmetros da rota.*/

app.put('/allRequest/:id', checkRequestId,showMethodUrl, (request, response) => {

    const { order, clientName, price, status } = request.body

    const index = request.pedidoIndex

    const id = request.pedidoId

    //const { id } = request.params

    //const id = request.pedidoId 

    //const index = allRequest.findIndex(user => user.id === id)

    const updateRequest = { id, order, clientName, price, status }

    allRequest[index] = updateRequest

    return response.json(updateRequest)
})

/*DELETE /order/:id: Essa rota deve deletar um pedido já feito com o id enviado nos parâmetros da rota.*/

app.delete('/allRequest/:id',checkRequestId,showMethodUrl, (request, response) => {
   
    const index = request.pedidoIndex

    const id = request.pedidoId
    
    /*const { id } = request.params

    const index = allRequest.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "Request not found" })
    }*/

    allRequest.splice(index, 1)

    return response.status(204).json()
})

/*GET /order/:id: Essa rota recebe o id nos parâmetros e deve retornar um pedido específico*/

app.get('/allRequest/:id',checkRequestId, showMethodUrl,(request, response) => {

    const index = request.pedidoIndex

    const id = request.pedidoId
    
    /*const { id } = request.params

    const index = allRequest.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Request not found" })
    }*/

    const show = allRequest[index]

    return response.json(show)
})

/*PATCH /order/:id: Essa rota recebe o id nos parâmetros e assim que ela for chamada, deve alterar o status do pedido recebido 
pelo id para "Pronto".*/

app.patch('/allRequest/:id',checkRequestId,showMethodUrl,(request, response) => {

    /*const { id } = request.params*/

    const index = request.pedidoIndex

    const id = request.pedidoId

    const { order, clientName, price, status } = request.body

    /*const index = allRequest.findIndex(user => user.id === id)*/

    const callOrder = allRequest[index]

    callOrder.status = "Pronto"

    return response.json(callOrder)

})



app.listen(port, () => {
    console.log(`server started on port ${port}`)
})