// Depending on your Header component, add "use client" if needed.
export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div className="Main">
        <div className="main-left">
          <img src={"/pages/images/goal1.png"} alt="Goal" />
        </div>
        <div className="main-right">test</div>
      </div>
    </div>
  );
}
