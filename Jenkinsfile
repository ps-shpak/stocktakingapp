pipeline {
    agent { 
        docker { 
            image 'node:6.3'
        }
    }
    stages {
        stage('build') {
                steps {
                    task docker-build
                }
            }
            stage('up') {
                steps {
                    task up
                }
            }  
    }
}
