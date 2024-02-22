from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request
import subprocess
import config

app = FastAPI()
templates = Jinja2Templates(directory="../client/templates")
app.mount("/static", StaticFiles(directory="../client/static"), name="static")


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


@app.get("./hdock")
async def h_dock(response: HDock):
    receptor = response.receptor
    ligand = response.ligand

    with tempfile.NamedTemporaryFile(delete=False) as receptor_file:
        receptor_file_path = receptor_file.name
        receptor_file.write(receptor.encode())
    with tempfile.NamedTemporaryFile(delete=False) as ligand_file:
        ligand_file_path = ligand_file.name
        ligand_file.write(ligand.encode())

    h_dock_command(receptor_file_path, ligand_file_path)

    os.unlink(receptor_file_path)
    os.unlink(ligand_file_path)
