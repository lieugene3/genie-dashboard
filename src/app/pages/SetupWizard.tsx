import { Wand2, CheckCircle2, Circle, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

const steps = [
  {
    title: "Organization Details",
    description: "Set up your business information",
    status: "completed",
  },
  {
    title: "First Location",
    description: "Add your restaurant location",
    status: "completed",
  },
  {
    title: "Menu Setup",
    description: "Import or create your menu items",
    status: "completed",
  },
  {
    title: "Payment Methods",
    description: "Configure payment processing",
    status: "in-progress",
  },
  {
    title: "Staff & Permissions",
    description: "Invite your team members",
    status: "pending",
  },
  {
    title: "Printers & Devices",
    description: "Connect hardware and displays",
    status: "pending",
  },
  {
    title: "Go Live!",
    description: "Review and launch your POS",
    status: "pending",
  },
];

const quickActions = [
  {
    title: "Import Menu",
    description: "Upload your existing menu from a CSV or spreadsheet",
    icon: "📋",
  },
  {
    title: "Add Staff",
    description: "Invite team members and assign roles",
    icon: "👥",
  },
  {
    title: "Connect Printer",
    description: "Set up receipt printers and kitchen displays",
    icon: "🖨️",
  },
  {
    title: "Test Payment",
    description: "Process a test transaction to verify setup",
    icon: "💳",
  },
];

export function SetupWizard() {
  const completedSteps = steps.filter((s) => s.status === "completed").length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Wand2 className="w-8 h-8 text-[var(--genie-primary)]" />
          <h1 className="text-4xl font-semibold">Setup Wizard</h1>
          <Sparkles className="w-6 h-6 text-[var(--genie-accent)]" />
        </div>
        <p className="text-muted-foreground text-lg">
          Let's get your restaurant up and running in just a few steps!
        </p>
      </div>

      {/* Progress */}
      <Card className="border-[var(--border)] shadow-sm bg-gradient-to-br from-[var(--genie-primary-lighter)] to-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold">Setup Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedSteps} of {steps.length} steps completed
              </p>
            </div>
            <div className="text-3xl font-bold text-[var(--genie-primary)]">
              {Math.round(progress)}%
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card
            key={index}
            className={`
              border-2 transition-all cursor-pointer hover:shadow-md
              ${step.status === "completed" ? "border-[var(--genie-success)] bg-[var(--genie-success-light)]" : ""}
              ${step.status === "in-progress" ? "border-[var(--genie-primary)] bg-[var(--genie-primary-lighter)]" : ""}
              ${step.status === "pending" ? "border-gray-200 bg-white" : ""}
            `}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center shrink-0
                      ${step.status === "completed" ? "bg-[var(--genie-success)] text-white" : ""}
                      ${step.status === "in-progress" ? "bg-[var(--genie-primary)] text-white animate-pulse" : ""}
                      ${step.status === "pending" ? "bg-gray-200 text-gray-400" : ""}
                    `}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : step.status === "in-progress" ? (
                      <Sparkles className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {step.status === "in-progress" && (
                  <Button className="bg-[var(--genie-primary)] hover:bg-[var(--genie-primary-light)]">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                {step.status === "pending" && <Button variant="outline">Start</Button>}
                {step.status === "completed" && (
                  <Button variant="ghost" className="text-[var(--genie-success)]">
                    Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Common tasks to help you get started faster
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="p-5 rounded-lg bg-[var(--muted)] hover:bg-[var(--accent)] transition-colors cursor-pointer border border-transparent hover:border-[var(--genie-primary)]"
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h4 className="font-semibold mb-1">{action.title}</h4>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="border-[var(--border)] shadow-sm bg-gradient-to-br from-[var(--genie-accent-light)] to-[var(--genie-primary-lighter)]">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[var(--genie-primary)] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-[var(--genie-primary)] mb-1">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Our setup guides and support team are here to help you every step of the way.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  View Guides
                </Button>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
