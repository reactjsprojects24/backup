const handleApiError = (error, message) => {
  console.error(`API Error: ${message}`, error);
  alert(`Error: ${message}`);
  return null;
};

export default handleApiError;