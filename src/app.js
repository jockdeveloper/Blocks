const container = document.querySelector('#game-container');

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

// Camara
const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth/container.clientHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 15);

// Material
const material = new THREE.MeshBasicMaterial({
    color: 'teal',
});

const material_standar = new THREE.MeshStandardMaterial({
    color: 'coral',
    flatShading: true,
    roughness: 0.1
});

// Mesh
const geometry = new THREE.CylinderBufferGeometry(1, 1, 3, 8);
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateZ(THREE.MathUtils.degToRad(90));
mesh.position.set(-3, 0, 0);

scene.add(mesh);

// Mesh 2
const mesh2 = new THREE.Mesh(geometry, material_standar);
mesh2.rotateZ(THREE.MathUtils.degToRad(90));
mesh2.position.set(3, 0, 0);

scene.add(mesh2);

// Luces
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xff0000, 1);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0.8, 2, 4);
scene.add(directionalLight);

// Helpers
const helperAxes = new THREE.AxesHelper(10);
scene.add(helperAxes);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
scene.add(hemisphereLightHelper);

// Render
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;

container.appendChild(renderer.domElement);

const update = () => {
    mesh.rotateY(0.01);
    mesh2.rotateY(0.01);

    renderer.render(scene, camera);
    renderer.setAnimationLoop(() => update());
}
update();