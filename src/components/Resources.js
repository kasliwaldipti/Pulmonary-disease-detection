import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import an from "../assets/states/andaman&nicobar.png";
import andhra from "../assets/states/andhra_pradesh.png";
import arunachal from "../assets/states/arunachal_pradesh.png";
import assam from "../assets/states/assam.png";
import bihar from "../assets/states/bihar.png";
import chandigarh from "../assets/states/chandigarh.png";
import chhattisgarh from "../assets/states/chhattisgarh.png";
import dn from "../assets/states/dadra&nagar.png";
import dd from "../assets/states/daman&diu.png";
import delhi from "../assets/states/delhi.png";
import goa from "../assets/states/goa.png";
import gujarat from "../assets/states/gujarat.jpg";
import haryana from "../assets/states/haryana.png";
import hp from "../assets/states/himachal_pradesh.png";
import jk from "../assets/states/jammu&kashmir.png";
import jharkhand from "../assets/states/jharkhand.png";
import karnataka from "../assets/states/karnataka.png";
import kerala from "../assets/states/kerala.png";
import mp from "../assets/states/madhya_pradesh.png";
import maharashtra from "../assets/states/maharashtra.png";
import manipur from "../assets/states/manipur.png";
import meghalaya from "../assets/states/meghalaya.png";
import nagaland from "../assets/states/nagaland.png";
import odisha from "../assets/states/odisha.png";
import puducherry from "../assets/states/puducherry.png";
import punjab from "../assets/states/punjab.png";
import rajasthan from "../assets/states/rajasthan.png";
import sikkim from "../assets/states/sikkim.png";
import tn from "../assets/states/tamil_nadu.png";
import telangana from "../assets/states/telangana.png";
import tripura from "../assets/states/tripura.png";
import up from "../assets/states/uttar_pradesh.png";
import uttarakhand from "../assets/states/uttarakhand.png";
import wb from "../assets/states/west_bengal.png";
import "../styles/GuideCard.css";
import { Footer } from "./Footer";
import Twitter from "./Twitter";
import { Modal } from "react-bootstrap";

