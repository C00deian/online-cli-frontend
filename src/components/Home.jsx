import { useState, useEffect } from 'react';
import axios from 'axios';
import UbuntuPlans from './UbantuPlans';
import WindowsPlans from './WindowsPlans';
import Navbar from './Navbar';
import CloudMachineHeader from './CloudMachineHeader';
import VMCard from './VMCard';
import TypingHeading from './TypingHeading';
function Home() {
  const [selectedOS, setSelectedOS] = useState(null);
  const [vms, setVMs] = useState([]);

  const osOptions = [
    { name: 'Ubuntu', icon: 'https://img.icons8.com/color/96/ubuntu--v1.png' },
    { name: 'Windows', icon: 'https://img.icons8.com/color/96/windows-10.png' },
    { name: 'Mac', icon: 'https://img.icons8.com/ios-filled/100/mac-os.png' },
  ];
  const vmData = {
    id: '1',
    name: 'Dev Server - Frontend',
    ip: '192.168.1.101',
    vcpus: 4,
    ram: '8 GB',
    storage: '100 GB',
    status: ' Stopped',
  };
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/instance/user') // Adjust this URL to your API
      .then((res) => setVMs(res.data))
      .catch((err) => console.error(err));
  }, []);
  const closeModal = () => setSelectedOS(null);
  return (
    <>a1
      <Navbar />
      <div className="mt-16 min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-100 p-6">

        <TypingHeading text="Create Your Virtual Machine" />

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {osOptions.map((os) => (
            <div
              key={os.name}
              onClick={() => setSelectedOS(os.name)}
              className={`w-36 h-44 md:w-40 md:h-48 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 transform
                ${selectedOS === os.name
                  ? 'bg-white shadow-[8px_8px_30px_rgba(0,0,0,0.2)] scale-105'
                  : 'bg-white shadow-[4px_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[10px_10px_30px_rgba(0,0,0,0.15)] hover:scale-[1.06]'
                }`}
            >
              <img src={os.icon} alt={os.name} className="w-16 h-16 mb-4 drop-shadow-md" />
              <p className={`text-lg font-medium ${selectedOS === os.name ? 'text-blue-700' : 'text-gray-700'}`}>
                {os.name}
              </p>
            </div>
          ))}
        </div>

        {/* Pop-up Plans Modal */}
        {selectedOS && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background Blur */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={closeModal}
            ></div>

            {/* Content */}
            <div className="relative bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full z-10">
              <button
                onClick={closeModal}
                className="absolute top-3 right-5 text-black hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>

              {selectedOS === 'Ubuntu' && <UbuntuPlans />}
              {selectedOS === 'Windows' && <WindowsPlans />}
              {selectedOS === 'Mac' && (
                <div className="text-center text-red-500 font-semibold">
                  Mac Plans Coming Soon...
                </div>
              )}
            </div>
          </div>
        )}
        <div className="mt-16">
          <CloudMachineHeader btntitile="Your Workspace"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-32">
          <VMCard vm={vmData} />
        </div>
      </div>
    </>
  );
}

export default Home;
