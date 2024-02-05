df.controller = {
    init: function () {
        // this.createMenu();
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
                    df.loader.load(file, 'file', function () {
                        this.drawGeometry(df.config.mainMode);
                        this.drawGeometry(df.config.hetMode);
                    });
                }
            }
        });

        let b_showWater = document.getElementById("showWater");
        b_showWater.addEventListener('click', function (e) {
            df.isShowWater = e.target.checked;
            df.painter.showWater();
            this.drawGeometry(df.config.hetMode);
        });

        // todo
        let docking = document.getElementById("Docking");
        // 生成 DOCKING_BUTTON
        docking.addEventListener('click', function (e) {
            df.DOCKING_BUTTON.forEach(function (buttonInfo) {
                // 创建按钮元素
                let button = document.createElement("button");
                button.textContent = buttonInfo.name;
                button.id = buttonInfo.name;

                // 添加点击事件处理程序
                button.addEventListener("click", function () {
                    // 这里添加按钮点击后的功能
                    console.log("Button clicked: " + buttonInfo.hostname);
                });
                docking.appendChild(button);
            });
        });
    },
    drawGeometry: function (type, pdbId) {
        df.tool.showSegmentHolder(true, function () {
            if (w3m.mol[pdbId] === undefined) return;
            if (type >= df.HET) {
                df.painter.showHet(type, pdbId);
            } else {
                df.painter.showAllResidues(type, pdbId);
            }
            df.tool.showSegmentHolder(false);
        });
    },
    refreshGeometryByMode: function (type) {
        if (type < df.HET) {
            df.render.clear(0);
            this.drawGeometry(type);
        } else {
            df.render.clear(1);
            this.drawGeometry(type);
        }
    },
}