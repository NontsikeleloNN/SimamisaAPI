
- router.post('/',donationController.generalDonate)
/** 
 *  const amount = Number(req.body.amt)
    const user = req.body.userid

*/


- router.post('/',adminController.distributeFunds) / ?amt=x&id=y (id being the orphanage ID)
- router.get('/donations', adminController.getAmount)
- router.get('/highestPriority',adminController.orphanageHighestPriority)
- router.get('/notifications',OrphanageManagerController.getNumNotifications) // ?id=x (orphanageID)
- router.put('/notifications',OrphanageManagerController.AllNotifications) // ?id=x (orphanageID)

- make notification for orphanage partnering 