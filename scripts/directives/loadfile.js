/**
 * @license
 * Copyright Dan Munro
 * Released under Expat license <https://directory.fsf.org/wiki/License:Expat>
 */

'use strict';

/**
 * @ngdoc directive
 * @name pbnApp.directive:loadFile
 * @description
 * # loadFile
 */
angular.module('pbnApp')
  .directive('loadFile', function () {

    // JSON של הצבעים (ColorData)
    var colorData = [
		{
			"rgb": [255, 255, 255],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 2, "R": 0, "B": 0}
		  },
		  {
			"rgb": [0, 0, 0],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 2, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [255, 0, 0],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 0, "R": 2, "B": 0}
		  },
		  {
			"rgb": [255, 21, 139],
			"Drops": {"C": 0, "M": 2, "Y": 0, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [255, 255, 0],
			"Drops": {"C": 0, "M": 0, "Y": 2, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [41, 171, 226],
			"Drops": {"C": 2, "M": 0, "Y": 0, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [16, 80, 153],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 0, "R": 0, "B": 2}
		  },
		  {
			"rgb": [214, 91, 84],
			"Drops": {"C": 0, "M": 1, "Y": 1, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [242, 161, 154],
			"Drops": {"C": 0, "M": 1, "Y": 1, "K": 0, "W": 3, "R": 0, "B": 0}
		  },
		  {
			"rgb": [231, 110, 80],
			"Drops": {"C": 0, "M": 1, "Y": 3, "K": 0, "W": 5, "R": 0, "B": 0}
		  },
		  {
			"rgb": [241, 152, 62],
			"Drops": {"C": 0, "M": 0.1, "Y": 1, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [254, 217, 176],
			"Drops": {"C": 0, "M": 0.1, "Y": 1, "K": 0, "W": 4, "R": 0, "B": 0}
		  },
		  {
			"rgb": [249, 174, 153],
			"Drops": {"C": 0, "M": 0.1, "Y": 1, "K": 0, "W": 3, "R": 0, "B": 0}
		  },
		  {
			"rgb": [240, 83, 58],
			"Drops": {"C": 0, "M": 0, "Y": 1, "K": 0, "W": 0, "R": 1, "B": 0}
		  },
		  {
			"rgb": [241, 96, 36],
			"Drops": {"C": 0, "M": 0, "Y": 2, "K": 0, "W": 0, "R": 1, "B": 0}
		  },
		  {
			"rgb": [244, 253, 138],
			"Drops": {"C": 0, "M": 0, "Y": 2, "K": 0, "W": 5, "R": 0, "B": 0}
		  },
		  {
			"rgb": [252, 338, 89],
			"Drops": {"C": 1, "M": 0, "Y": 1, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [128, 199, 134],
			"Drops": {"C": 2, "M": 0, "Y": 3, "K": 0, "W": 5, "R": 0, "B": 0}
		  },
		  {
			"rgb": [101, 156, 86],
			"Drops": {"C": 2, "M": 0, "Y": 3, "K": 0, "W": 5, "R": 0, "B": 0}
		  },
		  {
			"rgb": [140, 150, 103],
			"Drops": {"C": 0, "M": 0, "Y": 5, "K": 0.1, "W": 2, "R": 0, "B": 0}
		  },
		  {
			"rgb": [107, 182, 75],
			"Drops": {"C": 1, "M": 0, "Y": 2, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [27, 160, 107],
			"Drops": {"C": 2, "M": 0, "Y": 1, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [13, 100, 75],
			"Drops": {"C": 0, "M": 0, "Y": 1, "K": 0, "W": 0, "R": 0, "B": 1}
		  },
		  {
			"rgb": [30, 143, 69],
			"Drops": {"C": 0, "M": 0, "Y": 2, "K": 0, "W": 0, "R": 0, "B": 1}
		  },
		  {
			"rgb": [9, 128, 92],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 1, "W": 0, "R": 0, "B": 2}
		  },
		  {
			"rgb": [65, 192, 206],
			"Drops": {"C": 2, "M": 0, "Y": 0, "K": 0, "W": 1, "R": 0, "B": 0}
		  },
		  {
			"rgb": [87, 133, 156],
			"Drops": {"C": 4, "M": 1, "Y": 0, "K": 0, "W": 2, "R": 0, "B": 0}
		  },
		  {
			"rgb": [72, 113, 147],
			"Drops": {"C": 2, "M": 1, "Y": 0, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [54, 147, 208],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 2, "R": 0, "B": 1}
		  },
		  {
			"rgb": [81, 165, 219],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 2, "R": 0, "B": 1}
		  },
		  {
			"rgb": [59, 74, 106],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 0, "R": 1, "B": 2}
		  },
		  {
			"rgb": [97, 96, 136],
			"Drops": {"C": 1, "M": 1, "Y": 0, "K": 0, "W": 0, "R": 0, "B": 0}
		  }
	  
		  ,
		  {
			"rgb": [127, 88, 130],
			"Drops": {"C": 1, "M": 3, "Y": 0, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [165, 130, 175],
			"Drops": {"C": 1, "M": 3, "Y": 0, "K": 0, "W": 4, "R": 0, "B": 0}
		  },
		  {
			"rgb": [106, 82, 123],
			"Drops": {"C": 1, "M": 2, "Y": 0, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [115, 98, 138],
			"Drops": {"C": 2, "M": 3, "Y": 0, "K": 0, "W": 0, "R": 0, "B": 0}
		  }
		  ,
		  {
			"rgb": [84, 80, 105],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 0, "R": 1, "B": 1}
		  },
		  {
			"rgb": [175, 143, 170],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 4, "R": 3, "B": 1}
		  },
		  {
			"rgb": [133, 140, 172],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 3, "R": 1, "B": 1}
		  }
		  ,
		  {
			"rgb": [78, 59, 76],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0, "W": 3, "R": 1, "B": 1}
		  }
		  ,
		  {
			"rgb": [230, 127, 178],
			"Drops": {"C": 0, "M": 1, "Y": 0, "K": 0, "W": 1, "R": 0, "B": 0}
		  },
		  {
			"rgb": [241, 169, 201],
			"Drops": {"C": 0, "M": 1, "Y": 0, "K": 0, "W": 5, "R": 0, "B": 0}
		  },
		  {
			"rgb": [236, 130, 178],
			"Drops": {"C": 0, "M": 2, "Y": 0, "K": 0, "W": 3, "R": 0, "B": 0}
		  }
		  
		  ,
		  {
			"rgb": [141, 93, 89],
			"Drops": {"C": 0, "M": 1, "Y": 1, "K": 0.1, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [128, 92, 89],
			"Drops": {"C": 0, "M": 3, "Y": 3, "K": 0.1, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [91, 73, 65],
			"Drops": {"C": 0, "M": 0, "Y": 1, "K": 0, "W": 0, "R": 1, "B": 1}
		  }
	  
			  ,
		  {
			"rgb": [145, 106, 72],
			"Drops": {"C": 0, "M": 1, "Y": 3, "K": 0.1, "W": 0, "R": 0, "B": 0}
		  }
		  ,
		  {
			"rgb": [161, 109, 84],
			"Drops": {"C": 0, "M": 3, "Y": 2, "K": 0.1, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [135, 80, 81],
			"Drops": {"C": 0, "M": 1, "Y": 1, "K": 0.1, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [142, 90, 71],
			"Drops": {"C": 0, "M": 1, "Y": 3, "K": 0.1, "W": 0, "R": 1, "B": 0}
		  }
		   ,
		  {
			"rgb": [107, 108, 108],
			"Drops": {"C": 1, "M": 1, "Y": 1, "K": 0, "W": 0, "R": 0, "B": 0}
		  },
		  {
			"rgb": [94, 94, 104],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 3, "W": 2, "R": 0, "B": 0}
		  },
		  {
			"rgb": [154, 156, 166],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 1, "W": 7, "R": 0, "B": 0}
		  }
		  ,
		  {
			"rgb": [165, 165, 176],
			"Drops": {"C": 0, "M": 0, "Y": 0, "K": 0.1, "W": 1, "R": 0, "B": 0}
		  }
		  ];
    // פונקציה שמגבילה ערך בין מינימום ומקסימום
    function clamp(val, min, max) {
      return Math.min(max, Math.max(min, val));
    }

    // פונקציה למציאת הצבע הקרוב ביותר מתוך colorData
    function findNearestColor(r, g, b, colorArray) {
      var nearest = null;
      var minDistSq = Infinity;
      for (var i = 0; i < colorArray.length; i++) {
        var rgb = colorArray[i].rgb;
        // מבצעים clamp לערכים (במקרה של ערכים חריגים כמו 262)
        var cr = clamp(rgb[0], 0, 255);
        var cg = clamp(rgb[1], 0, 255);
        var cb = clamp(rgb[2], 0, 255);
        var dr = r - cr;
        var dg = g - cg;
        var db = b - cb;
        var distSq = dr * dr + dg * dg + db * db;
        if (distSq < minDistSq) {
          minDistSq = distSq;
          nearest = [cr, cg, cb];
        }
      }
      return nearest;
    }

    // פונקציה להמרת צבעי התמונה באמצעות Canvas
    function convertImageColors(imageSrc, callback) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
          var r = data[i],
              g = data[i + 1],
              b = data[i + 2];
          var nearest = findNearestColor(r, g, b, colorData);
          data[i]     = nearest[0];
          data[i + 1] = nearest[1];
          data[i + 2] = nearest[2];
          // ערוץ האלפא (data[i+3]) נשאר ללא שינוי
        }
        ctx.putImageData(imageData, 0, 0);
        var newDataUrl = canvas.toDataURL('image/png');
        callback(newDataUrl);
      };
      img.src = imageSrc;
    }

    return {
      restrict: 'A',
      scope: {
        imageLoaded: '&'
      },
      link: function (scope, elem, attr) {
        elem = elem[0];
        elem.ondragover = function () {
          elem.style.border = "4px dashed black";
          return false;
        };
        elem.ondragleave = function () {
          elem.style.border = "4px dashed #777777";
          return false;
        };
        elem.ondrop = function (e) {
          e.preventDefault();
          var file = e.dataTransfer.files[0];
          var reader = new FileReader();
          reader.onloadend = function (event) {
            // המרת התמונה לפני קריאת callback
            convertImageColors(event.target.result, function (convertedDataUrl) {
              scope.imageLoaded({ img: convertedDataUrl });
              scope.$apply();
            });
          };
          reader.readAsDataURL(file);
          elem.style.border = "4px dashed gray";
          return false;
        };

        var fileInput = document.getElementById('fileBrowser');
        fileInput.addEventListener('change', function (e) {
          var file = fileInput.files[0];
          if (file.type.match(/image.*/)) {
            var reader = new FileReader();
            reader.onloadend = function (event) {
              convertImageColors(event.target.result, function (convertedDataUrl) {
                scope.imageLoaded({ img: convertedDataUrl });
                scope.$apply();
              });
            };
            reader.readAsDataURL(file);
          } else {
            alert("wrong file format");
          }
        });
      }
    };
  });
