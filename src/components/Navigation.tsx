
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGame } from '../contexts/GameContext';

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setCurrentView }) => {
  const { currentUser, logout } = useGame();

  if (!currentUser) return null;

  const getUserLevel = (points: number) => Math.floor(points / 100) + 1;

  const navigationItems = currentUser.type === 'master' 
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'tasks', label: 'Tarefas', icon: '📋' },
        { id: 'rewards', label: 'Recompensas', icon: '🎁' },
        { id: 'ranking', label: 'Ranking', icon: '🏅' },
        { id: 'manage-users', label: 'Usuários', icon: '👥' },
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'tasks', label: 'Tarefas', icon: '📋' },
        { id: 'rewards', label: 'Recompensas', icon: '🎁' },
        { id: 'ranking', label: 'Ranking', icon: '🏅' },
      ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎮</span>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GameHub
              </h1>
              <p className="text-xs text-gray-500">Plataforma de Gamificação</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-2 ${
                  currentView === item.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* User Info and Actions */}
        <div className="flex items-center gap-4">
          {/* Points Display for Participants */}
          {currentUser.type === 'participant' && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <div>
                  <div className="font-bold text-blue-600">{currentUser.points}</div>
                  <div className="text-xs text-gray-600">pontos</div>
                </div>
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold">
                {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <div className="font-medium text-gray-800">{currentUser.name}</div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={currentUser.type === 'master' ? 'default' : 'secondary'}
                  className={currentUser.type === 'master' ? 'bg-purple-500' : 'bg-blue-100 text-blue-700'}
                >
                  {currentUser.type === 'master' ? '👑 Master' : `🏆 Nível ${getUserLevel(currentUser.points)}`}
                </Badge>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="outline"
            onClick={logout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            Sair
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              onClick={() => setCurrentView(item.id)}
              size="sm"
              className={`flex items-center gap-2 whitespace-nowrap ${
                currentView === item.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
