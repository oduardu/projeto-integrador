const { db } = require("../database/connection")

// CREATE
exports.addSupplier = async (req, res) => {
    console.log("Adicionando fornecedor")
}

// READ
exports.getSupplier = async (req, res) => {
   console.log("Listando fornecedor(es)")
}

// UPDATE
exports.updateSupplier = async (req, res) => {
    console.log("Atualizando fornecedor")
}

// DELETE
exports.deleteSupplier = async (req, res) => {
    console.log("Removendo fornecedor")
}
