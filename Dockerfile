FROM nginx:1.22.0
#ADD nginx.conf  /usr/nginx/conf/http_vhost/
COPY nginx.conf /etc/nginx/nginx.conf
COPY build/ /usr/share/nginx/html
COPY seo/ /usr/share/nginx/html/seo/
COPY robots.txt sitemap.xml /usr/share/nginx/html/