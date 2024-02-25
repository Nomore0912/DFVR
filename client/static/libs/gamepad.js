function onTriggerDown(event, raycaster) {
    let controller = event.target;
    let intersections = getIntersections(controller, raycaster);

}

function rayCasterIntersect(raster) {
    for (let i = 0; i < df.pdbId.length; i++) {
        let pdbId = df.pdbId[i];
        for (let index in df.pdbInfoList) {
            let name = df.pdbInfoList[index];
            for (let chain in df.GROUP[pdbId][name]) {
                if (!df.GROUP[pdbId][name][chain].visible) continue;
                let objects = df.GROUP[pdbId][name][chain].children;
                if (objects.length === 0) continue;
                let intersected = raster.intersectObjects(objects, true);
                if (intersected.length > 0) {
                    return intersected[0].object;
                }
            }
        }
    }
    return [];
}

function getIntersections(controller, raster) {
    let tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    let inters = [];
    if (df.showMenu) {

    } else {
        // todo
        let selected = rayCasterIntersect(raster);
        if (selected.length <= 0) {
            return
        }
        let selectInfo = selected
        switch (df.selection) {
            case df.select_all:
                for (let num = 0; num < df.pdbId.length; num++) {
                    let pdbId = df.pdbId[num];
                    for (let index in df.pdbInfoList) {
                        let name = df.pdbInfoList[index];
                        for (let chain in df.GROUP[pdbId][name]) {
                            let objects = df.GROUP[pdbId][name][chain];
                            if (objects.length === 0) continue;
                            inters.push(objects);
                        }
                    }
                }
                break;
            case df.select_main:
                let pdbId = df.pdbId;
                for (let index in df.pdbInfoList) {
                    let name = df.pdbInfoList[index];
                    for (let chain in df.GROUP[pdbId][name]) {
                        let objects = df.GROUP[pdbId][name][chain];
                        if (objects.length === 0) continue;
                        inters.push(objects);
                    }
                }
        }
    }
}