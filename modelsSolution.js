var Sequelize = require('sequelize')

//define db
var db = new Sequelize('postgres://localhost:5432/restaurants', {
    logging: false
})

/*Restaurant model. Include the following.....

model: 
-name
-type of cuisine
-rating(out of 5 stars)
-# of visists with a default value of 0

methods(bonus):
-describe : returns a string such as "Chipotle serves mexican food!"
-rate : gives restaurant a new rating
-findBest : returns all resturants with a rating greater or equal to 4
-hook increasing the number of visits, then console.logs for ex... "Chipotle has been visited 10 times"

*/ 
var Restaurant = db.define("restaurant", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cuisine: {
        type: Sequelize.ENUM('chinese', 'mexican', 'korean', 'indian', 'american'),
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 5
        }
    },
    visits: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    getterMethods: {
        describe: function() {
            return `${this.name} serves ${this.cusisine} food!`
        }
    }
})

Restaurant.prototype.rate = function(num) { //Instance Method
    this.rating = num
    return this.save()
}

Restaurant.findBest = function() { //Class Method
    return this.findAll({
        where: {
            rating: {
                $gte: 4
            }
        }
    })
}

Restaurant.hook("beforeValidate", function(restaurant){
    restaurant.visits ++
    console.log(`${this.name} has been visited ${this.visits} times`)
})


/* Menu model
-name
-calories
-isSpicy(boolean)
 */


var MenuItem = db.define("menu_item", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    calories: {
        type: Sequelize.INTEGER
    },
    isSpicy: {
        type: Sequelize.BOOLEAN
    }
})


//relationships
Restaurant.hasMany(MenuItem)


module.exports = { db, Restaurant, MenuItem }
