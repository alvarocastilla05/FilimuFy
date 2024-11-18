export interface ProveedoreesPeliListResponse {
  id: number
  results: Paises
}

export interface Paises {
  AD: Ad
  AL: Al
  AR: Ar
  AT: At
  AU: Au
  AZ: Az
  BA: Ba
  BE: Be
  BG: Bg
  BO: Bo
  BR: Br
  BZ: Bz
  CA: Ca
  CH: Ch
  CL: Cl
  CO: Co
  CR: Cr
  CV: Cv
  CY: Cy
  CZ: Cz
  DE: De
  DK: Dk
  DO: Do
  EC: Ec
  EE: Ee
  EG: Eg
  ES: Es
  FI: Fi
  FR: Fr
  GB: Gb
  GH: Gh
  GR: Gr
  GT: Gt
  HK: Hk
  HN: Hn
  HR: Hr
  HU: Hu
  ID: Id
  IE: Ie
  IL: Il
  IN: In
  IS: Is
  IT: It
  JM: Jm
  JP: Jp
  KR: Kr
  LC: Lc
  LI: Li
  LT: Lt
  LU: Lu
  LV: Lv
  ME: Me
  MK: Mk
  MT: Mt
  MX: Mx
  MY: My
  MZ: Mz
  NI: Ni
  NL: Nl
  NO: No
  NZ: Nz
  PA: Pa
  PE: Pe
  PL: Pl
  PT: Pt
  PY: Py
  RO: Ro
  RS: Rs
  SE: Se
  SG: Sg
  SI: Si
  SK: Sk
  SM: Sm
  SV: Sv
  TH: Th
  TT: Tt
  TW: Tw
  UA: Ua
  US: Us
  UY: Uy
  VE: Ve
  ZA: Za
}

export interface Ad {
  link: string
  flatrate: Flatrate[]
}

