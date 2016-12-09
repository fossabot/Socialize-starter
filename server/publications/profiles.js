import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profile } from 'meteor/socialize:user-profile';

export default function () {
  /**
   * DB Schema for Profile
   */
  Profile.appendSchema({
    biography: {
      type: String,
      optional: true,
    },
    avatar: {
      type: String,
      optional: true,
    },
    givenName: {
      type: String,
      optional: true,
    },
    familyName: {
      type: String,
      optional: true,
    },
  });

  /**
   * Get a profile for the specified user.
   * @param {String} userIdOrUsername
   * @return {MongoDB pointer}
   */
  Meteor.publish('profile.for', (userIdOrUsername) => {
    check(userIdOrUsername, String);
    return Meteor.profiles.find(
      { $or: [ { userId: userIdOrUsername }, { username: userIdOrUsername } ] },
      { limit: 1 }
    );
  });

  /**
   * Get a profile for the current user.
   * @return {MongoDB pointer}
   * TODO pass a list of fields in
   */
  Meteor.publish('profile', function () {
    return Meteor.profiles.find(
      { userId: this.userId },
      { limit: 1 }
    );
  });
}
