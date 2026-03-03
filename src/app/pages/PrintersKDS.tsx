import { Printer, Monitor, Plus, Wifi, WifiOff, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const printers = [
  {
    name: "Front Counter Receipt",
    type: "Receipt Printer",
    location: "Downtown SF",
    status: "online",
    ip: "192.168.1.101",
  },
  {
    name: "Kitchen Receipt",
    type: "Receipt Printer",
    location: "Downtown SF",
    status: "online",
    ip: "192.168.1.102",
  },
  {
    name: "Bar Printer",
    type: "Receipt Printer",
    location: "Downtown SF",
    status: "offline",
    ip: "192.168.1.103",
  },
];

const kdsStations = [
  {
    name: "Main Kitchen",
    location: "Downtown SF",
    status: "online",
    items: ["Pizza", "Pasta", "Mains"],
    device: "iPad Pro 12.9",
  },
  {
    name: "Prep Station",
    location: "Downtown SF",
    status: "online",
    items: ["Salads", "Appetizers"],
    device: "iPad Air",
  },
  {
    name: "Bar Station",
    location: "Downtown SF",
    status: "online",
    items: ["Drinks", "Cocktails"],
    device: "iPad",
  },
];

export function PrintersKDS() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Printers & KDS</h1>
            <Printer className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            Manage receipt printers and kitchen display systems.
          </p>
        </div>
        <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">6</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[var(--genie-success)]">5</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Printers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">3</div>
          </CardContent>
        </Card>

        <Card className="border-[var(--border)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              KDS Stations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="printers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="printers">Receipt Printers</TabsTrigger>
          <TabsTrigger value="kds">Kitchen Display</TabsTrigger>
        </TabsList>

        <TabsContent value="printers" className="space-y-4">
          {printers.map((printer, index) => (
            <Card key={index} className="border-[var(--border)] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--genie-primary-lighter)] to-[var(--genie-accent-light)] flex items-center justify-center">
                      <Printer className="w-7 h-7 text-[var(--genie-primary)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{printer.name}</h3>
                        {printer.status === "online" ? (
                          <Badge className="bg-[var(--genie-success-light)] text-[var(--genie-success)] hover:bg-[var(--genie-success-light)]">
                            <Wifi className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-50">
                            <WifiOff className="w-3 h-3 mr-1" />
                            Offline
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{printer.type}</span>
                        <span>•</span>
                        <span>{printer.location}</span>
                        <span>•</span>
                        <span className="font-mono text-xs">{printer.ip}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="kds" className="space-y-4">
          {kdsStations.map((station, index) => (
            <Card key={index} className="border-[var(--border)] shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--genie-info-light)] to-[var(--genie-primary-lighter)] flex items-center justify-center">
                      <Monitor className="w-7 h-7 text-[var(--genie-info)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{station.name}</h3>
                        <Badge className="bg-[var(--genie-success-light)] text-[var(--genie-success)] hover:bg-[var(--genie-success-light)]">
                          <Wifi className="w-3 h-3 mr-1" />
                          Online
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>{station.device}</span>
                        <span>•</span>
                        <span>{station.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {station.items.map((item) => (
                          <Badge key={item} variant="secondary" className="bg-[var(--muted)]">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
