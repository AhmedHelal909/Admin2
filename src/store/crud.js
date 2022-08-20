export default class {
    constructor ( endpoint ) {
       this.state = {
          endpoint: endpoint,
          meta:     {},
          status:   null,
          known:    [],
          currentId: null,
       };
       this.getters = {
         getAll: 

       };
       this.actions = {
          async store( context, payload ) {
               *(call to API)*
          },
          async update( context, payload ) {
               *(call to API)*
          },
          *...etc*
      };
      this.mutations = {
         STORED(state, item) {
            state.known.push(item);
         },
         *...etc*
      };
   }
}