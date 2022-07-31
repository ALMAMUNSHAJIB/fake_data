const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ActiveUser = require('../model/active-user');
const { json } = require('express');



exports.userSignup = async (req, res) => {
    try {
        const { name, gender, email, country, password, status, devices } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(500).json({
                "message": "Email already exists!!"
            });
        } else {
            if (name && gender && email && country && password && status) {
                const saltRounds = 10;
                const slat = await bcrypt.genSalt(saltRounds);
                const hashPassword = await bcrypt.hash(password, slat);

                // console.log(hashPassword);
                const newUser = new User({
                    name, gender, email, country, password: hashPassword, status, devices
                });
                // console.log(newUser);
                await newUser.save();
                let today = new Date();
                let getDate = today.toLocaleDateString();
                const data = await ActiveUser.findOne({ created: getDate })
                if (!data) {
                    const newActiveUser = new ActiveUser({
                        users: newUser._id,
                        created: getDate
                    })
                    await newActiveUser.save();
                } else {
                    data.users.push(newUser._id);
                    await data.save();
                }


                const saved_user = await User.findOne({ email: email });
                //generate token 
                const token = jwt.sign({ userId: saved_user._id },
                    process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                });

                res.status(201).json({
                    data: newUser,
                    token: token,
                    "message": "User Insterd was success!"
                })
            } else {
                res.status(500).json({
                    "message": "All fields are required!!"
                });
            }
        }

    } catch (error) {
        console.log(error);
    }

};


exports.userSignin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await User.findOne({ email: email });
            if (user && user !== null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if ((user.email === email) && isMatch) {
                    //gnarate token 
                    const token = jwt.sign({ userId: user._id },
                        process.env.JWT_SECRET_KEY, {
                        expiresIn: '1h'
                    });
                    let today = new Date();
                    let getDate = today.toLocaleDateString();
                    const data = await ActiveUser.findOne({ created: getDate });
                    // console.log(data);
                    if (!data) {
                        const newActiveUser = new ActiveUser({
                            users: user._id,
                            created: getDate
                        })
                        await newActiveUser.save();
                    } else {
                        // const dataObj = await ActiveUser.findOne({ created: getDate }, { users: { "$in": [user._id] } });
                        const dataObj = await ActiveUser.findOne({ created: getDate, users: { $all: [user._id] } });
                        if (!dataObj || dataObj === null) {
                            data.users.push(user._id);
                            await data.save();
                        }
                    }
                    res.status(200).json({
                        "message": "Login success!!",
                        "token": token
                    })
                } else {
                    res.status(400).json({
                        "message": "email or password incorrect!!"
                    })
                }

            } else {
                res.status(404).json({
                    "message": "User not found!!"
                })

            }
        } else {
            res.status(400).json({
                "message": "All feild are required!!"
            })
        }
    } catch (error) {
        console.log(error);
    }
};


exports.activeUser = async (req, res) => {
    const { status } = req.body;
    const newActiveUser = new ActiveUser({
        status
    });
    await newActiveUser.save();
    res.status(201).json({ data: newActiveUser })

};


exports.activeUserReportFindById = async (req, res, next) => {
    let today = new Date();
    let getDate = today.toLocaleDateString();
    const data = await ActiveUser.find({ created: getDate }).populate('users', 'name country devices -_id')
    res.status(200).json({ data: data });
};




exports.userSignOut = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization fail" });
        }

        // const tokens = token;
        // console.log(tokens);
        // const newTokens = tokens.filter(t => t.token !== token);
        // await User.findByIdAndUpdate(req.user._id, { token: newTokens });
         res.status(200), json({ success: true, message: "Sign Out Successfully" });
    }
};
