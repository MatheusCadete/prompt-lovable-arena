
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '../contexts/GameContext';
import { Loader2, Upload, Download, Database } from 'lucide-react';

const SyncManager = () => {
  const { isSync, syncToSheets, loadFromSheets, currentUser } = useGame();

  if (!currentUser || currentUser.type !== 'master') {
    return null;
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Sincronização Google Sheets
        </CardTitle>
        <CardDescription>
          Sincronize os dados da plataforma com sua planilha do Google Sheets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="flex items-center gap-1">
            {isSync ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Sincronizando...
              </>
            ) : (
              <>
                <Database className="h-3 w-3" />
                Pronto
              </>
            )}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={syncToSheets}
            disabled={isSync}
            className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            <div className="flex flex-col items-center gap-1">
              {isSync ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Upload className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">Enviar para Sheets</span>
            </div>
          </Button>

          <Button 
            onClick={loadFromSheets}
            disabled={isSync}
            variant="outline"
            className="h-16 border-blue-200 hover:bg-blue-50"
          >
            <div className="flex flex-col items-center gap-1">
              {isSync ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Download className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">Carregar do Sheets</span>
            </div>
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Como usar:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li><strong>Enviar para Sheets:</strong> Salva os dados atuais na planilha</li>
            <li><strong>Carregar do Sheets:</strong> Importa dados da planilha para o sistema</li>
            <li><strong>URL da API:</strong> Conectado ao Google Apps Script</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncManager;
