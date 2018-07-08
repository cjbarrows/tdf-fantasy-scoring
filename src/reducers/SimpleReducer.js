export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload,
      };
    case 'STAGE_LOADED':
      return {
        stageResult: action.payload,
      };
    default:
      return state;
  }
};
