// naturalFrame: function (path, frame) {
//         var offset = PDB.GeoCenterOffset;
//         var n = w3m.config.smooth_segment % 2 ? w3m.config.smooth_segment + 1 : w3m.config.smooth_segment,
//             k = w3m.config.smooth_curvature,
//             len = path.length;
//         /* xyz, color & tan */
//         // 0
//         path[0][3] = math.polysum([k, -k / 4], [vec3.point(path[0][1], path[1][1]), vec3.point(path[0][1], path[2][1])]);
//         var tan = vec3.unit(path[0][3]),
//             binormal = vec3.unit(vec3.cross(tan, path[0][4]));
//         normal = vec3.cross(binormal, tan);
//         path[0][4] = vec3.cross(binormal, tan);
//         var atom = w3m.tool.getMainAtomById(w3m.global.mol, path[0][0]);
//         if (PDB.residue && PDB.residue != "") {
//             atom = w3m.tool.getMainAtomById(PDB.residue, path[0][0]);
//         }
//         frame[0] = [path[0][0], path[0][1], path[0][2], tan, path[0][4], binormal, path[0][6]];
//         for (var i = 1; i < len; i++) {
//             // tan
//             if (i == len - 1) {
//                 path[i][3] = math.polysum([k, -k / 4], [vec3.point(path[i - 1][1], path[i][1]), vec3.point(path[i - 2][1], path[i][1])]);
//             } else {
//                 path[i][3] = vec3.scalar(k, vec3.point(path[i - 1][1], path[i + 1][1]));
//             }
//             // curve
//             var curve = math.hermiteFit(n, path[i - 1][1], path[i][1], path[i - 1][3], path[i][3]),
//                 id = path[i - 1][0],
//                 color = path[i - 1][2],
//                 turnover = path[i - 1][6],
//                 tan = vec3.unit(path[i][3]),
//                 binormal = vec3.unit(vec3.cross(tan, path[i][4]));
//             path[i][4] = vec3.cross(binormal, tan);
//
//             for (var ii = 1; ii <= n; ii++) {
//                 var t = ii / n,
//                     xyz = curve[ii][0],
//                     tan = vec3.unit(curve[ii][1]),
//                     normal_tmp = vec3.step(t, path[i - 1][4], path[i][4]),
//                     binormal = vec3.unit(vec3.cross(tan, normal_tmp)),
//                     normal = vec3.cross(binormal, tan);
//                 frame.push([id, xyz, color, tan, normal, binormal, turnover]);
//
//                 if (ii == n / 2) {
//
//                     id = path[i][0]; // switch id, color, turnover
//                     color = path[i][2];
//                     turnover = path[i][6];
//                     frame.push([id, xyz, color, tan, normal, binormal, turnover]);
//                 }
//                 //get all data
//                 if (w3m.CLENGTH == 1) {
//                     var atom = w3m.tool.getMainAtomById(w3m.global.mol, id);
//
//                     if (PDB.residue && PDB.residue != "") {
//                         atom = w3m.tool.getMainAtomById(PDB.residue, id);
//                     }
//                     if (atom) {
//                         if (w3m.mol[w3m.global.mol].residueData[atom.chainname][atom.resid].path.length == (w3m.config.smooth_segment + 1)) {
//                             continue;
//                         }
//                         w3m.mol[w3m.global.mol].residueData[atom.chainname][atom.resid].path.push(new THREE.Vector3(xyz[0] + offset.x, xyz[1] + offset.y, xyz[2] + offset.z));
//                         w3m.mol[w3m.global.mol].residueData[atom.chainname][atom.resid].binormals.push(new THREE.Vector3(binormal[0], binormal[1], binormal[2]));
//                         w3m.mol[w3m.global.mol].residueData[atom.chainname][atom.resid].normals.push(new THREE.Vector3(normal[0], normal[1], normal[2]));
//                         w3m.mol[w3m.global.mol].residueData[atom.chainname][atom.resid].tangents.push(new THREE.Vector3(tan[0], tan[1], tan[2]));
//                     }
//                 }
//             }
//         }
//         w3m.CLENGTH = 0;
//     },