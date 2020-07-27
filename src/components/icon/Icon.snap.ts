// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 With icon: ({"icon": "path string"}) => HTML 1`] = `
<span
  class="wvui-icon"
>
  <svg
    aria-hidden="true"
    height="1em"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!---->
     
    <g
      fill="currentColor"
    >
      <path
        d="path string"
      />
    </g>
  </svg>
</span>
`;

exports[`matches the snapshot Case 1 With icon and hex color: ({"icon": "path string", "iconColor": "#ff6347"}) => HTML 1`] = `
<span
  class="wvui-icon"
>
  <svg
    aria-hidden="true"
    height="1em"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!---->
     
    <g
      fill="#ff6347"
    >
      <path
        d="path string"
      />
    </g>
  </svg>
</span>
`;

exports[`matches the snapshot Case 2 With icon and title: ({"icon": "path string", "iconTitle": "Add something"}) => HTML 1`] = `
<span
  class="wvui-icon"
>
  <svg
    height="1em"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>
      Add something
    </title>
     
    <g
      fill="currentColor"
    >
      <path
        d="path string"
      />
    </g>
  </svg>
</span>
`;

exports[`matches the snapshot Case 3 With icon that should flip for RTL: ({"icon": [Object]}) => HTML 1`] = `
<span
  class="wvui-icon wvui-icon--flip-for-rtl"
>
  <svg
    aria-hidden="true"
    height="1em"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!---->
     
    <g
      fill="currentColor"
    >
      <path
        d="path should flip"
      />
    </g>
  </svg>
</span>
`;
