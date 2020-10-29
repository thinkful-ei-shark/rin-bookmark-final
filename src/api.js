'use strict'
// Base URL fir API requests
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rin/bookmarks';

const bookmarksApiFetch = function (...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
          }
          return Promise.reject(error);
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        return data;
      });
  
    }
  
  const getBookmarks = function (data) {
    let bookmarkRequest = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }
    
    let bookmarkResponse = bookmarksApiFetch(BASE_URL, bookmarkRequest);
    return bookmarkResponse;
  }
  
  const addBookmark = function (requestBody) {
    let bookmarkRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    };
    let bookmarkResponse = bookmarksApiFetch(BASE_URL, bookmarkRequest)
    return bookmarkResponse;
  }
  
  /*const editBookmark = function (id, data) {
    let bookmarkRequest = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    };
  
    let bookmarkResponse = bookmarksApiFetch(BASE_URL, bookmarkRequest);
    return bookmarkResponse;
  }*/
  
  const deleteBookmark = function (id) {
    let bookmarkRequest = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    let bookmarkResponse = bookmarksApiFetch(`${BASE_URL}/${id}`, bookmarkRequest);
    return bookmarkResponse;
  }
  
  export default {
    getBookmarks,
    addBookmark,
    //editBookmark,
    deleteBookmark
  }
  /*const createItem = function (name) {
    const newItem = JSON.stringify({ name });
    return listApiFetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newItem
    });
  };
  */