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
        REACT_APP_STRIPE_PUB_KEY = credentials('stripe-publishable-key-test')
        REACT_APP_SEGMENT_WRITE_KEY = credentials('segment-write-key-staging')
        REACT_APP_GOOGLE_CLIENT_ID = credentials('google-client-id-staging')
        REACT_APP_TEAM_PRICE_ID = 'price_1IdVRJJaJXMgpjCHIyNe5LQU'
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
        REACT_APP_STRIPE_PUB_KEY = credentials('stripe-publishable-key-live')
        REACT_APP_SEGMENT_WRITE_KEY = credentials('segment-write-key-prod')
        REACT_APP_BASIC_MONTHLY_PRICE = 12
        REACT_APP_BASIC_MONTHLY_PRICE_ID = 'price_1HHuVxJaJXMgpjCHQ686k8rv'
        REACT_APP_BASIC_YEARLY_PRICE = 9
        REACT_APP_BASIC_YEARLY_PRICE_ID = 'price_1HHuVxJaJXMgpjCH2uCE9ywm'
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
