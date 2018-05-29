import * as THREE from 'three';
import React from 'react';

const OrbitControls = require('three-orbit-controls')(THREE);

function initCube(id, size) {
    const element = document.getElementById(id);

    // OrthographicCamera( left, right, top, bottom, near, far )
   const camera = new THREE.OrthographicCamera(
           -element.offsetWidth/2, element.offsetWidth/2,
           element.offsetWidth/2, -element.offsetWidth/2, 1, 500 )

    camera.position.z = 300;
    const scene = new THREE.Scene();
    // width : Float, height : Float, depth : Float
    const geometry = new THREE.BoxBufferGeometry( size.width, size.height, size.depth );
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh( geometry, material );
    const controls = new OrbitControls( camera, element );
    mesh.rotation.x += 0.5;
    mesh.rotation.y += 0.5;

    scene.add( mesh );
    scene.background = new THREE.Color( 0xfdfdfd );
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
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
        return <div id={this.props.id} ></div>;
    }
}
