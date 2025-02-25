/**
 * @license
 * Copyright Dan Munro
 * Released under Expat license <https://directory.fsf.org/wiki/License:Expat>
 */

'use strict';

importScripts('lodash.js');

// הרשימה הקבועה של צבעים עם תוויות
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

// פונקציה למציאת התווית (label) מהצבע הקרוב ביותר ברשימה הקבועה
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
    return nearest.label;
}

var getVicinVals = function(mat, x, y, range) {
    var width = mat[0].length;
    var height = mat.length;
    var vicinVals = [];
    for (var xx = x - range; xx <= x + range; xx++) {
        for (var yy = y - range; yy <= y + range; yy++) {
            if (xx >= 0 && xx < width && yy >= 0 && yy < height) {
                vicinVals.push(mat[yy][xx]);
            }
        }
    }
    return vicinVals;
};

var smooth = function(mat) {
    var width = mat[0].length;
    var height = mat.length;
    var simp = [];
    for (var i = 0; i < height; i++) {
        simp[i] = new Array(width);
    }
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var vicinVals = getVicinVals(mat, x, y, 4);
            simp[y][x] = Number(_.chain(vicinVals).countBy().toPairs().maxBy(_.last).head().value());
        }
    }
    return simp;
};

var neighborsSame = function(mat, x, y) {
    var width = mat[0].length;
    var height = mat.length;
    var val = mat[y][x];
    var xRel = [1, 0];
    var yRel = [0, 1];
    for (var i = 0; i < xRel.length; i++) {
        var xx = x + xRel[i];
        var yy = y + yRel[i];
        if (xx >= 0 && xx < width && yy >= 0 && yy < height) {
            if (mat[yy][xx] !== val) {
                return false;
            }
        }
    }
    return true;
};

var outline = function(mat) {
    var width = mat[0].length;
    var height = mat.length;
    var line = [];
    for (var i = 0; i < height; i++) {
        line[i] = new Array(width);
    }
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            line[y][x] = neighborsSame(mat, x, y) ? 0 : 1;
        }
    }
    return line;
};

var getRegion = function(mat, cov, x, y) {
    var covered = _.cloneDeep(cov);
    var region = { value: mat[y][x], x: [], y: [] };
    var value = mat[y][x];
    var queue = [[x, y]];
    while (queue.length > 0) {
        var coord = queue.shift();
        if (covered[coord[1]][coord[0]] === false && mat[coord[1]][coord[0]] === value) {
            region.x.push(coord[0]);
            region.y.push(coord[1]);
            covered[coord[1]][coord[0]] = true;
            if (coord[0] > 0) { queue.push([coord[0] - 1, coord[1]]); }
            if (coord[0] < mat[0].length - 1) { queue.push([coord[0] + 1, coord[1]]); }
            if (coord[1] > 0) { queue.push([coord[0], coord[1] - 1]); }
            if (coord[1] < mat.length - 1) { queue.push([coord[0], coord[1] + 1]); }
        }
    }
    return region;
};

var coverRegion = function(covered, region) {
    for (var i = 0; i < region.x.length; i++) {
        covered[region.y[i]][region.x[i]] = true;
    }
};

var sameCount = function(mat, x, y, incX, incY) {
    var value = mat[y][x];
    var count = -1;
    while (x >= 0 && x < mat[0].length && y >= 0 && y < mat.length && mat[y][x] === value) {
        count++;
        x += incX;
        y += incY;
    }
    return count;
};

// כאן, במקום לחשב את המספר על פי "goodness", אנו מחליפים את הערך הקודם בתווית הקבועה
var getLabelLoc = function(mat, region, palette) {
    var bestI = 0;
    var best = 0;
    for (var i = 0; i < region.x.length; i++) {
        var goodness = sameCount(mat, region.x[i], region.y[i], -1, 0) *
                       sameCount(mat, region.x[i], region.y[i], 1, 0) *
                       sameCount(mat, region.x[i], region.y[i], 0, -1) *
                       sameCount(mat, region.x[i], region.y[i], 0, 1);
        if (goodness > best) {
            best = goodness;
            bestI = i;
        }
    }
    // במקום להחזיר region.value + 1, נשתמש בתווית מהצבע שבפלטה (שמתאים לרשימה הקבועה)
    var paletteColor = palette[region.value];
    var fixedLabel = lookupFixedLabel(paletteColor);
    return {
        value: fixedLabel,
        x: region.x[bestI],
        y: region.y[bestI]
    };
};

var getBelowValue = function(mat, region) {
    var x = region.x[0];
    var y = region.y[0];
    while (mat[y][x] === region.value) {
        y++;
    }
    return mat[y][x];
};

var removeRegion = function(mat, region) {
    var newValue;
    if (region.y[0] > 0) {
        newValue = mat[region.y[0] - 1][region.x[0]];
    } else {
        newValue = getBelowValue(mat, region);
    }
    for (var i = 0; i < region.x.length; i++) {
        mat[region.y[i]][region.x[i]] = newValue;
    }
};

var getLabelLocs = function(mat, palette) {
    var width = mat[0].length;
    var height = mat.length;
    var covered = [];
    for (var i = 0; i < height; i++) {
        covered[i] = new Array(width);
        _.fill(covered[i], false);
    }
    var labelLocs = [];
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            if (covered[y][x] === false) {
                var region = getRegion(mat, covered, x, y);
                coverRegion(covered, region);
                if (region.x.length > 100) {
                    labelLocs.push(getLabelLoc(mat, region, palette));
                } else {
                    removeRegion(mat, region);
                }
            }
        }
    }
    return labelLocs;
};

self.addEventListener('message', function(e) {
    self.postMessage({
        cmd: "status",
        status: "smoothing edges..."
    });
    var matSmooth = smooth(e.data.mat);
    self.postMessage({
        cmd: "status",
        status: "identifying color regions..."
    });
    var labelLocs = getLabelLocs(matSmooth, e.data.palette);
    self.postMessage({
        cmd: "status",
        status: "drawing outline..."
    });
    var matLine = outline(matSmooth);
    self.postMessage({
        cmd: "result",
        matSmooth: matSmooth,
        labelLocs: labelLocs,
        matLine: matLine
    });
}, false);
