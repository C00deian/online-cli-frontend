import { FaMicrochip, FaMemory, FaHdd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function InstanceCard({ plan, onCreate, loading, result }) {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);

    // Simulate 5s wait before navigating
    setTimeout(() => {
      navigate("/terminal", { state: { instanceId: result.instanceId } });
    }, 5000);
  };

  return (
    <div className="border rounded-lg shadow-sm p-6 bg-white text-center hover:shadow-lg transition">
      <div className="text-lg font-semibold mb-4">{plan.label}</div>

      <div className="flex flex-col gap-2 text-sm text-gray-700 items-center">
        <div className="flex items-center gap-2">
          <FaMicrochip className="text-blue-500" />
          {plan.cpu} CPU
        </div>
        <div className="flex items-center gap-2">
          <FaMemory className="text-green-500" />
          {plan.ram} RAM
        </div>
        <div className="flex items-center gap-2">
          <FaHdd className="text-orange-500" />
          {plan.storage} Storage
        </div>
      </div>

      <button
        onClick={() => onCreate(plan)}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>

      {/* ✅ Instance Info */}
      {result?.planId === plan.id && (
        <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-md text-left">
          <p>
            <strong>Instance ID:</strong> {result.instanceId}
          </p>
          <p>
            <strong>Volume Size:</strong> {result.volumeSize} GB
          </p>

          <button
            onClick={handleConnect}
            disabled={connecting}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          >
            {connecting ? "Connecting..." : "Connect"}
          </button>
        </div>
      )}
    </div>
  );
}
