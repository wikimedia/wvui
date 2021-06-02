// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Nothing selected: ({"items": [Array]}) => HTML 1`] = `
<ul
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			One
		
  </li>
  <li
    aria-disabled="true"
    class="wvui-options-menu__item wvui-options-menu__item--disabled"
    role="option"
  >
    
			Two
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			Three
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			Four
		
  </li>
</ul>
`;

exports[`matches the snapshot Case 1 Item selected: ({"items": [Array], "selectedItemId": "3"}) => HTML 1`] = `
<ul
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			One
		
  </li>
  <li
    aria-disabled="true"
    class="wvui-options-menu__item wvui-options-menu__item--disabled"
    role="option"
  >
    
			Two
		
  </li>
  <li
    aria-selected="true"
    class="wvui-options-menu__item wvui-options-menu__item--selected wvui-options-menu__item--enabled"
    role="option"
  >
    
			Three
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			Four
		
  </li>
</ul>
`;

exports[`matches the snapshot Case 2 Nonexistent item selected: ({"items": [Array], "selectedItemId": "42"}) => HTML 1`] = `
<ul
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			One
		
  </li>
  <li
    aria-disabled="true"
    class="wvui-options-menu__item wvui-options-menu__item--disabled"
    role="option"
  >
    
			Two
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			Three
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			Four
		
  </li>
</ul>
`;

exports[`matches the snapshot Case 3 Disabled item selected: ({"items": [Array], "selectedItemId": "2"}) => HTML 1`] = `
<ul
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			One
		
  </li>
  <li
    aria-disabled="true"
    aria-selected="true"
    class="wvui-options-menu__item wvui-options-menu__item--selected wvui-options-menu__item--disabled"
    role="option"
  >
    
			Two
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			Three
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    
			Four
		
  </li>
</ul>
`;

exports[`matches the snapshot Case 4 Custom slot: ({"items": [Array]}) => HTML 1`] = `
<ul
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    <p>
      
						One (ID: 1)
						
      <!---->
    </p>
  </li>
  <li
    aria-disabled="true"
    class="wvui-options-menu__item wvui-options-menu__item--disabled"
    role="option"
  >
    <p>
      
						Two (ID: 2)
						(DISABLED)
    </p>
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    <p>
      
						Three (ID: 3)
						
      <!---->
    </p>
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    role="option"
  >
    <p>
      
						Four (ID: 4)
						
      <!---->
    </p>
  </li>
</ul>
`;
