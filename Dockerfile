# node version
FROM node:16-alpine3.14

## bcrypt 사용을 위해 python3 설치
RUN apk update && apk add bash python3

USER node

ENV WORKDIR /home/node/app
RUN mkdir -p $WORKDIR && chown -R node:node $WORKDIR
WORKDIR $WORKDIR

# 앱 의존성 설치
# 작업 디렉터리 전체를 복사하지 않는 이유는 캐시된 Docker 레이어의 장점을 활용하기 위함.
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/ 참고
COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# 앱 소스 추가
COPY --chown=node:node . .

RUN yarn build

# 앱을 실행하는 중요 명령어를 정의
CMD ["yarn", "start"]
