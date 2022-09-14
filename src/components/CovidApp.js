import React, { Component } from "react";
import Lottie from "react-lottie";
import { withStyles } from "@material-ui/styles";
import MapSection from "./MapSection";
import Overview from "./Overview";
import stateCodes from "../constants/stateCodes";
import * as animationData from "../assets/loading.json";
import styles from "../styles/CovidAppStyles";
import "../styles/DarkModeButton.css";
import Main from "./Main";
import StateTable from "./Statewise";
import { Footer } from "./Footer";
import countryDataJson from "../Data/countryData.json";
import districtLevelJson from "../Data/districtLevel.json";
import UpdatesJson from "../Data/updates.json";

import "../styles/Disclaimer.css";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const months = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

class CovidApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      todayData: {},
      isLoading: false,
      mapData: [],
      tableData: [],
      viewPopup: false,
    };

    this.fetchData = this.fetchData.bind(this);
    this.formatData = this.formatData.bind(this);
    this.findId = this.findId.bind(this);
    this.handleFormat = this.handleFormat.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    let visited = localStorage["alreadyVisited"];
    if (!visited) {
      this.setState({ viewPopup: false });
      console.log("In component visited");
    } else {
      localStorage["alreadyVisited"] = true;
      this.setState({ viewPopup: true });
      console.log("In component else");
    }
  }
  async fetchData() {
    this.setState({ isLoading: !this.state.isLoading });

    // const countryData = countryDataJson;
    // const districtLevel = []; //await JSON.stringify(districtLevelJson);
    //JSON.stringify(stateChangesJson);
    // const updates = []; //await JSON.stringify(UpdatesJson);

    const countryData = countryDataJson;
    const districtLevel = districtLevelJson;
    const updates = UpdatesJson;
    const [todayData] = countryData.statewise.slice(0, 1);
    const casesTimeline = countryData.cases_time_series;
    const data = countryData.statewise.slice(1, -1);

    this.setState(
      {
        data: data,
        todayData: todayData,
        casesTimeline: casesTimeline,
        districtLevel: districtLevel,
        updates: updates,
        expanded: false,
      },
      this.handleFormat
    );
  }

  formatData(data) {
    const formatedData = data.map((state, i) => {
      return {
        id: this.findId(state.state),
        state: state.state.replace(" and ", " & "),
        value: state.confirmed,
      };
    });
    return formatedData;
  }

  findId(location) {
    for (let [key, value] of Object.entries(stateCodes)) {
      if (location === key) {
        return value;
      }
    }
  }

  handleFormat() {
    const newdata = this.formatData(this.state.data);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
    this.setState({ mapData: newdata });
  }

  handleNotification() {
    this.setState({ expanded: !this.state.expanded });
  }

  formatDate(timestamp) {
    try {
      const [date, time] = timestamp.split(" ");
      const formattedDate = date.split("/");
      console.log(time);
      return `${formattedDate[0]} ${months[formattedDate[1]]}, ${time.slice(
        0,
        5
      )} IST`;
    } catch (err) {}
  }
  modalDisplay() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { classes } = this.props;
    const { mapData, isLoading, data } = this.state;
    if (isLoading) {
      return (
        <div className={classes.loadingIcon}>
          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
      );
    }
    return (
      <div>
        <blockquote className="disclaimer">
          <strong>Disclaimer!</strong>
          <p style={{ fontSize: "13px" }}>
            This website is created by the engineering students seeking to help
            medical personnel and citizens of India during these challenging
            times. The data displayed is acquired from various sources in
            real-time. The project creators do not guarentee the accuracy of the
            data.
          </p>
        </blockquote>

        <div className="main-container">
          {/* <Modal
        aria-labelledby='modal-label'
        autoFocus={false}
        show={this.state.viewPopup}
        onHide={()=>this.setState({viewPopup:false})}
        >
          <div style={{padding:'32px'}}>
          <h3>Disclaimer!</h3>
          <p>The data displayed is just for information purposes acquired from various sources in real-time. The project creators do not guarentee the accuracy of the data</p>
          </div>
          
        </Modal> */}
          <div>
            <Main />
            <br />
            <div
              style={{ fontSize: 13, fontStyle: "italic" }}
              className={classes.lastUpdatedTime}
            >
              Last Updated: {this.state.todayData.lastupdatedtime}
              <br />
              Source: covid19india.org
            </div>
            <Overview
              data={this.state.todayData}
              loadingStatus={this.loadingStatus}
            />
          </div>
          <hr />
          <div className={classes.content} style={{ paddingBottom: 0 }}>
            <div className={classes.contentArea}>
              <div className={classes.mapArea}>
                <MapSection data={data} mapData={mapData} />
              </div>
            </div>
          </div>
          <hr></hr>
          <div>
            <StateTable />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CovidApp);
