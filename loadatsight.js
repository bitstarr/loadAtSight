jQuery.fn.loadAtSight = function( options ) {
    "use strict";
    // default settings:
    var defaults = {
            windowEvents: 'load'
        },
        placements = [ 'append', 'replace', 'before', 'after' ];

    var settings = jQuery.extend( {}, defaults, options || {} );

    return this.each(function() {
        // setup
        var $el = jQuery(this),
            placement,
            url;

        // always run as an event applies
        jQuery(window).on( settings.windowEvents, function () {

            // we won't do anything if we can't see the target
            // and we won't do anything if we already did
            if ( !$el.is( ':visible' ) || $el.data( 'spotted' ) === 'true' ) {
                return;
            }
            else {
                $el.data( 'spotted', 'true' );
            }

            // how to handle the content
            for( var ml = placements.length, i=0; i < ml; i++ ) {
                if( $el.is( '[data-' + placements[ i ] + ']' ) ) {
                    placement = placements[ i ];
                    url = $el.attr( 'data-' + placement );
                }
            }
            if( placement === 'replace' ) {
                placement += 'With';
            }

            // get the content and place it
            jQuery.ajax({
                url: url,
                beforeSend: function () {
                    $el.addClass('is-loading');
                },
                success: function ( response ) {
                    $el[ placement ]( response );
                    $el.removeClass('is-loading');
                }
            });
        });

    });
};