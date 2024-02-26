export interface Message {
  _id: string
  text: string
  user: {
    email: string
    name: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export interface NewsArticle {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}
