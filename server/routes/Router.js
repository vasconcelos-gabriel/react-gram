const express = require('express')

const router = express()

router.use("/api/users", require("./UserRouter"))

// test rout
 router.get("/", (req, res) => {
  res.send("API Working!")
 })

module.exports = router
