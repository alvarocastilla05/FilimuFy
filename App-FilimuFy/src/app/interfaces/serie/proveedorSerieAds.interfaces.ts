export interface ProveedoreesSerieAdsListResponse {
  id: number
  results: RegionAds
}

export interface RegionAds {
  AT: At
  BE: Be
  CH: Ch
  CY: Cy
  CZ: Cz
  DE: De
  DK: Dk
  ES: Es
  FI: Fi
  FR: Fr
  GB: Gb
  GR: Gr
  HU: Hu
  IE: Ie
  IT: It
  LU: Lu
  ME: Me
  NL: Nl
  NO: No
  PL: Pl
  PT: Pt
  RO: Ro
  SE: Se
  SK: Sk
  TR: Tr
  TW: Tw
}

export interface At {
  link: string
  ads: Ad[]
}

export interface Ad {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Be {
  link: string
  ads: Ad2[]
}

export interface Ad2 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ch {
  link: string
  ads: Ad3[]
}

export interface Ad3 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Cy {
  link: string
  ads: Ad4[]
}

export interface Ad4 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Cz {
  link: string
  ads: Ad5[]
}

export interface Ad5 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface De {
  link: string
  ads: Ad6[]
}

export interface Ad6 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Dk {
  link: string
  ads: Ad7[]
}

export interface Ad7 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Es {
  link: string
  ads: Ad8[]
}

export interface Ad8 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Fi {
  link: string
  ads: Ad9[]
}

export interface Ad9 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Fr {
  link: string
  ads: Ad10[]
}

export interface Ad10 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Gb {
  link: string
  ads: Ad11[]
}

export interface Ad11 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Gr {
  link: string
  ads: Ad12[]
}

export interface Ad12 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Hu {
  link: string
  ads: Ad13[]
}

export interface Ad13 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ie {
  link: string
  ads: Ad14[]
}

export interface Ad14 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface It {
  link: string
  ads: Ad15[]
  flatrate: Flatrate[]
}

export interface Ad15 {
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

export interface Lu {
  link: string
  ads: Ad16[]
}

export interface Ad16 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Me {
  link: string
  ads: Ad17[]
}

export interface Ad17 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Nl {
  link: string
  ads: Ad18[]
}

export interface Ad18 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface No {
  link: string
  ads: Ad19[]
}

export interface Ad19 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Pl {
  link: string
  flatrate: Flatrate2[]
  ads: Ad20[]
}

export interface Flatrate2 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ad20 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Pt {
  link: string
  ads: Ad21[]
}

export interface Ad21 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ro {
  link: string
  ads: Ad22[]
}

export interface Ad22 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Se {
  link: string
  ads: Ad23[]
}

export interface Ad23 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Sk {
  link: string
  ads: Ad24[]
}

export interface Ad24 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Tr {
  link: string
  flatrate: Flatrate3[]
}

export interface Flatrate3 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Tw {
  link: string
  flatrate: Flatrate4[]
  ads: Ad25[]
}

export interface Flatrate4 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ad25 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}
