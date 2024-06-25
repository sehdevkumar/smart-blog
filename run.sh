#!/bin/sh
json_data=$1
echo $json_data
cd /projects/atco-opencargo/
python3 main.py "$json_data"