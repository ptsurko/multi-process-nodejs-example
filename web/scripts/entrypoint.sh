#!/bin/bash

# Code from https://github.com/remy/nodemon/blob/master/faq.md
forever --killSignal=SIGTERM -c nodemon "$@"