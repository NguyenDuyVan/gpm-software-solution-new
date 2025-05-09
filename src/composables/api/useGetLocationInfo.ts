export const useGetLocationInfo = () => {
  const { httpGetAsync } = useRequestService();

  const getLocationInfo = async () => {
    try {
      const response = await httpGetAsync('http://ip-api.com/json');
      return response?.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching location info:', error);
      throw error;
    }
  };

  return {
    getLocationInfo,
  };
};
