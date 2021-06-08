// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 Nothing selected: ({"items": [Array]}) => HTML 1`] = `
<ul
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-0-1"
    role="option"
  >
    
			One
		
  </li>
  <li
    aria-disabled="true"
    class="wvui-options-menu__item wvui-options-menu__item--disabled"
    id="wvui-options-menu-0-2"
    role="option"
  >
    
			Two
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-0-3"
    role="option"
  >
    
			Three
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-0-4"
    role="option"
  >
    
			Four
		
  </li>
</ul>
`;

exports[`matches the snapshot Case 1 Item selected: ({"items": [Array], "selectedItemId": "3"}) => HTML 1`] = `
<ul
  aria-activedescendant="wvui-options-menu-1-3"
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-1-1"
    role="option"
  >
    
			One
		
  </li>
  <li
    aria-disabled="true"
    class="wvui-options-menu__item wvui-options-menu__item--disabled"
    id="wvui-options-menu-1-2"
    role="option"
  >
    
			Two
		
  </li>
  <li
    aria-selected="true"
    class="wvui-options-menu__item wvui-options-menu__item--selected wvui-options-menu__item--enabled"
    id="wvui-options-menu-1-3"
    role="option"
  >
    
			Three
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-1-4"
    role="option"
  >
    
			Four
		
  </li>
</ul>
`;

exports[`matches the snapshot Case 2 Nonexistent item selected: ({"items": [Array], "selectedItemId": "42"}) => HTML 1`] = `
<ul
  aria-activedescendant="wvui-options-menu-2-42"
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-2-1"
    role="option"
  >
    
			One
		
  </li>
  <li
    aria-disabled="true"
    class="wvui-options-menu__item wvui-options-menu__item--disabled"
    id="wvui-options-menu-2-2"
    role="option"
  >
    
			Two
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-2-3"
    role="option"
  >
    
			Three
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-2-4"
    role="option"
  >
    
			Four
		
  </li>
</ul>
`;

exports[`matches the snapshot Case 3 Disabled item selected: ({"items": [Array], "selectedItemId": "2"}) => HTML 1`] = `
<ul
  aria-activedescendant="wvui-options-menu-3-2"
  class="wvui-options-menu"
  role="listbox"
>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-3-1"
    role="option"
  >
    
			One
		
  </li>
  <li
    aria-disabled="true"
    aria-selected="true"
    class="wvui-options-menu__item wvui-options-menu__item--selected wvui-options-menu__item--disabled"
    id="wvui-options-menu-3-2"
    role="option"
  >
    
			Two
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-3-3"
    role="option"
  >
    
			Three
		
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-3-4"
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
    id="wvui-options-menu-4-1"
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
    id="wvui-options-menu-4-2"
    role="option"
  >
    <p>
      
						Two (ID: 2)
						(DISABLED)
    </p>
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-4-3"
    role="option"
  >
    <p>
      
						Three (ID: 3)
						
      <!---->
    </p>
  </li>
  <li
    class="wvui-options-menu__item wvui-options-menu__item--enabled"
    id="wvui-options-menu-4-4"
    role="option"
  >
    <p>
      
						Four (ID: 4)
						
      <!---->
    </p>
  </li>
</ul>
`;
