// import React,{useState, useEffect} from 'react'
// import Popup from './Popup'
// function PopupDisplay() {
//     const[timedPopup, setTimedPopup] = useState(false);
//     useEffect(()=>{
//         setTimeout(()=>{
//             setTimedPopup(true);
//         }, 300);
//     },[]);
//     return (
//         <div>
//             <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
//             </Popup>
//         </div>
//     )
// }

// export default PopupDisplay

import React, { Component } from "react";
import { Modal } from "react-bootstrap";
export class PopupDisplay extends Component {
  constructor() {
    super();
    this.state = {
      viewPopup: false,
    };
  }
  componentDidMount() {
    let visited = localStorage["alreadyVisited"];
    if (visited) {
      this.setState({ viewPopup: true });
      console.log("In component visited");
    } else {
      localStorage["alreadyVisited"] = false;
      this.setState({ viewPopup: false });
      console.log("In component else");
    }
  }
  render() {
    return (
      <Modal
        aria-labelledby="modal-label"
        autoFocus={false}
        show={this.state.viewPopup}
        onHide={() => this.setState({ viewPopup: false })}
      >
        <div>Hello</div>
      </Modal>
    );
  }
}

export default PopupDisplay;
