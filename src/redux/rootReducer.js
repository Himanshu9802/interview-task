import { combineReducers } from "@reduxjs/toolkit";

import items from "./items";

const reducers = combineReducers({
  items,
});

export default reducers;
