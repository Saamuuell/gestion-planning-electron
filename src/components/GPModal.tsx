const GPModal: React.FC<{ handleOk: () => void; handleCancel: () => void }> = ({
  handleOk,
  handleCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-10">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl mb-4">Basic Modal</h2>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleOk}
          >
            Ok
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GPModal;
