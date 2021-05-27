// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Enabled: ({"inputValue": "checkbox-1", "modelValue": true}) => HTML 1`] = `
<label
  class="wvui-checkbox"
>
  <input
    class="wvui-checkbox__input"
    type="checkbox"
    value="checkbox-1"
  />
   
  <span
    class="wvui-checkbox__icon"
  />
   
  <span
    class="wvui-checkbox__label-content"
  >
    Checkbox 1
  </span>
</label>
`;

exports[`matches the snapshot Case 1 Disabled: ({"disabled": true, "inputValue": "checkbox-1", "modelValue": false}) => HTML 1`] = `
<label
  aria-disabled="true"
  class="wvui-checkbox"
>
  <input
    class="wvui-checkbox__input"
    disabled="disabled"
    type="checkbox"
    value="checkbox-1"
  />
   
  <span
    class="wvui-checkbox__icon"
  />
   
  <span
    class="wvui-checkbox__label-content"
  >
    Disabled checkbox
  </span>
</label>
`;
