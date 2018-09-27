import React, { Component } from 'react';
import api from '../../api';
import { Button, List, Tabs } from 'antd';

import './Keys.css';
import { COINS } from "../../constants";

const TabPane = Tabs.TabPane;

class Keys extends Component {
  state = {
    keys: [],
    coin: COINS.BTC
  };

  componentDidMount() {
    const { coin } = this.state;
    this.getLists(coin)
  }

  getLists(coin) {
    api.endpoints.listKeys(coin).then(keys => {
      this.setState({
        keys: [keys],
      });
    });
  }

  generateKeys = () => {
    const { keys, coin } = this.state;
    api.endpoints.generateKeys(coin)
        .then(response => {
          this.setState({
            keys: keys.concat([response]),
          });
        })
  };

  onTabChange = coin => {
    this.setState({ coin });
    this.getLists(coin)
  };

  renderContent = () => {
    const { keys } = this.state;
    return keys.map((pubkeys, index) => (
        <div key={index} className="list-item">
          <List
              header={<div>Public Keys</div>}
              bordered
              dataSource={pubkeys}
              renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
    ))
  };

  render() {
    return (
        <div>
          <Button
              type="primary"
              className="addresses-button"
              onClick={this.generateKeys}
          >
            Generate Public Keys
          </Button>

          <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            {Object.keys(COINS).map(coin => <TabPane tab={coin} key={coin} />)}
          </Tabs>
          {this.renderContent()}
        </div>
    )
  }
}

export default Keys;