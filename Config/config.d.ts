declare class JsonConfig {
    /**
     * 创建或打开一个 Json 配置文件
     * @param path 配置文件的路径，以BDS根目录为基准  
     * 如果配置文件路径中有目录尚不存在，则会自动创建
     * @param defultValue （可选参数）配置文件的默认内容。  
     * 如果不传入此参数，新建时的配置文件将为空  
     * 如果传入了参数，则会自动合并已有配置文件（如果存在）和提供的默认配置文件  
     * 如果已有的配置文件和提供的默认配置文件存在相同的键，则键值保留已有配置文件的键值  
     */
    constructor(path: string, defultValue?: object);

    /**
     * 初始化配置文件  
     * （new JsonConfig时会自动调用，无需再手动初始化）
     */
    init(): void;

    /**
     * 将配置文件保存并写入文件
     * @param format （可选参数）配置文件保存时的缩进
     */
    save(format?: number): void;

    /**
     * 获取配置文件的全部内容
     * @returns 配置的全部内容
     */
    getData(): object;

    /**
     * 获取配置的某个键
     * @param key 需要获取的配置的键
     * @param defultValue （可选参数）默认值，如果该配置不存在，则使用默认值并自动添加此键
     * @returns 配置的值
     */
    get(key: string, defultValue?: object): any;

    /**
     * 设置配置的某个键
     * @param key 需要设置的配置的键
     * @param value 设置的值
     */
    set(key: string, value: any): void;

    /**
     * 删除配置的某个键
     * @param key 需要删除的配置的键
     */
    delete(key: string): void;
}

declare class JsonLanguage extends JsonConfig {
    /**
     * 创建或打开一个 Json 语言文件
     * @param path 语言文件的路径，以BDS根目录为基准  
     * 如果语言文件路径中有目录尚不存在，则会自动创建 
     * @param defultValue （可选参数）语言文件的默认内容。 
     * 如果不传入此参数，新建时的语言文件将为空  
     * 如果传入了参数，则会自动合并已有语言文件（如果存在）和提供的默认语言文件  
     * 如果已有的语言文件和提供的默认语言文件存在相同的键，则键值保留已有语言文件的键值   
     */
    constructor(path: string, defultValue?: object);

    /**
     * 翻译语言
     * @param key 需要翻译的语言的键
     * @param data 需要翻译的参数  
     * 参数会按顺序依次替换语言中的 {1} {2} {3} ...
     * @returns 翻译后的语言
     */
    translate(key: string, data?: any[]): string;
}

declare class JsonI18n {
    /**
     * 创建或打开一个 I18n 系统
     * @param path I18n文件的路径，以BDS根目录为基准  
     * 请填写整个文件夹路径，不要具体到某一个文件
     * @param localLangCode 默认语言标识符（不填写此项默认为 en_US）
     */
    constructor(path: string, localLangCode?: string);

    /**
     * 加载I18n路径下的全部语言文件  
     * I18n路径下的 xxx.json 文件都会被加载  
     * 该函数在使用 new JsonI18n 会自动调用，无需手动调用
     */
    loadAllLanguages(): void;

    /**
     * 创建或更新一个语言文件  
     * 如果该标识符的语言文件不存在，则会自动创建。
     * 如果该标识符的语言文件已经存在，则会自动与默认文件合并，并保留原本修改。
     * @param langCode 语言标识符
     * @param defaultData 默认语言文件
     */
    loadLanguage(langCode: string, defaultData?: object): void;

    /**
     * 选择I18n的默认翻译语言
     * @param langCode 语言标识符
     */
    chooseLanguage(langCode: string): void;

    /**
     * 选择I18n无法翻译时，使用的默认语言标识符  
     * 如果翻译一个语言时，该语言标识符对应文件中没有相应的翻译，则会调用此语言。
     * 如果不手动设置此项，默认为 en_US
     * @param langCode 
     */
    setDefaultLanguage(langCode: string): void;

    /**
     * 翻译语言
     * @param key 需要翻译的语言的键
     * @param data （可选参数）需要翻译的参数  
     * 参数会按顺序依次替换语言中的 {1} {2} {3} ...
     * @param langCode （可选参数）语言标识符
     * 不填此项则使用默认语言
     * @returns 翻译后的语言
     */
    translate(key: string, data?: string[], langCode?: string): string;
}