const ConnectionButton = ({ instance }) => {
  const handleOpenConnection = () => {
    if (instance?.connectionUrl) {
      window.open(instance.connectionUrl, '_blank');
    } else {
      alert('No URL found');
    }
  };
  return (
    <button
      onClick={handleOpenConnection}
      className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
    >
      Open Connection
    </button>
  );
};
export default ConnectionButton;
