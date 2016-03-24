import React from 'react';
import Row from './customerListTableRow.jsx';
class CustomerListTable extends React.Component {
  render() {
    const { customers = [] } = this.props;
    const rows = [];
    for (let customer of customers) {
      rows.push(<Row customer={customer}/>);
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
