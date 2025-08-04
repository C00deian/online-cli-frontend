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

    axiosInstance
      .get("/instance/user", { params: { userId } }) 
      .then((res) => {
        setVMs(res.data.instances);  
      })
      .catch((err) => {
        console.error("❌ Error fetching VMs:", err.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return { vms, loading };
};

export default useUserVMs;
