# Docker  

https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/ 를 참고했습니다.

### 도커 설치하기
https://www.docker.com/get-started

### Getting Started
```shell script
# 이미지 생성
# docker build -t $IMAGE_NAME -f $DOCKERFILE_DIR .
$ docker build -t express -f docker/Dockerfile .

# 이미지 실행
# -d: 이미지를 실행하면 분리 모드로 컨테이너를 실행해서 백그라운드에서 컨테이너가 돌아가도록 함 
# -p: 공개 포트를 컨테이너 내의 비공개 포트로 리다이렉트
# docker run -p $PUBLIC_PORT:$PRIVATE_PORT -d --name $CONTAINER_NAME $IMAGE_NAME
$ docker run -p 3005:3005 -d --name express express
```

### 그 외 주요 명령어

https://docs.docker.com/

```shell script
## 이미지

# 이미지 목록 확인
# --all , -a	Show all images (default hides intermediate images)
$ docker image ls [OPTIONS] [REPOSITORY[:TAG]]

# Remove unused images
# --all , -a		Remove all unused images, not just dangling ones
# --force , -f		Do not prompt for confirmation
$ docker image prune [OPTIONS]

# Remove one or more images
# --force , -f		Force removal of the image
# --no-prune		Do not delete untagged parents
$ docker rmi [OPTIONS] IMAGE [IMAGE...]

## 컨테이너

# 컨테이너 목록 확인
# --all , -a	Show all containers (default shows just running)
$ docker container ls [OPTIONS]

# Fetch the logs of a container
$ docker logs [OPTIONS] CONTAINER

# execute an interactive bash shell on the container.
$ docker exec -it CONTAINER bash

# Stop one or more running containers
$ docker stop [OPTIONS] CONTAINER [CONTAINER...]

# Kill one or more running containers
$ docker container kill [OPTIONS] CONTAINER [CONTAINER...]

# Remove all stopped containers 
# --force , -f		Do not prompt for confirmation
$ docker container prune [OPTIONS]

# Remove one or more containers
# --force , -f		Force the removal of a running container (uses SIGKILL)
# --link , -l		Remove the specified link
# --volumes , -v	Remove anonymous volumes associated with the container
$ docker rm [OPTIONS] CONTAINER [CONTAINER...]

# Start one or more stopped containers
$ docker start [OPTIONS] CONTAINER [CONTAINER...]

# Restart one or more containers
$ docker restart [OPTIONS] CONTAINER [CONTAINER...]
```
