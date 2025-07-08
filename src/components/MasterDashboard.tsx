
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '../contexts/GameContext';
import SyncManager from './SyncManager';

interface MasterDashboardProps {
  setCurrentView: (view: string) => void;
}

const MasterDashboard: React.FC<MasterDashboardProps> = ({ setCurrentView }) => {
  const { currentUser, users, tasks, rewards } = useGame();

  if (!currentUser || currentUser.type !== 'master') return null;

  const participantUsers = users.filter(user => user.type === 'participant');
  const completedTasks = tasks.filter(task => task.completedBy && task.completedBy.length > 0);
  const availableRewards = rewards.filter(reward => reward.available);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">Painel do Administrador 👨‍💼</h1>
        <p className="text-purple-100">Gerencie usuários, tarefas e recompensas da plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <span className="text-2xl">👥</span>
              Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">{participantUsers.length}</div>
            <p className="text-blue-600 text-sm">participantes ativos</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-700 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800">{tasks.length}</div>
            <p className="text-green-600 text-sm">tarefas criadas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-700 flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              Recompensas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800">{availableRewards.length}</div>
            <p className="text-purple-600 text-sm">recompensas disponíveis</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-700 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              Conclusões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800">{completedTasks.length}</div>
            <p className="text-orange-600 text-sm">tarefas concluídas</p>
          </CardContent>
        </Card>
      </div>

      {/* Sync Manager */}
      <SyncManager />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={() => setCurrentView('manage-users')}
          className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
        >
          <div className="text-center">
            <div className="text-2xl mb-1">👥</div>
            <div className="font-semibold">Gerenciar Usuários</div>
          </div>
        </Button>

        <Button 
          onClick={() => setCurrentView('tasks')}
          className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
        >
          <div className="text-center">
            <div className="text-2xl mb-1">📋</div>
            <div className="font-semibold">Gerenciar Tarefas</div>
          </div>
        </Button>

        <Button 
          onClick={() => setCurrentView('rewards')}
          className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
        >
          <div className="text-center">
            <div className="text-2xl mb-1">🎁</div>
            <div className="font-semibold">Gerenciar Recompensas</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default MasterDashboard;
