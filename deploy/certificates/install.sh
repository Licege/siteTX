#!/bin/sh
set -eu

if [ "$(id -u)" -ne 0 ]; then
    echo "Run this installer as root (sudo sh deploy/certificates/install.sh)." >&2
    exit 1
fi
for command in docker systemctl systemd-analyze sha256sum; do
    command -v "$command" >/dev/null
done
source_directory=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
docker inspect nginx service_certbot >/dev/null

install -m 0755 "$source_directory/sitetx-reload-nginx-certificates" /usr/local/sbin/sitetx-reload-nginx-certificates
install -m 0644 "$source_directory/sitetx-certificates.service" /etc/systemd/system/sitetx-certificates.service
install -m 0644 "$source_directory/sitetx-certificates.timer" /etc/systemd/system/sitetx-certificates.timer
systemd-analyze verify /etc/systemd/system/sitetx-certificates.service /etc/systemd/system/sitetx-certificates.timer
systemctl daemon-reload
# Apply the Compose restart policy to the existing container without restarting it.
docker update --restart always service_certbot
systemctl start sitetx-certificates.service
systemctl enable --now sitetx-certificates.timer
systemctl status sitetx-certificates.timer --no-pager
