import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { formatDate } from '../utils/date';
import { Button } from './common/Button';

interface HelloResponse {
  message: string;
  timestamp: string;
}

export function HelloWorld() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    const { data, error } = await api.hello();
    if (error) {
      setError(error);
      setData(null);
    } else if (data) {
      setData(data);
      setError(null);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <h2 className="text-red-700 font-bold mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchData}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700">No data available</p>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchData}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{data.message}</h2>
      <p className="text-sm text-gray-600">
        Last updated: {formatDate(data.timestamp)}
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={fetchData}
        className="mt-4"
      >
        Refresh
      </Button>
    </div>
  );
} 