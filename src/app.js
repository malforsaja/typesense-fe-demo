/* global instantsearch */

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "F9djpyXUNnDDjU4lS9Xh8OfhhY6cvcHX", // Be sure to use an API key that only allows searches, in production
    nodes: [
      {
        host: "0i4hsoprjdm3b2lzp-1.a1.typesense.net",
        port: "443",
        protocol: "https",
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  //  filterBy is managed and overridden by InstantSearch.js. To set it, you want to use one of the filter widgets like refinementList or use the `configure` widget.
  additionalSearchParameters: {
    queryBy: "post_title,post_content",
  },
});
const { searchClient } = typesenseInstantsearchAdapter;

const search = instantsearch({
  searchClient,
  indexName: "post",
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item(item) {
        console.log(item);
        return `
        <div>
          <img src="${item?.post_thumbnail}" alt="${item?.post_title}" height="100" />
          <div class="hit-name">
            ${item?.post_title}
          </div>
          <div class="hit-authors">
          </div>
          <div class="hit-publication-year">${item?.post_modified}</div>
          <div class="hit-rating">${item?.__hitIndex}/5 rating</div>
        </div>
      `;
      },
    },
  }),
  instantsearch.widgets.pagination({
    container: "#pagination",
  }),
]);

search.start();
