#!/usr/bin/env sh
# usage: sh tools/apply_update.sh ~/storage/downloads/aanu-jewellers-master-v6.zip "message"
main() {
  cd "$(dirname "$0")/.." || exit 1
  [ -f "$1" ] || { echo "Zip not found: $1"; return 1; }
  git pull --rebase --autostash 2>/dev/null
  unzip -o "$1" -x "settings.js" "data/products.json" "rates.json" "originals/*" > /dev/null || return 1
  python tools/check_site.py
  git add -A
  git commit -m "${2:-update site}" || echo "Nothing new to commit"
  git push && echo "Pushed. The site updates in 1 to 3 minutes."
}
main "$@"; exit $?
