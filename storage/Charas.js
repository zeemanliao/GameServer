module.exports = {
    id: { type: String, unique: true },
    gold: { type: Number, default: 0 },
    name: { type: String, default: "" },
    desc: { type: String, default: "新手" },
    lv: { type: Number, default: 1 },
    exp: { type: Number, default: 0 },
    attr: {
        hp: { type: Number, default: 50 },
        mp: { type: Number, default: 10 },
        str: { type: Number, default: 20 },
        int: { type: Number, default: 20 },
        vit: { type: Number, default: 20 },
        dex: { type: Number, default: 20 },
        agi: { type: Number, default: 20 },
        fai: { type: Number, default: 20 }
    },
    class: {
        type: String,
            default: "NEW"
    },
    total: { type: Number, default: 0 },
    lose: { type: Number, default: 0 },
    act_at: { type: Date, default: Date.now }
};
