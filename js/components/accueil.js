import externalTemplate from '../externalTemplate.js'

export default externalTemplate({

    template_url: "js/components/accueil.html",

    data() {

        return {
            token: "cfd500fca94ebde77ab568c00c3bfa37",
            ville: "",
            pays: "",
            lat: 0,
            lon: 0,
        }
    },

    mounted() {

    },

    methods: {
        /** recoit la lattitude et longitude par l'API */
        GetInfo() {
            const options = {
                method: "GET",
                cors: true,
            }

            const url = "https://api.openweathermap.org/geo/1.0/direct?q=" + this.ville + "," + this.pays + "&appid=" + this.token + ""

            fetch(url, options).then(resp => resp.json()).then(data => {
                // console.log(data)
                this.$root.changerPage('info', data);
                this.token = data.token
                this.ville = data.name,
                    this.pays = data.country,

                    /*sauvegarde le token*/
                    localStorage.setItem("token", data.token)
            })
        }
    }
})

