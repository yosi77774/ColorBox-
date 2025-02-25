/**
 * @license
 * Copyright Dan Munro
 * Released under Expat license <https://directory.fsf.org/wiki/License:Expat>
 */
'use strict';

/**
 * @ngdoc function
 * @name pbnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pbnApp
 */
angular.module('pbnApp')
  .controller('MainCtrl', function ($scope) {

      $scope.step = "load";
      $scope.view = "";
      $scope.status = "";
      $scope.loaderStyle = {
          border: "4px dashed #777777"
      };
      $scope.palette = [];
      $scope.colorInfoVisible = false;

      // רשימת הצבעים הקבועה עם התוויות (דוגמה – עדכן בהתאם לצורך)
      var fixedColorList = [
          { r: 255, g: 255, b: 255, label: 1 },
          { r: 0,   g: 0,   b: 0,   label: 2 },
          { r: 255, g: 0,   b: 0,   label: 3 },
          { r: 255, g: 21,  b: 139, label: 4 },
          { r: 255, g: 255, b: 0,   label: 5 },
          { r: 41,  g: 171, b: 226, label: 6 },
          { r: 16,  g: 80,  b: 153, label: 7 },
          { r: 214, g: 91,  b: 84,  label: 10 },
          { r: 242, g: 161, b: 154, label: 11 },
          { r: 231, g: 110, b: 80,  label: 12 },
          { r: 248, g: 182, b: 129, label: 13 },
          { r: 241, g: 143, b: 76,  label: 14 },
          { r: 241, g: 152, b: 62,  label: 15 },
          { r: 254, g: 217, b: 176, label: 16 },
          { r: 249, g: 174, b: 153, label: 17 },
          { r: 240, g: 83,  b: 58,  label: 18 },
          { r: 241, g: 96,  b: 36,  label: 19 },
          { r: 244, g: 235, b: 138, label: 21 },
          { r: 252, g: 238, b: 31,  label: 22 },
          { r: 66,  g: 164, b: 89,  label: 30 },
          { r: 128, g: 199, b: 134, label: 31 },
          { r: 101, g: 156, b: 89,  label: 32 },
          { r: 140, g: 150, b: 103, label: 33 },
          { r: 107, g: 182, b: 75,  label: 34 },
          { r: 27,  g: 160, b: 107, label: 35 },
          { r: 13,  g: 100, b: 75,  label: 36 },
          { r: 30,  g: 143, b: 69,  label: 37 },
          { r: 9,   g: 128, b: 92,  label: 38 },
          { r: 65,  g: 192, b: 206, label: 41 },
          { r: 87,  g: 133, b: 156, label: 42 },
          { r: 72,  g: 113, b: 147, label: 43 },
          { r: 54,  g: 147, b: 208, label: 44 },
          { r: 81,  g: 165, b: 219, label: 45 },
          { r: 59,  g: 74,  b: 106, label: 46 },
          { r: 97,  g: 96,  b: 136, label: 50 },
          { r: 127, g: 88,  b: 130, label: 51 },
          { r: 165, g: 130, b: 175, label: 52 },
          { r: 106, g: 82,  b: 123, label: 53 },
          { r: 115, g: 98,  b: 138, label: 54 },
          { r: 84,  g: 80,  b: 105, label: 55 },
          { r: 175, g: 143, b: 170, label: 56 },
          { r: 133, g: 140, b: 172, label: 57 },
          { r: 78,  g: 59,  b: 76,  label: 58 },
          { r: 230, g: 127, b: 178, label: 60 },
          { r: 241, g: 169, b: 201, label: 61 },
          { r: 236, g: 130, b: 178, label: 62 },
          { r: 227, g: 93,  b: 143, label: 63 },
          { r: 227, g: 78,  b: 109, label: 64 },
          { r: 218, g: 86,  b: 99,  label: 65 },
          { r: 240, g: 93,  b: 126, label: 66 },
          { r: 243, g: 136, b: 162, label: 67 },
          { r: 239, g: 66,  b: 63,  label: 68 },
          { r: 141, g: 93,  b: 89,  label: 70 },
          { r: 128, g: 92,  b: 89,  label: 71 },
          { r: 91,  g: 73,  b: 65,  label: 72 },
          { r: 145, g: 106, b: 72,  label: 73 },
          { r: 161, g: 109, b: 84,  label: 74 },
          { r: 135, g: 80,  b: 81,  label: 75 },
          { r: 142, g: 90,  b: 71,  label: 76 },
          { r: 107, g: 108, b: 108, label: 80 },
          { r: 94,  g: 94,  b: 104, label: 81 },
          { r: 154, g: 156, b: 166, label: 82 },
          { r: 165, g: 165, b: 176, label: 83 }
      ];

      // פונקציה למציאת התווית מהצבע הקרוב ביותר
      function lookupFixedLabel(color) {
          var nearest = null;
          var minDistSq = Infinity;
          for (var i = 0; i < fixedColorList.length; i++) {
              var fc = fixedColorList[i];
              var dr = color.r - fc.r;
              var dg = color.g - fc.g;
              var db = color.b - fc.b;
              var distSq = dr * dr + dg * dg + db * db;
              if (distSq < minDistSq) {
                  minDistSq = distSq;
                  nearest = fc;
              }
          }
          console.log("lookupFixedLabel: For color", color, "found label", nearest.label);
          return nearest.label;
      }

      $scope.imageLoaded = function(imgSrc) {
          var img = new Image();
          img.src = imgSrc;
          img.onload = function() {
              var c = document.getElementById("img-canvas");
              c.width = document.getElementById("widthSlider").value;
              var scale = c.width / img.naturalWidth;
              c.height = img.naturalHeight * scale;
              document.getElementById("canvases").style.height = (c.height + 20) + "px";
              $scope.c = c;
              $scope.ctx = c.getContext("2d");
              $scope.ctx.drawImage(img, 0, 0, c.width, c.height);
              $scope.step = "select";
              $scope.$apply();
          };
      };

      $scope.addColor = function(color) {
          color.label = lookupFixedLabel(color);
          console.log("addColor: Adding color with label", color.label);
          var alreadyExists = $scope.palette.some(function(existingColor) {
              return existingColor.label === color.label;
          });
          if (alreadyExists) {
              alert("This color is already in the palette!");
          } else {
              $scope.palette.push(color);
          }
      };

      $scope.removeColor = function(color) {
          _.pull($scope.palette, color);
      };

      var getNearest = function(palette, col) {
          var nearest;
          var nearestDistsq = 1000000;
          for (var i = 0; i < palette.length; i++) {
              var pcol = palette[i];
              var distsq = Math.pow(pcol.r - col.r, 2) +
                           Math.pow(pcol.g - col.g, 2) +
                           Math.pow(pcol.b - col.b, 2);
              if (distsq < nearestDistsq) {
                  nearest = i;
                  nearestDistsq = distsq;
              }
          }
          return nearest;
      };

      var imageDataToSimpMat = function(imgData, palette) {
          var mat = [];
          for (var i = 0; i < imgData.height; i++) {
              mat[i] = new Array(imgData.width);
          }
          for (var i = 0; i < imgData.data.length; i += 4) {
              var nearestI = getNearest(palette, {
                  r: imgData.data[i],
                  g: imgData.data[i + 1],
                  b: imgData.data[i + 2]
              });
              var x = (i / 4) % imgData.width;
              var y = Math.floor((i / 4) / imgData.width);
              mat[y][x] = nearestI;
          }
          return mat;
      };

      var matToImageData = function(mat, palette, context) {
          var imgData = context.createImageData(mat[0].length, mat.length);
          for (var y = 0; y < mat.length; y++) {
              for (var x = 0; x < mat[0].length; x++) {
                  var i = (y * mat[0].length + x) * 4;
                  var col = palette[mat[y][x]];
                  imgData.data[i] = col.r;
                  imgData.data[i + 1] = col.g;
                  imgData.data[i + 2] = col.b;
                  imgData.data[i + 3] = 255;
              }
          }
          return imgData;
      };

      var displayResults = function(matSmooth, matLine, labelLocs) {
          var c2 = document.getElementById("filled-canvas");
          c2.width = $scope.c.width;
          c2.height = $scope.c.height;
          var ctx2 = c2.getContext("2d");
          var imgData = matToImageData(matSmooth, $scope.palette, ctx2);
          ctx2.putImageData(imgData, 0, 0);

          var c3 = document.getElementById("outline-canvas");
          c3.width = c2.width;
          c3.height = c2.height;
          var gray = Math.round(255 * (1 - document.getElementById("darknessSlider").value / 100));
          var bw = [{ r: 255, g: 255, b: 255 },
                    { r: gray, g: gray, b: gray }];
          var ctx3 = c3.getContext("2d");
          var imgData = matToImageData(matLine, bw, ctx3);
          ctx3.putImageData(imgData, 0, 0);

          ctx3.font = "12px Georgia";
          ctx3.fillStyle = "rgb(" + gray + ", " + gray + ", " + gray + ")";
          for (var i = 0; i < labelLocs.length; i++) {
              console.log("displayResults: Drawing label", labelLocs[i].value, "at", labelLocs[i].x, labelLocs[i].y);
              ctx3.fillText(labelLocs[i].value, labelLocs[i].x - 3, labelLocs[i].y + 4);
          }

          $scope.c2 = c2;
          $scope.c3 = c3;
      };

      var rgbToHex = function(r, g, b) {
          return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      };

      var rgbToCmyk = function(r, g, b) {
          var k = 1 - Math.max(r / 255, g / 255, b / 255);
          if (k === 1) {
              var c = 0, m = 0, y = 0;
          } else {
              var c = (1 - r / 255 - k) / (1 - k);
              var m = (1 - g / 255 - k) / (1 - k);
              var y = (1 - b / 255 - k) / (1 - k);
          }
          return {
              c: Math.round(c * 100),
              m: Math.round(m * 100),
              y: Math.round(y * 100),
              k: Math.round(k * 100)
          };
      };

      var rgbToHsl = function(r, g, b) {
          r = r / 255;
          g = g / 255;
          b = b / 255;
          var M = Math.max(r, g, b);
          var m = Math.min(r, g, b);
          var h;
          if (M === m) {
              h = 0;
          } else if (M === r) {
              h = 60 * (g - b) / (M - m);
          } else if (M === g) {
              h = 60 * (b - r) / (M - m) + 120;
          } else {
              h = 60 * (r - g) / (M - m) + 240;
          }
          var l = (M + m) / 2;
          var s;
          if (l === 0 || l === 1) {
              s = 0;
          } else {
              s = (M - m) / (1 - Math.abs(2 * l - 1));
          }
          return {
              h: ((Math.round(h) % 360) + 360) % 360,
              s: Math.round(s * 100),
              l: Math.round(l * 100)
          };
      };

      var rgbToHsv = function(r, g, b) {
          r = r / 255;
          g = g / 255;
          b = b / 255;
          var M = Math.max(r, g, b);
          var m = Math.min(r, g, b);
          var h;
          if (M === m) {
              h = 0;
          } else if (M === r) {
              h = 60 * (g - b) / (M - m);
          } else if (M === g) {
              h = 60 * (b - r) / (M - m) + 120;
          } else {
              h = 60 * (r - g) / (M - m) + 240;
          }
          var s;
          if (M === 0) {
              s = 0;
          } else {
              s = (M - m) / M;
          }
          return {
              h: ((Math.round(h) % 360) + 360) % 360,
              s: Math.round(s * 100),
              v: Math.round(M * 100)
          };
      };

      var getColorInfo = function(palette) {
          for (var i = 0; i < palette.length; i++) {
              var col = palette[i];
              col.hex = rgbToHex(col.r, col.g, col.b);
              col.cmyk = rgbToCmyk(col.r, col.g, col.b);
              col.hsl = rgbToHsl(col.r, col.g, col.b);
              col.hsv = rgbToHsv(col.r, col.g, col.b);
          }
      };

      $scope.pbnify = function() {
          $scope.step = "process";
          var width = $scope.c.width;
          var height = $scope.c.height;
          var imgData = $scope.ctx.getImageData(0, 0, width, height);
          var mat = imageDataToSimpMat(imgData, $scope.palette);

          var worker = new Worker('scripts/processImage.js');
          worker.addEventListener('message', function(e) {
              if (e.data.cmd === "status") {
                  $scope.status = e.data.status;
                  $scope.$apply();
              } else {
                  var matSmooth = e.data.matSmooth;
                  var labelLocs = e.data.labelLocs;
                  var matLine = e.data.matLine;
                  worker.terminate();

                  displayResults(matSmooth, matLine, labelLocs);
                  getColorInfo($scope.palette);
                  $scope.step = "result";
                  $scope.view = "filled";
                  $scope.$apply();
              }
          }, false);
          worker.postMessage({ mat: mat, palette: $scope.palette });
      };

      $scope.newImage = function() {
          $scope.palette = [];
          document.getElementById("canvases").style.height = "0px";
          $scope.step = "load";
      };

      $scope.recolor = function() {
          $scope.step = "select";
      };

      $scope.clearPalette = function() {
          $scope.palette = [];
      };

      $scope.showColorInfo = function() {
          $scope.colorInfoVisible = true;
      };

      $scope.hideColorInfo = function() {
          $scope.colorInfoVisible = false;
      };

      $scope.viewFilled = function() {
          $scope.view = "filled";
      };

      $scope.viewOutline = function() {
          $scope.view = "outline";
      };

      $scope.saveFilled = function() {
          var win = window.open();
          win.document.write('<html><head><title>ColorBox filled</title></head><body><img src="' + $scope.c2.toDataURL() + '"></body></html>');
      };

      // הדפסה משולבת עבור התמונה המעובדת (filled) + הפלטה
      $scope.printFilled = function() {
          var win = window.open('', '_blank');
          win.document.write('<html><head><title>ColorBox Filled & Palette</title>');
          win.document.write('<style type="text/css" media="print">');
          win.document.write('@page { size: A4 portrait; margin: 5mm; }');
          win.document.write('body { margin: 0; padding: 0; font-family: Arial, sans-serif; }');
          // עיצוב לתמונה המעובדת
          win.document.write('.filled-image { display: block; margin: auto; width: 210mm; height: auto; }');
          // עיצוב לאזור הפלטה
          win.document.write('.palette-section { margin-top: 10mm; text-align: center; }');
          win.document.write('.palette-section h3 { margin-bottom: 5mm; }');
          win.document.write('.palette-item { display: inline-block; margin: 2mm; }');
          win.document.write('.palette-item img { width: 50mm; height: auto; border: 1px solid #ccc; border-radius: 8px; }');
          win.document.write('</style>');
          win.document.write('</head><body>');

          // הדפסת התמונה המעובדת (filled)
          var filledDataUrl = $scope.c2.toDataURL();
          win.document.write('<img class="filled-image" src="' + filledDataUrl + '">');

          // הדפסת הפלטה (מתכוני הצבעים)
          win.document.write('<div class="palette-section">');
          win.document.write('<h3>ColorBox מתכוני צבע</h3>');
          for (var i = 0; i < $scope.palette.length; i++) {
              var color = $scope.palette[i];
              win.document.write('<div class="palette-item">');
              win.document.write('<img src="images/colors/' + color.label + '.jpg" alt="Color #' + color.label + '">');
              win.document.write('<p>Color #' + color.label + '</p>');
              win.document.write('</div>');
          }
          win.document.write('</div>');

          win.document.write('</body></html>');
          win.document.close();

          setTimeout(function() {
              win.focus();
              win.print();
              win.close();
          }, 250);
      };

      // פונקציות הדפסה נפרדות עבור outline ו־palette (לשימוש במידת הצורך)
      $scope.printOutline = function() {
          var win = window.open('', '_blank');
          win.document.write('<html><head><title>ColorBox outline</title>');
          win.document.write('<style type="text/css" media="print">');
          win.document.write('@page { size: A4 portrait; margin: 5mm; }');
          win.document.write('body { margin: 0; padding: 0; }');
          win.document.write('img { display: block; margin: auto; max-width: 210mm; max-height: 297mm; width: auto; height: auto; }');
          win.document.write('</style>');
          win.document.write('</head><body>');
          var dataUrl = $scope.c3.toDataURL();
          win.document.write('<img src="' + dataUrl + '">');
          win.document.write('</body></html>');
          win.document.close();
          setTimeout(function() {
              win.focus();
              win.print();
              win.close();
          }, 250);
      };

// הדפסה משולבת עבור התמונה המעובדת (filled) + הפלטה
$scope.printFilled = function() {
    var win = window.open('', '_blank');
    win.document.write('<html><head><title>ColorBox Filled & Palette</title>');
    win.document.write('<style type="text/css" media="print">');
    // הגדרת עמוד A4 ללא שוליים או שוליים מינימליים
    win.document.write('@page { size: A4 portrait; margin: 5mm; }');
    win.document.write('body { margin: 0; padding: 0; font-family: Arial, sans-serif; }');
    // התמונה המעובדת תופסת 60% מגובה העמוד
    win.document.write('.filled-image { display: block; margin: auto; width: 100%; height: 60vh; object-fit: contain; }');
    // אזור הפלטה יקבל 40% מגובה העמוד
    win.document.write('.palette-section { margin-top: 5mm; height: 40vh; overflow: hidden; text-align: center; }');
    win.document.write('.palette-section h3 { margin-bottom: 3mm; }');
    // עיצוב פריט בפלטה – ניתן להתאים את הגודל כרצונך
    win.document.write('.palette-item { display: inline-block; margin: 2mm; }');
    win.document.write('.palette-item img { width: 30mm; height: auto; border: 1px solid #ccc; border-radius: 8px; }');
    win.document.write('</style>');
    win.document.write('</head><body>');

    // קבלת Data URL מהקנבס של התמונה המעובדת (filled)
    var filledDataUrl = $scope.c2.toDataURL();
    win.document.write('<img class="filled-image" src="' + filledDataUrl + '">');

    // הדפסת אזור הפלטה (מתכוני הצבעים)
    win.document.write('<div class="palette-section">');
    win.document.write('<h3>ColorBox  palette</h3>');
    for (var i = 0; i < $scope.palette.length; i++) {
         var color = $scope.palette[i];
         win.document.write('<div class="palette-item">');
         win.document.write('<img src="images/colors/' + color.label + '.jpg" alt="Color #' + color.label + '">');
         win.document.write('<p>Color #' + color.label + '</p>');
         win.document.write('</div>');
    }
    win.document.write('</div>');

    win.document.write('</body></html>');
    win.document.close();

    setTimeout(function(){
         win.focus();
         win.print();
         win.close();
    }, 250);
};


      $scope.saveOutline = function() {
          var win = window.open();
          win.document.write('<html><head><title>ColorBox outline</title></head><body><img src="' + $scope.c3.toDataURL() + '"></body></html>');
      };

      $scope.savePalette = function() {
          var canvas = document.createElement('canvas');
          canvas.width = 80 * Math.min($scope.palette.length, 10);
          canvas.height = 80 * (Math.floor(($scope.palette.length - 1) / 10) + 1);
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "#000000";
          for (var i = 0; i < $scope.palette.length; i++) {
              var col = $scope.palette[i];
              ctx.fillStyle = "rgba(" + col.r + ", " + col.g + ", " + col.b + ", 255)";
              var x = 80 * (i % 10);
              var y = 80 * Math.floor(i / 10);
              ctx.fillRect(x + 10, y + 10, 60, 60);
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(x + 10, y + 10, 20, 20);
              ctx.font = '16px sans-serif';
              ctx.fillStyle = "#000000";
              ctx.textAlign = "center";
              ctx.fillText(col.label, x + 20, y + 26);
              ctx.strokeRect(x + 10, y + 10, 60, 60);
          }
          var win = window.open();
          win.document.write('<html><head><title>ColorBox palette</title></head><body><img src="' + canvas.toDataURL() + '"></body></html>');
      };

  });
