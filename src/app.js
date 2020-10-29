'use strict';
import $ from 'jquery';
import api from './api';
import store from './store';
import expandIcon from './images/Hmm.png'
import fullStar from './images/love.png'
import emptyStar from './images/shocked.png'

const generateInitialView = function (bookmarks) {


  let menu = generateInitialMenu();
  let bookmarkList = generateBookmarkList(bookmarks);
  return menu + bookmarkList;
}

const generateInitialMenu = function () {
  return `<div id='menu'>
            <div class='menu-left'>
              <button type='button' class='btn' id='new-bookmark-btn'><label for="">new</label></button>
              </div>
            <div class='menu-right'>
              <label for="filter-select">Filter Options</label>
              <select name="filter-select" id="filter-select">
                <option value="0">select a minimum rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            
          </div>`;
}

const handleFilterChange = function () {
  $('main').on('change', '#filter-select', function (e) {
    let newFilter = this.value
    store.setFilter(newFilter);
    render();
  })
}

const generateBookmarkList = function (bookmarks) {
  let list = '';
  list = bookmarks.map(function (bm) {
    let ratings = generateRating(bm.rating);
    let template = `<div class='bookmark-item' id=${bm.id}>
                      <div class='expand-btn'><img src="${expandIcon}" alt="expand"></div>
                      <div class='title'><h2>${bm.title}</h2></div>
                      <div class='star-rating'>
                        ${ratings}
                      </div>
                    </div>`;
    if (bm.expanded) {
      template = `<div class='bookmark-item bookmark-expanded' id='${bm.id}'>
                    <div class='expand-btn-options'>              
                      <div class='expand-btn collapse'>Collapse</div>
                    </div>
                    
                    <div class='title'>
                      <h2>${bm.title}</h2> 
                      <button type='button' class='btn' id='btn-bookmark-delete'><label for='btn-bookmark-delete'>delete</label></button>
                    </div>

                    <div class='expanded-body'>
                      <div class='body-top'>
 
                        <div class="description-edit-area">
                          <label for="description-edit">Edit Description</label>
                          <textarea name="description-edit" id="description-edit" cols="30" rows="10">${bm.desc}</textarea>
                        </div>
                        
                        <div class='star-rating'>
                          ${ratings}
                        </div>
                        <a href=${bm.url} class="btn">Go to ${bm.title}</a>
                      </div>
                    </div>
                    
                  </div>`
    }
    return template;
  });
  list = list.join(" ");
  return `<div id='bookmark-list'>
            ${list}
          </div>`;

}
/*<div id='bookmark-list'>
      <div class='bookmark-item'>
        <div class='title'><h3>Bookmark name</h3></div>
        <div class='star-rating'>Rating visual</div>
      </div>
      <div class='bookmark-item'>
        <div class='title'><h3>Bookmark name</h3></div>
        <div class='star-rating'>Rating visual</div>
      </div>
      <div class='bookmark-item'>
        <div class='title'><h3>Bookmark name</h3></div>
        <div class='star-rating'>Rating visual</div>
      </div>
    </div>`;*/

const generateRating = function (rating) {
  let ratings = '';
  const c = {
    '1': 'one-star',
    '2': 'two-star',
    '3': 'three-star',
    '4': 'four-star',
    '5': 'five-star'
  };

  for (let i = 1; i <= 5; i++) {
    let className = c[`${i}`];

    if (i <= rating) {
      ratings += `<div class='star full-star ${className}'><img src="${fullStar}" alt="full star"></div>`;
    }
    else {
      ratings += `<div class='star empty-star ${className}'><img src="${emptyStar}" alt="empty star"></div>`;
    }
  }
  return ratings;
};
/*          
            <div class='star-rating'>
              <button class='star empty-star' val='1'><img src="/src/images/star-empty.png" alt="empty star"></button>
              <button class='star empty-star' val='2'><img src="/src/images/star-empty.png" alt="empty star"></button>
              <button class='star empty-star' val='3'><img src="/src/images/star-empty.png" alt="empty star"></button>
              <button class='star empty-star' val='4'><img src="/src/images/star-empty.png" alt="empty star"></button>
              <button class='star empty-star' val='5'><img src="/src/images/star-empty.png" alt="empty star"></button>
            </div>
*/

const generateNewBookmarkView = function (ers) {


  let template = `<form action="submit">
                    <h2>Add New Bookmark</h2>
                    <div id='new-bookmark-top'>
                    <div class='url-walkthrough'>
                      <label for="bookmark-url-input">Url:</label>
                      <input type="text" name="bookmark-url-input" id='bookmark-url-input'>
                      <div class='er' id='invalid-url'></div>
                    </div>
                      </div>

                    <div id='new-bookmark-body'>
                      <div class='title-walkthrough'>
                        <label for="bookmark-title-input">Title: </label>
                        <input type="text" name="bookmark-title-input" id='bookmark-title-input'>
                        <div class='er' id='invalid-title'></div>
                      </div>
                      <div class='star-rating'>
                        <div class='star new-star full-star one-star'><img src="${fullStar}" alt="full star"></div>
                        <div class='star new-star empty-star two-star'><img src="${emptyStar}" alt="empty star"></div>
                        <div class='star new-star empty-star three-star'><img src="${emptyStar}" alt="empty star"></div>
                        <div class='star new-star empty-star four-star'><img src="${emptyStar}" alt="empty star"></div>
                        <div class='star new-star empty-star five-star'><img src="${emptyStar}" alt="empty star"></div>
                      </div>
                      <div class='description-area'>
                        <label for="bookmark-desc-textarea">Enter a description</label>
                        <textarea name="bookmark-desc-textarea" id="bookmark-desc-textarea" cols="30" rows="10" placeholder='enter description'></textarea>
                      </div>
                    </div>

                    <div id='new-bookmark-foot'>
                      <button type='button' class='btn' id='cancel'><span>Cancel</span></button>
                      <button class='btn' type='submit'><span>Create</span>
                      </button>
                    </div>
                  </form>`;
  return template;
};

