import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Map from "./Map";
import { Card } from "react-bootstrap";
import "../styles/GuideCard.css";

import styles from "../styles/MapSection";

class MapSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      confirmed: "-",
      deaths: "-",
      recovered: "-",
      active: "-",
    };
    this.currentLocation = this.currentLocation.bind(this);
  }

  currentLocation(location) {
    const stateName = location.replace(" & ", " and ");

    const [updatedData] = this.props.data.filter(
      (el) => el.state === stateName
    );

    try {
      this.setState({
        ...updatedData,
        deltaactive:
          Number(updatedData.deltaconfirmed) -
          (Number(updatedData.deltarecovered) +
            Number(updatedData.deltadeaths)),
      });
    } catch (error) {}
  }

  render() {
    const { classes, mapData } = this.props;
    const { confirmed, deaths, recovered, active, state } = this.state;

    return (
      <div className={classes.mainContainer}>
        <div className={classes.heading}>
          <small>
            <b>State/UT:</b> {state}
          </small>
        </div>
        <div className={classes.para}>
          Hover over the states in the map to view the stats
        </div>
        <div className={classes.container}>
          <div className={classes.panelsContainer}>
            {/* <div className={classes.singlePanel}>
              <DisplayPanels
                title="Confirmed"
                number={confirmed}
                isDarkMode={isDarkMode}
                // dataChange={deltaconfirmed}
                isMiniPanel={true}
              />
            </div>
            <div className={classes.singlePanel}>
              <DisplayPanels
                title="Active"
                number={active}
                isDarkMode={isDarkMode}
                // dataChange={deltaactive}
                isMiniPanel={true}
              />
            </div>
            <div className={classes.singlePanel}>
              <DisplayPanels
                title="Recovered"
                number={recovered}
                isDarkMode={isDarkMode}
                // dataChange={deltarecovered}
                isMiniPanel={true}
              />
            </div>
            <div className={classes.singlePanel}>
              <DisplayPanels
                title="Deceased"
                number={deaths}
                isDarkMode={isDarkMode}
                // dataChange={deltadeaths}
                isMiniPanel={true}
              />
            </div> */}
            <div className="grid">
              <Card className="boxMapSec">
                <Card.Title style={{ fontSize: "16px" }}>Confirmed</Card.Title>
                <Card.Body>
                  <Card.Text style={{ color: "red" }}>{confirmed}</Card.Text>
                </Card.Body>
              </Card>
              <Card className="boxMapSec">
                <Card.Title style={{ fontSize: "16px" }}>Active</Card.Title>
                <Card.Body>
                  <Card.Text style={{ color: "orange" }}>{active}</Card.Text>
                </Card.Body>
              </Card>
              <Card className="boxMapSec">
                <Card.Title style={{ fontSize: "16px" }}>Recovered</Card.Title>
                <Card.Body>
                  <Card.Text style={{ color: "green" }}>{recovered}</Card.Text>
                </Card.Body>
              </Card>
              <Card className="boxMapSec">
                <Card.Title style={{ fontSize: "16px" }}>Deceased</Card.Title>
                <Card.Body>
                  <Card.Text style={{ color: "purple" }}>{deaths}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className={classes.mapContainer}>
            <Map mapData={mapData} currentLocation={this.currentLocation} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MapSection);
