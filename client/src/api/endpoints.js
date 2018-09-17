import Base from './base';

export default class Endpoints extends Base {
  generateKeys() {
    return this.apiClient.get(`generateKeys`);
  }
  generateAddress(index) {
    return this.apiClient.post(`address`, index);
  }
  getBalance(address) {
    return this.apiClient.get(`/balance/${address}`);
  }
  getInputs(address) {
    return this.apiClient.get(`/inputs/${address}`);
  }
}
