// Importando as dependências necessárias
import express, { json } from 'express';
import { model, connect } from 'mongoose';
import cors from "cors";

// Inicializando o aplicativo Express
const app = express();
app.use(json()); // Habilita o uso de JSON no corpo das requisições
app.use(cors());
const port = 8800;

// Definindo o modelo de dados do produto usando o Mongoose
const Product = model('Product', {
    name: String,
    codigo: Number,
    descricao: String,
    preco: Number,
});

// Rota para obter todos os produtos (GET)
app.get('/', async (req, res) => {
    const products = await Product.find(); // Consulta todos os produtos no banco de dados
    return res.send(products);
});

// Rota para excluir um produto por ID (DELETE)
app.delete("/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id); // Encontra e exclui um produto por ID
    return res.send(product);
});

// Rota para atualizar um produto por ID (PUT)
app.put("/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        // Atualiza os campos do produto com os dados fornecidos no corpo da requisição
        name: req.body.name,
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        preco: req.body.preco,
    });
    return res.send(product);
});

// Rota para criar um novo produto (POST)
app.post("/", async (req, res) => {
    const product = new Product({
        // Cria um novo produto usando os dados fornecidos no corpo da requisição
        name: req.body.name,
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        preco: req.body.preco,
    });

    await product.save(); // Salva o novo produto no banco de dados
    return res.send(product);
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    connect('mongodb+srv://vinnievandro:fOXkDwY06m0lKt25@bestminds-api.joegntq.mongodb.net/?retryWrites=true&w=majority');
    console.log(`Example app listening on port ${port}`);
});
