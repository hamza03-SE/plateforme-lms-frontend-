import scannerModule from 'sonarqube-scanner';
const scanner = scannerModule.default;

scanner(
  {
    serverUrl: 'http://localhost:9006',
    token: 'squ_6556a7a364d69cc2c745e85fb50947348150a216',
    options: {
      'sonar.projectKey': 'lms-frontend',
      'sonar.sources': './src',
      'sonar.tests': '',
      'sonar.exclusions': '**/node_modules/**,**/build/**',
    }
  },
  () => process.exit()
);
