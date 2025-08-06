import { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useAuth } from '../context/AuthContext';

const useUserVMs = () => {
  const [vms, setVMs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId} = useAuth();

  useEffect(() => {
 
    if (!userId) {
      setLoading(false);
      return;
    }

     axiosInstance.get(`/instance/user?userId=${userId}`)
      .then((res) => setVMs(res.data.instances || [])) // ✅ fallback if API doesn't return array
      .catch((err) => {
        console.error("Error fetching VMs:", err);
        setVMs([]); // ✅ ensure fallback
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { vms, loading };
};

export default useUserVMs;