export interface Flatrate {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Al {
  link: string
  flatrate: Flatrate2[]
}

export interface Flatrate2 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ar {
  link: string
  flatrate: Flatrate3[]
}

export interface Flatrate3 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface At {
  link: string
  buy: Buy[]
  flatrate: Flatrate4[]
}

export interface Buy {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate4 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Au {
  link: string
  flatrate: Flatrate5[]
  buy: Buy2[]
}

export interface Flatrate5 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy2 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Az {
  link: string
  buy: Buy3[]
}

export interface Buy3 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ba {
  link: string
  flatrate: Flatrate6[]
}

export interface Flatrate6 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Be {
  link: string
  buy: Buy4[]
  flatrate: Flatrate7[]
}

export interface Buy4 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate7 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Bg {
  link: string
  flatrate: Flatrate8[]
  buy: Buy5[]
}

export interface Flatrate8 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy5 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Bo {
  link: string
  flatrate: Flatrate9[]
}

export interface Flatrate9 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Br {
  link: string
  flatrate: Flatrate10[]
}

export interface Flatrate10 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Bz {
  link: string
  flatrate: Flatrate11[]
}

export interface Flatrate11 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ca {
  link: string
  buy: Buy6[]
  flatrate: Flatrate12[]
}

export interface Buy6 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate12 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ch {
  link: string
  buy: Buy7[]
  flatrate: Flatrate13[]
}

export interface Buy7 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate13 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Cl {
  link: string
  flatrate: Flatrate14[]
}

export interface Flatrate14 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Co {
  link: string
  flatrate: Flatrate15[]
}

export interface Flatrate15 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Cr {
  link: string
  flatrate: Flatrate16[]
}

export interface Flatrate16 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Cv {
  link: string
  buy: Buy8[]
}

export interface Buy8 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Cy {
  link: string
  buy: Buy9[]
}

export interface Buy9 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Cz {
  link: string
  buy: Buy10[]
  flatrate: Flatrate17[]
}

export interface Buy10 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate17 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface De {
  link: string
  flatrate: Flatrate18[]
  buy: Buy11[]
  rent: Rent[]
}

export interface Flatrate18 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy11 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Rent {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Dk {
  link: string
  flatrate: Flatrate19[]
  buy: Buy12[]
}

export interface Flatrate19 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy12 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Do {
  link: string
  flatrate: Flatrate20[]
}

export interface Flatrate20 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ec {
  link: string
  flatrate: Flatrate21[]
}

export interface Flatrate21 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ee {
  link: string
  flatrate: Flatrate22[]
  buy: Buy13[]
}

export interface Flatrate22 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy13 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Eg {
  link: string
  buy: Buy14[]
}

export interface Buy14 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Es {
  link: string
  flatrate: Flatrate23[]
  buy: Buy15[]
}

export interface Flatrate23 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy15 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Fi {
  link: string
  buy: Buy16[]
  flatrate: Flatrate24[]
}

export interface Buy16 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate24 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Fr {
  link: string
  rent: Rent2[]
  buy: Buy17[]
}

export interface Rent2 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy17 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Gb {
  link: string
  buy: Buy18[]
  flatrate: Flatrate25[]
}

export interface Buy18 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate25 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Gh {
  link: string
  buy: Buy19[]
}

export interface Buy19 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Gr {
  link: string
  buy: Buy20[]
  flatrate: Flatrate26[]
}

export interface Buy20 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate26 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Gt {
  link: string
  flatrate: Flatrate27[]
}

export interface Flatrate27 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Hk {
  link: string
  buy: Buy21[]
  flatrate: Flatrate28[]
}

export interface Buy21 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate28 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Hn {
  link: string
  flatrate: Flatrate29[]
}

export interface Flatrate29 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Hr {
  link: string
  flatrate: Flatrate30[]
}

export interface Flatrate30 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Hu {
  link: string
  flatrate: Flatrate31[]
  buy: Buy22[]
}

export interface Flatrate31 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy22 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Id {
  link: string
  flatrate: Flatrate32[]
}

export interface Flatrate32 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ie {
  link: string
  buy: Buy23[]
  flatrate: Flatrate33[]
}

export interface Buy23 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate33 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Il {
  link: string
  buy: Buy24[]
}

export interface Buy24 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface In {
  link: string
  buy: Buy25[]
  flatrate: Flatrate34[]
}

export interface Buy25 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate34 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Is {
  link: string
  flatrate: Flatrate35[]
  buy: Buy26[]
}

export interface Flatrate35 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy26 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface It {
  link: string
  buy: Buy27[]
  flatrate: Flatrate36[]
}

export interface Buy27 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate36 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Jm {
  link: string
  flatrate: Flatrate37[]
}

export interface Flatrate37 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Jp {
  link: string
  buy: Buy28[]
  flatrate: Flatrate38[]
}

export interface Buy28 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate38 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Kr {
  link: string
  buy: Buy29[]
  flatrate: Flatrate39[]
}

export interface Buy29 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate39 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Lc {
  link: string
  flatrate: Flatrate40[]
}

export interface Flatrate40 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Li {
  link: string
  flatrate: Flatrate41[]
}

export interface Flatrate41 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Lt {
  link: string
  buy: Buy30[]
  flatrate: Flatrate42[]
}

export interface Buy30 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate42 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Lu {
  link: string
  flatrate: Flatrate43[]
  buy: Buy31[]
}

export interface Flatrate43 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy31 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Lv {
  link: string
  buy: Buy32[]
  flatrate: Flatrate44[]
}

export interface Buy32 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate44 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Me {
  link: string
  flatrate: Flatrate45[]
}

export interface Flatrate45 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Mk {
  link: string
  flatrate: Flatrate46[]
}

export interface Flatrate46 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Mt {
  link: string
  flatrate: Flatrate47[]
}

export interface Flatrate47 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Mx {
  link: string
  flatrate: Flatrate48[]
}

export interface Flatrate48 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface My {
  link: string
  flatrate: Flatrate49[]
}

export interface Flatrate49 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Mz {
  link: string
  buy: Buy33[]
}

export interface Buy33 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ni {
  link: string
  flatrate: Flatrate50[]
}

export interface Flatrate50 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Nl {
  link: string
  flatrate: Flatrate51[]
  buy: Buy34[]
  rent: Rent3[]
}

export interface Flatrate51 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy34 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Rent3 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface No {
  link: string
  buy: Buy35[]
  flatrate: Flatrate52[]
}

export interface Buy35 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate52 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Nz {
  link: string
  buy: Buy36[]
  flatrate: Flatrate53[]
}

export interface Buy36 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate53 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Pa {
  link: string
  flatrate: Flatrate54[]
}

export interface Flatrate54 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Pe {
  link: string
  flatrate: Flatrate55[]
}

export interface Flatrate55 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Pl {
  link: string
  flatrate: Flatrate56[]
  buy: Buy37[]
}

export interface Flatrate56 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy37 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Pt {
  link: string
  buy: Buy38[]
  flatrate: Flatrate57[]
}

export interface Buy38 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate57 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Py {
  link: string
  flatrate: Flatrate58[]
}

export interface Flatrate58 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ro {
  link: string
  flatrate: Flatrate59[]
  buy: Buy39[]
}

export interface Flatrate59 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy39 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Rs {
  link: string
  flatrate: Flatrate60[]
}

export interface Flatrate60 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Se {
  link: string
  flatrate: Flatrate61[]
  buy: Buy40[]
}

export interface Flatrate61 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy40 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Sg {
  link: string
  flatrate: Flatrate62[]
}

export interface Flatrate62 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Si {
  link: string
  flatrate: Flatrate63[]
  buy: Buy41[]
}

export interface Flatrate63 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy41 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Sk {
  link: string
  buy: Buy42[]
  flatrate: Flatrate64[]
}

export interface Buy42 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Flatrate64 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Sm {
  link: string
  flatrate: Flatrate65[]
}

export interface Flatrate65 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Sv {
  link: string
  flatrate: Flatrate66[]
}

export interface Flatrate66 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Th {
  link: string
  flatrate: Flatrate67[]
}

export interface Flatrate67 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Tt {
  link: string
  flatrate: Flatrate68[]
}

export interface Flatrate68 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Tw {
  link: string
  flatrate: Flatrate69[]
  buy: Buy43[]
}

export interface Flatrate69 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy43 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ua {
  link: string
  buy: Buy44[]
}

export interface Buy44 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Us {
  link: string
  flatrate: Flatrate70[]
  buy: Buy45[]
}

export interface Flatrate70 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Buy45 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Uy {
  link: string
  flatrate: Flatrate71[]
}

export interface Flatrate71 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ve {
  link: string
  flatrate: Flatrate72[]
}

export interface Flatrate72 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Za {
  link: string
  buy: Buy46[]
}

export interface Buy46 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}
