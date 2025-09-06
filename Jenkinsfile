pipeline {
    agent any
    environment {
        NODE_ENV = 'production'
        DOCKER_IMAGE = "hamzaerradi433@gmail.com/lms-frontend"
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
                sh 'npm install'
            }
        }

        stage('Check Node.js'){
            steps{
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Build with Vite') {
            steps {
                sh './node_modules/vite build'
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
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        def app = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Déploiement frontend en cours..."
                sshagent(['ssh-credentials-id']) {
                    sh """
                        ssh user@serveur '
                            docker pull ${DOCKER_IMAGE}:latest &&
                            docker stop lms-frontend || true &&
                            docker rm lms-frontend || true &&
                            docker run -d --name lms-frontend -p 8000:80 ${DOCKER_IMAGE}:latest
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
