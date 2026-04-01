export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bildirimler: {
        Row: {
          baslik: string
          created_at: string
          id: string
          mesaj: string
          okundu: boolean
          talep_id: string | null
          tip: string
          user_id: string
        }
        Insert: {
          baslik: string
          created_at?: string
          id?: string
          mesaj: string
          okundu?: boolean
          talep_id?: string | null
          tip?: string
          user_id: string
        }
        Update: {
          baslik?: string
          created_at?: string
          id?: string
          mesaj?: string
          okundu?: boolean
          talep_id?: string | null
          tip?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bildirimler_talep_id_fkey"
            columns: ["talep_id"]
            isOneToOne: false
            referencedRelation: "talepler"
            referencedColumns: ["id"]
          },
        ]
      }
      iletisim_mesajlari: {
        Row: {
          id: string
          ad_soyad: string
          email: string
          mesaj: string
          okundu: boolean
          created_at: string
        }
        Insert: {
          id?: string
          ad_soyad: string
          email: string
          mesaj: string
          okundu?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          ad_soyad?: string
          email?: string
          mesaj?: string
          okundu?: boolean
          created_at?: string
        }
        Relationships: []
      }
      misafir_talepler: {
        Row: {
          aciliyet: string
          adres: string | null
          birim: string
          created_at: string
          durum: string
          hizmet_tipi: string
          id: string
          kategori: string
          malzeme: string | null
          miktar: number
          not_text: string | null
          talep_no: string
          telefon: string
          teslimat_ili: string | null
          teslimat_tarihi: string | null
          updated_at: string
          yuk_adres: string | null
        }
        Insert: {
          aciliyet?: string
          adres?: string | null
          birim?: string
          created_at?: string
          durum?: string
          hizmet_tipi?: string
          id?: string
          kategori: string
          malzeme?: string | null
          miktar?: number
          not_text?: string | null
          talep_no: string
          telefon: string
          teslimat_ili?: string | null
          teslimat_tarihi?: string | null
          updated_at?: string
          yuk_adres?: string | null
        }
        Update: {
          aciliyet?: string
          adres?: string | null
          birim?: string
          created_at?: string
          durum?: string
          hizmet_tipi?: string
          id?: string
          kategori?: string
          malzeme?: string | null
          miktar?: number
          not_text?: string | null
          talep_no?: string
          telefon?: string
          teslimat_ili?: string | null
          teslimat_tarihi?: string | null
          updated_at?: string
          yuk_adres?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          firma_adi: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          telefon: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          firma_adi?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          telefon?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          firma_adi?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          telefon?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          label: string | null
          updated_at: string
          value: string
        }
        Insert: {
          id?: string
          key: string
          label?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          id?: string
          key?: string
          label?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      tasiyici_basvurulari: {
        Row: {
          id: string
          ad_soyad: string
          telefon: string
          arac_tipi: string
          plaka: string
          durum: string
          created_at: string
        }
        Insert: {
          id?: string
          ad_soyad: string
          telefon: string
          arac_tipi: string
          plaka: string
          durum?: string
          created_at?: string
        }
        Update: {
          id?: string
          ad_soyad?: string
          telefon?: string
          arac_tipi?: string
          plaka?: string
          durum?: string
          created_at?: string
        }
        Relationships: []
      }
      talepler: {
        Row: {
          aciliyet: string
          adres: string | null
          birim: string
          created_at: string
          durum: string
          hizmet_tipi: string
          id: string
          kategori: string
          malzeme: string | null
          miktar: number
          not_text: string | null
          talep_no: string
          teklif_fiyat: number | null
          tekrarli: boolean
          teslimat_ili: string | null
          teslimat_tarihi: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          aciliyet?: string
          adres?: string | null
          birim?: string
          created_at?: string
          durum?: string
          hizmet_tipi?: string
          id?: string
          kategori: string
          malzeme?: string | null
          miktar?: number
          not_text?: string | null
          talep_no: string
          teklif_fiyat?: number | null
          tekrarli?: boolean
          teslimat_ili?: string | null
          teslimat_tarihi?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          aciliyet?: string
          adres?: string | null
          birim?: string
          created_at?: string
          durum?: string
          hizmet_tipi?: string
          id?: string
          kategori?: string
          malzeme?: string | null
          miktar?: number
          not_text?: string | null
          talep_no?: string
          teklif_fiyat?: number | null
          tekrarli?: boolean
          teslimat_ili?: string | null
          teslimat_tarihi?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_misafir_talep_no: { Args: never; Returns: string }
      generate_talep_no: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
