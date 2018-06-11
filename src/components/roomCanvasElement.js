import * as THREE from 'three';
import React from 'react';

const OrbitControls = require('three-orbit-controls')(THREE);


function createBulbLight() {
    const bulbGeometry = new THREE.SphereBufferGeometry( 0.5, 8, 8 );
    const bulbLight = new THREE.PointLight( 0xffee88, 1, 30, 2 );
    const bulbMat = new THREE.MeshStandardMaterial( {
                    emissive: 0xffffee,
                    emissiveIntensity: 1,
                    color: 0x000000
                });
    bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    bulbLight.position.set( 0, 0, 0 );
    bulbLight.castShadow = true;
    return bulbLight;
}

function createHemisphereLight() {
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.7 );
    hemiLight.color.setHSL( 0.6, 0.1, 0.6 );
    hemiLight.position.set( 0, 100, 0 );
    const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10, 0x000000 );
    return {hemiLight, hemiLightHelper}
}

function createRectangleGeometry(size){
    // Rectangle shape
    const rectLength = size.width;
    const rectWidth = size.depth;
    const rectShape = new THREE.Shape();
    rectShape.moveTo( rectLength/2, rectWidth/2 );
    rectShape.lineTo( rectLength/2, -rectWidth/2 );
    rectShape.lineTo( -rectLength/2, -rectWidth/2 );
    rectShape.lineTo( -rectLength/2, rectWidth/2 );
    rectShape.lineTo( rectLength/2, rectWidth/2 );


    const extrusionPath = new THREE.Path();
    const padding = 0.5;
    extrusionPath.moveTo( rectLength/2-padding, rectWidth/2-padding );
    extrusionPath.lineTo( rectLength/2-padding, -rectWidth/2+padding );
    extrusionPath.lineTo( -rectLength/2+padding, -rectWidth/2+padding );
    extrusionPath.lineTo( -rectLength/2+padding, rectWidth/2-padding );
    extrusionPath.lineTo( rectLength/2-padding, rectWidth/2-padding );

    rectShape.holes.push( extrusionPath );

    const extrudeSettings = { steps: 2, amount: size.height, bevelEnabled: false };
    return new THREE.ExtrudeGeometry( rectShape, extrudeSettings );
}

function initCube(id, size) {
    const element = document.getElementById(id);

    const camera      = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
    camera.position.z = 100;
    camera.position.x = 100 * Math.sin( 30 );
    camera.position.y = 100;

    const scene    = new THREE.Scene();
    const geometry = new THREE.BoxBufferGeometry( size.width, 0, size.depth );
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505, side: THREE.DoubleSide } );
    const meshFloor = new THREE.Mesh( geometry, material );
    const controls = new OrbitControls( camera, element );
    controls.enableKeys = false;

    meshFloor.position.y = -size.height;
    scene.add( meshFloor );

    const wallGeometry = createRectangleGeometry(size);
    const meshWall = new THREE.Mesh( wallGeometry, material ) ;
    meshWall.rotation.x = -90*Math.PI/180;
    meshWall.position.y = -size.height;
    scene.add( meshWall );

    // LIGHTS
    const {hemiLight, hemiLightHelper} = createHemisphereLight();
    scene.add( hemiLight );
    scene.add( hemiLightHelper );
    scene.add( createBulbLight() );

    const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    renderer.setClearColor( 0x000000, 0);

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( element.offsetWidth, element.offsetWidth);
    renderer.render( scene, camera );

    element.appendChild( renderer.domElement );
    animate();

    return {meshFloor, meshWall};

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
}



export default class CanvasElement extends  React.Component {
    constructor(props){
        super(props);
        this.meshes = {};
    }

    componentDidMount(){
        this.meshes = initCube(this.props.id, this.props.size);
    }

    updateGeometry(size) {
        const {width, height, depth} = size;
        const floorGeometry = new THREE.BoxBufferGeometry(width, 0, depth);
        const wallGeometry = createRectangleGeometry(size);

        this.meshes.meshFloor.geometry.dispose();
        this.meshes.meshFloor.geometry = floorGeometry;

        this.meshes.meshWall.geometry.dispose();
        this.meshes.meshWall.geometry = wallGeometry;
    }

    render(){
        if (this.meshes.meshFloor) {
            this.updateGeometry(this.props.size);
        }
        return <div id={this.props.id} className='threedmodel'></div>;
    }
}
