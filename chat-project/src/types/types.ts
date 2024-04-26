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

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info'
}

export enum InputVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info'
}
export enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum LabelPosition {
  Top = 'top',
  Lef = 'left',
  Right = 'right',
  Bottom = 'bottom'
}
