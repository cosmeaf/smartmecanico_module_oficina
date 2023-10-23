pipeline {
    agent any

    stages {

        stage('Deploy') {
            steps {
                script {
                    // Executando o script de deploy
                    def retorno = sh(script: 'sudo sh -x /home/superuser/scripts/reactjs_deploy_v001.sh', returnStatus: true)
                    if (retorno != 0) {
                        error("Erro ao executar o script de deploy.")
                    }
                    
                    // Reiniciando o serviço smartmecanico-serve.service
                    sh 'sudo systemctl restart smartmecanico-serve.service'
                }
            }
        }
    }

    post {
        always {
            echo 'Deploy finalizado.'
        }
        success {
            echo 'Deploy foi bem-sucedido!'
        }
        failure {
            echo 'Deploy falhou!'
        }
    }
}
