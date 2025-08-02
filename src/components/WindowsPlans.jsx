import { useState } from "react";
import { useForm } from "react-hook-form";
import InstanceCard from "../components/InstanceCard";
import axiosInstance from "../Service/AxiosInstance";

const windowsPlans = [
  {
    id: 1,
    label: "Windows - Basic",
    cpu: 2,
    ram: "8 GB",
    storage: "130 GB",
    instanceType: "t3.micro",
    osType: "windows",
    ami_id: "ami-05b85154f69f6bcb3",
  },
  {
    id: 2,
    label: "Windows - Pro",
    cpu: 4,
    ram: "16 GB",
    storage: "260 GB",
    instanceType: "t3.xlarge",
    osType: "windows",
    ami_id: "ami-07f24338b7913c534",
  },
  {
    id: 3,
    label: "Windows - Medium",
    cpu: 8,
    ram: "32 GB",
    storage: "500 GB",
    instanceType: "t3.2xlarge",
    osType: "windows",
    ami_id: "ami-0f5ee92e2d63afc18",
  },
];

export default function WindowsPlans() {
  const [loadingId, setLoadingId] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const { handleSubmit } = useForm(); 

  const handleCreate = async (plan) => {
    setLoadingId(plan.id);
    setError("");
    setResult(null);

    try {
      const response = await axiosInstance.post("/instance/create", {
        ami_id: plan.ami_id,
        instanceType: plan.instanceType,
        osType: plan.osType,
      });

      setResult(response.data.msg || "Instance created successfully");
    } catch (err) {
      setError(err?.response?.data?.message || "Error creating instance");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Windows Plans
      </h2>

      {/* Display result or error */}
      {result && (
        <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-md">
          {result}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Cards */}
      <form onSubmit={handleSubmit(() => {})}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-gray-50 to-blue-100">
          {windowsPlans.map((plan) => (
            <InstanceCard
              key={plan.id}
              plan={plan}
              loading={loadingId === plan.id}
              onCreate={() => handleCreate(plan)} // Pass form-safe function
              result={result && loadingId === null ? result : null}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
