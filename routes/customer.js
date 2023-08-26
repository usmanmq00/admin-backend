const express = require('express')
const router = express.Router()
const adminRequireAuth = require("../middleware/adminRequireAuth");

router.get('/', adminRequireAuth, (req, res) => {
    res.send('Customer')
})

module.exports = router