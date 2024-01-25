/**
 * tools for Protein
 */
df.tool = {

    getMainAtom: function (pdbId, id) {
        let atom = w3m.mol[pdbId].atom.main[id];
        if (atom !== undefined) {
            return this.getAtomById(pdbId, atom, 'main');
        } else {
            return undefined;
        }
    },

    getAtomById: function (pdbId, atom, structure) {
        // 从pdb文件中获取属性
        let scope = this;
        let atomID = atom[1];
        let atomName = atom[2];
        let residueName = atom[3];
        let chainName = atom[4];
        let residueID = atom[5];
        let xyz = atom[6];
        let b_factor = atom[7];
        let coe = atom[8];
        let atomType = atom[9];
        let radius = w3m.geometry["radius"][atomType];
        let pos = new THREE.Vector3(xyz[0], xyz[1], xyz[2]);
        // Center of the geometry
        let offset = df.GeoCenterOffset;
        let pos_centered = new THREE.Vector3(
            xyz[0] + offset.x,
            xyz[1] + offset.y,
            xyz[2] + offset.z);
        let color = scope.getColorByIndex(pdbId, atomID, structure);

        return {
            id: atomID,
            name: atomName,
            resName: residueName,
            chainName: chainName,
            resId: residueID,
            pos: pos,
            posCentered: pos_centered,
            bFactor: b_factor,
            coe: coe,
            type: atomType,
            radius: radius,
            color: color
        };
    },
    isDictEmpty: function (dict) {
        return Object.keys(dict).length === 0;
    },
    getFirstAtomIdByChain: function (pdbId, chainName) {
        let first_resid = Object.keys(w3m.mol[pdbId].rep[chainName])[0];
        return this.getFirstAtomByResidueId(first_resid, chainName)[0];
    },
    getFirstAtomByResidueId: function (pdbId, residueId, chainName) {
        let atoms = w3m.mol[pdbId].atom.main;
        let atom = [];
        for (let atomId in atoms) {
            if (atoms[atomId][4] === chainName) {
                let p_residueId = atoms[atomId][5];
                if (residueId === p_residueId) {
                    atom = atoms[atomId];
                    break;
                }
            }
        }
        return atom;
    },
    getColorByIndex: function (pdbId, id, structure) {
        let rId = w3m.mol[pdbId].color[structure][id];
        if (rId) {
            let C_color = w3m.rgb[rId][0];
            let N_color = w3m.rgb[rId][1];
            let O_color = w3m.rgb[rId][2];
            return new THREE.Color(C_color, N_color, O_color);
        } else {
            return new THREE.Color("#ccc");
        }
    },

    savePDB: function (text, filename) {
        let blob = new Blob([text], {
            type: 'text/plain;charset=UTF-8'
        });
        let link = document.createElement('');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.href = URL.createObjectURL(blob);
        link.download = filename || 'ydf.pdb'
        link.click();
    },

    getHetAtom: function (molId, id) {
        let atom = w3m.mol[molId].atom.het[id];
        if (atom !== undefined) {
            return this.getAtomById(molId, atom, 'het');
        }
    },

    // clear tools
    clearMesh: function (mesh) {
        if (mesh.geometry) {
            mesh.geometry.dispose();
        }
        if (mesh.material && mesh.material.dispose) {
            mesh.material.dispose();
        }
        mesh = null;
        return undefined;
    },
    clearChainIndex: function (group) {
        if (group.children !== undefined && group.children.length > 0) {
            let child = group.children;
            for (let i = 0; i < child.length; i++) {
                if (child[i] instanceof THREE.Mesh) {
                    this.clearMesh(child[i]);
                }
            }
            group.children = [];
        }
    },
    clearGroupIndex: function (group) {
        if (group !== undefined) {
            for (let chainId in group) {
                let chain = group[chainId];
                this.clearChainIndex(chain);
            }
        }
    },
}