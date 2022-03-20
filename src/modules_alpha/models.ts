export interface Options {
  image: ImageConfigs
  fixedContainer?: boolean
  offsetLeft?: number
  offsetTop?: number
}

export interface ImageConfigs {
  src: string
  alt: string
  width?: number
  height?: number
}