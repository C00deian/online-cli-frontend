import { useState } from "react";
import { FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { useStopInstance } from "../hooks/useOperation";
import { toast } from "react-toastify";
import LaunchTerminalButton from "./LaunchTerminal";

const VMCard = ({ vm }) => {
  const [showModal, setShowModal] = useState(false);
  const { stopInstance, terminateInstance } = useStopInstance();
  const [isStop, SetisStop] = useState(false);

  const handleStop = async () => {
    try {
      await stopInstance({
        instanceId: vm.rawOutput?.instance_id,
        region: vm.region,
      });
      toast.success(`Instance ${vm.rawOutput?.instance_id} stopped!`);
    } catch (error) {
      toast.error("Error stopping instance:", error?.msg || "Unknown error");
    }
  };

  const handleToggle = () => {
    setIsStopped(!isStopped);
  };

  // inside VMCard.jsx
  const handleTerminate = async () => {
    try {
      await terminateInstance({
        instanceId: vm.rawOutput?.instance_id,
        region: vm.region,
      });
      toast.success(`Instance ${vm.rawOutput?.instance_id} terminated!`);
      setShowModal(false);
    } catch (error) {
      toast.error(
        "Error terminating instance:",
        error?.response?.data?.message || "Unknown error"
      );
      setShowModal(false);
    }
  };

  const statusColors = {
    Running: "bg-blue-500",
    Creating: "bg-yellow-500",
    Stopped: "bg-red-500",
  };

  return (
    <>
      {/* 💻 VM Card UI */}
      <div className=" text-black p-4 rounded-xl w-full max-w-xs shadow-lg bg-white backdrop-blur-md transition hover:shadow-2xl">
        {/* Title & IP */}
        <div className="mb-1">
          <p className="text-sm text-gray-600">{vm.rawOutput.public_ip}</p>
        </div>

        {/* Specs & Actions */}
        <div className="flex justify-between items-start gap-4 mb-4">
          {/* Specs */}
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              💻 <span className="font-medium">{vm.vcpus}</span> vCPUs
            </p>
            <p>
              🧠 <span className="font-medium">{vm.ram}</span> RAM
            </p>
            <p>
              💾 <span className="font-medium">{vm.storage}</span> Storage
            </p>
          </div>

          {/* Actions (Terminal + OS) */}
          <div className="flex flex-col items-end space-y-2">
            <LaunchTerminalButton
              connectionUrl={vm.connectionUrl || vm.rawOutput?.connectionUrl}
              instanceId={vm.rawOutput?.instance_id}
            />

            <span
              className={`text-sm font-semibold px-3 py-1 rounded border 
          ${vm.os === "ubuntu" ? "text-orange-600 border-orange-400" : ""}
          ${vm.os === "windows" ? "text-blue-600 border-blue-400" : ""}
          bg-gray-100`}
            >
              {vm.os?.charAt(0).toUpperCase() + vm.os?.slice(1)}
            </span>
          </div>
        </div>

        {/* Status & Controls */}
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              statusColors[vm.status] || "bg-gray-600"
            } text-white`}
          >
            {vm.status}
          </span>

          <div className="flex space-x-3 text-gray-500 text-base">
            <FaPlay className="hover:text-green-500 cursor-pointer" />

            {isStopped ? (
        <FaStop
          onClick={handleToggle}
          className="hover:text-yellow-500 cursor-pointer"
        />
      ) : (
        <FaPause
          onClick={handleToggle}
          className="hover:text-green-500 cursor-pointer"
        />
      )}
            <FaTrash
              onClick={() => setShowModal(true)}
              className="hover:text-red-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 🧾 Tailwind Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Termination
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to terminate this instance?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={handleTerminate}
                className="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Terminate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VMCard;
