cc.Class({
    extends: cc.Component,

    properties: {
        background: {
            default: [],
            type: cc.Node,
        },
        speed: cc.Float,
        bulletPrefab: cc.Prefab,
        player: cc.Node,
        meteorPrefab: cc.Prefab,
    },

    ctor() {
        this.bullets = [];
        this.meteors = [];
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.director.getCollisionManager().enabled = true;
    },

    start() {
        cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .delay(2)
                    .call(_ => this.spawnMeteor())
            )
            .start();
    },

    update(dt) {
        for (let i = 0; i < this.background.length; i++) {
            this.background[i].y -= this.speed * dt;
        }

        if (this.background[1].y <= 0) {
            this.background[0].y += 1080;

            [this.background[0], this.background[1]] = [this.background[1], this.background[0]];
        }

        for (let i = 0; i < this.bullets.length; i++) {
            let bulletCollider = this.bullets[i].getComponent(cc.Collider);

            for (let j = 0; j < this.meteors.length; j++) {
                let meteorCollider = this.meteors[j].getComponent(cc.Collider);

                if (cc.Intersection.polygonPolygon(bulletCollider.world.points, meteorCollider.world.points)) {
                    // TODO : IMPLEMENT COLLIDED EVENT HERE
                }
            }
        }
    },

    onKeyDown(event) {
        if (event.keyCode == cc.macro.KEY.space) {
            let bulletNode = cc.instantiate(this.bulletPrefab);
            bulletNode.parent = this.node;
            bulletNode.x = this.player.x;
            this.bullets.push(bulletNode);
        }
    },

    spawnMeteor() {
        let meteorNode = cc.instantiate(this.meteorPrefab);
        meteorNode.parent = this.node;
        meteorNode.x += 144 * (4 * Math.random());
        this.meteors.push(meteorNode);
    },
});
