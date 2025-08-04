// components/LaunchTerminalButton.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LaunchTerminalButton({ connectionUrl, instanceId }) {
  const [connecting, setConnecting] = useState(false);
  const navigate = useNavigate();

  const handleConnect = () => {
    if (connectionUrl) {
      window.open(connectionUrl);
    } else {
      setConnecting(true);
      setTimeout(() => {
        navigate("/terminal", { state: { instanceId } });
      }, 5000);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={connecting}
      className="mt-2 w-full bg-green-600 text-white py-2 text-sm rounded hover:bg-green-700 transition cursor-pointer"
    >
      {connecting ? "Connecting..." : "Connect"}
    </button>
  );
}
