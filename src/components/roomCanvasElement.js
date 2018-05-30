import * as THREE from 'three';
import React from 'react';

const OrbitControls = require('three-orbit-controls')(THREE);

function initCube(id, size) {
    const element = document.getElementById(id);

    const camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );
    camera.position.z = 100;
    camera.position.x = 100 * Math.sin( 30 );
    camera.position.y = 100;

    const scene = new THREE.Scene();
    // width : Float, height : Float, depth : Float
    const geometry = new THREE.BoxBufferGeometry( size.width, size.height, size.depth );
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505, side: THREE.DoubleSide } );
    const mesh = new THREE.Mesh( geometry, material );
    const controls = new OrbitControls( camera, element );
    mesh.position.y = -size.height;
    scene.add( mesh );

    // Rectangle shape
    const rectLength = size.width;
    const rectWidth = size.depth;
    const rectShape = new THREE.Shape();
    rectShape.moveTo( rectLength/2, rectWidth/2 );
    rectShape.lineTo( rectLength/2, -rectWidth/2 );
    rectShape.lineTo( -rectLength/2, -rectWidth/2 );
    rectShape.lineTo( -rectLength/2, rectWidth/2 );
    rectShape.lineTo( rectLength/2, rectWidth/2 );


    const smileyEye1Path = new THREE.Path();
    const padd = 1;
    smileyEye1Path.moveTo( rectLength/2-padd, rectWidth/2-padd );
    smileyEye1Path.lineTo( rectLength/2-padd, -rectWidth/2+padd );
    smileyEye1Path.lineTo( -rectLength/2+padd, -rectWidth/2+padd );
    smileyEye1Path.lineTo( -rectLength/2+padd, rectWidth/2-padd );
    smileyEye1Path.lineTo( rectLength/2-padd, rectWidth/2-padd );

	rectShape.holes.push( smileyEye1Path );

    const extrudeSettings = {
    	steps: 2,
    	amount: 14,
    	bevelEnabled: false,
    };
    const geometrySp = new THREE.ExtrudeGeometry( rectShape, extrudeSettings );
    const meshsp = new THREE.Mesh( geometrySp, material ) ;
    meshsp.rotation.x = 90*Math.PI/180;
    scene.add( meshsp );

    // LIGHTS
    const bulbGeometry = new THREE.SphereBufferGeometry( 0.5, 8, 8 );
    const bulbLight = new THREE.PointLight( 0xffee88, 1, 50, 2 );
    const bulbMat = new THREE.MeshStandardMaterial( {
					emissive: 0xffffee,
					emissiveIntensity: 1,
					color: 0x000000
				});
    bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    bulbLight.position.set( 0, 0, 0 );
    bulbLight.castShadow = true;
    scene.add( bulbLight );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.7 );
    hemiLight.color.setHSL( 0.6, 0.1, 0.6 );
    hemiLight.position.set( 0, 100, 0 );
    scene.add( hemiLight );
    const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10, 0x000000 );
    scene.add( hemiLightHelper );

    const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    renderer.setClearColor( 0x000000, 0);

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( element.offsetWidth, element.offsetWidth);
    renderer.render( scene, camera );

    element.appendChild( renderer.domElement );
    animate();

    return mesh;

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
}



export default class CanvasElement extends  React.Component {
    constructor(props){
        super(props);
        this.state = {mesh: null};
    }

    componentDidMount(){
        const mesh = initCube(this.props.id, this.props.size);
        this.setState({ mesh });
    }

    updateGeometry(size) {
        const {width, height, depth} = size;
        const geometry = new THREE.BoxBufferGeometry(width, height, depth);
    	this.state.mesh.geometry.dispose();
    	this.state.mesh.geometry = geometry;
    }

    render(){
        if (this.state.mesh) {
            this.updateGeometry(this.props.size);
        }
        return <div id={this.props.id} className='threedmodel'></div>;
    }
}
