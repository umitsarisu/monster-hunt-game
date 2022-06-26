new Vue({
    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false,
        special_attack_counter: 0,
        heal_up_counter: 0,
        logs: [],
        alert_text: `Oyunun Kuralları: 
        1. Özel saldırı ve ilk yardım yalnızca 2 kere kullanılabilir.
        2. İlk yardımın işe yarayacağı garanti değildir. 
        3. Bu sırada canavar size vurmaya devam eder.`,
        whoWin: "",
    },
    methods: {
        beginningOptions() {
            this.player_heal = 100
            this.monster_heal = 100;
            this.game_is_on = false;
            this.special_attack_counter = 0;
            this.heal_up_counter = 0;
            this.logs = [];
            this.whoWin = "";
        },
        start_game() {
            this.beginningOptions();
            this.game_is_on = true;
        },
        attack() {
            let point = Math.floor(Math.random() * 15) + 1;
            this.monster_heal -= point;
            this.monster_attack();
            this.add_to_log({ turn: "p", text: "Oyuncu " + point + " hasar verdi." })
        },
        monster_attack() {
            let point = Math.floor(Math.random() * 20) + 1;
            this.player_heal -= point;
            this.add_to_log({ turn: "m", text: "Canavar " + point + " hasar verdi." })
        },
        special_attack() {
            if (this.special_attack_counter < 2) {
                let point = Math.floor(Math.random() * (25 - 5 + 1)) + 10;
                this.monster_heal -= point;
                this.monster_attack();
                this.special_attack_counter++;
                this.add_to_log({ turn: "p", text: "Oyuncu özel saldırı ile " + point + " hasar verdi." })
            }
            else alert("Daha fazla özel saldırı yapamazsın!");
        },
        heal_up() {
            if (this.player_heal == 100 && this.monster_heal == 100) return alert("Oyunun başında ilk yardım alamazsın");
            else if (this.player_heal == 100) return alert("Canın %100 ken ilk yardım alamazsın")
            if (this.heal_up_counter < 2) {
                let point = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
                this.player_heal += point;
                this.monster_attack();
                this.heal_up_counter++;
                this.add_to_log({ turn: "p", text: "Oyuncu " + point + " puanlık ilk yardım aldı." })
            }
            else alert("Daha fazla can artıramazsın!");
        },
        give_up() {
            this.add_to_log({ turn: "p", text: "Oyuncu pes etti." })
            this.player_heal = 0;
        },
        add_to_log(log) {
            this.logs.unshift(log)
        },

    },
    watch: {
        player_heal(value) {
            if (value <= 0 && value < this.monster_heal) {
                this.game_is_on = false;
                this.whoWin = "Kaybettin";
            }
            else if (value >= 100) this.player_heal = 100;
        },
        monster_heal(value) {
            if (value <= 0 && value < this.player_heal) {
                this.game_is_on = false;
                this.whoWin = "Kazandın";
            }
        },
        whoWin(value) {
            if (this.player_heal <= 0 && this.player_heal > this.monster_heal) {
                this.player_heal = 1;
                this.monster_heal = 0;
            }
            else if (this.monster_heal <= 0 && this.monster_heal > this.player_heal) {
                this.monster_heal = 1;
                this.player_heal = 0;
            }
            else if (this.player_heal < 0) {
                this.player_heal = 0;
            }
            else if(this.monster_heal <0) {
                this.monster_heal = 0;
            }
        }
    },
    template: alert(`Oyunun Kuralları: 
    1. Özel saldırı ve ilk yardım yalnızca 2 kere kullanılabilir.
    2. İlk yardımın işe yarayacağı garanti değildir. Bu sırada canavar size vurmaya devam eder.`)
});