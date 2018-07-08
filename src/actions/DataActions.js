import axios from 'axios';

export const calcStagePoints = stage => (dispatch) => {
  dispatch({
    type: 'CALC_STAGE_POINTS',
    payload: stage,
  });
};

export const getStageResults = stage => (dispatch) => {
  axios
    .get(`http://fep-api.dimensiondata.com/v2/stages/${stage}/classification/overall`)
    .then((data) => {
      dispatch({
        type: 'STAGE_LOADED',
        payload: {
          data,
          stage,
        },
      });
      dispatch(calcStagePoints(stage));
    });
};

export const scoring = () => (dispatch) => {
  dispatch({
    type: 'DO_SCORING',
  });
};

export default {
  getStageResults,
  scoring,
  calcStagePoints,
};
