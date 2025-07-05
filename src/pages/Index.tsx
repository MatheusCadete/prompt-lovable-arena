
import React, { useState } from 'react';
import { GameProvider, useGame } from '../contexts/GameContext';
import Login from '../components/Login';
import Navigation from '../components/Navigation';
import ParticipantDashboard from '../components/ParticipantDashboard';
import MasterDashboard from '../components/MasterDashboard';
import TasksView from '../components/TasksView';
import RewardsView from '../components/RewardsView';
import RankingView from '../components/RankingView';
import ManageUsersView from '../components/ManageUsersView';

const AppContent = () => {
  const { currentUser } = useGame();
  const [currentView, setCurrentView] = useState('dashboard');

  if (!currentUser) {
    return <Login />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return currentUser.type === 'master' 
          ? <MasterDashboard setCurrentView={setCurrentView} />
          : <ParticipantDashboard setCurrentView={setCurrentView} />;
      case 'tasks':
        return <TasksView />;
      case 'rewards':
        return <RewardsView />;
      case 'ranking':
        return <RankingView />;
      case 'manage-users':
        return currentUser.type === 'master' ? <ManageUsersView /> : <ParticipantDashboard setCurrentView={setCurrentView} />;
      default:
        return currentUser.type === 'master' 
          ? <MasterDashboard setCurrentView={setCurrentView} />
          : <ParticipantDashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mx-auto px-6 py-8">
        {renderView()}
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default Index;
