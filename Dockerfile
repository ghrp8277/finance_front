# 1단계: Node.js를 이용해 Next.js 애플리케이션을 빌드
FROM node:18.17.0 AS builder

WORKDIR /app

# package.json과 package-lock.json을 복사하고, 의존성을 설치
COPY package.json package-lock.json ./
RUN npm install

# 애플리케이션 소스 코드를 복사하고 빌드
COPY . .
RUN npm run build

# 2단계: Nginx에서 서빙할 파일들만 선택적으로 가져옴
FROM nginx:alpine

# 빌드된 파일을 Nginx HTML 폴더로 복사
COPY --from=builder /app/.next /usr/share/nginx/html/.next
COPY --from=builder /app/public /usr/share/nginx/html/public
COPY --from=builder /app/next.config.js /usr/share/nginx/html/

# Nginx 설정 파일을 복사
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Nginx 포트를 열어줌
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
