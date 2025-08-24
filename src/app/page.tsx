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
}