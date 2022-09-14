import React, { Component } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import StateDistrictWiseJson from "../Data/state-district-wise.json";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import "../styles/Vaccination.css";
import { Form, Col } from "react-bootstrap";
import "../styles/State.css";

class StateTable extends Component {
  constructor() {
    super();
    this.state = {
      statename: "",
      sdata: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const res = StateDistrictWiseJson;
    console.log(res);
    var staten;

    try {
      if (document.getElementById("state").value === null) {
        staten = "Maharashtra";
      } else {
        staten = document.getElementById("state").value;
      }
    } catch (e) {}
    var disarr, i;
    for (i = 0; i < res.length; i++) {
      if (res[i].state === staten) {
        disarr = res[i].districtData;
      }
    }
    console.log(disarr);
    // console.log(disarr.data)

    // console.log(statedata.data)
    this.setState({ sdata: disarr });
  }
  render() {
    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => (
        <DeleteOutline {...props} ref={ref} />
      )),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => (
        <ViewColumn {...props} ref={ref} />
      )),
    };
    return (
      <div className="State">
        <br />
        <h2>State Wise Data</h2>
        <hr />
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Select State: </Form.Label>
              <Form.Control
                as="select"
                name="state"
                id="state"
                onChange={this.getData}
              >
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
            </Form.Group>
          </Form.Row>
        </Form>
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: "District", field: "district" },
            { title: "Active", field: "active" },
            { title: "Confirmed", field: "confirmed" },

            {
              title: "Recovered",
              field: "recovered",
            },
          ]}
          data={this.state.sdata}
          title=""
          options={{
            headerStyle: {
              backgroundColor: "#3b3c3d",
              color: "#feffff",
              fontSize: "1rem",
            },
            tableLayout: {
              AddBox: true,
            },
          }}
        />
      </div>
    );
  }
}

export default StateTable;
