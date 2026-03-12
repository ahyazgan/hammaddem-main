import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Talep {
  id: string;
  talep_no: string;
  kategori: string;
  malzeme: string | null;
  miktar: number;
  birim: string;
  teslimat_ili: string | null;
  teslimat_tarihi: string | null;
  not_text: string | null;
  teklif_fiyat: number | null;
  durum: string;
  hizmet_tipi: string;
  created_at: string;
  updated_at: string;
}

interface TaleplerContextType {
  talepler: Talep[];
  loading: boolean;
}

const TaleplerContext = createContext<TaleplerContextType>({ talepler: [], loading: true });

export const TaleplerProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [talepler, setTalepler] = useState<Talep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data } = await supabase
        .from("talepler")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setTalepler(data as unknown as Talep[]);
      setLoading(false);
    };
    fetchData();
    const channel = supabase
      .channel("talepler-shared")
      .on("postgres_changes", { event: "*", schema: "public", table: "talepler" }, fetchData)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  return (
    <TaleplerContext.Provider value={{ talepler, loading }}>
      {children}
    </TaleplerContext.Provider>
  );
};

export const useTalepler = () => useContext(TaleplerContext);
