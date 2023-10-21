pipeline {
    agent any 

    environment {
        PROJECT_PATH = '/home/superuser/projects/smartmecanico_module_oficina'
        SCRIPTS_PATH = '/home/superuser/scripts'
    }

    stages {
        stage('Checkout') {
            steps {
                // Considerando que seu código está no repositório git configurado no job do Jenkins:
                checkout scm
            }
        }

        stage('Increment Version') {
            steps {
                script {
                    sh "${SCRIPTS_PATH}/increment-version.sh"
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Parar o serviço
                    sh "sudo systemctl stop smartmecanico-serve.service"

                    // Backup do projeto atual
                    sh "sudo cp -rp ${PROJECT_PATH} ${PROJECT_PATH}.$(date +%Y%m%d_%H%M%S).bkp"

                    // Remover o projeto atual
                    sh "sudo rm -rf ${PROJECT_PATH}"

                    // Clonar o repositório mais recente
                    sh "git clone git@github.com:cosmeaf/smartmecanico_module_oficina.git ${PROJECT_PATH}"

                    // Navegar até o diretório do projeto
                    dir(PROJECT_PATH) {
                        // Instalar dependências e construir o projeto
                        sh """
                            npm install
                            npm run build
                        """
                    }

                    // Iniciar o serviço
                    sh "sudo systemctl start smartmecanico-serve.service"
                    sh "sudo systemctl restart smartmecanico-serve.service"
                }
            }
        }
    }
}
