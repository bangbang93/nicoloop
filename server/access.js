/**
 * Created by bangbang93 on 14-6-15.
 */

Meteor.startup(function(){
    topScore.allow({
        insert: function (userId,doc){
            if (!!userId){
                return true;
            }
        },
        update: function (userId, doc, fieldNames, modifier) {
            if (!!userId) {
                var newScore = topScore.findOne({_id:userId}).score;
                console.log(newScore);
                console.log(modifier);
                return (modifier.$set.score - newScore) == 1;
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