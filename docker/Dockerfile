# .env 파일 내 환경 변수들을 사용합니다.

# node version
FROM node:16

# 앱 디렉터리 생성
WORKDIR ${APP_DIR}

# 앱 의존성 설치
# 작업 디렉터리 전체를 복사하지 않는 이유는 캐시된 Docker 레이어의 장점을 활용하기 위함.
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/ 참고
COPY package.json .
COPY yarn.lock .

RUN yarn install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN yarn install --frozen-lockfile

# 앱 소스 추가
COPY . .

# 가상 머신에 오픈할 포트
# EXPOSE 지시어를 사용해서 docker 데몬에 매핑
EXPOSE ${APP_PORT}

RUN yarn build

# 앱을 실행하는 중요 명령어를 정의
CMD ["yarn", "start"]
