
const db = require('../models/')
const Sponsor = db.Sponsor
const Child = db.Child
const Sponsorship = db.Sponsorship
const SponsorshipPost = db.SponsorshipPost


const getMyChildren  = async (req,res) => {
        /**
         * Get my sponsorships
         * get my 
         */
         let children = [];
         let childs;
         let sponsorships;
         let child ;
         let counter = 0;
    try {
     
        const id = req.query.id // this is the sponsorid
        console.log(id)
        sponsorships = await Sponsorship.findAll({where : {sponsorID : id}}) // list of all the sponsorships I have
    //   let sponsor = await Sponsor.findOne({where : {ID : id }})
      // console.log(sponsor)
      
    console.log(sponsorships)
    /*   sponsorships.forEach( async element => {
         
            child = await Child.findOne({where : {ID :element.childID }})
            console.log(child)
           await children.set(child.ID,child)
           console.log(children)
        });*/

     for(let cv of sponsorships){
            child = await Child.findOne({where : {ID :cv.childID }})
            children.push(child)
            console.log(child)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })
    }
    console.log(children + 'gg')
    res.status(200).json(children)
    
}

const getChildPosts  = async (req,res) => {
    try {
        
        const id = req.query.sponsorshipID
        let arrPosts = []
        let posts = await SponsorshipPost.findAll({where : {sponsorshipID : id}})
        for (const post of posts) {
            arrPosts.push(post)
        }
    
        res.status(200).json(arrPosts)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}

const makePost  = async (req,res) => {

    
        try {
            
            let newPost = {
                PostDate : new Date(),
                Title : req.body.Title,
                Description : req.body.Description,
                sponsorshipID : req.body.sponsorshipID,
                ItemImage : req.body.ItemImage,
               
            }
            
            const savedPost = await SponsorshipPost.create(newPost)
                if(!savedPost) return res.status(400).send('could not create post')
                res.status(200).json(savedPost)

        } catch (error) {
            
            console.log(error)
            res.status(500).json({
                errorMessage: error.message
            })

        }
}

module.exports = {
    getMyChildren,
    makePost,
    getChildPosts
}