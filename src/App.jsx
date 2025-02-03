import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header Component/Header";
import DynamicHeader from './Components/SearchHeaderComponent/DynamicHeader';
import CocktailsList from "./Components/Cocktail-list-component-AR/Cocktail-list.jsx";
import Footer from "./Components/Footer Component/Footer.jsx"
import { FavouritesProvider } from "./Components/FavouritesContext/FavouritesContext.jsx"
import FavouritesList from "./Components/FavouritesListComponent/FavouritesListComponent.jsx";
// import SearchByName from "./Components/CocktailSearch Component/SearchByName.jsx";

// const Homepage = () => (
//   <div>
//   </div>
// );

const SignOut = () => <h2>Signing Out...</h2>;

function App() {
  return (
    <FavouritesProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <DynamicHeader type="search" />
                <CocktailsList />
              </>
            } />
            <Route path="/favorites" element={
              <>
                <DynamicHeader type="favorites" />
                <FavouritesList />
              </>
            } />
            <Route path="/signout" element={<SignOut />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </FavouritesProvider>
  );
}

export default App;
