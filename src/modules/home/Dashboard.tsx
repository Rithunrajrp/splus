import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
  {
    title: 'Total Employees',
    value: '1,245',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'bg-gray-600',
  },
  {
    title: 'Active Sites',
    value: '87',
    change: '+3',
    trend: 'up',
    icon: Building2,
    color: 'bg-gray-600',
  },
  {
    title: 'Attendance Today',
    value: '98.5%',
    change: '+2.5%',
    trend: 'up',
    icon: Calendar,
    color: 'bg-gray-600',
  },
  {
    title: 'Monthly Revenue',
    value: '$284,500',
    change: '-3.2%',
    trend: 'down',
    icon: DollarSign,
    color: 'bg-gray-600',
  },
];

const recentActivities = [
  { id: 1, action: 'New employee onboarded', user: 'John Smith', time: '2 minutes ago' },
  { id: 2, action: 'Site inspection completed', user: 'Site Manager', time: '15 minutes ago' },
  { id: 3, action: 'Invoice generated', user: 'Finance Team', time: '1 hour ago' },
  { id: 4, action: 'Leave request approved', user: 'HR Department', time: '2 hours ago' },
  { id: 5, action: 'New project created', user: 'Admin User', time: '3 hours ago' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="enterprise-page-header -mx-6 -mt-6 mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                <div className="flex items-center mt-2 text-xs">
                  {stat.trend === 'up' ? (
                    <>
                      <TrendingUp className="w-3 h-3 text-emerald-600 mr-1" />
                      <span className="text-emerald-600 font-medium">{stat.change}</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                      <span className="text-red-600 font-medium">{stat.change}</span>
                    </>
                  )}
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--primary-brand)' }}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{activity.user}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Status Overview</CardTitle>
            <CardDescription>Current system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Employees</span>
                <Badge variant="success">1,187 Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On Leave</span>
                <Badge variant="warning">42 On Leave</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending Approvals</span>
                <Badge variant="destructive">15 Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Open Tickets</span>
                <Badge variant="default">8 Open</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">System Health</span>
                <Badge variant="success">All Systems Operational</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Card - Professional, Not Flashy */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Welcome to Splus</h2>
          <p className="text-gray-600 text-sm">
            Enterprise-grade workforce management system. 272 pages across 39 modules.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
