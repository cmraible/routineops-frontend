properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any
  stages {
    stage('Build Staging') {
      when {
        branch 'staging'
      }
      environment {
        REACT_APP_ENVIRONMENT = 'staging'
        PUBLIC_URL = 'https://staging.routineops.com'
        REACT_APP_API_HOST = 'https://staging.api.routineops.com'
      }
      steps {
        sh 'npm install && npm run build'
      }
    }

    stage('Stage') {
      when {
        branch 'staging'
      }
      steps {
        sh 'aws s3 sync build s3://routineops-staging'
        sh 'aws cloudfront create-invalidation --distribution-id=E1H7MJ6AN5F2Z1 --paths="/*"'
      }
    }

    stage('Build Production') {
      when {
        branch 'production'
      }
      environment {
        REACT_APP_ENVIRONMENT = 'production'
        PUBLIC_URL = 'https://app.routineops.com'
        REACT_APP_API_HOST = 'https://api.routineops.com'
      }
      steps {
        sh 'npm install && npm run build'
      }
    }

    stage('Deploy') {
      when {
        branch 'production'
      }
      steps {
        sh 'aws s3 sync build s3://routineops-production'
        sh 'aws cloudfront create-invalidation --distribution-id=EPFZANN5L5AMH --paths="/*"'
      }
    }

  }
}
