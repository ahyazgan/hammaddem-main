import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  firma_adi: string | null;
  telefon: string | null;
  created_at: string;
  role: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchUsers = async () => {
    const [{ data: profileData }, { data: roleData }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    if (profileData) setProfiles(profileData as unknown as Profile[]);
    if (roleData) {
      const map: Record<string, string> = {};
      (roleData as unknown as UserRole[]).forEach(r => { map[r.user_id] = r.role; });
      setRoles(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateRole = async (userId: string, newRole: string) => {
    setUpdating(userId);
    const { error } = await supabase.from("user_roles").upsert({ user_id: userId, role: newRole as any }, { onConflict: "user_id" });
    if (error) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    } else {
      setRoles(prev => ({ ...prev, [userId]: newRole }));
      toast({ title: "Güncellendi", description: `Rol "${newRole}" olarak değiştirildi.` });
    }
    setUpdating(null);
  };

  const filtered = profiles.filter(p => {
    const q = search.toLowerCase();
    return !q || (p.email?.toLowerCase().includes(q) || p.firma_adi?.toLowerCase().includes(q) || p.telefon?.includes(q));
  });

  const roleColors: Record<string, string> = {
    admin: "text-[#ef4444] bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.2)]",
    moderator: "text-[#8b5cf6] bg-[rgba(139,92,246,0.1)] border-[rgba(139,92,246,0.2)]",
    user: "text-[#5a6278] bg-[#111520] border-[#1c2133]",
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-4 lg:px-6 py-3 border-b border-[#1c2133] flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a6278]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Kullanıcı ara..."
            className="w-full bg-[#111520] border border-[#1c2133] rounded-lg pl-9 pr-3 py-2 text-[12px] text-[#e8eaf0] placeholder:text-[#5a6278] focus:outline-none focus:border-[#e8620a] transition-colors"
          />
        </div>
        <span className="text-[11px] text-[#5a6278] font-mono">{filtered.length} kullanıcı</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center py-12 text-[#5a6278] text-[11px]">Yükleniyor...</div>
        ) : (
          <table className="w-full text-[12px]">
            <thead className="sticky top-0 bg-[#0d1017] border-b border-[#1c2133]">
              <tr className="text-[10px] font-semibold text-[#5a6278] uppercase tracking-wider">
                <th className="text-left px-4 lg:px-6 py-2.5">Kullanıcı</th>
                <th className="text-left px-4 py-2.5 hidden md:table-cell">Telefon</th>
                <th className="text-left px-4 py-2.5 hidden md:table-cell">Kayıt Tarihi</th>
                <th className="text-left px-4 py-2.5">Rol</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const role = roles[p.user_id] || "user";
                return (
                  <tr key={p.id} className="border-b border-[#1c2133] hover:bg-[#0d1017] transition-colors">
                    <td className="px-4 lg:px-6 py-3">
                      <div className="font-medium text-[#e8eaf0]">{p.firma_adi || "—"}</div>
                      <div className="text-[10px] text-[#5a6278]">{p.email}</div>
                    </td>
                    <td className="px-4 py-3 text-[#9aa3b8] hidden md:table-cell">{p.telefon || "—"}</td>
                    <td className="px-4 py-3 text-[#5a6278] font-mono hidden md:table-cell">
                      {new Date(p.created_at).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={role}
                        disabled={updating === p.user_id}
                        onChange={e => updateRole(p.user_id, e.target.value)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-semibold border cursor-pointer appearance-none ${roleColors[role] || roleColors.user} focus:outline-none disabled:opacity-40`}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
