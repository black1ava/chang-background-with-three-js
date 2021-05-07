class Background{
  constructor(){
    this._init();
  }

  _init = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 3000);
    this.camera.position.set(0, 0, 0.1);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(innerWidth, innerHeight);
    document.querySelector('#canvas').appendChild(this.renderer.domElement);

    window.addEventListener('resize', this._onWindowResize, false);

    document.querySelector('#night').addEventListener('click', () => {
      this._changeScene('night');
    });

    document.querySelector('#mountain').addEventListener('click', () => {
      this._changeScene('mountain');
    });

    document.querySelector('#night-2').addEventListener('click', () => {
      this._changeScene('night2');
    });

    document.querySelector('#desert').addEventListener('click', () => {
      this._changeScene('desert');
    });

    document.querySelector('#nowhere').addEventListener('click', () => {
      this._changeScene('nowhere');
    });

    this.skyboxes = {};

    this._skyLoader('resources/night/', 'night')
    this._skyLoader('resources/mountain/', 'mountain');
    this._skyLoader('resources/night2/', 'night2');
    this._skyLoader('resources/desert/', 'desert');
    this._skyLoader('resources/nowhere/', 'nowhere');

    this._orbitControls();
    this._createBox();
    this._animate();
  }

  _onWindowResize = () => {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight);
  }

  _skyLoader = (resource, name) => {
    const loader = new THREE.TextureLoader();
    loader.setPath(resource);

    const materialArray = [];

    const ft = loader.load('ft.jpg');
    const bk = loader.load('bk.jpg');
    const up = loader.load('up.jpg');
    const dn = loader.load('dn.jpg');
    const rt = loader.load('rt.jpg');
    const lf = loader.load('lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({ map: ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: lf }));

    materialArray.filter(material => material.side = THREE.BackSide);

    this.skyboxes[`${name}`] = materialArray;
  }

  _changeScene = (sceneName) => {
    console.log(this.skyboxes[`${ sceneName }`]);
    this.box.material = this.skyboxes[`${ sceneName }`]
  }

  _orbitControls = () => {
    const controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', this.render);
  }

  _createBox = () => {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    this.box = new THREE.Mesh(geometry, this.skyboxes.night);

    console.log(this.box);
    this.scene.add(this.box);
  }

  _animate = () => {
    requestAnimationFrame(this._animate);

    this.renderer.render(this.scene, this.camera);
  }
}

const start = new Background();