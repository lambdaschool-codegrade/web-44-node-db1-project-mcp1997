const router = require('express').Router()
const Account = require('./accounts-model')

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(accounts => {
      if (!accounts) {
        res.send([])
      } else {
        res.status(200).json(accounts)
      }
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  Account.getById(req.params.id)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(next)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const { budget } = req.body
  const trimmedName = req.body.name.trim()
  const trimmedReqBody = { name: trimmedName, budget: budget }

  Account.create(trimmedReqBody)
    .then(account => {
      res.status(201).json(account)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const { budget } = req.body
  const trimmedName = req.body.name.trim()
  const trimmedReqBody = { name: trimmedName, budget: budget }

  Account.updateById(req.params.id, trimmedReqBody)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Account.deleteById(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
