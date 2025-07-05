
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGame } from '../contexts/GameContext';
import { useToast } from '@/hooks/use-toast';

interface MasterDashboardProps {
  setCurrentView: (view: string) => void;
}

const MasterDashboard: React.FC<MasterDashboardProps> = ({ setCurrentView }) => {
  const { users, tasks, rewards, createTask, createReward } = useGame();
  const { toast } = useToast();
  
  const [taskForm, setTaskForm] = useState({ title: '', description: '', points: 0 });
  const [rewardForm, setRewardForm] = useState({ name: '', description: '', pointsRequired: 0 });
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);

  const participants = users.filter(user => user.type === 'participant');
  const totalPoints = participants.reduce((sum, user) => sum + user.points, 0);
  const completedTasksCount = tasks.reduce((sum, task) => sum + (task.completedBy?.length || 0), 0);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTask(taskForm);
    setTaskForm({ title: '', description: '', points: 0 });
    setTaskDialogOpen(false);
    toast({
      title: "Tarefa criada com sucesso!",
      description: `A tarefa "${taskForm.title}" foi adicionada.`,
    });
  };

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    createReward({ ...rewardForm, available: true });
    setRewardForm({ name: '', description: '', pointsRequired: 0 });
    setRewardDialogOpen(false);
    toast({
      title: "Recompensa criada com sucesso!",
      description: `A recompensa "${rewardForm.name}" foi adicionada.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Master 👑</h1>
            <p className="text-purple-100">Gerencie tarefas, recompensas e acompanhe o progresso da equipe</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{participants.length}</div>
            <div className="text-purple-100">participantes</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-700 flex items-center gap-2 text-sm">
              <span className="text-xl">👥</span>
              Total de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{participants.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-700 flex items-center gap-2 text-sm">
              <span className="text-xl">📋</span>
              Tarefas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{tasks.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-700 flex items-center gap-2 text-sm">
              <span className="text-xl">🎁</span>
              Recompensas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">{rewards.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-700 flex items-center gap-2 text-sm">
              <span className="text-xl">⭐</span>
              Total de Pontos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{totalPoints}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              <div className="text-center">
                <div className="text-xl mb-1">➕</div>
                <div className="font-semibold">Criar Tarefa</div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Tarefa</DialogTitle>
              <DialogDescription>
                Adicione uma nova tarefa para os participantes
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <Label htmlFor="task-title">Título</Label>
                <Input
                  id="task-title"
                  placeholder="Nome da tarefa"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="task-description">Descrição</Label>
                <Textarea
                  id="task-description"
                  placeholder="Descreva a tarefa..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="task-points">Pontos</Label>
                <Input
                  id="task-points"
                  type="number"
                  placeholder="Pontos da tarefa"
                  value={taskForm.points || ''}
                  onChange={(e) => setTaskForm({...taskForm, points: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Criar Tarefa</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={rewardDialogOpen} onOpenChange={setRewardDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
              <div className="text-center">
                <div className="text-xl mb-1">🎁</div>
                <div className="font-semibold">Criar Recompensa</div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Recompensa</DialogTitle>
              <DialogDescription>
                Adicione uma nova recompensa para os participantes
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateReward} className="space-y-4">
              <div>
                <Label htmlFor="reward-name">Nome</Label>
                <Input
                  id="reward-name"
                  placeholder="Nome da recompensa"
                  value={rewardForm.name}
                  onChange={(e) => setRewardForm({...rewardForm, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reward-description">Descrição</Label>
                <Textarea
                  id="reward-description"
                  placeholder="Descreva a recompensa..."
                  value={rewardForm.description}
                  onChange={(e) => setRewardForm({...rewardForm, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reward-points">Pontos Necessários</Label>
                <Input
                  id="reward-points"
                  type="number"
                  placeholder="Pontos necessários"
                  value={rewardForm.pointsRequired || ''}
                  onChange={(e) => setRewardForm({...rewardForm, pointsRequired: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Criar Recompensa</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Button 
          onClick={() => setCurrentView('manage-users')}
          className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
        >
          <div className="text-center">
            <div className="text-xl mb-1">👥</div>
            <div className="font-semibold">Gerenciar Usuários</div>
          </div>
        </Button>

        <Button 
          onClick={() => setCurrentView('ranking')}
          className="h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <div className="text-center">
            <div className="text-xl mb-1">🏅</div>
            <div className="font-semibold">Ver Ranking</div>
          </div>
        </Button>
      </div>

      {/* Top Performers */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            Top Performers
          </CardTitle>
          <CardDescription>Participantes com maior pontuação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {participants
              .sort((a, b) => b.points - a.points)
              .slice(0, 5)
              .map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {user.points} pontos
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MasterDashboard;
