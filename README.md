# be12-3rd-404Error-EduLink



## 📌 프로젝트 주제 
<div align="center">
    <img src="./images/readme_img/service.png" /> <br>
</div>

### EduLink: 혁신적인 학습 관리 플랫폼
빠르게 증가하는 국비지원 부트캠프 수요에 맞춰 학습 환경의 질적 향상을 목표로 개발된 EduLink는 기존 LMS(HRD-Net)의 한계를 보완합니다.   

이 플랫폼은 단순 출결 확인을 넘어 커리큘럼 관리, 공지사항 통합, 학습 성과 분석 등 다양한 기능을 통해 학습 효율을 극대화합니다.   

수강생들은 EduLink를 통해 학습 전반을 체계적으로 관리하고 편리하게 활용할 수 있습니다.

[상세보기](https://github.com/beyond-sw-camp/be12-3rd-404Error-EduLink/wiki/1.-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B0%9C%EC%9A%94)

### 프로젝트 목표
- EduLink 서비스의 백엔드 서버를 구현하고, 이전에 개발한 프론트엔드 서버와 연결합니다.
- 기본적인 기능 구현에서 나아가 여러 시나리오 기반으로 성능을 테스트하고 개선합니다.
- 구현된 기능의 문제점을 효율적으로 보완하기 위해 고도화합니다.

## 💡팀

<div align=center>
  <img src="./images/readme_img/team.png" /> <br>
    <h3>한화시스템 BEYOND SW캠프 </h3>
    <p>12기 2차 프로젝트 <strong>팀 404Error</strong></p>
</div>



## 🤚 404Error 팀원
<div style="display: flex; justify-content: center;">
  <table  align="center">
    <tbody>
      <tr>
        <td align="center"><a href="https://github.com/museongkim0" style="text-decoration: none; color: lightgray;"><img src="./images/팀원소개/ms.jpg" width="100px;" height="100px;" background-size="cover;" alt=""/><br /><sub><b> 🐯 김무성</b></sub></a><br /></td>
        <td align="center"><a href="https://github.com/kuj7882" style="text-decoration: none; color: lightgray;"><img src="./images/팀원소개/yj.jpg" width="100px;"  alt=""/><br /><sub><b> 🐶 김유진</b></sub></a><br /></td>
        <td align="center"><a href="https://github.com/GoodLeaf" style="text-decoration: none; color: lightgray;"><img src="./images/팀원소개/jy.png" width="100px;" height="100px;" alt=""/><br /><sub><b> 🐺 김정엽</b></sub></a><br /></td>
        <td align="center"><a href="https://github.com/gunha0405" style="text-decoration: none; color: lightgray;"><img src="./images/팀원소개/gh.jpg" width="100px;" alt=""/><br /><sub><b> 🐱 오건하</b></sub></a><br /></td>
        <td align="center"><a href="https://github.com/leewoojin12" style="text-decoration: none; color: lightgray;"><img src="./images/팀원소개/wj.jpg" width="100px;" alt=""/><br /><sub><b> 🦁 이우진</b></sub></a><br /></td>
      </tr>
    </tbody>
  </table>
</div>



## CI/CD 프로젝트 구성

<br>
<br>


| **항목**                | **설명**                                                                                             |
|------------------------|-----------------------------------------------------------------------------------------------------|
| **CI/CD 도구**           | **Jenkins**: 코드 커밋 시 자동화된 빌드, 테스트 및 배포 파이프라인을 구축하여 지속적인 통합을 지원.    |
| **배포 및 오케스트레이션** | **Kubernetes (K8S)**: 애플리케이션의 자동 배포, 확장, 관리를 위한 오케스트레이션 플랫폼.             |
| **인프라 자동화**         | **Ansible**: 서버 구성 관리 및 애플리케이션 배포 자동화 도구. 특히, **Elasticsearch**와 **MongoDB**의 설치 및 관리를 자동화. |
| **배포 방식**            | **블루/그린 배포**: 두 개의 환경(블루/그린)을 사용하여 무중단 배포를 지원 |

## CI/CD 파이프라인 흐름

1. **Jenkins**: 코드 변경 시 자동으로 빌드, 테스트, 배포를 실행합니다.
2. 빌드 성공 후 **Kubernetes (K8S)**를 통해 새로운 버전을 자동으로 배포하며, **블루/그린 배포** 방식으로 배포됩니다.
   - 새로운 버전(그린) 환경으로 트래픽을 전환하여 무중단 배포를 보장합니다.
   - 트래픽 전환 후 문제가 발생하면 블루 환경으로 롤백할 수 있습니다.
3. **Ansible**을 사용하여 **Elasticsearch** 및 **MongoDB**의 설치 및 관리를 자동화하여 일관된 환경을 유지합니다.
4. 배포 후 **Jenkins**와 **K8S**의 모니터링을 통해 상태를 점검하고, 문제가 발생하면 즉시 롤백하여 시스템 안정성을 유지합니다.


<br>
<br>
<br>


<div>

## <img src="https://velog.velcdn.com/images/sdsd0908/post/4d17812f-6a91-4350-a4d9-de94f16649f9/image.png" width="60" height="60"/>Jenkins 활용 전략


#### 1) 자동 빌드 및 테스트
- **Jenkins**는 GitHub에 코드 푸시 시 자동으로 빌드를 시작하고, **YAML**을 이용해 프로젝트를 빌드합니다

#### 2) 배포 자동화
- 빌드 성공 후, **Docker** 이미지를 생성하고 **Kubernetes**에 자동 배포합니다.
- **블루/그린 배포** 방식으로 무중단 배포를 구현하며, 문제 발생 시 빠르게 롤백 가능합니다.

#### 3) 모니터링 및 알림
- 빌드/배포 중 오류 발생 시 **Discord**로 알림을 팀에게 즉시 연락합니다.

#### 4) Jenkins 파이프라인
- **Jenkins Pipeline**을 사용하여 빌드, 이미지 생성, 배포, 롤백을 코드로 관리합니다.

#### 5) Jenkisfile
- **Jenkinsfile**을 사용하여 CI/CD Pipeline을 코드로 관리하고, 변경 사항을 Git에 저장합니다다


<br> 


### JENKINS 단독
#### 1) CI/CD 프로세스 단순화 & 중앙 집중화
- **Jenkins**는 CI/CD 프로세스를 단순화하고 중앙 집중화하여 운영 부담을 감소시킵니다.

#### 2) 온프레미스 및 클라우드 독립적 운영
- 온프레미스와 클라우드 환경 모두에서 독립적으로 운영할 수 있어 보안성을 확보할 수 있습니다.

#### 3) 기존 도구들과 원활한 연동
- **Docker**, **Kubernetes**, **Ansible**과 원활하게 연동되어, 기존 인프라와의 호환성 문제가 없습니다.

#### 4) 플러그인 & 스크립트 확장성
- 다양한 플러그인과 스크립트를 통해 유연한 배포가 가능하며, 필요에 맞게 확장할 수 있습니다.
</div>


<br>
<br>
<br>


## <span style="color:blue">블루</span> / <span style="color:green">그린</span> 배포하는 이유

###  무중단 배포 (Zero Downtime)
- **Blue/Green 배포**는 무중단 배포를 지원하여, 사용자 경험을 지속적으로 유지할 수 있습니다.

###  빠른 롤백 지원
- 배포 과정에서 문제가 발생하면 **빠르게 롤백**할 수 있어 장애 발생 시 즉각적인 복구가 가능합니다.

###  사전 테스트 가능
- 새로운 버전을 **Green 환경**에서 사전 테스트 후, 안정성이 검증되면 트래픽을 전환합니다.

###  성능 저하 없이 원활한 서비스 운영
- 성능 저하 없이 **원활한 학습 서비스 운영**이 가능하며, 사용자에게 지장을 주지 않습니다.




<br>
<br>
<br>




## 앤서블로 엘라스틱서치 , MONGO DB 설치 및 배포


###  **자동화된 설치 및 구성**
- **Ansible**은 MongoDB와 Elasticsearch의 **설치 및 설정을 자동화**할 수 있습니다. 수동으로 설치하는 번거로움을 줄이고, 반복적인 작업을 최소화할 수 있습니다.

###  **일관된 환경 유지**
- 여러 서버에 MongoDB와 Elasticsearch를 배포할 때, **Ansible**을 사용하면 동일한 구성을 모든 서버에 일관되게 적용할 수 있습니다. 이를 통해 운영 환경의 불일치를 방지하고, 안정성을 높일 수 있습니다.

###  **배포 및 업데이트 자동화**
- **Ansible**은 MongoDB와 Elasticsearch의 버전 업데이트 및 패치 작업을 자동화할 수 있어, 시스템 유지보수가 훨씬 쉬워집니다. 배포 및 업데이트를 일관되게 자동으로 적용할 수 있습니다.


<br>
<br>


## 5. 시스템 아키텍쳐





<img src="./images/image.png"/>






## 6. CI/CD 배포 및 테스트

