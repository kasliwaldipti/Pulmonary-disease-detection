import React from "react";
import { withStyles } from "@material-ui/styles";
import { Card } from "react-bootstrap";
import "../styles/GuideCard.css";
import styles from "../styles/OverviewStyles";

function Overview(props) {
  const { classes } = props;
  const { active, confirmed, deaths, recovered } = props.data;

  return (
    <div className={classes.root}>
      <div className={classes.panels}>
        {/* <div className={classes.panelContainer}>
          <DisplayPanels
            title="Confirmed"
            number={confirmed}
            isDarkMode={isDarkMode}
            // dataChange={deltaconfirmed > 0 ? deltaconfirmed : "-"}
          />
        </div>
        <div className={classes.panelContainer}>
          <DisplayPanels
            title="Active"
            number={active}
            isDarkMode={isDarkMode}
            // dataChange={deltaActive}
          />
        </div>
        <div className={classes.panelContainer}>
          <DisplayPanels
            title="Recovered"
            number={recovered}
            isDarkMode={isDarkMode}
            // dataChange={deltarecovered}
          />
        </div>
        <div className={classes.panelContainer}>
          <DisplayPanels
            title="Deceased"
            number={deaths}
            isDarkMode={isDarkMode}
            // dataChange={deltadeaths}
          />
        </div> */}
        <Card className="boxMainPage">
          <Card.Title>Confirmed</Card.Title>
          <Card.Body>
            <Card.Text style={{ color: "red" }}>{confirmed}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="boxMainPage">
          <Card.Title>Active</Card.Title>
          <Card.Body>
            <Card.Text style={{ color: "orange" }}>{active}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="boxMainPage">
          <Card.Title>Recovered</Card.Title>
          <Card.Body>
            <Card.Text style={{ color: "green" }}>{recovered}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="boxMainPage">
          <Card.Title>Deceased</Card.Title>
          <Card.Body>
            <Card.Text style={{ color: "purple" }}>{deaths}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default withStyles(styles)(Overview);
