import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import * as registerServiceWorker from "./registerServiceWorker";
import { App } from "./app";

ReactDOM.render(
  <App />,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker.unregister();
