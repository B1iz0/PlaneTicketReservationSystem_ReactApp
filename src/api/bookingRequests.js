import API, { bearerAuthorization } from 'api';
import store from 'reduxStore/store';

import { bookingsEndPoint } from 'constants';

const postBooking = async (booking) => {
  let token = store.getState().token;

  return await API.post(
    `${bookingsEndPoint}`,
    booking,
    bearerAuthorization(token.jwtToken)
  )
    .then((response) => [response.data, null])
    .catch((error) => [null, error]);
};

export { postBooking };
