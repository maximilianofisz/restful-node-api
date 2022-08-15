let express = require('express')
let router = express.Router()
let storeModel = require('../models/store')

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

router.get('/stores', (req, res) =>{
    storeModel.find()
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/stores', (req, res) =>{
    storeModel.findOneAndRemove({
        name: req.query.name
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

//TODO
// router.put()








module.exports = router