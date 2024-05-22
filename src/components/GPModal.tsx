import React, { useState, useEffect } from 'react';

const GPModal: React.FC<{ handleOk: () => void; handleCancel: () => void }> = ({
  handleOk,
  handleCancel,
}) => {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/user/1',  {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch user: ' + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-10">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl mb-4">Basic Modal</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <p>User Name: {user?.name}</p>
            <p>User ID: {user?.id}</p>
          </div>
        )}
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
