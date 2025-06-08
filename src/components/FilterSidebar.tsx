
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  filters: {
    cuisine: string;
    dietType: string;
    priceRange: string;
    deliveryTime: string;
  };
  setFilters: (filters: any) => void;
}

const FilterSidebar = ({ filters, setFilters }: FilterSidebarProps) => {
  const cuisines = ['South Indian', 'North Indian', 'Continental', 'Chinese', 'Bengali', 'Gujarati'];
  const dietTypes = ['Veg', 'Non-Veg', 'Vegan', 'Jain'];
  const priceRanges = ['Under ₹100', '₹100-200', '₹200-300', 'Above ₹300'];
  const deliveryTimes = ['Under 30 min', '30-45 min', '45-60 min', 'Above 60 min'];

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      cuisine: '',
      dietType: '',
      priceRange: '',
      deliveryTime: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-orange-500 hover:text-orange-600"
            >
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cuisine */}
        <div>
          <h4 className="font-medium mb-3">Cuisine</h4>
          <div className="space-y-2">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => updateFilter('cuisine', cuisine)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.cuisine === cuisine
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Diet Type */}
        <div>
          <h4 className="font-medium mb-3">Diet Type</h4>
          <div className="flex flex-wrap gap-2">
            {dietTypes.map((diet) => (
              <Badge
                key={diet}
                variant={filters.dietType === diet ? "default" : "outline"}
                className={`cursor-pointer ${
                  filters.dietType === diet 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'hover:bg-orange-50'
                }`}
                onClick={() => updateFilter('dietType', diet)}
              >
                {diet}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range}
                onClick={() => updateFilter('priceRange', range)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.priceRange === range
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Delivery Time */}
        <div>
          <h4 className="font-medium mb-3">Delivery Time</h4>
          <div className="space-y-2">
            {deliveryTimes.map((time) => (
              <button
                key={time}
                onClick={() => updateFilter('deliveryTime', time)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.deliveryTime === time
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
