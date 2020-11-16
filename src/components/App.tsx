import * as React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import { PatientsHome } from "./pages/home";
import { PatientsListing } from "./pages/listing";
import { PatientsDesc } from "./pages/desc";
import './main.scss'

export const App = () => (
  <>
    <h1>
      Hi! Initial Setup Done
    </h1>
    <BrowserRouter>
      <Route path="/" exact component={PatientsHome} />
      <Route path="/patients" exact component={PatientsListing} />
      <Route path="/patients/:id" exact component={PatientsDesc} />
    </BrowserRouter>
  </>
);