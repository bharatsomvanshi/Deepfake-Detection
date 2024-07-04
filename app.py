from fastapi import FastAPI, File, UploadFile, Request
from typing import List
import shutil
import os
from model import predict_realorfake
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

# Mounting static directory for CSS and JS files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Using Jinja2Templates for rendering HTML templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/login.html", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.post("/upload-video/")
async def upload_video(files: List[UploadFile] = File(...)):
    for file in files:
        with open(file.filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    value = predict_realorfake("./"+files[0].filename)
    if value[0]:
        predict = "Real"
    else:
        predict = "Fake"
    
    return {"prediction": f"{predict}"}