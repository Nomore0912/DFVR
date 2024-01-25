df.painter = {
    showHet: function (type, pdbId) {
        switch (type) {
            case df.HET_LINE:
                this.showHet_Line(pdbId);
                break;

        }
    },
    showHet_Line: function (molId) {
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
    showAllResidues: function (type, pdbId) {
        if (type === PDB.config.surfaceMode) {
            df.painter.showSurface(1, w3m.mol[pdbId].atom.main.length, true);
        } else {
            let residueData = w3m.mol[pdbId].residueData;
            for (let chain in residueData) {
                if (PDB.residueGroupObject[chain] == undefined) {
                    PDB.residueGroupObject[chain] = {};
                }

            }
        }
    },
}