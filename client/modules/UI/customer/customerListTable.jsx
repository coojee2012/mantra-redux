import React from 'react';
import CustomerListTableRow from './customerListTableRow.jsx';
class CustomerListTable extends React.Component {
  render() {
    console.log('CustomerListTable UI:', this.props);
    const { customers = [],selectedRow } = this.props;
    const rows = [];
    for (let customer of customers) {
      rows.push(<CustomerListTableRow customer={customer} selectedRow={selectedRow}/>);
    }
    return (
      <table className="table table-hover" style={{width: '80%',margin: '0 auto'}}>
        <thead>
        <tr style={{width: '40px'}}>
          <th>姓名</th>
          <th>联系方式</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}

export default CustomerListTable;
