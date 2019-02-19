const isCn = function (str) {
    if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
        return false;
    }
    return true;
};

export function formData(body: object): FormData {
    const _formData: FormData = new FormData();
    for (const kn in body) {
        if (body) {
            _formData.append(kn, body[kn] === undefined ? '' : body[kn]);
        }
    }
    return _formData;
}

export function formDataToUrl(body: object, ifFist?: boolean): string {
    let str = '';
    for (const keyName in body) {
        if (!str && ifFist) {
            str = '?' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
        } else {
            str = str + '&' + keyName + '=' + (body[keyName] === undefined ? '' : encodeURI(encodeURI(body[keyName])));
        }
    }
    return str;
}

export function getIndex(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === value) {
            return i;
        }
    }
}
