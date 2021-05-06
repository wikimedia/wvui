// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 String value: ({"inputValue": "radio-1", "modelValue": "radio-1", "name": "radios-string"}) => HTML 1`] = `
<label
  class="wvui-radio"
>
  <input
    class="wvui-radio__input"
    name="radios-string"
    type="radio"
    value="radio-1"
  />
   
  <span
    class="wvui-radio__icon"
  />
   
  <span
    class="wvui-radio__label-content"
  >
    Radio 1
  </span>
</label>
`;

exports[`matches the snapshot Case 1 Number value: ({"inputValue": 2, "modelValue": 2, "name": "radios-number"}) => HTML 1`] = `
<label
  class="wvui-radio"
>
  <input
    class="wvui-radio__input"
    name="radios-number"
    type="radio"
    value="2"
  />
   
  <span
    class="wvui-radio__icon"
  />
   
  <span
    class="wvui-radio__label-content"
  >
    Radio 2
  </span>
</label>
`;

exports[`matches the snapshot Case 2 Boolean value: ({"inputValue": true, "modelValue": true, "name": "radios-boolean"}) => HTML 1`] = `
<label
  class="wvui-radio"
>
  <input
    class="wvui-radio__input"
    name="radios-boolean"
    type="radio"
    value="true"
  />
   
  <span
    class="wvui-radio__icon"
  />
   
  <span
    class="wvui-radio__label-content"
  >
    True
  </span>
</label>
`;

exports[`matches the snapshot Case 3 Disabled: ({"disabled": true, "inputValue": "radio-disabled", "modelValue": "radio-1", "name": "radios-string"}) => HTML 1`] = `
<label
  aria-disabled="true"
  class="wvui-radio"
>
  <input
    class="wvui-radio__input"
    disabled="disabled"
    name="radios-string"
    type="radio"
    value="radio-disabled"
  />
   
  <span
    aria-disabled="true"
    class="wvui-radio__icon"
  />
   
  <span
    class="wvui-radio__label-content"
  >
    Disabled radio
  </span>
</label>
`;
