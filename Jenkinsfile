pipeline{
    agent any
    environment{
        NODE_ENV = 'production'
    }
    stages{

        stage('depot'){
            steps{
                git branch :'master',
                url : 'https://github.com/hamza03-SE/plateforme-lms-frontend-.git'
            }
        }

        stage('installe les dependances'){
            steps{
                sh 'npm install'
            }
            
        }
         
        stage('construction avec vite'){
            steps{
                sh 'npm run build'
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
                        def app = docker.build("hamzaerradi433@gmail.com/lms-frontend:${env.BUILD_NUMBER}")
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Déploiement frontend en cours..."
                // Exemple : si tu veux déployer sur un serveur Nginx avec Docker
                sshagent(['ssh-credentials-id']) {
                    sh 'ssh user@serveur "docker pull hamzaerradi433@gmail.com/lms-frontend:latest && docker run -d -p 8000:80 hamzaerradi433@gmail.com/lms-frontend:latest"'
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