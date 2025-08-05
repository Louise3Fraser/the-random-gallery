export default function TopNav({ setSelectedItem }) {
  const handleClick = () => {
    setSelectedItem(null); 
  };

  return (
    <div className="top-nav">
      <span className="nav-title" onClick={handleClick}>
        Louise’s digital gallery of random objects
      </span>
      <div className="top-line" />
    </div>
  );
}
