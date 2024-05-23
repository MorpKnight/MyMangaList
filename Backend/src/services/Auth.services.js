const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User.models');

exports.register = async (body) => {
    try {
        const { username, email, password } = body;
        if (!username || !email || !password) throw new Error('Please fill all fields');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return { message: 'User created successfully' };
    } catch (error) {
        return { message: error.message }
    }
}

exports.login = async (body) => {
    try {
        const { username, email, password } = body;
        if (!username && !email) throw new Error('Please provide username or email');
        if (!password) throw new Error('Please provide password');

        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) throw new Error('User not found');

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) throw new Error('Invalid password');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return { message: 'Login successful', token, user: { id: user._id, username: user.username, email: user.email } };
    } catch (error) {
        return { message: error.message }
    }
}