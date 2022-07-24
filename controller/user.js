const faker = require('faker');
const User = require('../model/user');
const mongoose = require('mongoose');
exports.getAllUserController = async (req, res, next) => {
    try {
        const user = await User.find({ status: "active" }).limit(1000)
        res.status(200).json({ data: user });
    } catch (error) {
        console.log(error);
    }
};


exports.createUserController = async (req, res, next) => {
    try {
        for (var i = 0; i < 4; i++) {
            var data = new User({
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                phonenumber: faker.phone.phoneNumber(),
                city: faker.address.city(),
                state: faker.address.state(),
                country: faker.address.country(),
            });
            await data.save();

        }
        res.status(200).json({ message: 'Ok' })
    } catch (error) {
        console.log(error);
    }
};



exports.getSinglaUserController = async (req, res, next) => {
    try {
        const user = req.params.userId;
        const id = mongoose.Types.ObjectId.isValid(user);
        if (!id) {
            res.status(500).json({ message: " invalid id" })
        } else {
            const data = await User.find({ _id: user });
            if (data) {
               return res.status(404).json({ message: "Data Not found!!" })
               
            } 
            res.status(200).json({ data: data });
            
        }

    } catch (error) {
        console.log(error)

    }
}



exports.updateUserById = async (req, res, next) => {
    try {
        const { firstname, lastname, phonenumber, city, state, country } = req.body;
        const userId = req.params.userId
        const result = await User.findByIdAndUpdate({ _id: userId }, { firstname, lastname, phonenumber, city, state, country }, { new: true });
        res.status(200).json({ data: result })
    } catch (error) {
        console.log(error);
    }
}



exports.removeUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete({ _id: userId });
        res.status(200).json({ message: 'Delete User!' })

    } catch (error) {
        console.log(error);

    }
}




exports.updateFiledController = async (req, res, next) => {
    const updateUser = await User.aggregate([
        {
            $addFields: {
                status: "active"
            }
        },
        { $limit: 100 },
    ])
    res.status(200).json({ "message": "Updated!" })
};

