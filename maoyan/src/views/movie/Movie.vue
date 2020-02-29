<template>
    <div class="movie-container">
        <div class="header">
            <router-link 
               tag="div" 
               class="city"  
               to="/city">
               <span>城市</span>
               <i></i>
               </router-link>
            <router-link 
               tag="div" 
               class="hotshow" 
               active-class="active" 
               to="/index/movie/hotshow">正在热映</router-link>
            <router-link 
               tag="div" 
               class="commingsoon" 
               active-class="active" 
               to="/index/movie/commingsoon">即将上映</router-link>
            <router-link 
               tag="div" 
               class="search" 
               to="/search">
               </router-link>
        </div>
        <router-view class="main"></router-view>
    </div>
</template>
<style lang="scss" scoped>
@import 'assets/style/mixin.scss';
    .movie-container{
        display: flex;
        flex-direction: column;
        .header{
            line-height: 44px;
            display: flex;
            text-align: center;
            font-family: PingFangSC-Regular,Hiragino Sans GB,sans-serif;
            font-size: 15px;
            color: #666;
            font-weight: 500;
            @include border-bottom-1px(#d8d8d8);
            .city{
                flex:50;
                display: flex;
                align-items: center;
                span{
                    margin-left: 15px;
                }
                i{
                    margin:5px 0px 0px 5px;
                    border:5px solid #666;
                    border-left-color: transparent;
                    border-right-color: transparent;
                    border-bottom-color: transparent;
                }
            }
            .hotshow,.commingsoon{
                flex:80
            }
            .active{
                color: red;
                position: relative;  
            }
            .active::after{
                content: "";
                position: absolute;
                height: 2px;
                background: red;
                left: 8px;
                right: 8px;
                bottom:0;
            }
            .search{
                flex:40;
                background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABC1JREFUWAntWEtrU1EQPpO+ArYm1Y1I3VRXgu5EoSpVQaxCxUVxYTeCv8CtoFVxW0F/gBsLiguxoBaxWHyLS0EEdWWobrRprZC+cpzv3NyTOfeR3DS3duOF5M6ZMzPflzmvOVHq/9NcBqhRdz001D43UziktR5k35382ao1bUUcIj3NL3w+EtH4xu6eZ3Tv3iL6VvskJjh/vH/Lcql0UZM6o7TamAiQ1BxpNdaazV7pfDT1I5FPwKguQT0w0FFcLF5QSp9nYhsC/smapP5wfkfz7flr9PjxQjInz6omQZO1hdJ9rdW+RoLG2RKpt60d2VONZDOW4PyRA7uX9NJDBuuJACzwhHuQ0ZmHPNe+dm1qxbxTv38t83zU28tUPqG0Phnn25ah451P33yIiBtSRRJE5pZKpfchAKJp0vpSbvO2Wzz5V0LRhIIXU8vsz29nNdFlJmsWkegutGWze5JkMkQQc252cWYqYljH850twzT+6rcAqivqwb6u4vzKbTbEqrcPhjvX3t1fb05mrEdFwIIIkSN1I3/w2KlGySEkfOCrVOamxAKGt/ikNiw7GTRDu1D6Elit44bcyEg57J5co0dGMsXnE/fZo5pJXt1tHdkdtYbaySD2OYcczzkzrE2Sw88gjoFYvLjMgjI/jbctg2ka0V+WIE4IswkLOyyI1QyrCOGIiIWYUglMYEudlC1BHF+BE6KA1SqN05ArMQs2Fp9KBtsqXMESrJyt1V7e5+ptJVXj5JKJybGlRwhbdFqCrMPBbx9swraRshAR28GWcJKgs5nihJCGacoRsR1siWUJ+iWT3+kfX347zXcwdhBbYlmCUrkOso7DtAQrxaa1w8FvGykLwdiM/T0OwhJkg+oGyg1UJXFOzeojYjvYMr4k+FF2mJJJKlKUI2I72BLKEsQdQnagnkPJ5OhSaJiYXq1oo4WwbQ+XGL6MC47iO4Tf5ncP6jnRTkWsxKwWwYxpsGOiW4K4feGCI+1QbKKek7pmZMQyBawIAkxgC5UjWoLQ4vbFWeQLTuXhShjFJkolX7Xatym3ULjK6pqxDGaNoA6wV5fRaMB+sPhi4nozJL1a8IlbCxoQGq1VC8LEKVih+Icl/2cu+Xc1XPLDAVdD5loticCcK+Hin/Kn4uF955KsbtjAFj7wNRGcL+qdW5wFTs0nlEHfeg2vnT4EF9e0QoqGc5Ov71hlQIglCLs1uLh/5lnVyyeJ3V9Bkne7M/nJV3cD3EzTWSRBA0xgXA35p151VnfQsF4bOwPHwJwDGY+U5+SRLY8Vj/SdjgpTM4PSwWQzpT+PPDLlsSSZTEzQJ8uTP5W/35KSbJigTzSNdxxJamnpyz15+Q4YNedgGiRqxfAWRnhO6pWy3ZbWlSDIR5EkpV/4P2xdh9gngffs0f17kTmQy02+mZB9/+VmMvAXE7/38O8tTYkAAAAASUVORK5CYII=) no-repeat;
                background-size: 20px; 
                background-position: 20px  
            }
        }
        .main{
            flex:1
        }
    }
</style>