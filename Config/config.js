class JsonConfig {
    constructor(path, defultValue = {}) {
        this.mData = defultValue;
        this.mPath = path;
        this.init();
    }

    init() {
        if (File.exists(this.mPath)) {
            let existDataStr = File.readFrom(this.mPath);
            existDataStr = existDataStr.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
            try {
                this.mData = Object.assign({}, this.mData, JSON.parse(existDataStr));
            } catch {
                let newPath = this.mPath + "_old";
                File.rename(this.mPath, newPath);
            }
        }
        this.save();
    }

    save(format = 4) {
        let dataStr = JSON.stringify(this.mData, null, format);
        File.writeTo(this.mPath, dataStr);
    }

    getData() {
        return this.mData;
    }

    get(key, defultValue = undefined) {
        let result = this.getData()[key];
        if (!result && defultValue != undefined) {
            this.set(key, defultValue);
            return defultValue;
        }
        return result;
    }

    set(key, value) {
        this.getData()[key] = value;
        this.save();
    }

    delete(key) {
        delete this.getData()[key];
        this.save();
    }
}

class JsonLanguage extends JsonConfig {
    constructor(path, defultValue = {}) {
        super(path, defultValue);
    }

    translate(key, data = []) {
        let result = this.get(key);
        if (result == null) {
            return key;
        }
        data.forEach((val, index) => {
            let old = `{${index + 1}}`;
            result = result.split(old).join(val);
        });
        return result;
    }
}

class JsonI18n {
    constructor(path, localLangCode = "en_US") {
        if (!path.endsWith("/") && !path.endsWith("\\")) {
            path = path + "/";
        }
        this.mPath = path;
        this.mLangCode = localLangCode;
        this.mAllLanguages = {};
        this.mDefaultLangCode = "en_US";
        this.loadAllLanguages();
    }

    loadAllLanguages() {
        let exist_list = File.getFilesList(this.mPath);
        exist_list.forEach((name) => {
            let code = name.replace(".json", "");
            let path = this.mPath + name;
            let language = new JsonLanguage(path);
            this.mAllLanguages[code] = language;
        });
    }

    loadLanguage(langCode, defaultData = {}) {
        let langPath = this.mPath;
        langPath = langPath + langCode + ".json";
        let language = new JsonLanguage(langPath, defaultData);
        this.mAllLanguages[langCode] = language;
    }

    chooseLanguage(langCode) {
        this.mLangCode = langCode;
    }

    setDefaultLanguage(langCode) {
        this.mDefaultLangCode = langCode;
    }

    translate(key, data = [], langCode = this.mLangCode) {
        let language = this.mAllLanguages[langCode];
        let result = language.translate(key, data);
        if (result == key) {
            let language = this.mAllLanguages[this.mDefaultLangCode];
            if (language) {
                result = language.translate(key, data);
            }
        }
        return result;
    }
};

module.exports = {
    JsonConfig,
    JsonLanguage,
    JsonI18n
}