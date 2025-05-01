const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createProduct = async (req, res) => {
  const { name, price, category } = req.body
  const product = await prisma.product.create({ data: { name, price, category } })
  res.json(product)
}

exports.getProducts = async (req, res) => {
  const products = await prisma.product.findMany()
  res.json(products)
}

exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const updated = await prisma.product.update({ where: { id: Number(id) }, data })
  res.json(updated)
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  await prisma.product.delete({ where: { id: Number(id) } })
  res.status(204).send()
}
