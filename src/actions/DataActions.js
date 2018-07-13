import axios from 'axios';

const getStageResults = stage => (dispatch) => {
  axios
    .get(`http://fep-api.dimensiondata.com/v2/stages/${260 + stage}/classification/stage`)
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

const getOverallResults = stage => (dispatch) => {
  axios
    .get(`http://fep-api.dimensiondata.com/v2/stages/${260 + stage}/classification/overall`)
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

const scoring = () => (dispatch) => {
  dispatch({
    type: 'DO_SCORING',
  });
};

export {
  getStageResults,
  getOverallResults,
  scoring,
};
