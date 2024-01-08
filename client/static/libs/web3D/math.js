var math = {
    limit: function (n, lmt) {
        // if n out of range, expand range
        if (typeof lmt[1] == 'undefined' || n > lmt[1]) {
            lmt[1] = n;
        } else if (typeof lmt[0] == 'undefined' || n < lmt[0]) {
            lmt[0] = n;
        }
    },
    average: function (n, avg) {
        avg[0] = avg[0] + (n - avg[0]) / (++avg[1]);
    },
    polysum: function (K, A) { // [ k0, k1, ..., kn ], [ [A0], ... ]
        var out = [],
            n = Math.min(K.length, A.length),
            m = A[0].length;
        for (var i = 0; i < m; i++) {
            out[i] = 0;
            for (var ii = 0; ii < n; ii++) {
                out[i] += K[ii] * A[ii][i];
            }
        }
        return out;
    },
}

var vec3 = {
    init: function () {
        return [0, 0, 0];
    },
    negate: function (A) {
        return [-A[0], -A[1], -A[2]];
    },
    plus: function (A, B) {
        return [A[0] + B[0], A[1] + B[1], A[2] + B[2]];
    },
    minus: function (A, B) {
        return [A[0] - B[0], A[1] - B[1], A[2] - B[2]];
    },
    point: function (A, B) {
        return vec3.minus(B, A);
    },
    scalar: function (k, A) {
        return [k * A[0], k * A[1], k * A[2]];
    },
    dot: function (A, B) {
        return A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
    },
    cross: function (A, B) {
        return [A[1] * B[2] - A[2] * B[1], A[2] * B[0] - A[0] * B[2], A[0] * B[1] - A[1] * B[0]];
    },
    x: function (A, B) {
        return [A[0] * B[0], A[1] * B[1], A[2] * B[2]];
    },
    len: function (A) {
        return Math.sqrt(A[0] * A[0] + A[1] * A[1] + A[2] * A[2]);
    },
    setlen: function (len, A) {
        return this.scalar(len, this.unit(A));
    },
    dist: function (A, B) {
        return this.len(this.minus(A, B));
    },
    mid: function (A, B) {
        return this.scalar(0.5, this.plus(A, B));
    },
    average: function (Vs) {
        var x = y = z = 0, len = Vs.length;
        if (len) {
            Vs.forEach(function (V) {
                x += V[0];
                y += V[1];
                z += V[2];
            });
            return [x / len, y / len, z / len];
        } else {
            return null;
        }
    },
    cos: function (A, B, unitized) {
        return unitized ? this.dot(A, B) : (this.dot(A, B) / this.len(A) / this.len(B));
    },
    rad: function (A, B, unitized) {
        var cos_AB = unitized ? this.dot(A, B) : (this.dot(A, B) / this.len(A) / this.len(B));
        return Math.acos(math.clamp(cos_AB, [-1, 1]));
    },
    unit: function (A) {
        var len = this.len(A);
        return len > Number.EPSILON ? this.scalar(1 / len, A) : [0, 0, 0];
    },
    step: function (t, A, B) {
        return this.plus(this.scalar(1 - t, A), this.scalar(t, B));
    }
}