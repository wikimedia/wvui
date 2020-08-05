// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 With highlight (query matches): ({"query": "Co", "title": "Color"}) => HTML 1`] = `
<span
  class="wvui-typeahead-suggestion__title"
>
  <em
    class="wvui-typeahead-suggestion__match"
  >
    Co
  </em>
  lor
</span>
`;

exports[`matches the snapshot Case 1 Without highlight (no query): ({"title": "Color"}) => HTML 1`] = `
<span
  class="wvui-typeahead-suggestion__title"
>
  Color
</span>
`;

exports[`matches the snapshot Case 2 Without highlight (query doesn't match): ({"query": "123", "title": "Color"}) => HTML 1`] = `
<span
  class="wvui-typeahead-suggestion__title"
>
  Color
</span>
`;
