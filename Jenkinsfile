pipeline {
    agent any

    stages {
        stage('Stop Service') {
            steps {
                sh 'sudo systemctl stop smartmecanico-serve.service'
            }
        }

        stage('Backup and Clone') {
            steps {
                sh '''
                cd /home/superuser/projects
                sudo cp -rp smartmecanico_module_oficina smartmecanico_module_oficina.$(date +%Y%m%d_%H%M%S).bkp
                sudo rm -rf smartmecanico_module_oficina
                git clone git@github.com:cosmeaf/smartmecanico_module_oficina.git
                '''
            }
        }

        stage('Install and Build') {
            steps {
                sh '''
                cd /home/superuser/projects/smartmecanico_module_oficina
                npm install
                npm run build
                '''
            }
        }

        stage('Start Service') {
            steps {
                sh '''
                sudo systemctl start smartmecanico-serve.service
                sudo systemctl restart smartmecanico-serve.service
                '''
            }
        }
    }
}
