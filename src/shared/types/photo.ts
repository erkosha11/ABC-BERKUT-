export type Photo = {
  id: string
  urls: {
    small: string
    regular: string
    full: string
  }
  alt_description: string
  user: {
    name: string
    username: string
    links: {
      html: string
    }
    profile_image: {
      small: string
      medium: string
      large: string
    }
  }
  links: {
    download: string
    html: string
  }
}
