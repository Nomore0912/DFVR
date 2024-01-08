/**
 * tools for Protein
 */
df.tool = {

    getMainAtom: function (pdbId, id) {
        let scope = this;
        let atom = w3m.mol[pdbId].atom.main[id];
        if (atom !== undefined) {
            return scope.getAtomById(pdbId, atom, 'main');
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
}