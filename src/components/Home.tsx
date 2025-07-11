import Map from "./Map";

function Home() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Map />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-gray-900/85 text-left p-8 md:p-16 lg:p-16">
      <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight text-white font-bold tracking-tight">
        Discover Family-Friendly Places Near You
      </h1>
      <p className="mb-8 text-lg md:text-xl text-gray-400 font-medium hidden sm:block">
        Browse and filter thousands of verified family-friendly locations. From
        parks to restaurants, find the perfect spots for your family adventures.
      </p>
    </div>
  );
}
export default Home;
