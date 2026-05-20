const express = require("express");

const router = express.Router();

const { 
    cadastrar, 
    listar, 
    buscar, 
    atualizar, 
    excluir 
} = require("../controller/carro.controller");

router.post("/cadastrar", cadastrar); //TESTADO
router.get("/listar", listar); //TESTADO
router.get("/buscar/:placa", buscar); //TESTADO
router.put("/atualizar/:placa", atualizar); //TESTADO
router.delete("/excluir/:placa", excluir); //TESTADO

module.exports = router;