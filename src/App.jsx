import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout'
import { ThemeProvider,  } from './context/theme-provider'
import WeatherDashboard from './pages/weather-dashboard'
import {CityPage} from './pages/city-page'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { FavoriteCities } from './components/favorite-cities'
import AirPollutionPage from './pages/air-pollution'
function App() {
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
              <Route path="/air-pollution" element={<AirPollutionPage />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App
