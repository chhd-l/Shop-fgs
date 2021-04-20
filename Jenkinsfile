// 定义参数label，K8S启动的pod名称通过这个来制定
def label = "JenkinsPOD-${UUID.randomUUID().toString()}"

// 定义jenkins的工作目录
def jenworkspace="/home/jenkins/workspace/${APP_NAME}"


//kubectl和docker执行文件，这个可以打到镜像里面，这边直接共享的方式提供
def sharefile="/home/jenkins/sharefile"

// deployment等K8S的yaml文件目录
def k8srepo='/home/jenkins/k8s_repos'

// cloud为我们前面提供的云名称，nodeSelector是K8S运行pod的节点选择
podTemplate(label: label, cloud: 'kubernetes',
    containers: [
        containerTemplate(
            name: 'jnlp',
            image: 'k8sregistrysit.azurecr.io/repository:393',
            ttyEnabled: true,
            alwaysPullImage: false)
    ],
    volumes: [
        hostPathVolume(hostPath: '/var/run/docker.sock', mountPath:'/var/run/docker.sock'),
        persistentVolumeClaim(mountPath: "$sharefile", claimName: 'sharefile-repo-pvc', readOnly: false)
    ],
    imagePullSecrets: [ 'sit-docker' ]
)
{

    node (label) {
        
        stage('Git Pull'){
              dir("$jenworkspace"){
                 git branch: "${GIT_BRANCH}", changelog: false, credentialsId: "${GIT_CREADENTIAL}", poll: false, url: "${GIT_URL}"
            }
        }
        stage('npm package'){
                dir("$jenworkspace"){
                    sh "npm install"
                    sh "npm run build:${TARGET_COUNTRY}"
                }
        }
        
    }
}