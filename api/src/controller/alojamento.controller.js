const prisma = require("../data/prisma");
const service = require("../services/alojamento.services");

const cadastrar = async (req, res) => {
    try {
        const { placa, valorHora } = req.body;

        await service.carroExiste(placa);
        await service.carroJaEstacionado(placa);

        const item = await prisma.alojamento.create({
            data: {
                placa,
                valorHor
            }
        });

        res.status(201).json(item);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const listar = async (req, res) => {
    try {
        const lista = await prisma.alojamento.findMany({
            include: { carro: true }
        });

        res.status(200).json(lista);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.alojamento.findUnique({
            where: { id: Number(id) },
            include: { carro: true }
        });

        if (!item) throw new Error("Alojamento não encontrada");

        res.status(200).json(item);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        const alojamento = await service.validarSaida(Number(id));

        const valorTotal = service.calcularValor(
            alojamento.entrada,
            alojamento.valorHora
        );

        const item = await prisma.alojamento.update({
            where: { id: Number(id) },
            data: {
                saida: new Date(),
                valorTotal
            }
        });

        res.status(200).json(item);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.alojamento.delete({
            where: { id: Number(id) }
        });

        res.status(200).json(item);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};