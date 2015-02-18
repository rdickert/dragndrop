Items = new Mongo.Collection('items');

if (Meteor.isClient) {
  Template.list.helpers({
    items: function (listNumber) {
      return Items.find({list: listNumber}, {sort: {rank: 1}});
    }
    // lists: function () {
    //   return _(Items.find().fetch()).chain().pluck('list').uniq().sort().value();
    // }
  });

  getRank = function (el) {
      return el && Blaze.getData(el).rank;
  }

  getList = function (prev, next) {
    var el = prev || next;
    return el && Blaze.getData(el).list;
  }


  Template.list.rendered = function () {
    this.$('.item-list').sortable({
      helper: 'clone',
      stop: function (e, ui) {
        // debugger;
        var item = ui.item.get(0);
        var prev = ui.item.prev().get(0);
        var next = ui.item.next().get(0);


        var startRank = 0;
        var endRank = Items.find().count() + 1;
        var prevRank = getRank(prev) || startRank;
        var nextRank = getRank(next) || endRank;

        var newRank = (prevRank + nextRank)/2;

        var newList = getList(prev, next);

        var _id = Blaze.getData(item)._id;
        Items.update(_id, {$set: {
          rank: newRank,
          list: newList
        }});
      }
    })
  };

  Template.listItem.rendered = function () {
    this.$('.item').draggable({
      connectToSortable: ".item-list"
    });
  };


}
