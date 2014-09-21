#!/bin/bash
JSONBLOG=../jsonblog.jar
java -jar $JSONBLOG config.json
java -jar $JSONBLOG config.feed.json

