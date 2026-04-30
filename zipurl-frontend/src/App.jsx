import { useState } from "react";
import "./App.css";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  async function handleShorten() {
    setError("");
    setShortUrl("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://zipurl-ciac.onrender.com/api/url/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setShortUrl(data.shortUrl);
      setHistory((prev) =>
        [{ original: url, short: data.shortUrl }, ...prev].slice(0, 10)
      );
      setUrl("");
    } catch {
      setError("Could not connect to server. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      {/* Hero */}
      <div className="hero">

        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.5 9.5L9.5 6.5M8.5 4.5L9.5 3.5C10.5 2.5 12 2.5 13 3.5C14 4.5 14 6 13 7L12 8M4 8L3 9C2 10 2 11.5 3 12.5C4 13.5 5.5 13.5 6.5 12.5L7.5 11.5"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="logo-text">
            Zip<span>URL</span>
          </span>
        </div>

        <h1>Long URLs deserve <span>better</span></h1>
        <p>Paste a long URL and get a clean, shareable link instantly.</p>
      </div>

      {/* Main Card */}
      <div className="card">
        <input
          className="url-input"
          type="text"
          placeholder="https://your-very-long-url.com/goes/here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleShorten()}
        />
        <button className="btn" onClick={handleShorten} disabled={loading}>
          {loading ? <span className="spinner" /> : "Shorten →"}
        </button>

        {error && <div className="error-msg">{error}</div>}

        {shortUrl && (
          <div className="result-box">
            <div className="result-label">your short link</div>
            <div className="result-row">
              <span className="short-url">{shortUrl}</span>
              <CopyButton text={shortUrl} />
            </div>
          </div>
        )}
      </div>

      {/* History */}
      <div className="history-section">
        <div className="history-header">
          <span className="history-title">Recent links</span>
          {history.length > 0 && (
            <button className="clear-btn" onClick={() => setHistory([])}>
              Clear all
            </button>
          )}
        </div>
        <div className="history-list">
          {history.length === 0 ? (
            <div className="history-empty">No links shortened yet</div>
          ) : (
            history.map((item, i) => <HistoryItem key={i} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={`copy-btn ${copied ? "copied" : ""}`}
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function HistoryItem({ item }) {
  return (
    <div className="history-item">
      <div className="history-icon">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M6.5 9.5L9.5 6.5M8.5 4.5L9.5 3.5C10.5 2.5 12 2.5 13 3.5C14 4.5 14 6 13 7L12 8M4 8L3 9C2 10 2 11.5 3 12.5C4 13.5 5.5 13.5 6.5 12.5L7.5 11.5"
            stroke="#185FA5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="history-content">
        <div className="history-short">{item.short}</div>
        <div className="history-original">{item.original}</div>
      </div>
      <CopyButton text={item.short} />
    </div>
  );
}
