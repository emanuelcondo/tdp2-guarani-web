import React from "react";
import { Route, Redirect } from "react-router-dom";

import { tabs } from "../config/config_tabs";

export const getDefaultRoute = tabname => {
  const tab = tabs.find(_tab => _tab.name === tabname);
  const defaultOption = tab.options.find(_opt => _opt.isDefault);
  return (
    <Route
      exact
      path={tab.path}
      component={() => <Redirect to={`${tab.path}/${defaultOption.path}`} />}
    />
  );
};

export const getOptionRoutes = tabname => {
  const tab = tabs.find(_tab => _tab.name === tabname);
  return tab.options.map(option => (
    <Route
      key={`${tab.path}/${option.path}`}
      path={`${tab.path}/${option.path}`}
      component={option.component}
    />
  ));
};
