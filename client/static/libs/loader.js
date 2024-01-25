df.loader = {
    load: function (file, type) {
        let pdbId;
        switch (type) {
            case 'file':
                pdbId = file.name.split(".")[0].trim();
                pdbId = pdbId.toLowerCase();
                if (!pdbId) {
                    pdbId = 'yang'
                }
                this.loadTextFromPDB(pdbId, file, this.callBackLoading);
                break;
            case 'name':
                pdbId = file.split(".")[0].trim();
                pdbId = pdbId.toLowerCase();
                if (!pdbId) {
                    pdbId = 'yang'
                }
                this.loadTextFromRequest(pdbId, file, this.callBackLoading);
                break;
        }
    },
    // todo 需要想一想 如何限制空间
    getCenterOffset: function () {
        let limit = w3m.global.limit;
        let x = -(limit.x[0] + limit.x[1]) / 2;
        let y = -(limit.y[0] + limit.y[1]) / 2;
        let z = -(limit.z[0] + limit.z[1]) / 2;
        df.GeoCenterOffset = new THREE.Vector3(x, y, z);
    },
    callBackLoading: function (pdbId, error, content) {
        if (error) {
            console.log(error);
        }
        // 处理 pdb
        w3m.pdb(content, pdbId);
        w3m.api.switchRepModeMain(w3m.LINE);
        w3m.api.switchRepModeMain(w3m.BACKBONE);
        w3m.api.switchRepModeMain(w3m.CUBE);
        w3m.api.switchRepModeMain(w3m.CARTOON);

        df.GROUP[pdbId] = {};
        df.GROUP[pdbId]['main'] = {};
        df.GROUP[pdbId]['het'] = {};
        df.GROUP[pdbId]['water'] = {};
        df.GROUP_MAIN_INDEX[pdbId] = [];
        df.GROUP_HET_INDEX[pdbId] = [];
        df.GROUP_STRUCTURE_INDEX[pdbId] = [];

        for (let chain in w3m.mol[pdbId].chain) {
            let firstAtomId = df.tool.getFirstAtomIdByChain(pdbId, chain);
            df.GROUP[pdbId]['main'][chain] = new THREE.Group();
            df.GROUP[pdbId]['main'][chain].name = chain;
            df.GROUP[pdbId]['main'][chain].userData["presentAtom"] = df.tool.getMainAtom(pdbId, firstAtomId);
            if (!df.pptShow) {
                scene.add(df.GROUP[pdbId]['main'][chain]);
            }
            df.GROUP_MAIN_INDEX[pdbId].push(chain);
            df.GROUP_STRUCTURE_INDEX[pdbId].push(chain);
        }
        // Main Het
        df.GROUP_MAIN_INDEX[pdbId].push(df.GROUP_MAIN);
        df.GROUP_HET_INDEX[pdbId].push(df.GROUP_HET);
        df.GROUP_HET_INDEX[pdbId].push(df.GROUP_WATER);
        // structure
        df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_MAIN);
        df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_WATER);
        df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_HET);
        df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_SURFACE);
        // df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_AXIS);
        // df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_INFO);
        // df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_MUTATION);
        // df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_DRUG);
        // df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_SLICE);
        // df.GROUP_STRUCTURE_INDEX[pdbId].push(df.GROUP_BOND);
    },
    loadTextFromPDB: function (pdbId, file, callback) {
        let io = new FileReader();
        io.onload = function (event) {
            let e = event || window.event;
            let textContent = e.target.result;
            callback(pdbId, null, textContent);
        };
        io.onerror = function (event) {
            callback(pdbId, 'File Error: ' + event.target.error, null);
        };
        io.readAsText(file);
    },
    loadTextFromRequest: function (pdbId, file, callback) {
        let url_index = 0;
        let io = new XMLHttpRequest();
        io.onload = function () {
            if (io.status === 200) {
                let responseText = io.responseText;
                callback(pdbId, null, responseText);
            }
        }
        io.onerror = function (event) {
            if (url_index <= df.remoteUrl.length) {
                url_index++;
                this.loadTextFromRequest(pdbId, file, callback);
            } else {
                callback(pdbId, 'File Error: ' + event.target.error, null);
            }
        }
        let url = df.remoteUrl[url_index] + file + ".pdb";
        io.open('GET', url, true);
        io.send();
    },
}