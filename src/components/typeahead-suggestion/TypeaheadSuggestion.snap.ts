// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`matches the snapshot Case 0 With thumbnail: ({"suggestion": [Object]}) => HTML 1`] = `
<li
  class="wvui-typeahead-suggestion"
>
  <a
    class="wvui-typeahead-suggestion__link"
    href="/wiki/Obsessive–compulsive_disorder"
  >
    <span
      class="wvui-typeahead-suggestion__thumbnail"
      style="background-image: url(//upload.wikimedia.org/wikipedia/commons/thumb/1/1b/OCD_handwash.jpg/192px-OCD_handwash.jpg);"
    />
     
    <span
      class="wvui-typeahead-suggestion__text"
    >
      <span
        class="wvui-typeahead-suggestion__title"
      >
        Obsessive–compulsive disorder
      </span>
       
      <span
        class="wvui-typeahead-suggestion__description"
      >
        anxiety disorder that involves unwanted and repeated thoughts, feelings, ideas, sensations (obsessions), or behaviors that make them feel driven to do something (compulsions)
      </span>
    </span>
  </a>
</li>
`;

exports[`matches the snapshot Case 1 Without thumbnail: ({"suggestion": [Object]}) => HTML 1`] = `
<li
  class="wvui-typeahead-suggestion"
>
  <a
    class="wvui-typeahead-suggestion__link"
    href="/wiki/Ob"
  >
    <span
      class="wvui-typeahead-suggestion__thumbnail-placeholder"
    />
     
    <span
      class="wvui-typeahead-suggestion__text"
    >
      <span
        class="wvui-typeahead-suggestion__title"
      >
        Ob
      </span>
       
      <span
        class="wvui-typeahead-suggestion__description"
      >
        
      </span>
    </span>
  </a>
</li>
`;

exports[`should highlight query in the title 1`] = `
<li
  class="wvui-typeahead-suggestion"
>
  <a
    class="wvui-typeahead-suggestion__link"
    href="/wiki/Obsessive–compulsive_disorder"
  >
    <span
      class="wvui-typeahead-suggestion__thumbnail"
      style="background-image: url(//upload.wikimedia.org/wikipedia/commons/thumb/1/1b/OCD_handwash.jpg/192px-OCD_handwash.jpg);"
    />
     
    <span
      class="wvui-typeahead-suggestion__text"
    >
      <span
        class="wvui-typeahead-suggestion__title"
      >
        <em
          class="wvui-typeahead-suggestion__matching-title"
        >
          Ob
        </em>
        sessive–compulsive disorder
      </span>
       
      <span
        class="wvui-typeahead-suggestion__description"
      >
        anxiety disorder that involves unwanted and repeated thoughts, feelings, ideas, sensations (obsessions), or behaviors that make them feel driven to do something (compulsions)
      </span>
    </span>
  </a>
</li>
`;
