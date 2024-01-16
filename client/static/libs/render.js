// initVR
var container;
var camera, scene, renderer;
var canon = new THREE.Object3D();
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
    initSceneGroup: function () {
        // df.group
        for (let gName in df.GROUP_DICT) {
            df.GROUP[gName] = new THREE.Group();
        }
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





    }
}