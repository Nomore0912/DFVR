var w3m_sub = function (s, start, stop) {
    return stop ? w3m_trim(s.substring(start - 1, stop)) : w3m_trim(s.charAt(start - 1))
}
var w3m_trim = function (s) {
    return s.replace(/^\s+/, '').replace(/\s+$/, '')
}
var w3m_isset = function (o) {
    return typeof (o) != 'undefined'
}

var w3m_split_by_difference = function (dict) {
    // 获取并排序字典的键
    let keys = Object.keys(dict).sort(customCompare);
    // 转换过程
    let result = [];
    let currentRange = [keys[0], keys[0], dict[keys[0]]];
    for (let i = 1; i < keys.length; i++) {
        const key = keys[i];
        if (dict[key] === currentRange[2]) {
            currentRange[1] = key;
        } else {
            result.push(currentRange);
            currentRange = [key, key, dict[key]];
        }
    }
    result.push(currentRange);
    return result;
}

var w3m_capword = function (s) {
    return s.toLowerCase().replace(/\b([\w|']+)\b/g, function (word) {
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    });
}

var w3m_find_first = function (dict) {
    let keys = Object.keys(dict).sort(customCompare);
    return keys[0];
}

var w3m_find_last = function (dict) {
    let keys = Object.keys(dict).sort(customCompare);
    return keys[-1];
}

var findResidueIdIndex = function (residueIdList, targetStr) {
    return residueIdList.findIndex(function (str) {
        return str === targetStr
    });
}

var customCompare = function (a, b) {
    a = a.toString();
    b = b.toString();
    const numA = parseInt(a.match(/\d+/) || 0, 10);
    const numB = parseInt(b.match(/\d+/) || 0, 10);
    if (numA !== numB) {
        return numA - numB;
    }
    const strA = a.replace(/\d+/g, '');
    const strB = b.replace(/\d+/g, '');
    return strA.localeCompare(strB);
};

var w3m_find_object_first = function (obj) {
    let keys = Object.keys(dict).sort(customCompare);
    return obj[keys[0]];
}

var w3m_find_object_last = function (obj, return_item) {
    let keys = Object.keys(dict).sort(customCompare);
    return obj[keys[-1]];
}

var w3m_copy = function (o) {
    return Array.isArray(o) ? o.slice(0) : o;
}


