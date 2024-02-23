function onTriggerDown(event, raycaster) {
    let controller = event.target;
    let intersections = getIntersections(controller, raycaster);

}

function getIntersections(controller, raycaster) {
    let tempMatrix = new THREE.Matrix4();
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    let inters = [];
    if (df.showMenu) {

    } else {
        // todo
        switch (df.selection) {
            // case df.select_all:
            //     for (let i in df.) {
            //
            //     }


            // case df.select_main:
                //


        }
    }
}