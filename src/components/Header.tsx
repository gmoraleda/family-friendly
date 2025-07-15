// Header component for the home page
// Displays the main title and description for the family-friendly places app

import type { HeaderProps } from "../types/home";

export function Header({ className = "" }: HeaderProps = {}) {
  return (
    <div className={`bg-gray-900/85 text-left p-8 md:p-16 lg:p-8 ${className}`}>
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

export default Header;
