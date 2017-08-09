const router = require('express').Router()
const Restaurants = require('./models').Restaurant
const MenuItems = require('./models').MenuItem
const db = require('./models').db


//basic get route to '/' w/ message
app.get('/', (req, res) => res.send("Checkout all this cool food!!!!!"))


//get route to '/menuitems' to get ALL menu items. Include Restaurants model
app.get('/menuitems', (req, res, next) => {
    MenuItems.findAll()
        .then(menuitems => {
            res.send(menuitems)
        })
        .catch(next)
})


//get route to '/menuitems/:restaurantid 
app.get('/menuitems/:restaurantid', (req, res, next) => {
    MenuItems.findAll({
        where: { restaurantId: req.params.restaurantid }
    })
        .then(menuItems => res.send(menuItems))
        .catch(next)
})

//post new menu item
app.post('/menuitems', (req, res, next) => {
    MenuItems.create({
        name: req.body.name,
        calories: req.body.calories,
        isSpicy: req.body.isSpicy,
        restaurantId: req.body.restaurantId
    })
    .then(() => res.status(201).end())
    .catch(next)
})


//delete entire restaurant
app.delete('/menuitems/:restaurantid', (req, res, next) => {
    MenuItems.destroy({where: {id: req.params.restaurantid}})
    .then(() => res.status(204).end())
    .catch(next)
})