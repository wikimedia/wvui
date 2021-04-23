// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshots when showThumbnail/showDescription are true/false Case 0 showThumbnail: true: ({"showThumbnail": true, "suggestion": [Object]}) => HTML 1`] = `
<a
  class="wvui-typeahead-suggestion"
  href="/w/index.php?title=Special%3ASearch&search=Color"
>
  <span
    class="wvui-typeahead-suggestion__thumbnail"
    style="background-image: url(//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg);"
  />
   
  <span
    class="wvui-typeahead-suggestion__text"
  >
    <span
      class="wvui-typeahead-suggestion__title"
    >
      
	Color
      <span
        class="wvui-typeahead-suggestion__match"
      >
        
      </span>
      

    </span>
     
    <span
      class="wvui-typeahead-suggestion__description"
    >
      visual perception of light wavelengths
    </span>
  </span>
</a>
`;

exports[`matches the snapshots when showThumbnail/showDescription are true/false Case 1 showThumbnail: false: ({"showThumbnail": false, "suggestion": [Object]}) => HTML 1`] = `
<a
  class="wvui-typeahead-suggestion"
  href="/w/index.php?title=Special%3ASearch&search=Color"
>
  <!---->
   
  <span
    class="wvui-typeahead-suggestion__text"
  >
    <span
      class="wvui-typeahead-suggestion__title"
    >
      
	Color
      <span
        class="wvui-typeahead-suggestion__match"
      >
        
      </span>
      

    </span>
     
    <span
      class="wvui-typeahead-suggestion__description"
    >
      visual perception of light wavelengths
    </span>
  </span>
</a>
`;

exports[`matches the snapshots when showThumbnail/showDescription are true/false Case 2 showDescription: true: ({"showDescription": true, "suggestion": [Object]}) => HTML 1`] = `
<a
  class="wvui-typeahead-suggestion"
  href="/w/index.php?title=Special%3ASearch&search=Color"
>
  <span
    class="wvui-typeahead-suggestion__thumbnail"
    style="background-image: url(//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg);"
  />
   
  <span
    class="wvui-typeahead-suggestion__text"
  >
    <span
      class="wvui-typeahead-suggestion__title"
    >
      
	Color
      <span
        class="wvui-typeahead-suggestion__match"
      >
        
      </span>
      

    </span>
     
    <span
      class="wvui-typeahead-suggestion__description"
    >
      visual perception of light wavelengths
    </span>
  </span>
</a>
`;

exports[`matches the snapshots when showThumbnail/showDescription are true/false Case 3 showDescription: false: ({"showDescription": false, "suggestion": [Object]}) => HTML 1`] = `
<a
  class="wvui-typeahead-suggestion"
  href="/w/index.php?title=Special%3ASearch&search=Color"
>
  <span
    class="wvui-typeahead-suggestion__thumbnail"
    style="background-image: url(//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg);"
  />
   
  <span
    class="wvui-typeahead-suggestion__text"
  >
    <span
      class="wvui-typeahead-suggestion__title"
    >
      
	Color
      <span
        class="wvui-typeahead-suggestion__match"
      >
        
      </span>
      

    </span>
     
    <!---->
  </span>
</a>
`;

exports[`matches the snapshots when thumbnail is present/absent Case 0 With thumbnail: ({"suggestion": [Object]}) => HTML 1`] = `
<a
  class="wvui-typeahead-suggestion"
  href="/w/index.php?title=Special%3ASearch&search=Color"
>
  <span
    class="wvui-typeahead-suggestion__thumbnail"
    style="background-image: url(//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg);"
  />
   
  <span
    class="wvui-typeahead-suggestion__text"
  >
    <span
      class="wvui-typeahead-suggestion__title"
    >
      
	Color
      <span
        class="wvui-typeahead-suggestion__match"
      >
        
      </span>
      

    </span>
     
    <span
      class="wvui-typeahead-suggestion__description"
    >
      visual perception of light wavelengths
    </span>
  </span>
</a>
`;

exports[`matches the snapshots when thumbnail is present/absent Case 1 Without thumbnail: ({"suggestion": [Object]}) => HTML 1`] = `
<a
  class="wvui-typeahead-suggestion"
  href="/w/index.php?title=Special%3ASearch&search=Co"
>
  <span
    class="wvui-typeahead-suggestion__thumbnail-placeholder"
  >
    <span
      class="wvui-icon wvui-typeahead-suggestion__thumbnail-icon"
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
          d="M19 3H1v14h18zM3 14l3.5-4.5 2.5 3L12.5 8l4.5 6z"
          fill="currentColor"
        />
      </svg>
    </span>
  </span>
   
  <span
    class="wvui-typeahead-suggestion__text"
  >
    <span
      class="wvui-typeahead-suggestion__title"
    >
      
	Co
      <span
        class="wvui-typeahead-suggestion__match"
      >
        
      </span>
      

    </span>
     
    <!---->
  </span>
</a>
`;
