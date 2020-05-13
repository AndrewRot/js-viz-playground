import { Animation } from 'babylonjs/Animations/animation';

export function horizontalMovement(frameRate) {
    let animation = new Animation("xSlide", "position.x", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

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

    animation.setKeys(keyFramesP);

    return animation;
}

