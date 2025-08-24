"use client";

import { useState, useEffect } from "react";

{/* Using "usestate" to track darmode toggle and burger menu toggle & store in localstorage */}
export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

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

      {/* Right-side controls: Burgers dropdown + Dark Mode */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          position: "relative", // anchor for the dropdown
        }}
      >
        {/* New Burgers button */}
        <button
          onClick={() => setBurgerOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={burgerOpen}
          aria-controls="burgers-menu"
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            border: "1px solid",
            cursor: "pointer",
            background: darkMode ? "#444" : "#f5f5f5",
            color: darkMode ? "white" : "black",
          }}
        >
          🍔 Burgers
        </button>

        {/* Dropdown with Cheeseburger + Chicken Burger */}
        {burgerOpen && (
          <div
            id="burgers-menu"
            role="menu"
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
              border: darkMode ? "1px solid #444" : "1px solid #ccc",
              borderRadius: "10px",
              padding: "8px 10px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              minWidth: "180px",
              zIndex: 10,
            }}
          >
            <button
              role="menuitem"
              onClick={() => setBurgerOpen(false)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                padding: "8px",
                cursor: "pointer",
                color: "inherit",
              }}
            >
               Cheeseburger - $12 + Chips & Drink = $20
            </button>
            <button
              role="menuitem"
              onClick={() => setBurgerOpen(false)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                padding: "8px",
                cursor: "pointer",
                color: "inherit",
              }}
            >
               Chicken Burger - $12 + Chips & Drink = $20
            </button>
          </div>
        )}

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
      </div>
    </header>
  );
}