import { Bell, Search, User, LogOut, Building2, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemePicker } from '@/components/ui/ThemePicker';
import { useNavStore } from '@/store/navStore';
import { useNavigate } from 'react-router-dom';

export function Topbar() {
  const { aiPanelOpen, toggleAiPanel } = useNavStore();
  const navigate = useNavigate();

  return (
    <header
      className="enterprise-topbar h-14 flex items-center justify-between px-5"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60 }}
    >
      {/* Brand */}
      <div className="flex items-center flex-shrink-0">
        <img src="/logo.png" alt="S-Plus" className="h-8 w-auto" />
      </div>

      {/* Search + Ask AI */}
      <div className="flex-1 max-w-xl mx-6 flex items-center gap-2">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search modules, employees, sites…"
            className="pl-9 h-9 bg-gray-50 border-gray-200 text-[13px]"
          />
        </div>

        {/* Ask AI button */}
        <button
          type="button"
          onClick={toggleAiPanel}
          className="flex items-center gap-1.5 h-9 px-3 rounded-md text-[13px] font-medium transition-all duration-150 flex-shrink-0"
          style={{
            background: aiPanelOpen ? 'var(--primary-brand)' : 'transparent',
            color: aiPanelOpen ? '#ffffff' : 'var(--primary-brand)',
            border: `1px solid ${aiPanelOpen ? 'transparent' : 'var(--primary-brand)'}`,
          }}
        >
          <Sparkles size={14} style={{ flexShrink: 0 }} />
          <span>Ask AI</span>
        </button>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <Button variant="ghost" size="icon" title="Company Info" className="h-9 w-9">
          <Building2 className="w-[17px] h-[17px] text-gray-500" />
        </Button>

        <Button variant="ghost" size="icon" title="Help & Support" className="h-9 w-9">
          <HelpCircle className="w-[17px] h-[17px] text-gray-500" />
        </Button>

        <ThemePicker />

        <Button variant="ghost" size="icon" className="relative h-9 w-9" title="Notifications">
          <Bell className="w-[17px] h-[17px] text-gray-500" />
          <Badge
            variant="destructive"
            className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
          >
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-gray-200">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2.5 py-1.5 rounded-lg transition-colors">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--primary-brand)', transition: 'background-color 0.3s' }}
            >
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800 leading-none">John Doe</p>
              <p className="text-[11px] text-gray-400 leading-none mt-0.5">Administrator</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" title="Logout" className="h-8 w-8" onClick={() => navigate('/login')}>
            <LogOut className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </div>
    </header>
  );
}
