import { legacy_createStore as createStore } from "redux"
import { myReducer } from "./Reducer"

const store = createStore(myReducer)

export default store