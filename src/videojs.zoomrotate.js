(function(){
    var defaults, extend;
    defaults = {
      zoom: 1,
      rotate: 0
    };
    extend = function() {
      var args, target, i, object, property;
      args = Array.prototype.slice.call(arguments);
      target = args.shift() || {};
      for (i in args) {
        object = args[i];
        for (property in object) {
          if (object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object') {
              target[property] = extend(target[property], object[property]);
            } else {
              target[property] = object[property];
            }
          }
        }
      }
      return target;
    };

  /**
    * register the zoomrotate plugin
    */
    videojs.plugin('zoomrotate', function(options){
        var settings, player, video, poster;
        settings = extend(defaults, options);

        /* Grab the necessary DOM elements */
        player = this.el();
        video = this.el().getElementsByTagName('video')[0];
        poster = this.el().getElementsByTagName('div')[1]; // div vjs-poster

        /* Array of possible browser specific settings for transformation */
        var properties = ['transform', 'WebkitTransform', 'MozTransform',
                          'msTransform', 'OTransform'],
            prop = properties[0];

        /* Iterators */
        var i,j;

        /* Find out which CSS transform the browser supports */
        for(i=0,j=properties.length;i<j;i++){
          if(typeof player.style[properties[i]] !== 'undefined'){
            prop = properties[i];
            break;
          }
        }

        /* Let's do it */
        player.style.overflow = 'hidden';

        var video_zoom = options.video_zoom || options.zoom;
        var video_rotate = options.video_rotate || options.rotate;

        video.style[prop]='scale('+video_zoom+') rotate('+video_rotate+'deg)';

        var poster_zoom = options.poster_zoom || options.zoom;
        var poster_rotate = options.poster_rotate || options.rotate;

        poster.style[prop]='scale('+poster_zoom+') rotate('+poster_rotate+'deg)';
    });
})();
