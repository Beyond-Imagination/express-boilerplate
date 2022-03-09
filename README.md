
# Express Boilerplate

Beyond-imagination 백엔드용 express-boilerplate 입니다.
https://github.com/Beyond-Imagination/express-boilerplate/ 을 미러링하여 만들었습니다.

## 사용법
```
yarn # or npm init (가능한 yarn 추천)

yarn dev # or npm run dev
```


## Docker
```shell script
# 이미지 생성
# docker build -t $IMAGE_NAME -f $DOCKERFILE_DIR .
$ docker build -t express .

# 이미지 실행
# -d: 이미지를 실행하면 분리 모드로 컨테이너를 실행해서 백그라운드에서 컨테이너가 돌아가도록 함 
# -p: 공개 포트를 컨테이너 내의 비공개 포트로 리다이렉트
# docker run -p $PUBLIC_PORT:$PRIVATE_PORT -d --name $CONTAINER_NAME $IMAGE_NAME
$ docker run -p 3005:3005 -d --name express express
```
