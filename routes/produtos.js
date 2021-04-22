const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require('mongoose');
const produtos = require('../models/produtos');

router.get('/', (req, res) =>{
    produtos.find()
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((erro) => {
      res.status(500).json({
        erro: erro,
      });
      console.log(erro);
    });
});
router.put("/:id", (req, res) => {
    const  id  = req.params.id;
  
    const produtos =  produtos.findById(id);
  
    if (!produtos) {
      throw new Error("Produto não encontrado");
    }
  
    produtos.nome = req.body.nome;
    produtos.preco = req.body.preco;
  
     produtos.save();
  
    res.status(200).json({
      message: "Produto alterado com sucesso",
      produtos,
    });
  });
router.delete("/:produtoid", (req, res) => {
    
    const  id  = req.params.produtoid;
  
    const produtos =  produtos.findById(id);
  
    if (!produtos) {
        res.status(400).json({
            message: 'produto não encontrado'
        });
    }
  
    produtos.nome = req.body.nome;
    
    produtos.preco = req.body.preco;
  
    produtos.remove();
  
    res.status(200).json({
      message: "Produto removido",
    });
  });


router.get("/:id", (req, res) => {
    const  id = req.params.id;
  
    const produtos =  produtos.findById(id);
  
    if (!produtos) {
      throw new Error("Produto não encontrado");
    }
  
    res.status(200).json({
      produtos
    });
  });

router.post('/', (req, res) =>{

    const produto = new Produto({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        preco: req.body.preco
    });
    produto.save()
    .then(result => {

        res.status(201).json({
            message: 'POST Request para/produtos',
            produto: produto
        });

    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
   

    
});

module.exports = router;
