module.exports = {
    login_id: { type: String, unique: true },
    game_id: { type: String },
    login_ip: { type: String },
    login_at: { type: Date, default: Date.now },
    act_at: { type: Date, default: Date.now }
};
