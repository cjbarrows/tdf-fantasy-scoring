export default (state = {}, action) => {
  switch (action.type) {
    case 'STAGE_LOADED':
      {
        let { stageResults } = state;
        if (!stageResults) stageResults = {};

        const newResults = {};
        newResults[action.payload.stage] = action.payload.data.data;

        Object.assign(stageResults, newResults);

        return {
          ...state,
          stageResults,
        };
      }
    case 'OVERALL_LOADED':
      {
        let { overallResults } = state;
        if (!overallResults) overallResults = {};

        const newResults = {};
        newResults[action.payload.stage] = action.payload.data.data;

        Object.assign(overallResults, newResults);

        return {
          ...state,
          overallResults,
        };
      }
    case 'DO_SCORING':
      console.log(state);
      return state;
    default:
      return state;
  }
};
