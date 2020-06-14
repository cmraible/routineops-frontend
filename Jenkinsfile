properties([pipelineTriggers([githubPush()])])

pipeline {
  agent any
  stages {
    stage('Build Staging') {
      when {
        branch 'staging'
      }
      environment {
        REACT_APP_ENVIRONMENT=staging
        PUBLIC_URL=https://staging.operationally.io
        REACT_APP_API_HOST=https://staging.api.operationally.io
      }
      steps {
        sh 'npm update && npm install && npm run build'
      }
    }

    stage('Stage') {
      when {
        branch 'staging'
      }
      steps {
        sh 'aws s3 sync build s3://operationally-staging'
        sh 'aws cloudfront create-invalidation --distribution-id=E1T41Y3MRJTWG4 --paths="/*"'
      }
    }

    stage('Build Production') {
      when {
        branch 'production'
      }
      environment {
        REACT_APP_ENVIRONMENT=production
        PUBLIC_URL=https://www.operationally.io
        REACT_APP_API_HOST=https://api.operationally.io
      }
      steps {
        sh 'npm update && npm install && npm run build'
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
}
