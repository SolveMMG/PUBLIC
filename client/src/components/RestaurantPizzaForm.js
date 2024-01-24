import React, { useState, useEffect } from "react";

function RestaurantPizzaForm() {
  const [price, setPrice] = useState("");
  const [selectedPizza, setSelectedPizza] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [pizzas, setPizzas] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch the list of pizzas and restaurants when the component mounts
    fetch("/pizzas")
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error("Error fetching pizzas:", error));

    fetch("/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // Find the selected pizza and restaurant by name
    const selectedPizzaObj = pizzas.find((pizza) => pizza.name === selectedPizza);
    const selectedRestaurantObj = restaurants.find((restaurant) => restaurant.name === selectedRestaurant);

    // Check if both pizza and restaurant are selected
    if (!selectedPizzaObj || !selectedRestaurantObj) {
      console.error("Please select both pizza and restaurant");
      return;
    }

    // Handle the form submission and POST data to the backend
    fetch("/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: parseFloat(price),
        pizza_id: selectedPizzaObj.id,
        restaurant_id: selectedRestaurantObj.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("RestaurantPizza added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding RestaurantPizza:", error);

      });
  }

  return (
    <div className="restaurant-pizza-form">
      <h2 class = "ui dividing header">New Restaurant Pizza</h2>
      <form onSubmit={handleSubmit} class="ui form">
        <div class="three fields">
        <div class="field">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        </div>
        <div class= "field">
        <select
          name="pizza"
          value={selectedPizza}
          onChange={(e) => setSelectedPizza(e.target.value)}
        >
          <option value="" disabled>Select Pizza</option>
          {pizzas.map((pizza) => (
            <option key={pizza.id} value={pizza.name}>{pizza.name}</option>
          ))}
        </select>
        </div>
        <div class= "field">
        <select
          name="restaurant"
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
        >
          <option value="" disabled>Select Restaurant</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.name}>{restaurant.name}</option>
          ))}
        </select>
        </div>
        <button class ="ui medium green button" type="submit">Add Restaurant Pizza</button>
        </div>
      </form>
    </div>
  );
}

export default RestaurantPizzaForm;
