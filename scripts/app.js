/// Create a new Vue app
const app = Vue.createApp({
    /// Define the data for the app
    data(){
        return {
            profile:   {
                userName:'',
                age:'',
                picture:''
            },
            weatherData:{
                
                city: 'London',
                province: 'Ontario',
                country: 'Canada',
                temperature:'',
                wind:'',
                description:''
                
            },

            
            dictResult:{
                word:'Bottle',
                phonetic:'',
                definition:''
            }
            
        };

    },
    methods: {
        fetchRandUser(){
            fetch('http://comp6062.liamstewart.ca/random-user-profile')
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                else{
                    console.log("ERROR LOADING RESPONSE");
                }
            })
            .then(data=>{
                this.profile.userName=data.first_name+' '+data.last_name;
                this.profile.age=data.age;
                this.profile.picture = data.profile_picture;
            })
            .catch(error=>{
                console.log("fail", error)
            })
        },
        fetchWeather(){
            let url= `http://comp6062.liamstewart.ca/weather-information?city=${this.weatherData.city}&province=${this.weatherData.province}&country=${this.weatherData.country}`
            fetch(url)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                else{
                    console.log("ERROR LOADING RESPONSE");
                }
            })
            .then(data=>{
                this.weatherData.temperature=data.temperature;
                this.weatherData.wind=data.wind_speed;
                this.weatherData.description=data.weather_description;
            })
            .catch(error=>{
                console.log("fail", error)
            });
        },
        checkDict(){
            let url=`https://comp6062.liamstewart.ca/define?word=${this.dictResult.word}`;
            fetch(url)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
                else{
                    console.log("ERROR LOADING RESPONSE");
                }
            })
            .then(data=>{
                if(data&&data[0].word&&data[0].definition){
                    this.dictResult.word=data[0].word;
                    this.dictResult.phonetic=data[0].phonetic;
                    this.dictResult.definition=data[0].definition;
                }
                else{
                    this.dictResult.word="Word not found";
                    this.dictResult.phonetic="Not Found";
                    this.dictResult.definition="Make sure to check the spelling, while inputting data";
                }
            })
            .catch(error=>{
                console.log("fail", error)
            });
        }

        }
        
   
});

/// Mount the app to the #app element
app.mount('#app');