import React from 'react';
class CustomerListTableRow extends React.Component {
  render() {
    const {name,contact} = this.props.customer;
    return (
      <tr style={{width: '40px'}}
          onClick={this.action()}
          onMouseOver={this.mouseOver()}
          onMouseOut={this.mouseOut()}>
        <td>{name}</td>
        <td>{contact}</td>
      </tr>
    );
  }

  selectRecord(id) {
    //return this.props.goCustomerDetail(id);
  }
  action(record) {
    //this.selectRecord(record.id);
  }
  mouseOver() {
    //this.refs['record' + record.id].style.backgroundColor = '#eeffff'
  }
  mouseOut() {
    //this.refs['record' + record.id].style.backgroundColor = ''
  }
}

export default CustomerListTableRow;
