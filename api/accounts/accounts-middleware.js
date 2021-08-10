const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (!name || !budget) {
    res.status(400).json({
      message: 'name and budget are required'
    })
  } else if (typeof name !== 'string') {
    res.status(400).json({
      message: 'name of account must be a string'
    })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({
      message: 'name of account must be between 3 and 100'
    })
  } else if (typeof budget !== 'number') {
    res.status(400).json({
      message: 'budget of account must be a number'
    })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({
      message: 'budget of account is too large or too small'
    })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const existingName = await db('accounts').where('name', req.body.name).first()
  if (existingName) {
    res.status(400).json({
      message: 'that name is taken'
    })
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  const existingID = await db('accounts').where('id', req.params.id).first()
  if (!existingID) {
    res.status(404).json({
      message: 'account not found'
    })
  } else {
    next()
  }
}
