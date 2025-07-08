
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbxIfEq5RLNO7VR2OGv3T-8TJoZOJmjEQMWNBGCUo0xvd5L1ii9YeoS1w8jR60aFrTUf/exec";

export interface SheetUser {
  id: string;
  name: string;
  email: string;
  points: number;
  type: string;
}

export interface SheetTask {
  id: string;
  title: string;
  description: string;
  points: number;
  status: string;
  completedBy: string;
}

export interface SheetReward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  available: boolean;
}

export const sheetsService = {
  // Buscar usuários da planilha
  async getUsers(): Promise<SheetUser[]> {
    try {
      const response = await fetch(`${SHEET_API_URL}?action=getUsers`);
      const data = await response.json();
      return data.users || [];
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  },

  // Adicionar ou atualizar usuário na planilha
  async saveUser(user: SheetUser): Promise<boolean> {
    try {
      const response = await fetch(SHEET_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'saveUser',
          user: user
        })
      });
      const result = await response.json();
      return result.success || false;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      return false;
    }
  },

  // Buscar tarefas da planilha
  async getTasks(): Promise<SheetTask[]> {
    try {
      const response = await fetch(`${SHEET_API_URL}?action=getTasks`);
      const data = await response.json();
      return data.tasks || [];
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      return [];
    }
  },

  // Salvar tarefa na planilha
  async saveTask(task: SheetTask): Promise<boolean> {
    try {
      const response = await fetch(SHEET_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'saveTask',
          task: task
        })
      });
      const result = await response.json();
      return result.success || false;
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      return false;
    }
  },

  // Buscar recompensas da planilha
  async getRewards(): Promise<SheetReward[]> {
    try {
      const response = await fetch(`${SHEET_API_URL}?action=getRewards`);
      const data = await response.json();
      return data.rewards || [];
    } catch (error) {
      console.error('Erro ao buscar recompensas:', error);
      return [];
    }
  },

  // Salvar recompensa na planilha
  async saveReward(reward: SheetReward): Promise<boolean> {
    try {
      const response = await fetch(SHEET_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'saveReward',
          reward: reward
        })
      });
      const result = await response.json();
      return result.success || false;
    } catch (error) {
      console.error('Erro ao salvar recompensa:', error);
      return false;
    }
  },

  // Sincronizar todos os dados
  async syncData(): Promise<{ users: SheetUser[], tasks: SheetTask[], rewards: SheetReward[] }> {
    try {
      const [users, tasks, rewards] = await Promise.all([
        this.getUsers(),
        this.getTasks(),
        this.getRewards()
      ]);
      
      return { users, tasks, rewards };
    } catch (error) {
      console.error('Erro ao sincronizar dados:', error);
      return { users: [], tasks: [], rewards: [] };
    }
  }
};
