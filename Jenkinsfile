pipeline {
    agent {
        label 'node2' // 节点标签配置，用于指定在哪个 Jenkins 构建节点（agent）上执行这个流水线。
    }
    tools {
        nodejs 'node-v22'  // 使用与开发环境一致的 Node.js 22 版本
        jdk 'jdk8'
    }
    environment {
        NODE_VERSION = '22'
        PNPM_VERSION = '10'
    }
    stages {
        stage('Setup') {
            steps {
                script {
                    sh 'npm install -g pnpm@${PNPM_VERSION}'
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'pnpm install --no-frozen-lockfile'
                }
            }
        }
        
        // stage('Lint') {
        //     steps {
        //         script {
        //             sh 'pnpm run lint || echo "Linting failed"'
        //         }
        //     }
        // }
        
        stage('Build') {
            steps {
                script {
                    sh 'pnpm run build'
                }
            }
        }
        
        // stage('Sonar Analysis') {
        //     when {
        //         expression { params.sonar }
        //     }
        //     steps {
        //         script {
        //             sh '/u02/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/scanner4.6/bin/sonar-scanner -Dsonar.projectKey=h5-ssr-template -Dsonar.host.url=http://192.168.248.184:19000 -Dsonar.login=02472590e8204ccd7087c9ca9d08e0ce369c9745'
        //         }
        //     }
        // }
        
        stage('Docker Push') {
            steps {
                script {
                    sh '''
                        docker build -t h5-ssr-template:${EnvTag} .
                        /root/k8s-tools/bin/docker-push.sh h5-ssr-template ${EnvTag}
                    '''
                }
            }
        }
        
        stage('Helm Upload') {
            steps {
                script {
                    sh '/root/k8s-tools/bin/helm-push.sh h5-ssr-template'
                }
            }
        }
        
        stage('Rancher Refresh Pro') {
            when {
                expression { params.rancherRefreshPro }
            }
            steps {
                script {
                    sh "/root/k8s-tools/bin/rancher-refresh-pro.sh"
                }
            }
        }
        
        stage('Rancher Update') {
            steps {
                script {
                    def targetEnv = params.targetEnv
                    sh '/root/k8s-tools/bin/rancher-updateApp.sh h5-ssr-template yjb h5-ssr-template-${targetEnv}'
                }
            }
        }
    }
}