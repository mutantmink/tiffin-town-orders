
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChefHat
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface VendorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const VendorSidebar = ({ activeTab, setActiveTab }: VendorSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu Management', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">TC</span>
          </div>
          <span className="text-xl font-bold text-gray-800">TiffinConnect</span>
        </Link>
        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-orange-500" />
            <div>
              <p className="font-semibold text-gray-800">Amma's Kitchen</p>
              <p className="text-xs text-gray-600">Vendor Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Separator className="mb-4" />
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VendorSidebar;
