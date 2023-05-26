import axios from 'axios';

import { host } from './config';

export const apiHost = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json',
  },
});
