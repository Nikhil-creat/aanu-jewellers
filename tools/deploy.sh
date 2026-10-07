#!/usr/bin/env sh
# rebuild catalogue from originals/ and publish: sh tools/deploy.sh "message"
cd "$(dirname "$0")/.." || exit 1
python tools/build_catalog.py || exit 1
git add -A && git commit -m "${1:-update catalogue}" && git push
