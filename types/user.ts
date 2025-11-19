export interface User {
  id: string
  email: string
  name?: string
}

export interface Pack {
  id: string
  userId: string
  params: {
    niche: string
    platform: string
    style: string
    quantity: number
  }
  result: {
    calendar: string[]
    posts: Array<{
      title: string
      text: string
      script?: string
      tags: string[]
    }>
    thumbs: string[]
  }
  createdAt: Date
}
