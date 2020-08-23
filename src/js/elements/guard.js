class Guard extends PlayerSpotter {
    constructor(level, cycleDefinition) {
        super(level);
        this.cycleDefinition = cycleDefinition;
        this.maxDistance = GUARD_MAX_DISTANCE;
        this.halfFov = GUARD_HALF_FOV;
        this.facing = 1;
        this.facingScale = 1;
        this.radius = PLAYER_RADIUS;
    }

    cycle(e) {
        const { facing } = this;

        if (!this.foundPlayer) {
            this.cycleDefinition.update(this, this.level.clock);
        } else {
            this.facing = sign(this.level.player.x - this.x);
            this.walking = false;
        }

        // If the guard is facing back, add a quick 180 degrees
        this.angle = this.facing > 0 ? 0 : PI;

        super.cycle(e);

        if (facing != this.facing) {
            interp(this, 'facingScale', -1, 1, 0.1);
        }
    }

    render() {
        super.render();

        wrap(() => {
            translate(this.x, this.y);

            renderPlayer(
                R,
                GUARD_BODY,
                true,
                this.facing * this.facingScale,
                this.walking,
                0
            );
        });
    }
}
