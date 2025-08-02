import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import InstanceCard from "./InstanceCard";

const ubuntuPlans = [
  {
    id: 1,
    label: "Ubuntu - Basic",
    cpu: 2,
    ram: "8 GB",
    storage: "50 GB",
    instance_type: "t2.large",
    volume_size: 50,
    ami_id: "ami-021a584b49225376d",
  },
  {
    id: 2,
    label: "Ubuntu - Medium",
    cpu: 4,
    ram: "16 GB",
    storage: "100 GB",
    instance_type: "t2.xlarge",
    volume_size: 100,
    ami_id: "ami-021a584b49225376d",
  },
  {
    id: 3,
    label: "Ubuntu - Large",
    cpu: 8,
    ram: "32 GB",
    storage: "200 GB",
    instance_type: "t3.2xlarge",
    volume_size: 200,
    ami_id: "ami-021a584b49225376d",
  },
];

export default function UbuntuPlans() {
  const [loadingId, setLoadingId] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const { handleSubmit } = useForm(); // React Hook Form initialized

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
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Ubuntu Plans
      </h2>
 
      {result && (
        <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-md">
          {typeof result === "string" ? result : JSON.stringify(result)}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(() => {})}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-gray-50 to-blue-100">
          {ubuntuPlans.map((plan) => (
            <InstanceCard
              key={plan.id}
              plan={plan}
              loading={loadingId === plan.id}
              onCreate={() => handleCreate(plan)} 
              result={
                result && result.planId === plan.id && loadingId === null
                  ? result
                  : null
              }
            />
          ))}
        </div>
      </form>
    </div>
  );
}
