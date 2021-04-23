// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 With icon: ({"icon": "path string"}) => HTML 1`] = `
<span
  class="wvui-icon"
>
  <svg
    aria-hidden="true"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!---->
     
    <path
      d="path string"
      fill="currentColor"
    />
  </svg>
</span>
`;

exports[`matches the snapshot Case 1 With icon and title: ({"icon": "path string", "iconTitle": "Add something"}) => HTML 1`] = `
<span
  class="wvui-icon"
>
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>
      Add something
    </title>
     
    <path
      d="path string"
      fill="currentColor"
    />
  </svg>
</span>
`;

exports[`matches the snapshot Case 2 With icon that should flip for RTL: ({"icon": [Object]}) => HTML 1`] = `
<span
  class="wvui-icon wvui-icon--flip-for-rtl"
>
  <svg
    aria-hidden="true"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!---->
     
    <path
      d="path should flip"
      fill="currentColor"
    />
  </svg>
</span>
`;
