import * as React from "react";

const Marker = (props) => (
  <svg
    width={24}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 0A11.2 11.2 0 0 0 .75 11.25c0 2.162.645 3.832 1.764 5.525l8.302 12.598c.252.38.686.627 1.184.627.498 0 .938-.252 1.184-.627l8.302-12.598c1.12-1.693 1.764-3.363 1.764-5.525A11.2 11.2 0 0 0 12 0Zm0 17.496a6.255 6.255 0 0 1-6.252-6.258c0-3.457 2.8-6.258 6.252-6.258 3.451 0 6.252 2.801 6.252 6.258s-2.8 6.258-6.252 6.258ZM12 7.5a3.746 3.746 0 0 0-3.75 3.75A3.746 3.746 0 0 0 12 15a3.746 3.746 0 0 0 3.75-3.75A3.746 3.746 0 0 0 12 7.5Z"
      fill="#FF3B2F"
    />
  </svg>
);

export default Marker;
