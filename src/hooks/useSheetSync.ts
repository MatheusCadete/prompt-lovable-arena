
import { useState, useCallback } from 'react';
import { sheetsService } from '../services/sheetsService';
import { User, Task, Reward } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useSheetSync = () => {
  const [isSync, setIsSync] = useState(false);
  const { toast } = useToast();

  const syncToSheets = useCallback(async (users: User[], tasks: Task[], rewards: Reward[]) => {
    setIsSync(true);
    
    try {
      // Converter dados para formato da planilha
      const sheetUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points,
        type: user.type
      }));

      const sheetTasks = tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        points: task.points,
        status: task.status,
        completedBy: task.completedBy?.join(',') || ''
      }));

      const sheetRewards = rewards.map(reward => ({
        id: reward.id,
        name: reward.name,
        description: reward.description,
        pointsRequired: reward.pointsRequired,
        available: reward.available
      }));

      // Sincronizar todos os dados
      const promises = [
        ...sheetUsers.map(user => sheetsService.saveUser(user)),
        ...sheetTasks.map(task => sheetsService.saveTask(task)),
        ...sheetRewards.map(reward => sheetsService.saveReward(reward))
      ];

      await Promise.all(promises);

      toast({
        title: "Sincronização concluída! ✅",
        description: "Dados salvos na planilha do Google Sheets com sucesso.",
      });

      return true;
    } catch (error) {
      console.error('Erro na sincronização:', error);
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar com o Google Sheets.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSync(false);
    }
  }, [toast]);

  const loadFromSheets = useCallback(async () => {
    setIsSync(true);
    
    try {
      const data = await sheetsService.syncData();
      
      // Converter dados da planilha para formato local
      const users: User[] = data.users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points,
        type: user.type as 'master' | 'participant'
      }));

      const tasks: Task[] = data.tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        points: task.points,
        status: task.status as 'pending' | 'completed',
        completedBy: task.completedBy ? task.completedBy.split(',').filter(id => id.trim()) : []
      }));

      const rewards: Reward[] = data.rewards.map(reward => ({
        id: reward.id,
        name: reward.name,
        description: reward.description,
        pointsRequired: reward.pointsRequired,
        available: reward.available
      }));

      toast({
        title: "Dados carregados! 📊",
        description: "Informações sincronizadas do Google Sheets com sucesso.",
      });

      return { users, tasks, rewards };
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar dados do Google Sheets.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSync(false);
    }
  }, [toast]);

  return {
    isSync,
    syncToSheets,
    loadFromSheets
  };
};
