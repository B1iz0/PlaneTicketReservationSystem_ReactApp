import axios from 'axios';

import { reservationSystemURL } from 'constants';

export default axios.create({
  baseURL: reservationSystemURL,
  responseType: 'json',
});
