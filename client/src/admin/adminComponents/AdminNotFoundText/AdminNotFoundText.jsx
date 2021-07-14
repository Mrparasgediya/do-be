import React from "react";

function AdminNotFoundText({ children }) {
  return (
    <tr
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <td>
        <h4>{children}</h4>
      </td>
    </tr>
  );
}

export default AdminNotFoundText;
