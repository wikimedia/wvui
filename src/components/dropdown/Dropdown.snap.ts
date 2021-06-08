// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 No default label, nothing selected: ({"items": [Array]}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--no-selections"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-0-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    
			
		 
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-0-menu"
    items="[object Object],[object Object],[object Object]"
    style="display: none;"
  />
</div>
`;

exports[`matches the snapshot Case 1 With default label, nothing selected: ({"defaultLabel": "Choose something", "items": [Array]}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--no-selections"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-1-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    
			Choose something
		 
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-1-menu"
    items="[object Object],[object Object],[object Object]"
    style="display: none;"
  />
</div>
`;

exports[`matches the snapshot Case 2 Item selected: ({"defaultLabel": "Choose something", "items": [Array], "selectedItemId": "3"}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--value-selected"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-2-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    
			Three
		 
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-2-menu"
    items="[object Object],[object Object],[object Object]"
    selecteditemid="3"
    style="display: none;"
  />
</div>
`;

exports[`matches the snapshot Case 3 Nonexistent item selected: ({"defaultLabel": "Choose something", "items": [Array], "selectedItemId": "42"}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--value-selected"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-3-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    
			Choose something
		 
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-3-menu"
    items="[object Object],[object Object],[object Object]"
    selecteditemid="42"
    style="display: none;"
  />
</div>
`;

exports[`matches the snapshot Case 4 Disabled item selected: ({"defaultLabel": "Choose something", "items": [Array], "selectedItemId": "2"}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--value-selected"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-4-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    
			Two
		 
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-4-menu"
    items="[object Object],[object Object],[object Object]"
    selecteditemid="2"
    style="display: none;"
  />
</div>
`;

exports[`matches the snapshot Case 5 Custom selectedItem slot, no item selected: ({"defaultLabel": "Choose something", "items": [Array]}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--no-selections"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-5-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    <p>
      
				Nothing selected: Choose something
			
    </p>
     
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-5-menu"
    items="[object Object],[object Object],[object Object]"
    style="display: none;"
  />
</div>
`;

exports[`matches the snapshot Case 6 Custom selectedItem slot, item selected: ({"defaultLabel": "Choose something", "items": [Array], "selectedItemId": "1"}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--value-selected"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-6-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    <p>
      
				Something selected: One (ID: 1)
				
      <!---->
    </p>
     
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-6-menu"
    items="[object Object],[object Object],[object Object]"
    selecteditemid="1"
    style="display: none;"
  />
</div>
`;

exports[`matches the snapshot Case 7 Custom selectedItem slot, nonexistent item selected: ({"defaultLabel": "Choose something", "items": [Array], "selectedItemId": "42"}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--value-selected"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-7-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    <p>
      
				Nothing selected: Choose something
			
    </p>
     
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-7-menu"
    items="[object Object],[object Object],[object Object]"
    selecteditemid="42"
    style="display: none;"
  />
</div>
`;

exports[`matches the snapshot Case 8 Custom selectedItem slot, disabled item selected: ({"defaultLabel": "Choose something", "items": [Array], "selectedItemId": "2"}) => HTML 1`] = `
<div
  class="wvui-dropdown wvui-dropdown--value-selected"
>
  <div
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="wvui-dropdown-8-menu"
    class="wvui-dropdown__handle"
    role="combobox"
    tabindex="0"
  >
    <p>
      
				Something selected: Two (ID: 2)
				(DISABLED)
    </p>
     
    <wvui-icon-stub
      class="wvui-dropdown__indicator"
      icon="M17.5 4.75l-7.5 7.5-7.5-7.5L1 6.25l9 9 9-9z"
      icontitle=""
      langcode=""
    />
  </div>
   
  <wvui-options-menu-stub
    class="wvui-dropdown__menu"
    id="wvui-dropdown-8-menu"
    items="[object Object],[object Object],[object Object]"
    selecteditemid="2"
    style="display: none;"
  />
</div>
`;
