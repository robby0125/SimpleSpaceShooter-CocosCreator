cc.Class({
    extends: cc.Component,

    ctor() {
        this.meteorSpeed = 300;
    },

    start () {

    },

    update (dt) {
        this.node.y -= this.meteorSpeed * dt;
    },
});
