
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useGame } from '../contexts/GameContext';
import { useToast } from '@/hooks/use-toast';

const RewardsView = () => {
  const { currentUser, rewards, redeemedRewards, redeemReward } = useGame();
  const { toast } = useToast();

  if (!currentUser) return null;

  const handleRedeemReward = (rewardId: string) => {
    const success = redeemReward(rewardId);
    const reward = rewards.find(r => r.id === rewardId);
    
    if (success) {
      toast({
        title: "Recompensa resgatada! 🎉",
        description: `Você resgatou: ${reward?.name}`,
      });
    } else {
      toast({
        title: "Não foi possível resgatar",
        description: "Você não tem pontos suficientes para esta recompensa.",
        variant: "destructive",
      });
    }
  };

  const userRedeemedRewards = redeemedRewards.filter(reward => reward.userId === currentUser.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Recompensas 🎁</h1>
            <p className="text-purple-100">Use seus pontos para resgatar recompensas incríveis!</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{currentUser.points}</div>
            <div className="text-purple-100">pontos disponíveis</div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🛒</span>
          Recompensas Disponíveis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.filter(reward => reward.available).map((reward) => {
            const canAfford = currentUser.points >= reward.pointsRequired;
            
            return (
              <Card key={reward.id} className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                canAfford ? 'hover:scale-105' : 'opacity-75'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">🎁</span>
                    {reward.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {reward.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="secondary"
                      className={`${canAfford ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {reward.pointsRequired} pontos
                    </Badge>
                    {canAfford && (
                      <Badge className="bg-green-500 text-white">
                        Disponível
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => handleRedeemReward(reward.id)}
                    disabled={!canAfford}
                    className={`w-full ${
                      canAfford 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Resgatar Recompensa' : 'Pontos Insuficientes'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {rewards.filter(reward => reward.available).length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2">Nenhuma recompensa disponível</h3>
              <p className="text-gray-600">Aguarde novas recompensas serem criadas!</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      {/* Redeemed Rewards */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>✨</span>
          Suas Recompensas Resgatadas
        </h2>
        
        {userRedeemedRewards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRedeemedRewards.map((redeemedReward) => (
              <Card key={redeemedReward.id} className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    {redeemedReward.rewardName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-700">
                      {redeemedReward.pointsSpent} pontos gastos
                    </Badge>
                    <span className="text-sm text-green-600">
                      {new Date(redeemedReward.redeemedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-8">
              <div className="text-4xl mb-2">🌟</div>
              <h3 className="text-lg font-semibold mb-1">Nenhuma recompensa resgatada ainda</h3>
              <p className="text-gray-600">Complete mais tarefas para ganhar pontos e resgatar recompensas!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RewardsView;
