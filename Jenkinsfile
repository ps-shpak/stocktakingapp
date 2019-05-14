pipeline {
    agent { 
        docker { 
            image 'node:6.3'
        }
    }
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
