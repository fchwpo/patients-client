import * as React from "react";
import {BrowserRouter, Link, Route} from "react-router-dom";
import { PatientsHome } from "./pages/home";
import { PatientsListing } from "./pages/listing";
import { PatientsDesc } from "./pages/desc";
import './main.scss'
import '@innovaccer/design-system/css';

export const App = () => (
  <>
    <h1>
      Hi! Initial Setup Done
    </h1>
    <BrowserRouter>
      <Link to="/" children="Home" />
      <Link to="/patients" children="Listing" />
      <Link to="/patients/8" children="Desc"/>
      <Route path="/" exact component={PatientsHome} />
      <Route path="/patients" exact component={PatientsListing} />
      <Route path="/patients/:id" exact component={PatientsDesc} />
    </BrowserRouter>
  </>
);