properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'whoami'
        sh 'npm update'
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        echo 'Testing application...'
      }
    }

    stage('Stage') {
      when {
        branch 'staging'
      }
      steps {
        sh 'aws s3 sync build s3:operationally-staging'
      }
    }

    stage('Deploy') {
      when {
        branch 'production'
      }
      steps {
        sh 'aws s3 sync build s3://operationally'
        sh 'aws cloudfront create-invalidation --distribution-id=E38N06MFN9SWY8 --paths="/*"'
      }
    }

  }
  environment {
    PUBLIC_URL = 'https://www.operationally.io'
    REACT_APP_ENVIRONMENT = 'production'
    REACT_APP_API_HOST = 'https://api.operationally.io'
  }
}
