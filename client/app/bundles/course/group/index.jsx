import React from 'react';
import { render } from 'react-dom';
import ProviderWrapper from 'lib/components/ProviderWrapper';
import storeCreator from './store';
import GroupIndex from './pages/GroupIndex';
import GroupIndexNew from './pages/GroupIndexNew';

$(document).ready(() => {
  const categoryMountNode = document.getElementById(
    'course-group-index-component',
  );
  const newButtonMountNode = $('.new-btn')[0];

  let store;
  if (categoryMountNode || newButtonMountNode) {
    store = storeCreator();
  }

  if (categoryMountNode) {
    const data = categoryMountNode.getAttribute('data');
    const attributes = JSON.parse(data);

    render(
      <ProviderWrapper store={store}>
        <GroupIndex groupCategoryId={attributes.group_category_id} />
      </ProviderWrapper>,
      categoryMountNode,
    );
  }

  if (newButtonMountNode) {
    render(
      <ProviderWrapper store={store}>
        <GroupIndexNew />
      </ProviderWrapper>,
      newButtonMountNode,
    );
  }
});
