pipeline {
    agent any

    stages {

        stage('git clone test') {
            when {
               branch 'test'
            }
            steps {
                git branch: 'test', credentialsId: '05397554-60cc-442a-8d6c-bd74e31af744', url: 'https://gitee.com/colgateyhj/codePlatform'
            }
        }

        stage('pretest install') {
            when {
               branch 'test'
            }
            steps {
                nodejs('nodejs12.13.1') {
                sh 'node --version'
                sh 'npm install -g yarn --registry=https://registry.npm.taobao.org'
                sh 'yarn install'
                sh 'yarn dll'
                sh 'yarn build:pretest'
               }
            }
        }
        stage('pretest deploy') {
            when {
               branch 'test'
            }
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'QQ Server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/pretest', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/admin/**/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }

        stage('git clone develop') {
            when {
               branch 'develop'
            }
            steps {
                 git branch: 'develop', credentialsId: '05397554-60cc-442a-8d6c-bd74e31af744', url: 'https://gitee.com/colgateyhj/codePlatform'
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
                    sh 'yarn dll'
                    sh 'yarn build:pro'
               }
            }
        }

        stage('develop deploy') {
            when {
               branch 'develop'
            }
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'QQ Server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/admin/**/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
        stage('delete all'){
            steps {
                cleanWs()
            }
        }
    }
}