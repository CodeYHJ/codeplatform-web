pipeline {
    agent any

    stages {

        stage('git clone master') {
            when {
               branch 'master'
            }
            steps {
                git branch: 'master', credentialsId: 'github_codeplatform_web', url: 'https://github.com/CodeYHJ/codeplatform-web'
            }
        }

        stage('master install') {
            when {
               branch 'master'
            }
            steps {
                nodejs('nodejs12.13.1') {
                sh 'node --version'
                sh 'npm install -g yarn --registry=https://registry.npm.taobao.org'
                sh 'yarn install'
                // sh 'yarn dll'
                sh 'yarn build:pro'
               }
            }
        }
        stage('master deploy') {
            when {
               branch 'master'
            }
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'QQ Server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/admin/**/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }

        stage('git clone develop') {
            when {
               branch 'develop'
            }
            steps {
                 git branch: 'develop', credentialsId: 'github_codeplatform_web', url: 'https://github.com/CodeYHJ/codeplatform-web'
            }
        }

        stage('develop install') {
            when {
               branch 'develop'
            }
            steps {
                nodejs('nodejs12.13.1') {
                    sh 'node --version'
                    sh 'npm install -g yarn --registry=https://registry.npm.taobao.org'
                    sh 'yarn install'
                    // sh 'yarn dll'
                    sh 'yarn build:pretest'
               }
            }
        }

        stage('develop deploy') {
            when {
               branch 'develop'
            }
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'QQ Server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/pretest', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/admin/**/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
        stage('delete all'){
            steps {
                cleanWs()
            }
        }
    }
}