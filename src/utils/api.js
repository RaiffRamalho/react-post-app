const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';


export function getInitialCategoryData () {
  const url = `${api}/categories`;

  console.log('fetching from url', url);
  
  return new Promise((res, rej) => {
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}


export function getInitialPostData () {
  const url = `${api}/posts`;

  console.log('fetching from url', url);
  
  return new Promise((res, rej) => {
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}

export function getInitialCommentData (id) {
  const url = `${api}/posts`+
                        '/' +
                        id  +
                        '/comments';

  console.log('fetching from url', url);
  
  return new Promise((res, rej) => {
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatPost ({ title, body, author, category }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  }
}

export function savePost (info) {
  const postInfo = formatPost(info);

  const url = `${api}/posts`;
  return new Promise((res, rej) => {
    fetch(url, {
      headers: { 
        'Authorization': 'whatever-you-want',
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify(postInfo),
      })
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}

export function deletePost (id) {

  const url = `${api}/posts` +
                         '/' +
                          id;
  return new Promise((res, rej) => {
    fetch(url, {
      headers: { 
        'Authorization': 'whatever-you-want',
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      method: "DELETE",
      })
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}

export function saveVote (info) {

  const url = `${api}/posts` +
                         '/' +
                          info.id;
  return new Promise((res, rej) => {
    fetch(url, {
      headers: { 
        'Authorization': 'whatever-you-want',
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify({option: info.option})
      })
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}

export function updatePost (info) {

  const url = `${api}/posts` +
                         '/' +
                          info.id;
  return new Promise((res, rej) => {
    fetch(url, {
      headers: { 
        'Authorization': 'whatever-you-want',
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      method: "PUT",
      body: JSON.stringify({
        title: info.title,
        body: info.body
      })
      })
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}

export function deleteComment (id) {

  const url = `${api}/comments` +
                         '/' +
                          id;
  return new Promise((res, rej) => {
    fetch(url, {
      headers: { 
        'Authorization': 'whatever-you-want',
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      method: "DELETE",
      })
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}

export function saveCommentVote (info) {

  const url = `${api}/comments` +
                         '/' +
                          info.id;
  return new Promise((res, rej) => {
    fetch(url, {
      headers: { 
        'Authorization': 'whatever-you-want',
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify({option: info.option})
      })
    .then( (response) => {
      return response.json();
    }).then(data => {
      res (data)
    });
  })
}