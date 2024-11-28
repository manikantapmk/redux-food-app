import { createStore } from "redux";
import rootRed from "./redux/reducers/main";

const store = createStore(
    rootRed
)

export default store