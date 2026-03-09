export type YukTipi = 'silobas' | 'hafriyat'
export type TalepDurum = 'bekliyor' | 'teklif' | 'onaylandi' | 'yolda' | 'teslim' | 'reddedildi' | 'iptal'
export type SiparisDurum = 'hazirlaniyor' | 'yuklendi' | 'yolda' | 'teslim_edildi' | 'iptal'

export interface Profile {
  id: string
  created_at: string
  firma_adi?: string
  telefon?: string
  il?: string
  vergi_no?: string
  rol: 'musteri' | 'admin'
}

export interface Talep {
  id: string
  created_at: string
  musteri_id?: string
  misafir_telefon?: string
  yuk_tipi: YukTipi
  malzeme: string
  miktar: number
  birim: string
  il: string
  adres?: string
  istenen_tarih?: string
  not?: string
  durum: TalepDurum
  teklif_fiyat?: number
  teklif_notu?: string
  teklif_tarihi?: string
  takip_no: string
}

export interface Siparis {
  id: string
  created_at: string
  talep_id: string
  musteri_id: string
  durum: SiparisDurum
  surucu_adi?: string
  plaka?: string
  yukleme_tarihi?: string
  teslim_tarihi?: string
  tahmini_teslim?: string
  irsaliye_url?: string
  admin_notu?: string
}

export interface Bildirim {
  id: string
  created_at: string
  musteri_id: string
  baslik: string
  mesaj: string
  tip: 'bilgi' | 'teklif' | 'durum' | 'teslim'
  okundu: boolean
  talep_id?: string
  siparis_id?: string
}
