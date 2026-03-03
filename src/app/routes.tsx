import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Organization } from "./pages/Organization";
import { Locations } from "./pages/Locations";
import { StaffRoles } from "./pages/StaffRoles";
import { Menu } from "./pages/Menu";
import { TaxesCharges } from "./pages/TaxesCharges";
import { PrintersKDS } from "./pages/PrintersKDS";
import { FloorPlan } from "./pages/FloorPlan";
import { Payments } from "./pages/Payments";
import { Receipts } from "./pages/Receipts";
import { SetupWizard } from "./pages/SetupWizard";
import { AuditLog } from "./pages/AuditLog";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "organization", Component: Organization },
      { path: "locations", Component: Locations },
      { path: "staff", Component: StaffRoles },
      { path: "menu", Component: Menu },
      { path: "taxes", Component: TaxesCharges },
      { path: "printers", Component: PrintersKDS },
      { path: "floor-plan", Component: FloorPlan },
      { path: "payments", Component: Payments },
      { path: "receipts", Component: Receipts },
      { path: "setup", Component: SetupWizard },
      { path: "audit", Component: AuditLog },
    ],
  },
]);
