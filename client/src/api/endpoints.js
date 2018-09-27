import Base from './base';

export default class Endpoints extends Base {
  listKeys(coin) {
    return this.apiClient.get(`keygen/${coin}`);
  }
  generateKeys(coin) {
    return this.apiClient.post(`keygen/${coin}`);
  }
  listAddress(coin) {
    return this.apiClient.get(`address/${coin}`);
  }
  generateAddress(coin) {
    return this.apiClient.post(`address/${coin}`);
  }
  getBalance(coin) {
    return this.apiClient.get(`balance/${coin}`);
  }
  getInputs(coin) {
    return this.apiClient.get(`inputs/${coin}`);
  }
}
