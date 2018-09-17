import config from '../config';
import ApiClient from './client';

import Endpoints from './endpoints';

const apiClient = new ApiClient(config.apiPrefix);

export default {
  endpoints: new Endpoints(apiClient),
  client: apiClient,
};
