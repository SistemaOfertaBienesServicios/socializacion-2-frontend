FROM nginx:1.13.12-alpine
COPY nginx.conf /etc/nginx/
COPY build /usr/share/nginx/html/
