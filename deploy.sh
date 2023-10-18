#!/bin/bash

# Endereço do servidor remoto
REMOTE_SERVER="superuser@85.31.231.240"

# Nome do serviço
SERVICE_NAME="smartmecanico-serve.service"

# Diretório do projeto no servidor
REMOTE_PROJECT_DIR="/home/superuser/projects/smartmecanico_module_oficina"

# Caminho para o repositório Git
GIT_REPO="git@github.com:cosmeaf/smartmecanico_module_oficina.git"

# Nome do backup com carimbo de data e hora
BACKUP_DIR="$REMOTE_PROJECT_DIR.$(date +%Y%m%d%H%M%S).bkp"

# Comandos SSH para executar no servidor remoto
SSH_COMMANDS=$(cat <<EOL
sudo systemctl stop $SERVICE_NAME
cd $REMOTE_PROJECT_DIR
sudo cp -rp $REMOTE_PROJECT_DIR $BACKUP_DIR
sudo rm -rf $REMOTE_PROJECT_DIR
git clone $GIT_REPO
cd smartmecanico_module_oficina/
npm install
npm run build
sudo systemctl start $SERVICE_NAME
sudo systemctl restart $SERVICE_NAME
sudo systemctl status $SERVICE_NAME
EOL
)

# Executa os comandos via SSH no servidor remoto
ssh -A $REMOTE_SERVER "$SSH_COMMANDS"
