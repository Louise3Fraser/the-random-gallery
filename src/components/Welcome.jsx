export default function WelcomeScreen() {
  const title = "The Random Gallery";

  return (
    <div className="welcome-screen intro-content">
      <h1 className="fade-in-welcome">Welcome to...</h1>
      <h2 className="falling-title">
        {title.split("").map((char, idx) => (
          <span
            key={idx}
            className="falling-letter"
            style={{ animationDelay: `${idx * 0.05 + 2.5}s` }}
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
}
