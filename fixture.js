//server check only required because this code
// is running on both client AND server
if(Meteor.isServer) {
  //Only seed on the server
  Meteor.startup(function() {
    //AND only seed if there are no items
    if(Items.find({}).count() == 0) {
      var list;
      for(var i = 1; i <= 10; i++) {
        list = i < 6 ? 1 : 2;
        Items.insert({
            title: "Item " + i,
            rank: i,
            list: list
        })
      }
    }
  })
}
