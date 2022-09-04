
const db = require('../models/')
const Sponsor = db.Sponsor
const Child = db.Child
const Sponsorship = db.Sponsorship
const SponsorshipPost = db.SponsorshipPost


const getSponsorID  = async (req,res) => {

   try {
    
    const id = req.query.id

    let spononsorID = await Sponsor.findOne({where : {registeredUserID : id}})
    res.status(200).json(spononsorID.ID)


   } catch (error) {
    res.status(500).json({
        errorMessage : error.message
    })
   }
}

const editPost = async (req,res) => {

   try {
    
    const id = req.body.id;
    // I think I should just receive the changes that I want to and update them accordingly

    let item = await SponsorshipPost.update(req.body,{where: {ID : id}})
        if(!item) return res.status(400).json('could not update item: '+ id);

   
  
    res.status(200).json('updated')

   } catch (error) {
    res.status(500).json({
        errorMessage : error.message
    })
   }


}

const getByChildID = async (req,res) => {

    try {
        const id = req.query.id //childID

    // need to find sponsorship this belongs to 

    const spononsorID = (await Sponsorship.findOne({where : {childID : id}})).ID

    let posts = await SponsorshipPost.findAll({where : {sponsorshipID:spononsorID}})

    res.status(200).json(posts)
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }

}

const deletePost = async (req,res) => {
    
    try {
        
        const id = req.query.id
        await SponsorshipPost.destroy({where : {ID : id}})
        res.status(200).json('deleted')
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }


}

const getPost = async (req,res) => {
    try {
        
        let id = req.query.id
        let orph = await SponsorshipPost.findOne({where: {ID: id}})
        res.status(200).json(orph)

    } catch (error) {
        res.status(500).json({
            errorMessage : error.message
        })
    }
}

const getPosts = async (req,res) => {
    let id = req.query.id
    let posts = await SPo
}

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
        
        let posts = [];
       
        let sponsorships;
        const id = req.query.id // this is the sponsorid
        console.log(id)
        sponsorships = await Sponsorship.findAll({where : {sponsorID : id}}) // list of all the sponsorships I have
        for(let cv of sponsorships){
           let post = await SponsorshipPost.findAll({where : {sponsorshipID :cv.ID }})
            posts.push(post)
            console.log(post)
        }
    
        res.status(200).json(posts)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            errorMessage: error.message
        })

    }
}

const editSponsorship = async (req,res) => {

   try {
    
    let id = req.body.id;
    // I think I should just receive the changes that I want to and update them accordingly

    const item = await Sponsorship.update(req.body,{where: {ID : id}})

    res.status(200).json(item)
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
    getChildPosts,
    getPost,
    deletePost,
    editPost,
    getSponsorID,
    editSponsorship,
    getByChildID
}