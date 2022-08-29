let express = require('express')
let router = express.Router()
let storeModel = require('../models/store')

/**
* @swagger
* components:
*   schemas:
*     Store: 
*       type: object
*       required:
*         - name
*         - adress
*         - category
*         - rating
*       properties:
*         name:
*           type: string
*         adress:
*           type: string
*         category:
*           type: string
*         rating:
*           type: number
*       example:
*            name: Compra Gamer
*            adress: Gamer Avenue 420
*            category: Electronics
*            rating: 5
*/


/**
*  @swagger
*  /store:
*   post:
*     summary: Create a new store
*     tags: [Stores]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/Store'
*     responses:  
*       200:
*         description: New store created!
*/
router.post('/store', (req, res)=>{
     if(!req.body){
        return res.status(400).send('Request body is missing')
     }     
     let model = new storeModel(req.body)
     model.save()
     .then(doc =>{
        if(!doc || doc.length === 0){
            return res.status(500).send(doc)
        }        
        res.status(201).send(doc)        
     })
     .catch(err => {
        res.status(500).json(err)
     })     
})

/**
*  @swagger
*  /stores:
*   get:
*     summary: Gets all stores
*     tags: [Stores]
*     responses:  
*       200:
*         description: All stores!
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Store'
*/
router.get('/stores', (req, res) =>{
    storeModel.find()
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



/**
*  @swagger
*  /store/{name}:
*   delete:
*     summary: deletes a store
*     tags: [Stores]
*     parameters:
*       - in: path
*         name: name
*         schema:
*           type: string
*         required: true
*         description: the store name
*     responses:
*       200:
*         description: store deleted
*       400:
*         description: store not found
*
 */
router.delete('/store/:name', (req, res) =>{
    const name  = req.params.name
    storeModel
    .deleteMany({
        name: name
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

/**
*  @swagger
*   /store/{name}:
*   put:
*     summary: update a store
*     tags: [Stores]
*     parameters:
*       - in: path
*         name: name
*         schema:
*           type: string
*         required: true
*         description: the store name
*     requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Store'
*     responses:
*       200:
*         description: store modified correctly
*       400:
*         description: store was not found
 */
router.put('/store/:name', (req, res) =>{
    const name = req.params.name
    const { adress, rating, category } = req.body
    storeModel
    .updateOne(
        {name: name},
        {
            adress: adress,
            rating: rating,
            adress: adress
        })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router