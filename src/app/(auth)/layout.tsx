import { GuestRoute } from "@/features/auth/components/guest-route";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestRoute>{children}</GuestRoute>;
}
