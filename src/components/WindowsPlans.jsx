import { useState } from "react";
import axios from "axios";
import InstanceCard from "./InstanceCard";


const windowsPlans = [
  {
    id: 1,
    label: "Windows - Basic",
    cpu: 2,
    ram: "8 GB",
    storage: "130 GB",
    instance_type: "t3.large",
    volume_size: 130,
    ami_id: "ami-07f24338b7913c534", // Windows Server AMI (example)
  },
  {
    id: 2,
    label: "Windows - Pro",
    cpu: 4,
    ram: "16 GB",
    storage: "260 GB",
    instance_type: "t3.xlarge",
    volume_size: 260,
    ami_id: "ami-07f24338b7913c534",
  },

   {
    id: 3,
    label: "Ubuntu - Medium",
    cpu: 8,
    ram: "32 GB",
    storage: "500 GB",
    instance_type: "t3.2xlarge",
    volume_size: 500,
    ami_id: "ami-0f5ee92e2d63afc18",
  },
];

export default function WindowsPlans() {
  const [loadingId, setLoadingId] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCreate = async (plan) => {
    setLoadingId(plan.id);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("http://13.204.81.232:3000/instances/create", {
        ami_id: plan.ami_id,
        instance_type: plan.instance_type,
        volume_size: plan.volume_size,
      });
       setResult({ ...res.data, planId: plan.id });
    } catch (err) {
      setError(err?.response?.data?.message || "Error creating instance");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Windows Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {windowsPlans.map((plan) => (
          <InstanceCard
            key={plan.id}
            plan={plan}
            loading={loadingId === plan.id}
            onCreate={handleCreate}
            result={result && loadingId === null ? result : null}
          />
        ))}
      </div>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}
