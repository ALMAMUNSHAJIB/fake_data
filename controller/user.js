const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ActiveUser = require('../model/active-user');



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
                const data = await ActiveUser.findById(newUser._id)
                if(!data){
                    
                }
             const newActiveUser =  new ActiveUser({
                users: newUser._id
             })
             await newActiveUser.save();
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
            if (user !== null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if ((user.email === email) && isMatch) {
                    //gnarate token 
                    const token = jwt.sign({ userId: user._id },
                        process.env.JWT_SECRET_KEY, {
                        expiresIn: '1h'
                    });

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



exports.userLogOut = async (req, res, next) => {
    await User.findByIdAndRemove(req.user._id)
    res.status(200).json({ message: 'ok' })
};


exports.activeUser = async (req, res) => {
    const { status } = req.body;
    const newActiveUser = new ActiveUser({
        status
    });
    await newActiveUser.save();
    res.status(201).json({ data: newActiveUser })

};


exports.activeUserReportFindById = async(req, res, next) => {
    console.log(req.userId);
    var today = new Date()  //.setHours(0, 0, 0, 0);
    var first = today.getDate() - today.getDay();
    var firstDayWeek = new Date(today.setDate(first));
    var lastDayWeek = new Date(today.setDate(first + 6));
    var firstDayMonth = new Date(today.setDate(1));
    var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    lastDayWeek.setHours(23, 59, 59, 0);
    lastDayMonth.setHours(23, 59, 59, 0);
    today = new Date().setHours(0, 0, 0, 0);

   const data = await ActiveUser.aggregate([{
        $match: {
           userId: req.userId
        }
    }, {
        $group: {
            "_id": "",
            "today": {
                $push: {
                    $cond: {
                        if: {
                            $lt: ["$created", new Date(today)]
                        },
                        then: "$$ROOT",
                        else: ''
                    }
                }
            },
            // "week": {
            //     $push: {
            //         $cond: [{
            //             $and: [{
            //                 $gte: ["$created", new Date(firstDayWeek)]
            //             },
            //             {
            //                 $lte: ["$created", new Date(lastDayWeek)]
            //             }
            //             ]
            //         },
            //             "$$ROOT",
            //             ''
            //         ]
            //     }
            // },
            // "month": {
            //     $push: {
            //         $cond: [{
            //             $and: [{
            //                 $gte: ["$created", new Date(firstDayMonth)]
            //             },
            //             {
            //                 $lte: ["$created", new Date(lastDayMonth)]
            //             }
            //             ]
            //         },
            //             "$$ROOT",
            //             ''
            //         ]
            //     }
            // }
        }
    }])
        // //If you want to filter in mongo query
        // .forEach(function (data) {
        //     data.today = data.today.filter(e => e != "")
        //     data.week = data.week.filter(e => e != "")
        //     print(data);
        // })

        res.status(200).json({data: data});
}