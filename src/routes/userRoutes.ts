import {Router} from 'express';
import {PrismaClient} from '@prisma/client';
const router =  Router();
const prisma = new PrismaClient();

//Create user
router.post('/', async(req,res) =>{
    try{
    const {email,name,username} = req.body;
    console.log(email,name,username);
    const result =await prisma.user.create({
        data: {
            email,
            name,
            username,
            bio:"Hello I am new to twitter"
        }
    });

    res.json(result);
}
catch(err){
    res.status(400).json({error: "Username and email should be unique"});
}
});

//list of users
router.get('/', async(req,res) =>{
const allUser = await prisma.user.findMany()

    res.json(allUser);
})

//get one user
router.get('/:id', async(req,res) =>{
    const {id} = req.params;
    const user = await prisma.user.findUnique({where:{ id: Number(id)}})
    res.json(user);
});

//update user
router.put('/:id', async(req,res) =>{
    const{id} = req.params;
    const {bio,name,image} = req.body;
    try{
const result = await prisma.user.update({
    where:{id: Number(id)},
    data:{bio,name, image}
})
res.json(result);
    }
    catch(err){
res.status(400).json({error: 'Failed to update the user'});
    }
    res.status(501).json({error: 'Not implemented: ${id}'});
});

//delete user
router.delete('/:id', async(req,res) =>{
    const{id} = req.params;
    await prisma.user.delete({where: {id: Number(id)}})
    res.status(200);
});

export default router;
