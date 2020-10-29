'use strict';
import $ from 'jquery';

import './index.css';
import api from './api';
import app from './app';
import store from './store';




const main = function () {
  app.render();
  app.bindEventListeners();
  api.getBookmarks().then( bookmarks => {
    bookmarks.forEach(bookmark => {
      store.addBookmark(bookmark);
    })
    app.render();
  })

};

$(main);