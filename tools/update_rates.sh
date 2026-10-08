#!/usr/bin/env sh
# manual update: sh tools/update_rates.sh <24K> <22K> <18K> <silver 92.5>   e.g. sh tools/update_rates.sh 14359 13675 11401 255
cd "$(dirname "$0")/.." || exit 1
[ $# -ne 4 ] && echo "usage: sh tools/update_rates.sh <24K> <22K> <18K> <silver>" && exit 1
g20=$(( ($2 + $3) / 2 ))
printf '{"gold24": %s, "gold22": %s, "gold20": %s, "gold18": %s, "silver": %s, "updated": "%s", "source": "manual"}\n' "$1" "$2" "$g20" "$3" "$4" "$(date '+%d %b %Y, %I:%M %p')" > rates.json
git add rates.json && git commit -m "rates $(date '+%d %b %Y %H:%M')" && git push
