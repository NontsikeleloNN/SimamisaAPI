
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
- router.get('/flags',OrphanageManagerController.unreliableUsers)  // ?id=x (orphanageID)
- router.put('/flag',OrphanageManagerController.flagUser)//?id=x (userID)
- router.get('/accountability', OrphanageManagerController.accountability)  // ?id=x (orphanageID)
- make notification for orphanage partnering 
2022/10/17

- router.get('/drops', OrphanageManagerController.DropOffsPerWeek) // ?id=x (orphanageID)
- router.get('/pickups', OrphanageManagerController.PickUpsPerWeek) // ?id=x (orphanageID)
- router.get('/gas',OrphanageManagerController.calcPetrol) // ?id=x (orphanageID)