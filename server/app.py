from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import config
import os

app = FastAPI()
templates = Jinja2Templates(directory="../client/templates")
# app.mount("/static", StaticFiles(directory="../client/static"), name="static")


# 添加cors中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors_origins,
    allow_credentials=True,
    allow_methods=config.cors_methods,
    allow_headers=config.cors_headers,
)


@app.get("/")
async def read_root(request: Request):
    context = {"request": request, "message": "Hello, FastAPI with Jinja2!"}
    return templates.TemplateResponse("index.html", {"request": request, "context": context})


