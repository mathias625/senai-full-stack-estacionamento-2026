const prisma = require("../data/prisma");

const carroJaEstacionado = async (placa) => {
    const existente = await prisma.alojamento.findFirst({
        where: {
            placa,
            saida: null
        }
    });

    if (existente) {
        throw new Error("Automóvel já estacionado");
    }
};

const carroExiste = async (placa) => {
    const carro = await prisma.carro.findMany({
        where: { placa: placa }
    });

    if (!carro) {
        throw new Error("Automóvel não encontrado");
    }
};

const validarSaida = async (id) => {
    const alojamento = await prisma.alojamento.findUnique({
        where: { id }
    });

    if (!alojamento) {
        throw new Error("Alojamento não encontrada");
    }

    if (alojamento.saida) {
        throw new Error("Alojamento já finalizada");
    }

    return alojamento;
};

const calcularValor = (entrada, valorHora) => {
    const agora = new Date();
    const diff = agora - new Date(entrada);
    const horas = diff / (1000 * 60 * 60);

    return Number((horas * valorHora).toFixed(2));
};


module.exports = {
    carroExiste,
    carroJaEstacionado,
    validarSaida,
    calcularValor
};