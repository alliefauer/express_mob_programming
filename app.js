const express = require('express')
const app = express()
const models = require('./models')


models.db.sync({force: true})
.then(() => {
app.listen(8080, function() {
		console.log("Listening on 8080")
    })
})