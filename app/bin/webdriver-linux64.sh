#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR
PATH=$PATH:drivers/linux64/ java -jar selenium-server-standalone-2.43.1.jar
