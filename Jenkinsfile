def SCRIPT_PATH = "/home/superuser/scripts/"
def PROJECT_PATH = "/home/superuser/projects/smartmecanico_module_oficina/"
def BACKUP_PATH = "/home/superuser/projects/"

pipeline {
    agent any

    environment {
        SCRIPT = "${SCRIPT_PATH}deploy_script.sh"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Stop Service') {
            steps {
                sh 'sudo systemctl stop smartmecanico-serve.service'
            }
        }

        stage('Backup Old Project') {
            steps {
                sh "sudo cp -rp ${PROJECT_PATH} ${BACKUP_PATH}smartmecanico_module_oficina.\$(date +%Y%m%d_%H%M%S).bkp"
            }
        }

        stage('Remove Old Project') {
            steps {
                sh "sudo rm -rf ${PROJECT_PATH}"
            }
        }

        stage('Copy New Project') {
            steps {
                sh "cp -r . ${PROJECT_PATH}"
            }
        }

        stage('Install Dependencies and Build') {
            steps {
                dir(PROJECT_PATH) {
                    sh '''
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('Increment Version') {
            steps {
                dir(PROJECT_PATH) {
                    sh '''
                        CURRENT_VERSION=$(grep '"version"' package.json | cut -d\" -f4)
                        NEW_VERSION=$(echo "$CURRENT_VERSION" | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
                        sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/g" package.json
                        echo "New Version: $NEW_VERSION"
                    '''
                }
            }
        }

        stage('Start Service') {
            steps {
                sh '''
                    sudo systemctl start smartmecanico-serve.service
                    sudo systemctl restart smartmecanico-serve.service
                    sudo systemctl status smartmecanico-serve.service
                '''
            }
        }
    }
}
