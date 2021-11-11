const CarriersAPI = {
  getReports(params) {
    console.log('Called getReports', params);
    return Promise.resolve({ noice: true });
  },
};

export default CarriersAPI;
