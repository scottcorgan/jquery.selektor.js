;(function ($, window, document, undefined) {
    var pluginName = "selektor";
    var pluginContainerClassName = 'selektor-container';
    var arrowDownClass = 'selektor-arrow';
    var defaults = {
        
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.$element = $(element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
  
    //
    Plugin.prototype = {
        init: function () {
          var width = this.$element.outerWidth();
          var height = this.$element.outerHeight();
          
          this.createClone();
          this.createReplacement(width, height);
          this.$content = this.$replacement.find('.selektor-content').css('paddingLeft', 10);
          this.$content.html(this.$original.val());
          this.$element.remove();
        },
        
        createClone: function () {
          //
          this.$original = this.$element.clone();
          this.$original.css({
            left: 0,
            opacity: 0,
            height:'100%',
            position: 'absolute',
            top: 0,
            width:'100%'
          });
          this.$original.change($.proxy(this.changeListener, this));
        },
        
        createReplacement: function (width, height) {
          height = this.options.height || height;
          height += 'px';
          
          this.$replacement = $('<div/>').css({
            display:'inline-block',
            height: height,
            lineHeight: height,
            position:'relative',
            width: this.options.width || width
          });
          this.$replacement.addClass(pluginContainerClassName);
          this.$replacement.insertAfter(this.$element);
          this.$replacement.html('<span class="selektor-content"></span>');
          
          this.$arrow = $('<i>&#9660;</i>')
            .css({
              float: 'right',
              fontSize: '10px',
              marginRight: '10px'
            })
            .addClass(arrowDownClass);
          
          this.$replacement
            .append(this.$arrow)
            .append(this.$original);
        },
        
        changeListener: function (e) {
          this.$content.html(this.$original.find(':selected').text());
        }
    };

    //
    $.fn[pluginName] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };
})(jQuery, window, document);