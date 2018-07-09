import axios from 'axios';

export const getStageResults = stage => (dispatch) => {
  axios
    .get(`http://fep-api.dimensiondata.com/v2/stages/${259 + stage}/classification/stage`)
    .then((data) => {
      dispatch({
        type: 'STAGE_LOADED',
        payload: {
          data,
          stage,
        },
      });
    });
};

export const getOverallResults = stage => (dispatch) => {
  axios
    .get(`http://fep-api.dimensiondata.com/v2/stages/${259 + stage}/classification/overall`)
    .then((data) => {
      dispatch({
        type: 'OVERALL_LOADED',
        payload: {
          data,
          stage,
        },
      });
    });
};

export const scoring = () => (dispatch) => {
  dispatch({
    type: 'DO_SCORING',
  });
};

export default {
  getStageResults,
  getOverallResults,
  scoring,
};
