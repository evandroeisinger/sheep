document.ontouchmove = function(e) {
    e.preventDefault();
}

var audio = {

    context    : new webkitAudioContext(),
    components : {
      keys : $('.sheep')
    },
    methods : {
        init : function() {
            
            var _audio = audio;
            
            audio.components.keys.each( function( index ){

                var key     = $(this),
                    audio   = key.attr('data-audio'),
                    request = new XMLHttpRequest();

                request.open('get', audio, true);
                request.responseType = 'arraybuffer';
                    
                request.onload = function () {
                    _audio.context.decodeAudioData(request.response,
                        function( buffer ) {
                            _audio.methods.parse( buffer, key );
                        }
                    );
                };

                request.send();

            });

        },
        parse : function( buffer, key ) {

            key.click( function(){
                var source = audio.context.createBufferSource();
                    source.buffer = buffer;
                    source.connect( audio.context.destination );
                    source.noteOn(0);
                return false;
            });

        }
    }
}

audio.methods.init();