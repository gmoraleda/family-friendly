import MapComponent from "./MapComponent";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MapComponent />
    </div>
  );
}

function Header() {
  return <h1 className="text-2xl font-bold">Family Friendly Map</h1>;
}

export default App;
