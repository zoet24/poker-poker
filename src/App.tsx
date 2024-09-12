import RowPlayer from "./components/RowPlayer";
import NavbarBottom from "./components/NavbarBottom";
import NavbarTop from "./components/NavbarTop";
import RowAddPlayer from "./components/RowAddPlayer";

// Player context
const players = [
  {
    name: "Zoe",
    money: 5.0,
    hand: [],
  },
  {
    name: "Fran",
    money: 4.8,
    hand: [],
  },
  {
    name: "Mike",
    money: 5.22,
    hand: [],
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
