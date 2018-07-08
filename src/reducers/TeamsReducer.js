export default (state = {}, action) => {
  switch (action.type) {
    case 'STAGE_LOADED':
      return {
        ...state,
        stageResults: {
          stage: action.payload.stage,
          results: action.payload.data,
        },
      };
    case 'DO_SCORING':
      console.log(state);
      return state;
    default:
      return state;
  }
};
