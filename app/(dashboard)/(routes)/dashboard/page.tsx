import { UserButton } from '@clerk/nextjs';

export default function DashboardPage() {
  return (
    <div>
      <p>Dashboard</p>
      <UserButton afterSignOutUrl='/'/>
    </div>
  );
}
