//select 组件复用
import React, {Component, PropTypes} from 'react';
class TicketsSelect extends Component {
  render() {
    const selectOptions = this.props.options || [];
    const options = selectOptions.map((option, key)=> {
      return (
        <option value={option.value} key={key}>{option.key}</option>
      )
    });

    return (
      <select type="select"  {...this.props} onChange={this.props.onChange?this.props.onChange:prop.onChange}
              className="form-control">
        {options}
      </select>
    );

  }
}
export  default TicketsSelect;
