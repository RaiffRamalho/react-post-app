
export function getInitialCategoryData () {
  const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
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
  const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
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