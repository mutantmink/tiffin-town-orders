
import { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const VendorSettings = () => {
  const [settings, setSettings] = useState({
    kitchenName: "Amma's Kitchen",
    ownerName: "Kamala Devi",
    email: "kamala@ammaskitchen.com",
    phone: "+91 98765 43210",
    address: "123 Temple Street, Koramangala, Bangalore - 560034",
    description: "Authentic South Indian home-style cooking with fresh ingredients and traditional recipes passed down through generations.",
    cuisineType: "South Indian",
    operatingHours: {
      start: "08:00",
      end: "20:00"
    },
    isActive: true,
    acceptingOrders: true,
    maxOrdersPerDay: 50,
    deliveryRadius: 5,
    minimumOrderValue: 100
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimeChange = (timeType, value) => {
    setSettings(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [timeType]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Show success toast
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kitchen Settings</h1>
        <p className="text-gray-600">Manage your kitchen profile and operational settings</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kitchenName">Kitchen Name</Label>
                <Input
                  id="kitchenName"
                  value={settings.kitchenName}
                  onChange={(e) => handleInputChange('kitchenName', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input
                  id="ownerName"
                  value={settings.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cuisineType">Cuisine Type</Label>
              <Input
                id="cuisineType"
                value={settings.cuisineType}
                onChange={(e) => handleInputChange('cuisineType', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Kitchen Address</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="description">Kitchen Description</Label>
              <Textarea
                id="description"
                value={settings.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Operational Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Operational Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Operating Hours</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={settings.operatingHours.start}
                    onChange={(e) => handleTimeChange('start', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={settings.operatingHours.end}
                    onChange={(e) => handleTimeChange('end', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="maxOrders">Max Orders per Day</Label>
                <Input
                  id="maxOrders"
                  type="number"
                  value={settings.maxOrdersPerDay}
                  onChange={(e) => handleInputChange('maxOrdersPerDay', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
                <Input
                  id="deliveryRadius"
                  type="number"
                  value={settings.deliveryRadius}
                  onChange={(e) => handleInputChange('deliveryRadius', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="minimumOrder">Minimum Order Value (₹)</Label>
                <Input
                  id="minimumOrder"
                  type="number"
                  value={settings.minimumOrderValue}
                  onChange={(e) => handleInputChange('minimumOrderValue', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Kitchen Status</Label>
                  <p className="text-sm text-gray-600">Make your kitchen visible to customers</p>
                </div>
                <Switch
                  checked={settings.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Accept New Orders</Label>
                  <p className="text-sm text-gray-600">Toggle to stop accepting new orders temporarily</p>
                </div>
                <Switch
                  checked={settings.acceptingOrders}
                  onCheckedChange={(checked) => handleInputChange('acceptingOrders', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kitchen Images */}
        <Card>
          <CardHeader>
            <CardTitle>Kitchen Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Upload Kitchen Photos</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorSettings;
