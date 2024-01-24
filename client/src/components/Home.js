// Importing relevant files.
import React from 'react';

// Functional component representing the Home page.
export default function Home() {
  // The component returns a div containing an h1 element with the text "Home"
  // and a paragraph element with a brief description of the app.
  return (
    <div className='home'>
      <h1 class="header">Welcome to My Pizza App</h1>
      <p className="Description">
        Explore a variety of delicious pizzas and discover your favorite pizza places with our app.
        Whether you're a pizza enthusiast or looking for new culinary experiences, we've got you covered!
      </p>
    </div>
  );
}
