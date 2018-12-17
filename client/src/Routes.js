import React from "react";
import { Route } from "react-router-dom";
import UploadSchedule from "./admin/Upload/UploadSchedule";
import HomePage from "./admin/HomePage";

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/admin" component={UploadSchedule} />
        <Route path="/homePage" component={HomePage} />
      </React.Fragment>
    );
  }
}

export default Routes;
