pipeline {
    agent any

    stages {
        stage('Atualizar Versionamento') {
            steps {
                script {
                    // Lendo o package.json
                    def packageJson = readJSON file: '/home/superuser/projects/smartmecanico_module_oficina/package.json'

                    // Verificar se packageJson.version é válido
                    if (!packageJson.version || !packageJson.version.contains('.')) {
                        error("Versão inválida em package.json: ${packageJson.version}")
                    }

                    echo "Versão atual: ${packageJson.version}"
                    
                    // Obtendo e atualizando a versão
                    def parts = packageJson.version.split('\\.')
                    def newVersion = "${parts[0]}.${parts[1]}.${parts[2].toInteger() + 1}"
                    packageJson.version = newVersion
                    
                    // Escrevendo a versão atualizada de volta no package.json
                    writeJSON file: '/home/superuser/projects/smartmecanico_module_oficina/package.json', json: packageJson

                    echo "Version atualizado para: ${newVersion}"
                }
            }
        }

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
