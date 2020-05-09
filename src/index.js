import * as BABYLON from 'babylonjs';
console.log('Hello');

console.log('running');
let canvas = document.getElementById("renderCanvas");

let engine = null;
let scene = null;
let sceneToRender = null;

// create engine
let createDefaultEngine = function () {
    return new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
};

// create scene
let createScene = function() {
    let scene = new BABYLON.Scene(engine);

    let camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);

    camera.attachControl(canvas, true);

    let light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene);
    let light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    light1.intensity =0.75;
    light2.intensity =0.5;

    let box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    box.position.x = 2;

    let frameRate = 10;

    //Position Animation
    let xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    let keyFramesP = [];

    keyFramesP.push({
        frame: 0,
        value: 2
    });

    keyFramesP.push({
        frame: frameRate,
        value: -2
    });

    keyFramesP.push({
        frame: 2 * frameRate,
        value: 2
    });


    xSlide.setKeys(keyFramesP);

    //Rotation Animation
    let yRot = new BABYLON.Animation("yRot", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    let keyFramesR = [];

    keyFramesR.push({
        frame: 0,
        value: 0
    });

    keyFramesR.push({
        frame: frameRate,
        value: Math.PI
    });

    keyFramesR.push({
        frame: 2 * frameRate,
        value: 2 * Math.PI
    });


    yRot.setKeys(keyFramesR);

    scene.beginDirectAnimation(box, [xSlide, yRot], 0, 2 * frameRate, true);

    return scene;
};


engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();

sceneToRender = scene;

engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
