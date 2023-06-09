import { Mesh } from "three";
import { Stuff } from "./Stuff";
import { cm1, geo, mat, sounds } from "./common";

export class Glass extends Stuff {
  constructor(info) {
    //부모 클래스(Stuff) 호출하겠다는 뜻
    super(info);

    this.type = info.type;
    this.step = info.step;
    this.sound = sounds[this.type];

    this.geometry = geo.glass;
    switch (this.type) {
      case "normal":
        this.material = mat.glass1;
        this.mass = 1;
        break;
      case "strong":
        this.material = mat.glass2;
        this.mass = 0;
        break;
    }
    // this.material = mat.glass;

    this.width = this.geometry.parameters.width;
    this.height = this.geometry.parameters.height;
    this.depth = this.geometry.parameters.depth;

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.name = this.name;
    this.mesh.step = this.step;
    this.mesh.type = this.type;
    cm1.scene.add(this.mesh);

    this.setCannonBody();

    this.cannonBody.addEventListener("collide", playSound);

    const sound = sounds[this.type];
    function playSound(e) {
      const strength = e.contact.getImpactVelocityAlongNormal();
      if (strength > 5 && strength < 10) {
        sound.currentTime = 0;
        sound.play();
      }
    }
  }
}
