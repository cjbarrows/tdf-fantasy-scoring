import axios from 'axios';

// eslint-disable-next-line
export const simpleAction = () => dispatch => {
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: 'result_of_simple_action',
  });
  axios.get('http://fep-api.dimensiondata.com/v2/stages/260/classification/overall').then((data) => {
    dispatch({
      type: 'STAGE_LOADED',
      payload: data,
    });
  });
};
