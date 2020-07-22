// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 With icon: ({"icon": [Object]}) => HTML 1`] = `
<span
  class="wvui-icon"
>
  <svg
    aria-hidden="true"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="currentColor"
    >
      <path
        d="path string"
      />
    </g>
  </svg>
   
  <span
    class="wvui-icon__content"
  />
</span>
`;

exports[`matches the snapshot Case 1 With icon and hex color: ({"icon": [Object], "iconColor": "#ff6347"}) => HTML 1`] = `
<span
  class="wvui-icon"
>
  <svg
    aria-hidden="true"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="#ff6347"
    >
      <path
        d="path string"
      />
    </g>
  </svg>
   
  <span
    class="wvui-icon__content"
  />
</span>
`;

exports[`matches the snapshot Case 2 With icon and slot content: ({"icon": [Object]}) => HTML 1`] = `
<span
  class="wvui-icon"
>
  <svg
    aria-hidden="true"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="currentColor"
    >
      <path
        d="path string"
      />
    </g>
  </svg>
   
  <span
    class="wvui-icon__content"
  >
    Add something
  </span>
</span>
`;

exports[`matches the snapshot Case 3 With icon that should flip for RTL: ({"icon": [Object]}) => HTML 1`] = `
<span
  class="wvui-icon wvui-icon--should-flip"
>
  <svg
    aria-hidden="true"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="currentColor"
    >
      <path
        d="path flippable"
      />
    </g>
  </svg>
   
  <span
    class="wvui-icon__content"
  />
</span>
`;
