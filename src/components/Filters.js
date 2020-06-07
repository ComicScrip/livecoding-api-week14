import React from "react";

const Filters = ({ filter = "SHOW_ALL", handleFilterChange = () => {} }) => (
  <select value={filter} onChange={e => handleFilterChange(e.target.value)}>
    <option value="SHOW_ALL">Show all</option>
    <option value="SHOW_TODO">Show todo</option>
    <option value="SHOW_DONE">Show done</option>
  </select>
);

export default Filters;
