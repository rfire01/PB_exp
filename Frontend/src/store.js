import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
          getState: (key) => Cookies.getJSON(key),
          setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
        })
      ],
    state:{
        participant_ID: 1,
        senario:"def",
        stages: [], //stage number and voting system
        items: [],
        currentStage: 1
    },
    mutations:{
        setSenario(state,payload){
            state.senario=payload;
        },
        setStages(state,payload){
            state.stages=payload;
        },
        setCurrentStages(state,payload){
            state.currentStage=payload;
        },
        setItems(state,payload){
            state.items = payload;
        },
        setParticipantID(state,payload){
            state.participant_ID = payload;
        }
    },
    getters:{
        // getParticipantID(state){
        //     return state.participant_IDl;
        // },
        getSenario: state => state.senario,
        getStages: state => state.stages,
        getItems: state => state.items,
        getParticipantID: state => state.participant_ID,
        getCurrentStage: state => state.currentStage
    }

});
