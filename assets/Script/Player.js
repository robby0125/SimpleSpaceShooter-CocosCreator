cc.Class({
    extends: cc.Component,

    properties: {
        movementSpeed: cc.Float,
    },

    onLoad() {
        this.turnRight = false;
        this.turnLeft = false;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {

    },

    // DeltaTime = 1 / current FPS
    update(dt) {
        if (this.turnRight) {
            this.node.x += this.movementSpeed * dt;
        }
        else if (this.turnLeft) {
            this.node.x -= this.movementSpeed * dt;
        }
    },

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.right:
                if (!this.turnRight) {
                    this.turnRight = true;
                }    
            
                break;

            case cc.macro.KEY.left:
                if (!this.turnLeft) {
                    this.turnLeft = true;
                }

                break;
        }
    },

    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.right:
                if (this.turnRight) {
                    this.turnRight = false;
                }   

                break;

            case cc.macro.KEY.left:
                if (this.turnLeft) {
                    this.turnLeft = false;
                }

                break;
        }
    },
});
