pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
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

    stage('Deploy') {
      steps {
        sh 'aws s3 sync build s3://operationally'
      }
    }

  }
}
