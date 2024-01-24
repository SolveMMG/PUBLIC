import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RestaurantList() {
    // Using state to set restaurants.
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurants data from the backend
    fetch("/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  return (
    <div className = "home">
      <h2 class="ui header" id="restaurant-list" >Restaurants</h2>
      <div class="content" id="together">
      <ul class="comment">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h4 class = "comment">{restaurant.name}</h4>
            <Link to={`/places/${restaurant.id}`}><button class="ui small basic green button" id="Link">
                <i class="eye icon"></i>
                View
                </button></Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default RestaurantList;
