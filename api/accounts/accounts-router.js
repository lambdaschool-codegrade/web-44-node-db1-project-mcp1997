const router = require('express').Router()
const Account = require('./accounts-model')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(accounts => {
      console.log('working')
      if (!accounts) {
        res.send([])
      } else {
        res.status(200).json(accounts)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
})

router.get('/:id', (req, res, next) => {
  
})

router.post('/', (req, res, next) => {
  
})

router.put('/:id', (req, res, next) => {
  
});

router.delete('/:id', (req, res, next) => {
  
})

router.use((err, req, res, next) => { // eslint-disable-line
  
})

module.exports = router;
