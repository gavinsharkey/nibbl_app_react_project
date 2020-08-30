async function fetchWithToken(url, method = 'GET', body = {}) {
  const options = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    }
  }

  if (method !== 'GET') {
      options.body = JSON.stringify(body)
      options.headers['Content-Type'] = 'application/json'
      options.method = method
  }

  try {
    const response = await fetch(url, options)
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  fetchWithToken
}