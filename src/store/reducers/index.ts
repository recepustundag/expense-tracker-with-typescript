import { combineReducers } from "redux";
import { CategoryState } from "../../types/category";
import { RecordState } from "../../types/record";
import { UserState } from "../../types/user";
import categoryReducer from "./../reducers/categoryReducer";
import userReducer from "./../reducers/userReducer";
import recordReducer from "./recordReducer";

export interface AppState {
  user: UserState;
  categories: CategoryState;
  records: RecordState;
}

const rootReducer = combineReducers<AppState>({
  user: userReducer,
  categories: categoryReducer,
  records: recordReducer,
});

export default rootReducer;
