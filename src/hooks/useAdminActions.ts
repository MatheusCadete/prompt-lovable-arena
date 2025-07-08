
import { Task, Reward, User } from '../types';

export const useAdminActions = (
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  rewards: Reward[],
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  const createTask = (task: Omit<Task, 'id' | 'status' | 'completedBy'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      status: 'pending',
      completedBy: []
    };
    setTasks(prev => [...prev, newTask]);
  };

  const createReward = (reward: Omit<Reward, 'id'>) => {
    const newReward: Reward = {
      ...reward,
      id: Date.now().toString()
    };
    setRewards(prev => [...prev, newReward]);
  };

  const editTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  };

  const editReward = (rewardId: string, updates: Partial<Reward>) => {
    setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, ...updates } : r));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const deleteReward = (rewardId: string) => {
    setRewards(prev => prev.filter(r => r.id !== rewardId));
  };

  const addUser = (user: Omit<User, 'id' | 'points'>) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      points: 0
    };
    setUsers(prev => [...prev, newUser]);
  };

  const removeUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  return {
    createTask,
    createReward,
    editTask,
    editReward,
    deleteTask,
    deleteReward,
    addUser,
    removeUser
  };
};
