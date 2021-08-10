const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = (id) => {
  return db('accounts').where('id', id).first()
}

const create = async (account) => {
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return newAccount
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  const updatedPost = await getById(id)
  return updatedPost
}

const deleteById = async (id) => {
  const deleted = await getById(id)
  let deletedCopy = JSON.parse(JSON.stringify(deleted))
  await db('accounts').where('id', id).del()
  return deletedCopy
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
