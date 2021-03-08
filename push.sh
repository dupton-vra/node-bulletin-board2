#!/bin/bash
docker tag bulletinboard:1.$1 dgupton75/bulletinboard:1.$1
docker push dgupton75/bulletinboard:1.$1
