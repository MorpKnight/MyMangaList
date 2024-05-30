const { User } = require('../models/User.models');
const { List } = require('../models/List.models');
const bcrypt = require('bcrypt');

exports.getUserProfile = async (user_id) => {
    try {
        const user = await User.findById(user_id).exec();
        if (!user) throw new Error('User not found');

        return { message: 'User found', data: user };
    } catch (error) {
        return { message: error.message }
    }
}

exports.updateUserProfile = async (user_id, body) => {
    try {
        const { ...user } = body;

        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(user_id, { ...user }, { new: true }).exec();
        if (!updatedUser) throw new Error('Error updating user');

        return { message: 'User updated', data: updatedUser };
    } catch (error) {
        return { message: error.message }
    }
}

exports.deleteUserProfile = async (user_id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(user_id).exec();
        if (!deletedUser) throw new Error('Error deleting user');

        return { message: 'User deleted', data: deletedUser };
    } catch (error) {
        return { message: error.message }
    }
}

exports.viewUserList = async (user_id) => {
    try {
        const userLists = await List.find({ user_id }).exec();
        if (!userLists) throw new Error('Error getting user lists');

        return { message: 'User lists found', data: userLists };
    } catch (error) {
        return { message: error.message }
    }
}

exports.viewReview = async (user_id) => {
    try {
        const userReviews = await List.find({ user_id }).exec();
        if (!userReviews) throw new Error('Error getting user reviews');

        const reviews = userReviews.filter(review => review.review_text);

        return { message: 'User reviews found', data: reviews };
    } catch (error) {
        return { message: error.message }
    }
}