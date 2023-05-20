import { AnimatePresence } from "framer-motion";
import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import MainContainer from "./component/MainContainer";
import CreateContainer from "./component/CreateContainer";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./context/reducer";

function App() {
  const [{foodItems}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence mode='wait'>
      <div className="w-screen h-screen flex flex-col">
        <Header />
        <main className="mt-24 md:mt-24  px-0 py-0 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
