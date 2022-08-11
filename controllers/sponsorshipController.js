const { SponsorshipPost } = require('../models/')
const db = require('../models/')
const Sponsor = db.Sponsor
const Child = db.Child
const Sponsorship = db.Sponsorship


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

const post  = async (req,res) => {

    
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
    post
}