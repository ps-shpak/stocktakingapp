node {
    cmds = readYaml file: 'Taskfile.yml'
}

pipeline {
    agent { 
        docker { 
            image 'node:6.3'
        }
    }
    stage('build') {
        steps {
            ${cmds.build}
        }
    } 
    stage('docker-build') {
        steps {
            ${cmds.docker-build}
        }
    }  
}