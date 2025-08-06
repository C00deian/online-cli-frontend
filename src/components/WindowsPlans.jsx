import { useState } from "react";
import { useForm } from "react-hook-form";
import InstanceCard from "../components/InstanceCard";
import axiosInstance from "../services/axiosInstance";
const windowsPlans = [
  {
    id: 1,
    label: "Windows - Basic",
    cpu: 2,
    ram: "8 GB",
    storage: "130 GB",
    instanceType: "t3.nano",
    osType: "windows",
    ami_id: "ami-05b85154f69f6bcb3",
  },
  {
    id: 2,
    label: "Windows - Pro",
    cpu: 4,
    ram: "16 GB",
    storage: "260 GB",
    instanceType: "t3.micro",
    osType: "windows",
    ami_id: "ami-0f5ee92e2d63afc18",
  },
  {
    id: 3,
    label: "Windows - Medium",
    cpu: 8,
    ram: "32 GB",
    storage: "500 GB",
    instanceType: "t3.micro",
    osType: "windows",
    ami_id: "ami-0f5ee92e2d63afc18",
  },
];
export default function WindowsPlans() {
  const [loadingId, setLoadingId] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { handleSubmit } = useForm();

  const userId = localStorage.getItem("userId");

const handleCreate = async (plan) => {
  setLoadingId(plan.id);
  setError("");
  setResult(null);

  try {
    const response = await axiosInstance.post("/instance/create", {
      ami_id: plan.ami_id,
      instanceType: plan.instanceType,
      osType: plan.osType,
      region: "ap-south-1",
      userId,
    });

    if (response?.data?.warning) {
      toast.warn("Instance created, but terminal setup failed");
    }

    const connectionUrl = response?.data?.instance?.connectionUrl;

    setResult({
      planId: plan.id,
      connectionUrl,
      instanceId: response?.data?.instance?.instanceId,
    });

  } catch (err) {
  console.error("❌ Instance create failed:", err);
  if (err.code === "ERR_NETWORK") {
    setError("Network error — check CORS or backend server.");
  } else {
    setError(err?.response?.data?.message || "Error creating instance");
  }
}
finally {
    setLoadingId(null);
  }
};

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Windows Plans
      </h2>

     {result && (
  <div className="mb-4 bg-yellow-100 text-yellow-700 p-3 rounded-md">
    Instance created successfully! Setting up terminal access...
  </div>
)}

{result?.connectionUrl && (
  <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-md">
    ✅ Terminal is ready!
  </div>
)}

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(() => { })}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {windowsPlans.map((plan) => (
            <InstanceCard
              key={plan.id}
              plan={plan}
              loading={loadingId === plan.id}
              onCreate={() => handleCreate(plan)}
              result={result && result.planId === plan.id ? result : null}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
