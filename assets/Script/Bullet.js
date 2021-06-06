cc.Class({
    extends: cc.Component,

    ctor() {
        this.bulletSpeed = 500;
    },

    start () {

    },

    update(dt) {
        this.node.y += this.bulletSpeed * dt;
    },
});
