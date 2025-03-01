import { useEffect, useState } from "react";
import Link from "next/link";
import "@/src/styles/hadith.css";

const Hadith = () => {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHadiths = async () => {
      try {
        const response = await fetch("http://localhost:8087/api/v1/hadiths"); // Update with your API URL
        if (!response.ok) throw new Error("Failed to fetch Hadiths");
        const data = await response.json();
        setHadiths(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHadiths();
  }, []);

  return (
    <div className="hadith-container">
      <header className="hadith-header">
        <h1>📜 Hadith Collection</h1>
      </header>
      <nav>
        <Link href="/">🏠 Home</Link>
      </nav>
      {loading && <p>Loading Hadiths...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="hadith-list">
        {hadiths.map((hadith) => (
          <li key={hadith.id} className="hadith-item">
            <h3>
              {hadith.book} - {hadith.source}
            </h3>
            <p>{hadith.text}</p>
            <p>
              <strong>Narrator:</strong> {hadith.narrator || "Unknown"}
            </p>
            <p>
              <strong>Grade:</strong> {hadith.grade}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hadith;
