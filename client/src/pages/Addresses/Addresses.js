import React, { Component } from 'react';
import api from '../../api';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';

import './Addresses.css';

import { ROUTES } from "../../routes";

const { Column } = Table;

class Addresses extends Component {
  state = {
    index: 0,
    addresses: [],
  };
  generateAddress = () => {
    const { index, addresses } = this.state;
    api.endpoints.generateAddress({ index: addresses.length })
        .then(response => {
          this.setState({
            index: response.index,
            addresses: addresses.concat([response]),
          })
        })
  };

  renderAddress = address => {
    return (
      <Link to={`${ROUTES.ADDRESSES.path}/${address}`}>{address}</Link>
    );
  };

  render() {
    return (
        <div>
          <Button
              type="primary"
              className="addresses-button"
              onClick={this.generateAddress}
          >
            Generate Address
          </Button>

          <Table
              rowKey={record => record.index}
              dataSource={this.state.addresses}
              indentSize={5}
              pagination={false}
          >
            <Column title="Index" dataIndex="index" />
            <Column
                title="Old Address"
                dataIndex="oldAddress"
                render={this.renderAddress}
            />
            <Column
                title="Address"
                dataIndex="address"
                render={this.renderAddress}
            />
            <Column
                title="Nested Address"
                dataIndex="nestedAddress"
                render={this.renderAddress}
            />
          </Table>
        </div>
    )
  }
}

export default Addresses;