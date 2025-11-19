export interface Post {
  title: string
  text: string
  script?: string
  tags: string[]
}

export interface GeneratedContent {
  calendar: string[]
  posts: Post[]
  thumbs: string[]
}

export interface ContentParams {
  niche: string
  platform: string
  style: string
  quantity: number
}

export type Platform = 'Instagram' | 'TikTok' | 'YouTube' | 'LinkedIn'
export type ContentStyle = 'Carrossel' | 'Vídeo Curto' | 'Post Escrito' | 'Story' | 'Reels'
