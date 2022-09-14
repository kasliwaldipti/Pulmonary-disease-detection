import "../styles/Main.css";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-bootstrap/Carousel";
import Covid1 from "../assets/img1.png";
import Covid2 from "../assets/img2.png";
import Covid3 from "../assets/img3.png";
function Main() {
  return (
    <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
      <Carousel fade style={{ backgroundColor: "#3b3c3d" }}>
        <Carousel.Item>
          <center>
            <img src={Covid1} alt="Norms for Covid-19 Prevention" />
          </center>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <center>
            <img src={Covid2} alt="Taking care of mental health" />
          </center>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <center>
            <img src={Covid3} alt="Facts about Covid-19 Vaccine" />
          </center>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default Main;
