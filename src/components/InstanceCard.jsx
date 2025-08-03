import { FaMicrochip, FaMemory, FaHdd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function InstanceCard({ plan, onCreate, loading, result }) {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const handleConnect = () => {
    if (result?.connectionUrl) {
      window.open(result.connectionUrl, "_blank");  
    } else {
      setConnecting(true);
      setTimeout(() => {
        navigate("/terminal", { state: { instanceId: result.instanceId } });
      }, 5000);
    }
  };
  return (
    <div className="rounded-xl p-6 transition bg-white shadow-[4px_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[10px_10px_30px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
      <div className="text-[clamp(1rem,1vw,2rem)] font-semibold mb-4 whitespace-nowrap text-center">{plan.label}</div>
      <div className="flex flex-col gap-2 text-sm text-gray-700 items-center">
        <div className="flex items-center gap-2">
          <FaMicrochip className="text-blue-500 text-xs" />
          {plan.cpu} CPU
        </div>
        <div className="flex items-center gap-2 text-xs">
          <FaMemory className="text-green-500" />
          {plan.ram} RAM
        </div>
        <div className="flex items-center gap-2 text-xs">
          <FaHdd className="text-orange-500" />
          {plan.storage} Storage
        </div>
      </div>
      <button
        onClick={() => onCreate(plan)}
        className="mt-6 w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition cursor-pointer"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
      {result?.planId === plan.id && (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer"
        >
          {connecting ? "Connecting..." : "Connect"}
        </button>
      )}
    </div>
  );
}
