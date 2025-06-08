
import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "South Indian Thali",
      description: "Complete meal with rice, sambar, rasam, vegetables, curd, and pickle",
      price: 120,
      category: "Thali",
      isVeg: true,
      isAvailable: true,
      image: null
    },
    {
      id: 2,
      name: "Curd Rice",
      description: "Comforting curd rice with tempering and pickle",
      price: 80,
      category: "Rice",
      isVeg: true,
      isAvailable: true,
      image: null
    },
    {
      id: 3,
      name: "Vegetable Biriyani",
      description: "Fragrant basmati rice with mixed vegetables and spices",
      price: 140,
      category: "Biriyani",
      isVeg: true,
      isAvailable: false,
      image: null
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isVeg: true,
    isAvailable: true
  });

  const [editingItem, setEditingItem] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const categories = ['Thali', 'Rice', 'Biriyani', 'Curry', 'Snacks', 'Desserts'];

  const handleAddItem = () => {
    const item = {
      id: Date.now(),
      ...newItem,
      price: parseInt(newItem.price),
      image: null
    };
    setMenuItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: '',
      isVeg: true,
      isAvailable: true
    });
    setIsAddDialogOpen(false);
  };

  const toggleAvailability = (id) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const deleteItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 lg:p-0">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Menu Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Manage your menu items, prices, and availability</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 w-full lg:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl mx-4 lg:mx-auto">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label>Item Name</Label>
                  <Input
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={newItem.category} 
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mt-6">
                    <Switch
                      checked={newItem.isVeg}
                      onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, isVeg: checked }))}
                    />
                    <Label>Vegetarian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newItem.isAvailable}
                      onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, isAvailable: checked }))}
                    />
                    <Label>Available</Label>
                  </div>
                </div>
              </div>

              <Button onClick={handleAddItem} className="w-full bg-orange-500 hover:bg-orange-600">
                Add Menu Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className={`${!item.isAvailable ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base lg:text-lg truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      {item.isVeg && <Badge className="bg-green-500 text-xs">Veg</Badge>}
                    </div>
                    <p className="text-lg lg:text-xl font-bold text-orange-500">₹{item.price}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.isAvailable}
                      onCheckedChange={() => toggleAvailability(item.id)}
                    />
                    <span className="text-xs lg:text-sm text-gray-600">
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
