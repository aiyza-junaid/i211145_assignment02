import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setUsers)
        .catch(console.error);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? "http://localhost:4000/signup" : "http://localhost:4000/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      if (isSignup) {
        alert("User registered successfully");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setToken(data.token);
        alert("Login successful");
      }
    } else {
      alert("Error: " + (await response.text()));
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f7f7f7",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", fontSize: "2rem", color: "#333" }}>
          Auth Service
        </h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "15px", color: "#333" }}>
            {isSignup ? "Sign Up" : "Login"}
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            backgroundColor: "transparent",
            color: "#007bff",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            textDecoration: "underline",
          }}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </button>

        <h2 style={{ marginTop: "40px", fontSize: "1.5rem", color: "#333" }}>
          Registered Users
        </h2>
        <ul
          style={{
            listStyle: "none",
            paddingLeft: "0",
            fontSize: "1rem",
            marginTop: "10px",
            color: "#555",
          }}
        >
          {users.map((user, i) => (
            <li key={i} style={{ marginBottom: "10px" }}>
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
