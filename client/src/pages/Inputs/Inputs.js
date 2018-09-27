import React, { Component } from 'react';
import JSONTree from 'react-json-tree'
import api from '../../api';
import { Button, Tabs } from 'antd';

import './Inputs.css';
import { COINS } from "../../constants";
import { download } from "../../utils";

const TabPane = Tabs.TabPane;

class Inputs extends Component {
  state = {
    inputs: [],
    coin: COINS.BTC,
  };

  componentDidMount() {
    const { coin } = this.state;
    this.getInputs(coin)
  }

  getInputs(coin) {
    // if (coin === 'BTC') return;
    api.endpoints.getInputs(coin).then(inputs => {
      this.setState({
        inputs,
      });
    });
  }

  downloadTX = () => {
    const { coin, inputs } = this.state;

    download(inputs, `TX_${coin}`);
  };

  onTabChange = coin => {
    this.setState({ coin });
    this.getInputs(coin);
  };

  renderContent = () => {
    const { inputs } = this.state;
    return (
      <div>
        <Button
            type="primary"
            className="addresses-button"
            onClick={this.downloadTX}
        >
          Download TX
        </Button>

        <JSONTree data={inputs} />
      </div>
    )
  };

  render() {
    return (
        <div>
          <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            {Object.keys(COINS).map(coin => <TabPane tab={coin} key={coin} />)}
          </Tabs>
          {this.renderContent()}
        </div>
    )
  }
}

export default Inputs;