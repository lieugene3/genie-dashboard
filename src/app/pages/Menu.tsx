import { UtensilsCrossed, Plus, Search, Filter, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 15.0,
    description: "Fresh mozzarella, basil, San Marzano tomatoes",
    status: "active",
    sales: 124,
  },
  {
    id: 2,
    name: "Truffle Pasta",
    category: "Pasta",
    price: 24.0,
    description: "Fresh pasta, black truffle, parmesan cream",
    status: "active",
    sales: 87,
  },
  {
    id: 3,
    name: "Caesar Salad",
    category: "Salads",
    price: 12.0,
    description: "Romaine, house-made dressing, croutons, parmesan",
    status: "active",
    sales: 98,
  },
  {
    id: 4,
    name: "Burrata Appetizer",
    category: "Appetizers",
    price: 15.0,
    description: "Creamy burrata, heirloom tomatoes, basil oil",
    status: "active",
    sales: 76,
  },
  {
    id: 5,
    name: "Grilled Salmon",
    category: "Mains",
    price: 28.0,
    description: "Atlantic salmon, seasonal vegetables, lemon butter",
    status: "active",
    sales: 64,
  },
  {
    id: 6,
    name: "Tiramisu",
    category: "Desserts",
    price: 9.0,
    description: "Classic Italian dessert, espresso-soaked ladyfingers",
    status: "active",
    sales: 65,
  },
  {
    id: 7,
    name: "Seasonal Soup",
    category: "Soups",
    price: 8.0,
    description: "Chef's daily creation",
    status: "inactive",
    sales: 0,
  },
];

const categories = [
  { name: "All Items", count: 42 },
  { name: "Pizza", count: 8 },
  { name: "Pasta", count: 7 },
  { name: "Salads", count: 5 },
  { name: "Appetizers", count: 9 },
  { name: "Mains", count: 6 },
  { name: "Desserts", count: 5 },
  { name: "Drinks", count: 12 },
];

export function Menu() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Menu</h1>
            <UtensilsCrossed className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            Manage your menu items, prices, and availability.
          </p>
        </div>
        <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">42</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">38</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">8</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">$16.50</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search menu items..." className="pl-9 bg-white border" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Categories Tabs */}
      <Tabs defaultValue="All Items" className="space-y-6">
        <TabsList className="bg-white border p-1">
          {categories.map((cat) => (
            <TabsTrigger key={cat.name} value={cat.name} className="data-[state=active]:bg-[var(--genie-primary-lighter)] data-[state=active]:text-[var(--genie-primary)]">
              {cat.name}
              <Badge variant="secondary" className="ml-2 bg-muted">
                {cat.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="All Items" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Card key={item.id} className="border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        {item.status === "active" ? (
                          <Eye className="w-4 h-4 text-[var(--genie-success)]" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-[var(--muted)]">
                        {item.category}
                      </Badge>
                      {item.sales > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {item.sales} sold this week
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xl font-semibold text-[var(--genie-primary)]">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
