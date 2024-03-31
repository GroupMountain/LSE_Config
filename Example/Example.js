


const { JsonConfig, JsonI18n } = require("./Example/lib/config");

let defaultConfig = {
    "test1": 114514,
    "test2": "homo",
    "test3": false,
    "test4": [
        114514,
        1919810
    ],
    "test5": {
        "obj1": true,
        "obj2": 1919810,
        "obj3": "homo object",
        "obj4": {
            "multi1": false,
            "multi2": [
                {
                    "name": "aaaaa",
                    "data": [
                        12345,
                        67890
                    ]
                },
                {
                    "name": "bbbbb",
                    "data": [
                        23456,
                        98765
                    ]
                }
            ]
        }
    }
};

const config = new JsonConfig("./plugins/Example/config/config.json", defaultConfig);

// Simple Test
logger.warn(config.get("test1"));
logger.warn(config.get("test2"));
logger.warn(config.get("test3"));
logger.warn(config.get("test4"));

config.set("test3", false);
logger.warn(config.get("test3"));

config.delete("test2");
logger.warn(config.get("test2"));
logger.warn(config.get("test2", "homo"));

// Complex Test 1
logger.warn(config.get("test5").obj4.multi1);

config.get("test5").obj4.multi1 = true;
config.save();
logger.warn(config.get("test5").obj4.multi1);

// Complex Test 2
logger.warn(config.get("test5").obj4.multi2);
config.get("test5").obj4.multi2.push({
    "name": "ccccc",
    "data": [
        19841,
        2917312
    ]
});
config.save();
logger.warn(config.get("test5").obj4.multi2);











const en_US = {
    "test.lang.a": "114514",
    "test.lang.b": "1919810",
    "test.lang.c": "aaaaaaaaaaaaaaaaaaaaa",
    "test.lang.d": "test {1} {2} {2} {1} {3}....."
};

const zh_CN = {
    "test.lang.a": "听我说谢谢你",
    "test.lang.b": "因为有你",
    "test.lang.c": "温暖了四季",
    "test.lang.d": "测试翻译 {1} {2} {2} {1} {3}....."
};


const I18n = new JsonI18n("./plugins/Example/language/", "zh_CN");
I18n.loadLanguage("en_US", en_US);
I18n.loadLanguage("zh_CN", zh_CN);


logger.warn(I18n.translate("test.lang.a"));
logger.warn(I18n.translate("test.lang.d", ["jb", "sb"]));

I18n.chooseLanguage("en_US");

logger.warn(I18n.translate("test.lang.a"));
logger.warn(I18n.translate("test.lang.d", ["jb", "sb"]));