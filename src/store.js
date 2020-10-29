'use strict';

const store = { bookmarks: [
                  /*{
                    id: 'x56w',
                    title: 'Title 1',
                    rating: 3,
                    url: 'http://www.title1.com',
                    desc: 'lorem ipsum dolor sit',
                    expanded: false
                  },
                  {
                    id: '6ffw',
                    title: 'Title 2',
                    rating: 5,
                    url: 'http://www.title2.com',
                    desc: 'dolorum tempore deserunt',
                    expanded: false
                  } */
                ],
                adding: false,
                error: [],
                filter: 1
              };

const setFilter = function (filter) {
  store.filter = filter;
}

const addError = function (er) {
  if(!store.error.includes(er)){
    store.error.push(er);
  }
}

const getErrors = function () {
  return store.error;
}

const clearErrors = function() {
  store.error = [];
}

const removeError = function (err) {
  store.error = store.error.filter(er => {
    return er != err
  })
}

const toggleAdding = function () {
  store.adding = !store.adding;
};
const isAdding = function() {
  return store.adding;
};

const addBookmark = function (bookmarkObj) {                //title, rating, url, description) {
  /*let bookmark = {
    id: id,
    title: title,
    rating: rating,
    url: url,
    desc: description,
    expanded: false
  }*/

  store.bookmarks.push(bookmarkObj);
};

const getBookmarks = function () {
  let filteredBookmarks = store.bookmarks.filter(function (bookmark) {
    return bookmark.rating >= store.filter;
  });
  return filteredBookmarks;
}; 

const updateRating = function (id, rating) {
  for(let i = 0; i < store.bookmarks.length; i++){
    if(store.bookmarks[i].id === id){
      store.bookmarks[i].rating = rating;
    }
  }
};

const toggleExpanded = function (id) {
  for(let i = 0; i < store.bookmarks.length; i++){
    if(store.bookmarks[i].id === id){
      store.bookmarks[i].expanded = !store.bookmarks[i].expanded;
    }
  }
};

const deleteBookmark = function (id) {
  store.bookmarks = store.bookmarks.filter(bookmark => {
    return bookmark.id !== id
  })
}

/*const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
    ...
  ],
  adding: false,
  error: null,
  filter: 0
};*/

export default {
  toggleAdding,
  isAdding,
  addBookmark,
  getBookmarks,
  updateRating,
  toggleExpanded,
  addError,
  getErrors,
  deleteBookmark,
  setFilter,
  clearErrors,
  removeError
};