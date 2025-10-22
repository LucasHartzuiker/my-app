"use client";
import React, { useState, useEffect } from "react";

const stages = [
  {
    title: "Format Code Correctly",
    prompt: "Fix the indentation and syntax of the following code:",
    initialCode: 'function test(){console.log("Hello")}',
    validate: (code: string) => {
      const trimmed = code.trim();
      const expected = `function test() {\n  console.log("Hello");\n}`;
      return trimmed === expected;
    },
  },
  {
    title: "Generate Numbers 0–100",
    prompt: "Write JS code to generate numbers from 0 to 100:",
    validate: (code: string) => {
      try {
        const result = eval(code);
        return (
          Array.isArray(result) &&
          result.length === 101 &&
          result[0] === 0 &&
          result[100] === 100
        );
      } catch {
        return false;
      }
    },
  },
  {
    title: "Port CSV to JSON",
    prompt: "Convert this CSV to JSON:",
    initialCode: "name,age\nAlice,30\nBob,25",
    validate: (code: string) => {
      try {
        const json = JSON.parse(code);
        return Array.isArray(json) && json.length > 0 && "name" in json[0];
      } catch {
        return false;
      }
    },
  },
];

const EscapeRoomPage: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [codeInput, setCodeInput] = useState<string>("");
  const [csvInput, setCsvInput] = useState<string>(
    stages[2]?.initialCode ?? ""
  );
  const [jsonOutput, setJsonOutput] = useState<string>("");

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    const stage = stages[currentStage];
    if ("initialCode" in stage && stage.initialCode) {
      setCodeInput(stage.initialCode);
    }
  }, [currentStage]);

  const startTimer = () => setTimeLeft(timer * 60);

  const handleSubmit = () => {
    const stage = stages[currentStage];
    const input = currentStage === 2 ? jsonOutput : codeInput;
    if (stage.validate(input)) {
      alert("Stage complete!");
      setCurrentStage((s) => s + 1);
      setCodeInput("");
    } else {
      alert("Try again!");
    }
  };

  const convertCSV = () => {
    const lines = csvInput.split("\n");
    const headers = lines[0].split(",");
    const result = lines.slice(1).map((line) => {
      const values = line.split(",");
      return headers.reduce((obj, key, i) => {
        obj[key] = values[i];
        return obj;
      }, {} as Record<string, string>);
    });
    setJsonOutput(JSON.stringify(result, null, 2));
  };

  const saveStageOutput = async () => {
    const stage = stages[currentStage];
    const content = currentStage === 2 ? jsonOutput : codeInput;

    try {
      const res = await fetch("/api/tabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: stage.title,
          content,
        }),
      });

      if (res.ok) {
        alert("Stage output saved to database!");
      } else {
        alert("Failed to save output.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving output.");
    }
  };

  return (
    <div
      className="escape-room"
      style={{
        backgroundImage: 'url("/escape_bg.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        fontSize: "1.5rem",
        position: "relative",
        padding: "2rem",
      }}
    >
      {/* 🕒 Top-left timer section */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          fontSize: "1rem",
        }}
      >
        <label>Set Timer (minutes):</label>
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(+e.target.value)}
          style={{ marginLeft: "0.5rem", width: "60px" }}
        />
        <button onClick={startTimer} style={{ marginLeft: "0.5rem" }}>
          Start
        </button>
        <div>
          <progress value={timeLeft} max={timer * 60}></progress>
          <span>
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* 🎯 Centered main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <h1>Escape the Code Room</h1>

        {currentStage < stages.length ? (
          <div className="stage">
            <h2>{stages[currentStage].title}</h2>
            <p>{stages[currentStage].prompt}</p>

            {currentStage === 2 ? (
  <>
    <textarea
      value={csvInput}
      onChange={(e) => setCsvInput(e.target.value)}
      rows={4}
      style={{
        width: "80%",
        maxWidth: "800px",
        border: "2px solid white",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "white",
      }}
    />
    <button
      onClick={convertCSV}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        borderRadius: "6px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      Convert
    </button>
    <pre>{jsonOutput}</pre>
    <button
      onClick={handleSubmit}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        borderRadius: "6px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      Submit
    </button>
    <button onClick={saveStageOutput} style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto", marginRight: "auto" }}>
      <img
        src="/savebutton.png"
        alt="Save"
        style={{ width: "60px", height: "50px", marginRight: "8px" }}
      />
      
    </button>
  </>
) : (
  <>
    <textarea
      value={codeInput}
      onChange={(e) => setCodeInput(e.target.value)}
      rows={6}
      style={{
        width: "80%",
        maxWidth: "800px",
        border: "2px solid white",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "white",
      }}
      placeholder="Write your code here..."
    />
    <button
      onClick={handleSubmit}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        borderRadius: "6px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      Submit
    </button>
    <button onClick={saveStageOutput} style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto", marginRight: "auto" }}>
      <img
        src="/savebutton.png"
        alt="Save"
        style={{ width: "60px", height: "50px", marginRight: "8px" }}
      />
      
    </button>
  </>
)}
          </div>
        ) : (
          <h2>🎉 You escaped! Well done!</h2>
        )}
      </div>
    </div>
  );
};

export default EscapeRoomPage