import RowPlayer from "./components/RowPlayer";
import NavbarBottom from "./components/NavbarBottom";
import NavbarTop from "./components/NavbarTop";
import RowAddPlayer from "./components/RowAddPlayer";

const players = [
  {
    name: "Zoe",
    money: 5.0,
  },
  {
    name: "Fran",
    money: 4.8,
  },
  {
    name: "Mike",
    money: 5.22,
  },
];

const App = () => {
  return (
    <div className="bg-blue-500 h-screen relative">
      <NavbarTop />
      <div className="pt-24 space-y-1">
        {players.map((player, index) => (
          <RowPlayer key={index} player={player} />
        ))}
        {/* <RowAddPlayer /> */}
      </div>
      <NavbarBottom />
    </div>
  );
};

export default App;
