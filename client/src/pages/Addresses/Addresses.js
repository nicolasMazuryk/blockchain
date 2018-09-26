import React, { Component } from 'react';
import api from '../../api';
import { Button, Table, Tabs, Badge } from 'antd';

import './Addresses.css';
import { COINS } from "../../constants";

const TabPane = Tabs.TabPane;

const { Column } = Table;

class Addresses extends Component {
  state = {
    balance: '',
    addresses: [],
    coin: COINS.BTC,
  };

  componentDidMount() {
    const { coin } = this.state;
    this.getAddresses(coin)
    this.getBalance(coin)
  }

  getAddresses(coin) {
    api.endpoints.listAddress(coin).then(addresses => {
      this.setState({
        addresses,
      });
    });
  }

  getBalance(coin) {
    api.endpoints.getBalance(coin).then(balance => {
      this.setState({
        balance,
      });
    });
  }

  generateAddress = () => {
    const { addresses, coin } = this.state;
    api.endpoints.generateAddress(coin)
        .then(response => {
          this.setState({
            addresses: addresses.concat([response]),
          });
        })
  };

  onTabChange = coin => {
    console.log(coin);
    this.setState({ coin });
    this.getAddresses(coin)
    this.getBalance(coin)
  };

  renderAddresses = addresses => {
    return addresses.map(address => <span className="address-text">{address}</span>);
  };

  renderContent = () => {
    const { addresses } = this.state;
    return (
      <Table
          rowKey={record => record.index}
          dataSource={addresses}
          indentSize={5}
          pagination={false}
      >
        <Column title="Index" dataIndex="index" />
        <Column
            title="Addresses"
            dataIndex="addresses"
            render={this.renderAddresses}
        />
      </Table>
    )
  };

  render() {
    const { balance } = this.state;
    return (
        <div>
          <Button
              type="primary"
              className="addresses-button"
              onClick={this.generateAddress}
          >
            Generate Address
          </Button>
          <div className="balance">
            <span>Balance: </span>
            <code>{balance}</code>
          </div>
          <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            {Object.keys(COINS).map(coin => <TabPane tab={coin} key={coin} />)}
          </Tabs>
          {this.renderContent()}
        </div>
    )
  }
}

export default Addresses;