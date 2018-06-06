export default {
  name: 'extra-args',
  // note that the store gets passed in here:
  getExtraArgs: store => {
    return {
      // A bundle to inject additional dependencies to the store. Typically
      // you would import api clients and provide them here.
      // If your API requires an authentication token or whatnot
      // here would be a great place to select it from your store
      // and pass it along with the fetch. Then none of your individual
      // action creators need to worry about this.
    };
  },
};
