var arrayImage = "120x600_international_0 160x600_house_0 160x600_house_0 300x120_raovat_0 300x250_international_0 300x250_raovat_0 300x600_international_0 320x50_raovat_0 468x90_local_0 670x90_international_0 728x90_house_0 728x90_raovat_0 922x558_international_0 970x90_local_0 120x600_local_0 160x600_international_0 300x120_international_0 300x250_car_0 300x250_local_0 300x300_international_0 300x600_local_0 468x90_house_0 468x90_motorbike_0 670x90_local_0 728x90_international_0 920x90_international_0 922x558_local_0 970x180_international_0 160x600_car_0 160x600_local_0 300x120_local_0 300x250_house_0 300x250_motorbike_0 300x300_local_0 300x600_raovat_0 468x90_international_0 468x90_raovat_0 728x90_car_0 728x90_local_0 920x90_local_0 970x90_international_0 970x180_local_0".split( " " );

function randomImage( arr ) {
    this.iArr = arr || [];
    var _self = this;
    var url = "//static.eclick.vn/delivery/css/images/banners/";

    this.iObj = function() {
        var tempO = {};
        var parts;

        for ( var i= 0, imagesLen = _self.iArr.length, image = _self.iArr[i]; i < imagesLen; image = _self.iArr[++i] ) {
            parts = image.split( "_" );
            tempO[parts[0]] = tempO[parts[0]] || {};
            tempO[parts[0]][parts[1]] = tempO[parts[0]][parts[1]] || {};
            tempO[parts[0]][parts[1]][parts[2]] = image;
        }

        return tempO
    }();

    function filterBy( arr ) { // size, category, number
        var len = arr.length;
        var result = _self.iObj;

        for ( var i= 0; i < len; i++ ) {
            result = result[arr[i]];
        }
        
        return result ? result : {};
    }

    function random() {
        var args = Array.prototype.slice.call(arguments);
        var result = filterBy( args );
        result = randomProperty( result ); // random category

        if (!result) throw Error("adsbyeclick: Cannot find image named " + args.join("_") + '.');
        return url + result + ".gif"; // currently each category has only 1 image: i0
    }

    function randomProperty( obj ) {
        if ( typeof obj !== 'object' ) return obj;
        var keys = Object.keys( obj );
        var result = obj[ keys[ keys.length * Math.random() << 0 ] ];
        return typeof  result == 'object' ? randomProperty( result ) : result
    }

    return {
        "random" : random
    }
}

var imgSource = randomImage( arrayImage ).random( "300x250", "raovat", "2" );

document.write("<img class='eclick_simple_image' src='" + imgSource + "'/>");


