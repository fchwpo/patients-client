import * as React from "react";
import {BrowserRouter, Route, useHistory, useLocation} from "react-router-dom";
import { PatientsHome } from "./pages/home";
import { PatientsListing } from "./pages/listing";
import { PatientsDesc } from "./pages/desc";
import { Navigation, PageHeader } from "@innovaccer/design-system";
import './main.scss'
import '@innovaccer/design-system/css';

export const App = () => (
  <>
    <BrowserRouter>
      <CustomHeader />
      <Route path="/" exact component={PatientsHome} />
      <Route path="/patients" exact component={PatientsListing} />
      <Route path="/patients/:id" exact component={PatientsDesc} />
    </BrowserRouter>
  </>
);

const CustomHeader: React.FC<{}> = ({}) => {

  const history = useHistory();
  const location = useLocation();
  
  const navigationData = [
    {
      name: 'home',
      label: 'Home',
      to: "/"
    },
    {
      name: 'listing',
      label: 'Listing',
      to: "/patients"
    }
  ];

  const defaultActive = navigationData.find((cur) => cur.to === location.pathname);

  const [active, setActive] = React.useState(defaultActive)


  const options = {
    navigation: <Navigation menus={navigationData} onClick={(menu: any) => {
      history.push(menu.to);
      setActive(menu);
    }} active={active && active.to === location.pathname ? active : null} />
  };
  return (
    <div className="p-6" style={{ background: '#f4f4f4' }}>
      <PageHeader className="custom-header" title={active ? active.label : ""} {...options} />
    </div>
  );
}