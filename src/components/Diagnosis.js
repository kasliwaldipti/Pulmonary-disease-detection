import React, { Component } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Form, Col } from "react-bootstrap";
import { Footer } from "./Footer";
import "../styles/Diagnosis.css";

import jsPDF from "jspdf";
import "firebase/firestore";
import fire from "../firebase/config";
import ClipLoader from "react-spinners/ClipLoader";
export default class Diagnosis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      src: "",
      output: "",
      name: "",
      phoneno: "",
      email: "",
      dob: "",
      addr: "",
      city: "",
      indiaState: "choose",
      zip: "",
      file: "",
      nameError: "",
      phoneNoError: "",
      emailError: "",
      dobError: "",
      addrError: "",
      cityError: "",
      indiaStateError: "",
      zipError: "",
      fileError: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.printDoc = this.printDoc.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handlePhoneNoChange = (event) => {
    this.setState({
      phoneno: event.target.value,
    });
  };
  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleDobChange = (event) => {
    this.setState({
      dob: event.target.value,
    });
  };
  handleAddrChange = (event) => {
    this.setState({
      addr: event.target.value,
    });
  };
  handleCityChange = (event) => {
    this.setState({
      city: event.target.value,
    });
  };
  handleIndiaStateChange = (event) => {
    this.setState({
      indiaState: event.target.value,
    });
  };
  handleZipChange = (event) => {
    this.setState({
      zip: event.target.value,
    });
  };
  // handlefileChange = (event) => {
  //     this.setState ({
  //         file: event.target.files[0]
  //     })
  // };

  async handleSubmit(event) {
    this.setState({ loading: true });

    // if(!(new RegExp(/^(?:[A-Za-z]+)$/.test(this.state.name)))){
    //     this.setState({
    //         nameError: "Invalid name",
    //         // name:"",
    //     });
    //     event.preventDefault()
    // }
    // if((new RegExp(/^(?:[A-Za-z]+)$/.test(this.state.phoneno)))){
    //     this.setState({
    //         phoneNoError: "Invalid number",
    //         // phoneno:"",
    //     });
    //     event.preventDefault()
    // }
    // if((new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email))){
    //     this.setState({
    //         emailError: "Invalid email",
    //         // email:"",
    //     });
    //     event.preventDefault()
    // }
    // if(!(new RegExp(/^(?:[A-Za-z]+)$/.test(this.state.city)))){
    //     this.setState({
    //         cityError: "Invalid city",
    //         // city:"",
    //     });
    //     event.preventDefault()
    // }
    // if(this.state.indiaState==="choose"){
    //     this.setState({
    //         indiaStateError: "Select a state",
    //         // indiaState:"choose",
    //     });
    //     event.preventDefault()
    // }
    // if((new RegExp(/^(?:[A-Za-z]+)$/.test(this.state.zip)))){
    //     this.setState({
    //         zipError: "Invalid number",
    //         // zip:"",
    //     });
    //     event.preventDefault()
    // }
    // if(this.state.file===""){
    //     this.setState({
    //         fileError: "Select a file",
    //         // file:"",
    //     });
    //     event.preventDefault()
    // }
    const formData = new FormData();
    formData.append("file", this.state.file);
    var res = await axios({
      url: "https://covid-detection-api.herokuapp.com/upload_rest",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        console.log(res);
        this.setState({ loading: false });
        var reader = new FileReader();
        //var url = reader.readAsDataURL(this.state.file);
        reader.onloadend = (e) => {
          this.setState({
            src: reader.result,
          });
        };
        this.setState({
          output: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(res);
    const db = fire.firestore();

    const userRef = await db.collection("patients").add({
      name: this.state.name,
      phoneno: this.state.phoneno,
      email: this.state.email,
      addr: this.state.addr,
      dob: this.state.dob,
      city: this.state.city,
      indiaState: this.state.indiaState,
      zip: this.state.zip,
    });
    console.log(userRef);
  }
  printDoc() {
    //     // const input = document.getElementById('Diagnosis');
    //     // html2canvas(input)
    //     //   .then((canvas) => {
    //     //     const imgData = canvas.toDataURL('image/png');
    //     //     const pdf = new jsPDF();
    //     //     pdf.addImage(imgData, 'JPEG', 0, 0);
    //     //     // pdf.output('dataurlnewwindow');
    //     //     pdf.save("download.pdf");
    //     //   })
    //    // ;
    var today = new Date(),
      date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();
    if (this.state.output.custom_chest_pred === "Covid") {
      var doc = new jsPDF("p", "pt");
      doc.setFillColor(0, 102, 99);
      doc.rect(0, 0, 700, 50, "F");
      doc.setFontSize(28);
      doc.setTextColor(255, 255, 255);
      doc.text(255, 40, "PDDA");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(470, 90, "Date: " + date);
      doc.setFontSize(16);
      doc.setTextColor(0, 102, 99);
      doc.setFont("Arial", "bold");
      doc.line(5, 120, 590, 120);
      doc.text(220, 140, "DIAGNOSIS REPORT");
      doc.line(5, 150, 590, 150);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont("Calibri", "normal");
      doc.text(20, 190, "Name:");
      doc.text(220, 190, this.state.name);
      doc.text(20, 220, "Address: ");
      doc.text(220, 220, this.state.addr);
      doc.text(20, 250, "E-mail:");
      doc.text(220, 250, this.state.email);
      doc.text(20, 280, "Phone Number:");
      doc.text(220, 280, this.state.phoneno);
      doc.text(20, 310, "Model Diagnosis:");
      doc.setTextColor(255, 0, 0);
      doc.text(220, 310, this.state.output.custom_chest_pred);
      doc.setTextColor(0, 0, 0);
      doc.text(20, 340, "Prediction Percentage:");
      doc.text(220, 340, this.state.output.custom_chest_perc);
      doc.line(5, 360, 590, 360);
      doc.setFont("Arial", "bold");
      doc.text(20, 390, "Precautionary Measures: ");
      doc.setTextColor(0, 0, 0);
      doc.setFont("Calibri", "normal");
      doc.text(20, 420, "1. Maitain social distancing when in public.");
      doc.text(20, 440, "2. Wear a double mask while going out.");
      doc.text(20, 460, "3. Get vaccinated as soon as possible.");
      doc.text(20, 480, "4. Wash your hands frequently.");
      doc.setFont("Calibri", "underlined");
      doc.setFont("Arial", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(20, 520, "Helpful Links: ");
      doc.setFont("Calibri", "normal");
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(10);
      doc.textWithLink("https://www.mohfw.gov.in/", 20, 550, {
        url: "https://www.mohfw.gov.in/",
      });
      doc.textWithLink("https://www.covid19india.org/", 20, 570, {
        url: "https://www.covid19india.org/",
      });
      doc.textWithLink("https://life.coronasafe.network/", 20, 590, {
        url: "https://life.coronasafe.network/",
      });
      doc.textWithLink("http://pulmonary.netlify.app/", 20, 610, {
        url: "http://pulmonary.netlify.app/",
      });

      doc.setTextColor(0, 0, 0);
      doc.setFont("Arial", "bold");
      doc.text(20, 780, "*Important Note: ");
      doc.setFont("Calibri", "normal");
      doc.setFontSize(10);
      doc.text(
        20,
        810,
        "The above mentioned is based on an autometed computation program, consulting a doctor for second opinion is recommended."
      );
      doc.save("demo.pdf");
    } else if (this.state.output.custom_chest_pred === "Pneumonia") {
      // var doc = new jsPDF("p", "pt");
      doc.setFillColor(0, 102, 99);
      doc.rect(0, 0, 700, 50, "F");
      doc.setFontSize(28);
      doc.setTextColor(255, 255, 255);
      doc.text(255, 40, "PDDA");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(470, 90, "Date: " + date);
      doc.setFontSize(16);
      doc.setTextColor(0, 102, 99);
      doc.setFont("Arial", "bold");
      doc.line(5, 120, 590, 120);
      doc.text(220, 140, "DIAGNOSIS REPORT");
      doc.line(5, 150, 590, 150);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont("Calibri", "normal");
      doc.text(20, 190, "Name:");
      doc.text(220, 190, this.state.name);
      doc.text(20, 220, "Address: ");
      doc.text(220, 220, this.state.addr);
      doc.text(20, 250, "E-mail:");
      doc.text(220, 250, this.state.email);
      doc.text(20, 280, "Phone Number:");
      doc.text(220, 280, this.state.phoneno);
      doc.text(20, 310, "Model Diagnosis:");
      doc.setTextColor((255, 75, 0));
      doc.text(220, 310, this.state.output.custom_chest_pred);
      doc.setTextColor(0, 0, 0);
      doc.text(20, 340, "Prediction Percentage:");
      doc.text(220, 340, this.state.output.custom_chest_perc);
      doc.line(5, 360, 590, 360);
      doc.setFont("Arial", "bold");
      doc.text(20, 390, "Precautionary Measures: ");
      doc.setTextColor(0, 0, 0);
      doc.setFont("Calibri", "normal");
      doc.text(20, 420, "1. Maitain social distancing when in public.");
      doc.text(20, 440, "2. Wear a double mask while going out.");
      doc.text(20, 460, "3. Get vaccinated as soon as possible.");
      doc.text(20, 480, "4. Wash your hands frequently.");
      doc.setFont("Calibri", "underlined");
      doc.setFont("Arial", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(20, 520, "Helpful Links: ");
      doc.setFont("Calibri", "normal");
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(10);
      doc.textWithLink("https://www.mohfw.gov.in/", 20, 550, {
        url: "https://www.mohfw.gov.in/",
      });
      doc.textWithLink("https://www.covid19india.org/", 20, 570, {
        url: "https://www.covid19india.org/",
      });
      doc.textWithLink("https://life.coronasafe.network/", 20, 590, {
        url: "https://life.coronasafe.network/",
      });
      doc.textWithLink("http://pulmonary.netlify.app/", 20, 610, {
        url: "http://pulmonary.netlify.app/",
      });
      doc.setTextColor(0, 0, 0);
      doc.setFont("Arial", "bold");
      doc.text(20, 780, "*Important Note: ");
      doc.setFont("Calibri", "normal");
      doc.setFontSize(10);
      doc.text(
        20,
        810,
        "The above mentioned is based on an autometed computation program, consulting a doctor for second opinion is recommended."
      );
      doc.save("demo.pdf");
    } else if (this.state.output.custom_chest_pred === "Normal") {
      // var doc = new jsPDF("p", "pt");
      doc.setFillColor(0, 102, 99);
      doc.rect(0, 0, 700, 50, "F");
      doc.setFontSize(28);
      doc.setTextColor(255, 255, 255);
      doc.text(255, 40, "PDDA");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(470, 90, "Date: " + date);
      doc.setFontSize(16);
      doc.setTextColor(0, 102, 99);
      doc.setFont("Arial", "bold");
      doc.line(5, 120, 590, 120);
      doc.text(220, 140, "DIAGNOSIS REPORT");
      doc.line(5, 150, 590, 150);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont("Calibri", "normal");
      doc.text(20, 190, "Name:");
      doc.text(220, 190, this.state.name);
      doc.text(20, 220, "Address: ");
      doc.text(220, 220, this.state.addr);
      doc.text(20, 250, "E-mail:");
      doc.text(220, 250, this.state.email);
      doc.text(20, 280, "Phone Number:");
      doc.text(220, 280, this.state.phoneno);
      doc.text(20, 310, "Model Diagnosis:");
      doc.setTextColor((0, 255, 0));
      doc.text(220, 310, this.state.output.custom_chest_pred);
      doc.setTextColor(0, 0, 0);
      doc.text(20, 340, "Prediction Percentage:");
      doc.text(220, 340, this.state.output.custom_chest_perc);
      doc.line(5, 360, 590, 360);
      doc.setFont("Arial", "bold");
      doc.text(20, 390, "Precautionary Measures: ");
      doc.setTextColor(0, 0, 0);
      doc.setFont("Calibri", "normal");
      doc.text(20, 420, "1. Maitain social distancing when in public.");
      doc.text(20, 440, "2. Wear a double mask while going out.");
      doc.text(20, 460, "3. Get vaccinated as soon as possible.");
      doc.text(20, 480, "4. Wash your hands frequently.");
      doc.setFont("Calibri", "underlined");
      doc.setFont("Arial", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(20, 520, "Helpful Links: ");
      doc.setFont("Calibri", "normal");
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(10);
      doc.textWithLink("https://www.mohfw.gov.in/", 20, 550, {
        url: "https://www.mohfw.gov.in/",
      });
      doc.textWithLink("https://www.covid19india.org/", 20, 570, {
        url: "https://www.covid19india.org/",
      });
      doc.textWithLink("https://life.coronasafe.network/", 20, 590, {
        url: "https://life.coronasafe.network/",
      });
      doc.textWithLink("http://pulmonary.netlify.app/", 20, 610, {
        url: "http://pulmonary.netlify.app/",
      });
      doc.setTextColor(0, 0, 0);
      doc.setFont("Arial", "bold");
      doc.text(20, 780, "*Important Note: ");
      doc.setFont("Calibri", "normal");
      doc.setFontSize(10);
      doc.text(
        20,
        810,
        "The above mentioned is based on an autometed computation program, consulting a doctor for second opinion is recommended."
      );
      doc.save("demo.pdf");
    }
    this.setState({
      name: "",
      phoneno: "",
      email: "",
      dob: "",
      addr: "",
      city: "",
      indiaState: "choose",
      zip: "",
      file: "",
    });
    window.location.reload(false);
  }
  render() {
    return (
      <div className="main-container">
        {this.state.loading ? (
          <div className="cen">
            <ClipLoader color="#006562" />
          </div>
        ) : (
          <div className="Diagnosis" id="Diagnosis">
            <br />
            <h2>Patient Details</h2>
            <hr />

            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Patient's Name"
                    required
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {this.state.nameError}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhoneNo">
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone No."
                    required
                    value={this.state.phoneno}
                    onChange={this.handlePhoneNoChange}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {this.state.phoneNoError}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email ID"
                    required
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {this.state.emailError}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDOB">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    required
                    value={this.state.dob}
                    onChange={this.handleDobChange}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {this.state.dobError}
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="Patient's Address"
                  required
                  value={this.state.addr}
                  onChange={this.handleAddrChange}
                />
                <Form.Text style={{ color: "red" }}>
                  {this.state.addrError}
                </Form.Text>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder="Enter City Name"
                    required
                    value={this.state.city}
                    onChange={this.handleCityChange}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {this.state.cityError}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    defaultValue={this.state.indiaState}
                    onChange={this.handleIndiaStateChange}
                  >
                    <option value="choose">Choose...</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">
                      Dadar and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra" selected>
                      Maharashtra
                    </option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </Form.Control>
                  <Form.Text style={{ color: "red" }}>
                    {this.state.indiaStateError}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    placeholder="Enter Zip Code"
                    required
                    value={this.state.zip}
                    onChange={this.handleZipChange}
                  />
                  <Form.Text style={{ color: "red" }}>
                    {this.state.zipError}
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Group id="formGridFile">
                <Form.Label>Upload file</Form.Label>
                <br></br>
                <input
                  type="file"
                  onChange={(e) =>
                    this.setState({
                      file: e.target.files[0],
                    })
                  }
                />
                <Form.Text style={{ color: "red" }}>
                  {this.state.fileError}
                </Form.Text>
                <Form.Text id="fileUploadHelpBlock" muted>
                  File type can be image or .dicom
                </Form.Text>
              </Form.Group>
              <center>
                <Button
                  variant="outlined"
                  className="btn1"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </center>

              {this.state.output ? (
                <div>
                  <hr></hr>
                  <Form.Group id="formGridFile">
                    <Form.Label>Analysis Result</Form.Label>
                    <Form.Control
                      value={this.state.output.custom_chest_pred}
                      disabled
                    />
                    <br></br>
                    <Form.Label>Analysis Percentage</Form.Label>
                    <Form.Control
                      value={this.state.output.custom_chest_perc}
                      disabled
                    />
                  </Form.Group>
                  <center>
                    <Button
                      variant="outlined"
                      className="btn1"
                      type="submit"
                      onClick={this.printDoc}
                    >
                      Generate Report
                    </Button>
                  </center>
                </div>
              ) : (
                []
              )}
            </Form>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
