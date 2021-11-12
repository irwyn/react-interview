import axios from 'axios';

const CarriersAPI = {
  async getReports({ start, end } = {}) {
    // const response = await fetch('http://147.182.188.188:8080/api/v1/reports/carriers?start=1636635600&end=1636668000');
    const response = await axios.get('http://147.182.188.188:8080/api/v1/reports/carriers', {
      params: {
        start,
        end
      },
    });

    return response.data;
  },
};

export default CarriersAPI;
