df.drawer = {
    drawSphere: function (pdbId, type, chain, point, color, radius, atom, w) {
        let alpha = 0.5;
        // 物体表面的反射率，控制镜面反射的强度，值范围一般在0到1之间
        let beta = 0.5;
        // 凹凸贴图的缩放因子，控制凹凸的强度
        let bumpScale = 1;
        // 镜面高光的强度，值越高，高光范围越小，看起来越集中
        let specularShininess = Math.pow(2, alpha * 10);
        // 镜面高光颜色，即光照射到物体表面产生的高光部分的颜色
        let specularColor = new THREE.Color(beta * 0.2, beta * 0.2, beta * 0.2);
        let geometry = new THREE.SphereBufferGeometry(radius, w, w);
        let material = new THREE.MeshPhongMaterial({
            bumpScale: bumpScale,
            color: color,
            specular: specularColor,
            reflectivity: beta,
            shininess: specularShininess
        });

        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = df.tool.atomCaId(atom);
        mesh.position.copy(point);
        mesh.userData = {
            presentAtom: atom
        };
        // het
        df.GROUP[pdbId][type][chain].add(mesh);
    },
    drawStick: function (pdbId, type, chain, start, end, radius, color, atom) {
        let distance = start.distanceTo(end);
        let geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            distance,
            df.config.stick_radius,
            1,
            false);
        let material = new THREE.MeshPhongMaterial({
            color: color,
            wireframe: false
        });
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, distance / 2, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));
        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = df.tool.atomCaId(atom);
        mesh.position.copy(start);
        mesh.lookAt(end);
        mesh.userData = {
            presentAtom: atom
        };
        df.GROUP[pdbId][type][chain].add(mesh);
    },
    drawTube: function (path, radius, color, atom, pdbId, type, chain) {
        let Catmull = new THREE.CatmullRomCurve3(path);
        let step = path.length - 1;
        let geometry = new THREE.TubeGeometry(Catmull, step, radius, df.config.tubesegment, false);
        let materials = [new THREE.MeshPhongMaterial({
            color: color
        })];
        materials.side = THREE.FrontSide;
        let mesh = new THREE.Mesh(geometry, materials);
        mesh.name = atom.id;
        mesh.userData = {
            presentAtom: atom,
            repType: "tube"
        };
        df.GROUP[pdbId][type][chain].add(mesh);
    },
    drawEllipse: function (path, radius, color, object, pdbId, type, chain, resId, step) {
        let Catmull = new THREE.CatmullRomCurve3(path);
        let extrudeSettings = {
            steps: step,
            bevelEnabled: true,
            extrudePath: Catmull,
            frames: object
        };
        let t = df.config.ellipse_radius_multiple;
        let curve = new THREE.EllipseCurve(
            0, 0,            // 中心点
            t * radius, radius, // x轴半径和y轴半径
            0, Math.PI * 2,  // 开始和结束角度
            false,            // 是否逆时针方向
            0                 // 旋转角度
        );
        let shape = new THREE.Shape();
        shape.curves.push(curve);
        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        let material = new THREE.MeshPhongMaterial({
            color: color,
            wireframe: false
        });
        material.side = THREE.FrontSide;
        let mesh = new THREE.Mesh(geometry, material);
        let atom = df.tool.getMainAtom(pdbId, resId);
        mesh.name = atom.id;
        mesh.userData = {
            presentAtom: atom,
            repType: "tube"
        };
        df.GROUP[pdbId][type][chain].add(mesh);
    },
    drawArrowByPaths: function (pdbId, type, chain, path, color, atomId) {
        let geometry = new THREE.Geometry();
        geometry.vertices = path;
        let materials = new THREE.MeshPhongMaterial({
            color: color,
            side: THREE.DoubleSide
        });
        for (let i = 0; i < path.length; i = i + 4) {
            if (path[i + 7] !== undefined) {
                let face1 = new THREE.Face3(i, i + 1, i + 4);
                face1.materialIndex = 0;
                let face3 = new THREE.Face3(i + 5, i + 2, i + 1);
                face3.materialIndex = 0;
                let face5 = new THREE.Face3(i + 6, i + 3, i + 2);
                face5.materialIndex = 0;
                let face7 = new THREE.Face3(i + 7, i, i + 3);
                face7.materialIndex = 0;
                let face10 = new THREE.Face3(i + 5, i + 4, i + 1);
                face10.materialIndex = 0;
                let face12 = new THREE.Face3(i + 6, i + 5, i + 2);
                face12.materialIndex = 0;
                let face14 = new THREE.Face3(i + 7, i + 6, i + 3); //--
                face14.materialIndex = 0;
                let face16 = new THREE.Face3(i + 7, i + 4, i); //--
                face16.materialIndex = 0;

                geometry.faces.push(face1);
                geometry.faces.push(face3);
                geometry.faces.push(face5);
                geometry.faces.push(face7);
                geometry.faces.push(face10);
                geometry.faces.push(face12);
                geometry.faces.push(face14);
                geometry.faces.push(face16);
            }
        }
        let preFace1 = new THREE.Face3(0, 1, 2);
        preFace1.materialIndex = 0;
        geometry.faces.push(preFace1);
        let preFace2 = new THREE.Face3(2, 3, 0);
        preFace2.materialIndex = 0;
        geometry.faces.push(preFace2);
        let lastFace1 = new THREE.Face3(path.length - 4, path.length - 3, path.length - 2);
        lastFace1.materialIndex = 0;
        geometry.faces.push(lastFace1);
        let lastFace2 = new THREE.Face3(path.length - 2, path.length - 1, path.length - 4);
        lastFace2.materialIndex = 0;
        geometry.faces.push(lastFace2);
        geometry.computeFlatVertexNormals();
        geometry.computeBoundingSphere();
        let mesh = new THREE.Mesh(geometry, materials);
        mesh.name = atomId;
        let atom = df.tool.getMainAtom(pdbId, atomId);
        mesh.userData = {
            presentAtom: atom,
            repType: "tube",
            realType: "arrow"
        };
        df.GROUP[pdbId][type][chain].add(mesh);
    }
}