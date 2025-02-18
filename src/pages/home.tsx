import Link from "next/link";
import "@/src/styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Islamic Knowledge Hub</h1>
      </header>
      <nav className="home-nav">
        <ul>
          <li>
            <Link href="/tafsir">📖 Tafsir</Link>
          </li>
          <li>
            <Link href="/hadith">📜 Hadith</Link>
          </li>
          <li>
            <Link href="/fiqh">⚖️ Fiqh</Link>
          </li>
          <li>
            <Link href="/duas">🙏 Duas</Link>
          </li>
          <li>
            <Link href="/about">ℹ️ About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
