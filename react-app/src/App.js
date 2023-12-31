import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import SingleProjectDash from "./components/SingleProjectDash";
import SideNav from "./components/SideNav";
import Splash from "./components/Splash";
import KanbanPage from "./components/KanbanPage";
import PageNotFound from "./components/404";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <Splash />
          </Route>
          <ProtectedRoute exact path="/dashboard">
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute exact path="/project/:projectId">
            <div className="single-project-detail-container">
              <SideNav />
              <SingleProjectDash />
            </div>
          </ProtectedRoute>
          <ProtectedRoute exact path="/project/:projectId/:boardId">
            <div className="single-project-detail-container">
              <SideNav />
              <KanbanPage />
            </div>
          </ProtectedRoute>
          <Route path="">
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