const getStarValue = function (star) {
  if (star.hasClass('one-star')) {
    return 1;
  }
  else if (star.hasClass('two-star')) {
    return 2;
  }
  else if (star.hasClass('three-star')) {
    return 3;
  }
  else if (star.hasClass('four-star')) {
    return 4;
  }
  else if (star.hasClass('five-star')) {
    return 5;
  }
}

const handleCreateNewClicked = function () {
  $('main').on('click', '#new-bookmark-btn', function (event) {
    store.toggleAdding();
    render();
  });
};

const generateNewRating = function (rating) {
  let ratings = '';
  const c = {
    '1': 'one-star',
    '2': 'two-star',
    '3': 'three-star',
    '4': 'four-star',
    '5': 'five-star'
  };

  for (let i = 1; i <= 5; i++) {
    let className = c[`${i}`];

    if (i <= rating) {
      ratings += `<div class='star new-star full-star ${className}'><img src="${fullStar}" alt="full star"></div>`;
    }
    else {
      ratings += `<div class='star new-star empty-star ${className}'><img src="${emptyStar}" alt="empty star"></div>`;
    }
  }
  return ratings;
};

const directUpdateRating = function (parent, starValue) {
  let ratings = generateNewRating(starValue);
  parent.html(ratings);
}

const handleSetRatingClicked = function () {
  $('main').on('click', '.new-star', function (e) {
    let starValue = getStarValue($(e.currentTarget));

    let parent = $(e.currentTarget).parent();
    directUpdateRating(parent, starValue);
  });
}

const getRating = function (ratingList) {
  let numFullStars = ratingList.children('.full-star').length;
  return numFullStars;
}

const validateTitle = function (title) {
  if (title === undefined || title === '') {
    store.addError('invalidTitle')
    return false;
  }
  return true;
}

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }

  return true;
}

const validateUrl = function (url) {
  if (url === undefined || url === '' || !isValidUrl(url)) {
    store.addError('invalidUrl')
    return false
  }
  return true
}

const handleSubmitNewClicked = function () {
  $('main').on('submit', 'form', function (e) {
    e.preventDefault();
    let title = $('#bookmark-title-input').val();
    let url = $('#bookmark-url-input').val();
    let desc = $('#bookmark-desc-textarea').val();
    let rating = getRating($('.star-rating'));

    let requestBody = {
      title: title,
      url: url,
      desc: desc,
      rating: rating
    }
    store.clearErrors();

    let toRun = validateTitle(title)
    toRun = validateUrl(url) && toRun
    if (toRun) {
      api.addBookmark(JSON.stringify(requestBody)).then(res => {

        store.addBookmark(res)
        store.toggleAdding();
        render();
      }).catch(er => {
        console.error(er);

      })
      //store.addBookmark(title, rating, url, desc);
    }
    else {
      console.log("didn't do fetch, store errors are: ", store.getErrors())
      render();
    }
  });
}



const displayErs = function () {
  const ers = store.getErrors()
  if(!ers.includes('invalidUrl')){
    $('#invalid-url').html('');
  }
  else if (ers.includes('invalidUrl')) {
    $('#invalid-url').html('Please enter a valid url EX: https://google.com')
  }
  if(!ers.includes('invalidTitle')){
    $('#invalid-title').html('');
  }
  else if (ers.includes('invalidTitle')) {
   $('#invalid-title').html('Please enter a title')
  }
  store.clearErrors();
}

const handleCancelNewClicked = function () {
  $('main').on('click', '#cancel', function (e) {
    e.preventDefault();
    store.toggleAdding();
    render();
  });
};

const handleExpandClicked = function () {
  $('main').on('click', '.expand-btn', function (e) {
    let id = $(e.currentTarget).closest('.bookmark-item').attr('id');
    store.toggleExpanded(id);
    render();
  });
}

const handleDeleteClicked = function () {
  $('main').on('click', '#btn-bookmark-delete', function (e) {
    let id = $(e.currentTarget).closest('.bookmark-item').attr('id');
    api.deleteBookmark(id).then(res => {
        store.deleteBookmark(id);
        render();
    }).catch(er => {
      console.error(er)
    })
  });
}

let bindEventListeners = function () {
  handleCreateNewClicked();
  handleCancelNewClicked();
  handleSubmitNewClicked();
  handleSetRatingClicked();
  handleExpandClicked();
  handleDeleteClicked();
  handleFilterChange();
};

let render = function () {
  if(store.getErrors().length > 0) {
    console.log('displaying errors');
    displayErs();
  }
  else if (store.isAdding()) {
    $('main').html(generateNewBookmarkView(store.getErrors()));
  }
  else {
    $('main').html(generateInitialView(store.getBookmarks()));
  }
}


export default {
  render,
  bindEventListeners
};