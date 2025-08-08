import { useState, useEffect } from "react";

export default function Sidebar({ selectedItem, collapsed, setCollapsed }) {
  const contentKey = selectedItem ? `item-${selectedItem.id}` : "welcome";
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      const script = document.createElement("script");
      script.src = "https://subscribe-forms.beehiiv.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, [showForm]);

  return (
    <div
      className="sidebar-container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 110px)",
        borderRight: "1px solid #333",
      }}
    >
      <button
        className="collapse-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "→" : "←"}
      </button>

      {!collapsed && (
        <div
          key={contentKey}
          className="sidebar-content fade-in"
          style={{
            flex: 1, // take remaining space
            overflowY: "auto", // vertical scroll
            padding: "18px 22px",
            boxSizing: "border-box",
          }}
        >
          {!selectedItem ? (
            <>
              <h2>
                <em>Welcome, stranger!</em>
              </h2>

              <div className="separator" />
              <p>
                Curiosity is at the root of everything I do. I built this site
                to explore the <em>weird</em> and <em>wonderful</em> corners of
                history: from mysterious artifacts to rare discoveries that
                don’t always get the spotlight.
              </p>
              <div className="separator" />

              <p>
                Everything here has a story. This site is a celebration of the
                oddly fascinating. If you’ve ever gone down a rabbit hole or
                lost track of time in a museum, you’re in the right place.
              </p>
              <div className="separator" />

              <p>
               This site is still a work in progress. Tweaks and improvements coming soon!
              </p>

              <div className="sidebar-divider" />
              <div className="flex-apart">
                <em>Current object count</em> <p>27</p>
              </div>
              <div className="sidebar-divider" />

              <div className="newsletter-wrapper" style={{ marginTop: "2rem" }}>
                <p>
                  Curious? Join my newsletter to get a quick update whenever a
                  new object is added.{" "}
                  <button
                    onClick={() => setShowForm(!showForm)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "inherit",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                    aria-label="Toggle newsletter form"
                  >
                    {showForm ? "↑" : "↓"}
                  </button>
                </p>

                <div
                  style={{
                    overflow: "hidden",
                    transition: "max-height 0.4s ease, opacity 0.3s ease",
                    maxHeight: showForm ? "60px" : "0",
                    opacity: showForm ? 1 : 0,
                  }}
                >
                  <iframe
                    src="https://subscribe-forms.beehiiv.com/22f59618-d4df-4461-b41e-f6fd5b052041"
                    className="beehiiv-embed"
                    data-test-id="beehiiv-embed"
                    frameBorder="0"
                    scrolling="no"
                    style={{
                      width: "100%",
                      height: "30px",
                      marginTop: "10px",
                      borderRadius: "0px",
                      backgroundColor: "transparent",
                      boxShadow: "0 0 #0000",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-apart">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    alignContent: "center",
                  }}
                >
                  <p style={{ fontSize: "12px" }}>[{selectedItem.id}]</p>{" "}
                  <em>{selectedItem.title}</em>
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
              {selectedItem.discovery ? (
                <div className="flex-apart">
                  <em>Discovery</em> <p>{selectedItem.discovery}</p>
                </div>
              ) : (
                <div className="flex-apart">
                  <em>Created</em> <p>{selectedItem.created}</p>
                </div>
              )}
              <div className="separator-lg" />
              {selectedItem.description.map((line, i) => (
                <div key={i}>
                  <p>{line}</p>
                  <div className="separator" />
                </div>
              ))}
              {selectedItem.links &&
                selectedItem.links.map((link, i) => (
                  <a
                    key={i}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link[0]}
                  >
                    {link[1]} ↗
                  </a>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
