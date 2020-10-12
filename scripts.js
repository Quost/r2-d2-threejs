function main(){
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.autoClear = false; // important!

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 200;

    const camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera2.position.z = 200;

    const scene = new THREE.Scene();
    const scene2 = new THREE.Scene();
    
    renderer.setSize( window.innerWidth, window.innerHeight );

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    var controls2 = new THREE.OrbitControls(camera2, renderer.domElement);

    controls2.enableDamping = true;
    controls2.dampingFactor = 0.25;
    controls2.enableZoom = false;

    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    scene2.add(fillLight);
    scene2.add(backLight);
    

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath('assets/');
    mtlLoader.setPath('assets/');
    mtlLoader.load('r2-d2.mtl', function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('assets/');
        objLoader.load('r2-d2.obj', function (object) {

            scene.add(object);
            object.position.y -= 60;

        });

    });

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }   

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    meshX = -10;
    for(let i=0;i<5;i++){
        let sorteio = Math.floor(getRandomNumber(1, 10));
        let geometry;
        if (sorteio<6){
            geometry = new THREE.BoxGeometry(10, 10, 10);
        } else {
            const radius =  6.9;  
            const detail = 3;  
            geometry = new THREE.DodecahedronBufferGeometry(radius, detail);
        }
    
        var material = new THREE.MeshLambertMaterial({color: getRandomColor()});
        var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = Math.floor(getRandomNumber(-100, 100));
            mesh.position.y = Math.floor(getRandomNumber(-100, 100));
            mesh.position.z = 100;
            scene2.add(mesh);
            meshX+=1;
    }

    

    var animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        controls2.update();

        renderer.clear();
        renderer.render( scene, camera );
        renderer.clearDepth(); // important! clear the depth buffer
        renderer.render( scene2, camera2 );
    };
    animate();
}
main();