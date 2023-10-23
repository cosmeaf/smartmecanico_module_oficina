#!/bin/bash

set -e

# Variáveis
PROJECT_DIR="/home/superuser/projects/smartmecanico_module_oficina"
BACKUP_NAME="smartmecanico_module_oficina.$(date +%Y%m%d_%H%M%S).bkp"
GIT_REPO="git@github.com:cosmeaf/smartmecanico_module_oficina.git"

# Função para executar comandos como superuser
execute_as_superuser() {
    sudo su - superuser -c "$1"
}

# Verificando se o serviço está parado
sudo systemctl status smartmecanico-serve.service | grep -q "Active: active (running)"
if [ $? -eq 0 ]; then
    echo "Parando Aplicaçao..."
    sudo systemctl status smartmecanico-serve.service
else
    echo "Error: Falha em parar serviço smartmecanico-serve.service "
    exit 1
fi

# Removendo backups antigos
BACKUPS=$(execute_as_superuser 'find /home/superuser/projects -name "smartmecanico_module_oficina.*.bkp" | sort -r | tail -n 2')

for BACKUP in $BACKUPS; do
    execute_as_superuser "rm -rf $BACKUP"
done

# Fazendo backup do diretório do projeto
execute_as_superuser "cp -rp $PROJECT_DIR /home/superuser/projects/$BACKUP_NAME"
if [ $? -eq 0 ]; then
    echo "Backup Realizado com Sucesso"
else
    echo "Error: Falha em realizar Backup de projeto $PROJECT_DIR"
fi

# Removendo Projeto
execute_as_superuser "rm -rf $PROJECT_DIR"
if [ $? -eq 0 ]; then
    echo "Success: Projeto excluido com sucesso" 
else
   echo "Error: Error ao excluir $PROJECT_DIR"
   exit 1
fi

# Clonando o projeto mais recente
execute_as_superuser "cd /home/superuser/projects/ &&  git clone git@github.com:cosmeaf/smartmecanico_module_oficina.git"

# Verificando se o diretório do projeto foi clonado
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Erro: Falha ao clonar $PROJECT_DIR!"
    exit 1
fi

# Instalando dependências e fazendo build do projeto
execute_as_superuser "cd $PROJECT_DIR && sudo npm install"

execute_as_superuser "cd $PROJECT_DIR && sudo npm run build -p"

# Iniciando o serviço
sudo systemctl start smartmecanico-serve.service

# Aguarde um momento antes de tentar reiniciar
sleep 5
sudo systemctl restart smartmecanico-serve.service

echo "Deploy concluído com sucesso!"