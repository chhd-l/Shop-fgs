export const GAEventClickSearchBar = () => {
  window?.dataLayer?.push({
    event: 'HMinstantSearchBarInteraction',
    HMinstantSearchBarInteraction: {
      userAction: 'Search bar click'
    }
  });
};

export const GAEventClickRecentSearchItem = (recentItem) => {
  window?.dataLayer?.push({
    event: 'HMinstantSearchBarInteraction',
    HMinstantSearchBarInteraction: {
      userAction: 'Recent search click',
      componentClicked: `Recent Searches - ${recentItem}`
    }
  });
};

export const GAEventClickFindAProduct = () => {
  window?.dataLayer?.push({
    event: 'HMinstantSearchBarInteraction',
    HMinstantSearchBarInteraction: {
      userAction: 'Find a product click'
    }
  });
};

export const GAEventDisplayResult = (breeds, products, articles) => {
  window?.dataLayer?.push({
    event: 'HMinstantSearchBarInteraction',
    HMinstantSearchBarInteraction: {
      userAction: 'Result display',
      breedsResults: breeds,
      productsResults: products,
      articlesResults: articles
    }
  });
};

export const GAEventClickOnResult = (type, name) => {
  window?.dataLayer?.push({
    event: 'HMinstantSearchBarInteraction',
    HMinstantSearchBarInteraction: {
      userAction: 'Result click',
      clickType: type,
      clickedItem: name
    }
  });
};

export const GAEventClickNoResultItem = (type) => {
  window?.dataLayer?.push({
    event: 'HMinstantSearchBarInteraction',
    HMinstantSearchBarInteraction: {
      userAction: 'Zero result click',
      clickType: type,
      clickedItem: 'Clear my search'
    }
  });
};
