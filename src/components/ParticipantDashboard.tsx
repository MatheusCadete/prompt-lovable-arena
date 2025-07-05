
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGame } from '../contexts/GameContext';

interface ParticipantDashboardProps {
  setCurrentView: (view: string) => void;
}

const ParticipantDashboard: React.FC<ParticipantDashboardProps> = ({ setCurrentView }) => {
  const { currentUser, tasks, redeemedRewards } = useGame();

  if (!currentUser) return null;

  const completedTasks = tasks.filter(task => task.completedBy?.includes(currentUser.id));
  const userLevel = Math.floor(currentUser.points / 100) + 1;
  const progressToNextLevel = (currentUser.points % 100);
  const userRewards = redeemedRewards.filter(reward => reward.userId === currentUser.id);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Olá, {currentUser.name}! 👋</h1>
            <p className="text-blue-100">Continue conquistando pontos e desbloqueando recompensas!</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{currentUser.points}</div>
            <div className="text-blue-100">pontos</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-700 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Nível Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 mb-2">Nível {userLevel}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-green-600">
                <span>Progresso para o próximo nível</span>
                <span>{progressToNextLevel}/100</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              Tarefas Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">{completedTasks.length}</div>
            <p className="text-blue-600 text-sm">de {tasks.length} tarefas disponíveis</p>
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
            <div className="text-3xl font-bold text-purple-800">{userRewards.length}</div>
            <p className="text-purple-600 text-sm">recompensas resgatadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={() => setCurrentView('tasks')}
          className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
        >
          <div className="text-center">
            <div className="text-2xl mb-1">📋</div>
            <div className="font-semibold">Ver Tarefas</div>
          </div>
        </Button>

        <Button 
          onClick={() => setCurrentView('rewards')}
          className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
        >
          <div className="text-center">
            <div className="text-2xl mb-1">🎁</div>
            <div className="font-semibold">Recompensas</div>
          </div>
        </Button>

        <Button 
          onClick={() => setCurrentView('ranking')}
          className="h-20 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <div className="text-center">
            <div className="text-2xl mb-1">🏅</div>
            <div className="font-semibold">Ranking</div>
          </div>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedTasks.slice(-3).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-green-800">{task.title}</div>
                  <div className="text-sm text-green-600">Tarefa concluída</div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  +{task.points} pontos
                </Badge>
              </div>
            ))}
            {completedTasks.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">🚀</div>
                <p>Complete sua primeira tarefa para ver sua atividade aqui!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantDashboard;
