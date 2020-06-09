import React from "react";
import { connect } from "react-redux";

const Filters = ({ filter, handleFilterChange }) => (
  <select value={filter} onChange={e => handleFilterChange(e.target.value)}>
    <option value="SHOW_ALL">Show all</option>
    <option value="SHOW_TODO">Show todo</option>
    <option value="SHOW_DONE">Show done</option>
  </select>
);
const mapStateToProps = state => ({
  filter: state.tasks.filter
});
const mapDispatchToProps = dispatch => ({
  handleFilterChange: newFilterValue =>
    dispatch({
      type: "CHANGE_FILTER",
      newFilter: newFilterValue
    })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);