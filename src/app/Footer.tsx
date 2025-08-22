export default function Footer() {
  const today = new Date().toLocaleDateString();

  return (
    <footer
      style={{
        marginTop: "50px",
        padding: "10px",
        textAlign: "center",
        borderTop: "1px solid #ccc",
      }}
    >
      Copyright © Lucas Hartzuiker | Student No. 21279466 | {today}
    </footer>
  );
}