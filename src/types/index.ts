
export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  type: 'master' | 'participant';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  status: 'pending' | 'completed';
  completedBy?: string[];
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  available: boolean;
}

export interface RedeemedReward {
  id: string;
  userId: string;
  rewardId: string;
  rewardName: string;
  pointsSpent: number;
  redeemedAt: Date;
}
