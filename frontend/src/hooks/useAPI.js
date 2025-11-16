import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (apiFunction, options = {}) => {
    const {
      onSuccess,
      onError,
      successMessage,
      showSuccessToast = false,
      showErrorToast = true,
    } = options;

    setLoading(true);
    setError(null);

    try {
      const response = await apiFunction();
      setData(response.data);

      if (showSuccessToast && successMessage) {
        toast.success(successMessage);
      }

      if (onSuccess) {
        onSuccess(response.data);
      }

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'An error occurred';
      setError(errorMessage);

      if (showErrorToast) {
        toast.error(errorMessage);
      }

      if (onError) {
        onError(errorMessage);
      }

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return { loading, error, data, execute, reset };
};

export default useAPI;