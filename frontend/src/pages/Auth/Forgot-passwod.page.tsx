import { Card, CardHeader } from "@/components/ui/card";

const ForgotPassword = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold">Forgot Password</h2>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ForgotPassword;
