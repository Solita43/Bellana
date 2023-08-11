import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactGA from 'react-ga';

import { ModalProvider, Modal, SocketProvider } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	window.store = store;
	window.sessionActions = sessionActions;
}
const TRACKING_ID = " G-NW4EP5LR90"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
	return (
		<SocketProvider>
			<ModalProvider>
				<Provider store={store}>
					<BrowserRouter>
						<App />
						<Modal />
					</BrowserRouter>
				</Provider>
			</ModalProvider>
		</SocketProvider>
	);
}

ReactDOM.render(
	// <React.StrictMode>
	<Root />,
	// </React.StrictMode>,
	document.getElementById("root")
);