
import { useState } from 'react';
import { User, Task, Reward, RedeemedReward } from '../types';

export const useGameActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  rewards: Reward[],
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>,
  redeemedRewards: RedeemedReward[],
  setRedeemedRewards: React.Dispatch<React.SetStateAction<RedeemedReward[]>>,
  currentUser: User | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
) => {
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

  return {
    completeTask,
    redeemReward
  };
};
