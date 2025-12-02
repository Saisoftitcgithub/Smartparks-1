# FROM nginx:alpine
# COPY dist /usr/share/nginx/html
# COPY .\htaccess /usr/share/nginx/html


FROM nginx:alpine
COPY .\htaccess /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html