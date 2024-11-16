export interface ProveedorPeliResponse {
    link: string
    buy: Buy[]
    flatrate: Flatrate[]
  }
  
  export interface Buy {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
  }
  
  export interface Flatrate {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
  }
  