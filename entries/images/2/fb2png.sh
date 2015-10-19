#!/bin/bash
avconv \
  -vframes 1 \
  -vcodec rawvideo \
  -f rawvideo \
  -pix_fmt rgb565 \
  -s 480x800 \
  -i $1 \
  \
  -f image2 \
  -vcodec png \
  $2
