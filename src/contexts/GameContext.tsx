
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Task, Reward, RedeemedReward } from '../types';

interface GameContextType {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  rewards: Reward[];
  redeemedRewards: RedeemedReward[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  completeTask: (taskId: string) => void;
  redeemReward: (rewardId: string) => boolean;
  createTask: (task: Omit<Task, 'id' | 'status' | 'completedBy'>) => void;
  createReward: (reward: Omit<Reward, 'id'>) => void;
  editTask: (taskId: string, updates: Partial<Task>) => void;
  editReward: (rewardId: string, updates: Partial<Reward>) => void;
  deleteTask: (taskId: string) => void;
  deleteReward: (rewardId: string) => void;
  addUser: (user: Omit<User, 'id' | 'points'>) => void;
  removeUser: (userId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialUsers: User[] = [
  { id: '1', name: 'Admin Master', email: 'admin@game.com', points: 0, type: 'master' },
  { id: '2', name: 'João Silva', email: 'joao@game.com', points: 150, type: 'participant' },
  { id: '3', name: 'Maria Santos', email: 'maria@game.com', points: 200, type: 'participant' },
  { id: '4', name: 'Pedro Costa', email: 'pedro@game.com', points: 75, type: 'participant' },
];

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Completar Treinamento de Segurança',
    description: 'Assistir ao vídeo completo sobre procedimentos de segurança no trabalho',
    points: 50,
    status: 'pending',
    completedBy: []
  },
  {
    id: '2',
    title: 'Participar da Reunião Semanal',
    description: 'Comparecer e participar ativamente da reunião semanal da equipe',
    points: 30,
    status: 'pending',
    completedBy: []
  },
  {
    id: '3',
    title: 'Enviar Relatório Mensal',
    description: 'Preparar e enviar o relatório mensal de atividades',
    points: 40,
    status: 'pending',
    completedBy: []
  }
];

const initialRewards: Reward[] = [
  {
    id: '1',
    name: 'Vale Presente R$ 50',
    description: 'Vale presente para usar em lojas parceiras',
    pointsRequired: 100,
    available: true
  },
  {
    id: '2',
    name: 'Dia de Folga Extra',
    description: 'Um dia adicional de folga remunerada',
    pointsRequired: 200,
    available: true
  },
  {
    id: '3',
    name: 'Certificado de Excelência',
    description: 'Certificado digital de reconhecimento por excelência',
    pointsRequired: 150,
    available: true
  }
];

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user && password === '123456') { // Simple auth for demo
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const completeTask = (taskId: string) => {
    if (!currentUser) return;
    
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completedBy?.includes(currentUser.id)) return;

    // Update task
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, completedBy: [...(t.completedBy || []), currentUser.id] }
        : t
    ));

    // Update user points
    setUsers(prev => prev.map(u => 
      u.id === currentUser.id 
        ? { ...u, points: u.points + task.points }
        : u
    ));

    // Update current user
    setCurrentUser(prev => prev ? { ...prev, points: prev.points + task.points } : null);
  };

  const redeemReward = (rewardId: string): boolean => {
    if (!currentUser) return false;
    
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || !reward.available || currentUser.points < reward.pointsRequired) return false;

    // Update user points
    setUsers(prev => prev.map(u => 
      u.id === currentUser.id 
        ? { ...u, points: u.points - reward.pointsRequired }
        : u
    ));

    // Update current user
    setCurrentUser(prev => prev ? { ...prev, points: prev.points - reward.pointsRequired } : null);

    // Add redeemed reward
    const redeemedReward: RedeemedReward = {
      id: Date.now().toString(),
      userId: currentUser.id,
      rewardId: reward.id,
      rewardName: reward.name,
      pointsSpent: reward.pointsRequired,
      redeemedAt: new Date()
    };
    setRedeemedRewards(prev => [...prev, redeemedReward]);

    return true;
  };

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

  return (
    <GameContext.Provider value={{
      currentUser,
      users,
      tasks,
      rewards,
      redeemedRewards,
      login,
      logout,
      completeTask,
      redeemReward,
      createTask,
      createReward,
      editTask,
      editReward,
      deleteTask,
      deleteReward,
      addUser,
      removeUser
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
