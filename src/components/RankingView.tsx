
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGame } from '../contexts/GameContext';

const RankingView = () => {
  const { users, currentUser } = useGame();

  const participants = users
    .filter(user => user.type === 'participant')
    .sort((a, b) => b.points - a.points);

  const maxPoints = participants.length > 0 ? participants[0].points : 0;

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getUserLevel = (points: number) => Math.floor(points / 100) + 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">Ranking da Equipe 🏆</h1>
        <p className="text-orange-100">Veja como você está se saindo em comparação com outros participantes!</p>
      </div>

      {/* Current User Stats */}
      {currentUser && currentUser.type === 'participant' && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Sua Posição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(participants.findIndex(u => u.id === currentUser.id) + 1)} flex items-center justify-center text-white font-bold text-xl`}>
                  {participants.findIndex(u => u.id === currentUser.id) + 1}
                </div>
                <div>
                  <div className="font-semibold text-lg">{currentUser.name}</div>
                  <div className="text-gray-600">Nível {getUserLevel(currentUser.points)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{currentUser.points}</div>
                <div className="text-gray-600">pontos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ranking List */}
      <div className="space-y-4">
        {participants.map((user, index) => {
          const position = index + 1;
          const isCurrentUser = currentUser?.id === user.id;
          const progressPercentage = maxPoints > 0 ? (user.points / maxPoints) * 100 : 0;

          return (
            <Card 
              key={user.id} 
              className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getRankColor(position)} flex items-center justify-center text-white shadow-lg`}>
                    <div className="text-center">
                      <div className="text-2xl">{getRankIcon(position)}</div>
                      <div className="text-xs font-bold">#{position}</div>
                    </div>
                  </div>

                  {/* User Avatar */}
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold text-lg ${isCurrentUser ? 'text-blue-800' : 'text-gray-800'}`}>
                        {user.name}
                      </h3>
                      {isCurrentUser && (
                        <Badge className="bg-blue-500 text-white text-xs">Você</Badge>
                      )}
                    </div>
                    <div className="text-gray-600 text-sm mb-2">{user.email}</div>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <Progress value={progressPercentage} className="flex-1 h-2" />
                      <span className="text-sm text-gray-500 min-w-[60px]">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                  </div>

                  {/* Points and Level */}
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${isCurrentUser ? 'text-blue-600' : 'text-gray-800'}`}>
                      {user.points}
                    </div>
                    <div className="text-gray-600 text-sm">pontos</div>
                    <Badge 
                      variant="secondary" 
                      className={`mt-1 ${isCurrentUser ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Nível {getUserLevel(user.points)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {participants.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Nenhum participante encontrado</h3>
            <p className="text-gray-600">Aguarde participantes serem adicionados ao sistema!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RankingView;
