const profileModel = require('../model/profile')
const { validationResult } = require('express-validator')


exports.profile_post = (req, res) => {
    

    const profileFields = {}


    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }
    
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(404).json(errors)
    }
    else
    {
        profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            if(profile)
            {
                // profile정보가 있으면 메세지 출력
                // return res.status(400).json({
                //     message : "profile already exists, please update profile"
                // })

                // profile 정보가 있으면 수정
                profileModel
                    .findOneAndUpdate(
                        {user : req.user.id },
                        { $set : profileFields },
                        { new: true }
                    )
                    .then(profile => res.status(200).json(profile))
                    .catch(err => res.status(404).json(err.message))


            }
            else
            {
                // profile정보가 없으면
                new profileModel(profileFields)
                    .save()
                    .then(profile => res.status(200).json(profile))
                    .catch(err => res.status(404).json(err.message))

            }
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
}

exports.profile_detail_get = (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .populate("user",["name","email"])
        .then(profile => {
            if(!profile)
            {
                return res.status(200).json({
                    message : "no profile"
                })
            }
            else
            {
                res.status(200).json({
                    message : "successful profileInfo",
                    profileInfo : profile 
                })
            }           
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
}

exports.profile_delete = (req, res) => {
    profileModel
        .findOneAndDelete({user : req.user.id})
        .then(() => {
            res.status(200).json({
                message : "deleted profile"
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
}

exports.profile_total = (req, res) => {
    profileModel
        .find()
        .then(docs => {
            res.status(200).json({
                count : docs.length,
                profiles : docs
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
}

exports.profile_experience = (req, res) => {
    profileModel
        .findOne({ user : req.user.id })
        .then(profile => {
            const newExp = {
                title : req.body.title,
                company : req.body.company,
                location : req.body.location,
                from : req.body.from,
                to : req.body.to,
                current :  req.body.current,
                description : req.body.description
            }
    
            profile.experience.unshift(newExp)
            profile
                .save()
                .then(profile => res.status(200).json(profile))
                .catch(err => res.status(404).json(err.message))
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })   
}

exports.profile_education = (req, res) => {
    profileModel
    .findOne({ user : req.user.id })
    .then(profile => {
        const newEdu = {
            school : req.body.school,
            degree : req.body.degree,
            fieldofstudy : req.body.fieldofstudy,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description
        }

        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            res.status(404).json(errors)
        }
        else
        {
            profile.education.unshift(newEdu)
            profile
                .save()
                .then(profile => res.status(200).json(profile))
                .catch(err => res.status(404).json(err.message))
        }
    })
    .catch(err => {
        res.status(500).json({
            message : err.message
        })
    })     
}

