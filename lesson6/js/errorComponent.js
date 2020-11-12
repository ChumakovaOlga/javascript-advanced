Vue.component('error-component', {
    template: '<div class="error"><p>{{message}}</p><button class="del-btn">&times;</button></div>',
    props: ['message'],
    data() {
        return{
            message:''
        }
    }


    })
