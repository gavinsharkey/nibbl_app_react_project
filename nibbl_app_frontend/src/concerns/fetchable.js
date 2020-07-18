async function fetchWithCredentials(url, method = 'GET', body = {}) {
  const options = {
      credentials: 'include',
  }

  if (method !== 'GET') {
      options.body = JSON.stringify(body)
      options.headers = {'Content-Type': 'application/json'}
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
  fetchWithCredentials
}