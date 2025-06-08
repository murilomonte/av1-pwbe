const express = require('express')
const app = express()
const port = 3000

// roteamentos
const router = require('./routes/router')

const expressLayouts = require('express-ejs-layouts')

app.set('views', 'views')

app.set('view engine', 'ejs')

app.use(expressLayouts);

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})