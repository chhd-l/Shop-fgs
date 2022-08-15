FROM nginx:1.20.2
#ADD nginx.conf  /usr/nginx/conf/http_vhost/
COPY nginx.conf /etc/nginx/nginx.conf
COPY robots.txt /usr/share/nginx/html
COPY sitemap.xml /usr/share/nginx/html
COPY build/ /usr/share/nginx/html
COPY seo/ /usr/share/nginx/html/seo/