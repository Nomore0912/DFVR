var ProteinSurface = function (n) {
    var o, r, t, s, e, a, f, v, u, y, h, d, x, z, l, p, w, c = 128,
        m = 1.4,
        b = 1,
        A = [1.9, 1.88, 1.63, 1.48, 1.78, 1.2, 1.87, 1.96, 1.63, .74, 1.8, 1.48, 1.2],
        M = new Array(13),
        g = new Array(13),
        q = 2,
        C = [
            [1, 0, 0],
            [-1, 0, 0],
            [0, 1, 0],
            [0, -1, 0],
            [0, 0, 1],
            [0, 0, -1],
            [1, 1, 0],
            [1, -1, 0],
            [-1, 1, 0],
            [-1, -1, 0],
            [1, 0, 1],
            [1, 0, -1],
            [-1, 0, 1],
            [-1, 0, -1],
            [0, 1, 1],
            [0, 1, -1],
            [0, -1, 1],
            [0, -1, -1],
            [1, 1, 1],
            [1, 1, -1],
            [1, -1, 1],
            [-1, 1, 1],
            [1, -1, -1],
            [-1, -1, 1],
            [-1, 1, -1],
            [-1, -1, -1]
        ],
        P = function (i, n, o) {
            this.x = i, this.y = n, this.z = o
        },
        R = function (i, n, o) {
            this.a = i, this.b = n, this.c = o
        };
    return this.initparm = function (i, n, v) {
        var u = 2.5;
        if (i === undefined || n === undefined) {
            return;
        }
        y = i.x, x = n.x, h = i.y, z = n.y, d = i.z, l = n.z, v ? (y -= u, h -= u, d -= u, x += u, z += u, l += u) : (y -= m + u, h -= m + u, d -= m + u, x += m + u, z += m + u, l += m + u), o = -y, r = -h, t = -d, b = x - y, z - h > b && (b = z - h), l - d > b && (b = l - d), b = (c - 1) / b, c = Math.floor(c * q / b), b = q;
        var p = 180;
        c > p && (sfthresh = p / c, c = Math.floor(p), b *= sfthresh), a = Math.ceil(b * (x - y)) + 1, e = Math.ceil(b * (z - h)) + 1, s = Math.ceil(b * (l - d)) + 1, a > c && (a = c), e > c && (e = c), s > c && (s = c), this.boundingatom(v), cutRadis = m * b, f = new Array(a * e * s)
    }, this.boundingatom = function (i) {
        for (var n, o, r, t = new Array(13), s = 0; 13 > s; ++s)
            for (i ? t[s] = (A[s] + m) * b + .5 : t[s] = A[s] * b + .5, r = t[s] * t[s], g[s] = Math.floor(t[s]) + 1, M[s] = new Array(g[s] * g[s]), indx = 0, j = 0; j < g[s]; ++j)
                for (k = 0; k < g[s]; ++k) n = j * j + k * k, n > r ? M[s][indx] = -1 : (o = Math.sqrt(r - n), M[s][indx] = Math.floor(o)), indx++
    }, this.fillvoxels = function (i) {
        if (f === undefined) {
            return;
        }
        for (var n = 0, o = f.length; o > n; ++n) f[n] = {
            inout: !1,
            isdone: !1,
            isbound: !1,
            distance: -1,
            atomid: -1
        };
        for (n in i) this.fillAtom(i[n], i);
        for (n = 0, o = f.length; o > n; ++n) f[n].inout && (f[n].isdone = !0);
        this.vp = f;
        for (var n = 0, o = f.length; o > n; ++n) f[n].inout && (f[n].isdone = !0)
    }, this.fillAtom = function (n, v) {
        var u, y, h, d, x, z;
        u = Math.floor(.5 + b * (n.coord.x + o)), y = Math.floor(.5 + b * (n.coord.y + r)), h = Math.floor(.5 + b * (n.coord.z + t));
        var l = this.getAtomType(n),
            p = 0;
        for (i = 0; i < g[l]; ++i)
            for (j = 0; j < g[l]; ++j) {
                if (-1 != M[l][p])
                    for (ii = -1; ii < 2; ++ii)
                        for (jj = -1; jj < 2; ++jj)
                            for (kk = -1; kk < 2; ++kk)
                                if (0 != ii && 0 != jj && 0 != kk)
                                    for (mi = ii * i, mk = kk * j, k = 0; k <= M[l][p]; ++k)
                                        if (mj = k * jj, si = u + mi, sj = y + mj, sk = h + mk, !(si < 0 || sj < 0 || sk < 0 || si >= a || sj >= e || sk >= s)) {
                                            var w = f[si * e * s + sj * s + sk];
                                            if (0 == w.inout) w.inout = !0, w.atomid = n.serial;
                                            else if (w.inout) {
                                                var c = v[w.atomid];
                                                d = Math.floor(.5 + b * (c.coord.x + o)), x = Math.floor(.5 + b * (c.coord.y + r)), z = Math.floor(.5 + b * (c.coord.z + t)), mi * mi + mj * mj + mk * mk < d * d + x * x + z * z && (w.atomid = n.serial)
                                            }
                                        }
                p++
            }
    }, this.fillvoxelswaals = function (i) {
        for (var n = 0, o = f.length; o > n; ++n) f[n].isdone = !1;
        for (n in i) this.fillAtomWaals(i[n], i)
    }, this.fillAtomWaals = function (n, a) {
        var v, u, y, h, d, x, z = 0;
        v = Math.floor(.5 + b * (n.coord.x + o)), u = Math.floor(.5 + b * (n.coord.y + r)), y = Math.floor(.5 + b * (n.coord.z + t));
        var l = this.getAtomType(n);
        for (i = 0; i < g[l]; ++i)
            for (j = 0; j < g[l]; ++j) {
                if (-1 != M[l][z])
                    for (ii = -1; ii < 2; ++ii)
                        for (jj = -1; jj < 2; ++jj)
                            for (kk = -1; kk < 2; ++kk)
                                if (0 != ii && 0 != jj && 0 != kk)
                                    for (mi = ii * i, mk = kk * j, k = 0; k <= M[l][z]; ++k)
                                        if (mj = k * jj, si = v + mi, sj = u + mj, sk = y + mk, !(si < 0 || sj < 0 || sk < 0)) {
                                            var p = f[si * e * s + sj * s + sk];
                                            if (0 == p.isdone) p.isdone = !0, p.atomid = n.serial;
                                            else if (p.isdone) {
                                                var w = a[p.atomid];
                                                h = Math.floor(.5 + b * (w.coord.x + o)), d = Math.floor(.5 + b * (w.coord.y + r)), x = Math.floor(.5 + b * (w.coord.z + t)), mi * mi + mj * mj + mk * mk < h * h + d * d + x * x && (p.atomid = n.serial)
                                            }
                                        }
                z++
            }
    }, this.getAtomType = function (i) {
        var n = 10;
        return "CA" == i.name ? n = 0 : "C" == i.name ? n = 1 : "C" == i.elem ? n = 7 : "0" == i.name ? n = 3 : "O" == i.elem ? n = 11 : "N" == i.name ? n = 2 : "N" == i.elem ? n = 8 : "S" == i.elem ? n = 4 : "P" == i.elem ? n = 6 : "FE" == i.name ? n = 9 : "H" == i.name ? n = 5 : "H" == i.elem && (n = 12), n
    }, this.buildboundary = function () {
        for (f = this.vp, i = 0; i < a; ++i)
            for (j = 0; j < s; ++j)
                for (k = 0; k < e; ++k) {
                    var n = f[i * e * s + k * s + j];
                    if (n.inout)
                        for (var o = !1, r = 0; !o && 26 > r;) {
                            var t = i + C[r][0],
                                v = j + C[r][2],
                                u = k + C[r][1];
                            t > -1 && a > t && u > -1 && e > u && v > -1 && s > v && !f[t * e * s + u * s + v].inout ? (n.isbound = !0, o = !0) : r++
                        }
                }
    }, this.fastdistancemap = function () {
        var i, n;
        totalsurfacevox = 0, totalinnervox = 0;
        for (var o = new Array(a), r = 0; a > r; ++r) {
            for (var t = new Array(e), v = 0; e > v; ++v) {
                for (var u = new Array(s), y = 0; s > y; ++y) u[y] = {
                    ix: 0,
                    iy: 0,
                    iz: 0
                };
                t[v] = u
            }
            o[r] = t
        }
        for (r = 0; a > r; ++r)
            for (v = 0; e > v; ++v)
                for (y = 0; s > y; ++y) {
                    var h = f[r * e * s + v * s + y];
                    h.isdone = !1, h.inout && (h.isbound ? (totalsurfacevox++, o[r][v][y].ix = r, o[r][v][y].iy = v, o[r][v][y].iz = y, h.distance = 0, h.isdone = !0) : totalinnervox++)
                }
        inarray = new Array, outarray = new Array;
        var i = 0,
            n = 0;
        for (r = 0; a > r; ++r)
            for (v = 0; e > v; ++v)
                for (y = 0; s > y; ++y) {
                    var h = f[r * e * s + v * s + y];
                    h.isbound && (inarray.push({
                        ix: r,
                        iy: v,
                        iz: y
                    }), i++, h.isbound = !1)
                }
        do
            for (n = this.fastoneshell(i, o), i = 0, inarray = [], r = 0; n > r; ++r) {
                var d = f[e * s * outarray[r].ix + s * outarray[r].iy + outarray[r].iz];
                d.isbound = !1, d.distance <= 1.02 * cutRadis && (inarray.push({
                    ix: outarray[r].ix,
                    iy: outarray[r].iy,
                    iz: outarray[r].iz
                }), i++)
            }
        while (0 != i);
        var x = b - .5;
        for (0 > x && (x = 0), r = 0; a > r; ++r)
            for (v = 0; e > v; ++v)
                for (y = 0; s > y; ++y) {
                    var h = f[r * e * s + v * s + y];
                    h.isbound = !1, h.inout && (!h.isdone || h.isdone && h.distance >= cutRadis - .5 / (.1 + x)) && (h.isbound = !0)
                }
        inarray = [], outarray = []
    }, this.fastoneshell = function (i, n) {
        var o, r, t, v, u, y, h, d = 0;
        if (0 == i) return 0;
        outarray = [], tnv = {
            ix: -1,
            iy: -1,
            iz: -1
        };
        for (var x = 0; i > x; ++x) {
            o = inarray[x].ix, r = inarray[x].iy, t = inarray[x].iz;
            for (var z = 0; 6 > z; ++z) {
                tnv.ix = o + C[z][0], tnv.iy = r + C[z][1], tnv.iz = t + C[z][2];
                var l = f[tnv.ix * e * s + s * tnv.iy + tnv.iz];
                if (tnv.ix < a && tnv.ix > -1 && tnv.iy < e && tnv.iy > -1 && tnv.iz < s && tnv.iz > -1 && l.inout && !l.isdone) {
                    n[tnv.ix][tnv.iy][t + C[z][2]].ix = n[o][r][t].ix, n[tnv.ix][tnv.iy][t + C[z][2]].iy = n[o][r][t].iy, n[tnv.ix][tnv.iy][t + C[z][2]].iz = n[o][r][t].iz, v = tnv.ix - n[o][r][t].ix, u = tnv.iy - n[o][r][t].iy, y = tnv.iz - n[o][r][t].iz;
                    var h = v * v + u * u + y * y;
                    l.distance = Math.sqrt(h), l.isdone = !0, l.isbound = !0, outarray.push({
                        ix: tnv.ix,
                        iy: tnv.iy,
                        iz: tnv.iz
                    }), d++
                } else tnv.ix < a && tnv.ix > -1 && tnv.iy < e && tnv.iy > -1 && tnv.iz < s && tnv.iz > -1 && l.inout && l.isdone && (v = tnv.ix - n[o][r][t].ix, u = tnv.iy - n[o][r][t].iy, y = tnv.iz - n[o][r][t].iz, h = v * v + u * u + y * y, h = Math.sqrt(h), h < l.distance && (n[tnv.ix][tnv.iy][tnv.iz].ix = n[o][r][t].ix, n[tnv.ix][tnv.iy][tnv.iz].iy = n[o][r][t].iy, n[tnv.ix][tnv.iy][tnv.iz].iz = n[o][r][t].iz, l.distance = h, l.isbound || (l.isbound = !0, outarray.push({
                    ix: tnv.ix,
                    iy: tnv.iy,
                    iz: tnv.iz
                }), d++)))
            }
        }
        for (x = 0; i > x; ++x)
            for (o = inarray[x].ix, r = inarray[x].iy, t = inarray[x].iz, z = 6; 18 > z; ++z) {
                tnv.ix = o + C[z][0], tnv.iy = r + C[z][1], tnv.iz = t + C[z][2];
                var l = f[tnv.ix * e * s + s * tnv.iy + tnv.iz];
                tnv.ix < a && tnv.ix > -1 && tnv.iy < e && tnv.iy > -1 && tnv.iz < s && tnv.iz > -1 && l.inout && !l.isdone ? (n[tnv.ix][tnv.iy][t + C[z][2]].ix = n[o][r][t].ix, n[tnv.ix][tnv.iy][t + C[z][2]].iy = n[o][r][t].iy, n[tnv.ix][tnv.iy][t + C[z][2]].iz = n[o][r][t].iz, v = tnv.ix - n[o][r][t].ix, u = tnv.iy - n[o][r][t].iy, y = tnv.iz - n[o][r][t].iz, h = v * v + u * u + y * y, l.distance = Math.sqrt(h), l.isdone = !0, l.isbound = !0, outarray.push({
                    ix: tnv.ix,
                    iy: tnv.iy,
                    iz: tnv.iz
                }), d++) : tnv.ix < a && tnv.ix > -1 && tnv.iy < e && tnv.iy > -1 && tnv.iz < s && tnv.iz > -1 && l.inout && l.isdone && (v = tnv.ix - n[o][r][t].ix, u = tnv.iy - n[o][r][t].iy, y = tnv.iz - n[o][r][t].iz, h = Math.sqrt(v * v + u * u + y * y), h < l.distance && (n[tnv.ix][tnv.iy][tnv.iz].ix = n[o][r][t].ix, n[tnv.ix][tnv.iy][tnv.iz].iy = n[o][r][t].iy, n[tnv.ix][tnv.iy][tnv.iz].iz = n[o][r][t].iz, l.distance = h, l.isbound || (l.isbound = !0, outarray.push({
                    ix: tnv.ix,
                    iy: tnv.iy,
                    iz: tnv.iz
                }), d++)))
            }
        for (x = 0; i > x; ++x)
            for (o = inarray[x].ix, r = inarray[x].iy, t = inarray[x].iz, z = 18; 26 > z; ++z) {
                tnv.ix = o + C[z][0], tnv.iy = r + C[z][1], tnv.iz = t + C[z][2];
                var l = f[tnv.ix * e * s + s * tnv.iy + tnv.iz];
                tnv.ix < a && tnv.ix > -1 && tnv.iy < e && tnv.iy > -1 && tnv.iz < s && tnv.iz > -1 && l.inout && !l.isdone ? (n[tnv.ix][tnv.iy][t + C[z][2]].ix = n[o][r][t].ix, n[tnv.ix][tnv.iy][t + C[z][2]].iy = n[o][r][t].iy, n[tnv.ix][tnv.iy][t + C[z][2]].iz = n[o][r][t].iz, v = tnv.ix - n[o][r][t].ix, u = tnv.iy - n[o][r][t].iy, y = tnv.iz - n[o][r][t].iz, h = v * v + u * u + y * y, l.distance = Math.sqrt(h), l.isdone = !0, l.isbound = !0, outarray.push({
                    ix: tnv.ix,
                    iy: tnv.iy,
                    iz: tnv.iz
                }), d++) : tnv.ix < a && tnv.ix > -1 && tnv.iy < e && tnv.iy > -1 && tnv.iz < s && tnv.iz > -1 && l.inout && l.isdone && (v = tnv.ix - n[o][r][t].ix, u = tnv.iy - n[o][r][t].iy, y = tnv.iz - n[o][r][t].iz, h = Math.sqrt(v * v + u * u + y * y), h < l.distance && (n[tnv.ix][tnv.iy][tnv.iz].ix = n[o][r][t].ix, n[tnv.ix][tnv.iy][tnv.iz].iy = n[o][r][t].iy, n[tnv.ix][tnv.iy][tnv.iz].iz = n[o][r][t].iz, l.distance = h, l.isbound || (l.isbound = !0, outarray.push({
                    ix: tnv.ix,
                    iy: tnv.iy,
                    iz: tnv.iz
                }), d++)))
            }
        return d
    }, this.marchingcube = function (i) {
        if (f === undefined) {
            return;
        }
        for (var n = 0, o = f.length; o > n; ++n) 1 == i ? f[n].isbound = !1 : 4 == i ? (f[n].isdone = !1, f[n].isbound && (f[n].isdone = !0), f[n].isbound = !1) : 2 == i ? f[n].isbound && f[n].isdone ? f[n].isbound = !1 : f[n].isbound && !f[n].isdone && (f[n].isdone = !0) : 3 == i && (f[n].isbound = !1);
        for (var r = new Array(a), n = 0; a > n; ++n) {
            for (var t = new Array(e), y = 0; e > y; ++y) {
                for (var h = new Array(s), d = 0; s > d; ++d) h[d] = -1;
                t[y] = h
            }
            r[n] = t
        }
        v = 0, u = 0, w = new Array, p = new Array;
        for (var x, z, l, c, m = new Array(6), n = 0; 6 > n; ++n) m[n] = new Array(3);
        for (n = 0; 1 > n; ++n)
            for (y = 0; e - 1 > y; ++y)
                for (d = 0; s - 1 > d; ++d) {
                    var k = f[e * s * n + s * y + d].isdone,
                        b = f[e * s * n + s * y + d + 1].isdone,
                        j = f[e * s * n + s * (y + 1) + d].isdone,
                        A = f[e * s * n + s * (y + 1) + d + 1].isdone,
                        M = f[e * s * (n + 1) + s * y + d].isdone,
                        g = f[e * s * (n + 1) + s * y + d + 1].isdone,
                        q = f[e * s * (n + 1) + s * (y + 1) + d].isdone,
                        C = f[e * s * (n + 1) + s * (y + 1) + d + 1].isdone;
                    if (k && j && A && b) {
                        for (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1, z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[1][0]][m[1][1]][m[1][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[3][0]][m[3][1]][m[3][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                    } else if (k && j && A || j && A && b || A && b && k || b && k && j) {
                        for (k && j && A ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1) : j && A && b ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : A && b && k ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d) : b && k && j && (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[1][0]][m[1][1]][m[1][2]])), u++
                    }
                }
        for (n = 0; a - 1 > n; ++n)
            for (y = 0; 1 > y; ++y)
                for (d = 0; s - 1 > d; ++d) {
                    var k = f[e * s * n + s * y + d].isdone,
                        b = f[e * s * n + s * y + d + 1].isdone,
                        M = f[e * s * (n + 1) + s * y + d].isdone,
                        g = f[e * s * (n + 1) + s * y + d + 1].isdone;
                    if (k && M && g && b) {
                        for (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1, z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                    } else if (k && M && g || M && g && b || g && b && k || b && k && M) {
                        for (k && M && g ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : M && g && b ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : g && b && k ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d) : b && k && M && (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                    }
                }
        for (n = 0; a - 1 > n; ++n)
            for (y = 0; e - 1 > y; ++y)
                for (d = 0; 1 > d; ++d) {
                    var k = f[e * s * n + s * y + d].isdone,
                        j = f[e * s * n + s * (y + 1) + d].isdone,
                        M = f[e * s * (n + 1) + s * y + d].isdone,
                        q = f[e * s * (n + 1) + s * (y + 1) + d].isdone;
                    if (k && M && q && j) {
                        for (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d, z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[1][0]][m[1][1]][m[1][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[3][0]][m[3][1]][m[3][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                    } else if (k && M && q || M && q && j || q && j && k || j && k && M) {
                        for (k && M && q ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : M && q && j ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : q && j && k ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d) : j && k && M && (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[1][0]][m[1][1]][m[1][2]])), u++
                    }
                }
        for (n = a - 1; a > n; ++n)
            for (y = 0; e - 1 > y; ++y)
                for (d = 0; s - 1 > d; ++d) {
                    var k = f[e * s * n + s * y + d].isdone,
                        b = f[e * s * n + s * y + d + 1].isdone,
                        j = f[e * s * n + s * (y + 1) + d].isdone,
                        A = f[e * s * n + s * (y + 1) + d + 1].isdone;
                    if (k && j && A && b) {
                        for (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1, z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                    } else if (k && j && A || j && A && b || A && b && k || b && k && j) {
                        for (k && j && A ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1) : j && A && b ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : A && b && k ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d) : b && k && j && (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                    }
                }
        for (n = 0; a - 1 > n; ++n)
            for (y = e - 1; e > y; ++y)
                for (d = 0; s - 1 > d; ++d) {
                    var k = f[e * s * n + s * y + d].isdone,
                        b = f[e * s * n + s * y + d + 1].isdone,
                        M = f[e * s * (n + 1) + s * y + d].isdone,
                        g = f[e * s * (n + 1) + s * y + d + 1].isdone;
                    if (k && M && g && b) {
                        for (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1, z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[1][0]][m[1][1]][m[1][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[3][0]][m[3][1]][m[3][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                    } else if (k && M && g || M && g && b || g && b && k || b && k && M) {
                        for (k && M && g ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : M && g && b ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : g && b && k ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d) : b && k && M && (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[1][0]][m[1][1]][m[1][2]])), u++
                    }
                }
        for (n = 0; a - 1 > n; ++n)
            for (y = 0; e - 1 > y; ++y)
                for (d = s - 1; s > d; ++d) {
                    var k = f[e * s * n + s * y + d].isdone,
                        j = f[e * s * n + s * (y + 1) + d].isdone,
                        M = f[e * s * (n + 1) + s * y + d].isdone,
                        q = f[e * s * (n + 1) + s * (y + 1) + d].isdone;
                    if (k && M && q && j) {
                        for (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d, z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                    } else if (k && M && q || M && q && j || q && j && k || j && k && M) {
                        for (k && M && q ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : M && q && j ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : q && j && k ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d) : j && k && M && (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                    }
                }
        for (n = 0; a - 1 > n; ++n)
            for (y = 0; e - 1 > y; ++y)
                for (d = 0; s - 1 > d; ++d) {
                    var k = f[e * s * n + s * y + d].isdone,
                        b = f[e * s * n + s * y + d + 1].isdone,
                        j = f[e * s * n + s * (y + 1) + d].isdone,
                        A = f[e * s * n + s * (y + 1) + d + 1].isdone,
                        M = f[e * s * (n + 1) + s * y + d].isdone,
                        g = f[e * s * (n + 1) + s * y + d + 1].isdone,
                        q = f[e * s * (n + 1) + s * (y + 1) + d].isdone,
                        C = f[e * s * (n + 1) + s * (y + 1) + d + 1].isdone,
                        x = 0;
                    for (z = 0; 2 > z; ++z)
                        for (l = 0; 2 > l; ++l)
                            for (c = 0; 2 > c; ++c) f[e * s * (n + z) + s * (y + l) + d + c].isdone && x++;
                    if (3 == x) {
                        if (k && M && q || k && j && q || j && M && q || k && j && M || b && g && C || b && A && C || A && g && C || b && A && g || k && M && g || M && g && b || k && g && b || k && M && b || q && M && C || q && g && C || M && g && C || q && M && g || q && j && A || j && A && C || q && A && C || q && j && C || k && j && b || k && b && A || b && j && A || k && j && A) {
                            for (k && M && q ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : k && j && q ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d) : j && M && q ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : k && j && M ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : b && g && C ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : b && A && C ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1) : A && g && C ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : b && A && g ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1) : k && M && g ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d) : M && g && b ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : k && g && b ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : k && M && b ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : q && M && C ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : q && g && C ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : M && g && C ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1) : q && M && g ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : q && j && A ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : j && A && C ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : q && A && C ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1) : q && j && C ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1) : k && j && b ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : k && b && A ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d) : b && j && A ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : k && j && A && (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                        }
                    } else if (4 == x) {
                        if (k && M && q && j || b && g && C && A || k && M && g && b || q && M && g && C || q && j && A && C || k && j && b && A) {
                            for (k && M && q && j ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d) : b && g && C && A ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1) : k && M && g && b ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1) : q && M && g && C ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1) : q && j && A && C ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : k && j && b && A && (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1), z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                        } else if (k && M && q && A || k && j && q && g || j && M && q && b || k && j && M && C || b && g && C && j || b && A && C && M || A && g && C && k || b && A && g && q || k && M && g && A || M && g && b && j || k && g && b && q || k && M && b && C || q && M && C && b || q && g && C && k || M && g && C && j || q && M && g && A || q && j && A && g || j && A && C && M || q && A && C && k || q && j && C && b || k && j && b && C || k && b && A && q || b && j && A && M || k && j && A && g) {
                            for (k && M && q && A ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : k && j && q && g ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d) : j && M && q && b ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : k && j && M && C ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : b && g && C && j ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : b && A && C && M ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1) : A && g && C && k ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : b && A && g && q ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1) : k && M && g && A ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d) : M && g && b && j ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : k && g && b && q ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : k && M && b && C ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : q && M && C && b ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : q && g && C && k ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : M && g && C && j ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1) : q && M && g && A ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : q && j && A && g ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : j && A && C && M ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : q && A && C && k ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1) : q && j && C && b ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1) : k && j && b && C ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : k && b && A && q ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d) : b && j && A && M ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1) : k && j && A && g && (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                        } else if (k && A && q && j || k && M && q && g || k && b && M && j || j && M && q && C || b && A && C && j || b && M && C && g || k && b && g && A || A && g && q && C) {
                            for (j && A && k && q ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : M && g && q && k ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d) : k && b && M && j ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : q && C && j && M ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : j && A && C && b ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1) : M && g && C && b ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1) : k && b && g && A ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1) : A && g && q && C && (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                        } else if (k && M && q && b || j && M && q && g || j && k && q && C || j && k && M && A || A && b && g && M || C && b && g && q || C && A && g && j || C && A && b && k || q && A && b && j || g && k && b && j || g && k && C && M || A && q && C && M) {
                            for (k && M && q && b ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : j && M && q && g ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : j && k && q && C ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1) : j && k && M && A ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : A && b && g && M ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : C && b && g && q ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : C && A && g && j ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : C && A && b && k ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1) : q && A && b && j ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : g && k && b && j ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : g && k && C && M ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1) : A && q && C && M && (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1), z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                        } else if (k && M && j && g || k && M && q && C || j && M && q && A || j && k && q && b || C && b && g && k || C && A && g && M || C && A && b && q || g && A && b && j || C && A && k && j || M && k && b && A || g && b && q && M || j && q && C && g) {
                            for (k && M && j && g ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : k && M && q && C ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1) : j && M && q && A ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : j && k && q && b ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : C && b && g && k ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1) : C && A && g && M ? (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : C && A && b && q ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : g && A && b && j ? (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : C && A && k && j ? (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d) : M && k && b && A ? (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d) : g && b && q && M ? (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d) : j && q && C && g && (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d), z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                        }
                    } else if (5 == x)
                        if ((M || b || C) && (j || b || C) && (q || g || A) && (k || g || A) && (g || k || q) && (A || k || q) && (C || M || j) && (b || M || j))
                            if ((k || M || q) && (k || j || q) && (j || M || q) && (k || j || M) && (b || g || C) && (b || A || C) && (A || g || C) && (b || A || g) && (k || M || g) && (M || g || b) && (k || g || b) && (k || M || b) && (q || M || C) && (q || g || C) && (M || g || C) && (q || M || g) && (q || j || A) && (j || A || C) && (q || A || C) && (q || j || C) && (k || j || b) && (k || b || A) && (b || j || A) && (k || j || A))
                                if ((k || M || C) && (j || q || b) && (A || C || M) && (b || g || q) && (k || j || C) && (g || C || j) && (M || q || A) && (b || A || q) && (k || b || C) && (q || C || k) && (M || g || A) && (j || A || g)) {
                                    if (!((k || M || A) && (j || q || g) && (A || C || k) && (b || g || j) && (k || j || g) && (g || C || k) && (M || q || b) && (b || A || M) && (k || b || q) && (q || C || b) && (M || g || j) && (j || A || M))) {
                                        for (k || M || A ? j || q || g ? A || C || k ? b || g || j ? k || j || g ? g || C || k ? M || q || b ? b || A || M ? k || b || q ? q || C || b ? M || g || j ? j || A || M || (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y + 1, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d, m[4][0] = n, m[4][1] = y, m[4][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y + 1, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d, m[4][0] = n + 1, m[4][1] = y + 1, m[4][2] = d) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y + 1, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y + 1, m[4][2] = d) : (m[1][0] = n,
                                            m[1][1] = y, m[1][2] = d + 1, m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[4][0] = n + 1, m[4][1] = y + 1, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y + 1, m[4][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d, m[4][0] = n + 1, m[4][1] = y, m[4][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y + 1, m[4][2] = d + 1), z = 0; 5 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[4][0]][m[4][1]][m[4][2]], r[m[1][0]][m[1][1]][m[1][2]])), u++
                                    }
                                } else {
                                    for (k || M || C ? j || q || b ? A || C || M ? b || g || q ? k || j || C ? g || C || j ? M || q || A ? b || A || q ? k || b || C ? q || C || k ? M || g || A ? j || A || g || (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y, m[4][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y + 1, m[4][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d, m[4][0] = n, m[4][1] = y, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y + 1, m[4][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d, m[4][0] = n + 1, m[4][1] = y, m[4][2] = d) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y, m[4][2] = d) : (m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[4][0] = n + 1, m[4][1] = y, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y + 1, m[4][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d, m[4][0] = n, m[4][1] = y, m[4][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y, m[4][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y + 1, m[4][2] = d + 1), z = 0; 5 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                                    p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++, p.push(new R(r[m[2][0]][m[2][1]][m[2][2]], r[m[4][0]][m[4][1]][m[4][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                                } else {
                                for (k || M || q ? k || j || q ? j || M || q ? k || j || M ? b || g || C ? b || A || C ? A || g || C ? b || A || g ? k || M || g ? M || g || b ? k || g || b ? k || M || b ? q || M || C ? q || g || C ? M || g || C ? q || M || g ? q || j || A ? j || A || C ? q || A || C ? q || j || C ? k || j || b ? k || b || A ? b || j || A ? k || j || A || (m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : (m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d) : (m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d) : (m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : (m[2][0] = n, m[2][1] = y, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : (m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d) : (m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[0][0] = n, m[0][1] = y, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d) : (m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1) : (m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1) : (m[2][0] = n, m[2][1] = y, m[2][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d) : (m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d) : (m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[0][0] = n, m[0][1] = y, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : (m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : (m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d) : (m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[3][0] = n, m[3][1] = y, m[3][2] = d) : (m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : (m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1) : (m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : (m[2][0] = n, m[2][1] = y, m[2][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : (m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[0][0] = n, m[0][1] = y, m[0][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : (m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d) : (m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d) : (m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d) : (m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d), z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                                p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                            } else {
                            for (M || b || C ? j || b || C ? q || g || A ? k || g || A ? g || k || q ? A || k || q ? C || M || j ? b || M || j || (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                        } else if (6 == x) {
                        if (!k && !M || !j && !q || !A && !C || !b && !g || !k && !j || !g && !C || !M && !q || !b && !A || !k && !b || !q && !C || !M && !g || !j && !A) {
                            for (k || M ? j || q ? A || C ? b || g ? k || j ? g || C ? M || q ? b || A ? k || b ? q || C ? M || g ? j || A || (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d), z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                        } else if (!k && !C || !M && !A || !j && !g || !q && !b) {
                            for (k || C ? M || A ? j || g ? q || b || (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y, m[4][2] = d, m[5][0] = n, m[5][1] = y + 1, m[5][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1, m[4][0] = n + 1, m[4][1] = y + 1, m[4][2] = d, m[5][0] = n, m[5][1] = y, m[5][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y, m[4][2] = d, m[5][0] = n + 1, m[5][1] = y + 1, m[5][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1, m[4][0] = n, m[4][1] = y + 1, m[4][2] = d, m[5][0] = n + 1, m[5][1] = y, m[5][2] = d), z = 0; 6 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[3][0]][m[3][1]][m[3][2]], r[m[4][0]][m[4][1]][m[4][2]], r[m[5][0]][m[5][1]][m[5][2]])), u++
                        } else if (!k && !g || !M && !b || !M && !C || !q && !g || !q && !A || !j && !C || !j && !b || !k && !A || !b && !C || !g && !A || !k && !q || !M && !j) {
                            for (k || g ? M || b ? M || C ? q || g ? q || A ? j || C ? j || b ? k || A ? b || C ? g || A ? k || q ? M || j || (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[3][0] = n + 1, m[3][1] = y, m[3][2] = d + 1) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[3][0] = n, m[3][1] = y, m[3][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[3][0] = n, m[3][1] = y, m[3][2] = d + 1) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[3][0] = n, m[3][1] = y + 1, m[3][2] = d + 1) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d) : (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[3][0] = n + 1, m[3][1] = y + 1, m[3][2] = d + 1), z = 0; 4 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                            p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++, p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[2][0]][m[2][1]][m[2][2]], r[m[3][0]][m[3][1]][m[3][2]])), u++
                        }
                    } else if (7 == x) {
                        for (k ? M ? q ? j ? b ? g ? C ? A || (m[0][0] = n, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y, m[1][2] = d + 1, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d + 1, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d + 1, m[2][0] = n, m[2][1] = y, m[2][2] = d) : (m[0][0] = n + 1, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y + 1, m[2][2] = d + 1) : (m[0][0] = n + 1, m[0][1] = y, m[0][2] = d, m[1][0] = n, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y + 1, m[2][2] = d + 1) : (m[0][0] = n, m[0][1] = y, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y + 1, m[1][2] = d, m[2][0] = n + 1, m[2][1] = y, m[2][2] = d + 1) : (m[0][0] = n, m[0][1] = y + 1, m[0][2] = d, m[1][0] = n + 1, m[1][1] = y, m[1][2] = d, m[2][0] = n, m[2][1] = y, m[2][2] = d + 1), z = 0; 3 > z; ++z) -1 == r[m[z][0]][m[z][1]][m[z][2]] && (r[m[z][0]][m[z][1]][m[z][2]] = v, w.push(new P(m[z][0], m[z][1], m[z][2])), v++);
                        p.push(new R(r[m[0][0]][m[0][1]][m[0][2]], r[m[1][0]][m[1][1]][m[1][2]], r[m[2][0]][m[2][1]][m[2][2]])), u++
                    }
                }
        for (this.faces = p, this.verts = w, n = 0; v > n; ++n) w[n].atomid = f[w[n].x * e * s + s * w[n].y + w[n].z].atomid
    }, this.laplaciansmooth = function (i) {
        for (var n = new Array(v), o = 0; v > o; ++o) n[o] = {
            x: 0,
            y: 0,
            z: 0
        };
        for (var r, t = new Array(20), o = 0; 20 > o; ++o) t[o] = new Array(v);
        for (var o = 0; v > o; ++o) t[0][o] = 0;
        for (var o = 0; u > o; ++o) {
            r = !0;
            for (var s = 0; s < t[0][p[o].a]; ++s)
                if (p[o].b == t[s + 1][p[o].a]) {
                    r = !1;
                    break
                }
            r && (t[0][p[o].a]++, t[t[0][p[o].a]][p[o].a] = p[o].b), r = !0;
            for (var s = 0; s < t[0][p[o].a]; ++s)
                if (p[o].c == t[s + 1][p[o].a]) {
                    r = !1;
                    break
                }
            for (r && (t[0][p[o].a]++, t[t[0][p[o].a]][p[o].a] = p[o].c), r = !0, s = 0; s < t[0][p[o].b]; ++s)
                if (p[o].a == t[s + 1][p[o].b]) {
                    r = !1;
                    break
                }
            for (r && (t[0][p[o].b]++, t[t[0][p[o].b]][p[o].b] = p[o].a), r = !0, s = 0; s < t[0][p[o].b]; ++s)
                if (p[o].c == t[s + 1][p[o].b]) {
                    r = !1;
                    break
                }
            for (r && (t[0][p[o].b]++, t[t[0][p[o].b]][p[o].b] = p[o].c), r = !0, s = 0; s < t[0][p[o].c]; ++s)
                if (p[o].a == t[s + 1][p[o].c]) {
                    r = !1;
                    break
                }
            for (r && (t[0][p[o].c]++, t[t[0][p[o].c]][p[o].c] = p[o].a), r = !0, s = 0; s < t[0][p[o].c]; ++s)
                if (p[o].b == t[s + 1][p[o].c]) {
                    r = !1;
                    break
                }
            r && (t[0][p[o].c]++, t[t[0][p[o].c]][p[o].c] = p[o].b)
        }
        for (var e = 1, a = .5, f = 0; i > f; ++f) {
            for (var o = 0; v > o; ++o)
                if (t[0][o] < 3) n[o].x = w[o].x, n[o].y = w[o].y, n[o].z = w[o].z;
                else if (3 == t[0][o] || 4 == t[0][o]) {
                    for (n[o].x = 0, n[o].y = 0, n[o].z = 0, s = 0; s < t[0][o]; ++s) n[o].x += w[t[s + 1][o]].x, n[o].y += w[t[s + 1][o]].y, n[o].z += w[t[s + 1][o]].z;
                    n[o].x += a * w[o].x, n[o].y += a * w[o].y, n[o].z += a * w[o].z, n[o].x /= a + t[0][o], n[o].y /= a + t[0][o], n[o].z /= a + t[0][o]
                } else {
                    n[o].x = 0, n[o].y = 0, n[o].z = 0;
                    for (var s = 0; s < t[0][o]; ++s) n[o].x += w[t[s + 1][o]].x, n[o].y += w[t[s + 1][o]].y, n[o].z += w[t[s + 1][o]].z;
                    n[o].x += e * w[o].x, n[o].y += e * w[o].y, n[o].z += e * w[o].z, n[o].x /= e + t[0][o], n[o].y /= e + t[0][o], n[o].z /= e + t[0][o]
                }
            for (var o = 0; v > o; ++o) w[o].x = n[o].x, w[o].y = n[o].y, w[o].z = n[o].z
        }
    }, this.transformVertices = function () {
        for (var i = this.verts, n = 1 / b, s = 0; v > s; ++s) i[s].x = i[s].x * n - o, i[s].y = i[s].y * n - r, i[s].z = i[s].z * n - t
    }, initparm(n.min, n.max, n.type > 1), fillvoxels(n.atoms), buildboundary(), 4 != n.type && 2 != n.type || fastdistancemap(), 2 == n.type && (boundingatom(!1), fillvoxelswaals(n.atoms)), marchingcube(n.type), laplaciansmooth(1), transformVertices(), {
        verts: w,
        faces: p
    }
};
self.addEventListener("message", function (i) {
    self.postMessage(ProteinSurface(i.data))
});
