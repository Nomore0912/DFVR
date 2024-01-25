// initVR
var container;
var camera, scene, renderer, rayCaster;
var canon = new THREE.Object3D();
var lightType = 0;
// initVR -- controls
var controls, leftController, leftControllerGrip, rightController, rightControllerGrip;


df.render = {
    vrScene: function () {
        let newScene = new THREE.Scene();
        // 背景: 深蓝色
        newScene.background = new THREE.Color(0x17202A);
        // 创建一个半球光源 HemisphereLight(skyColor, groundColor)
        const hemisphereLight = new THREE.HemisphereLight(0x74B9FF, 0x2C3E50);
        newScene.add(hemisphereLight);
        return newScene;
    },
    vrCamera: function () {
        // 创建透视相机，参数分别是：视场角，宽高比，近剪裁面距离，远剪裁面距离
        let newCamera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 50000);
        // 设置相机初始位置
        newCamera.position.set(0, 1.6, 300);
        return newCamera;
    },
    nonVrControls: function (cameras, divs) {
        return new THREE.OrbitControls(cameras, divs);
    },
    addLightsByType: function (lightType) {
        if (lightType === 0) {
            let light = new THREE.DirectionalLight(0xF8D5A3, 1.2);
            light.position.copy(camera.position);
            camera.add(light);
        }
    },
    initSceneGroup: function () {
        // df.group
        for (let gName in df.GROUP_DICT) {
            df.GROUP[gName] = new THREE.Group();
        }
    },
    initRender: function () {
        let renderer = new THREE.WebGLRenderer({
            antialias: true,
            gammaOutput: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        renderer.xr.enabled = true;
        return renderer;
    },
    createController: function (renderer, camera, num) {
        let controller = renderer.xr.getController(num);
        camera.add(controller);
        return controller;
    },
    createControllerGrip: function (renderer, camera, modelFactory, num) {
        let controllerGrip = renderer.xr.getControllerGrip(num);
        controllerGrip.add(modelFactory.createControllerModel(controllerGrip));
        camera.add(controllerGrip);
        return controllerGrip;
    },
    createControllerLine: function () {
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3));
        let material = new THREE.LineBasicMaterial({
            vertexColors: true,
            linewidth: 100,
            blending: THREE.AdditiveBlending
        });
        let line = new THREE.Line(geometry, material);
        line.name = 'line';
        line.scale.z = 5;
        return line;
    },
    initVR: function () {
        // 创建一个模块
        container = document.createElement('div');
        document.body.appendChild(container);
        // Scene
        scene = this.vrScene();
        // Camera
        camera = this.vrCamera;
        // 移动 Camera
        canon.add(camera);
        scene.add(canon);
        // 在 web 页面中旋转移动 pdb
        controls = this.nonVrControls(camera, container);
        controls.target.set(0, 1.6, 0);
        controls.update();
        // 初始化 scene group;
        this.initSceneGroup();
        this.addLightsByType(lightType);
        // init VR render
        renderer = this.initRender();

        document.body.appendChild(VRButton.createButton(renderer));
        // 监听 vr
        renderer.xr.addEventListener('sessionstart', () => {
        });
        renderer.xr.addEventListener('sessionend', () => {
        });

        // xr
        leftController = this.createController(renderer, canon, 0);
        rightController = this.createController(renderer, canon, 1);

        let controllerModelFactory = new THREE.XRControllerModelFactory();
        leftControllerGrip = this.createControllerGrip(renderer, canon, controllerModelFactory, 0);
        rightControllerGrip = this.createControllerGrip(renderer, canon, controllerModelFactory, 1);
        // 射线
        let leftLine = this.createControllerLine();
        let rightLine = this.createControllerLine();
        leftController.add(leftLine);
        rightController.add(rightLine);

        rayCaster = new THREE.Raycaster();
        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    },
    clear: function (mode) {
        THREE.Cache.clear();
    },

}