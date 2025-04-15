import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./Components/Header Component/Header";
import DynamicHeader from "./Components/SearchHeaderComponent/DynamicHeader";
import CocktailsList from "./Components/CocktailListComponent/CocktailList.jsx";
import Footer from "./Components/Footer Component/Footer.jsx";
import { FavouritesProvider } from "./Components/FavouritesContext/FavouritesContext.jsx";
import FavouritesList from "./Components/FavouritesListComponent/FavouritesListComponent.jsx";
import { useFavourites } from "./Components/FavouritesContext/FavouritesContext.jsx";
import AddCocktailForm from "./Components/AddCocktailForm/AddCocktailForm";
import AgeGate from "./Components/AgeGateComponent/AgeGate";

const SignOutHandler = () => {
  const navigate = useNavigate();
  const { clearAllFavourites } = useFavourites();

  useEffect(() => {
    clearAllFavourites();
    navigate("/");
  }, [navigate, clearAllFavourites]);

  return null;
};

function App() {
  useEffect(() => {
    document.title = "Cocktail Kungen";
  }, []);

  return (
    <FavouritesProvider>
      <Router>
        <div className="App">
          <AgeGate />

          <header>
            <Header />
          </header>

          <main className="content" role="main">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <DynamicHeader type="search" />
                    <CocktailsList />
                  </>
                }
              />
              <Route
                path="/favorites"
                element={
                  <>
                    <DynamicHeader type="favorites" />
                    <FavouritesList />
                  </>
                }
              />
              <Route path="/signout" element={<SignOutHandler />} />
              <Route path="/add" element={<AddCocktailForm />} />
            </Routes>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </FavouritesProvider>
  );
}

export default App;
