(function($){
    WAGNER.vertexShadersPath = './shaders/vs';
    WAGNER.fragmentShadersPath = './shaders/fs';
    WAGNER.assetsPath = '../assets/';

    var container, renderer, composer;
    var noisePass = null;

    function init() {
        container = $('#container')[0];

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        container.appendChild( renderer.domElement );

        composer = new WAGNER.Composer( renderer, { useRGBA: true } );
        noisePass = new WAGNER.NoisePass();

        onWindowResize();
        window.addEventListener( 'resize', onWindowResize, false );

        animate();
    }

    function onWindowResize( event ) {
        var s = 1,
        w = window.innerWidth,
        h = window.innerHeight;

        renderer.setSize( s * w, s * h );
        composer.setSize( renderer.domElement.width, renderer.domElement.height );
    }

    function animate() {
        requestAnimationFrame( animate );
        render();
    }

    function render() {
        composer.reset();
        composer.render( composer.scene, composer.camera );
        composer.pass( noisePass );
        composer.toScreen();
    }

    init();
})(jQuery);