function Footer() {
  return (
    <footer className="bg-gray-800 text-white z-10 p-4">
      <div className="flex justify-between text-sm">
        <p>{new Date().getFullYear()} Family Friendly. All rights reserved.</p>
        <a
          href="http://github.com/gmoraleda/family-friendly"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
export default Footer;
