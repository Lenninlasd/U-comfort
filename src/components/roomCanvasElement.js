import * as THREE from 'three';
import React from 'react';

function initCube(id) {
    const element = document.getElementById(id);

    // OrthographicCamera( left, right, top, bottom, near, far )
   const camera = new THREE.OrthographicCamera(
           -element.offsetWidth/2, element.offsetWidth/2,
           element.offsetWidth/2, -element.offsetWidth/2, 1, 500 )

    camera.position.z = 300;
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxBufferGeometry( 120, 120, 120 );
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );
    scene.background = new THREE.Color( 0xfdfdfd );
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( element.offsetWidth, element.offsetWidth);
    renderer.render( scene, camera );

    element.appendChild( renderer.domElement );
    animate();

    function animate() {
        requestAnimationFrame( animate );
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
        renderer.render( scene, camera );
    }
}



export default class CanvasElement extends  React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        initCube(this.props.id);
    }

    render(){
        return <div id={this.props.id}></div>;
    }
}
