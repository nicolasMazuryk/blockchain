import React, { Component } from 'react';
import { Table } from 'antd';

import api from '../../api';
import './Address.css';
const { Column } = Table;

class Address extends Component {
  state = {
    address: '',
    balance: '-',
    inputs: [],
  };

  componentDidMount() {
    const { address } = this.props.match.params;
    if (address) {
      this.setState({ address });
      api.endpoints.getBalance(address)
          .then(({ balance }) => this.setState({ balance }));
      api.endpoints.getInputs(address)
          .then(({ inputs }) => this.setState({ inputs }));
    }
  }

  render() {
    const { inputs, balance, address } = this.state;
    return (
        <div>
          <div className="address-header">
            <div className="address-fields">
              <span>Address:</span>
              <span>Balance:</span>
            </div>
            <div className="address-values">
              <span>{ address }</span>
              <span>{ balance }</span>
            </div>
          </div>

          <Table
              rowKey={record => record.index}
              dataSource={inputs}
              indentSize={5}
              pagination={false}
          >
            <Column title="Index" dataIndex="index" />
            <Column title="Height" dataIndex="height"/>
            <Column title="Tx Hash" width="20%" dataIndex="tx_hash"/>
            <Column title="Raw Tx" width="50%" dataIndex="rawTx"/>
            <Column title="Value" dataIndex="value"/>
          </Table>
        </div>
    )
  }
}

export default Address;