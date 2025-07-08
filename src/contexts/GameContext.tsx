
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Task, Reward, RedeemedReward } from '../types';
import { useSheetSync } from '../hooks/useSheetSync';
import { useAuth } from '../hooks/useAuth';
import { useGameActions } from '../hooks/useGameActions';
import { useAdminActions } from '../hooks/useAdminActions';
import { initialUsers, initialTasks, initialRewards } from '../data/initialData';

interface GameContextType {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  rewards: Reward[];
  redeemedRewards: RedeemedReward[];
  isSync: boolean;
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
  syncToSheets: () => Promise<void>;
  loadFromSheets: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);

  const { isSync, syncToSheets: syncToSheetsHook, loadFromSheets: loadFromSheetsHook } = useSheetSync();
  const { currentUser, setCurrentUser, login, logout } = useAuth(users);
  const { completeTask, redeemReward } = useGameActions(
    users, setUsers, tasks, setTasks, rewards, setRewards, 
    redeemedRewards, setRedeemedRewards, currentUser, setCurrentUser
  );
  const { createTask, createReward, editTask, editReward, deleteTask, deleteReward, addUser, removeUser } = useAdminActions(
    tasks, setTasks, rewards, setRewards, users, setUsers
  );

  const syncToSheets = async () => {
    await syncToSheetsHook(users, tasks, rewards);
  };

  const loadFromSheets = async () => {
    const data = await loadFromSheetsHook();
    if (data) {
      setUsers(data.users);
      setTasks(data.tasks);
      setRewards(data.rewards);
      
      // Atualizar usuário atual se ele estiver logado
      if (currentUser) {
        const updatedCurrentUser = data.users.find(u => u.id === currentUser.id);
        if (updatedCurrentUser) {
          setCurrentUser(updatedCurrentUser);
        }
      }
    }
  };

  return (
    <GameContext.Provider value={{
      currentUser,
      users,
      tasks,
      rewards,
      redeemedRewards,
      isSync,
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
      removeUser,
      syncToSheets,
      loadFromSheets
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
