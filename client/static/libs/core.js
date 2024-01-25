/**
 * init pdb
 */
var df;
df = {
    remoteUrl: ['https://www.rcsb.org/pdb/files/', 'data/'],
    isShowWater: false,

    // 重新加载时需要初始化的参数
    pdbId: [],

    // config
    config: {
        water_sphere_w: 8,

    },
    // all pdb info group, 这里包含 pdb 用于展示的全部属性
    GROUP: {},
    GROUP_HET_INDEX: {},
    GROUP_MAIN_INDEX: {},
    GROUP_STRUCTURE_INDEX: {},

    // GROUP-MAIN

    GROUP_COUNT: 46,
    GROUP_MAIN: 0,
    GROUP_HET: 1,
    GROUP_WATER: 2,
    GROUP_SURFACE: 3,

    pptShow: false,

    GeoCenterOffset: "",

    // residue
    residue: '',

    exportPDB: false,
    // 0: 3D mode, 1: vr mode,
    mode: 1,
    //Mode
    MODE_THREE: 0,
    MODE_VR: 1,

    // representation Mode
    HIDE: 0,
    LINE: 1,
    DOT: 2,
    BACKBONE: 3,
    SPHERE: 4,
    STICK: 5,
    BALL_AND_ROD: 6,
    TUBE: 7,
    RIBBON_FLAT: 8,
    RIBBON_ELLIPSE: 9,
    RIBBON_RECTANGLE: 10,
    RIBBON_STRIP: 11,
    RIBBON_RAILWAY: 12,
    CARTOON_SSE: 13,
    SURFACE: 14,
    HET: 50,
    HET_LINE: 51,
    HET_SPHERE: 52,
    HET_STICK: 53,
    HET_BALL_ROD: 54,
    HET_WATER: 55,
    HET_IRON: 56,
}
