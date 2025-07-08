
import { User, Task, Reward } from '../types';

export const initialUsers: User[] = [
  { id: '1', name: 'Admin Master', email: 'admin@game.com', points: 0, type: 'master' },
  { id: '2', name: 'João Silva', email: 'joao@game.com', points: 150, type: 'participant' },
  { id: '3', name: 'Maria Santos', email: 'maria@game.com', points: 200, type: 'participant' },
  { id: '4', name: 'Pedro Costa', email: 'pedro@game.com', points: 75, type: 'participant' },
];

export const initialTasks: Task[] = [
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

export const initialRewards: Reward[] = [
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
