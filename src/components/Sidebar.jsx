export default function Sidebar({ selectedItem }) {
  if (!selectedItem) {
    return (
      <div className="sidebar">
        <h2>
          <em>Welcome, stranger!</em>
        </h2>
        <div className="separator" />

        <p>
          Curiosity is at the root of everything I do. 
          I built this site to explore the <em>weird</em>, <em>wonderful</em> corners of history: from mysterious artifacts 
          to rare discoveries that don’t always get the spotlight.
        </p>
        <div className="sidebar-divider" />

        <div className="flex-apart">
          <em>Current object count:</em> <p>210</p>
        </div>
        <div className="sidebar-divider" />
        <p>
          Join my newsletter to get a quick update whenever a new object is added.
        </p>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="flex-apart">
        <em>{selectedItem.title}</em> <p>[{selectedItem.id}]</p>
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
        <div>
          <p key={i}>{line}</p>
          <div className="separator" />
        </div>
      ))}
    </div>
  );
}
