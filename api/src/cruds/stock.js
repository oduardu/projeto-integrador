const { db } = require("../database/connection")

// CREATE
exports.addStock = async (req, res) => {
    console.log("Adicionando estoque")
}

// READ
exports.getStock = async (req, res) => {
    console.log("Listando estoque")
}

// UPDATE
exports.updateStock = async (req, res) => {
    console.log("Atualizando estoque")
}

// DELETE
exports.deleteStock = async (req, res) => {
    console.log("Removendo estoque")
}