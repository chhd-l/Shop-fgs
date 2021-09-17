FROM k8sregistrysit.azurecr.io/nginx:1.18.1
#ADD nginx.conf  /usr/nginx/conf/http_vhost/
COPY nginx.conf /usr/local/nginx/nginx.conf
COPY build/ /usr/local/nginx/html
COPY seo/ /usr/local/nginx/html/seo/