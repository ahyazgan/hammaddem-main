import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import NotificationsDropdown from "./NotificationsDropdown";
import logo from "@/assets/logo.svg";

interface Props {
  user: User;
  onMenuToggle: () => void;
}

const DashboardTopbar = ({ user, onMenuToggle }: Props) => {
  const initials = (user.user_metadata?.firma_adi || user.email || "U")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="col-span-full bg-background border-b border-border flex items-center px-4 gap-0 z-50">
      <button onClick={onMenuToggle} className="md:hidden mr-3 text-muted-foreground">
        <Menu size={20} />
      </button>

      <div className="flex items-center w-auto md:w-[220px] md:border-r md:border-border md:mr-4 pr-4 shrink-0">
        <img src={logo} alt="Hammaddem" className="h-12 w-auto" />
      </div>

      <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
        <span>platform</span>
        <span className="text-border">/</span>
        <span className="text-foreground">dashboard</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] bg-green-50 border border-green-200 text-[11px] font-medium text-green-600 font-mono">
          <div className="w-[5px] h-[5px] rounded-full bg-green-500 animate-pulse" />
          SİSTEM CANLI
        </div>

        <NotificationsDropdown />

        <div className="w-7 h-7 rounded-[6px] bg-gradient-to-br from-primary to-[hsl(var(--accent-hover))] flex items-center justify-center text-[11px] font-bold text-primary-foreground cursor-pointer">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
