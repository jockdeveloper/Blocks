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

// Texturas
const textureLoader = new THREE.TextureLoader();
textureLoader.setPath('./src/assets/textures/');
const baseColor = textureLoader.load('base_color.jpg');
const roughness = textureLoader.load('metallic_roughness.png');
const normalMap = textureLoader.load('normal_map.png');

// Material
const material = new THREE.MeshBasicMaterial({
    map: baseColor
});

const material_standar = new THREE.MeshStandardMaterial({
    map: baseColor,
    roughnessMap: roughness,
    normalMap: normalMap
});

// Geometrias
const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

// Mesh
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
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0.8, 2, 4);
scene.add(directionalLight);

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