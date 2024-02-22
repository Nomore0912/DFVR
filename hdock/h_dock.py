from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request
from items import HDock
import subprocess
import tempfile
import os

app = FastAPI()


def h_dock_command(receptor, ligand):
    command1 = f"hdock {receptor} {ligand}"
    command2 = f"creapl Hdock.out top10.pdb -nmax 10 -complex -models"

    # Execute the command
    subprocess.run(command1, shell=True)
    subprocess.run(command2, shell=True)



