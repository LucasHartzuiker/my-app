"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.style.background = darkMode ? "#111" : "#fff";
    document.body.style.color = darkMode ? "#eee" : "#000";
  }, [darkMode]);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: darkMode ? "#222" : "#ddd",
        color: darkMode ? "white" : "black",
      }}
    >
      <div>Student No. 21279466</div>

      {/* Page links */}
      <nav>
        <a
          href="/"
          style={{ color: darkMode ? "white" : "black", marginRight: "15px" }}
        >
          Home
        </a>
        <a
          href="/about"
          style={{ color: darkMode ? "white" : "black", marginRight: "15px" }}
        >
          About
        </a>
        <a
          href="/prelab-questions"
          style={{ color: darkMode ? "white" : "black", marginRight: "15px" }}
        >
          Prelab Questions
        </a>
        <a
          href="/escape-room"
          style={{ color: darkMode ? "white" : "black", marginRight: "15px" }}
        >
          Escape Room
        </a>
        <a
          href="/coding-races"
          style={{ color: darkMode ? "white" : "black" }}
        >
          Coding Races
        </a>
      </nav>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "6px 12px",
          borderRadius: "20px",
          border: "1px solid",
          cursor: "pointer",
          background: darkMode ? "#444" : "#f5f5f5",
          color: darkMode ? "white" : "black",
        }}
      >
        {darkMode ? "☾ Dark" : "☀ Light"}
      </button>
    </header>
  );
}