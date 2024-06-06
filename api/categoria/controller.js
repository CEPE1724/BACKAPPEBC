const Categoria = require("./model");

exports.create = async (req, res) => {
    try {
        const categoria = new Categoria(req.body);
        await categoria.save();
        res.status(201).send(categoria);
    } catch (error) {
        res.status(500).send
    }
}

exports.getAll = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).send(categorias);
    } catch (error) {
        res.status(500).send
    }
}
