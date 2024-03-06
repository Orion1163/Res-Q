import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
import { Team } from "./Team";
import { Contact } from "./contact/contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "../App.css";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div style={{ backgroundColor: '#333', color: '#ffffff' }}>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Team data={landingPageData.Team} />
      {/* <Contact data={landingPageData.Contact} /> */}
    </div>
     
  );
};

export default Home;
