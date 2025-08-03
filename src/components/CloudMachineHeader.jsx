const CloudMachineHeader = ({ title , subtitle ,btntitile }) => {
  return (
    <div className="flex flex-col  px-32 py-4  text-black rounded-md z-10 space-y-2">
       <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-700">{subtitle}</p>
      </div>
      <div
        className=" border text-black text-sm font-medium px-4 py-2 rounded-md flex items-center gap-1"
      >
        <span className="text-lg">⏺</span> 
        {btntitile}
      </div>
    </div>
  );
};
export default CloudMachineHeader;
