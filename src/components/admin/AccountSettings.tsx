
import { Card, CardContent } from "@/components/ui/card";
import AdminCredentialsForm from "./AdminCredentialsForm";

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your admin account and credentials.
        </p>
      </div>
      
      <div className="grid gap-6">
        <AdminCredentialsForm />
      </div>
    </div>
  );
};

export default AccountSettings;
