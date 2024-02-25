df.painter = {
    showHet: function (type, pdbId) {
        switch (type) {
            case df.HET_LINE:
                this.showHetLine(pdbId);
                break;
            case df.HET_STICK:
                this.showHetStick(pdbId);
                break;
            case df.HET_BALL_ROD:
                this.showHetBallRod(pdbId);
                break;
        }
    },
    showHetLine: function (molId) {
        this.showWater(molId);
    },
    showWater: function (molId) {
        let w = df.config.water_sphere_w;
        if (df.isShowWater) {
            // H2O
            for (let i in w3m.mol[molId].single) {
                let atom = df.tool.getHetAtom(molId, i);
                if (atom.resName === "hoh") {
                    df.drawer.drawSphere(
                        molId,
                        'water',
                        atom.chainName,
                        atom.posCentered,
                        atom.color,
                        0.1 * atom.radius,
                        atom,
                        w);
                }
            }
        } else if (!df.isShowWater) {
            df.tool.clearGroupIndex(df.GROUP[molId]['water']);
        }
    },
    showHetWithoutConnect: function (molId, radius, w, history) {
        for (let i in w3m.mol[molId].atom.het) {
            let HetAtom = df.tool.getHetAtomOnly(molId, i);
            if (HetAtom) {
                if (history[HetAtom.id] === undefined) {
                    let hetAtomRadius = radius + 0.001
                    let types = 'water'
                    if (HetAtom.resName !== 'hoh') {
                        hetAtomRadius = 1
                        w = 16
                        types = 'het'
                    }
                    df.drawer.drawSphere(
                        molId,
                        types,
                        HetAtom.chainName,
                        HetAtom.posCentered,
                        HetAtom.color,
                        hetAtomRadius,
                        HetAtom,
                        w);
                    history[HetAtom.id] = 1;
                }
            }
        }
    },
    showHetStick: function (molId) {
        let w = df.config.stick_sphere_w;
        let radius = 0.2;
        let history = {};
        if (Object.keys(w3m.mol[molId].connect).length === 0) {
            this.showHetWithoutConnect(molId, radius, w, history);
        } else {
            for (let i in w3m.mol[molId].connect) {
                for (let j in w3m.mol[molId].connect[i]) {
                    let [startAtom, endAtom] = this.showHetAtomInfo(molId, i, j);
                    // 存在 Ca1,Ca2 这种情况，忽略 Ca2，会导致 atom 为空
                    if (startAtom && endAtom) {
                        if (history[startAtom.id] === undefined) {
                            df.drawer.drawSphere(
                                molId,
                                'het',
                                startAtom.chainName,
                                startAtom.posCentered,
                                startAtom.color,
                                radius + 0.001,
                                startAtom,
                                w);
                            history[startAtom.id] = 1;
                        }
                        if (history[endAtom.id] === undefined) {
                            df.drawer.drawSphere(
                                molId,
                                'het',
                                endAtom.chainName,
                                endAtom.posCentered,
                                endAtom.color,
                                radius + 0.001,
                                endAtom,
                                w);
                            history[endAtom.id] = 1;
                        }
                        let midPoint = df.tool.midPoint(startAtom.posCentered, endAtom.posCentered);
                        df.drawer.drawStick(molId, 'het', startAtom.chainName, startAtom.posCentered, midPoint, radius, startAtom.color, startAtom);
                        df.drawer.drawStick(molId, 'het', endAtom.chainName, midPoint, endAtom.posCentered, radius, endAtom.color, endAtom);
                    }
                }
            }
        }
    },
    showHetBallRod: function (molId) {
        let w = df.config.stick_sphere_w;
        let radius = 0.12;
        let history = {};
        if (Object.keys(w3m.mol[molId].connect).length === 0) {
            this.showHetWithoutConnect(molId, radius, w, history);
        } else {
            for (let i in w3m.mol[molId].connect) {
                for (let j in w3m.mol[molId].connect[i]) {
                    let [startAtom, endAtom] = this.showHetAtomInfo(molId, i, j);
                    if (startAtom && endAtom) {
                        if (history[startAtom.id] === undefined) {
                            df.drawer.drawSphere(
                                molId,
                                'het',
                                startAtom.chainName,
                                startAtom.posCentered,
                                startAtom.color,
                                startAtom.radius * 0.2,
                                startAtom,
                                w);
                            history[startAtom.id] = 1;
                        }
                        if (history[endAtom.id] === undefined) {
                            df.drawer.drawSphere(
                                molId,
                                'het',
                                endAtom.chainName,
                                endAtom.posCentered,
                                endAtom.color,
                                endAtom.radius * 0.2,
                                endAtom,
                                w);
                            history[endAtom.id] = 1;
                        }
                        let midPoint = df.tool.midPoint(startAtom.posCentered, endAtom.posCentered);
                        df.drawer.drawStick(molId, 'het', startAtom.chainName, startAtom.posCentered, midPoint, radius, startAtom.color, startAtom);
                        df.drawer.drawStick(molId, 'het', endAtom.chainName, midPoint, endAtom.posCentered, radius, endAtom.color, endAtom);
                    }
                }
            }
        }
    },
    showHetAtomInfo: function (molId, i, j) {
        let startAtom = df.tool.getHetAtom(molId, i);
        if (startAtom === undefined) {
            startAtom = df.tool.getMainAtom(molId, i);
        }
        let endAtom = df.tool.getHetAtom(molId, w3m.mol[molId].connect[i][j]);
        if (endAtom === undefined) {
            endAtom = df.tool.getMainAtom(molId, i);
        }
        if (endAtom) {
            endAtom.caid = endAtom.id;
        }
        return [startAtom, endAtom];
    },

    showAllResidues: function (type, pdbId) {
        if (type === df.config.surface) {
            df.painter.showSurface(pdbId, 1, w3m.mol[pdbId].atom.main.length, true);
        } else {
            let residueData = w3m.mol[pdbId].residueData;
            for (let chain in residueData) {
                for (let resId in residueData[chain]) {
                    df.painter.showResidue(pdbId, chain, resId, type);
                }
            }
        }
    },
    showResidue: function (pdbId, chainId, resId, type) {
        switch (type) {
            case df.BALL_AND_ROD:
                df.painter.showBallRodByResidue(pdbId, chainId, resId);
                break;
            case df.CARTOON_SSE:
                df.painter.showCartoonSSEByResidue(pdbId, chainId, resId);
                break;
        }
    },
    // show Ball & Rod
    drawSphereByResidue: function (pdbId, type, atom, radius, x, w) {
        df.drawer.drawSphere(
            pdbId,
            type,
            atom.chainName,
            atom.posCentered,
            atom.color,
            x * atom.radius,
            atom,
            w);
        df.GROUP[pdbId][type][atom.chainName].children[df.GROUP[pdbId][type][atom.chainName].children.length - 1].visible = true;
    },
    showBallRodByResidue: function (pdbId, chainId, resId) {
        let w = df.config.stick_sphere_w;
        let radius = df.config.ball_rod_radius;
        let residue = w3m.mol[pdbId].residueData[chainId][resId];
        let lines = residue.lines;
        // 防止重复绘制
        let history = {};
        for (let i = 0; i < lines.length; i++) {
            let ids = lines[i];
            let startAtom = df.tool.getMainAtom(pdbId, ids[0]);
            let endAtom = df.tool.getMainAtom(pdbId, ids[1]);
            if (!startAtom.caid) {
                startAtom.caid = residue.caid;
                endAtom.caid = residue.caid;
            }
            if (history[startAtom.id] === undefined) {
                this.drawSphereByResidue(pdbId, 'main', startAtom, radius, 0.2, w);
                history[startAtom.id] = 1;
            }
            if (history[endAtom.id] === undefined) {
                this.drawSphereByResidue(pdbId, 'main', endAtom, radius, 0.2, w);
                history[endAtom.id] = 1;
            }
            let midPoint = df.tool.midPoint(startAtom.posCentered, endAtom.posCentered);
            let distance = startAtom.posCentered.distanceTo(endAtom.posCentered);
            if (distance < 3) {
                df.drawer.drawStick(pdbId, 'main', startAtom.chainName, startAtom.posCentered, midPoint, radius, startAtom.color, startAtom);
                df.GROUP[pdbId]['main'][startAtom.chainName].children[df.GROUP[pdbId]['main'][startAtom.chainName].children.length - 1].visible = true;
                df.drawer.drawStick(pdbId, 'main', endAtom.chainName, midPoint, endAtom.posCentered, radius, endAtom.color, endAtom);
                df.GROUP[pdbId]['main'][endAtom.chainName].children[df.GROUP[pdbId]['main'][endAtom.chainName].children.length - 1].visible = true;
            }
        }
    },

    // show Cartoon
    showTubeByResidue: function (pdbId, chainId, resId, residue, type) {
        let path = residue.path;
        if (path.length === 0) return;
        let w = df.config.stick_sphere_w;
        let residueKeys = Object.keys(w3m.mol[pdbId].residueData[chainId]).sort(customCompare);
        let resInd = findResidueIdIndex(residueKeys, resId);
        let radius = df.config.tube_radius;
        let caAtom = df.tool.getMainAtom(pdbId, residue.caid);
        let preResidue = w3m.mol[pdbId].residueData[chainId][residueKeys[resInd - 1]];

        switch (type) {
            case 'FOOT':
                path = path.slice((path.length / 2) - 1, path.length);
                break;
            case 'HEAD':
                path = path.slice(0, path.length / 2 + 1);
                if (preResidue !== undefined && residueKeys[resInd - 1] !== undefined) {
                    if (customCompare(residueKeys[resInd - 1], resId) === -1) {
                        path = [preResidue.path[preResidue.path.length - 1]].concat(path);
                    }
                }
                break;
            case 'BODY':
                let w = df.config.stick_sphere_w;
                if (w3m.mol[pdbId].residueData[chainId][residueKeys[resInd - 1]] === undefined) {
                    df.drawer.drawSphere(pdbId, 'main', caAtom.chainName, path[0], caAtom.color, radius, caAtom, w);
                    df.GROUP[pdbId]['main'][caAtom.chainName].children[df.GROUP[pdbId]['main'][caAtom.chainName].children.length - 1].visible = true;
                }
                if (preResidue !== undefined && residueKeys[resInd - 1] !== undefined) {
                    if (customCompare(residueKeys[resInd - 1], resId) === -1) {
                        path = [preResidue.path[preResidue.path.length - 1]].concat(path);
                    }
                }
                break;
        }
        if (path.length > 0) {
            df.drawer.drawTube(
                path, radius, caAtom.color, caAtom, pdbId, 'main', caAtom.chainName
            );
            df.GROUP[pdbId]['main'][caAtom.chainName].children[df.GROUP[pdbId]['main'][caAtom.chainName].children.length - 1].visible = true;
        }
        if (type === 'BODY') {
            if (w3m.mol[pdbId].residueData[chainId][residueKeys[resInd + 1]] === undefined && (path.length - 1) > 0) {
                df.drawer.drawSphere(pdbId, 'main', caAtom.chainName, path[path.length - 1], caAtom.color, radius, caAtom, w);
                df.GROUP[pdbId]['main'][caAtom.chainName].children[df.GROUP[pdbId]['main'][caAtom.chainName].children.length - 1].visible = true;
            }
        }
    },
    showRibbonEllipseDrawFunc: function (pdbId, residue, path, cubeData) {
        let radius = df.config.ellipse_radius;
        let caAtom = df.tool.getMainAtom(pdbId, residue.caid);
        let caId = 0;
        caId = df.tool.atomCaId(caAtom);
        if (path.length > 0) {
            df.drawer.drawEllipse(
                path,
                radius,
                caAtom.color,
                cubeData,
                pdbId,
                'main',
                caAtom.chainName,
                caId,
                cubeData.tangents.length - 1);
            df.GROUP[pdbId]['main'][caAtom.chainName].children[df.GROUP[pdbId]['main'][caAtom.chainName].children.length - 1].visible = true;
        }
        return undefined;
    },
    showRibbonEllipseByResidueFOOT: function (pdbId, residue) {
        if (residue.path.length === 0) return;
        let path = residue.path.slice(
            (residue.path.length / 2) - 1, residue.path.length);
        let cubeData = {};
        cubeData.tangents = residue.tangents.slice((residue.tangents.length / 2) - 1, residue.tangents.length);
        cubeData.normals = residue.normals.slice((residue.normals.length / 2) - 1, residue.normals.length);
        cubeData.binormals = residue.binormals.slice((residue.binormals.length / 2) - 1, residue.binormals.length);
        this.showRibbonEllipseDrawFunc(pdbId, residue, path, cubeData);
    },
    showRibbonEllipseByResidue: function (pdbId, chainId, resId, residue, type) {
        let cubeData = {};
        let path = residue.path;
        if (path.length === 0) return;
        switch (type) {
            case 'BODY':
                cubeData.tangents = residue.tangents;
                cubeData.normals = residue.normals;
                cubeData.binormals = residue.binormals;
                break;
            case 'HEAD':
                path = path.slice(0, path.length / 2);
                cubeData.tangents = residue.tangents.slice(0, residue.tangents.length / 2);
                cubeData.normals = residue.normals.slice(0, residue.normals.length / 2);
                cubeData.binormals = residue.binormals.slice(0, residue.binormals.length / 2);
                break;
        }
        let residueKeys = Object.keys(w3m.mol[pdbId].residueData[chainId]).sort(customCompare);
        let resInd = findResidueIdIndex(residueKeys, resId);
        let preResidue = w3m.mol[pdbId].residueData[chainId][residueKeys[resInd - 1]];
        if (preResidue !== undefined && residueKeys[resInd - 1] !== undefined) {
            if (customCompare(residueKeys[resInd - 1], resId) === -1) {
                path = [preResidue.path[preResidue.path.length - 1]].concat(path);
                cubeData.tangents = [preResidue.tangents[preResidue.tangents.length - 1]].concat(cubeData.tangents);
                cubeData.normals = [preResidue.normals[preResidue.normals.length - 1]].concat(cubeData.normals);
                cubeData.binormals = [preResidue.binormals[preResidue.binormals.length - 1]].concat(cubeData.binormals);
            }
        }
        this.showRibbonEllipseDrawFunc(pdbId, residue, path, cubeData);
    },
    showRibbonArrow: function (pdbId, chainId, resId, residue) {
        let arrow = residue.arrow;
        if (arrow.length === 0) return;
        let residueKeys = Object.keys(w3m.mol[pdbId].residueData[chainId]).sort(customCompare);
        let resInd = findResidueIdIndex(residueKeys, resId);
        let preResidue = w3m.mol[pdbId].residueData[chainId][residueKeys[resInd - 1]];
        if (preResidue !== undefined && preResidue.arrow !== undefined && preResidue.arrow.length > 0) {
            if (customCompare(residueKeys[resInd - 1], resId) === -1) {
                arrow = [preResidue.arrow[preResidue.arrow.length - 1]].concat(arrow);
                arrow = [preResidue.arrow[preResidue.arrow.length - 2]].concat(arrow);
                arrow = [preResidue.arrow[preResidue.arrow.length - 3]].concat(arrow);
                arrow = [preResidue.arrow[preResidue.arrow.length - 4]].concat(arrow);
            }
        }
        let caAtom = df.tool.getMainAtom(pdbId, residue.caid);
        df.drawer.drawArrowByPaths(pdbId, 'main', caAtom.chainName, arrow, caAtom.color, residue.caid);
        df.GROUP[pdbId]['main'][caAtom.chainName].children[df.GROUP[pdbId]['main'][caAtom.chainName].children.length - 1].visible = true;
    },
    showCartoonSSEByResidue: function (pdbId, chainId, resId) {
        let residue = w3m.mol[pdbId].residueData[chainId][resId];
        switch (residue.sse) {
            case w3m.HELIX_HEAD:
                this.showTubeByResidue(pdbId, chainId, resId, residue, 'HEAD');
                this.showRibbonEllipseByResidueFOOT(pdbId, residue);
                break;
            case w3m.HELIX_BODY:
                this.showRibbonEllipseByResidue(pdbId, chainId, resId, residue, 'BODY');
                break;
            case w3m.HELIX_FOOT:
                this.showRibbonEllipseByResidue(pdbId, chainId, resId, residue, 'HEAD');
                this.showTubeByResidue(pdbId, chainId, resId, residue, 'FOOT');
                break;
            case w3m.SHEET_HEAD: //loop-->tube
                this.showTubeByResidue(pdbId, chainId, resId, residue, 'HEAD');
                this.showRibbonArrow(pdbId, chainId, resId, residue);
                break;
            case w3m.SHEET_BODY:
                this.showRibbonArrow(pdbId, chainId, resId, residue);
                break;
            case w3m.SHEET_FOOT:
                this.showRibbonArrow(pdbId, chainId, resId, residue);
                this.showTubeByResidue(pdbId, chainId, resId, residue, 'FOOT');
                break;
            case w3m.LOOP_HEAD: //sheet-->arrow
                this.showTubeByResidue(pdbId, chainId, resId, residue, 'BODY');
                break;
            case w3m.LOOP_BODY: //loop-->tube
                this.showTubeByResidue(pdbId, chainId, resId, residue, 'BODY');
                break;
            case w3m.LOOP_FOOT: //loop-->tube
                this.showTubeByResidue(pdbId, chainId, resId, residue, 'BODY');
                break;
        }
    },
    showSurface: function (pdbId,
                           startId = 1,
                           endId, isSelected = true,
                           chain = false) {
        let mainAtom = w3m.mol[pdbId].atom.main;
        let atoms = {};
        let limit = w3m.global.limit;
        for (let i in mainAtom) {
            if (chain && mainAtom[i][4] !== chain) {
                continue;
            }
            let index = parseInt(i);
            if (index < startId) continue;
            if (index > endId) break;
            let atom = df.tool.getMainAtom(pdbId, i);
            let xyz = atom.posCentered;
            let color;
            if (isSelected) {
                color = atom.color;
            } else {
                color = new THREE.Color(0x17202A);
            }
            atoms[atom.id] = {
                coord: xyz,
                name: atom.name,
                serial: atom.id,
                elem: atom.type,
                resn: atom.resName,
                resi: atom.resid,
                color: color
            };
        }
        let ps = ProteinSurface({
            min: {
                x: limit.x[0],
                y: limit.y[0],
                z: limit.z[0]
            },
            max: {
                x: limit.x[1],
                y: limit.y[1],
                z: limit.z[1]
            },
            atoms: atoms,
            type: df.SURFACE_TYPE,
        });
        let vert = ps.verts;
        let faces = ps.faces;
        let geo = new THREE.Geometry();
        geo.vertices = vert.map(function (v) {
            let r = new THREE.Vector3(v.x, v.y, v.z);
            r.atomid = v.atomid;
            return r;
        });
        geo.faces = faces.map(function (f) {
            return new THREE.Face3(f.a, f.b, f.c);
        });
        geo.computeFaceNormals();
        geo.computeVertexNormals(false);
        let geoC = geo.clone();
        geoC.faces.forEach(function (f) {
            f.vertexColors = ['a', 'b', 'c'].map(function (d) {
                return atoms[geo.vertices[f[d]].atomid].color;
            });
        });
        let mesh = new THREE.Mesh(geoC, new THREE.MeshPhongMaterial({
            vertexColors: THREE.VertexColors,
            wireframe: df.SURFACE_WIREFRAME,
            opacity: df.SURFACE_OPACITY,
            transparent: true,
            specular: 0x888888,
            shininess: 250
        }));
        df.GROUP[pdbId]['surface'].add(mesh);
        df.GROUP[pdbId]['surface'].visible = true;
    },
}