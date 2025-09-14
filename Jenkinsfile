pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
        DOCKER_IMAGE = "hamzaerradi/lms-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/hamza03-SE/plateforme-lms-frontend-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --include=dev'
            }
        }

        stage('Check Node.js') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

       stage('Run Cypress') {
            agent {
                docker {
                    image 'cypress/included:15.2.0'
                    args '-u root:root --shm-size=2g'
               }
               }
            steps {
                sh 'cypress run --browser chrome'
            }
     }


        stage('Build with Vite') {
            steps {
                sh 'npx vite build'
            }
        }

        stage('Archive dist') {
            steps {
                archiveArtifacts artifacts: 'dist/**', followSymlinks: false
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', '58d0a3a0-b2e3-4b53-928a-383a90cea127') {
                        def app = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy via SSH') {
            steps {
                sshagent(['server-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no hamzaerradi@172.29.17.246 '
                          cd /home/hamzaerradi/project &&
                          git pull &&
                          docker stop lms-frontend || true &&
                          docker rm lms-frontend || true &&
                          docker run -d -p 6666:80 --name lms-frontend --rm hamzaerradi/lms-frontend:latest
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Frontend (Vite) build & déployé avec succès !'
        }
        failure {
            echo '❌ Le pipeline a échoué.'
        }
    }
}
