/**
 * Created by bangbang93 on 14-6-15.
 */

Meteor.startup(function(){
    topScore.allow({
        insert: function (userId){
            if (!!userId){
                return true;
            }
        },
        update: function (userId) {
            if (!!userId) {
                return true;
            }
        }
    });

    connections.allow({
        insert: function(){
            return true;
        },
        update: function(){
            return true;
        }
    });
});