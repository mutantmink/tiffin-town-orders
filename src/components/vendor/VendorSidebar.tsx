
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChefHat,
  Menu
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';

interface VendorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const VendorSidebar = ({ activeTab, setActiveTab }: VendorSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false); // Close mobile menu on selection
  };

  const SidebarContent = () => (
    <>
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

      <nav className="p-4 flex-1">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-800">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              <span className="text-lg font-bold text-gray-800">TiffinConnect</span>
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
          <div className="grid grid-cols-4 gap-1 p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 shadow-sm flex-col">
        <SidebarContent />
      </div>
    </>
  );
};

export default VendorSidebar;