function StateCard(props) {
  var docs;
  var states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Puducherry",
  ];

  docs = [
    {
      image: andhra,
      title: states[0],
      link: "https://life.coronasafe.network/andhra_pradesh",
    },
    {
      image: arunachal,
      title: states[1],
      link: "https://life.coronasafe.network/arunachal_pradesh",
    },
    {
      image: assam,
      title: states[2],
      link: "https://life.coronasafe.network/assam",
    },
    {
      image: bihar,
      title: states[3],
      link: "https://life.coronasafe.network/bihar",
    },
    {
      image: chhattisgarh,
      title: states[4],
      link: "https://life.coronasafe.network/chhattisgarh",
    },
    {
      image: goa,
      title: states[5],
      link: "https://life.coronasafe.network/goa",
    },
    {
      image: gujarat,
      title: states[6],
      link: "https://life.coronasafe.network/gujarat",
    },
    {
      image: haryana,
      title: states[7],
      link: "https://life.coronasafe.network/haryana",
    },
    {
      image: hp,
      title: states[8],
      link: "https://life.coronasafe.network/himachal_pradesh",
    },
    {
      image: jk,
      title: states[9],
      link: "https://life.coronasafe.network/jammu_&_kashmir_(ut)",
    },
    {
      image: jharkhand,
      title: states[10],
      link: "https://life.coronasafe.network/jharkhand",
    },
    {
      image: karnataka,
      title: states[11],
      link: "https://life.coronasafe.network/karnataka",
    },
    {
      image: kerala,
      title: states[12],
      link: "https://life.coronasafe.network/kerala",
    },
    {
      image: mp,
      title: states[13],
      link: "https://life.coronasafe.network/madhya_pradesh",
    },
    {
      image: maharashtra,
      title: states[14],
      link: "https://life.coronasafe.network/maharashtra",
    },
    {
      image: manipur,
      title: states[15],
      link: "https://life.coronasafe.network/manipur",
    },
    {
      image: meghalaya,
      title: states[16],
      link: "https://life.coronasafe.network/meghalaya",
    },
    {
      image: nagaland,
      title: states[17],
      link: "https://life.coronasafe.network/nagaland",
    },
    {
      image: odisha,
      title: states[18],
      link: "https://life.coronasafe.network/odisha",
    },
    {
      image: punjab,
      title: states[19],
      link: "https://life.coronasafe.network/punjab",
    },
    {
      image: rajasthan,
      title: states[20],
      link: "https://life.coronasafe.network/rajasthan",
    },
    {
      image: sikkim,
      title: states[21],
      link: "https://life.coronasafe.network/sikkim",
    },
    {
      image: tn,
      title: states[22],
      link: "https://life.coronasafe.network/tamil_nadu",
    },
    {
      image: telangana,
      title: states[23],
      link: "https://life.coronasafe.network/telangana",
    },
    {
      image: tripura,
      title: states[24],
      link: "https://life.coronasafe.network/tripura",
    },
    {
      image: uttarakhand,
      title: states[25],
      link: "https://life.coronasafe.network/uttarakhand",
    },
    {
      image: up,
      title: states[26],
      link: "https://life.coronasafe.network/uttar_pradesh",
    },
    {
      image: wb,
      title: states[27],
      link: "https://life.coronasafe.network/west_bengal",
    },
    {
      image: an,
      title: states[28],
      link: "https://life.coronasafe.network/andaman_and_nicobar_islands_(ut)",
    },
    ,
    {
      image: chandigarh,
      title: states[29],
      link: "https://life.coronasafe.network/chandigarh_(ut)",
    },
    {
      image: dn,
      title: states[30],
      link:
        "https://life.coronasafe.network/dadra_and_nagar_haveli_and_daman_&_diu_(ut)",
    },
    {
      image: dd,
      title: states[31],
      link:
        "https://life.coronasafe.network/dadra_and_nagar_haveli_and_daman_&_diu_(ut)",
    },
    {
      image: delhi,
      title: states[32],
      link: "https://life.coronasafe.network/delhi_(nct)",
    },
    {
      image: puducherry,
      title: states[33],
      link: "https://life.coronasafe.network/puducherry_(ut)",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isSetLink, setLink] = useState(null);

  return (
    <div className="main-container">
      <br />
      <center>
        <div style={{ fontStyle: "italic" }}>
          Find resources city wise from the twitter trends
        </div>
        <br />
        <Twitter />
        <h1>
          <hr />
          OR
          <hr />
        </h1>
        <div style={{ fontStyle: "italic" }}>
          Find resources state wise from a crowd sourced website
        </div>
      </center>

      <div className="grid">
        {docs &&
          docs.map((doc) => (
            <Card style={{ width: "22rem" }} className="box">
              <Card.Img variant="top" src={doc.image} className="boximg" />
              {/* <center>(State Map)</center> */}
              <Card.Body>
                <hr />
                <center>
                  <Card.Title>{doc.title}</Card.Title>
                </center>
                <hr />
                <center>
                  <Button
                    className="btn1"
                    variant="outlined"
                    onClick={() => {
                      setIsOpen(true);
                      setLink(doc.link);
                    }}
                  >
                    Show Resources
                  </Button>
                </center>
                <Modal
                  aria-labelledby="modal-label"
                  autoFocus={false}
                  show={isOpen}
                  onHide={() => setIsOpen(false)}
                >
                  <Modal.Header
                    closeButton
                    style={{
                      background:
                        "linear-gradient(to right, #205a58, #2b7a78, #3aafa9)",
                      color: "#feffff",
                    }}
                  >
                    Alert!
                  </Modal.Header>
                  <Modal.Body>
                    This link will redirect you to a third party website. Are
                    you sure you want to redirect?
                    <br />
                    <br />
                    <center>
                      <Button
                        variant="outlined"
                        className="btn1"
                        href={isSetLink}
                        target="__blank"
                        onClick={() => setIsOpen(false)}
                      >
                        Okay
                      </Button>
                    </center>
                  </Modal.Body>
                </Modal>
              </Card.Body>
            </Card>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default StateCard;
