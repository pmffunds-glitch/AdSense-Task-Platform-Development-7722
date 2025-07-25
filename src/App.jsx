import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { RevenueProvider } from './contexts/RevenueContext';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import Earnings from './pages/Earnings';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdSenseManager from './components/ads/AdSenseManager';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <RevenueProvider>
            <UserProvider>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <AdSenseManager />
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/tasks"
                      element={
                        <ProtectedRoute>
                          <Tasks />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/tasks/:id"
                      element={
                        <ProtectedRoute>
                          <TaskDetail />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/earnings"
                      element={
                        <ProtectedRoute>
                          <Earnings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute adminOnly>
                          <Admin />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
              </div>
            </UserProvider>
          </RevenueProvider>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;