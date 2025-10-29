pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = 'aleehaakhlaq/devopss_project'
        IMAGE_TAG = "${env.BUILD_NUMBER}"  // automatically tags image by build number
    }

    stages {

        stage('Pull code from GitHub') {
            steps {
                echo '📥 Pulling latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker image') {
            steps {
                echo '🏗️ Building Docker image...'
                sh """
                    docker build -t ${DOCKERHUB_REPO}:${IMAGE_TAG} .
                """
            }
        }

        stage('Push image to Docker Hub') {
            steps {
                echo '🚀 Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                                                  usernameVariable: 'DOCKER_USER',
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKERHUB_REPO}:${IMAGE_TAG}
                        docker logout
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build and push completed successfully!"
        }
        failure {
            echo "❌ Build or push failed. Check the logs for details."
        }
    }
}
