import { useAuth } from "@/contexts/AuthContext";
import AdminPanel from "@/components/dashboard/AdminPanel";
import { ShieldX, Loader2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const Admin = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen bg-[#080a0f] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#e8620a] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/giris" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="h-screen bg-[#080a0f] flex items-center justify-center px-4">
        <div className="w-full max-w-[340px] bg-[#0d1017] border border-[#1c2133] rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mx-auto mb-5">
            <ShieldX size={20} className="text-red-400" />
          </div>
          <h1 className="text-[16px] font-bold text-[#e8eaf0] mb-1">Erişim Reddedildi</h1>
          <p className="text-[12px] text-[#5a6278] mb-6">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-2.5 rounded-lg bg-[#1c2133] text-[#e8eaf0] text-[13px] font-semibold hover:bg-[#252d42] transition-colors"
          >
            Dashboard'a Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#080a0f] text-[#e8eaf0] font-sans text-[13px] flex flex-col">
      <div className="h-12 border-b border-[#1c2133] flex items-center px-4 lg:px-6 justify-between shrink-0">
        <span className="text-[14px] font-semibold flex items-center gap-2">⚡ Hammaddem Admin</span>
        <button
          onClick={() => { signOut(); navigate("/giris"); }}
          className="text-[11px] text-[#5a6278] hover:text-[#e8eaf0] transition-colors"
        >
          Çıkış
        </button>
      </div>
      <AdminPanel />
    </div>
  );
};

export default Admin;
