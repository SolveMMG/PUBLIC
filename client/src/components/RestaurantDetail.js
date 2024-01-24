import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Fetch restaurant details from the backend
    fetch(`/restaurants/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch restaurant details: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setRestaurant(data);
      })
      .catch((error) => console.error("Error fetching restaurant details:", error));
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="restaurant-details">
    <h2 className="header">{restaurant.name}</h2>
    <p className="comment">{restaurant.location}</p>
    <h3 className="header">Pizzas</h3>
    <ul className="meta">
        {restaurant.pizzas && restaurant.pizzas.map((pizza) => (
            <li key={pizza.id}>{pizza.name}</li>
        ))}
    </ul>
</div>
  );
}

export default RestaurantDetails;
