const { db } = require("../database/connection")

// CREATE
exports.addProduct = async (req, res) => {
    console.log("Adicionando produto")
}

// READ
exports.getProduct = async (req, res) => {
    console.log("Listando produto(s)")
}

// UPDATE
exports.updateProduct = async (req, res) => {
    console.log("Atualizando produto")
}


// DELETE
exports.deleteProduct = async (req, res) => {
    console.log("Removendo produto")
}