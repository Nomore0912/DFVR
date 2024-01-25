df.controller = {
    init: function () {
        this.createMenu();
        if (df.mode === df.MODE_VR) {
            df.render.initVR();
        }
    },
    createMenu: function () {
        // =============================== Mode for structure =======================
        // 上传文件
        let b_upload = document.getElementById("upload_button");
        b_upload.addEventListener('change', function () {
            if (this.files.length > 0) {
                for (let i in this.files) {
                    let file = this.files[i];
                    df.loader.load(file, 'file');
                }
            }
        });
    },
    drawGeometry: function (type, pdbId) {
        if (w3m.mol[pdbId] === undefined) return;
        if (type >= df.HET) {
            df.painter.showHet(type, pdbId);
        } else {
            df.painter.showAllResidues(type, pdbId);
        }
    },
}