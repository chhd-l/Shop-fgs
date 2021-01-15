FROM nginx:1.18.0
#ADD nginx.conf  /usr/nginx/conf/http_vhost/
COPY nginx.conf /etc/nginx/nginx.conf
COPY build/ /usr/share/nginx/html
