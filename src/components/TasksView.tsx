
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '../contexts/GameContext';
import { useToast } from '@/hooks/use-toast';

const TasksView = () => {
  const { currentUser, tasks, completeTask } = useGame();
  const { toast } = useToast();

  if (!currentUser) return null;

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
    const task = tasks.find(t => t.id === taskId);
    toast({
      title: "Tarefa concluída! 🎉",
      description: `Você ganhou ${task?.points} pontos!`,
    });
  };

  const isTaskCompleted = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    return task?.completedBy?.includes(currentUser.id) || false;
  };

  const completedTasks = tasks.filter(task => task.completedBy?.includes(currentUser.id));
  const completionPercentage = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">Suas Tarefas 📋</h1>
        <p className="text-blue-100 mb-4">Complete tarefas para ganhar pontos e desbloquear recompensas!</p>
        
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Progresso Geral</span>
            <span className="text-sm">{completedTasks.length}/{tasks.length} tarefas</span>
          </div>
          <Progress value={completionPercentage} className="h-2 bg-white/20" />
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => {
          const isCompleted = isTaskCompleted(task.id);
          return (
            <Card key={task.id} className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
              isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-white hover:scale-105'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className={`text-lg ${isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                    {task.title}
                  </CardTitle>
                  {isCompleted && (
                    <div className="text-2xl">✅</div>
                  )}
                </div>
                <CardDescription className={isCompleted ? 'text-green-600' : 'text-gray-600'}>
                  {task.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    variant={isCompleted ? "default" : "secondary"}
                    className={isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                  >
                    {task.points} pontos
                  </Badge>
                  <Badge 
                    variant={isCompleted ? "default" : "outline"}
                    className={isCompleted ? 'bg-green-500 text-white' : ''}
                  >
                    {isCompleted ? 'Concluída' : 'Pendente'}
                  </Badge>
                </div>
                
                {!isCompleted ? (
                  <Button 
                    onClick={() => handleCompleteTask(task.id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    Marcar como Concluída
                  </Button>
                ) : (
                  <div className="w-full p-3 bg-green-100 text-green-700 rounded-md text-center font-medium">
                    ✨ Tarefa Concluída! ✨
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {tasks.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Nenhuma tarefa disponível</h3>
            <p className="text-gray-600">Aguarde novas tarefas serem criadas pela equipe!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TasksView;
