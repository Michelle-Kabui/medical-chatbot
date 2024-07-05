# medical-chatbot

#!/bin/bash

## Create and activate conda environment
```bash
conda create --name medbot python=3.8 -y
conda activate medbot
```
## Install packages
```bash
pip install -r requirements.txt
pip install -U langchain-community
```

## Run initial scripts
```bash
python ingest.py
chainlit run model.py -w
```

## Switch to the main branch, pull updates, and switch to modelIntegration branch
```bash
git checkout main
git pull
git checkout modelIntegration
git pull
```

## Start the backend server
```bash
uvicorn backend.model:app --reload 
```

## Navigate to the frontend directory and start the frontend server
```bash
cd frontend
npm install
npm start
```
