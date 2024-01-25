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
        let geometry = new THREE.SphereGeometry(radius, w, w);
        let material = new THREE.MeshPhongMaterial({
            bumpScale: bumpScale,
            color: color,
            specular: specularColor,
            reflectivity: beta,
            shininess: specularShininess
        });

        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = atom.caid;
        mesh.position.copy(point);
        mesh.userData = {
            presentAtom: atom
        };
        df.GROUP[pdbId][type][chain].add(mesh);
    },


}