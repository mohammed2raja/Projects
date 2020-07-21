const router = require('express').Router()
const verify = require('../verifyToken')

router.get('/', verify, (req, res) => {
  res.json({
    posts: {
      title: 'my first post',
      description: 'Random post about random subject'
    }
  })
})


module.exports = router