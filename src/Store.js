/*
 *    Copyright 2017 SIP3.IO CORP.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
/**
 * Created by kernel72.
 */
import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import {syncHistory} from "react-router-redux";
import {browserHistory} from "react-router";
import thunk from "redux-thunk";

const reduxRouterMiddleware = syncHistory(browserHistory);

const middlewares = [
    reduxRouterMiddleware,
    thunk
];

if (process.env.NODE_ENV !== 'production') {
    const createLogger = require(`redux-logger`);
    const logger = createLogger({
        stateTransformer: state => state.toJS()
    });
    middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;

