"use client";

import { useState } from "react";

export default function HomePage() {
  const [tabs, setTabs] = useState([
    { id: 1, title: "Step 1", content: "Placeholder content for Step 1" },
  ]);
  const [selectedTab, setSelectedTab] = useState(1);

  // Add a new tab
  const addTab = () => {
    const newId = tabs.length + 1;
    setTabs([
      ...tabs,
      { id: newId, title: `Step ${newId}`, content: `Placeholder content for Step ${newId}` },
    ]);
    setSelectedTab(newId);
  };

  // Remove the last tab
  const removeTab = () => {
    if (tabs.length > 1) {
      const newTabs = tabs.slice(0, -1);
      setTabs(newTabs);
      setSelectedTab(newTabs[newTabs.length - 1].id);
    }
  };

  // Update content for selected tab
  const updateContent = (newContent: string) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === selectedTab ? { ...tab, content: newContent } : tab
      )
    );
  };

  // Generate HTML + JS code
  const generateCode = () => {
    const buttons = tabs
      .map(
        (tab) =>
          `<button onclick="openTab('step${tab.id}')">${tab.title}</button>`
      )
      .join("\n    ");

    const sections = tabs
      .map(
        (tab, i) => `
  <div id="step${tab.id}" style="display:${i === 0 ? "block" : "none"}; border:1px solid black; padding:10px;">
    <p>${tab.content}</p>
  </div>`
      )
      .join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tabs Example</title>
</head>
<body>
  <h2>Tabs Example</h2>

  <div id="tabs">
    ${buttons}
  </div>
  ${sections}

  <script>
    function openTab(tabId) {
      document.querySelectorAll(${tabs
        .map((t) => `'#step${t.id}'`)
        .join(", ")}).forEach(div => {
        div.style.display = 'none';
      });
      document.getElementById(tabId).style.display = 'block';
    }
  </script>
</body>
</html>`;
  };

  return (
    <div>
      <h1> Tabs Generator</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Column 1: Add/Remove Tabs */}
        <div style={{ flex: 1 }}>
          <h3>Tabs</h3>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              style={{
                padding: "5px",
                cursor: "pointer",
                background:
                  selectedTab === tab.id ? "#ddd" : "transparent",
              }}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.title}
            </div>
          ))}
          <button onClick={addTab} style={{ marginRight: "10px" }}>
            ➕ Add Tab
          </button>
          <button onClick={removeTab}>➖ Remove Tab</button>
        </div>

        {/* Column 2: Content Editor */}
        <div style={{ flex: 1 }}>
          <h3>Content</h3>
          <input
  type="text"
  value={tabs.find((t) => t.id === selectedTab)?.title || ""}
  onChange={(e) => {
    const newTitle = e.target.value;
    setTabs(
      tabs.map((tab) =>
        tab.id === selectedTab ? { ...tab, title: newTitle } : tab
      )
    );
  }}
  style={{ width: "100%", marginBottom: "10px" }}
  placeholder="Edit tab title"
/>
          <textarea
            value={tabs.find((t) => t.id === selectedTab)?.content || ""}
            onChange={(e) => updateContent(e.target.value)}
            style={{ width: "100%", height: "200px" }}
          />
        </div>

        {/* Column 3: Code Output */}
        <div style={{ flex: 1 }}>
          <h3>Generated Code</h3>
          <textarea
            readOnly
            value={generateCode()}
            style={{ width: "100%", height: "300px", fontFamily: "monospace" }}
          />
        </div>
      </div>
    </div>
  );
}