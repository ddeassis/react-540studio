const axios = require('axios')

const getContent = async () => {
  let youtubeResult = await (async () => {
    try {
      const response = axios.get(
        // `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2C%20contentDetails&channelId=UCto2jFEiI05nyTx9L3CqTOQ&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCto2jFEiI05nyTx9L3CqTOQ&maxResults=10&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
      )

      return response
    } catch (error) {
      console.log(error)
    }
  })()
  // console.log(youtubeResult)
  let unsortedContent = []

  youtubeResult.data.items.forEach((result) => {
    result = { ...result, created_at: result.snippet.publishedAt }
    unsortedContent.push(result)
  })
  unsortedContent.forEach((item) => {
    if (item.kind === 'youtube#activity') {
      item = { ...item, created_at: item.snippet.publishedAt }
      // item.created_at = item.snippet.publishedAt;
    }
  })

  let sortedContent = unsortedContent.sort((a, b) => {
    let aDate = new Date(a.created_at)
    let bDate = new Date(b.created_at)
    if (aDate > bDate) {
      return -1
    } else {
      return 1
    }
  })

  const returnContent = {
    content: sortedContent,
  }
  return returnContent
}

exports.handler = async (event, context) => {
  const myConst = await getContent()

  return {
    statusCode: 200,
    body: JSON.stringify(myConst),
  }
}
