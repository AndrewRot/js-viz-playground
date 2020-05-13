// import { Engine, Scene, ArcRotateCamera, DirectionalLight, HemisphericLight, MeshBuilder, Animation, Vector3 } from 'babylonjs';
import { Engine } from 'babylonjs/Engines/engine';
import { Scene } from 'babylonjs/scene';
import { ArcRotateCamera } from 'babylonjs/Cameras/arcRotateCamera';
import { DirectionalLight } from 'babylonjs/Lights/directionalLight';
import { HemisphericLight } from 'babylonjs/Lights/hemisphericLight';
import { MeshBuilder } from 'babylonjs/Meshes/meshBuilder';
import { Animation } from 'babylonjs/Animations/animation';
import { Vector3 } from 'babylonjs/Maths/math.vector';

import { horizontalMovement } from './motionTweens/horizontalMovement';
import { verticalMovement } from './motionTweens/verticalMovement';

// Grab the canvas from index.html
let canvas = document.getElementById("renderCanvas");

let engine = null;
let scene = null;
let sceneToRender = null;

// TODO - strip away all custom code and move to libraries
// Create keybinding mapping here
//  Think about potentially different kinds of keymapping units like
// press a key - then the 1-9 keys are to control the intensity...
// See if I can make use of the touchbar or mouse on macbook pro for smoother gradients


// create engine
let createDefaultEngine = function () {
    return new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
};

// create scene
let createScene = function() {
    let scene = new Scene(engine);

    let camera = new ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 4, 10, Vector3.Zero(), scene);

    camera.attachControl(canvas, true);

    let light1 = new DirectionalLight("DirectionalLight", new Vector3(0, -1, 1), scene);
    let light2 = new HemisphericLight("HemiLight", new Vector3(0, 1, 0), scene);
    light1.intensity =0.75;
    light2.intensity =0.5;

    let box = MeshBuilder.CreateBox("box", {}, scene);
    box.position.x = 2;

    let frameRate = 10;

    //Rotation Animation
    let yRot = new Animation("yRot", "rotation.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

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

    scene.beginDirectAnimation(box, [horizontalMovement(frameRate), yRot], 0, 2 * frameRate, true);

    scene.rotateAnimation = () => {
        scene.stopAllAnimations();
        scene.beginDirectAnimation(box, [verticalMovement(frameRate), yRot], 0, 2 * frameRate, true);
    };

    scene.rotateAnimation2 = () => {
        scene.stopAllAnimations();
        scene.beginDirectAnimation(box, [horizontalMovement(frameRate), yRot], 0, 2 * frameRate, true);
    };

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

window.addEventListener('keyup', (event) => {
    if (event.code === 'KeyA') scene.rotateAnimation();
    if (event.code === 'KeyB') scene.rotateAnimation2();

    console.log('Key pressed:', event.code);
    // document.getElementById('test').innerHTML = 'playerSpriteX = ' + playerSpriteX;
});
