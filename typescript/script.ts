/// <reference path="./enchantjs.d.ts" />
import Loader from "./loader";
import parts from "./parts";

enchant();
window.onload = function () {
    const game = new Game(400, 600);
    game.fps = 60;
    // const pImgs = Loader.ImageLoader(game);
    // const pMscs = Loader.SoundLoader(game);

    let score = 0;
    let time = 0;
    game.preload('./image/newspaper.png');
    game.preload('./image/ball_pink.png');
    // game.preload('./image/background.png');
    game.preload('./image/back.jpg');
    game.preload('./image/house.png');
    game.preload('./sound/hit.mp3');
    game.preload('./sound/clear.mp3');
    let firstClick = 0;
    let stage = 1; //初期ステージ
    game.onload = function () {
        const setScene = function (sceneNum: number) {
            const scene = new Scene();
            const bg = parts.SpritePoint(game.assets['./image/back.jpg'], 0, 0, 0, 400, 600);
            scene.addChild(bg);
            scene.backgroundColor = "black";
            try {
                game.popScene();
            } catch (e) {
                console.log("it is initial Scene");
            }
            game.pushScene(scene);
            switch (sceneNum) {
                case 0: {
                    const points = [];
                    let wk;
                    if (stage == 1) {
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 0, 51, 400, 0, 0);
                        points.push(wk);
                        scene.addChild(wk);
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 1, 200, 400, 0, 0);
                        points.push(wk);
                        scene.addChild(wk);
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 2, 400, 400, 0, 0);
                        points.push(wk);
                        scene.addChild(wk);
                    } else if (stage == 2) {
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 0, 20, 200, 0, 0);
                        points.push(wk);
                        scene.addChild(wk);
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 1, 200, 200, 0, 0);
                        points.push(wk);
                        scene.addChild(wk);
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 2, 380, 200, 0, 0);
                        points.push(wk);
                        scene.addChild(wk);
                    } else if (stage == 3) {
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 0, 50, 200, 0, 1);
                        points.push(wk);
                        scene.addChild(wk);
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 1, 200, 400, -1, 1);
                        points.push(wk);
                        scene.addChild(wk);
                        wk = parts.SpriteTarget(game.assets['./image/house.png'], 2, 350, 300, 1, 0);
                        points.push(wk);
                        scene.addChild(wk);
                    } else if (stage == 4) {
                        for (let idx = 0; idx < 6; idx++) {
                            wk = parts.SpriteTarget(game.assets['./image/house.png'], rand(7), rand(400), 100 + rand(300), Math.random() * 3, Math.random() * 3);
                            points.push(wk);
                            scene.addChild(wk);
                        }
                    } else if (stage == 5) {
                        for (let idx = 0; idx < 20; idx++) {
                            wk = parts.SpriteTarget(game.assets['./image/house.png'], rand(7), rand(400), 100 + rand(300), Math.random() * 10, Math.random() * 10);
                            points.push(wk);
                            scene.addChild(wk);
                        }
                    } else if (stage == 6) {
                        for (let idx = 0; idx < 20; idx++) {
                            wk = parts.SpriteTarget(game.assets['./image/house.png'], rand(7), rand(400), 100 + rand(300), Math.random() * 10, Math.random() * 10);
                            points.push(wk);
                            scene.addChild(wk);
                        }
                    }


                    const label = parts.Label("");
                    scene.addChild(label);
                    const showLabel = function () {
                        label.text = "stage:" + stage;
                    }
                    showLabel();

                    const labelTime = parts.Label("");
                    labelTime.x = 100;
                    scene.addChild(labelTime);
                    const showLabelTime = function () {
                        labelTime.text = "time:" + time;
                    }
                    showLabelTime();

                    const ball = parts.SpriteAccel(game.assets['./image/newspaper.png'], 0, 200, 550, 0, 0);
                    scene.addChild(ball);
                    // const back = new Sprite(20, 20);
                    // back.image = game.assets[pImgs[1]];
                    // back.moveTo(100, 100);
                    // back.time = 0;
                    // scene.addChild(back);
                    // 毎フレームで実行するイベントハンドラ
                    scene.onenterframe = function () {
                        // 時間で終了
                        if (this.age > game.fps * 60) setScene(1);
                        if (this.age % game.fps == 0) {
                            time++;
                            showLabelTime();
                        }
                        if (points.length == 0) {
                            if (stage == 5) {
                                //クリア
                                let sound = game.assets['./sound/clear.mp3'].clone(); //同じ音を重ねるためCloneが必要
                                sound.play();
                                stage = 1;
                                setScene(3);
                            } else {
                                //インターバル
                                stage += 1;
                                setScene(4);
                            }
                        }
                        points.forEach(function (point, i) {
                            //console.log(point.x);
                            if (ball.within(point, (point.width * point.scaleX + ball.width * ball.scaleX) / 2 * 0.9)) {
                                scene.removeChild(point);
                                points.splice(i, 1);
                                let sound = game.assets['./sound/hit.mp3'].clone(); //同じ音を重ねるためCloneが必要
                                sound.play();
                                return;
                            }
                            if (stage == 6) {

                            }
                        });
                    }
                    // クリック時に実行するイベントハンドラ
                    // back.ontouchend = function () {
                    //     console.log("touchend");
                    //     game.assets[pMscs[1]].clone().play(); //音を鳴らす
                    //     score++; // グローバル変数のスコアを１増やす
                    //     showLabel(); // スコアを反映
                    //     // MEMO: 作っちゃうおじさん謹製のテキストバウンドモジュールを使用する例
                    //     const label = parts.TextBound("+2", this.x, this.y, 32, "orange", 60);
                    //     scene.addChild(label);
                    //     if (score >= 3) {
                    //         score = 0;
                    //         setScene(1);
                    //     }
                    // }
                    scene.ontouchstart = function (e) {
                        const puller = parts.SpriteLifeTime(game.assets['./image/ball_pink.png'], 0, e.x, e.y, 20);
                        scene.addChild(puller);
                        //吸引
                        if (firstClick == 0) {
                            ball.ax += (puller.x - ball.x) / 10;
                            ball.ay += (puller.y - ball.y) / 10;
                            firstClick += 1;
                        } else {
                            ball.ax += (puller.x - ball.x) / 30;
                            ball.ay += (puller.y - ball.y) / 30;
                        }
                    }
                    break;
                }
                case 1: {
                    const btn = parts.Button("もういちど");
                    btn.moveTo(150, 200);
                    scene.addChild(btn);
                    btn.ontouchend = function () {
                        time = 0;
                        setScene(0);
                    }
                    break;
                }
                case 2: {
                    const btn = parts.Button("すたーと");
                    btn.moveTo(150, 200);
                    scene.addChild(btn);
                    btn.ontouchend = function () {
                        setScene(0);
                    }
                    break;
                }
                case 3: {
                    const btn = parts.Button("くりあタイム：" + time + "秒");
                    btn.moveTo(100, 200);
                    scene.addChild(btn);
                    btn.ontouchend = function () {
                        stage = 1;
                        time = 0;
                        setScene(0);
                    }
                    break;
                }
                case 4: {
                    const btn = parts.Button("すてーじ" + stage);
                    btn.moveTo(150, 200);
                    scene.addChild(btn);
                    btn.ontouchend = function () {
                        setScene(0);
                    }
                    break;
                }
            }
        }
        setScene(2);
    }
    game.start();
}
function rand(n) {
    return Math.floor(Math.random() * (n + 1));
}
