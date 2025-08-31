import React from "react";
import { FaPencil } from "react-icons/fa6";

export const ViewAndUpdateField = ({ canEdit, type, value }) => {
  return (
    <div className="relative">
      <FaPencil size={16} />
      <label> {value} </label>
    </div>
  );
};
