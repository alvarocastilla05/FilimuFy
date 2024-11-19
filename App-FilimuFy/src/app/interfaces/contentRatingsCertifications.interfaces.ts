export interface RatingsListResponse {
  results: Pais[]
  id: number
}

export interface Pais {
  descriptors: any[]
  iso_3166_1: string
  rating: string
}