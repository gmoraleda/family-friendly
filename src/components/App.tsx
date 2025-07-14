import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import aboutPath from "../resources/about.md";
import contactPath from "../resources/contact.md";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
          <Route path="places" element={<Places />} />
          <Route path="places/new" element={<NewPlace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import NewPlace from "./NewPlace";
import Places from "./Places";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/places">Places</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <main className="flex-1 pt-14 overflow-y-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function About() {
  const [text, setText] = useState("");

  fetch(aboutPath)
    .then((response) => response.text())
    .then((text) => {
      setText(text);
    })
    .catch((error) => {
      console.error("Error fetching about content:", error);
    });
  return (
    <div className="prose p-8">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

function Contact() {
  const [text, setText] = useState("");

  fetch(contactPath)
    .then((response) => response.text())
    .then((text) => {
      setText(text);
    })
    .catch((error) => {
      console.error("Error fetching contact content:", error);
    });
  return (
    <div className="prose p-8">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

function NoPage() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>Sorry, this page does not exist.</p>
    </div>
  );
}

export default App;
