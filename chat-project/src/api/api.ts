const NEWS_API_KEY = 'c7297772711c4a549b4d90fbfbf245c0'

export const connectionToWebSocket = (token: string) => {
  const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`)
  socket.onopen = () => {
    console.log('WebSocket to open')
  }

  socket.onclose = () => {
    console.log('WebSocket connection is lost')

    setTimeout(() => {
      connectionToWebSocket(token)
    }, 3000)
  }

  socket.onerror = (error) => {
    console.error(error)
  }
  return socket
}

export const getChatMessages = async (token: string) => {
  try {
    const request = await fetch(' https://edu.strada.one/api/messages/ ', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    })

    const result = await request.json()

    return result.messages
  } catch (error) {
    console.error(error)
  }
}
export const getUserInfo = async (token: string) => {
  try {
    const request = await fetch('https://edu.strada.one/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    const result = await request.json()

    return result
  } catch (error) {
    console.error(error)
  }
}

export const getNewsForSearch = async (text: string) => {
  const request = await fetch(`https://newsapi.org/v2/everything?q=${text}&apiKey=${NEWS_API_KEY}`)
  const result = await request.json()
  console.log(result)
  return result.articles
}
