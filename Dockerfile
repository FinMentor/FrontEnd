# 1. Node.js 이미지를 사용하여 빌드
FROM node:18 AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json을 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install --production

# 5. 애플리케이션 소스 코드 복사
COPY . .

# 6. 애플리케이션 빌드
RUN npm run build

# 7. Nginx 베이스 이미지로 변경하여 정적 파일 서빙
FROM nginx:stable-alpine

# 8. 빌드된 파일을 Nginx html 폴더로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 9. Nginx 설정 파일 복사 (필요 시)
# COPY nginx.conf /etc/nginx/nginx.conf

# 10. 포트 설정 (Nginx 기본 포트 80)
EXPOSE 80

# 11. Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
