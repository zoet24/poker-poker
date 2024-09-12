import RowPlayer from "./components/RowPlayer";
import NavbarBottom from "./components/NavbarBottom";
import NavbarTop from "./components/NavbarTop";
import RowAddPlayer from "./components/RowAddPlayer";

const App = () => {
  return (
    <div className="bg-blue-500 h-screen relative">
      {/* <NavbarTop /> */}
      <RowPlayer />
      <RowAddPlayer />
      <NavbarBottom />
    </div>
  );
};

export default App;
