import { Component } from "react";

import BlockWitthKityy from "./Component/BlockWithKitty/BlockWithKitty";
import Buttons from "./Component/Buttons/Buttons";

import "./App.css";

class App extends Component {
  state = {
    showModal: true,
    willWatch: null,
  };
  handelAnswer = (answer) => {
    this.setState({
      willWatch: answer,
      showModal: false,
    });
  };
  render() {
    const { showModal, willWatch } = this.state;

    return (
      <div className="App">
        {showModal && (
          <Buttons onAnswer={this.handelAnswer} willWatch={willWatch} />
        )}
        {willWatch === true && <BlockWitthKityy />}
      </div>
    );
  }
}

export default App;
