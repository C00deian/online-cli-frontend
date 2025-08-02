import React, { useState } from 'react';
import UbuntuPlans from './UbantuPlans';
import WindowsPlans from './WindowsPlans';
import Navbar from './Navbar';
import Profile from './Profile';
 

function Home() {
  const [selectedOS, setSelectedOS] = useState(false);
  const osOptions = [
    { name: 'Ubuntu', icon: 'https://img.icons8.com/color/96/ubuntu--v1.png' },
    { name: 'Windows', icon: 'https://img.icons8.com/color/96/windows-10.png' },
    { name: 'Mac', icon: 'https://img.icons8.com/ios-filled/100/mac-os.png' },
  ];
  return (
    <> 
      
        <Navbar />
      
    <div className=" mt-16  md:mt-0  min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 p-6">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 drop-shadow-sm text-center">
        Create Your <span className="text-blue-500">VM</span>
      </h1>
      <div className="text-lg font-semibold text-gray-700 mb-4">
        Choose OS:
      </div>
  <div className="flex flex-wrap justify-center gap-8">
  {osOptions.map((os) => (
    <div
      key={os.name}
      onClick={() => setSelectedOS(os.name)}
      className={`w-36 h-44 md:w-40 md:h-48 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 transform
        ${
          selectedOS === os.name
            ? 'bg-white shadow-[8px_8px_30px_rgba(0,0,0,0.2)] scale-105'
            : 'bg-white shadow-[4px_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[10px_10px_30px_rgba(0,0,0,0.15)] hover:scale-[1.06]'
        }`}
    >
      <img src={os.icon} alt={os.name} className="w-16 h-16 mb-4 drop-shadow-md" />
      <p
        className={`text-lg font-medium ${
          selectedOS === os.name ? 'text-blue-700' : 'text-gray-700'
        }`}
      >
        {os.name}
      </p>
    </div>
  ))}
</div>

    <div className="mt-10 text-gray-600 text-md">
      {selectedOS && (
        <>
          Selected OS: <span className="font-semibold text-blue-600">{selectedOS}</span>
        </>
      )}
    </div>
      <div className="w-full max-w-4xl mt-10">
        {selectedOS === 'Ubuntu' && <UbuntuPlans />}
        {selectedOS === 'Windows' && <WindowsPlans />}
        {selectedOS === 'Mac' && (
          <div className="text-center text-red-500 font-semibold">
            Mac Plans Coming Soon...
          </div>
        )}
      </div>
    </div>
    </>
  );
}
export default Home;
