import { FileText, Download, Eye, Edit, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";

export function Receipts() {
  return (
    <div className="p-8 max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-semibold">Receipts</h1>
            <FileText className="w-6 h-6 text-[var(--genie-primary)]" />
          </div>
          <p className="text-muted-foreground">
            Customize your receipt templates and settings.
          </p>
        </div>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview Receipt
        </Button>
      </div>

      {/* Receipt Preview */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Business Info */}
          <Card className="border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receipt-name">Business Name on Receipt</Label>
                <Input
                  id="receipt-name"
                  defaultValue="The Artisan Kitchen"
                  className="bg-[var(--input-background)] border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-tagline">Tagline</Label>
                <Input
                  id="receipt-tagline"
                  defaultValue="Fresh. Local. Delicious."
                  className="bg-[var(--input-background)] border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt-address">Address</Label>
                <Textarea
                  id="receipt-address"
                  defaultValue="425 Market Street&#10;San Francisco, CA 94105&#10;(415) 555-0123"
                  className="bg-[var(--input-background)] border-0"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Footer Messages */}
          <Card className="border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle>Receipt Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thank-you">Thank You Message</Label>
                <Textarea
                  id="thank-you"
                  defaultValue="Thank you for dining with us!&#10;We hope to see you again soon."
                  className="bg-[var(--input-background)] border-0"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="footer">Footer Text</Label>
                <Input
                  id="footer"
                  defaultValue="Follow us @artisankitchen"
                  className="bg-[var(--input-background)] border-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Display Options */}
          <Card className="border-[var(--border)] shadow-sm">
            <CardHeader>
              <CardTitle>Display Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Logo</Label>
                  <p className="text-sm text-muted-foreground">Display business logo on receipt</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show QR Code</Label>
                  <p className="text-sm text-muted-foreground">Include QR code for digital receipt</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Server Name</Label>
                  <p className="text-sm text-muted-foreground">Display server on receipt</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Itemized Tax Breakdown</Label>
                  <p className="text-sm text-muted-foreground">Show detailed tax information</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <Card className="border-[var(--border)] shadow-sm bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="text-center">Receipt Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 font-mono text-sm">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--genie-primary)] to-[var(--genie-primary-light)] flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-bold text-lg mb-1">THE ARTISAN KITCHEN</div>
                  <div className="text-xs text-muted-foreground">Fresh. Local. Delicious.</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    425 Market Street<br />
                    San Francisco, CA 94105<br />
                    (415) 555-0123
                  </div>
                </div>

                <div className="border-t border-b border-gray-300 py-4 my-4">
                  <div className="flex justify-between mb-2">
                    <span>Order #4521</span>
                    <span>Table 12</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Mar 3, 2026 • 6:45 PM<br />
                    Server: Lisa A.
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>1x Margherita Pizza</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1x Caesar Salad</span>
                    <span>$12.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2x House Wine</span>
                    <span>$24.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1x Tiramisu</span>
                    <span>$9.00</span>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-3 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$60.00</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Tax (10%)</span>
                    <span>$6.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2">
                    <span>TOTAL</span>
                    <span>$66.00</span>
                  </div>
                </div>

                <div className="border-t border-gray-300 mt-6 pt-4 text-center text-xs">
                  <div className="mb-3">
                    <div className="w-24 h-24 bg-gray-200 rounded mx-auto flex items-center justify-center">
                      <span className="text-gray-500">QR Code</span>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    Thank you for dining with us!<br />
                    We hope to see you again soon.
                  </div>
                  <div className="mt-2 text-[var(--genie-primary)]">
                    Follow us @artisankitchen
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export Template
            </Button>
            <Button className="flex-1 bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
              <Edit className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
