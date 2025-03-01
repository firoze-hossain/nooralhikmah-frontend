import { useState } from "react";
import { useRouter } from "next/router";
import "@/src/styles/admin.css";

const AdminHadithPage = () => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [book, setBook] = useState("");
  const [narrator, setNarrator] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8087/api/v1/hadiths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, source, book, narrator, grade }),
      });

      if (!response.ok) {
        throw new Error("Failed to create Hadith");
      }

      router.push("/hadith"); // Redirect to the Hadith list page after successful creation
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-hadith-container">
      <h1>Create New Hadith</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="source">Source</label>
          <input
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="book">Book</label>
          <input
            id="book"
            value={book}
            onChange={(e) => setBook(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="narrator">Narrator</label>
          <input
            id="narrator"
            value={narrator}
            onChange={(e) => setNarrator(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="grade">Grade</label>
          <input
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Create Hadith"}
        </button>
      </form>
    </div>
  );
};

export default AdminHadithPage;
