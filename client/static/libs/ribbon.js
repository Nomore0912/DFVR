/**
 * all ribbon structure function by Dan Feng
 */
ribbon = {
    drawTube: function (pdbId, chain, ids, points, steps, radius, radialSegments, color) {
        // points: Catmull-Rom插值曲线构造tube
        let pathSpline = new THREE.CatmullRomCurve3(points);
        let geometry = new THREE.TubeBufferGeometry(
            pathSpline,
            steps,
            radius,
            radialSegments,
            false);
        let materials = [new THREE.MeshPhongMaterial({
            color: color
        })];
        materials.side = THREE.FrontSide;
        let mesh = new THREE.Mesh(geometry, materials);

        // mesh info
        let atom = df.tool.getMainAtom(pdbId, ids[0]);
        mesh.name = atom.id;
        mesh.userData = {
            group: chain,
            presentAtom: atom,
            repType: "tube"
        };
        // 数据存储地方
        df.GROUP[pdbId][chain].add(mesh);
    },

}