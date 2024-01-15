// jobsReducer.js
const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_JOBS_BEGIN":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_JOBS_SUCCESS":
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs,
      };
    case "FETCH_JOBS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    default:
      return state;
  }
}

export default jobsReducer;
