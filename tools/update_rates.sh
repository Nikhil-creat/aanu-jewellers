#!/usr/bin/env sh
# usage: sh tools/update_rates.sh <22K gold per gram> <silver per gram>   e.g. sh tools/update_rates.sh 7250 118
cd "$(dirname "$0")/.." || exit 1
[ $# -ne 2 ] && echo "usage: sh tools/update_rates.sh <gold22> <silver>" && exit 1
printf '{"gold22": %s, "silver": %s, "updated": "%s"}\n' "$1" "$2" "$(date '+%d %b %Y')" > rates.json
git add rates.json && git commit -m "rates $(date '+%d %b %Y %H:%M')" && git push
