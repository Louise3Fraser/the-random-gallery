import { useState } from "react";

export default function Sidebar({ selectedItem, collapsed, setCollapsed }) {
  const contentKey = selectedItem ? `item-${selectedItem.id}` : "welcome";

  return (
    <div className={"sidebar-container"}>
      <button
        className="collapse-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "→" : "←"}
      </button>

      {!collapsed && (
        <div key={contentKey} className="sidebar-content fade-in">
          {!selectedItem ? (
            <>
              <h2>
                <em>Welcome, stranger!</em>
              </h2>

              <div className="separator" />
              <p>
                Curiosity is at the root of everything I do. I built this site
                to explore the <em>weird</em>, <em>wonderful</em> corners of
                history: from mysterious artifacts to rare discoveries that
                don’t always get the spotlight.
              </p>
              <div className="sidebar-divider" />
              <div className="flex-apart">
                <em>Current object count:</em> <p>30</p>
              </div>
              <div className="sidebar-divider" />
              <p>
                Join my newsletter to get a quick update whenever a new object
                is added.
              </p>
            </>
          ) : (
            <>
              <div className="flex-apart">
                <div style={{display: "flex", flexDirection: "row", gap: "5px", alignContent:"center"}}>
                 <p style={{fontSize: "12px"}}>[{selectedItem.id}]</p> <em >{selectedItem.title}</em> 
                </div>
              </div>
              <div className="item-container-lg">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="main-image"
                />
              </div>
              <div className="sidebar-divider" />
              <div className="flex-apart">
                <em>Discovery</em> <p>{selectedItem.discovery}</p>
              </div>
              <div className="separator-lg" />
              {selectedItem.description.map((line, i) => (
                <div key={i}>
                  <p>{line}</p>
                  <div className="separator" />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
