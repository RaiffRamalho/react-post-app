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

      const storePost = {
        id: postInfo.id,
        timestamp: postInfo.timestamp,
        title: postInfo.title,
        body: postInfo.body,
        author: postInfo.author,
        category: postInfo.category,
        commentCount: data.commentCount,
        voteScore:data.voteScore,
        deleted: data.deleted
      }
      res (data)
    });
  })
}