
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGame } from '../contexts/GameContext';
import { useToast } from '@/hooks/use-toast';

const ManageUsersView = () => {
  const { users, addUser, removeUser } = useGame();
  const { toast } = useToast();
  
  const [userForm, setUserForm] = useState({ name: '', email: '', type: 'participant' as 'master' | 'participant' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const participants = users.filter(user => user.type === 'participant');
  const masters = users.filter(user => user.type === 'master');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(userForm);
    setUserForm({ name: '', email: '', type: 'participant' });
    setDialogOpen(false);
    toast({
      title: "Usuário adicionado com sucesso!",
      description: `${userForm.name} foi adicionado como ${userForm.type === 'master' ? 'Master' : 'Participante'}.`,
    });
  };

  const handleRemoveUser = (userId: string, userName: string) => {
    removeUser(userId);
    toast({
      title: "Usuário removido",
      description: `${userName} foi removido do sistema.`,
    });
  };

  const getUserLevel = (points: number) => Math.floor(points / 100) + 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-8 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gerenciar Usuários 👥</h1>
            <p className="text-green-100">Adicione, remova e gerencie usuários da plataforma</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{users.length}</div>
            <div className="text-green-100">usuários totais</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <span className="text-2xl">👑</span>
              Masters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800">{masters.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-700 flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Participantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800">{participants.length}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-700 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              Pontos Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800">
              {participants.reduce((sum, user) => sum + user.points, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add User Button */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
            <span className="mr-2">➕</span>
            Adicionar Novo Usuário
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo usuário
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <Label htmlFor="user-name">Nome</Label>
              <Input
                id="user-name"
                placeholder="Nome completo"
                value={userForm.name}
                onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="user-email">Email</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="email@exemplo.com"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="user-type">Tipo de Usuário</Label>
              <Select value={userForm.type} onValueChange={(value: 'master' | 'participant') => setUserForm({...userForm, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="participant">Participante</SelectItem>
                  <SelectItem value="master">Master</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Adicionar Usuário</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Masters List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">👑</span>
            Usuários Master
          </CardTitle>
          <CardDescription>Administradores da plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {masters.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-bold">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-100 text-purple-700">Master</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveUser(user.id, user.name)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remover
                  </Button>
                </div>
              </div>
            ))}
            {masters.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                Nenhum usuário master encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">👥</span>
            Participantes
          </CardTitle>
          <CardDescription>Usuários participantes da gamificação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {participants
              .sort((a, b) => b.points - a.points)
              .map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <div className="font-bold text-blue-600">{user.points} pontos</div>
                      <div className="text-sm text-gray-600">Nível {getUserLevel(user.points)}</div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Participante
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveUser(user.id, user.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            {participants.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                Nenhum participante encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsersView;
