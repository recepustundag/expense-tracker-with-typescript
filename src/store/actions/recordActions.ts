import { Record, RecordDispatch, RecordForm } from '../../types/record';
import api from '../../utils/api';

export const getRecords = () => async (dispatch: RecordDispatch) => {
  dispatch({ type: 'GET_RECORDS_START' });
  try {
    const res = await api().get<Record[]>('/records');
    dispatch({ type: 'GET_RECORDS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'GET_RECORDS_ERROR' });
  }
};

export const postRecord = (form: RecordForm) => async (dispatch: RecordDispatch) => {
  dispatch({type: 'ADD_RECORD_START'});
  try {
    const response = await api().post<Record>("/records", form);
    dispatch({ type: "ADD_RECORD_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({type: 'ADD_RECORD_ERROR'})
  }
}

export const updateRecord =
  (form: RecordForm, id: Record["id"]) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "UPDATE_RECORD_START" });
    try {
      const response = await api().put<Record>("/records/" + id, form);
      dispatch({ type: "UPDATE_RECORD_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "UPDATE_RECORD_ERROR" });
    }
  };

export const deleteRecord =
  (id: Record["id"]) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "DELETE_RECORD_START" });
    try {
      await api().delete("/records/" + id);
      dispatch({ type: "DELETE_RECORD_SUCCESS", payload: id });
    } catch {
      dispatch({ type: "DELETE_RECORD_ERROR" });
    }
  };