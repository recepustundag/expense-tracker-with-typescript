import { RecordAction, RecordState } from '../../types/record';

const defaultState: RecordState = {
  data: [],
  loading: false,
  error: '',
};

const recordReducer = (state: RecordState = defaultState, action: RecordAction): RecordState => {
  switch (action.type) {
    case 'GET_RECORDS_START':
      return { ...state, loading: true, error: '' };
    case 'GET_RECORDS_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'GET_RECORDS_ERROR':
      return { ...state, loading: false, error: 'Error fetching records' };
    default:
      return state;
  }
};

export default recordReducer