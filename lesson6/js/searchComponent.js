Vue.component('search-form', {
    props: ['usersearch'],
data(){
        return{
            search:'usersearch',
        }
},
    template: '<div><form action="#" class="search-form" @submit.prevent="filter">' +
                    '<input type="text" class="search-field" :value="usersearch">' +
                    '<button class="btn-search" type="submit">' +
                         '<i class="fas fa-search"></i>' +
                    '</button>' +
                    '</form>' +
               '</div>',

mounted(){
        this.search = this.userSearch;
}

    });


