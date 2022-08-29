let express = require('express')
let app = express()
let storeRoute = require('./routes/store')
let bodyParser = require('body-parser')
let swaggerUI = require('swagger-ui-express')
let swaggerJSDocument = require('swagger-jsdoc')

//Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "My stores API",
            description: "A descriptive description!",
            contact: {
                name: "me"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["src/routes/*.js"]
}

const swaggerDocs = swaggerJSDocument(swaggerOptions)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//----------------------------------------------------------------------

// Main middlewares
app.use(bodyParser.json())
app.use( (req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})
app.use(storeRoute)
app.use( (req, res, next) =>{
    res.status(404).send('We think you are lost!')
})
app.use( (err, req, res, next) =>{
    console.error(err.stack)
    res.status(500).send('There was an internal server error!')
})

//---------------------------------------------------------------------


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))

