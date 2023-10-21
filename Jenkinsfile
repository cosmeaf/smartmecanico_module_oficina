stages {
    stage('Atualizar Versionamento') {
        steps {
            script {
                // Lendo o package.json
                def packageJson = readJSON file: '/home/superuser/projects/smartmecanico_module_oficina/package.json'
                
                // Obtendo e atualizando a versão
                def parts = packageJson.version.split('\\.')
                def newVersion = "<span class="math-inline">\{parts\[0\]\}\.</span>{parts[1]}.${parts[2].toInteger() + 1}"
                packageJson.version = newVersion
                
                // Escrevendo a versão atualizada de volta no package.json
                writeJSON file: '/home/superuser/projects/smartmecanico_module_oficina/package.json', json: packageJson

                echo "Version atualizado para: ${newVersion}"
                echo "Log de atualização do versionamento:"
                echo packageJson
            }
        }
    }

    stage('Deploy') {
        steps {
            script {
                // Executando o script de deploy
                def retorno = sh(script: 'sudo /home/superuser/scripts/reactjs_deploy_v001.sh', returnStatus: true)
                if (retorno != 0) {
                    error("Erro ao executar o script de deploy.")
                }
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
