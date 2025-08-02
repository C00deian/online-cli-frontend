import { FaPlay, FaStop, FaTrash } from "react-icons/fa";

const VMCard = ({ vm }) => {
  const statusColors = {
    Running: "bg-blue-500",
    Creating: "bg-yellow-500",
    Stopped: "bg-red-500",
  };

  return (
    <div className="border-2 text-black p-5 rounded-xl w-full max-w-xs shadow-lg backdrop-blur-md">
      <div className="text-lg font-semibold mb-2">{vm.name}</div>
      <p className="text-sm text-gray-900 mb-1">{vm.ip}</p>

      <div className="text-sm text-gray-900 space-y-1 mb-4">
        <p>💻 {vm.vcpus} vCPUs</p>
        <p>🧠 {vm.ram} RAM</p>
        <p>💾 {vm.storage} Storage</p>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 text-xs rounded-full text-black ${statusColors[vm.status] || "bg-gray-600"}`}
        >
          {vm.status}
        </span>

        <div className="flex space-x-2 text-gray-400 text-sm">
          <FaPlay className="hover:text-green-400 cursor-pointer" />
          <FaStop className="hover:text-yellow-400 cursor-pointer" />
          <FaTrash className="hover:text-red-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default VMCard;
