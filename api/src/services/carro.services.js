const prisma = require("../data/prisma");

const placaDuplicada = async (placa) => {
    const existente = await prisma.carro.findUnique({
        where: { placa }
    });

    if (existente) {
        throw new Error("Já existe um automóvel com essa placa");
    }
};


const carroExiste = async (placa) => {
    const carro = await prisma.carro.findMany({
        where: { placa }
    });

    if (!carro) {
        throw new Error("Automóvel não encontrado");
    }

    return carro;
};

const podeExcluirCarro = async (placa) => {
    const alojamento = await prisma.alojamento.findFirst({
        where: {
            placa,
            saida: null
        }
    });

    if (alojamento) {
        throw new Error("Automóvel possui alojamento ativa");
    }
};

module.exports = {
    placaDuplicada,
    carroExiste,
    podeExcluirCarro
};