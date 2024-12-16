// 'use client';

import { useEffect } from 'react';
// import { getMsalInstance } from '../form/msalConfig';
// import { withAuth } from '../form/authWrapper';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/Overview"
import { RecentProjects } from "@/components/RecentProjects"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Battery, Wind } from 'lucide-react'

function DashboardPage() {
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const msalInstance = await getMsalInstance();
  //       if (!msalInstance) return;

  //       const accounts = msalInstance.getAllAccounts();
  //       if (accounts.length === 0) {
  //         await msalInstance.loginRedirect({
  //           scopes: ['user.read'],
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Authentication error:', error);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  // const handleSignOut = async () => {
  //   try {
  //     const msalInstance = await getMsalInstance();
  //     if (msalInstance) {
  //       await msalInstance.logoutRedirect();
  //     }
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#1A3721] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#CCFF00]">Pablo Dashboard</div>
          <Button 
            variant="outline" 
            className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#1A3721]"
            // onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Optimizations</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,500 kg/day</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Renewable Energy</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Production Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentProjects />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;

