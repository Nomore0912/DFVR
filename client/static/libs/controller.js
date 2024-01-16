df.controller = {
    init: function () {
        this.createMenu();
        if (df.mode === df.MODE_VR) {
            df.render.initVR();
        }
    }

}