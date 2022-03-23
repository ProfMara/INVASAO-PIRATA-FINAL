class BalaCanhao {
    constructor(x, y) {
        var options = {
            isStatic: true
        };
        this.r = 30;
        this.speed = 0.05;
        this.body = Bodies.circle(x, y, this.r / 2, options);
        this.image = loadImage("./assets/cannonball.png");
        this.animation = [this.image];
        this.trajectory = [];
        this.afundou = false;
        World.add(world, this.body);
    }

    animate() {
        this.speed += 0.05;
    }

    remove(index) {
        this.afundou = true;

        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

        //código que verifica se a bala caiu na água
        if (balas[index].body.position.y >= height - 50) {
            //código para tocar o som de splash

            this.animation = aguaSplashAnimacao;
            this.speed = 0.05;
            this.r = 150;
        }

        setTimeout(() => {
            Matter.World.remove(world, this.body);
            delete balas[index];
        }, 500);
    }

    atirar() {
        //código para tocar o som de tiro


        var novoAngulo = canhao.angle - 28;
        novoAngulo = novoAngulo * (3.14 / 180)
        var v = p5.Vector.fromAngle(novoAngulo);
        v.mult(90 / 3.14);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, { x: v.x, y: v.y });
    }

    display() {
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.animation.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, 0, this.r, this.r);
        pop();

        if (this.body.velocity.x > 0 && pos.x > 10 && !this.isSink) {
            var position = [pos.x, pos.y];
            this.trajectory.push(position);
        }

        for (var i = 0; i < this.trajectory.length; i++) {
            image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
    }
}