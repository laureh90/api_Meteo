import externalTemplate from '../externalTemplate.js'

export default externalTemplate({

    template_url: "js/components/info.html",

    props: ["propinfos"],

    data() {

        return {
            token: "cfd500fca94ebde77ab568c00c3bfa37",
            meteo: null,
            compass: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO", "N"],
        }
    },

    mounted() {
        const options = {
            method: "GET",
            cors: true,
        }
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + this.propinfos[0].lat + "&lon=" + this.propinfos[0].lon + "&appid=" + this.token + "&lang=fr&units=metric&icon=10d", options).then(resp => resp.json()).then(data => {

            this.meteo = data

            /** TEMPERATURE */
            this.meteo.main.temp = Math.floor(this.meteo.main.temp) + ' ° '
            this.meteo.main.feels_like = Math.floor(this.meteo.main.feels_like) + ' ° '

            /**description , premiere lettre en MAJ */
            this.meteo.weather[0].description = this.meteo.weather[0].description[0].toUpperCase() + this.meteo.weather[0].description.substring(1)

            /** Force du vent  */
            this.meteo.wind.speed = Math.floor(this.meteo.wind.speed)
            /** Fuseau Horaire */
            this.meteo.timezone = Math.floor(this.meteo.timezone / 3600)
            /** direction du vent en deg / point cardinaux */
            this.meteo.wind.deg = this.meteo.wind.deg + ' ° |  ' + this.direction(this.meteo.wind.deg)

            /** Lever et coucher du soleil */
            this.meteo.sys.sunset = new Date(this.meteo.sys.sunset).toLocaleTimeString("fr-CA")
            this.meteo.sys.sunrise = new Date(this.meteo.sys.sunrise).toLocaleTimeString("fr-CA")

        })

    },

    methods: {
        /** calcul la direction du vent */
        direction(degree) {
            degree += 22.5;

            if (degree < 0)
                degree = 360 - Math.abs(degree) % 360;
            else
                degree = degree % 360;

            let which = parseInt(degree / 45);
            return this.compass[which];
        },


    }
})
