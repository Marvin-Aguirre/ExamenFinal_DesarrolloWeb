const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { config } = require("../config/sql_server");

router.get('/', async (req, res, next) => {
    let data = [];

    try {
        await sql.connect(config);
        const resultado = await sql.query("SELECT id, Nombre, Precio, Codigo, Existencia FROM Producto");
        data = resultado.recordset;
    } catch (err) {
        console.error(err);
        data = err;
        res.status(500).send(data); // Internal server error
    }
    res.send(data);
});

router.get('/:id', async (req, res, next) => {
    let data = {};

    try {
        const connection = await sql.connect(config);
        const resultado = await connection.request()
            .input("id", sql.Int, req.params.id)
            .query("SELECT id, Nombre, Precio, Codigo, Existencia FROM Producto WHERE id = @id");
        data = resultado.recordset[0];
    } catch (err) {
        console.error(err);
        data = err;
        res.status(500).send(data); // Internal server error
    }
    res.send(data);
});

router.put('/:id', async (req, res, next) => {
    let data = {};
    const { Nombre, Precio, Codigo, Existencia } = req.body;

    try {
        const connection = await sql.connect(config);
        const resultado = await connection.request()
            .input("id", sql.Int, req.params.id)
            .query("SELECT id, Nombre, Precio, Codigo, Existencia FROM Producto WHERE id = @id");

        if (resultado.recordset.length > 0) {
            const result = await connection.request()
                .input("Nombre", sql.VarChar, Nombre)
                .input("Precio", sql.VarChar, Precio)
                .input("Codigo", sql.VarChar, Codigo)
                .input("Existencia", sql.VarChar, Existencia)
                .input("id", sql.Int, req.params.id)
                .query("UPDATE Producto SET Nombre=@Nombre, Precio=@Precio, Codigo=@Codigo, Existencia=@Existencia WHERE id=@id");
            data = result.rowsAffected;
        }
    } catch (err) {
        console.error(err);
        data = err;
        res.status(500).send(data); // Internal server error
    }
    res.send(data);
});

router.post("/", async (req, res, next) => {
    const producto = req.body;
    let resultado = {};

    try {
        let connection = await sql.connect(config);
        const result = await connection.request()
            .input("Nombre", sql.VarChar, producto.Nombre)
            .input("Precio", sql.VarChar, producto.Precio)
            .input("Codigo", sql.VarChar, producto.Codigo)
            .input("Existencia", sql.VarChar, producto.Existencia)
            .query("INSERT INTO Producto(Nombre, Precio, Codigo, Existencia) VALUES (@Nombre, @Precio, @Codigo, @Existencia)");
        resultado = result.rowsAffected;
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
    res.send(resultado);
});

router.delete('/:id', async (req, res, next) => {
    let data = {};

    try {
        const connection = await sql.connect(config);
        const resultado = await connection.request()
            .input("id", sql.Int, req.params.id)
            .query("SELECT id FROM Producto WHERE id = @id");

        if (resultado.recordset.length > 0) {
            const result = await connection.request()
                .input("id", sql.Int, req.params.id)
                .query("DELETE from Producto where id=@id");
            data = result.rowsAffected;
        }
    } catch (err) {
        console.error(err);
        data = err;
        res.status(500).send(data); // Internal server error
    }
    res.send(data);
});

module.exports = router;
