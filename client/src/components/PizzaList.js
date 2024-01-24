import React, { useState, useEffect } from "react";

function PizzaList() {
  // Using state to set pizzas
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Fetch pizzas data from the backend
    fetch("/pizzas")
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error("Error fetching pizzas:", error));
  }, []);

  return (
    <div className="home" >
    <div className="pizza-list" class="content">
      <h2 class="ui header">Pizzas</h2>
      <ul class="meta">
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            {pizza.name} - {pizza.toppings}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default PizzaList;
