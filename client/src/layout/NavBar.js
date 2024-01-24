//Importitng relevant files.
import React from 'react'
import { Link } from 'react-router-dom'


export default function NavBar() {
  return (
    // Code for navbar.
    <div className="ui inverted menu">
      <div className="header ">
        {/* Link to Home (Home component) */}
      <Link to='/' className="item header">
        Home
      </Link>
      </div>
      {/* LInk to RestaurantList page */}
      <Link to='places' className="item">
        Restaurants
      </Link>
      {/* LInk to PizzaList page */}
      <Link to='foods' className="item">
        Pizzas
      </Link>
      {/* Link to RestaurantPizzaForm page */}
      <Link to='food_place'className="item">
        Link
      </Link>
    </div>
  )
}
