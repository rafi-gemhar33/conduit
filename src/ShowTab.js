import React from "react";
import { NavLink } from "react-router-dom";
export function ShowTab() {
  return (
    <div className="tabs is-medium">
      <ul>
        <li className="is-active">
          <NavLink to="#">Gloabal feed</NavLink>
        </li>
        <li>
          <NavLink to="#">Your feed</NavLink>
        </li>
        <li>
          <NavLink to="#">Recomended feed</NavLink>
        </li>
      </ul>
    </div>
  );
}
