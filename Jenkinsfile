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
        REACT_APP_MIXPANEL_TOKEN = '966befb56ff67f672c98f97eb89d0597'
        REACT_APP_STRIPE_PUB_KEY = 'pk_test_51H7n2QJaJXMgpjCHiyenC68DaC95suc9PeEep4MVx8mWGDOehWKiNOTbfYgaWc2xHDhr6Ku3yFbmWl708vG41BPW00wVhKjSKo'
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
        REACT_APP_MIXPANEL_TOKEN = 'b45567f51a986e15b9ad852e97a9c048'
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
