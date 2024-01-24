import { BrowserRouter, Routes , Route} from "react-router-dom";
import RestaurantDetail from "./components/RestaurantDetail";
import RestaurantForm from "./components/RestaurantPizzaForm";
import RestaurantList from "./components/RestaurantList";
import PizzaList from "./components/PizzaList";
import Layout from "./layout/Layout";
import Home from "./components/Home";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='places' element={<RestaurantList/>}/>
        <Route path='places/:id' element={<RestaurantDetail/>}/>
        <Route path='foods' element={<PizzaList/>}/>
        <Route path="food_place" element={<RestaurantForm/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
