import { useState } from "react";

type Transaction = {
  id: number;
  type: string;
  amount: number;
  date: string;
};

function App() {
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [balance, setBalance] = useState(10000);
  const [amount, setAmount] = useState("");

  const [screen, setScreen] = useState("menu");
  const [message, setMessage] = useState("");

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const correctPin = "1234";

  // Login function
  function login() {
    if (pin === correctPin) {
      setLoggedIn(true);
      setMessage("");
      setPin("");
      setScreen("menu");
    } else {
      setMessage("Invalid PIN! Please try again.");
      setPin("");
    }
  }

  // Logout function
  function logout() {
    setLoggedIn(false);
    setScreen("menu");
    setMessage("");
    setAmount("");
    setPin("");
  }

  // Record transaction
  function addTransaction(type: string, value: number) {
    const newTransaction: Transaction = {
      id: Date.now(),
      type: type,
      amount: value,
      date: new Date().toLocaleString()
    };

    setTransactions((prev) => [
      newTransaction,
      ...prev
    ]);
  }

  // Withdraw cash
  function withdraw() {
    const value = Number(amount);

    if (!amount || !Number.isFinite(value) || value <= 0) {
      setMessage("Enter a valid withdrawal amount.");
      return;
    }

    if (value > balance) {
      setMessage("Insufficient account balance!");
      return;
    }

    if (value % 100 !== 0) {
      setMessage("Enter an amount in multiples of ₹100.");
      return;
    }

    setBalance((prev) => prev - value);
    addTransaction("Withdrawal", value);

    setMessage("Please collect your cash!");
    setAmount("");
  }

  // Deposit cash
  function deposit() {
    const value = Number(amount);

    if (!amount || !Number.isFinite(value) || value <= 0) {
      setMessage("Enter a valid deposit amount.");
      return;
    }

    setBalance((prev) => prev + value);
    addTransaction("Deposit", value);

    setMessage("Amount deposited successfully!");
    setAmount("");
  }

  const buttonStyle = {
    padding: "12px 20px",
    margin: "8px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#1565c0",
    color: "white",
    fontSize: "15px",
    cursor: "pointer"
  };

  const inputStyle = {
    padding: "12px",
    width: "80%",
    maxWidth: "280px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eaf1f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          maxWidth: "480px",
          padding: "25px",
          borderRadius: "16px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)"
        }}
      >
        <h1 style={{ color: "#1565c0" }}>
          🏦 ATM Banking System
        </h1>

        <p style={{ color: "#666" }}>
          Welcome to React ATM
        </p>

        {/* LOGIN SCREEN */}
        {!loggedIn && (
          <div>
            <h2>Enter ATM PIN</h2>

            <input
              style={inputStyle}
              type="password"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) =>
                setPin(e.target.value.replace(/\D/g, ""))
              }
            />

            <br />

            <button style={buttonStyle} onClick={login}>
              Login
            </button>

            <p style={{ color: "#777" }}>
              Demo PIN: 1234
            </p>
          </div>
        )}

        {/* MAIN MENU */}
        {loggedIn && screen === "menu" && (
          <div>
            <h2>ATM Main Menu</h2>

            <button
              style={buttonStyle}
              onClick={() => {
                setScreen("balance");
                setMessage("");
              }}
            >
              Check Balance
            </button>

            <br />

            <button
              style={buttonStyle}
              onClick={() => {
                setScreen("withdraw");
                setMessage("");
              }}
            >
              Withdraw Cash
            </button>

            <br />

            <button
              style={buttonStyle}
              onClick={() => {
                setScreen("deposit");
                setMessage("");
              }}
            >
              Deposit Cash
            </button>

            <br />

            <button
              style={buttonStyle}
              onClick={() => {
                setScreen("statement");
                setMessage("");
              }}
            >
              Mini Statement
            </button>

            <br />

            <button
              style={{
                ...buttonStyle,
                backgroundColor: "#d32f2f"
              }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}

        {/* BALANCE SCREEN */}
        {loggedIn && screen === "balance" && (
          <div>
            <h2>Account Balance</h2>

            <h1 style={{ color: "green" }}>
              ₹{balance.toLocaleString("en-IN")}
            </h1>

            <button
              style={buttonStyle}
              onClick={() => setScreen("menu")}
            >
              Back to Menu
            </button>
          </div>
        )}

        {/* WITHDRAW SCREEN */}
        {loggedIn && screen === "withdraw" && (
          <div>
            <h2>Cash Withdrawal</h2>

            <p>
              Available Balance: ₹
              {balance.toLocaleString("en-IN")}
            </p>

            <input
              style={inputStyle}
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setMessage("");
              }}
            />

            <br />

            <button
              style={buttonStyle}
              onClick={withdraw}
            >
              Withdraw
            </button>

            <br />

            <button
              style={buttonStyle}
              onClick={() => {
                setScreen("menu");
                setMessage("");
              }}
            >
              Back
            </button>
          </div>
        )}

        {/* DEPOSIT SCREEN */}
        {loggedIn && screen === "deposit" && (
          <div>
            <h2>Cash Deposit</h2>

            <p>
              Current Balance: ₹
              {balance.toLocaleString("en-IN")}
            </p>

            <input
              style={inputStyle}
              type="number"
              placeholder="Enter deposit amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setMessage("");
              }}
            />

            <br />

            <button
              style={buttonStyle}
              onClick={deposit}
            >
              Deposit
            </button>

            <br />

            <button
              style={buttonStyle}
              onClick={() => {
                setScreen("menu");
                setMessage("");
              }}
            >
              Back
            </button>
          </div>
        )}

        {/* MINI STATEMENT */}
        {loggedIn && screen === "statement" && (
          <div>
            <h2>Mini Statement</h2>

            {transactions.length === 0 ? (
              <p>No transactions available.</p>
            ) : (
              <div style={{ textAlign: "left" }}>
                {transactions.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "10px"
                    }}
                  >
                    <strong>{item.type}</strong>

                    <p>
                      Amount: ₹
                      {item.amount.toLocaleString("en-IN")}
                    </p>

                    <small>{item.date}</small>
                  </div>
                ))}
              </div>
            )}

            <h3>
              Current Balance: ₹
              {balance.toLocaleString("en-IN")}
            </h3>

            <button
              style={buttonStyle}
              onClick={() => setScreen("menu")}
            >
              Back to Menu
            </button>
          </div>
        )}

        {/* MESSAGE */}
        {message && (
          <p
            style={{
              color: message.includes("successfully") ||
                message.includes("collect")
                ? "green"
                : "red",
              fontWeight: "bold",
              marginTop: "15px"
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;