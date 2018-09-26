import Base from './base';

export default class Endpoints extends Base {
  generateKeys(coin) {
    return this.apiClient.get(`/keygen/${coin}`);
  }
  listKeys(coin) {
    return this.apiClient.get(`/keygen/list/${coin}`);
  }
  listAddress(coin) {
    return this.apiClient.get(`address/${coin}`);
  }
  generateAddress(coin) {
    return this.apiClient.post(`address/${coin}`);
  }
  getBalance(coin) {
    return this.apiClient.get(`/balance/${coin}`);
  }
  getInputs(coin, address) {
    return this.apiClient.get(`/inputs/${coin}/${address}`);
  }
  getForwarder() {
    return this.apiClient.get(`/forwarder`);
  }
}
